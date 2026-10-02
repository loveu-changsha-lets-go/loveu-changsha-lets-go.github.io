/* V2 augments the original five renderers. Existing route content is preserved. */
(() => {
  'use strict';
  const names = { wu: '吴', cai: '蔡', both: '双人' };
  let prefs = {};
  try { prefs = JSON.parse(localStorage.getItem('changsha-ui-v2') || '{}'); } catch {}
  const ui = { filter: 'all', session: prefs.session || '', connected: false, available: false,
    notes: [], expenses: [], changes: [], partnerToken: '', draftId: crypto.randomUUID(), saving: false, deleting: '' };
  const categories = ['餐饮', '交通', '门票', '住宿', '购物', '其他'];
  const apiOrigin = location.hostname === 'loveu-changsha-lets-go.github.io' ? 'https://changsha-for-two-october.chy2026us.chatgpt.site' : '';
  const pending = new Map();
  const originalRender = render;
  const originalDayCalendar = dayCalendar;
  const originalDay5 = structuredClone(days[4]);
  const originalEssential = structuredClone(essential);
  const baseReturns = { wu: { time: '07:24', end: '14:06', station: '长沙南站', code: 'G1778', to: '上海虹桥' }, cai: { time: '16:35', end: '10:52', station: '长沙站', code: 'K502/K503', to: '成都西' } };
  const stamp = (date, time) => new Date(`${date}T${time}:00+08:00`).getTime();
  const formatDate = value => new Date(value).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });
  const setPrefs = () => { try { localStorage.setItem('changsha-ui-v2', JSON.stringify(prefs)); } catch {} };
  const returns = () => local.return || structuredClone(baseReturns);
  const money = cents => `¥${(cents / 100).toFixed(2)}`;
  const leaveTime = (person, t) => shifted(t, person === 'wu' ? -99 : -125);
  const arriveTime = (person, t) => shifted(t, person === 'wu' ? -44 : -65);
  const cleanText = html => { const t = document.createElement('template'); t.innerHTML = html; return t.content.textContent.replace(/\s+/g, ' ').trim(); };
  function urgent(date, time) { const delta = stamp(date, time) - Date.now(); return delta >= 0 && delta <= 86400000; }
  async function request(endpoint, method = 'GET', value) {
    const res = await fetch(`${apiOrigin}/api/${endpoint}`, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ui.session}` }, body: value === undefined ? undefined : JSON.stringify(value), ...(typeof AbortSignal.timeout === 'function' ? {signal: AbortSignal.timeout(12000)} : {}) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || '共享服务暂时不可用');
    return data;
  }
  async function flush() {
    if (!ui.connected || ui.flushing) return;
    ui.flushing = true;
    try {
      // Serialize updates so rapid taps cannot overwrite a newer shared value.
      while (pending.size && ui.connected) {
        const [key,value] = pending.entries().next().value;
        await request('settings','PUT',value);
        if (pending.get(key) === value) pending.delete(key);
      }
      syncLabel('共享已连接 · 自动保存');
    } catch { syncLabel('有修改待保存，正在重试'); }
    finally { ui.flushing = false; }
  }
  function update(key, value, label) {
    local[key] = value; save();
    if (ui.connected) { pending.set(key, { key, value, label }); flush(); }
    else { ui.changes.unshift({ author: 'both', label: `${label}（此设备）`, created: new Date().toISOString() }); }
  }
  function syncLabel(label) { document.querySelectorAll('[data-sync-label]').forEach(x => { x.textContent = label; }); }
  async function refresh() {
    if (!ui.session) return;
    try {
      const data = await request('state');
      ui.connected = true; ui.author = data.author;
      ui.notes = data.notes; ui.expenses = data.expenses; ui.changes = data.changes;
      ui.partnerToken = data.partnerToken || '';
      const sharedChanges = Object.entries(data.settings).some(([key,value]) => !pending.has(key) && JSON.stringify(local[key]) !== JSON.stringify(value));
      Object.assign(local, data.settings, Object.fromEntries([...pending].map(([k, v]) => [k, v.value])));
      save(); applyReturns(); header();
      if (state.view === 'guide') fillShared();
      // Refresh remote edits without replacing an input while a traveler is typing.
      ui.needsRender ||= sharedChanges;
      if (!document.querySelector('input:focus,select:focus,textarea:focus')) {
        if (ui.needsRender) { ui.needsRender = false; render(); } else enhance();
      }
      syncLabel(pending.size ? '有修改待保存，正在重试' : '共享已连接 · 自动保存');
    } catch { ui.connected = false; syncLabel('暂时无法同步，输入仍保留'); }
  }
  function shifted(time, delta) {
    const total = Number(time.slice(0, 2)) * 60 + Number(time.slice(3)) + delta;
    return `${String(Math.floor(Math.max(0, total) / 60)).padStart(2, '0')}:${String(Math.max(0, total) % 60).padStart(2, '0')}`;
  }
  // The return cards, top notice, DAY5 and ICS derive from this one shared setting.
  function applyReturns() {
    const r = returns();
    days[4] = structuredClone(originalDay5);
    for (const [person, index] of [['wu', 2], ['cai', 6]]) {
      const trip = r[person], event = days[4].events[index];
      event.time = trip.time; event.end = person === 'cai' ? '23:59' : trip.end;
      event.title = `${names[person]}：${trip.code} → ${trip.to}`; event.place = trip.station;
      event.body = `10.07 ${trip.time} ${trip.station}出发，${person === 'cai' ? '10.08 ' : '10.07 '}${trip.end}抵达${trip.to}。时刻与席位请核对最终订单。`;
      event.transit = `目标 ${arriveTime(person, trip.time)} 前到站；如当天拥堵，可按导航进一步提前动身。`;
      const travel = days[4].events[person === 'wu' ? 1 : 5];
      travel.time = leaveTime(person, trip.time); travel.end = arriveTime(person, trip.time);
      travel.place = trip.station; travel.title = `${names[person]}取行李，去${trip.station}`;
      travel.body = `${travel.time}左右离开酒店，目标${travel.end}前到${trip.station}；早点出发，留出安检与检票缓冲。`;
      travel.transit = '以当前高德导航选择正规用车或地铁；早班车不依赖首班地铁。'; travel.extra = '最终时间以订单和当日运行安排为准。';
      if (person === 'wu') { days[4].events[0].time = shifted(trip.time, -144); days[4].events[0].end = shifted(trip.time, -104); }
    }
    days[4].route = `吴：酒店 → ${r.wu.station}；蔡：酒店 → ${r.cai.station} → ${r.cai.to}`;
    days[4].planB = `提前准备两种正规交通方式，吴目标${arriveTime('wu',r.wu.time)}前到${r.wu.station}，蔡目标${arriveTime('cai',r.cai.time)}前到${r.cai.station}。运行异常及时联系12306。`;
    for (let i = 0; i < essential.length; i++) {
      const old = originalEssential[i]; Object.assign(essential[i], old);
      if (old.date === '2026-10-07' && old.title.includes('G1778')) Object.assign(essential[i], { time: r.wu.time, end: r.wu.end, place: r.wu.station, title: `吴：${r.wu.code} ${r.wu.station} → ${r.wu.to}` });
      if (old.date === '2026-10-07' && old.title.includes('K502/K503')) Object.assign(essential[i], { time: r.cai.time, end: shifted(r.cai.time, 20), place: r.cai.station, title: `蔡：${r.cai.code} ${r.cai.station} → ${r.cai.to}` });
      if (old.date === '2026-10-08' && old.person === 'cai') Object.assign(essential[i], { time: r.cai.end, end: shifted(r.cai.end, 20), place: r.cai.to, title: `蔡：到${r.cai.to}，检查行李后下车` });
      if (old.date === '2026-10-07' && /去长沙南|去长沙站/.test(old.title)) {
        const t = r[old.person]; Object.assign(essential[i], { time: leaveTime(old.person,t.time), end: arriveTime(old.person,t.time), place: t.station, title: `${names[old.person]}：酒店出发去${t.station}`, body: `目标${arriveTime(old.person,t.time)}前到站；${t.time}发车，按实时导航提前出发。` });
      }
      if (old.date === '2026-10-07' && old.title.includes('吴：起床')) Object.assign(essential[i], { time: days[4].events[0].time, end: days[4].events[0].end, body: `${r.wu.time}从${r.wu.station}出发，提前准备早餐和随身证件。` });
      if (old.date === '2026-10-07' && /G1778|K502\/K503/.test(old.title)) essential[i].body = `${essential[i].title}；最终时刻与席位按订单核对。`;
    }
  }
  function header() {
    const r = returns(), box = document.querySelector('.critical');
    box.hidden = !!prefs.hideNotice;
    box.querySelector('p').textContent = `吴：10.07 ${r.wu.time} ${r.wu.station} → ${r.wu.to}；蔡：10.07 ${r.cai.time} ${r.cai.station} → ${r.cai.to}。10.06 晚提早休息。`;
  }
  function enhance() {
    const view = document.getElementById('view');
    document.querySelectorAll('[data-view]').forEach(el => el.setAttribute('aria-current', el.dataset.view === state.view ? 'page' : 'false'));
    if (state.view === 'itinerary') {
      if (!view.querySelector('.date-scroll-hint')) {
        const dates = view.querySelector('.days');
        dates.insertAdjacentHTML('afterend', '<div class="date-scroll-hint">左右滑动查看五天日程</div><div class="task-filters" aria-label="筛选旅伴">' + ['all', 'wu', 'cai', 'both'].map(k => `<button class="filter ${ui.filter === k ? 'active' : ''}" data-traveler-filter="${k}" aria-pressed="${ui.filter === k}">${k === 'all' ? '全部旅伴' : names[k]}</button>`).join('') + '</div>');
        // Keep the swipe cue accurate after rotation, resizing and horizontal scrolling.
        dates.addEventListener('scroll', dateScrollHint, {passive:true});
        dateScrollHint();
        requestAnimationFrame(() => { const selected = dates.querySelector('.active'); dates.scrollLeft = Math.max(0, selected.offsetLeft - dates.offsetLeft - (dates.clientWidth - selected.clientWidth)/2); dateScrollHint(); });
      }
      view.querySelectorAll('.event').forEach((el, i) => {
        const key = `event-${state.day}-${i}`, item = days[state.day].events[i];
        const person = local[`tag-${key}`] || eventPerson(state.day, i);
        const status = local[key] ? 'done' : (local[`progress-${key}`] || (Date.now() >= stamp(days[state.day].date, item.time) && Date.now() < stamp(days[state.day].date, item.end) ? 'active' : 'pending'));
        el.dataset.taskKey = key; el.dataset.taskIndex = i; el.dataset.person = person;
        el.classList.toggle('done', status === 'done'); el.classList.toggle('in-progress', status === 'active');
        el.classList.toggle('urgent', !local[key] && /赶车|已支付|返程|航班|车次/.test(item.kind + item.title) && urgent(days[state.day].date,item.time));
        el.tabIndex = 0; el.setAttribute('aria-label', `${item.time}至${item.end}，${item.title}，${status === 'done' ? '已完成' : status === 'active' ? '进行中' : '待完成'}，按空格切换完成`);
        el.hidden = ui.filter !== 'all' && ui.filter !== person;
        el.querySelector('.event-time').textContent = `${item.time}–${item.end}`;
        if (!el.querySelector('[data-task-person]')) el.querySelector('.event-top').insertAdjacentHTML('afterbegin', `<select class="tag-select" data-task-person="${key}" aria-label="任务旅伴">${['wu', 'cai', 'both'].map(k => `<option value="${k}" ${person === k ? 'selected' : ''}>${names[k]}</option>`).join('')}</select><button class="task-status" data-progress="${key}"></button>`);
        el.querySelector('[data-progress]').textContent = { done: '已完成', active: '进行中', pending: '待完成' }[status];
        el.querySelector('[data-progress]').setAttribute('aria-label', `任务状态：${{done:'已完成',active:'进行中',pending:'待完成'}[status]}，点击切换`);
        el.querySelector('[data-done]').checked = !!local[key];
      });
      if (!view.querySelector('.filter-empty')) view.querySelector('.timeline').insertAdjacentHTML('beforeend', '<p class="filter-empty meta">这一天没有该旅伴的任务。</p>');
      view.querySelector('.filter-empty').hidden = !!view.querySelector('.event:not([hidden])');
      view.querySelectorAll('[data-traveler-filter]').forEach(x => { x.classList.toggle('active', x.dataset.travelerFilter === ui.filter); x.setAttribute('aria-pressed',x.dataset.travelerFilter === ui.filter); });
    }
    if (state.view === 'food') {
      const visible = food.filter(f => state.area === '全部' || f.area === state.area);
      view.querySelectorAll('.food-card').forEach((el, i) => {
        const f = visible[i], id = food.indexOf(f);
        if (!el.querySelector('[data-food]')) el.insertAdjacentHTML('beforeend', `<div class="food-status"><button data-food="${id}" data-value="wish">♡ 想吃</button><button data-food="${id}" data-value="visited">✓ 已打卡</button></div><a class="address-link" href="${map(f.map)}" target="_blank" rel="noopener">${esc(f.map)}</a>`);
        el.querySelectorAll('[data-food]').forEach(x => { x.classList.toggle('selected', local[`food-${id}`] === x.dataset.value); x.setAttribute('aria-pressed',local[`food-${id}`] === x.dataset.value); });
      });
    }
    if (state.view === 'booking') {
      const deadlines = { park: ['2026-10-02', '23:59'], academy: ['2026-10-02', '23:59'], xpm: ['2026-10-03', '23:59'], li: ['2026-10-03', '23:59'], ktv: ['2026-10-02', '23:59'], car: ['2026-10-06', '20:00'], hotel: ['2026-10-02', '23:59'] };
      view.querySelectorAll('.reserve-card').forEach((el, i) => {
        const r = reservations[i], deadline = deadlines[r.id];
        el.classList.toggle('urgent', !local[`book-${r.id}`] && urgent(...deadline));
        el.querySelector('[data-book-note]').parentElement.firstChild.textContent = ui.connected ? '记下已预约时段或确认信息（与旅伴共享）' : '记下已预约时段或确认信息（仅此设备）';
        if (!el.querySelector('.deadline-note')) el.insertAdjacentHTML('beforeend', `<p class="deadline-note meta">准备事项截止：${deadline[0].slice(5)} ${deadline[1]}（计划检查时间，非官方放号时间）</p>`);
      });
    }
    if (state.view === 'tickets') {
      const cards = view.querySelectorAll('.ticket-card'), r = returns();
      [2, 3].forEach((index, j) => {
        const t = r[j ? 'cai' : 'wu'], card = cards[index];
        card.querySelector('h3').textContent = `${t.code} · ${j ? '10.07 → 10.08' : '10.07 周三'}`;
        const ends = card.querySelectorAll('.route-flight > div');
        ends[0].innerHTML = `<strong>${esc(t.time)}</strong><span>${esc(t.station)}</span>`;
        ends[1].innerHTML = `<strong>${esc(t.end)}${j ? ' +1' : ''}</strong><span>${esc(t.to)}</span>`;
        card.querySelector('p').textContent = `建议${leaveTime(j?'cai':'wu',t.time)}酒店出发，${arriveTime(j?'cai':'wu',t.time)}前到${t.station}。最终席位与运行状态按订单核对。`;
        card.querySelector('a').href = map(t.station);
      });
      cards.forEach((el, i) => el.classList.toggle('urgent', i < 4 && urgent(i === 1 ? '2026-10-02' : i === 0 ? '2026-10-03' : '2026-10-07', i === 0 ? '08:55' : i === 1 ? '16:34' : i === 2 ? r.wu.time : r.cai.time)));
      if (!view.querySelector('[data-edit-return]')) view.insertAdjacentHTML('beforeend', '<button class="secondary edit-return" data-edit-return>修改返程安排</button>');
    }
    if (state.view === 'guide') {
      if (!view.querySelector('#sharedPanel')) view.insertAdjacentHTML('afterbegin', sharedHTML());
      fillShared();
    }
    view.querySelectorAll('img').forEach(img => { img.loading = 'lazy'; img.addEventListener('error', () => { const p = document.createElement('div'); p.className = 'image-placeholder'; p.textContent = '图片暂未加载，可稍后查看原图'; img.replaceWith(p); }, { once: true }); });
    dateScrollHint();
  }
  function dateScrollHint() {
    const dates = document.querySelector('.days'), hint = document.querySelector('.date-scroll-hint'); if (!dates || !hint) return;
    const overflow = dates.scrollWidth - dates.clientWidth;
    hint.hidden = overflow <= 2;
    hint.textContent = dates.scrollLeft <= 2 ? '向左滑动，查看后面的日期' : dates.scrollLeft >= overflow-2 ? '已到 DAY5 · 向右滑动返回' : '左右滑动，查看五天日程';
    dates.classList.toggle('more-dates',dates.scrollLeft < overflow-2);
  }
  function sharedHTML() {
    return `<section id="sharedPanel" class="collaboration"><div class="section-bar"><h2>两个人的备忘</h2><span class="meta" data-sync-label>${ui.connected ? '共享已连接 · 自动保存' : '尚未连接共享旅行'}</span></div>
      <div id="connectPanel"><p>创建后，把旅伴专属链接发给对方。备忘和记账保存在同一份旅行中。</p><label>我是<select id="createAuthor"><option value="wu">吴</option><option value="cai">蔡</option></select></label><button class="primary" id="createShared">创建共享旅行</button><p id="sharedError" class="meta" role="status"></p></div>
      <div id="sharedConnected" hidden><div class="actions"><span id="identity" class="pill"></span><button id="sharePartner">复制旅伴链接</button><button id="disconnectShared">断开此设备</button></div><label class="memo-label">记下想说的话<textarea id="memoDraft" maxlength="2000" rows="3" placeholder="比如：明天想试试那家虾饺……"></textarea></label><div class="draft-actions"><span id="draftStatus" role="status">停下输入后自动保存</span><button class="small" id="newMemo">另写一条</button></div><div id="memoList"></div></div>
      <article class="guide-card packing-card"><h3>行李清单</h3><div class="packing-grid">${['身份证 / 学生证', '充电宝 / 充电线', '水 / 纸巾', '薄外套', '折叠伞', '舒适鞋', '常用药', '列车晚饭 / 早餐'].map((x, i) => `<label><input type="checkbox" data-pack="${i}"> ${x}</label>`).join('')}</div><p class="meta">${ui.connected ? '与旅伴共享勾选' : '未连接时，勾选仅保存在此设备'}</p></article>
      <article class="guide-card budget-card"><h3>旅行小账本</h3><label>总预算（元）<input id="budgetLimit" type="number" min="0" max="1000000" step="0.01" value="${Number(local.budget ?? 2680)}"></label><div id="budgetSummary"></div><form id="expenseForm"><label>金额<input name="amount" type="number" min="0.01" max="1000000" step="0.01" required inputmode="decimal"></label><label>分类<select name="category">${categories.map(c => `<option>${c}</option>`).join('')}</select></label><label>付款人<select name="payer"><option value="wu">吴</option><option value="cai">蔡</option><option value="both">双人均付</option></select></label><label>日期<input name="date" type="date" value="2026-10-03" required></label><label class="full">备注<input name="text" maxlength="200" placeholder="例如：午饭"></label><button class="primary" type="submit">记一笔</button><span class="meta" id="expenseStatus" role="status"></span></form><div id="expenseList"></div></article>
      <details class="changes"><summary>最近的修改记录</summary><div id="changeList"></div></details></section>`;
  }
  function fillShared() {
    const panel = document.getElementById('sharedPanel'); if (!panel) return;
    document.getElementById('connectPanel').hidden = !!ui.session;
    document.getElementById('sharedConnected').hidden = !ui.session;
    document.getElementById('identity').textContent = `我是${names[ui.author] || '旅伴'}`;
    document.getElementById('sharePartner').hidden = !ui.partnerToken;
    document.querySelectorAll('[data-pack]').forEach(el => { el.checked = !!local[`pack-${el.dataset.pack}`]; });
    const draft = document.getElementById('memoDraft');
    if (!draft.value && prefs.draft) draft.value = prefs.draft;
    document.getElementById('memoList').innerHTML = ui.notes.map(n => `<article class="memo-card ${n.id === ui.draftId ? 'editing' : ''}"><div class="memo-meta"><strong>${names[n.author]}</strong><time datetime="${esc(n.updated)}">${formatDate(n.updated)}</time>${n.id === ui.draftId ? '<span>正在编辑</span>' : ''}</div><p>${esc(n.text)}</p>${n.author === ui.author ? `<div class="actions"><button data-edit-note="${n.id}">编辑</button><button data-delete-note="${n.id}">删除我的留言</button></div>` : ''}</article>`).join('') || '<p class="memo-empty">还没有留言，写下第一条吧。</p>';
    const total = ui.expenses.reduce((s, e) => s + e.cents, 0), wu = ui.expenses.reduce((s, e) => s + (e.payer === 'wu' ? e.cents : e.payer === 'both' ? e.cents / 2 : 0), 0), cai = total - wu;
    const limit = Number(local.budget ?? 2680);
    document.getElementById('budgetSummary').innerHTML = `<div class="stat-row"><div class="stat">已消费<strong>${money(total)}</strong></div><div class="stat">预算剩余<strong>${money(limit * 100 - total)}</strong></div></div><p class="meta">吴支付 ${money(wu)} · 蔡支付 ${money(cai)} · 每人均摊 ${money(total / 2)}</p><div class="category-totals">${categories.map(c => `<span>${c} ${money(ui.expenses.filter(e => e.category === c).reduce((s, e) => s + e.cents, 0))}</span>`).join('')}</div>`;
    document.getElementById('expenseList').innerHTML = ui.expenses.map(e => `<div class="expense-row"><div><strong>${money(e.cents)}</strong> · ${e.category}<p class="meta">${e.date} · ${names[e.payer]}付款${e.text ? ` · ${esc(e.text)}` : ''}</p></div>${e.author === ui.author ? `<button class="small" data-delete-expense="${e.id}">删除</button>` : ''}</div>`).join('');
    document.getElementById('expenseForm').querySelector('button').disabled = !ui.connected;
    document.getElementById('expenseStatus').textContent = ui.connected ? '' : '连接共享旅行后即可记账';
    document.getElementById('changeList').innerHTML = ui.changes.map(x => `<p class="meta">${names[x.author] || '旅伴'} · ${formatDate(x.created)}<br>${esc(x.label)}</p>`).join('') || '<p class="meta">还没有修改记录。</p>';
  }
  async function saveDraft() {
    const draft = document.getElementById('memoDraft'), value = draft?.value ?? prefs.draft ?? '';
    if (!value.trim()) return true;
    const status = text => { const el = document.getElementById('draftStatus'); if (el) el.textContent = text; };
    prefs.draft = value; prefs.draftId = ui.draftId; setPrefs();
    if (!ui.connected || ui.saving || ui.deleting) return false;
    const id = ui.draftId; ui.saving = true;
    if (ui.notes.some(n => n.id === id && n.text === value.trim())) { ui.saving = false; status('已自动保存'); return true; }
    status('保存中…');
    try {
      await request(`notes/${id}`, 'PUT', { text: value });
      status('已自动保存');
      await refresh();
      return true;
    } catch (e) { status(`${e.message}，输入已保留`); return false; }
    finally { ui.saving = false; if ((document.getElementById('memoDraft')?.value ?? prefs.draft) !== value) saveDraft(); }
  }
  function exportText() {
    return `长沙let's go！\n2026.10.03—10.07 · 伊麦酒店 / 涂家冲\n\n${days.map((d, i) => `DAY${i + 1} ${d.date} ${d.title}\n${d.events.map((e, n) => `${e.time}–${e.end} [${names[local[`tag-event-${i}-${n}`] || eventPerson(i, n)]}] ${e.title}\n地址：${e.place}\n${e.body}\n交通：${e.transit}`).join('\n\n')}\n雨天 / 人流备选：${d.planB}`).join('\n\n')}\n\n提醒：时刻以订单为准，计划不会替你预约。`;
  }
  function preparePrint() {
    document.getElementById('printTrip').innerHTML = `<h1>长沙let's go！</h1><p>2026.10.03–10.07 · 双人 · 伊麦酒店 / 涂家冲</p>${days.map((d, i) => `<section class="print-day"><h2>DAY ${i + 1} · ${d.date} · ${d.title}</h2><p>${esc(d.route)}</p>${d.events.map((e, n) => `<article><strong>${e.time}–${e.end} · ${names[local[`tag-event-${i}-${n}`] || eventPerson(i, n)]} · ${esc(e.title)}</strong><p>${esc(e.body)}</p><p>地址：${esc(e.place)}<br>交通：${esc(e.transit)}</p></article>`).join('')}<p>备选：${esc(d.planB)}</p></section>`).join('')}<section><h2>餐厅备选</h2>${food.map(f => `<article><strong>${esc(f.name)} · ${esc(f.branch)}</strong><p>${esc(f.cost)} · ${esc(f.order)}</p><p>地址检索：${esc(f.map)}</p></article>`).join('')}</section>`;
  }
  function downloadText() { const url = URL.createObjectURL(new Blob([exportText()], { type: 'text/plain;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = '长沙双人行程.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 3000); }
  function search(q) {
    const box = document.getElementById('searchResults'); q = q.trim().toLowerCase();
    if (!q) { box.hidden = true; return; }
    const results = [];
    days.forEach((d, day) => d.events.forEach((e, index) => results.push({ view: 'itinerary', day, index, title: `DAY${day + 1} ${e.time} · ${e.title}`, text: Object.values(e).join(' ') })));
    food.forEach(f => results.push({ view: 'food', title: `${f.name} · ${f.branch}`, text: Object.values(f).join(' ') }));
    reservations.forEach(r => results.push({ view: 'booking', title: r.name, text: Object.values(r).join(' ') }));
    essential.forEach(e => results.push({ view: 'tickets', title: e.title, text: Object.values(e).join(' ') }));
    results.push({ view: 'guide', title: '出行备忘 · 交通、天气、预算与行李', text: cleanText(renderGuide()) });
    ui.notes.forEach(n => results.push({ view: 'guide', title: `${names[n.author]}的备忘`, text: n.text }));
    ui.expenses.forEach(e => results.push({ view: 'guide', title: `${e.category} · ${money(e.cents)}`, text: `${e.category} ${e.text} ${e.date}` }));
    const hits = results.filter(r => `${r.title} ${r.text}`.toLowerCase().includes(q)).slice(0, 25);
    box.hidden = false; box.innerHTML = hits.map(r => `<button data-search-view="${r.view}" ${r.day !== undefined ? `data-search-day="${r.day}" data-search-index="${r.index}"` : ''}><strong>${esc(r.title)}</strong><span>${esc(r.text.slice(0, 100))}</span></button>`).join('') || '<p>没有匹配内容，试试景点、菜名或车次。</p>';
  }
  function editReturnDialog() {
    const r = returns(); document.getElementById('returnFields').innerHTML = ['wu', 'cai'].map(person => `<fieldset><legend>${names[person]} · 10.07返程${person === 'cai' ? ' / 次日到达' : ''}</legend>${[['time', '出发时间', 'time'], ['end', '到达时间', 'time'], ['station', '出发车站', 'text'], ['code', '车次', 'text'], ['to', '到达车站', 'text']].map(([key, label, type]) => `<label>${label}<input name="${person}-${key}" type="${type}" maxlength="60" required value="${esc(r[person][key])}"></label>`).join('')}</fieldset>`).join(''); document.getElementById('returnDialog').showModal();
  }
  document.documentElement.dataset.theme = prefs.theme || 'light';
  document.querySelector('.topbar').insertAdjacentHTML('afterend', '<div class="global-tools"><label class="search-label"><span class="sr-only">搜索全攻略</span><input id="globalSearch" type="search" placeholder="搜索景点、美食、车次或备忘…" autocomplete="off"></label><button class="small" id="themeToggle" aria-label="切换浅色或暗色模式">明暗切换</button><div id="searchResults" hidden role="region" aria-label="搜索结果"></div></div><div class="export-tools"><button class="small" id="exportPDF">PDF / 打印行程</button><button class="small" id="exportText">导出纯文本</button><button class="small" id="showNotice">返程提示</button></div>');
  document.querySelector('.critical').insertAdjacentHTML('beforeend', '<button class="notice-close" id="hideNotice" aria-label="收起返程提示">×</button>');
  document.body.insertAdjacentHTML('beforeend', '<button id="backTop" class="back-top" aria-label="返回顶部" hidden>↑</button><section id="printTrip"></section><dialog id="returnDialog"><form id="returnForm"><div class="dialog-head"><h2>修改返程安排</h2><button class="close" type="button" id="closeReturn" aria-label="关闭">×</button></div><p>顶部提示、DAY5、票住和日历提醒一起更新。修改时刻后，请核对当日交通缓冲。</p><div id="returnFields"></div><button class="primary wide" type="submit">保存返程安排</button></form></dialog>');
  render = function() { originalRender(); enhance(); header(); document.getElementById('view').classList.remove('view-enter'); requestAnimationFrame(() => document.getElementById('view').classList.add('view-enter')); };
  dayCalendar = (d,i) => originalDayCalendar(d,i).map((e,n) => ({...e,person:local[`tag-event-${i}-${n}`] || e.person}));
  applyReturns(); render();
  document.getElementById('globalSearch').addEventListener('input', e => search(e.target.value));
  document.getElementById('globalSearch').addEventListener('keydown', e => { if (e.key === 'Escape') document.getElementById('searchResults').hidden = true; });
  document.addEventListener('click', async e => {
    const button = e.target.closest('button'), row = e.target.closest('.event');
    if (row && !e.target.closest('button,a,input,select,label,summary,details')) { const checkbox = row.querySelector('[data-done]'); checkbox.checked = !checkbox.checked; checkbox.dispatchEvent(new Event('change', { bubbles: true })); }
    if (!button) return;
    if (button.dataset.travelerFilter) { ui.filter = button.dataset.travelerFilter; enhance(); }
    else if (button.dataset.progress) { const key = button.dataset.progress; update(key, false, '调整任务状态'); update(`progress-${key}`, local[`progress-${key}`] === 'active' ? 'pending' : 'active', '调整任务状态'); enhance(); }
    else if (button.dataset.food !== undefined) { const key = `food-${button.dataset.food}`; update(key, local[key] === button.dataset.value ? '' : button.dataset.value, '更新美食打卡'); enhance(); }
    else if (button.dataset.searchView) { state.area = '全部'; ui.filter = 'all'; if (button.dataset.searchDay !== undefined) state.day = Number(button.dataset.searchDay); changeView(button.dataset.searchView); document.getElementById('searchResults').hidden = true; const target = document.querySelector(`[data-task-index="${button.dataset.searchIndex}"]`); if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); target.classList.add('search-hit'); } }
    else if (button.hasAttribute('data-edit-return')) editReturnDialog();
    else if (button.dataset.deleteNote || button.dataset.deleteExpense) {
      const kind = button.dataset.deleteNote ? 'notes' : 'expenses', id = button.dataset.deleteNote || button.dataset.deleteExpense;
      if (ui.saving || ui.deleting) { toast('正在保存，请稍后再试'); return; }
      ui.deleting = id; clearTimeout(draftTimer); button.disabled = true;
      try {
        await request(`${kind}/${id}`, 'DELETE');
        // Retire a deleted draft so the retry timer cannot recreate that message.
        if (kind === 'notes' && id === ui.draftId) { ui.draftId = crypto.randomUUID(); prefs.draftId = ui.draftId; prefs.draft = ''; setPrefs(); document.getElementById('memoDraft').value = ''; document.getElementById('draftStatus').textContent = '停下输入后自动保存'; }
        await refresh();
      } catch (err) { toast(err.message); }
      finally { ui.deleting = ''; button.disabled = false; }
    }
    else if (button.dataset.editNote) { const note = ui.notes.find(n => n.id === button.dataset.editNote); ui.draftId = note.id; prefs.draftId = note.id; prefs.draft = note.text; setPrefs(); document.getElementById('memoDraft').value = note.text; document.getElementById('memoDraft').focus(); fillShared(); }
    else if (button.id === 'themeToggle') { prefs.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = prefs.theme; setPrefs(); }
    else if (button.id === 'hideNotice') { prefs.hideNotice = true; setPrefs(); header(); }
    else if (button.id === 'showNotice') { prefs.hideNotice = false; setPrefs(); header(); }
    else if (button.id === 'backTop') window.scrollTo({ top: 0, behavior: 'smooth' });
    else if (button.id === 'exportText') downloadText();
    else if (button.id === 'exportPDF') { preparePrint(); window.print(); }
    else if (button.id === 'closeReturn') document.getElementById('returnDialog').close();
    else if (button.id === 'createShared') {
      button.disabled = true;
      try { const result = await request('rooms', 'POST', { author: document.getElementById('createAuthor').value }); ui.session = result.token; prefs.session = result.token; setPrefs(); await refresh(); for(const [key,value] of Object.entries(local)) if (/^(event-|book-|note-|tag-|progress-|food-|pack-|return$|budget$)/.test(key)) pending.set(key,{key,value,label:'同步已有旅行记录'}); await flush(); render(); }
      catch (err) { document.getElementById('sharedError').textContent = '共享暂不可用。需要先连接保存服务，再邀请旅伴；输入不会被标记为已同步。'; }
      finally { button.disabled = false; }
    }
    else if (button.id === 'disconnectShared') { ui.session = ''; ui.connected = false; ui.notes = []; ui.expenses = []; ui.partnerToken = ''; prefs.session = ''; pending.clear(); setPrefs(); render(); }
    else if (button.id === 'sharePartner') { const link = `${location.origin}${location.pathname}#join=${ui.partnerToken}`; try { await navigator.clipboard.writeText(link); toast('旅伴专属链接已复制，请仅发给旅伴'); } catch { const input = document.createElement('input'); input.value = link; button.after(input); input.select(); toast('请复制框内的旅伴链接'); } }
    else if (button.id === 'newMemo') { if (!await saveDraft()) { toast('请等备忘保存成功后再另写一条'); return; } ui.draftId = crypto.randomUUID(); prefs.draft = ''; prefs.draftId = ui.draftId; setPrefs(); document.getElementById('memoDraft').value = ''; document.getElementById('draftStatus').textContent = '停下输入后自动保存'; fillShared(); }
  });
  document.addEventListener('change', e => {
    const el = e.target;
    if (el.dataset.done) { update(el.dataset.done, el.checked, '勾选日程任务'); enhance(); }
    else if (el.dataset.book) update(`book-${el.dataset.book}`, el.checked, '更新预约确认');
    else if (el.dataset.bookNote) update(`note-${el.dataset.bookNote}`, el.value, '修改预约备注');
    else if (el.dataset.taskPerson) { update(`tag-${el.dataset.taskPerson}`, el.value, '调整任务旅伴'); enhance(); }
    else if (el.dataset.pack !== undefined) update(`pack-${el.dataset.pack}`, el.checked, '更新行李清单');
    else if (el.id === 'budgetLimit') { const v = Number(el.value); if (Number.isFinite(v) && v >= 0 && v <= 1000000) { update('budget', v, '修改旅行预算'); fillShared(); } }
  });
  let draftTimer;
  document.addEventListener('input', e => { if (e.target.id === 'memoDraft') { prefs.draft = e.target.value; prefs.draftId = ui.draftId; setPrefs(); clearTimeout(draftTimer); draftTimer = setTimeout(saveDraft, 700); } });
  document.addEventListener('submit', async e => {
    if (e.target.id === 'expenseForm') {
      e.preventDefault(); const form = e.target, button = form.querySelector('button'); button.disabled = true;
      try { await request(`expenses/${crypto.randomUUID()}`, 'PUT', Object.fromEntries(new FormData(form))); form.reset(); await refresh(); }
      catch (err) { document.getElementById('expenseStatus').textContent = err.message; }
      finally { button.disabled = !ui.connected; }
    }
    if (e.target.id === 'returnForm') {
      e.preventDefault(); const input = new FormData(e.target), r = structuredClone(baseReturns);
      for (const person of ['wu', 'cai']) for (const key of ['time', 'end', 'station', 'code', 'to']) r[person][key] = String(input.get(`${person}-${key}`)).trim();
      if (r.wu.end <= r.wu.time || r.cai.time > '23:30' || r.wu.time < '03:00' || r.cai.time < '03:00') { toast('请核对当日到达时间与出发时段'); return; }
      update('return', r, '修改返程安排，联动DAY5与提醒'); applyReturns(); document.getElementById('returnDialog').close(); render();
    }
  });
  window.addEventListener('scroll', () => { document.getElementById('backTop').hidden = window.scrollY < 400; }, { passive: true });
  window.addEventListener('resize',dateScrollHint,{passive:true});
  document.addEventListener('keydown',e => { if (e.target.matches('.event') && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); e.target.querySelector('[data-done]').click(); } });
  window.addEventListener('beforeprint', preparePrint);
  if (prefs.draftId) ui.draftId = prefs.draftId;
  const invitation = new URLSearchParams(location.hash.slice(1)).get('join');
  if (invitation) {
    if (invitation !== ui.session) {
      // A new invitation must not bring a previous room's notes or settings along.
      for (const key of Object.keys(local)) if (/^(event-|book-|note-|tag-|progress-|food-|pack-|return$|budget$)/.test(key)) delete local[key];
      save(); prefs.draft = ''; ui.draftId = crypto.randomUUID(); prefs.draftId = ui.draftId;
    }
    ui.session = invitation; prefs.session = invitation; setPrefs(); history.replaceState(null, '', location.pathname + location.search); changeView('guide');
  }
  request('health').then(() => { ui.available = true; }).catch(() => {});
  refresh();
  setInterval(async () => { if (ui.session) { await refresh(); await flush(); if(ui.connected && prefs.draft) await saveDraft(); } }, 5000);
  setInterval(() => { if (!document.querySelector('input:focus,textarea:focus,select:focus')) enhance(); }, 60000);
})();
