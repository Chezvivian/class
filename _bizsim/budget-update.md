---
title: "Nova Bridge Chapter 3 The Budget Update"
author: Huang Jie
layout: post
permalink: /business-sim/budget-update/
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/business-sim/sim.css">

<div class="bsim">

<div id="v-topic">

<div class="bs-crumb"><a href="{{ site.baseurl }}/business-sim-platform/">商务英语情境化模拟平台</a><span class="sep">/</span>Nova Bridge · Chapter 3</div>

<div class="bs-hero">
  <h2>🗣️ The Budget Update</h2>
  <p>Nova Bridge · Chapter 3 Project Coordinator · cross-team sync · 5 minutes</p>
</div>

<div class="bs-section">
  <h3>Scenario <span class="bs-note">情境</span></h3>
  <p class="bs-big">Tuesday, cross-team project sync. The Project Coordinator chairs the meeting and presents next week's joint delivery plan to Aiko, Head of Operations. The slide on the screen says: budget $12,000.</p>
  <p class="bs-note">周二跨部门项目同步会。项目协调人主持会议,向运营负责人 Aiko 汇报下周的联合交付计划。屏幕上的幻灯片写着:预算 12,000 美元。两个团队各掌握不同的信息,所以会议中的打断是合理的。</p>
</div>

<div class="bs-section">
  <div class="bs-problem">
    <div class="q">Problem <span class="bs-note">问题</span></div>
    <div class="bs-big">Deliver on Wednesday or on Thursday?</div>
    <div class="bs-note">周三交付,还是周四交付?</div>
    <div class="bs-options" style="margin-top:12px">
      <div class="bs-opt"><b>A</b> Wednesday<br><span class="bs-note">周三,更快</span></div>
      <div class="bs-opt"><b>B</b> Thursday<br><span class="bs-note">周四,质量更有保障</span></div>
      <div class="bs-opt"><b>C</b> Draft + final<br><span class="bs-note">周三初稿 + 周四终稿</span></div>
    </div>
  </div>
  <div class="bs-problem" style="border-left-color:#2e7d4f;background:#f4fbf6;border-color:#cfe8d6">
    <div class="q" style="color:#1f5f3a">Shared goal <span class="bs-note">共同目标</span></div>
    <div class="bs-big">In 4 rounds, agree on the delivery date and the owner.</div>
    <div class="bs-note">4 轮发言内,就交付日期和负责人达成一致。</div>
  </div>
  <div class="bs-problem" style="border-left-color:#c0602b;background:#fff8f2;border-color:#f0d9c6">
    <div class="q" style="color:#8a4318">Secret mission <span class="bs-note">隐藏任务</span></div>
    <div class="bs-big">Each role also has a private mission about interrupting. Don't show your card to your partner.</div>
    <div class="bs-note">每个角色还有一个关于「打断」的私人任务,进入角色后可见。不要给对方看。</div>
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
  // ===== 配置 =====
  // 阿里云 FC 上 llm-proxy 的 HTTP 触发器地址;留空或页面地址加 ?mock=1 则使用本地模拟生成
  var LLM_ENDPOINT = '';
  var MAX_ROUNDS = 4;
  var GAME_ID = 'budget-update';
  var STORE_KEY = 'bsim_v1_' + GAME_ID + '_';

  // ===== 按角色划分的关键词(第三项为用于任务检查的标签)=====
  var ROLE_WORDS = {
    associate: [
      { group: '内容要点 Your 3 points', type: 'content', items: [
        ['I suggest we deliver on Thursday', '我建议周四交付', 'date'],
        ['the budget on this slide is $12,000', '这张幻灯片上的预算是 1.2 万美元', 'budget'],
        ['delivering on Wednesday leaves no time for quality checks', '周三交付没有时间做质量检查', 'risk'],
        ["I need your team's data by Tuesday evening", '我需要你们团队周二晚上前提供数据', 'support'],
        ['a Wednesday draft and a Thursday final version could work', '周三初稿加周四终稿也许可行', 'compromise'] ] },
      { group: '守住发言 Keep the floor', type: 'hold', items: [
        ["Just a moment. I'd like to finish my point.", '请稍等,我想先把这一点说完。', 'hold'],
        ["I appreciate your input. Let's explore that after this point.", '谢谢你的意见,说完这点我们再讨论。', 'hold'],
        ['Could we hold that thought until the end of this discussion?', '这个想法能留到讨论结束再谈吗?', 'hold'],
        ['I see your point, but please allow me to finish.', '我明白你的意思,但请让我说完。', 'hold'],
        ['I value your input. May we discuss this after the current topic?', '我很重视你的意见,能在当前话题之后再谈吗?', 'hold'] ] },
      { group: '接受纠正 Accept a correction', type: 'accept', items: [
        ['Thanks for catching that. I will correct the slide.', '谢谢指出,我会改正幻灯片。', 'accept'],
        ['Good point, thank you for checking.', '有道理,谢谢你核对。', 'accept'] ] },
      { group: '回到主线 Get back on track', type: 'return', items: [
        ["Let's circle back to that thought in a moment.", '我们稍后再回到这个想法。', 'return'],
        ['As I was saying,', '正如我刚才说的,', 'return'],
        ['Back to the delivery date,', '回到交付日期,', 'return'] ] },
      { group: '收尾 Close', type: 'close', items: [
        ['So, to confirm, we agree on a Wednesday draft and a Thursday final version', '那么确认一下,我们定为周三初稿、周四终稿', 'close'],
        ['I will send a follow-up email with the date and the owner', '我会发一封跟进邮件,写明日期和负责人', 'close'] ] }
    ],
    senior: [
      { group: '礼貌打断 Interrupt politely', type: 'interrupt', items: [
        ['May I add something here?', '我可以在这里补充一点吗?', 'interrupt'],
        ['Sorry for the interruption, but', '抱歉打断一下,不过', 'interrupt'],
        ['Can I jump in for a moment?', '我可以插一句吗?', 'interrupt'],
        ['Excuse me for chiming in, but', '不好意思插话,但是', 'interrupt'],
        ['If I may interrupt briefly,', '请允许我简短地打断一下,', 'interrupt'],
        ["I'd like to add a point if that's okay.", '如果可以的话,我想补充一点。', 'interrupt'] ] },
      { group: '说清要纠正的内容 The point (keep it short)', type: 'point', items: [
        ['could we double-check the budget figure?', '我们能核对一下预算数字吗?', 'point'],
        ['the approved budget is $21,000, not $12,000', '批准的预算是 2.1 万美元,不是 1.2 万', 'point'],
        ['I think two digits on the slide may be reversed', '我觉得幻灯片上有两个数字可能写反了', 'point'] ] },
      { group: '你的立场 Your position', type: 'goal', items: [
        ['we need the delivery on Wednesday', '我们需要周三交付', 'goal'],
        ['a Wednesday draft would work for me', '周三初稿对我来说可以', 'goal'],
        ["I'd like to see the data before we decide", '做决定前我想先看数据', 'goal'] ] },
      { group: '把话还给对方 Hand the floor back', type: 'return', items: [
        ['Sorry, please go on with your point.', '抱歉,请继续你的发言。', 'return'],
        ['Please carry on. You were talking about the risk.', '请继续,你刚才在讲风险。', 'return'],
        ['Of course, take your time.', '当然,您慢慢说。', 'return'] ] },
      { group: '收尾 Close', type: 'close', items: [
        ["Then let's agree on a Wednesday draft and a Thursday final version", '那我们就定为周三初稿、周四终稿', 'close'],
        ['Please send me the date and the owner by email', '请把日期和负责人用邮件发给我', 'close'] ] }
    ]
  };

  // ===== 话术库(无需 LLM,供学生备选;点击可复制)=====
  var BANK_SHARED = [
    { group: 'Interrupting politely 礼貌打断', items: [
      ['May I add something here?', '我可以在这里补充一点吗?'],
      ['Sorry for the interruption, but...', '抱歉打断一下,不过…'],
      ['Can I jump in for a moment?', '我可以插一句吗?'],
      ['Excuse me for chiming in, but...', '不好意思插话,但是…'],
      ['If I may interrupt briefly...', '请允许我简短地打断一下…'],
      ["I'd like to add a point if that's okay.", '如果可以的话,我想补充一点。'] ] },
    { group: 'Handling interruptions 应对被打断', items: [
      ["Just a moment. I'd like to finish my point.", '请稍等,我想先把这一点说完。'],
      ["I appreciate your input. Let's explore that after this point.", '谢谢你的意见,说完这点我们再讨论。'],
      ['Could we hold that thought until the end of this discussion?', '这个想法能留到讨论结束再谈吗?'],
      ['I see your point, but please allow me to finish.', '我明白你的意思,但请让我说完。'],
      ["Let's circle back to that thought in a moment.", '我们稍后再回到这个想法。'],
      ['I value your input. May we discuss this after the current topic?', '我很重视你的意见,能在当前话题之后再谈吗?'] ] },
    { group: 'Speaking tips 表达技巧', items: [
      ['Wait for a natural pause, then say it in one sentence.', '等自然停顿再开口,一句话说完'],
      ['Ask yourself: is it urgent, or can it wait? Interrupt only when it cannot wait.', '先判断:紧急吗?能等吗?不能等才打断'],
      ['After you interrupt, hand the floor back: "Please go on."', '打断之后把话还给对方:"请继续。"'],
      ['If the interruption is a useful correction, accept it. Do not defend.', '如果打断是有用的纠正,就接受,不要辩解'] ] }
  ];

  var BANK_ROLE = {
    associate: [
      { group: 'Accepting a correction 接受纠正', items: [
        ['Thanks for catching that. I will correct the slide.', '谢谢指出,我会改正幻灯片。'],
        ['You are right. Let me check the figure after the meeting.', '你说得对,会后我再核对数字。'] ] },
      { group: 'Closing the meeting 收尾确认', items: [
        ['So, to confirm: the date is ___ and the owner is ___.', '那么确认一下:日期是…,负责人是…'],
        ['I will send a follow-up email today.', '我今天会发跟进邮件。'] ] }
    ],
    senior: [
      { group: 'Correcting a fact briefly 简短纠正事实', items: [
        ['Sorry for the interruption, but could we double-check the budget figure?', '抱歉打断,我们能核对一下预算数字吗?'],
        ['I may be wrong, but I remember the approved figure was ___.', '我可能记错了,但我记得批准的数字是…'] ] },
      { group: 'Handing the floor back 把话还给对方', items: [
        ['Thanks. Please go on.', '谢谢,请继续。'],
        ['Sorry, I will let you finish first.', '抱歉,我先让你说完。'] ] }
    ]
  };

  var GAME = {
    id: GAME_ID,
    title: '预算更新会',
    titleEn: 'The Budget Update',
    scene: {
      setting: 'Nova Bridge, Chapter 3. Tuesday, cross-team project sync (5 minutes). The Project Coordinator chairs the meeting and presents next week\'s joint delivery plan to Aiko, Head of Operations. The slide on screen shows: budget $12,000.',
      problem: 'Problem: deliver on Wednesday or Thursday? 周三还是周四交付?',
      goal: 'Goal: agree on the delivery date and the owner within 4 rounds. 4 轮内就交付日期和负责人达成一致。'
    },
    roles: {
      associate: {
        emoji: '💼', name: 'Project Coordinator', zh: '项目协调人', color: '#2c6bac',
        view: 'I need to finish my update.', viewZh: '我要把汇报讲完。',
        stance: 'Presents the plan; prefers Thursday delivery because Wednesday leaves no time for quality checks.',
        first: true,
        extra: [['finish my point', '把这一点说完'], ['hold that thought', '先记下这个想法'], ['circle back', '稍后再回到']],
        sentences: [
          ['I suggest we deliver on Thursday, because Wednesday leaves no time for quality checks.', '我建议周四交付,因为周三没有时间做质量检查。'],
          ["Just a moment. I'd like to finish my point.", '请稍等,我想先把这一点说完。']
        ],
        card: {
          goal: 'Get Aiko to agree to Thursday delivery. 让 Aiko 同意周四交付。',
          mission: 'Cover all 3 points: the date, the risk, and the support you need. Keep control of the conversation if you are interrupted. 讲完 3 个要点:日期、风险、需要的支持;被打断时守住发言。',
          facts: ['Plan: final delivery on Thursday 计划:周四交付终稿', 'Budget on your slide: $12,000 (from your spreadsheet) 你的幻灯片预算:1.2 万美元', 'Risk: Wednesday leaves no time for quality checks 风险:周三没时间做质量检查', 'You need: Aiko\'s team data by Tuesday evening 你需要:Aiko 团队周二晚的数据'],
          bottom: 'You can accept a Wednesday draft plus a Thursday final version. 可接受周三初稿 + 周四终稿。'
        }
      },
      senior: {
        emoji: '🧑‍💼', name: 'Aiko', zh: '运营负责人', color: '#2e7d4f',
        view: 'I want to make sure the numbers are right.', viewZh: '我要确保数字没错。',
        stance: 'Head of Operations from another team; wants Wednesday delivery.',
        first: false,
        opener: 'Morning, Aiko. Here is my plan for next week. I suggest we deliver on Thursday. As you can see on the slide, the budget is $12,000. The second point is the risk. If we deliver on Wednesday, we—',
        extra: [['interrupt briefly', '简短打断'], ['hand the floor back', '把话还给对方'], ['double-check', '核对']],
        sentences: [
          ['Sorry for the interruption, but could we double-check the budget figure?', '抱歉打断,我们能核对一下预算数字吗?'],
          ['Sorry, please go on with your point.', '抱歉,请继续你的发言。']
        ],
        card: {
          goal: 'Get the delivery on Wednesday. 争取周三交付。',
          mission: 'Interrupt at least once to correct the budget figure. Wait for a good moment, say it in one sentence, then hand the floor back. 至少打断一次,纠正预算数字:选好时机,一句话说完,然后把话还给对方。',
          facts: ['Operations tracks the budget. The approved budget is $21,000, and the slide has the digits reversed. 运营负责跟踪预算,批准的预算是 2.1 万美元,幻灯片的数字写反了', 'Your team starts an urgent project on Thursday, so a Thursday delivery leaves no time for your team to review it. 你的团队周四起要赶另一个紧急项目,周四交付会让团队没时间评审(对方不知道)'],
          bottom: 'A Wednesday draft for your team to review is fine if you see the data first. 如果先看到数据,周三初稿(供你的团队评审)也可以。'
        }
      }
    }
  };

  // ===== 状态 =====
  var state = { roleId: null, round: 0, picked: [], turns: [], chat: [], ended: false };
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var isMock = function () { return !LLM_ENDPOINT || /[?&]mock=1/.test(location.search); };
  var key = function () { return STORE_KEY + state.roleId; };
  var otherId = function () { return state.roleId === 'associate' ? 'senior' : 'associate'; };

  function show(v) { $('v-topic').classList.toggle('hidden', v !== 'topic'); $('v-role').classList.toggle('hidden', v !== 'role'); window.scrollTo(0, 0); }

  // ===== 角色卡(公开部分,不含隐藏任务)=====
  function renderRoleCards() {
    $('role-cards').innerHTML = Object.keys(GAME.roles).map(function (id) {
      var r = GAME.roles[id];
      var words = r.extra.map(function (w) { return '<span class="role-word">' + esc(w[0]) + '<small>' + esc(w[1]) + '</small></span>'; }).join('');
      var sents = r.sentences.map(function (s) { return '<li>' + esc(s[0]) + '<span class="zh">' + esc(s[1]) + '</span></li>'; }).join('');
      return '<div class="role-card" style="--c:' + r.color + '"><div class="role-emoji">' + r.emoji + '</div><div class="role-name">' + esc(r.name) + '</div><div class="role-zh">' + esc(r.zh) + '</div>' +
        '<p class="role-line">' + esc(r.view) + '<span class="zh">' + esc(r.viewZh) + '</span></p>' +
        '<div class="role-sub">Key words</div><div class="role-words">' + words + '</div>' +
        '<div class="role-sub">Useful sentences</div><ul class="role-sents">' + sents + '</ul>' +
        '<div class="role-enter"><button class="btn btn-primary" data-role="' + id + '">Enter 进入 →</button></div></div>';
    }).join('');
    Array.prototype.forEach.call($('role-cards').querySelectorAll('button'), function (b) { b.onclick = function () { enterRole(b.dataset.role); }; });
  }

  // ===== 进入角色 =====
  function enterRole(roleId) {
    state.roleId = roleId; state.picked = [];
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(key())); } catch (e) {}
    if (saved && saved.turns && saved.turns.length) {
      state.round = saved.round; state.turns = saved.turns; state.chat = saved.chat; state.ended = !!saved.ended;
    } else {
      state.round = 0; state.turns = []; state.ended = false;
      state.chat = [{ type: 'sys', text: '会议开始 The meeting begins' }];
      var other = GAME.roles[otherId()];
      if (other.opener) state.chat.push({ type: 'ai', role: otherId(), text: other.opener });
      else state.chat.push({ type: 'sys', text: '你有发言权。Aiko 在听。 You have the floor. Aiko is listening.' });
    }
    renderRole(); show('role');
  }

  function save() {
    try { localStorage.setItem(key(), JSON.stringify({ round: state.round, turns: state.turns, chat: state.chat, ended: state.ended })); } catch (e) {}
  }

  function cardHtml(me) {
    var c = me.card;
    return '<details class="pb" open><summary>🔒 Your confidential card 你的保密卡 · 不要给对方看</summary>' +
      '<div class="pb-group"><div class="pb-gname">Final goal 最终目标</div><div class="pb-item"><span class="pb-en">' + esc(c.goal) + '</span></div></div>' +
      '<div class="pb-group"><div class="pb-gname">Secret mission 隐藏任务</div><div class="pb-item"><span class="pb-en">' + esc(c.mission) + '</span></div></div>' +
      '<div class="pb-group"><div class="pb-gname">What you know 你掌握的信息</div>' + c.facts.map(function (f) { return '<div class="pb-item"><span class="pb-en">' + esc(f) + '</span></div>'; }).join('') + '</div>' +
      '<div class="pb-group"><div class="pb-gname">Bottom line 底线</div><div class="pb-item"><span class="pb-en">' + esc(c.bottom) + '</span></div></div></details>';
  }

  function renderRole() {
    var me = GAME.roles[state.roleId];
    var panel = ROLE_WORDS[state.roleId].map(function (grp) {
      return '<div class="word-group"><div class="word-group-title">' + esc(grp.group) + '</div><div class="chips">' + grp.items.map(function (it) {
        return '<button class="chip" data-type="' + grp.type + '" data-tag="' + esc(it[2] || '') + '" data-en="' + esc(it[0]) + '" data-zh="' + esc(it[1]) + '">' + esc(it[0]) + '<small>' + esc(it[1]) + '</small></button>';
      }).join('') + '</div></div>';
    }).join('');
    $('v-role').style.setProperty('--c', me.color);
    $('v-role').innerHTML = '<button class="bsim-back" id="back-topic">← 返回情境与角色卡</button>' +
      '<div class="rp-head"><span class="rp-badge">' + me.emoji + ' ' + esc(me.name) + ' · ' + esc(me.zh) + '</span><span class="rp-round" id="rp-round"></span></div>' +
      '<div class="rp-goal">' + esc(GAME.scene.goal) + ' ' + esc(GAME.scene.problem) + '</div>' +
      cardHtml(me) +
      '<div class="chat-box" id="chat"></div>' +
      '<div id="debrief"></div>' +
      '<div id="composer"><div class="word-panel">' + panel + '<div class="picked" id="picked"></div>' +
      '<div class="rp-actions"><button class="btn btn-primary" id="gen" disabled>生成沟通话术 Generate</button><button class="btn btn-ghost" id="clear">清空选择</button><button class="btn btn-ghost" id="end">结束会议</button></div><div class="rp-err" id="err"></div></div></div>' +
      '<details class="pb"><summary>话术库 Phrasebank · 点击句子可复制 Click to copy</summary>' +
      '<div class="pb-title">For your role 本角色</div>' + bankHtml(BANK_ROLE[state.roleId]) +
      '<div class="pb-title">For everyone 打断与应对打断</div>' + bankHtml(BANK_SHARED) + '</details>' +
      '<div class="rp-actions" style="margin-top:16px"><button class="btn btn-dl" id="dl">⬇ 下载全部话术与学习资料</button><button class="btn btn-ghost" id="reset">重新开始</button></div>';
    $('back-topic').onclick = function () { show('topic'); };
    Array.prototype.forEach.call($('v-role').querySelectorAll('.chip'), function (c) {
      c.onclick = function () {
        var i = indexOfPick(c.dataset.en);
        if (i >= 0) state.picked.splice(i, 1); else state.picked.push({ type: c.dataset.type, tag: c.dataset.tag, en: c.dataset.en, zh: c.dataset.zh });
        syncPicked();
      };
    });
    Array.prototype.forEach.call($('v-role').querySelectorAll('.pb-item[data-en]'), function (el) {
      el.onclick = function () {
        var txt = el.dataset.en;
        var done = function () { el.classList.add('copied'); setTimeout(function () { el.classList.remove('copied'); }, 900); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done); else done();
      };
    });
    $('gen').onclick = generate;
    $('clear').onclick = function () { state.picked = []; syncPicked(); };
    $('end').onclick = endMeeting;
    $('dl').onclick = download;
    $('reset').onclick = function () { if (confirm('确定清除本角色的所有记录并重新开始?')) { localStorage.removeItem(key()); enterRole(state.roleId); } };
    renderChat(); syncPicked();
  }

  function bankHtml(groups) {
    return groups.map(function (g) {
      return '<div class="pb-group"><div class="pb-gname">' + esc(g.group) + '</div>' + g.items.map(function (it) {
        return '<div class="pb-item" data-en="' + esc(it[0]) + '"><span class="pb-en">' + esc(it[0]) + '</span><span class="pb-zh">' + esc(it[1]) + '</span></div>';
      }).join('') + '</div>';
    }).join('');
  }

  function indexOfPick(en) { for (var i = 0; i < state.picked.length; i++) if (state.picked[i].en === en) return i; return -1; }

  function syncPicked() {
    Array.prototype.forEach.call($('v-role').querySelectorAll('.chip'), function (c) { c.classList.toggle('on', indexOfPick(c.dataset.en) >= 0); });
    $('picked').innerHTML = state.picked.length ? '已选:' + state.picked.map(function (p) { return esc(p.en); }).join(' + ') : '请从上方选择 2–4 个关键词(想一想:现在该不该说?一句话够不够?)';
    $('gen').disabled = state.ended || state.picked.length < 2;
    $('rp-round').textContent = state.ended ? '会议已结束' : '第 ' + Math.min(state.round + 1, MAX_ROUNDS) + ' / ' + MAX_ROUNDS + ' 轮' + (isMock() ? '(模拟模式)' : '');
    $('composer').classList.toggle('hidden', state.ended);
    renderDebrief();
  }

  function studyHtml(t) {
    var kp = (t.keyPhrases || []).map(function (k) { return '<li>' + esc(k.en) + ' <span class="zh">— ' + esc(k.zh) + (k.note ? '(' + esc(k.note) + ')' : '') + '</span></li>'; }).join('');
    var pt = (t.patterns || []).map(function (k) { return '<li>' + esc(k.en) + ' <span class="zh">— ' + esc(k.zh) + '</span></li>'; }).join('');
    return '<div class="study"><h4>关键词 Key phrases</h4><ul>' + (kp || '<li>—</li>') + '</ul><h4>句式 Sentence patterns</h4><ul>' + (pt || '<li>—</li>') + '</ul></div>';
  }

  function renderChat() {
    var me = GAME.roles[state.roleId];
    var turnIdx = 0;
    $('chat').innerHTML = state.chat.map(function (m) {
      if (m.type === 'sys') return '<div class="msg-sys">' + esc(m.text) + '</div>';
      if (m.type === 'me') {
        var t = state.turns[turnIdx++];
        return '<div class="msg me" style="--c:' + me.color + '"><div class="msg-who">You · ' + esc(me.name) + '</div><div class="msg-bubble">' + esc(m.text) + '</div>' + (t ? studyHtml(t) : '') + '</div>';
      }
      var r = GAME.roles[m.role];
      return '<div class="msg" style="--c:' + r.color + '"><div class="msg-who">' + r.emoji + ' ' + esc(r.name) + '</div><div class="msg-bubble">' + esc(m.text) + '</div></div>';
    }).join('');
    $('chat').scrollTop = $('chat').scrollHeight;
  }

  // ===== 任务检查(根据所选关键词的标签自动判断,无需 LLM)=====
  function usedTags() {
    var tags = {};
    state.turns.forEach(function (t) { (t.picked || []).forEach(function (p) { if (p.tag) tags[p.tag] = (tags[p.tag] || 0) + 1; }); });
    return tags;
  }

  function missionChecks() {
    var tg = usedTags();
    if (state.roleId === 'associate') {
      return [
        ['Covered all 3 points (date, risk, support)', '讲完 3 个要点:日期、风险、支持', !!(tg.date && tg.risk && tg.support)],
        ['Kept the floor or accepted a correction when it was useful', '守住了发言,或在对方纠正有理时接受', !!(tg.hold || tg.accept)],
        ['Got back on track after the interruption', '被打断后回到了主线', !!tg['return']],
        ['Closed with a clear date and owner', '用明确的日期和负责人收尾', !!tg.close]
      ];
    }
    return [
      ['Interrupted politely at least once', '至少一次礼貌地打断', !!tg.interrupt],
      ['Said the correction briefly (the figure)', '简短说出要纠正的内容(数字)', !!tg.point],
      ['Handed the floor back', '把话还给了对方', !!tg['return']],
      ['Pushed for your position and closed the deal', '表达立场并推动收尾', !!(tg.goal && tg.close)]
    ];
  }

  function renderDebrief() {
    var box = $('debrief');
    if (!box) return;
    if (!state.ended) { box.innerHTML = ''; return; }
    var rows = missionChecks().map(function (c) {
      return '<li>' + (c[2] ? '✅ ' : '⬜ ') + esc(c[0]) + ' <span class="zh">— ' + esc(c[1]) + '</span></li>';
    }).join('');
    box.innerHTML = '<div class="study" style="margin:14px 0"><h4>Debrief 复盘</h4><ul>' + rows + '</ul>' +
      '<h4>Discuss with your partner 和同伴讨论</h4><ul>' +
      '<li>Was the interruption urgent, or could it wait? <span class="zh">— 那次打断紧急吗?能不能等?</span></li>' +
      '<li>Was it short and polite? Did the speaker get the floor back? <span class="zh">— 够不够短、够不够礼貌?对方拿回发言权了吗?</span></li>' +
      '<li>If the interruption was a useful correction, how should you respond? <span class="zh">— 如果打断是有用的纠正,该怎么回应?</span></li>' +
      '</ul></div>';
  }

  // ===== 生成 =====
  function buildPrompt() {
    var me = GAME.roles[state.roleId];
    var other = GAME.roles[otherId()];
    var mine = me.card, theirs = other.card;
    var system = 'You are a business English coach running a two-person role-play for Chinese university students (CEFR B1-B2).\n' +
      'Scenario: The Budget Update. Tuesday project meeting, 5 minutes. Nova Bridge Consulting, Chapter 3 (Project Coordinator). A cross-team project: the consulting team and the operations team each hold different information. The Project Coordinator chairs the meeting and presents next week\'s joint delivery plan to Aiko, Head of Operations. The slide on screen says the budget is $12,000. They must agree on the delivery date and the owner. Options: Wednesday, Thursday, or a Wednesday draft plus a Thursday final version.\n' +
      'Skill focus: interrupting politely and handling interruptions (wait for a natural pause, use polite language, be concise, hand the floor back; when interrupted, acknowledge briefly, decide whether it needs attention now or later, and keep control of the conversation).\n' +
      'The student plays: ' + me.name + '. Student\'s confidential card: ' + JSON.stringify(mine) + '\n' +
      'You also play ' + other.name + ' (' + other.stance + '). YOUR OWN confidential card (never reveal it, never tell the student about your secret mission): ' + JSON.stringify(theirs) + '\n' +
      'Rules for your character: ' + (otherId() === 'senior'
        ? 'You are Aiko. In your first reply, politely interrupt the student about the budget figure (the slide shows $12,000 but you believe it is $21,000), briefly and at a natural point. If the student asks you to wait or accepts the correction, respond naturally. Push for Wednesday but accept a Wednesday draft plus a Thursday final version if the student offers it and promises the data.'
        : 'You are the Project Coordinator chairing the meeting. Present your plan and keep going until the student interrupts. If the student interrupts politely and the correction is valid, accept it briefly and get back on track. If the student interrupts rudely or repeatedly, hold the floor politely using the expressions from the skill focus. Aim to close on a Wednesday draft plus a Thursday final version, with a clear owner.') + '\n' +
      'Task: turn the student\'s chosen keywords into a natural first-person spoken contribution (1-3 short sentences, must use ALL chosen keywords, stay in character; if a keyword is a phrase ending with a comma, continue the sentence naturally). Then give study notes and ONE reply from your character (1-2 sentences, advancing the conversation).\n' +
      'Return ONLY JSON: {"speech": string, "keyPhrases": [{"en": string, "zh": string, "note": string}], "patterns": [{"en": string, "zh": string}], "colleagueReplies": [{"role": "' + otherId() + '", "text": string}]}. keyPhrases = the chosen keywords and other useful phrases from the speech (zh = Chinese meaning, note = short Chinese usage tip about tone or timing). patterns = reusable sentence structures from the speech (en with ___ placeholders, zh explanation).';
    var hist = state.chat.filter(function (m) { return m.type !== 'sys'; }).slice(-6).map(function (m) {
      return (m.type === 'me' ? me.name + ' (student)' : GAME.roles[m.role].name) + ': ' + m.text;
    }).join('\n');
    var user = 'Round ' + (state.round + 1) + ' of ' + MAX_ROUNDS + (state.round + 1 === MAX_ROUNDS ? ' (final round: close with a clear date and owner)' : '') + '.\nConversation so far:\n' + (hist || '(none yet)') + '\n\nStudent\'s chosen keywords:\n' + state.picked.map(function (p) { return '[' + p.type + '] ' + p.en; }).join('\n');
    return { system: system, user: user };
  }

  var ORDER = ['accept', 'hold', 'interrupt', 'point', 'content', 'goal', 'return', 'close'];

  function mockSpeech() {
    var picks = state.picked.slice().sort(function (a, b) { return ORDER.indexOf(a.type) - ORDER.indexOf(b.type); });
    var out = '';
    picks.forEach(function (p) {
      var t = p.en.trim();
      var endsOpen = /[,;]$/.test(t);
      var endsStop = /[.?!]$/.test(t);
      if (out) {
        var prev = out.trim();
        var cont = /[,;]$/.test(prev);
        if (!cont && !/[.?!]$/.test(prev)) out = out.trim() + '. ';
        else out = out.trim() + ' ';
        if (!cont) t = t.charAt(0).toUpperCase() + t.slice(1);
      } else t = t.charAt(0).toUpperCase() + t.slice(1);
      out += t;
      if (!endsOpen && !endsStop) out += '.';
    });
    return out.trim();
  }

  var MOCK_SENIOR = [
    'Sorry to cut in, but did you say the budget is $12,000? I thought the approved figure was $21,000.',
    'OK, let us fix the number after the meeting. Please go on. What is the risk with Wednesday?',
    'I understand the risk, but the client may need the report earlier. Could a Wednesday draft work if I send you the data on time?',
    'That sounds fair. A Wednesday draft and a Thursday final version works for me. Can you confirm by email?'
  ];

  function mockReply() {
    if (otherId() === 'senior') return MOCK_SENIOR[Math.min(state.round, MOCK_SENIOR.length - 1)];
    var interrupted = state.picked.some(function (p) { return p.tag === 'interrupt'; });
    if (state.round === 0) {
      return interrupted
        ? 'Thanks for catching that. I will correct the slide to $21,000. Back to the risk: delivering on Wednesday leaves no time for quality checks.'
        : 'As I was saying, I suggest Thursday, because Wednesday leaves no time for quality checks. I would also need your team\'s data by Tuesday evening.';
    }
    if (state.round === 1) return 'I understand the client may need it earlier. Could a Wednesday draft and a Thursday final version work?';
    if (state.round === 2) return 'That works if I get the data by Tuesday evening. Shall we agree on that?';
    return 'Great. I will send a follow-up email with the date and the owner.';
  }

  function mockGenerate() {
    var isInterrupt = state.picked.some(function (p) { return p.type === 'interrupt'; });
    var isHold = state.picked.some(function (p) { return p.type === 'hold'; });
    var patterns = [
      { en: 'Sorry for the interruption, but ___?', zh: '抱歉打断一下,不过…?(打断 + 一句话说清)' },
      { en: "I appreciate your input. Let's explore that after ___.", zh: '谢谢你的意见,…之后我们再讨论。(守住发言)' }
    ];
    return {
      speech: mockSpeech() || 'Let me share my view.',
      keyPhrases: state.picked.map(function (p) { return { en: p.en, zh: p.zh, note: isInterrupt && p.type === 'interrupt' ? '等对方停顿,一句话说完' : (isHold && p.type === 'hold' ? '先肯定对方,再说明何时回应' : '') }; }),
      patterns: patterns,
      colleagueReplies: [{ role: otherId(), text: mockReply() }]
    };
  }

  function parseLLM(raw) {
    var s = String(raw).replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    var o = JSON.parse(s);
    if (!o || typeof o.speech !== 'string') throw new Error('bad format');
    return o;
  }

  function llmGenerate() {
    var p = buildPrompt();
    function once() {
      return fetch(LLM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
        .then(function (r) { return r.json().then(function (d) { if (!r.ok) throw new Error(d.error || ('HTTP ' + r.status)); return d; }); })
        .then(function (d) { return parseLLM(d.content); });
    }
    return once().catch(function (e) { if (e instanceof SyntaxError || e.message === 'bad format') return once(); throw e; });
  }

  function generate() {
    var btn = $('gen'), err = $('err');
    err.textContent = ''; btn.disabled = true; btn.textContent = '生成中…';
    var job = isMock() ? Promise.resolve(mockGenerate()) : llmGenerate();
    job.then(function (res) {
      state.turns.push({ round: state.round + 1, role: state.roleId, picked: state.picked.slice(), speech: res.speech, keyPhrases: res.keyPhrases || [], patterns: res.patterns || [] });
      state.chat.push({ type: 'me', text: res.speech });
      (res.colleagueReplies || []).forEach(function (c) { if (GAME.roles[c.role] && c.role !== state.roleId) state.chat.push({ type: 'ai', role: c.role, text: c.text }); });
      state.round++; state.picked = [];
      if (state.round >= MAX_ROUNDS) { state.ended = true; state.chat.push({ type: 'sys', text: '会议结束 Meeting adjourned。请查看复盘并下载话术与学习资料。' }); }
      save(); btn.textContent = '生成沟通话术 Generate'; renderChat(); syncPicked();
    }).catch(function (e) {
      err.textContent = '生成失败:' + (e.message || e) + '。请稍后重试,或在地址后加 ?mock=1 使用模拟模式。';
      btn.textContent = '生成沟通话术 Generate'; btn.disabled = state.picked.length < 2;
    });
  }

  function endMeeting() {
    if (state.ended) return;
    if (!confirm('确定提前结束会议?')) return;
    state.ended = true; state.chat.push({ type: 'sys', text: '会议结束 Meeting adjourned。请查看复盘并下载话术与学习资料。' });
    save(); renderChat(); syncPicked();
  }

  // ===== 下载 =====
  function download() {
    var me = GAME.roles[state.roleId];
    var L = [];
    L.push('# ' + GAME.titleEn + ' - ' + GAME.title, '', '角色 Role: ' + me.name + ' (' + me.zh + ')', '日期 Date: ' + new Date().toLocaleString(), '', '场景 Scenario: ' + GAME.scene.setting, GAME.scene.problem, '');
    if (!state.turns.length) L.push('(尚未生成任何话术)', '');
    var ti = 0;
    state.chat.forEach(function (m) {
      if (m.type === 'sys') return;
      if (m.type === 'ai') { L.push('**' + GAME.roles[m.role].name + ':** ' + m.text, ''); return; }
      var t = state.turns[ti++];
      L.push('## Round ' + t.round, '', '所选关键词 Chosen keywords: ' + t.picked.map(function (p) { return p.en; }).join(' | '), '', '**You (' + me.name + '):** ' + t.speech, '');
      if (t.keyPhrases.length) { L.push('关键词 Key phrases:'); t.keyPhrases.forEach(function (k) { L.push('- ' + k.en + ' — ' + k.zh + (k.note ? '(' + k.note + ')' : '')); }); L.push(''); }
      if (t.patterns.length) { L.push('句式 Sentence patterns:'); t.patterns.forEach(function (k) { L.push('- ' + k.en + ' — ' + k.zh); }); L.push(''); }
    });
    L.push('---', '', '# 任务检查 Mission check', '');
    missionChecks().forEach(function (c) { L.push('- [' + (c[2] ? 'x' : ' ') + '] ' + c[0] + ' — ' + c[1]); });
    L.push('', '---', '', '# 话术库 Phrasebank', '');
    BANK_ROLE[state.roleId].concat(BANK_SHARED).forEach(function (g) {
      L.push('## ' + g.group, '');
      g.items.forEach(function (it) { L.push('- ' + it[0] + ' — ' + it[1]); });
      L.push('');
    });
    var blob = new Blob(['\ufeff' + L.join('\n')], { type: 'text/markdown;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'business-sim-' + GAME.id + '-' + state.roleId + '.md';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  renderRoleCards(); show('topic');
})();
</script>
