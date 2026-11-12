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
.bsim .say-box { width: 100%; min-height: 72px; border: 1.5px solid #cfd8e6; border-radius: 10px; padding: 12px 14px; font-size: 18px; line-height: 1.55; font-family: inherit; resize: vertical; }
.bsim .coach-note { display: block; margin-top: 6px; font-size: 15.5px; color: #475569; }
.bsim .coach-ask { display: block; margin-top: 8px; font-weight: 700; }
.bsim .msg-bubble { white-space: pre-line; }
.bsim .mic-row { display: flex; align-items: center; gap: 12px; margin-top: 10px; }
.bsim .mic-btn { width: 56px; height: 56px; border: none; border-radius: 50%; background: var(--c, #2c6bac); color: #fff; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
.bsim .mic-btn:disabled { opacity: .45; }
.bsim .mic-btn.on { background: #b42318; }
.bsim .mic-btn svg { width: 26px; height: 26px; fill: currentColor; }
.bsim .mic-btn .stop-icon { display: none; }
.bsim .mic-btn.on .mic-icon { display: none; }
.bsim .mic-btn.on .stop-icon { display: block; }
.bsim .mic-bars { display: flex; align-items: flex-end; gap: 3px; height: 36px; width: 92px; }
.bsim .mic-bars i { display: block; flex: 1; height: 100%; background: #cbd5e1; border-radius: 2px; transform: scaleY(.12); transform-origin: bottom; }
.bsim .mic-bars.on i { background: var(--c, #2c6bac); }
.bsim .mic-live { font-size: 15px; color: #64748b; line-height: 1.4; }
.bsim .go-btn { display: block; width: 100%; min-height: 56px; margin-top: 18px; font-size: 18px; }
.bsim .role-enter .btn { width: 100%; min-height: 52px; }
.bsim .bsim-back { min-height: 44px; }
@media (max-width: 800px) {
  .bsim .coach-grid { grid-template-columns: 1fr; }
  .bsim .bs-hero { padding: 16px 18px; }
  .bsim .bs-hero h2 { font-size: 28px; }
  .bsim .chat-box { height: 38vh; min-height: 200px; }
  .bsim .rp-actions .btn { min-height: 48px; }
}
</style>

<div class="bsim">

<div id="v-scene">

<div class="bs-crumb"><a href="{{ site.baseurl }}/business-sim-platform/">Business English</a><span class="sep">/</span>Innovation</div>

<div class="bs-hero">
  <h2>Nvidia: A Tool in Human Hands</h2>
  <p>Jensen Huang on AI</p>
</div>

<div class="bs-section">
  <p class="bs-big">Huang says AI stays a tool under human control. Like any widely used tool, ethical use depends on rules and society.</p>
  <p>Nvidia's technology processes data. It does not make independent decisions, and it does not develop consciousness.</p>
</div>

<div class="bs-section">
  <div class="bs-problem">
    <div class="q">The question</div>
    <div class="bs-big">What should Nvidia do about privacy, job displacement, and autonomous decision-making?</div>
  </div>
  <button type="button" class="btn btn-primary go-btn" id="to-roles">Choose a role</button>
</div>

</div>

<div id="v-roles" class="hidden">

<div class="bs-crumb"><button type="button" class="bsim-back" id="back-scene">← Scene</button></div>
<div class="bs-section">
  <h3>Choose a role</h3>
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
    { en: '1 View', ask: 'To what extent do you agree with Huang, and why?', need: 'State to what extent you agree, and give one reason from the case.',
      guide: 'Huang says AI stays a tool under human control. Ethical use depends on rules and society. Nvidia\'s systems process data. They do not develop consciousness.\nHow far do you agree, and what is one reason? An incomplete sentence is fine. I will help with the logic and the wording.' },
    { en: '2 Action', ask: 'Which concern will you name, and what should Nvidia do?', need: 'Name one concern and one company action.',
      guide: 'Calling AI a tool does not answer the public. They worry about privacy, job displacement, and autonomous decision-making.\nName one concern and one thing Nvidia should do. Say it in English. I will help you complete the sentence.' },
    { en: '3 Your lines', ask: 'Can you give your view in two or three English sentences?', need: 'Two or three sentences a classmate can hear, including the role boundary.',
      guide: 'Give two or three sentences a classmate can hear.\nKeep this limit: {boundary}' }
  ];

  var BANK = [
    { group: 'Your view', items: [
      ['To a large extent, I agree that AI should stay under human control.'],
      ['I partly agree. AI is a tool, but the appliance comparison is not enough.'],
      ['I have reservations about how relaxed this sounds.'] ] },
    { group: 'The case', items: [
      ['GPUs accelerate AI because they handle parallel computation.'],
      ['Ethical use depends on regulatory and societal frameworks.'],
      ['The system is designed to process data, not to develop consciousness.'] ] },
    { group: 'One action', items: [
      ['Nvidia should address privacy by saying what data the system processes.'],
      ['On job displacement, we should admit that some work will change.'],
      ['For autonomous decisions, a person should make the final call.'] ] },
    { group: 'Close', items: [
      ['So our public line is: AI stays a tool under human control.'],
      ['Shall we agree on one action for each concern?'] ] }
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

  var state = { roleId: null, stage: 0, attempts: 0, lines: [], chat: [], finished: false };
  var recSession = null;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var isMock = function () { return !LLM_ENDPOINT || /[?&]mock=1/.test(location.search); };

  function show(v) {
    $('v-scene').classList.toggle('hidden', v !== 'scene');
    $('v-roles').classList.toggle('hidden', v !== 'roles');
    $('v-role').classList.toggle('hidden', v !== 'role');
    window.scrollTo(0, 0);
    requestAnimationFrame(function () { window.scrollTo(0, 0); });
  }

  function renderRoleCards() {
    $('role-cards').innerHTML = Object.keys(ROLES).map(function (id) {
      var r = ROLES[id];
      return '<div class="role-card" style="--c:' + r.color + '"><div class="role-emoji">' + r.emoji + '</div><div class="role-name">' + esc(r.name) + '</div>' +
        '<p class="role-line">' + esc(r.view) + '</p>' +
        '<div class="role-enter"><button class="btn btn-primary" data-role="' + id + '">Practice</button></div></div>';
    }).join('');
    Array.prototype.forEach.call($('role-cards').querySelectorAll('button'), function (b) {
      b.onclick = function () { enterRole(b.dataset.role); };
    });
  }

  function stageGuide(i) {
    var r = ROLES[state.roleId];
    var g = STAGES[i];
    return { type: 'coach', logic: g.guide.replace('{boundary}', r.boundary), ask: g.ask };
  }

  function freshChat() {
    return [
      { type: 'sys', text: 'Round 1 · Your view' },
      stageGuide(0)
    ];
  }

  function enterRole(roleId) {
    stopRecording(false);
    state.roleId = roleId;
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
        return '<div class="pb-item" data-en="' + esc(it[0]) + '"><span class="pb-en">' + esc(it[0]) + '</span></div>';
      }).join('') + '</div>';
    }).join('');
  }

  function renderRole() {
    var me = ROLES[state.roleId];
    $('v-role').style.setProperty('--c', me.color);
    $('v-role').innerHTML = '<button type="button" class="bsim-back" id="back-topic">← Roles</button>' +
      '<div class="rp-head"><span class="rp-badge">' + me.emoji + ' ' + esc(me.name) + '</span><span class="rp-round" id="rp-round"></span></div>' +
      '<div class="rp-goal">' + esc(me.task) + '</div>' +
      '<div class="stage-pills" id="pills"></div>' +
      '<div class="coach-grid"><div><div class="chat-box" id="chat"></div>' +
      '<div id="composer"><div class="mic-row">' +
      '<button type="button" class="mic-btn" id="mic" aria-label="Record"><svg class="mic-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/></svg><svg class="stop-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/></svg></button>' +
      '<div class="mic-bars" id="bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
      '<div class="mic-live" id="live">Tap the mic. Tap again to send.</div></div>' +
      '<textarea class="say-box" id="say" placeholder="Or type, then press Enter."></textarea>' +
      '<div class="rp-err" id="err"></div></div></div>' +
      '<aside class="speech-card"><h4>Lines to say</h4><ol id="lines"></ol><p class="bs-note" id="lines-empty">Your own sentences stay here.</p></aside></div>' +
      '<details class="pb"><summary>Expressions you can use</summary>' + bankHtml() + '</details>' +
      '<div class="rp-actions" style="margin-top:16px"><button class="btn btn-dl" id="dl">Download</button><button class="btn btn-ghost" id="reset">Start again</button></div>';
    $('back-topic').onclick = function () { show('roles'); };
    Array.prototype.forEach.call($('v-role').querySelectorAll('.pb-item'), function (el) {
      el.onclick = function () {
        var box = $('say');
        if (!box) return;
        box.value = (box.value ? box.value.replace(/\s+$/, '') + ' ' : '') + el.dataset.en;
        box.focus();
      };
    });
    $('mic').onclick = function () { if (recSession) stopRecording(true); else startRecording(); };
    $('say').onkeydown = function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };
    $('dl').onclick = download;
    $('reset').onclick = function () {
      if (!confirm('Clear this practice and start again?')) return;
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
    $('rp-round').textContent = state.finished ? 'Done' : ('Round ' + (state.stage + 1) + ' of 3') + (isMock() ? ' · preview' : '');
    $('lines').innerHTML = state.lines.map(function (line) { return '<li>' + esc(line) + '</li>'; }).join('');
    $('lines-empty').style.display = state.lines.length ? 'none' : '';
    $('composer').classList.toggle('hidden', state.finished);
  }

  function renderChat() {
    var me = ROLES[state.roleId];
    $('chat').innerHTML = state.chat.map(function (m) {
      if (m.type === 'sys') return '<div class="msg-sys">' + esc(m.text) + '</div>';
      if (m.type === 'me') return '<div class="msg me" style="--c:' + me.color + '"><div class="msg-who">You</div><div class="msg-bubble">' + esc(m.text) + '</div></div>';
      var word = (m.word && m.word.try) ? '<span class="coach-note">Try: ' + esc(m.word.try) + '</span>' : '';
      var ask = m.ask ? '<span class="coach-ask">' + esc(m.ask) + '</span>' : '';
      return '<div class="msg" style="--c:#0f766e"><div class="msg-who">Coach</div><div class="msg-bubble">' + esc(m.logic || '') + word + ask + '</div></div>';
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
      'logic: two or three short English sentences. Tie the comment to this Nvidia case: a tool under human control, privacy, job displacement, or autonomous decisions. Tell the student that an incomplete English sentence is welcome, and that you will help with logic and wording. Do not reply in Chinese. ' +
      'word: {"instead":"a short phrase they used or empty","try":"one better English phrase or empty"}. ' +
      'keep: their usable English sentence with only a light grammar fix, or "" if they did not say English. ' +
      'ask: one English question under 22 words about the missing Nvidia point. ' +
      'stageClear: true only if their own latest words meet the stage requirement. ' +
      'If they write Chinese, ask them to try the same idea in English and put a usable English phrase in word.try.';
  }

  function userPrompt(text) {
    var me = ROLES[state.roleId];
    var stage = STAGES[state.stage];
    var hist = state.chat.filter(function (m) { return m.type === 'me' || m.type === 'coach'; }).slice(-6).map(function (m) {
      return m.type === 'me' ? ('Student: ' + m.text) : ('Coach ask: ' + (m.ask || ''));
    }).join('\n');
    return 'Role: ' + me.name + '\nStage ' + (state.stage + 1) + ' of 3. Requirement: ' + stage.need + '\nAttempt ' + (state.attempts + 1) + ' of 3 on this stage.\nRecent talk:\n' + hist + '\n\nStudent just said:\n' + text;
  }

  function mockReply(text) {
    var t = text.toLowerCase();
    var english = /[a-z]/i.test(text);
    var stage = state.stage;
    var clear = false;
    if (!english) {
      return { logic: 'That was Chinese. Try the same idea in one English sentence. I will help with the wording.', word: { instead: '', try: 'I partly agree that AI should stay under human control.' }, keep: '', ask: 'Can you say that in one English sentence?', stageClear: false };
    }
    if (stage === 0) clear = /(agree|extent|reservation|partly|largely|limited)/.test(t) && text.length > 35;
    if (stage === 1) clear = /(privacy|job|autonom)/.test(t) && /(should|address|human|process|framework|support|limit)/.test(t);
    if (stage === 2) clear = text.length > 80;
    return {
      logic: clear ? 'That covers this round.' : 'One piece is still missing. Use the question below.',
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
      state.chat.push({ type: 'sys', text: 'Say these lines to your group. You can close this page.' });
      return;
    }
    state.stage += 1;
    state.attempts = 0;
    var names = ['Round 2 · One action', 'Round 3 · Your lines'];
    state.chat.push({ type: 'sys', text: names[state.stage - 1] || ('Round ' + (state.stage + 1)) });
    state.chat.push(stageGuide(state.stage));
  }

  function setMicBusy(busy) {
    var mic = $('mic');
    if (mic) mic.disabled = busy;
  }

  function send(preset) {
    if (state.finished || state.sending) return;
    var box = $('say');
    var err = $('err');
    var text = String(preset == null ? (box ? box.value : '') : preset).replace(/\s+/g, ' ').trim();
    if (!text) { if (err) err.textContent = 'No speech yet. Try again, or type and press Enter.'; return; }
    if (err) err.textContent = '';
    if (box) box.value = '';
    var live = $('live');
    if (live) live.textContent = 'The coach is reading your line.';
    state.sending = true;
    setMicBusy(true);
    state.chat.push({ type: 'me', text: text });
    renderChat();
    var job = isMock() ? Promise.resolve(mockReply(text)) : callLLM(text);
    job.then(function (res) {
      state.attempts += 1;
      state.chat.push({ type: 'coach', logic: res.logic, word: res.word, ask: res.ask });
      if (res.keep && state.lines.indexOf(res.keep) < 0) state.lines.push(res.keep);
      if (res.stageClear || state.attempts >= 3) advance(!!res.stageClear);
      save();
      state.sending = false;
      setMicBusy(false);
      if (live && !state.finished) live.textContent = 'Tap the mic. Tap again to send.';
      renderChat();
      renderSide();
    }).catch(function (e) {
      state.sending = false;
      setMicBusy(false);
      if (err) err.textContent = 'The coach did not connect. Add ?mock=1 to preview the steps.';
    });
  }

  function resetBars() {
    var bars = $('bars');
    if (!bars) return;
    bars.classList.remove('on');
    Array.prototype.forEach.call(bars.children, function (n) { n.style.transform = 'scaleY(.12)'; });
  }

  function startRecording() {
    var Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    var err = $('err');
    if (state.sending) return;
    if (!Rec || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (err) err.textContent = 'Voice input needs Chrome. Or type below and press Enter.';
      return;
    }
    var session = { stopped: false, finalText: '', rec: null, stream: null, audioCtx: null, raf: 0 };
    recSession = session;
    var rec = new Rec();
    session.rec = rec;
    rec.lang = 'en-US';
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = function (e) {
      var finalText = '';
      var interim = '';
      for (var i = 0; i < e.results.length; i++) {
        var piece = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += piece + ' ';
        else interim += piece;
      }
      session.finalText = finalText.replace(/\s+/g, ' ').trim();
      var shown = (finalText + interim).replace(/\s+/g, ' ').trim();
      if ($('say')) $('say').value = shown;
      if ($('live')) $('live').textContent = shown || 'Listening…';
    };
    rec.onerror = function (ev) {
      if (!ev || ev.error === 'no-speech' || ev.error === 'aborted') return;
      if (err) err.textContent = 'I missed that. Tap the mic again.';
    };
    rec.onend = function () {
      if (!session.stopped && recSession === session) {
        try { rec.start(); } catch (e2) {}
      }
    };
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      if (recSession !== session) { stream.getTracks().forEach(function (t) { t.stop(); }); return; }
      session.stream = stream;
      var Ctx = window.AudioContext || window.webkitAudioContext;
      var ctx = new Ctx();
      session.audioCtx = ctx;
      var analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      ctx.createMediaStreamSource(stream).connect(analyser);
      var data = new Uint8Array(analyser.frequencyBinCount);
      var bars = $('bars');
      if (bars) bars.classList.add('on');
      if ($('mic')) $('mic').classList.add('on');
      if (err) err.textContent = '';
      function tick() {
        if (recSession !== session) return;
        analyser.getByteFrequencyData(data);
        if (bars) {
          for (var i = 0; i < bars.children.length; i++) {
            bars.children[i].style.transform = 'scaleY(' + Math.max(0.12, (data[i] || 0) / 255) + ')';
          }
        }
        session.raf = requestAnimationFrame(tick);
      }
      tick();
      try { rec.start(); } catch (e3) { if (err) err.textContent = 'Recording did not start.'; stopRecording(false); }
    }).catch(function () {
      recSession = null;
      if (err) err.textContent = 'Allow the microphone, then tap again.';
    });
  }

  function stopRecording(sendAfter) {
    var session = recSession;
    if (!session) return;
    session.stopped = true;
    recSession = null;
    try { session.rec.stop(); } catch (e) {}
    if (session.raf) cancelAnimationFrame(session.raf);
    if (session.stream) session.stream.getTracks().forEach(function (t) { t.stop(); });
    if (session.audioCtx) session.audioCtx.close();
    if ($('mic')) $('mic').classList.remove('on');
    resetBars();
    var text = (($('say') && $('say').value) || session.finalText || '').replace(/\s+/g, ' ').trim();
    if (sendAfter) send(text);
  }

  function download() {
    var me = ROLES[state.roleId];
    var L = ['# Nvidia: A Tool in Human Hands', '', 'Role: ' + me.name + ' (' + me.zh + ')', 'Date: ' + new Date().toLocaleString(), '', '## Lines to say', ''];
    if (!state.lines.length) L.push('(No lines yet)', '');
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

  $('to-roles').onclick = function () { show('roles'); };
  $('back-scene').onclick = function () { show('scene'); };
  renderRoleCards();
  show('scene');
})();
</script>
