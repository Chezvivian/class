---
title: "Topic 1 Media"
author: Huang Jie
layout: post
permalink: /business-sim/media/
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/business-sim/sim.css">

<div class="bsim">

<div id="v-topic">

<div class="bs-crumb"><a href="{{ site.baseurl }}/business-sim-platform/">商务英语情境化模拟平台</a><span class="sep">/</span>Media</div>

<div class="bs-hero">
  <h2>🍃 Leaf Morning Meeting</h2>
  <p>Marketing team · launch next week · small budget</p>
</div>

<div class="bs-section">
  <h3>Scenario <span class="bs-note">情境</span></h3>
  <p class="bs-big">A new drink launches next week, but the budget is small. Three colleagues must decide how to spread the news.</p>
  <p class="bs-note">Leaf 下周上新,但预算不多。三位同事要决定:怎么把消息传出去?</p>
</div>

<div class="bs-section">
  <div class="bs-problem">
    <div class="q">Problem <span class="bs-note">问题</span></div>
    <div class="bs-big">Post on our own channels, or get customers to post for us?</div>
    <div class="bs-note">是自己发,还是发动顾客一起发?</div>
    <div class="bs-options" style="margin-top:12px">
      <div class="bs-opt"><b>A</b> Owned media<br><span class="bs-note">自有渠道,品牌自己发</span></div>
      <div class="bs-opt"><b>B</b> Mass collaboration<br><span class="bs-note">大规模协作,顾客一起发</span></div>
      <div class="bs-opt"><b>C</b> Both<br><span class="bs-note">两者结合</span></div>
    </div>
  </div>
  <div class="bs-problem" style="border-left-color:#2e7d4f;background:#f4fbf6;border-color:#cfe8d6">
    <div class="q" style="color:#1f5f3a">Goal <span class="bs-note">目标</span></div>
    <div class="bs-big">In 4 rounds, agree on one plan: channels, actions, reasons.</div>
    <div class="bs-note">4 轮发言内,和同事达成一个方案:渠道、做法、理由。</div>
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
  var GAME_ID = 'leaf-morning';
  var STORE_KEY = 'bsim_v1_' + GAME_ID + '_';

  var COMMON_WORDS = [
    { group: '表明态度 Stance', type: 'stance', items: [
      ["I'm in favor of", '我支持'], ["I have reservations about", '我对…有顾虑'], ["I'd rather", '我更倾向于'],
      ["I see your point, but", '我理解,但是'], ["Let's compromise by", '我们折中一下'], ["I strongly suggest", '我强烈建议'] ] },
    { group: '决策 Decision', type: 'decision', items: [
      ['going with owned media', '主打自有渠道'], ['tapping into user-generated content', '利用用户生成内容'],
      ['launching a hashtag campaign', '发起话题活动'], ['running a small-scale pilot', '先小规模试点'],
      ['inviting customers to co-create', '邀请顾客共创'], ['partnering with micro-influencers', '与微型达人合作'],
      ['combining both approaches', '两种方式结合'] ] },
    { group: '理由 Reason', type: 'reason', items: [
      ['cut marketing costs', '降低营销成本'], ['showcase our brand', '展示品牌'], ['develop a loyal community', '培养忠实社群'],
      ['increase digital exposure', '提升线上曝光'], ['reach a new audience', '触达新受众'], ['expand sales', '扩大销售'],
      ['improve customer service', '改善客户服务'], ['boost traffic in search engine rating', '提升搜索排名与流量'] ] },
    { group: '协作原则 Mass-collaboration principles', type: 'principle', items: [
      ['participation', '参与'], ['collective (swarming)', '集体/群聚'], ['transparency', '透明'],
      ['independence', '独立'], ['persistence', '持久'], ['emergence', '涌现'] ] }
  ];

  // ===== 话术库(无需 LLM,供学生备选;点击可复制)=====
  var BANK_SHARED = [
    { group: 'Opening & stating a view 开场与表态', items: [
      ['Let me start by saying that…', '我先说一下…'],
      ['From my point of view, …', '在我看来,…'],
      ['In my experience, …', '根据我的经验,…'],
      ["To be honest, I'm not fully convinced that…", '说实话,我不太相信…'] ] },
    { group: 'Adding & giving reasons 补充与理由', items: [
      ['The main reason is that…', '主要原因是…'],
      ['On top of that, …', '除此之外,…'],
      ['Not only will it …, but it will also …', '它不仅会…,还会…'],
      ["That's why we should…", '所以我们应该…'] ] },
    { group: 'Contrast & polite disagreement 转折与委婉反对', items: [
      ["That's a good point; however, …", '有道理,不过…'],
      ["I see where you're coming from, but …", '我理解你的想法,但是…'],
      ['On the other hand, …', '另一方面,…'],
      ["I'm afraid I can't fully agree, because …", '恐怕我不能完全同意,因为…'] ] },
    { group: 'Softening your tone 委婉表达', items: [
      ['Perhaps we could…', '也许我们可以…'],
      ['It seems to me that…', '在我看来似乎…'],
      ['We might want to consider…', '我们或许可以考虑…'],
      ['It might be worth trying…', '也许值得尝试…'] ] },
    { group: 'Asking & responding 提问与回应', items: [
      ['Could you explain how that would work?', '你能解释一下这怎么操作吗?'],
      ['How would we measure the results?', '我们如何衡量效果?'],
      ["If I understand correctly, you're suggesting…", '如果我没理解错,你的建议是…'],
      ['Building on what you said, …', '顺着你刚才说的,…'] ] },
    { group: 'Compromise & closing 折中与收尾', items: [
      ['How about we combine … and …?', '我们把…和…结合起来怎么样?'],
      ["Let's start with … and review it after …", '我们先从…开始,…之后再复盘。'],
      ['So, to sum up, …', '那么,总结一下,…'],
      ["Shall we agree on…? / Then it's settled: …", '我们就定为…吧?/ 那就这么定了:…'] ] },
    { group: 'Speaking tips 表达技巧', items: [
      ['Claim → Reason → Example: "I suggest A, because B. For example, C."', '观点→理由→例子,让发言有说服力'],
      ['Concede, then counter: "That is true, but …"', '先肯定对方,再提出自己的看法'],
      ['Use numbers: "20 loyal customers", "within one week"', '用具体数字让建议更可信'],
      ["Link to a colleague's point: \"As [name] said, …\"", '呼应同事的发言,体现团队合作'] ] }
  ];

  var BANK_ROLE = {
    sales: [
      { group: 'Budget & cost 预算与成本', items: [
        ['We have to make every yuan count.', '每一分钱都要花得值。'],
        ["What's the cost per customer we'd be paying?", '每获取一位顾客要花多少钱?'],
        ['Free exposure is great, but it must lead to sales.', '免费曝光很好,但必须带来销量。'],
        ["I'd like to see the numbers before we decide.", '做决定前我想先看数据。'] ] },
      { group: 'Measuring results 衡量效果', items: [
        ['We can use a coupon code to track which channel brings orders.', '我们可以用优惠码追踪哪个渠道带来订单。'],
        ["Let's compare first-week sales with our last launch.", '把首周销量和上次上新做对比。'],
        ['If the pilot works, we can scale it up.', '如果试点有效,我们再扩大规模。'] ] },
      { group: 'Responding to colleagues 回应同事', items: [
        ['I like the creativity, but how does it turn into orders?', '创意不错,但怎么转化成订单?'],
        ['If customers post for us, that would really cut our costs.', '如果顾客帮我们发,能大大降低成本。'],
        ['Fine, as long as we stay within budget.', '可以,只要不超预算。'] ] }
    ],
    social: [
      { group: 'Brand & content 品牌与内容', items: [
        ['A consistent look builds brand recognition.', '统一的风格有助于建立品牌认知。'],
        ['A 15-second video can showcase the new drink very well.', '15 秒短视频就能很好地展示新品。'],
        ['Good content is what makes people want to share.', '好内容才会让人想分享。'] ] },
      { group: 'Channels 渠道', items: [
        ['Xiaohongshu is ideal for lifestyle sharing and shopping guides.', '小红书适合生活分享和种草。'],
        ['Douyin gives us viral potential through short videos and live streaming.', '抖音凭短视频和直播有爆款潜力。'],
        ['WeChat lets us reach our existing customers directly.', '微信能直接触达现有顾客。'] ] },
      { group: 'Managing the risk of UGC 应对 UGC 风险', items: [
        ['The risk with user-generated content is losing control of the message.', '用户生成内容的风险是我们无法控制信息。'],
        ['We could set simple guidelines and a hashtag to guide customers.', '我们可以设置简单指引和话题标签来引导顾客。'],
        ["Let's repost the best customer content on our official account.", '把最好的顾客内容转发到官方账号。'] ] }
    ],
    community: [
      { group: 'Mobilizing customers 动员顾客', items: [
        ['People enjoy being part of a brand with a lively community.', '人们喜欢成为活跃社群品牌的一员。'],
        ['A small reward, like a free upgrade, can motivate people to post.', '免费升级之类的小奖励能激励大家发帖。'],
        ["Let's invite our regulars to try the new drink first.", '邀请老顾客优先试喝新品。'] ] },
      { group: 'Principles in action 原则的应用', items: [
        ['Participation: anyone can contribute without asking permission.', '参与:任何人无需许可都能贡献内容。'],
        ['Persistence: customer posts stay online for others to see and share.', '持久:顾客的帖子会留存,供他人查看分享。'],
        ['Transparency: let customers vote for their favorite flavor.', '透明:让顾客投票选出最爱口味。'] ] },
      { group: 'Answering concerns 回应顾虑', items: [
        ['I understand the worry about control, but listening to our audience also improves customer service.', '我理解对失控的担心,但倾听受众也能改善客户服务。'],
        ['We can start with 20 loyal customers as a pilot.', '我们可以先找 20 位忠实顾客试点。'],
        ['Their feedback will help us improve the product too.', '他们的反馈也有助于改进产品。'] ] }
    ]
  };

  var GAME = {
    id: GAME_ID,
    title: 'Leaf 新品上市晨会',
    titleEn: 'Leaf Morning Meeting',
    scene: {
      setting: 'Wednesday morning, Leaf marketing meeting. A new drink launches next week and the budget is small.',
      problem: 'Problem: post on our own channels (owned media), or get customers to post (mass collaboration)? 自己发还是发动顾客发?',
      goal: 'Goal: agree on one concrete plan (channels, actions, reasons) within 4 rounds. 4 轮内达成具体方案。'
    },
    roles: {
      sales: {
        emoji: '💼', name: 'Sales Assistant', zh: '销售助理', color: '#c0602b',
        view: 'I care about sales and budget.', viewZh: '我关心销量和预算。',
        stance: '更关心销量转化与预算,倾向稳妥、可衡量的做法。',
        concern: '新品首周销量、每一分预算是否花得值。',
        resource: '门店与小程序的销售数据、少量促销预算。',
        task: '把预算和销量的硬约束带进讨论,推动团队选出"可衡量"的方案。',
        opener: 'Morning, everyone. We launch next week but the budget is tight. I need whatever we do to translate into sales, so let me hear your ideas.',
        extra: [['track sales conversion', '追踪销售转化'], ['stay within budget', '控制在预算内'], ['offer a launch-week coupon', '推出首周优惠券']],
        sentences: [
          ['Our budget is limited, so we need to cut marketing costs without losing sales.', '我们预算有限,所以要在不影响销量的前提下降低营销成本。'],
          ['Can we track sales conversion from each channel?', '我们能追踪每个渠道的销售转化吗?'],
          ["I have reservations about ___ because we can't measure the return.", '我对…有顾虑,因为我们无法衡量回报。'],
          ["Let's run a small-scale pilot before we commit the whole budget.", '在投入全部预算前,我们先小规模试点吧。']
        ]
      },
      social: {
        emoji: '📱', name: 'Social Media Specialist', zh: '社交媒体专员', color: '#2c6bac',
        view: 'I care about brand and content.', viewZh: '我关心品牌和内容。',
        stance: '重视品牌形象与内容质量,倾向由品牌主导发布,但愿意尝试话题活动。',
        concern: '品牌调性是否统一、内容是否有传播力。',
        resource: '官方小红书/抖音/微信账号、内容制作能力。',
        task: '用专业判断选择渠道和内容形式,守住品牌调性,同时评估顾客参与的可行性。',
        opener: 'Good morning. Our official accounts already have a steady audience, so I think we can build buzz ourselves with strong content. But I am open to other ideas.',
        extra: [['keep our brand voice consistent', '保持品牌调性一致'], ['create shareable content', '制作易于分享的内容'], ['post on Xiaohongshu and Douyin', '在小红书和抖音发布']],
        sentences: [
          ['Our official accounts can help us showcase our brand with consistent content.', '我们的官方账号可以用统一的内容展示品牌。'],
          ["I'm in favor of owned media, but we could also tap into user-generated content.", '我支持自有媒体,但我们也可以利用用户生成内容。'],
          ['A hashtag campaign would increase our digital exposure and reach a new audience.', '话题活动能提升线上曝光并触达新受众。'],
          ['We need to keep our brand voice consistent, whoever posts it.', '无论谁发布,我们都要保持品牌调性一致。']
        ]
      },
      community: {
        emoji: '🤝', name: 'Community Coordinator', zh: '社群运营', color: '#2e7d4f',
        view: 'I believe in our customers.', viewZh: '我相信我们的顾客。',
        stance: '相信顾客的力量,倾向发动顾客一起发,实现 mass collaboration。',
        concern: '顾客是否愿意参与、社群是否活跃。',
        resource: '几个活跃的顾客微信群与会员体系。',
        task: '说明顾客参与的价值与做法,回应"内容不可控"的担忧,提出激励与引导办法。',
        opener: 'Hi team. Our regulars love sharing photos of their drinks. Why not let them tell the story for us? That is what mass collaboration is about.',
        extra: [['mobilize the masses to contribute', '动员大众参与贡献'], ['listen to our audience', '倾听受众'], ['encourage interaction', '鼓励互动']],
        sentences: [
          ['Our customers are already sharing photos; we just need to mobilize them to contribute.', '顾客本来就在晒图,我们只需要动员他们参与。'],
          ['If people swarm to the campaign, we can develop a loyal community.', '如果大家群聚参与活动,我们就能培养忠实社群。'],
          ['Transparency matters: let the community vote and shape the content.', '透明很重要:让社群投票并参与塑造内容。'],
          ["Let's encourage interaction by featuring the best customer posts.", '我们通过展示最佳顾客帖子来鼓励互动吧。']
        ]
      }
    },
    mockReplies: [
      'That is a fair point. Could you tell us how we would measure the result?',
      'I like where this is going. What would be the first step next week?',
      'Good, but we should check the cost and the risk before we commit.',
      'I think we are close. Let us agree on a clear plan and a timeline.'
    ]
  };

  // ===== 状态 =====
  var state = { roleId: null, round: 0, picked: [], turns: [], chat: [], ended: false };
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var isMock = function () { return !LLM_ENDPOINT || /[?&]mock=1/.test(location.search); };
  var key = function () { return STORE_KEY + state.roleId; };

  function show(v) { $('v-topic').classList.toggle('hidden', v !== 'topic'); $('v-role').classList.toggle('hidden', v !== 'role'); window.scrollTo(0, 0); }

  // ===== 角色卡 =====
  function renderRoleCards() {
    $('role-cards').innerHTML = Object.keys(GAME.roles).map(function (id) {
      var r = GAME.roles[id];
      var words = r.extra.map(function (w) { return '<span class="role-word">' + esc(w[0]) + '<small>' + esc(w[1]) + '</small></span>'; }).join('');
      var sents = r.sentences.slice(0, 2).map(function (s) { return '<li>' + esc(s[0]) + '<span class="zh">' + esc(s[1]) + '</span></li>'; }).join('');
      return '<div class="role-card" style="--c:' + r.color + '"><div class="role-emoji">' + r.emoji + '</div><div class="role-name">' + esc(r.name) + '</div><div class="role-zh">' + esc(r.zh) + '</div>' +
        '<p class="role-line">' + esc(r.view) + '<span class="zh">' + esc(r.viewZh) + '</span></p>' +
        '<div class="role-sub">Key words</div><div class="role-words">' + words + '</div>' +
        '<div class="role-sub">Useful sentences</div><ul class="role-sents">' + sents + '</ul>' +
        '<div class="role-enter"><button class="btn btn-primary" data-role="' + id + '">Enter 进入 →</button></div></div>';
    }).join('');
    Array.prototype.forEach.call($('role-cards').querySelectorAll('button'), function (b) { b.onclick = function () { enterRole(b.dataset.role); }; });
  }

  // ===== 角色思考界面 =====
  function enterRole(roleId) {
    state.roleId = roleId; state.picked = [];
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(key())); } catch (e) {}
    if (saved && saved.turns && saved.turns.length) {
      state.round = saved.round; state.turns = saved.turns; state.chat = saved.chat; state.ended = !!saved.ended;
    } else {
      state.round = 0; state.turns = []; state.ended = false;
      state.chat = [{ type: 'sys', text: '会议开始 The meeting begins' }];
      Object.keys(GAME.roles).forEach(function (id) { if (id !== roleId) state.chat.push({ type: 'ai', role: id, text: GAME.roles[id].opener }); });
    }
    renderRole(); show('role');
  }

  function save() {
    try { localStorage.setItem(key(), JSON.stringify({ round: state.round, turns: state.turns, chat: state.chat, ended: state.ended })); } catch (e) {}
  }

  function renderRole() {
    var me = GAME.roles[state.roleId];
    var groups = COMMON_WORDS.slice();
    groups.push({ group: '角色专属 ' + me.name, type: 'extra', items: me.extra });
    var panel = groups.map(function (grp) {
      return '<div class="word-group"><div class="word-group-title">' + esc(grp.group) + '</div><div class="chips">' + grp.items.map(function (it) {
        return '<button class="chip" data-type="' + grp.type + '" data-en="' + esc(it[0]) + '" data-zh="' + esc(it[1]) + '">' + esc(it[0]) + '<small>' + esc(it[1]) + '</small></button>';
      }).join('') + '</div></div>';
    }).join('');
    $('v-role').style.setProperty('--c', me.color);
    $('v-role').innerHTML = '<button class="bsim-back" id="back-topic">← 返回情境与角色卡</button>' +
      '<div class="rp-head"><span class="rp-badge">' + me.emoji + ' ' + esc(me.name) + ' · ' + esc(me.zh) + '</span><span class="rp-round" id="rp-round"></span></div>' +
      '<div class="rp-goal">' + esc(GAME.scene.goal) + ' ' + esc(GAME.scene.problem) + '</div>' +
      '<div class="chat-box" id="chat"></div>' +
      '<div id="composer"><div class="word-panel">' + panel + '<div class="picked" id="picked"></div>' +
      '<div class="rp-actions"><button class="btn btn-primary" id="gen" disabled>生成沟通话术 Generate</button><button class="btn btn-ghost" id="clear">清空选择</button><button class="btn btn-ghost" id="end">结束会议</button></div><div class="rp-err" id="err"></div></div></div>' +
      '<details class="pb" open><summary>话术库 Phrasebank · 点击句子可复制 Click to copy</summary>' +
      '<div class="pb-title">For your role 本角色</div>' + bankHtml(BANK_ROLE[state.roleId]) +
      '<div class="pb-title">For everyone 通用衔接与技巧</div>' + bankHtml(BANK_SHARED) + '</details>' +
      '<div class="rp-actions" style="margin-top:16px"><button class="btn btn-dl" id="dl">⬇ 下载全部话术与学习资料</button><button class="btn btn-ghost" id="reset">重新开始</button></div>';
    $('back-topic').onclick = function () { show('topic'); };
    Array.prototype.forEach.call($('v-role').querySelectorAll('.chip'), function (c) {
      c.onclick = function () {
        var i = indexOfPick(c.dataset.en);
        if (i >= 0) state.picked.splice(i, 1); else state.picked.push({ type: c.dataset.type, en: c.dataset.en, zh: c.dataset.zh });
        syncPicked();
      };
    });
    Array.prototype.forEach.call($('v-role').querySelectorAll('.pb-item'), function (el) {
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
    $('picked').innerHTML = state.picked.length ? '已选:' + state.picked.map(function (p) { return esc(p.en); }).join(' + ') : '请从上方选择关键词(建议:1 个态度 + 1 个决策 + 1-2 个理由)';
    $('gen').disabled = state.ended || state.picked.length < 2;
    $('rp-round').textContent = state.ended ? '会议已结束' : '第 ' + Math.min(state.round + 1, MAX_ROUNDS) + ' / ' + MAX_ROUNDS + ' 轮' + (isMock() ? '(模拟模式)' : '');
    $('composer').classList.toggle('hidden', state.ended);
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

  // ===== 生成 =====
  function buildPrompt() {
    var me = GAME.roles[state.roleId];
    var others = Object.keys(GAME.roles).filter(function (id) { return id !== state.roleId; });
    var system = 'You are a business English coach running a role-play for Chinese university students (CEFR B1-B2).\n' +
      'Scenario: Leaf, a new tea-drink brand. The marketing team meets in the morning; a new drink launches next week and the budget is small. The team must decide how to spread the news through media: post on the brand\'s own channels (owned media) or mobilize customers to post (mass collaboration / user-generated content), or combine both.\n' +
      'The student plays: ' + me.name + ' (' + me.stance + '). The AI colleagues are: ' + others.map(function (id) { return id + ' = ' + GAME.roles[id].name + ' (' + GAME.roles[id].stance + ')'; }).join('; ') + '.\n' +
      'Course knowledge: social media business value (showcase your brand, develop a loyal community, improve customer service, increase digital exposure, boost traffic in search engine rating, expand sales and reach a new audience, cut marketing costs); mass collaboration with six principles (participation, collective/swarming, transparency, independence, persistence, emergence); terms like umbrella term, tap into, user-generated content, so-what.\n' +
      'Task: turn the student\'s chosen keywords into a natural first-person spoken contribution (2-4 sentences, must use ALL chosen keywords, stay in character and on topic). Then give study notes and replies from the two colleagues (1-2 sentences each, reacting to the student and advancing the discussion, keeping their own stance).\n' +
      'Return ONLY JSON: {"speech": string, "keyPhrases": [{"en": string, "zh": string, "note": string}], "patterns": [{"en": string, "zh": string}], "colleagueReplies": [{"role": "' + others.join('" | "') + '", "text": string}]}. keyPhrases = the chosen keywords and other useful business phrases used in the speech (zh = Chinese meaning, note = short usage tip in Chinese). patterns = reusable sentence structures from the speech (en with ___ placeholders, zh explanation).';
    var hist = state.chat.filter(function (m) { return m.type !== 'sys'; }).slice(-6).map(function (m) {
      return (m.type === 'me' ? me.name + ' (student)' : GAME.roles[m.role].name) + ': ' + m.text;
    }).join('\n');
    var user = 'Round ' + (state.round + 1) + ' of ' + MAX_ROUNDS + (state.round + 1 === MAX_ROUNDS ? ' (final round: move toward an agreement)' : '') + '.\nConversation so far:\n' + hist + '\n\nStudent\'s chosen keywords:\n' + state.picked.map(function (p) { return '[' + p.type + '] ' + p.en; }).join('\n');
    return { system: system, user: user };
  }

  function mockGenerate() {
    var by = function (t) { return state.picked.filter(function (p) { return p.type === t; }); };
    var st = by('stance')[0], dc = by('decision'), rs = by('reason'), pr = by('principle'), ex = by('extra');
    var parts = [];
    if (st) parts.push(st.en + ' ' + (dc.length ? dc.map(function (d) { return d.en; }).join(' and ') : 'this plan') + '.');
    else if (dc.length) parts.push('I think we should consider ' + dc.map(function (d) { return d.en; }).join(' and ') + '.');
    if (rs.length) parts.push('This would help us ' + rs.map(function (r) { return r.en; }).join(' and ') + '.');
    if (pr.length) parts.push('It also fits the principle of ' + pr.map(function (p) { return p.en; }).join(' and ') + '.');
    if (ex.length) parts.push('Above all, we need to ' + ex.map(function (e) { return e.en; }).join(' and ') + '.');
    var others = Object.keys(GAME.roles).filter(function (id) { return id !== state.roleId; });
    return {
      speech: parts.join(' ') || 'Let me share my view.',
      keyPhrases: state.picked.map(function (p) { return { en: p.en, zh: p.zh, note: '' }; }),
      patterns: [
        { en: "I'm in favor of ___ because it would help us ___.", zh: '我支持…,因为它能帮助我们…(表态 + 理由)' },
        { en: 'This also fits the principle of ___.', zh: '这也符合…原则(联系课程概念)' }
      ],
      colleagueReplies: others.map(function (id, i) { return { role: id, text: GAME.mockReplies[(state.round + i) % GAME.mockReplies.length] }; })
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
      if (state.round >= MAX_ROUNDS) { state.ended = true; state.chat.push({ type: 'sys', text: '会议结束 Meeting adjourned。请下载你的话术与学习资料。' }); }
      save(); btn.textContent = '生成沟通话术 Generate'; renderChat(); syncPicked();
    }).catch(function (e) {
      err.textContent = '生成失败:' + (e.message || e) + '。请稍后重试,或在地址后加 ?mock=1 使用模拟模式。';
      btn.textContent = '生成沟通话术 Generate'; btn.disabled = state.picked.length < 2;
    });
  }

  function endMeeting() {
    if (state.ended) return;
    if (!confirm('确定提前结束会议?')) return;
    state.ended = true; state.chat.push({ type: 'sys', text: '会议结束 Meeting adjourned。请下载你的话术与学习资料。' });
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
    L.push('---', '', '# 话术库 Phrasebank', '');
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
