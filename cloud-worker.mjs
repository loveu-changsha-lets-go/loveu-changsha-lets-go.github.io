// Cloudflare D1 adapter for the same trip API as the local Node server.
// All data operations are authorized by a traveler capability, never by a display name.
const origins = ['https://loveu-changsha-lets-go.github.io', 'https://changsha-for-two-october.chy2026us.chatgpt.site'];
const categories = ['餐饮','交通','门票','住宿','购物','其他'];
const fail = (status, message) => Object.assign(new Error(message), { status });
const digest = async value => [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))].map(x=>x.toString(16).padStart(2,'0')).join('');
const newToken = () => [...crypto.getRandomValues(new Uint8Array(32))].map(x=>x.toString(16).padStart(2,'0')).join('');
const textFields = ['station','code','to'];
function validateSetting(key,value) {
  if(typeof key!=='string'||!/^(event-|book-|note-|tag-|progress-|food-|pack-|return$|budget$)/.test(key)||JSON.stringify(value).length>3000) throw fail(400,'请核对保存内容');
  if(key==='return') {
    for(const person of ['wu','cai']) { const t=value?.[person]; if(!t||!/^([01]\d|2[0-3]):[0-5]\d$/.test(t.time)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(t.end)||textFields.some(k=>typeof t[k]!=='string'||!t[k].trim()||t[k].length>60)) throw fail(400,'请核对返程安排'); }
    if(value.wu.end<=value.wu.time||value.wu.time<'03:00'||value.cai.time<'03:00'||value.cai.time>'23:30') throw fail(400,'请核对出发与到达时段');
  } else if(key==='budget') { if(typeof value!=='number'||!Number.isFinite(value)||value<0||value>1000000) throw fail(400,'请核对预算'); }
  else if(/^(event-|book-|pack-)/.test(key)) { if(typeof value!=='boolean') throw fail(400,'请核对勾选状态'); }
  else if(key.startsWith('tag-')) { if(!['wu','cai','both'].includes(value)) throw fail(400,'请核对旅伴'); }
  else if(key.startsWith('progress-')) { if(!['pending','active'].includes(value)) throw fail(400,'请核对状态'); }
  else if(key.startsWith('food-')) { if(!['','wish','visited'].includes(value)) throw fail(400,'请核对打卡状态'); }
  else if(typeof value!=='string') throw fail(400,'请核对备注');
}
export async function handleAPI(request, env) {
  const url=new URL(request.url), origin=request.headers.get('Origin');
  const allowed=!origin||origins.includes(origin)||origin===url.origin;
  const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Vary':'Origin','Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Authorization'};
  if(origin&&allowed) headers['Access-Control-Allow-Origin']=origin;
  const reply=(status,data)=>new Response(JSON.stringify(data),{status,headers});
  try {
    if(!allowed) throw fail(403,'不允许跨站访问');
    if(request.method==='OPTIONS') return new Response(null,{status:204,headers});
    const db=env.DB;
    if(!db) throw fail(503,'共享保存服务暂时不可用');
    const query=(sql,...args)=>db.prepare(sql).bind(...args);
    const body=async()=>{const text=await request.text();if(new TextEncoder().encode(text).length>16000)throw fail(413,'内容太长');try{return JSON.parse(text||'{}')}catch{throw fail(400,'格式有误')}};
    if(url.pathname==='/api/health') { await query('SELECT COUNT(*) AS n FROM members').first(); return reply(200,{ok:true,storage:'cloud'}); }
    if(url.pathname==='/api/rooms'&&request.method==='POST') {
      const input=await body();if(!['wu','cai'].includes(input.author))throw fail(400,'请选择旅伴');
      const token=newToken(),partnerToken=newToken(),room=crypto.randomUUID();
      await db.batch([query('INSERT INTO members VALUES(?,?,?,?)',await digest(token),room,input.author,partnerToken),query('INSERT INTO members VALUES(?,?,?,?)',await digest(partnerToken),room,input.author==='wu'?'cai':'wu',null)]);
      return reply(201,{token,partnerToken});
    }
    const authorization=request.headers.get('Authorization')||'';
    const m=await query('SELECT * FROM members WHERE token_hash=?',await digest(authorization.replace(/^Bearer /,''))).first();
    if(!m)throw fail(401,'请先连接共享旅行');
    const log=label=>query('INSERT INTO changes(room,author,label,created) VALUES(?,?,?,?)',m.room,m.author,label,new Date().toISOString());
    if(url.pathname==='/api/state'&&request.method==='GET') {
      const [entries,settings,changes]=await Promise.all([query('SELECT * FROM entries WHERE room=? ORDER BY created DESC',m.room).all(),query('SELECT key,value FROM settings WHERE room=?',m.room).all(),query('SELECT author,label,created FROM changes WHERE room=? ORDER BY id DESC LIMIT 40',m.room).all()]);
      const rows=kind=>entries.results.filter(x=>x.kind===kind).map(x=>({...x,...JSON.parse(x.body),room:undefined,body:undefined}));
      return reply(200,{author:m.author,notes:rows('note'),expenses:rows('expense'),settings:Object.fromEntries(settings.results.map(x=>[x.key,JSON.parse(x.value)])),changes:changes.results,partnerToken:m.partner_token||undefined});
    }
    if(url.pathname==='/api/settings'&&request.method==='PUT') {
      const input=await body();validateSetting(input.key,input.value);
      await db.batch([query('INSERT INTO settings VALUES(?,?,?) ON CONFLICT(room,key) DO UPDATE SET value=excluded.value',m.room,input.key,JSON.stringify(input.value)),log(typeof input.label==='string'?input.label.slice(0,100):'更新旅行安排')]);
      return reply(200,{ok:true});
    }
    const match=url.pathname.match(/^\/api\/(notes|expenses)\/([a-zA-Z0-9-]{1,80})$/);
    if(match) {
      const kind=match[1]==='notes'?'note':'expense',id=match[2];
      const old=await query('SELECT * FROM entries WHERE id=?',id).first();
      if(old&&(old.room!==m.room||old.author!==m.author||old.kind!==kind))throw fail(403,'只能修改或删除自己写的内容');
      if(request.method==='DELETE') { if(old)await db.batch([query('DELETE FROM entries WHERE id=? AND room=? AND author=?',id,m.room,m.author),log(kind==='note'?'删除自己的备忘':'删除自己的开销')]);return reply(200,{ok:true}); }
      if(request.method==='PUT') {
        const input=await body();let content;
        if(kind==='note') {if(typeof input.text!=='string'||!input.text.trim()||input.text.length>2000)throw fail(400,'备忘请输入1–2000字');content={text:input.text.trim()};}
        else {const cents=Math.round(Number(input.amount)*100);if(!Number.isSafeInteger(cents)||cents<=0||cents>100000000||!categories.includes(input.category)||!['wu','cai','both'].includes(input.payer)||!/^\d{4}-\d{2}-\d{2}$/.test(input.date))throw fail(400,'请核对金额、日期与分类');content={cents,category:input.category,payer:input.payer,date:input.date,text:String(input.text||'').slice(0,200)};}
        const now=new Date().toISOString();
        // The conflict predicate also enforces ownership if concurrent requests race.
        await db.batch([query('INSERT INTO entries VALUES(?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET body=excluded.body,updated=excluded.updated WHERE entries.room=excluded.room AND entries.author=excluded.author AND entries.kind=excluded.kind',id,m.room,m.author,kind,JSON.stringify(content),old?.created||now,now),log(kind==='note'?(old?'编辑自己的备忘':'写下一条备忘'):'记录一笔开销')]);
        return reply(200,{ok:true,updated:now});
      }
    }
    throw fail(404,'未找到该操作');
  } catch(error) { if(!error.status)console.error('Trip API failed',url.pathname,error.message);return reply(error.status||500,{error:error.status?error.message:'共享服务暂时不可用，请稍后重试'}); }
}
export default { async fetch(request,env) {return handleAPI(request,env);} };
