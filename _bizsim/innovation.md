---
title: "Topic 2 Innovation"
author: Huang Jie
layout: post
permalink: /business-sim/innovation/
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/business-sim/sim.css">

<style>
.bsim .stage-pills { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 12px; }
.bsim .stage-pill { border: 1.5px solid #dbe3ef; background: #fff; color: #64748b; border-radius: 16px; padding: 4px 12px; font-size: 15px; font-weight: 700; }
.bsim .stage-pill.on { background: var(--c, #2c6bac); color: #fff; }
.bsim .stage-pill.done { color: #2e7d4f; border-color: #b7dfc4; }
.bsim .coach-grid { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(240px, .8fr); gap: 14px; align-items: start; }
.bsim .speech-card { background: #f4fbf6; border: 1.5px solid #cfe8d6; border-radius: 12px; padding: 12px 14px; }
.bsim .speech-card h4 { margin: 0 0 8px; font-size: 17px; color: #1f5f3a; }
.bsim .speech-card ol { margin: 0; padding-left: 20px; }
.bsim .speech-card li { font-size: 17px; margin: 0 0 8px; color: #1e293b; }
.bsim .say-box { width: 100%; min-height: 96px; border: 1.5px solid #cfd8e6; border-radius: 10px; padding: 12px 14px; font-size: 18px; line-height: 1.55; font-family: inherit; resize: vertical; }
.bsim .coach-note { display: block; margin-top: 6px; font-size: 15.5px; color: #475569; }
.bsim .coach-ask { display: block; margin-top: 6px; font-weight: 700; }
@media (max-width: 800px) { .bsim .coach-grid { grid-template-columns: 1fr; } }
</style>

<div class="bsim">

<div id="v-topic">

<div class="bs-crumb"><a href="{{ site.baseurl }}/business-sim-platform/">商务英语情境化模拟平台</a><span class="sep">/</span>Innovation</div>

<div class="bs-hero">
  <h2>Nvidia: A Tool in Human Hands</h2>
  <p>Jensen Huang · AI as a tool · three public concerns</p>
</div>

<div class="bs-section">
  <h3>Scenario <span class="bs-note">情境</span></h3>
  <p class="bs-big">Nvidia must answer public concerns about AI without giving up Huang's view: AI stays a tool under human control.</p>
  <p class="bs-note">Nvidia 要回应公众对 AI 的忧虑，同时守住黄仁勋的看法：AI 仍是由人控制的工具。案例只点名了 Jensen Huang。另外两个角色是案例里的两方压力，不是另编的公司人物。入场白按课文改写，不是原话。</p>
</div>

<div class="bs-section">
  <div class="bs-problem">
    <div class="q">Problem <span class="bs-note">问题</span></div>
    <div class="bs-big">How should Nvidia address privacy, job displacement, and autonomous decision-making?</div>
    <div class="bs-note">公司怎样回应隐私、岗位被取代，以及机器自主决策？</div>
    <div class="bs-options" style="margin-top:12px">
      <div class="bs-opt"><b>A Speak</b>Keep Huang's view, and point to rules and society.<br><span class="bs-note">坚持他的说法，把伦理交给监管和社会</span></div>
      <div class="bs-opt"><b>B Build</b>State the product limit: systems process data; people decide.<br><span class="bs-note">说清产品边界：系统处理数据，人做决定</span></div>
      <div class="bs-opt"><b>C Both</b>One public line, plus one action for each concern.<br><span class="bs-note">一句公开口径，再加针对每件忧虑的做法</span></div>
    </div>
  </div>
  <div class="bs-problem" style="border-left-color:#2e7d4f;background:#f4fbf6;border-color:#cfe8d6">
    <div class="q" style="color:#1f5f3a">Goal <span class="bs-note">目标</span></div>
    <div class="bs-big">Practice your own three sentences with the AI coach. Then close the page and say them to your group.</div>
    <div class="bs-note">先和 AI 助手练自己的三句。练完后合上网页，用这些句子和小组讨论。时间够可以换一个角色再练。</div>
  </div>
</div>

<div class="bs-section">
  <h3>Choose your role <span class="bs-note">选择角色</span></h3>
  <div class="role-grid" id="role-cards"></div>
</div>

</div>

<div id="v-role" class="hidden"></div>

</div>

<script>
(function () {
  // 阿里云 llm-proxy 的 HTTP 触发器地址。留空，或地址加 ?mock=1，则使用本地模拟，不调用 Grok。
  var LLM_ENDPOINT = 'https://llm-proxy-ranjernycj.cn-hongkong.fcapp.run';
  var GAME_ID = 'nvidia-tool';
  var STORE_KEY = 'bsim_v2_' + GAME_ID + '_';

  var STAGES = [
    { en: '1 Your view', zh: '你的态度', ask: 'To what extent do you agree with Huang?', need: 'State to what extent you agree, and give one reason from the case.' },
    { en: '2 One action', zh: '一件做法', ask: 'Name one concern — privacy, jobs, or autonomous decisions — and say what Nvidia should do about it.', need: 'Name one concern and one company action.' },
    { en: '3 Your lines', zh: '三句发言', ask: 'Say your point in two or three sentences. Include your role boundary.', need: 'Two or three sentences a classmate can hear, including the role boundary.' }
  ];

  var NOTES = [
    { group: 'Extent 同意到什么程度', items: [
      ['I largely agree', '我大体同意'], ['I partly agree', '我部分同意'], ['To a limited extent', '在有限程度上'],
      ['I have reservations about', '我对…有保留'], ['I see your point, but', '我理解，但是'] ] },
    { group: 'Action 公司做法', items: [
      ['keep humans in control', '人保持控制'], ['rely on regulatory frameworks', '依靠监管框架'],
      ['set a clear privacy line', '划定隐私界线'], ['support people whose jobs change', '支持岗位会变化的人'],
      ['limit autonomous decisions', '限制自主决策'] ] },
    { group: 'Case language 案例用语', items: [
      ['a tool under human control', '由人控制的工具'], ['process data', '处理数据'],
      ['parallel computation', '并行计算'], ['job displacement', '岗位被取代'],
      ['no consciousness', '不会产生意识'] ] }
  ];

  var BANK = [
    { group: 'Taking a position 表态', items: [
      ['To a large extent, I agree that AI should stay under human control.', '我在很大程度上同意，AI 应处于人的控制之下。'],
      ['I partly agree. AI is a tool, but the appliance comparison is not enough.', '我部分同意。AI 是工具，但家电类比不够。'],
      ['I have reservations about how relaxed this sounds.', '我对这种轻松的口气有保留。'] ] },
    { group: 'Using the case 用上案例', items: [
      ['GPUs accelerate AI because they handle parallel computation.', 'GPU 能加速 AI，因为它们处理并行计算。'],
      ['Ethical use depends on regulatory and societal frameworks.', '合乎伦理的使用取决于监管和社会框架。'],
      ['The system is designed to process data, not to develop consciousness.', '系统设计来处理数据，不是为了产生意识。'] ] },
    { group: 'Proposing an action 提出做法', items: [
      ['Nvidia should address privacy by saying what data the system processes.', 'Nvidia 应说明系统处理哪些数据，以此回应隐私问题。'],
      ['On job displacement, we should admit that some work will change.', '关于岗位被取代，我们应承认有些工作会变化。'],
      ['For autonomous decisions, a person should make the final call.', '对于自主决策，应由人做出最后决定。'] ] },
    { group: 'Closing 收束', items: [
      ['So our public line is: AI stays a tool under human control.', '所以我们的公开口径是：AI 仍是由人控制的工具。'],
      ['Shall we agree on one action for each concern?', '我们为每件忧虑定一件做法，好吗？'],
      ['Then it is settled.', '那就这么定了。'] ] }
  ];

  var ROLES = {
    huang: {
      emoji: '🎙️', name: 'Jensen Huang', zh: '首席执行官', color: '#1e3a8a',
      view: 'AI is a tool. Humans stay in control.', viewZh: 'AI 是工具。人保持控制。',
      boundary: 'Do not describe AI as an independent mind. A company action is acceptable only if humans remain in control.',
      task: 'Say how far you agree with the tool view, then accept one practical action that still keeps humans in control.',
      taskZh: '说明你在多大程度上同意“工具”这个看法，再接受一件仍然由人控制的具体做法。',
      words: [['a tool under human control', '由人控制的工具'], ['like any widely used tool', '像任何普及的工具'], ['no consciousness', '不会产生意识']]
    },
    expert: {
      emoji: '🔎', name: 'Industry Expert', zh: '受邀行业专家', color: '#b45309',
      view: 'Name the three concerns in concrete words.', viewZh: '把三件忧虑说具体。',
      boundary: 'Privacy, job displacement, and autonomous decision-making must be answered one by one. A comparison with appliances is not a full answer.',
      task: 'Say which part of Huang\'s view you accept, then require one company action for a named concern.',
      taskZh: '说明你接受黄仁勋看法的哪一部分，再要求公司对一件点名的忧虑做出行动。',
      words: [['privacy', '隐私'], ['job displacement', '岗位被取代'], ['autonomous decision-making', '自主决策']]
    },
    gpu: {
      emoji: '🖥️', name: 'GPU Business Lead', zh: '业务负责人', color: '#2e7d4f',
      view: 'The reply must match what the chips actually do.', viewZh: '回应必须和芯片真正做的事一致。',
      boundary: 'Systems process data. They do not make independent decisions. The answer must not shut down the AI business.',
      task: 'Give one accurate technical limit, and one action the company can still sell.',
      taskZh: '给出一条准确的技术边界，以及一件公司仍能继续开展 AI 业务的做法。',
      words: [['process data, not independent decisions', '处理数据，不自行决策'], ['parallel computation', '并行计算'], ['protect the AI business', '保住 AI 业务']]
    }
  };

  var state = { roleId: null, stage: 0, attempts: 0, lines: [], chat: [], notes: [], finished: false };
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var isMock = function () { return !LLM_ENDPOINT || /[?&]mock=1/.test(location.search); };

  function show(v) {
    $('v-topic').classList.toggle('hidden', v !== 'topic');
    $('v-role').classList.toggle('hidden', v !== 'role');
    window.scrollTo(0, 0);
  }

  function renderRoleCards() {
    $('role-cards').innerHTML = Object.keys(ROLES).map(function (id) {
      var r = ROLES[id];
      var words = r.words.map(function (w) { return '<span class="role-word">' + esc(w[0]) + '<small>' + esc(w[1]) + '</small></span>'; }).join('');
      return '<div class="role-card" style="--c:' + r.color + '"><div class="role-emoji">' + r.emoji + '</div><div class="role-name">' + esc(r.name) + '</div><div class="role-zh">' + esc(r.zh) + '</div>' +
        '<p class="role-line">' + esc(r.view) + '<span class="zh">' + esc(r.viewZh) + '</span></p>' +
        '<p class="role-line">' + esc(r.task) + '<span class="zh">' + esc(r.taskZh) + '</span></p>' +
        '<div class="role-sub">Words to try</div><div class="role-words">' + words + '</div>' +
        '<div class="role-enter"><button class="btn btn-primary" data-role="' + id + '">Practice 开始练习 →</button></div></div>';
    }).join('');
    Array.prototype.forEach.call($('role-cards').querySelectorAll('button'), function (b) {
      b.onclick = function () { enterRole(b.dataset.role); };
    });
  }

  function freshChat() {
    return [
      { type: 'sys', text: '第 1 轮 · 只说你的态度和一条理由' },
      { type: 'coach', logic: '用英语说一句即可。助手会点评逻辑和用词，然后请你补下一句。', ask: STAGES[0].ask }
    ];
  }

  function enterRole(roleId) {
    state.roleId = roleId;
    state.notes = [];
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORE_KEY + roleId)); } catch (e) {}
    if (saved && saved.chat && saved.chat.length) {
      state.stage = saved.stage || 0;
      state.attempts = saved.attempts || 0;
      state.lines = saved.lines || [];
      state.chat = saved.chat;
      state.finished = !!saved.finished;
    } else {
      state.stage = 0;
      state.attempts = 0;
      state.lines = [];
      state.chat = freshChat();
      state.finished = false;
    }
    renderRole();
    show('role');
  }

  function save() {
    try {
      localStorage.setItem(STORE_KEY + state.roleId, JSON.stringify({
        stage: state.stage, attempts: state.attempts, lines: state.lines, chat: state.chat, finished: state.finished
      }));
    } catch (e) {}
  }

  function bankHtml() {
    return BANK.map(function (g) {
      return '<div class="pb-group"><div class="pb-gname">' + esc(g.group) + '</div>' + g.items.map(function (it) {
        return '<div class="pb-item" data-en="' + esc(it[0]) + '"><span class="pb-en">' + esc(it[0]) + '</span><span class="pb-zh">' + esc(it[1]) + '</span></div>';
      }).join('') + '</div>';
    }).join('');
  }

  function renderRole() {
    var me = ROLES[state.roleId];
    var notes = NOTES.map(function (grp) {
      return '<div class="word-group"><div class="word-group-title">' + esc(grp.group) + '</div><div class="chips">' + grp.items.map(function (it) {
        return '<button type="button" class="chip" data-en="' + esc(it[0]) + '">' + esc(it[0]) + '<small>' + esc(it[1]) + '</small></button>';
      }).join('') + '</div></div>';
    }).join('');
    $('v-role').style.setProperty('--c', me.color);
    $('v-role').innerHTML = '<button class="bsim-back" id="back-topic">← 返回情境与角色</button>' +
      '<div class="rp-head"><span class="rp-badge">' + me.emoji + ' ' + esc(me.name) + ' · ' + esc(me.zh) + '</span><span class="rp-round" id="rp-round"></span></div>' +
      '<div class="rp-goal">' + esc(me.task) + ' ' + esc(me.taskZh) + '</div>' +
      '<div class="stage-pills" id="pills"></div>' +
      '<div class="coach-grid"><div><div class="chat-box" id="chat"></div>' +
      '<div id="composer"><div class="word-panel">' + notes +
      '<textarea class="say-box" id="say" placeholder="说一句英语，或打出来。Say one English sentence."></textarea>' +
      '<div class="rp-actions" style="margin-top:10px"><button class="btn btn-primary" id="send">发送给助手 Send</button><button class="btn btn-ghost" id="mic">语音输入 Speak</button></div>' +
      '<div class="rp-err" id="err"></div></div></div></div>' +
      '<aside class="speech-card"><h4>Your lines 带走的句子</h4><ol id="lines"></ol><p class="bs-note" id="lines-empty">你自己说清的句子会留在这里。</p></aside></div>' +
      '<details class="pb"><summary>句库 Phrasebank · 点击加到输入框</summary>' + bankHtml() + '</details>' +
      '<div class="rp-actions" style="margin-top:16px"><button class="btn btn-dl" id="dl">⬇ 下载我的句子</button><button class="btn btn-ghost" id="reset">重新练习</button></div>';
    $('back-topic').onclick = function () { show('topic'); };
    Array.prototype.forEach.call($('v-role').querySelectorAll('.chip'), function (c) {
      c.onclick = function () {
        var i = state.notes.indexOf(c.dataset.en);
        if (i >= 0) state.notes.splice(i, 1); else state.notes.push(c.dataset.en);
        c.classList.toggle('on', i < 0);
      };
    });
    Array.prototype.forEach.call($('v-role').querySelectorAll('.pb-item'), function (el) {
      el.onclick = function () {
        var box = $('say');
        if (!box) return;
        box.value = (box.value ? box.value.replace(/\s+$/, '') + ' ' : '') + el.dataset.en;
        box.focus();
      };
    });
    $('send').onclick = send;
    $('mic').onclick = listen;
    $('say').onkeydown = function (e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) send(); };
    $('dl').onclick = download;
    $('reset').onclick = function () {
      if (!confirm('确定清除这个角色的练习记录？')) return;
      localStorage.removeItem(STORE_KEY + state.roleId);
      enterRole(state.roleId);
    };
    renderChat();
    renderSide();
  }

  function renderSide() {
    var stage = STAGES[state.stage] || STAGES[2];
    $('pills').innerHTML = STAGES.map(function (s, i) {
      var cls = i === state.stage && !state.finished ? ' on' : (i < state.stage || state.finished ? ' done' : '');
      return '<span class="stage-pill' + cls + '">' + esc(s.en) + '</span>';
    }).join('');
    $('rp-round').textContent = state.finished ? '三轮已完成' : ('第 ' + (state.stage + 1) + ' / 3 轮 · 本轮第 ' + (state.attempts + 1) + ' 次') + (isMock() ? ' · 模拟' : '');
    $('lines').innerHTML = state.lines.map(function (line) { return '<li>' + esc(line) + '</li>'; }).join('');
    $('lines-empty').style.display = state.lines.length ? 'none' : '';
    $('composer').classList.toggle('hidden', state.finished);
  }

  function renderChat() {
    var me = ROLES[state.roleId];
    $('chat').innerHTML = state.chat.map(function (m) {
      if (m.type === 'sys') return '<div class="msg-sys">' + esc(m.text) + '</div>';
      if (m.type === 'me') return '<div class="msg me" style="--c:' + me.color + '"><div class="msg-who">You</div><div class="msg-bubble">' + esc(m.text) + '</div></div>';
      var word = (m.word && m.word.try) ? '<span class="coach-note">用词：' + esc(m.word.instead || '…') + ' → ' + esc(m.word.try) + '</span>' : '';
      var ask = m.ask ? '<span class="coach-ask">' + esc(m.ask) + '</span>' : '';
      return '<div class="msg" style="--c:#0f766e"><div class="msg-who">Coach 助手</div><div class="msg-bubble">' + esc(m.logic || '') + word + ask + '</div></div>';
    }).join('');
    $('chat').scrollTop = $('chat').scrollHeight;
  }

  function systemPrompt() {
    var me = ROLES[state.roleId];
    return 'You are a business English coach for Chinese first-year undergraduates at B1 level. ' +
      'Case facts only: Nvidia was founded in 1993 by Jensen Huang and colleagues and first known for gaming GPUs. Around 2013 Huang shifted the company toward AI because GPUs handle parallel computation and can accelerate AI. ' +
      'His public view is pragmatic: AI is a tool under human control, as widely used as household appliances; ethical use depends on regulatory and societal frameworks. Nvidia technology is designed to process data, not to make independent decisions or develop consciousness. ' +
      'Concerns: privacy, job displacement, autonomous decision-making. Do not invent quotations or extra executives. ' +
      'The student plays ' + me.name + ' (' + me.zh + '). Role boundary: ' + me.boundary + ' ' +
      'Do not role-play other people. Do not write the full speech for the student. ' +
      'Return ONLY JSON with keys logic, word, keep, ask, stageClear. ' +
      'logic: one short Chinese sentence on what is clear and what is missing. ' +
      'word: {"instead":"a short phrase they used or empty","try":"one better English phrase or empty"}. ' +
      'keep: their usable English sentence with only a light grammar fix, or "" if they did not say English. ' +
      'ask: one English question under 18 words that asks them to say the missing piece. ' +
      'stageClear: true only if their own latest words meet the stage requirement. ' +
      'If they write Chinese, ask them to try the same idea in English and put a usable English phrase in word.try.';
  }

  function userPrompt(text) {
    var me = ROLES[state.roleId];
    var stage = STAGES[state.stage];
    var hist = state.chat.filter(function (m) { return m.type === 'me' || m.type === 'coach'; }).slice(-6).map(function (m) {
      return m.type === 'me' ? ('Student: ' + m.text) : ('Coach ask: ' + (m.ask || ''));
    }).join('\n');
    return 'Role: ' + me.name + '\nStage ' + (state.stage + 1) + ' of 3. Requirement: ' + stage.need + '\nAttempt ' + (state.attempts + 1) + ' of 3 on this stage.\nNotes the student clicked: ' + (state.notes.join('; ') || 'none') + '\nRecent talk:\n' + hist + '\n\nStudent just said:\n' + text;
  }

  function mockReply(text) {
    var t = text.toLowerCase();
    var english = /[a-z]/i.test(text);
    var stage = state.stage;
    var clear = false;
    if (!english) {
      return { logic: '这句主要是中文。先把同一个意思说成英语。', word: { instead: '', try: 'I partly agree that AI should stay under human control.' }, keep: '', ask: 'Can you say that in one English sentence?', stageClear: false };
    }
    if (stage === 0) clear = /(agree|extent|reservation|partly|largely|limited)/.test(t) && text.length > 35;
    if (stage === 1) clear = /(privacy|job|autonom)/.test(t) && /(should|address|human|process|framework|support|limit)/.test(t);
    if (stage === 2) clear = text.length > 80;
    return {
      logic: clear ? '这句已经盖住了这一轮要说的内容。' : '意思有了，这一轮还缺一块，看下面的问题。',
      word: { instead: '', try: stage === 1 ? 'Nvidia should address this by keeping a human decision.' : '' },
      keep: text.replace(/\s+/g, ' ').trim(),
      ask: clear ? 'Good. Add one more precise word if you want.' : STAGES[stage].ask,
      stageClear: clear
    };
  }

  function parseLLM(raw) {
    var s = String(raw).replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    var o = JSON.parse(s);
    if (!o || typeof o !== 'object') throw new Error('bad format');
    return {
      logic: o.logic || '',
      word: o.word || {},
      keep: typeof o.keep === 'string' ? o.keep.trim() : '',
      ask: o.ask || '',
      stageClear: o.stageClear === true || o.stageClear === 'true'
    };
  }

  function callLLM(text) {
    return fetch(LLM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: systemPrompt(), user: userPrompt(text) })
    }).then(function (r) {
      return r.json().then(function (d) {
        if (!r.ok) throw new Error(d.error || ('HTTP ' + r.status));
        return parseLLM(d.content);
      });
    });
  }

  function advance(fromModel) {
    if (state.stage >= 2) {
      state.finished = true;
      state.chat.push({ type: 'sys', text: '三轮完成。请只用左边这些句子，合上网页，和同学当面说。' });
      return;
    }
    state.stage += 1;
    state.attempts = 0;
    state.chat.push({ type: 'sys', text: fromModel ? ('进入第 ' + (state.stage + 1) + ' 轮') : ('这一轮先到这里。进入第 ' + (state.stage + 1) + ' 轮') });
    state.chat.push({ type: 'coach', logic: STAGES[state.stage].zh, ask: STAGES[state.stage].ask });
  }

  function send() {
    if (state.finished) return;
    var box = $('say');
    var err = $('err');
    var text = box.value.replace(/\s+/g, ' ').trim();
    if (!text) { err.textContent = '先说一句，或打一句。'; return; }
    err.textContent = '';
    box.value = '';
    state.chat.push({ type: 'me', text: text });
    renderChat();
    var btn = $('send');
    btn.disabled = true;
    btn.textContent = '思考中…';
    var job = isMock() ? Promise.resolve(mockReply(text)) : callLLM(text);
    job.then(function (res) {
      state.attempts += 1;
      state.chat.push({ type: 'coach', logic: res.logic, word: res.word, ask: res.ask });
      if (res.keep && state.lines.indexOf(res.keep) < 0) state.lines.push(res.keep);
      if (res.stageClear || state.attempts >= 3) advance(!!res.stageClear);
      save();
      btn.disabled = false;
      btn.textContent = '发送给助手 Send';
      renderChat();
      renderSide();
    }).catch(function (e) {
      err.textContent = '没有连上助手：' + (e.message || e) + '。可以在地址后加 ?mock=1 先试流程。';
      btn.disabled = false;
      btn.textContent = '发送给助手 Send';
    });
  }

  function listen() {
    var Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    var err = $('err');
    if (!Rec) { err.textContent = '这台浏览器不能语音输入，请直接打字。'; return; }
    var rec = new Rec();
    rec.lang = 'en-US';
    err.textContent = '正在听…说完会填进输入框，你确认后再发送。';
    rec.onresult = function (e) {
      var said = e.results[0][0].transcript;
      var box = $('say');
      box.value = (box.value ? box.value.replace(/\s+$/, '') + ' ' : '') + said;
      err.textContent = '';
    };
    rec.onerror = function () { err.textContent = '没有听清。请再试一次，或直接打字。'; };
    try { rec.start(); } catch (e) { err.textContent = '麦克风没有打开。请直接打字。'; }
  }

  function download() {
    var me = ROLES[state.roleId];
    var L = ['# Nvidia: A Tool in Human Hands', '', 'Role: ' + me.name + ' (' + me.zh + ')', 'Date: ' + new Date().toLocaleString(), '', '## Lines to say', ''];
    if (!state.lines.length) L.push('(还没有留下句子)', '');
    state.lines.forEach(function (line, i) { L.push((i + 1) + '. ' + line); });
    L.push('', '## Practice', '');
    state.chat.forEach(function (m) {
      if (m.type === 'sys') L.push('', m.text);
      else if (m.type === 'me') L.push('', '**You:** ' + m.text);
      else L.push('', '**Coach:** ' + (m.logic || '') + (m.ask ? ' / ' + m.ask : ''));
    });
    var blob = new Blob(['\ufeff' + L.join('\n')], { type: 'text/markdown;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'business-sim-' + GAME_ID + '-' + state.roleId + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  renderRoleCards();
  show('topic');
})();
</script>
