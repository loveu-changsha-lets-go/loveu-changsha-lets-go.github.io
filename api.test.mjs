import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { JSDOM, VirtualConsole } from 'jsdom';

test('two travelers, ownership, persistence, original tabs and return linkage', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'changsha-test-'));
  const port = 24000 + Math.floor(Math.random()*20000), base = `http://127.0.0.1:${port}`;
  let server;
  const windows = [];
  async function start() {
    server = spawn(process.execPath, ['server.mjs'], { env: { ...process.env, PORT: String(port), TRIP_DATA_DIR: dir }, stdio: ['ignore','pipe','pipe'] });
    await new Promise((resolve, reject) => { server.stdout.once('data', resolve); server.once('error', reject); server.once('exit', code => reject(new Error(`Server exited ${code}`))); });
  }
  async function stop() { await new Promise(resolve => { server.once('exit', resolve); server.kill('SIGTERM'); }); }
  async function call(endpoint, token, method = 'GET', value) {
    const response = await fetch(`${base}/api/${endpoint}`, { method, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: value === undefined ? undefined : JSON.stringify(value) });
    return { status: response.status, data: await response.json() };
  }
  const until = async (predicate, attempts=100) => { for(let i=0;i<attempts;i++){ if(await predicate()) return; await new Promise(r=>setTimeout(r,30)); } throw new Error('State did not update'); };
  try {
    await start();
    assert.equal((await call('health')).status,200);
    assert.equal((await call('state')).status,401);
    const pair = (await call('rooms', '', 'POST', { author: 'wu' })).data;
    const other = (await call('rooms', '', 'POST', { author: 'cai' })).data;
    const id = randomUUID();
    assert.equal((await call(`notes/${id}`, pair.token, 'PUT', { text: '一起吃微辣虾饺 <script>不执行</script>' })).status,200);
    assert.equal((await call('state', pair.partnerToken)).data.notes[0].text, '一起吃微辣虾饺 <script>不执行</script>');
    assert.equal((await call(`notes/${id}`, pair.partnerToken, 'DELETE')).status,403);
    assert.equal((await call(`notes/${id}`, pair.partnerToken, 'PUT', { text: '不能改他人' })).status,403);
    assert.equal((await call(`notes/${id}`, other.token, 'DELETE')).status,403);
    assert.equal((await call('state', other.token)).data.notes.length,0);
    assert.equal((await call('settings',pair.token,'PUT',{key:'budget',value:2000,label:'修改预算'})).status,200);
    assert.equal((await call('settings',pair.token,'PUT',{key:'return',value:{wu:{time:'99:99'}}})).status,400);
    assert.equal((await call(`expenses/${randomUUID()}`,pair.partnerToken,'PUT',{amount:'0.1',category:'餐饮',payer:'both',date:'2026-10-03',text:'测试'})).status,200);
    assert.equal((await call('state',pair.token)).data.expenses[0].cents,10);
    assert.equal((await fetch(`${base}/.trip-data/trip.sqlite`)).status,404);
    assert.equal((await fetch(`${base}/server.mjs`)).status,404);
    await stop(); await start();
    assert.equal((await call('state',pair.partnerToken)).data.notes[0].id,id);
    assert.equal((await call('state',pair.partnerToken)).data.settings.budget,2000);

    const errors = [], console = new VirtualConsole(); console.on('jsdomError', e => errors.push(e.message));
    const dom = new JSDOM(await (await fetch(base)).text(), { url: base, resources: 'usable', runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: console,
      beforeParse(w) { w.fetch = (url, init) => fetch(new URL(url, base), init); w.structuredClone = structuredClone; w.TextEncoder = TextEncoder; w.AbortSignal = AbortSignal; w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = () => {}; w.HTMLDialogElement.prototype.showModal = function() { this.open = true; }; w.HTMLDialogElement.prototype.close = function() { this.open = false; }; w.localStorage.setItem('changsha-ui-v2',JSON.stringify({session:pair.token})); }
    });
    windows.push(dom.window);
    await new Promise(resolve => dom.window.addEventListener('load', resolve));
    const { document:d } = dom.window;
    await until(() => dom.window.eval('local.budget') === 2000);
    assert.equal(d.querySelectorAll('.mobile-nav [data-view]').length,5);
    assert.equal(d.querySelectorAll('.day-button').length,5);
    assert.match(d.querySelector('.event-time').textContent,/\d\d:\d\d–\d\d:\d\d/);
    assert.equal(dom.window.eval('days[4].events[1].time'),'05:45');
    assert.equal(dom.window.eval('days[4].events[5].time'),'14:30');
    d.querySelector('.event h3').click();
    assert.equal(d.querySelector('[data-done]').checked,true);
    d.querySelector('[data-traveler-filter="cai"]').click();
    assert.equal(d.querySelectorAll('.event:not([hidden])').length,0);
    d.getElementById('themeToggle').click();
    assert.equal(d.documentElement.dataset.theme,'dark');
    dom.window.eval("changeView('food')");
    const originalFoodCount = dom.window.eval('food.length');
    assert.equal(d.querySelectorAll('.food-card').length,originalFoodCount);
    d.querySelector('[data-food][data-value="wish"]').click();
    assert.equal(d.querySelector('[data-food][data-value="wish"]').classList.contains('selected'),true);
    dom.window.eval("changeView('booking')"); assert.equal(d.querySelectorAll('.reserve-card').length,7);
    dom.window.eval("changeView('tickets')"); assert.equal(d.querySelectorAll('.ticket-card').length,5);
    d.querySelector('[data-edit-return]').click();
    d.querySelector('[name="wu-time"]').value = '08:24';
    d.getElementById('returnForm').dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true}));
    assert.match(d.querySelector('.critical p').textContent,/08:24/);
    assert.equal(dom.window.eval('days[4].events[2].time'),'08:24');
    assert.equal(dom.window.eval("essential.find(x => x.date==='2026-10-07' && x.title.includes('G1778')).time"),'08:24');
    assert.equal(dom.window.eval('days[4].events[1].time'),'06:45');
    const search = d.getElementById('globalSearch'); search.value = '虾饺'; search.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
    assert.equal(d.getElementById('searchResults').hidden,false);
    assert.ok(d.querySelectorAll('[data-search-view="food"]').length > 0);
    dom.window.eval("changeView('guide')");
    assert.equal(d.querySelectorAll('.guide-card').length,6);
    assert.match(d.getElementById('memoList').textContent,/微辣虾饺/);
    assert.equal(d.getElementById('memoList').querySelector('script'),null);
    const draft = d.getElementById('memoDraft'); draft.value = '双方刷新可见的第二条留言'; draft.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
    await until(async () => (await call('state',pair.partnerToken)).data.notes.some(n => n.text === draft.value));
    await until(() => d.getElementById('memoList').textContent.includes(draft.value));
    assert.ok(d.querySelector('.memo-card.editing time[datetime]'));
    // Deleting the current editor message must retire its retry draft.
    const deleteButton = d.querySelector('.memo-card.editing [data-delete-note]'); deleteButton.click();
    await until(async () => !(await call('state',pair.partnerToken)).data.notes.some(n => n.text === '双方刷新可见的第二条留言'));
    await until(() => !deleteButton.disabled);
    assert.equal(draft.value,'');
    assert.equal(JSON.parse(dom.window.localStorage.getItem('changsha-ui-v2')).draft,'');
    // A failed autosave cannot discard text when "another note" is pressed.
    const liveFetch = dom.window.fetch;
    dom.window.fetch = (url,init) => String(url).includes('/api/notes/') ? Promise.resolve(new Response(JSON.stringify({error:'测试保存失败'}),{status:503})) : liveFetch(url,init);
    draft.value = '网络失败仍然保留这段文字'; d.getElementById('newMemo').click();
    await until(() => d.getElementById('draftStatus').textContent.includes('测试保存失败'));
    assert.equal(draft.value,'网络失败仍然保留这段文字');
    dom.window.fetch = liveFetch; d.getElementById('newMemo').click();
    await until(() => draft.value === '');
    assert.ok((await call('state',pair.partnerToken)).data.notes.some(n => n.text === '网络失败仍然保留这段文字'));
    d.getElementById('budgetLimit').value = '0'; d.getElementById('budgetLimit').dispatchEvent(new dom.window.Event('change',{bubbles:true}));
    assert.match(d.getElementById('budgetSummary').textContent,/预算剩余¥-0.10/);
    dom.window.dispatchEvent(new dom.window.Event('beforeprint'));
    assert.equal(d.querySelectorAll('#printTrip .print-day').length,5);
    assert.equal(d.querySelectorAll('#printTrip button,#printTrip input').length,0);
    dom.window.eval("changeView('guide')"); assert.equal(d.getElementById('budgetLimit').value,'0');
    dom.window.eval("changeView('itinerary'); state.day=4; render()");
    const remoteReturn = (await call('state',pair.token)).data.settings.return;
    remoteReturn.wu.time = '09:24';
    assert.equal((await call('settings',pair.partnerToken,'PUT',{key:'return',value:remoteReturn,label:'旅伴调整返程'})).status,200);
    await until(() => d.querySelectorAll('.event')[2].querySelector('p').textContent.includes('09:24'),300);
    assert.match(d.querySelector('.critical p').textContent,/09:24/);
    assert.deepEqual(errors,[]);
    assert.equal((await call(`notes/${id}`,pair.token,'DELETE')).status,200);
  } finally { windows.forEach(w=>w.close()); if (server?.exitCode === null) await stop(); await rm(dir,{recursive:true,force:true}); }
});
