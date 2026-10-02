// Local application server: original static pages + authenticated, durable collaboration.
// GitHub Pages cannot execute this file; production needs a Node 24 host with a persistent disk.
import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, randomUUID, createHash } from 'node:crypto';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.TRIP_DATA_DIR || path.join(root, '.trip-data');
await mkdir(dataDir, { recursive: true });
const db = new DatabaseSync(path.join(dataDir, 'trip.sqlite'));
db.exec(`PRAGMA journal_mode=WAL;
CREATE TABLE IF NOT EXISTS members (token_hash TEXT PRIMARY KEY, room TEXT NOT NULL, author TEXT NOT NULL, partner_token TEXT);
CREATE TABLE IF NOT EXISTS entries (id TEXT PRIMARY KEY, room TEXT NOT NULL, author TEXT NOT NULL, kind TEXT NOT NULL, body TEXT NOT NULL, created TEXT NOT NULL, updated TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_entries_room_kind ON entries(room,kind);
CREATE TABLE IF NOT EXISTS settings (room TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL, PRIMARY KEY(room,key));
CREATE TABLE IF NOT EXISTS changes (id INTEGER PRIMARY KEY, room TEXT NOT NULL, author TEXT NOT NULL, label TEXT NOT NULL, created TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_changes_room ON changes(room,id);`);
const digest = s => createHash('sha256').update(s).digest('hex');
const token = () => randomBytes(32).toString('base64url');
const failure = (status, message) => Object.assign(new Error(message), { status });
const json = (res, status, value) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(value)); };
function member(req) {
  const auth = req.headers.authorization || '';
  const m = db.prepare('SELECT * FROM members WHERE token_hash=?').get(digest(auth.replace(/^Bearer /, '')));
  if (!m) throw failure(401, '请先连接共享旅行');
  return m;
}
async function body(req) {
  let text = '';
  for await (const chunk of req) { text += chunk; if (Buffer.byteLength(text) > 16000) throw failure(413, '内容太长'); }
  try { return JSON.parse(text || '{}'); } catch { throw failure(400, '内容格式有误'); }
}
function change(m, label) { db.prepare('INSERT INTO changes(room,author,label,created) VALUES(?,?,?,?)').run(m.room, m.author, label, new Date().toISOString()); }
function snapshot(m) {
  const rows = db.prepare('SELECT * FROM entries WHERE room=? ORDER BY created DESC').all(m.room);
  return {
    author: m.author,
    notes: rows.filter(x => x.kind === 'note').map(x => ({ ...x, ...JSON.parse(x.body), room: undefined, body: undefined })),
    expenses: rows.filter(x => x.kind === 'expense').map(x => ({ ...x, ...JSON.parse(x.body), room: undefined, body: undefined })),
    settings: Object.fromEntries(db.prepare('SELECT key,value FROM settings WHERE room=?').all(m.room).map(x => [x.key, JSON.parse(x.value)])),
    changes: db.prepare('SELECT author,label,created FROM changes WHERE room=? ORDER BY id DESC LIMIT 40').all(m.room),
    partnerToken: m.partner_token || undefined
  };
}
const categories = ['餐饮', '交通', '门票', '住宿', '购物', '其他'];
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname.startsWith('/api/')) {
      // Bearer capabilities never appear in URLs or logs. Reject cross-site mutations.
      if (req.method !== 'GET' && req.headers.origin && req.headers.origin !== `http://${req.headers.host}` && req.headers.origin !== `https://${req.headers.host}`) throw failure(403, '不允许跨站写入');
      if (url.pathname === '/api/health') return json(res, 200, { ok: true });
      if (url.pathname === '/api/rooms' && req.method === 'POST') {
        const input = await body(req);
        if (!['wu', 'cai'].includes(input.author)) throw failure(400, '请选择旅伴');
        const mine = token(), partner = token(), room = randomUUID();
        db.exec('BEGIN');
        try {
          db.prepare('INSERT INTO members VALUES(?,?,?,?)').run(digest(mine), room, input.author, partner);
          db.prepare('INSERT INTO members VALUES(?,?,?,?)').run(digest(partner), room, input.author === 'wu' ? 'cai' : 'wu', null);
          db.exec('COMMIT');
        } catch (e) { db.exec('ROLLBACK'); throw e; }
        return json(res, 201, { token: mine, partnerToken: partner });
      }
      const m = member(req);
      if (url.pathname === '/api/state' && req.method === 'GET') return json(res, 200, snapshot(m));
      if (url.pathname === '/api/settings' && req.method === 'PUT') {
        const input = await body(req);
        if (typeof input.key !== 'string' || !/^(event-|book-|note-|tag-|progress-|food-|pack-|return$|budget$)/.test(input.key)) throw failure(400, '不支持的设置');
        if (input.key === 'return') {
          const r = input.value;
          for (const person of ['wu','cai']) {
            const t = r?.[person];
            if (!t || !/^([01]\d|2[0-3]):[0-5]\d$/.test(t.time) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(t.end) || ['station','code','to'].some(k => typeof t[k] !== 'string' || !t[k].trim() || t[k].length > 60)) throw failure(400, '请核对返程安排');
          }
          if (r.wu.end <= r.wu.time || r.wu.time < '03:00' || r.cai.time < '03:00' || r.cai.time > '23:30') throw failure(400, '请核对出发与到达时段');
        } else if (input.key === 'budget') {
          if (typeof input.value !== 'number' || !Number.isFinite(input.value) || input.value < 0 || input.value > 1000000) throw failure(400, '请核对预算');
        } else if (/^(event-|book-|pack-)/.test(input.key)) {
          if (typeof input.value !== 'boolean') throw failure(400, '请核对勾选状态');
        } else if (input.key.startsWith('tag-')) {
          if (!['wu','cai','both'].includes(input.value)) throw failure(400, '请核对旅伴');
        } else if (input.key.startsWith('progress-')) {
          if (!['pending','active'].includes(input.value)) throw failure(400, '请核对任务状态');
        } else if (input.key.startsWith('food-')) {
          if (!['','wish','visited'].includes(input.value)) throw failure(400, '请核对打卡状态');
        } else if (typeof input.value !== 'string') throw failure(400, '请核对备注');
        if (JSON.stringify(input.value).length > 3000) throw failure(400, '设置太长');
        db.prepare('INSERT INTO settings VALUES(?,?,?) ON CONFLICT(room,key) DO UPDATE SET value=excluded.value').run(m.room, input.key, JSON.stringify(input.value));
        change(m, typeof input.label === 'string' ? input.label.slice(0, 100) : '更新旅行安排');
        return json(res, 200, { ok: true });
      }
      const match = url.pathname.match(/^\/api\/(notes|expenses)\/([a-zA-Z0-9-]{1,80})$/);
      if (match) {
        const kind = match[1] === 'notes' ? 'note' : 'expense', id = match[2];
        const old = db.prepare('SELECT * FROM entries WHERE id=?').get(id);
        if (old && (old.room !== m.room || old.author !== m.author || old.kind !== kind)) throw failure(403, '只能修改或删除自己写的内容');
        if (req.method === 'DELETE') {
          if (old) { db.prepare('DELETE FROM entries WHERE id=?').run(id); change(m, kind === 'note' ? '删除自己的备忘' : '删除自己的开销'); }
          return json(res, 200, { ok: true });
        }
        if (req.method === 'PUT') {
          const input = await body(req);
          let content;
          if (kind === 'note') {
            if (typeof input.text !== 'string' || !input.text.trim() || input.text.length > 2000) throw failure(400, '备忘请输入 1–2000 字');
            content = { text: input.text.trim() };
          } else {
            const cents = Math.round(Number(input.amount) * 100);
            if (!Number.isSafeInteger(cents) || cents <= 0 || cents > 100000000 || !categories.includes(input.category) || !['wu','cai','both'].includes(input.payer) || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) throw failure(400, '请核对金额、日期与分类');
            content = { cents, category: input.category, payer: input.payer, date: input.date, text: String(input.text || '').slice(0, 200) };
          }
          const now = new Date().toISOString();
          db.prepare('INSERT INTO entries VALUES(?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET body=excluded.body,updated=excluded.updated').run(id, m.room, m.author, kind, JSON.stringify(content), old?.created || now, now);
          change(m, kind === 'note' ? (old ? '编辑自己的备忘' : '写下一条备忘') : '记录一笔开销');
          return json(res, 200, { ok: true, updated: now });
        }
      }
      throw failure(404, '未找到该操作');
    }
    // Explicit allowlist: never serve SQLite, .git, server source, or configuration.
    const allowed = new Set(['index.html', 'app.js', 'enhancements.js', 'style.css', 'enhancements.css', 'favicon.svg', 'places-art.jpg', 'places-night.jpg']);
    const file = decodeURIComponent(url.pathname).replace(/^\//, '') || 'index.html';
    if (!allowed.has(file)) throw failure(404, '未找到页面');
    const bytes = await readFile(path.join(root, file));
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' };
    res.writeHead(200, { 'Content-Type': `${types[path.extname(file)]}; charset=utf-8`, 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
    res.end(bytes);
  } catch (e) { if (!res.headersSent) json(res, e.status || 500, { error: e.status ? e.message : '保存服务暂时不可用，请稍后重试' }); else res.end(); }
});
server.listen(Number(process.env.PORT || 4173), process.env.HOST || '127.0.0.1', () => console.log(`Changsha V2 running at http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 4173}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => { db.close(); process.exit(0); }));
