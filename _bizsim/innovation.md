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
.bsim .msg.coach-row, .bsim .msg.you-row { display: flex; gap: 10px; align-items: flex-start; max-width: 100%; }
.bsim .msg.you-row { flex-direction: row-reverse; margin-left: auto; }
.bsim .coach-avatar, .bsim .you-avatar { width: 46px; height: 46px; border-radius: 50%; flex: 0 0 auto; display: flex; align-items: center; justify-content: center; }
.bsim .coach-avatar { background: #d1fae5; }
.bsim .you-avatar { background: #dbeafe; }
.bsim .coach-avatar svg, .bsim .you-avatar svg { width: 34px; height: 34px; }
.bsim .coach-row .msg-bubble, .bsim .you-row .msg-bubble { flex: 1; }
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
.bsim .role-kicker { margin: 10px 0 2px; font-size: 13px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: #64748b; }
.bsim .role-goal { margin: 0; font-size: 16px; font-weight: 600; line-height: 1.45; color: #1e293b; }
.bsim .role-brief { margin: 4px 0 0; padding-left: 1.15em; }
.bsim .role-brief li { margin: 0 0 6px; font-size: 15.5px; font-weight: 600; line-height: 1.4; color: #1e293b; }
.bsim .role-goal .zh, .bsim .role-brief .zh, .bsim .rp-goal .zh { display: block; margin-top: 1px; font-size: 14.5px; font-weight: 400; color: #64748b; line-height: 1.4; }
.bsim .rp-goal { color: #1e293b; }
.bsim .rp-goal .orient-goal { margin: 0; font-weight: 700; }
.bsim .rp-goal h4 { margin: 12px 0 4px; font-size: 14px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: #64748b; }
.bsim .rp-goal ul { margin: 0; padding-left: 1.2em; }
.bsim .rp-goal li { margin: 0 0 7px; font-weight: 500; }
.bsim details.pb .rp-goal { background: transparent; padding: 4px 0 0; margin: 0; }
.bsim .speech-card .line-text { display: block; }
.bsim .speech-card .better-block { margin-top: 14px; padding-top: 10px; border-top: 1px solid #d7efe0; }
.bsim .speech-card .better-block h4 { color: #1e4f8a; }
.bsim .speech-card .zh { display: block; margin-top: 2px; font-size: 14.5px; font-weight: 400; color: #64748b; }
.bsim .play-btn { display: inline-flex; align-items: center; min-height: 36px; margin: 0 0 8px; border: 1.5px solid #b7dfc4; background: #fff; color: #1f5f3a; border-radius: 16px; padding: 4px 12px; font-size: 14.5px; font-weight: 700; }
.bsim .better-block .play-btn { border-color: #bfdbfe; color: #1e4f8a; }
.bsim .play-btn.on { background: #1f5f3a; border-color: #1f5f3a; color: #fff; }
.bsim .better-block .play-btn.on { background: #1e4f8a; border-color: #1e4f8a; color: #fff; }
.bsim .play-btn:disabled { opacity: .55; }
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
  var TTS_ENDPOINTS = [
    'https://tts-update-jeicusdbgk.cn-shanghai.fcapp.run',
    'https://vercel-tts.vercel.app/api/tts'
  ];
  var GAME_ID = 'nvidia-tool';
  var STORE_KEY = 'bsim_v2_' + GAME_ID + '_';

  var STAGES = [
    { en: '1 View', ask: 'Do you agree? Please use “I agree” or “I partly agree,” and give one reason.', need: 'Say how much you agree, and give one reason from the case.',
      guide: 'Jensen Huang says that AI is a tool, and people still control it. Nvidia reads data. The system does not think.\nTry these words: agree, partly agree, a tool, people control it, rules.\nYou can build the sentence like this: “I agree that ___, because ___.” Or: “I partly agree. AI is a tool, but ___.”' },
    { en: '2 Action', ask: 'Please choose one worry and say what Nvidia should do.', need: 'Name one concern and one thing the company should do.',
      guide: 'Please choose one worry. Then say one action.\nPrivacy: personal data. What data does the system read?\nJobs: job displacement means some jobs change. Workers may need new skills. A person still makes the decision.\nDecisions: the final decision. A person should make it, not the machine.\nYou can say: “Nvidia should ___ by ___.” For jobs, try: “On job displacement, the company should admit that ___.”' },
    { en: '3 Your lines', ask: 'Can you say your idea in two or three sentences?', need: 'Say two or three complete sentences, and keep the role limit.',
      guide: 'Now join your ideas. A classmate should understand you.\nUse this order: “I agree / I partly agree that ___. Nvidia should ___. People still ___.”\nPlease also keep this limit: {limit}' }
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
      limit: 'People must stay in control. Do not say that AI can think by itself.',
      task: 'Say how far you agree with the tool view, then accept one practical action that still keeps humans in control.',
      taskZh: '说明你在多大程度上同意“工具”这个看法，再接受一件仍然由人控制的具体做法。',
      cardGoal: 'Say how far you agree, then accept one action that keeps a person in control.',
      cardGoalZh: '先表态同意到哪一步，再接受一件仍由人控制的做法。',
      cardKpis: [
        ['Trust', '外界还信不信任这家公司'],
        ['One public line', '对外只讲一个口径'],
        ['Humans stay in control', '每一步仍由人做决定']
      ],
      controls: 'The CEO owns Nvidia\'s public message. He decides how much the company admits. He does not write the law.',
      kpiLine: 'Trust; one public line; humans stay in control; the AI business can continue.',
      orient: [
        { h: 'What you control', items: [
          ['You speak for the company. Your words become Nvidia\'s public line.', '你代表公司发言，你的话会变成对外口径。'],
          ['You choose how much to admit. You do not hand the decision to the machine.', '你决定公司承认多少，但不能把决定权交给机器。'],
          ['You do not write the law. You show that Nvidia will follow rules.', '你不制定法律。你要表明公司会遵守规则。']
        ]},
        { h: 'Your KPIs — how this job is judged', items: [
          ['Trust: customers and governments still believe Nvidia is responsible.', '信任：客户和政府仍然认为公司负责任。'],
          ['One message: the company does not tell two different stories.', '一个口径：公司不能今天一套、明天一套。'],
          ['Control: every action still leaves the final decision with a person.', '控制：每件做法的最后决定仍在人手里。'],
          ['Business: the AI business can continue under that rule.', '业务：在这条规则下，AI 业务还能继续。']
        ]},
        { h: 'Your stance', items: [
          ['AI is a tool, like other tools people use widely.', 'AI 是工具，和人们广泛使用的其他工具一样。'],
          ['Rules and society decide what is ethical. The tool itself does not.', '是否合乎伦理，由规则和社会决定，不是工具自己决定。'],
          ['The system processes data. It does not think, and it does not develop consciousness.', '系统只处理数据。它不会思考，也不会产生意识。'],
          ['You differ from the expert: you protect the company\'s story. You differ from the GPU lead: you care about the public line first, not the product spec.', '你和专家不同：你要保住公司的说法。你和业务负责人不同：你先管对外口径，不先管产品参数。']
        ]},
        { h: 'Ways to develop your answer', items: [
          ['If you fully agree, name one rule that keeps a person in charge.', '如果完全同意，说出一条让人仍然做主的规则。'],
          ['If you only partly agree, say which worry the appliance comparison does not cover.', '如果只部分同意，指出“家电”这个比喻盖不住哪一件忧虑。'],
          ['Admit one limit without saying the machine can think.', '可以承认一个限度，但不要说机器会自己思考。'],
          ['Pick one action Nvidia can take this year: a rule, a label on the data, or a human final decision.', '选一件公司今年就能做的事：定一条规则、标明数据用途，或规定由人做最后决定。']
        ]}
      ],
      words: [['a tool under human control', '由人控制的工具'], ['like any widely used tool', '像任何普及的工具'], ['no consciousness', '不会产生意识']]
    },
    expert: {
      emoji: '🔎', name: 'Industry Expert', zh: '受邀行业专家', color: '#b45309',
      view: 'Name the three concerns in concrete words.', viewZh: '把三件忧虑说具体。',
      boundary: 'Privacy, job displacement, and autonomous decision-making must be answered one by one. A comparison with appliances is not a full answer.',
      limit: 'Name one real worry: privacy, jobs, or machines that decide alone. A comparison with home appliances is not enough.',
      task: 'Say which part of Huang\'s view you accept, then require one company action for a named concern.',
      taskZh: '说明你接受黄仁勋看法的哪一部分，再要求公司对一件点名的忧虑做出行动。',
      cardGoal: 'Accept one part of Huang\'s view, then require one action for a named concern.',
      cardGoalZh: '先接受黄仁勋看法的一部分，再要求公司对一件点名的忧虑采取行动。',
      cardKpis: [
        ['Name the concern', '把忧虑说具体，不讲空话'],
        ['Demand an action', '要求公司做一件事'],
        ['Keep the three concerns apart', '隐私、就业、自主决策分开谈']
      ],
      controls: 'The expert does not run Nvidia. The expert tests whether the public line is enough for people outside the company.',
      kpiLine: 'Name one concern; demand one real action; keep privacy, jobs, and autonomous decisions separate. The appliance comparison is not a full answer.',
      orient: [
        { h: 'What you control', items: [
          ['You do not run Nvidia. You check whether the public line is enough.', '你不经营英伟达。你检查公司的公开说法够不够。'],
          ['You speak for people outside the company: users, workers, and the public.', '你代表公司外部的人：用户、员工和公众。'],
          ['You may accept part of Huang\'s view. You still ask for one concrete action.', '你可以接受黄仁勋的一部分看法，但仍然要公司做一件具体的事。']
        ]},
        { h: 'Your KPIs — how this job is judged', items: [
          ['Specific: the worry has a name. One slogan is not enough.', '具体：忧虑要有名字。一句口号不够。'],
          ['Action: the company must do something, not only make a comparison.', '行动：公司要做事，不能只打比方。'],
          ['Separate questions: privacy, jobs, and autonomous decisions are not one worry.', '分开：隐私、就业、自主决策是三件不同的事。']
        ]},
        { h: 'Your stance — and why it differs from Huang', items: [
          ['You accept this part: people should stay in control.', '你接受这一点：人应该保持控制。'],
          ['You do not accept this part: comparing AI with a home appliance is a full answer.', '你不接受这一点：把 AI 比作家电，就算回答完毕。'],
          ['A toaster does not read personal data, replace a job, or decide about a person.', '烤面包机不会读取个人数据，不会取代岗位，也不会对人做出决定。'],
          ['Huang protects the company\'s story. You protect the people the technology affects.', '黄仁勋要保住公司的说法。你要保护被技术影响到的人。']
        ]},
        { h: 'The points you keep on the table', items: [
          ['Privacy: whose data does the system read, and who can see it?', '隐私：系统读取谁的数据？谁能看到？'],
          ['Job displacement: which work will change, and what new skills do workers need?', '岗位变化：哪些工作会变？员工需要什么新技能？'],
          ['Autonomous decision-making: the system may suggest an answer. A person should make the final call.', '自主决策：系统可以给出建议。最后决定应当由人来做。']
        ]},
        { h: 'Ways to develop your answer', items: [
          ['Pick one sentence of Huang\'s and say, “I accept this part.”', '选黄仁勋的一句话，说 “I accept this part.”'],
          ['Then name the one concern that sentence does not answer.', '再指出这句话没有回答的那一件忧虑。'],
          ['Require one action: “Nvidia should ___ by ___.”', '要求一件行动，用 “Nvidia should ___ by ___.”'],
          ['One named concern is enough. You do not have to solve all three in one turn.', '点名一件就够。一轮里不必把三件都解决。']
        ]}
      ],
      words: [['privacy', '隐私'], ['job displacement', '岗位被取代'], ['autonomous decision-making', '自主决策']]
    },
    gpu: {
      emoji: '🖥️', name: 'GPU Business Lead', zh: '业务负责人', color: '#2e7d4f',
      view: 'The reply must match what the chips actually do.', viewZh: '回应必须和芯片真正做的事一致。',
      boundary: 'Systems process data. They do not make independent decisions. The answer must not shut down the AI business.',
      limit: 'The system only reads data. It does not decide by itself. Nvidia can still sell this technology.',
      task: 'Give one accurate technical limit, and one action the company can still sell.',
      taskZh: '给出一条准确的技术边界，以及一件公司仍能继续开展 AI 业务的做法。',
      cardGoal: 'State one true limit of the chip, and one action Nvidia can still sell.',
      cardGoalZh: '说出芯片的一条真实限度，以及一件公司仍能出售的做法。',
      cardKpis: [
        ['Technical accuracy', '只讲芯片真正做的事'],
        ['An honest limit', '不说芯片会自己做决定'],
        ['The AI business stays open', 'AI 业务还能继续卖']
      ],
      controls: 'The GPU lead owns the product claim: what the chip really does, and whether Nvidia can still sell it.',
      kpiLine: 'Technical accuracy; an honest limit; the AI business stays open. Do not say the chip decides, and do not agree to stop selling AI systems.',
      orient: [
        { h: 'What you control', items: [
          ['You own the product story: what the chip really does.', '你负责产品说法：芯片究竟做什么。'],
          ['You stop the company from promising something the hardware cannot do.', '你要拦住公司去承诺硬件做不到的事。'],
          ['You keep the AI business open. A careful answer should not shut down sales.', '你要让 AI 业务继续。谨慎的回答不应把销售关掉。']
        ]},
        { h: 'Your KPIs — how this job is judged', items: [
          ['Accuracy: the GPU speeds up parallel computation. It processes data.', '准确：GPU 加快并行计算。它处理数据。'],
          ['Honest limit: the system does not decide alone, and it does not develop consciousness.', '诚实的限度：系统不单独做决定，也不会产生意识。'],
          ['Sales: after the promise, Nvidia can still sell this technology.', '销售：做出承诺之后，公司仍然卖得出这项技术。']
        ]},
        { h: 'Your stance — next to Huang and the expert', items: [
          ['You agree with Huang on the technology: the chip computes. It does not think.', '在技术上你同意黄仁勋：芯片做计算，不会思考。'],
          ['You listen to the expert, but you reject any line that says the chip itself decides.', '你听专家的忧虑，但拒绝“芯片自己做决定”这种说法。'],
          ['Your bridge: a person makes the final call, and Nvidia still supplies the computing power.', '你的折中：人做最后决定，英伟达仍然提供算力。'],
          ['Huang guards the public story. The expert guards the people affected. You guard the product and the sale.', '黄仁勋守公开说法。专家守受影响的人。你守产品和销售。']
        ]},
        { h: 'Points you can use', items: [
          ['Parallel computation: many calculations at the same time. That is why GPUs accelerate AI.', '并行计算：同时做很多计算。所以 GPU 能加速 AI。'],
          ['Process data: the system reads and computes. A person still decides.', '处理数据：系统读取并计算。决定仍然由人做。'],
          ['Do not agree to stop selling AI systems. Offer a limit instead of a ban.', '不要同意停止销售 AI 系统。用一条限度代替一纸禁令。']
        ]},
        { h: 'Ways to develop your answer', items: [
          ['Say what the chip does in one sentence, then what it does not do.', '用一句话说芯片做什么，再用一句话说它不做什么。'],
          ['If someone asks for a ban, offer a limit: a person makes the final decision.', '如果有人要求禁止，就改成一条限度：由人做最后决定。'],
          ['Name one product promise Nvidia can still sell.', '说出一项公司仍然卖得出的产品承诺。'],
          ['Check the expert\'s demand against the chip. Keep the demand that matches the product. Refuse the demand that says the chip thinks.', '拿专家的要求去对照芯片。符合产品的留下。说芯片会思考的那条拒绝。']
        ]}
      ],
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

  function orientHtml(r) {
    var blocks = (r.orient || []).map(function (b) {
      return '<h4>' + esc(b.h) + '</h4><ul>' + b.items.map(function (it) {
        return '<li>' + esc(it[0]) + '<span class="zh">' + esc(it[1]) + '</span></li>';
      }).join('') + '</ul>';
    }).join('');
    return blocks ? '<div class="rp-goal">' + blocks + '</div>' : '';
  }

  function renderRoleCards() {
    $('role-cards').innerHTML = Object.keys(ROLES).map(function (id) {
      var r = ROLES[id];
      var kpis = (r.cardKpis || []).map(function (it) {
        return '<li>' + esc(it[0]) + '</li>';
      }).join('');
      return '<div class="role-card" style="--c:' + r.color + '"><div class="role-emoji">' + r.emoji + '</div><div class="role-name">' + esc(r.name) + '</div><div class="role-zh">' + esc(r.zh) + '</div>' +
        '<div class="role-kicker">Goal</div><p class="role-goal">' + esc(r.cardGoal) + '</p>' +
        '<div class="role-kicker">KPIs</div><ul class="role-brief">' + kpis + '</ul>' +
        '<div class="role-enter"><button class="btn btn-primary" data-role="' + id + '">Practice</button></div></div>';
    }).join('');
    Array.prototype.forEach.call($('role-cards').querySelectorAll('button'), function (b) {
      b.onclick = function () { enterRole(b.dataset.role); };
    });
  }

  function stageGuide(i) {
    var r = ROLES[state.roleId];
    var g = STAGES[i];
    return { type: 'coach', logic: g.guide.replace('{limit}', r.limit), ask: g.ask };
  }

  function freshChat() {
    return [
      { type: 'sys', text: 'Round 1 · Your view' },
      stageGuide(0)
    ];
  }

  function enterRole(roleId) {
    stopPlayer();
    stopRecording(false);
    state.roleId = roleId;
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORE_KEY + roleId)); } catch (e) {}
    if (saved && saved.chat && saved.chat.length) {
      state.stage = saved.stage || 0;
      state.attempts = saved.attempts || 0;
      state.lines = (saved.lines || []).map(function (line) {
        if (typeof line === 'string') return { text: line, better: '', audioKey: '' };
        return { text: (line && line.text) || '', better: (line && line.better) || '', audioKey: (line && line.audioKey) || '' };
      }).filter(function (line) { return line.text; });
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
      '<div class="rp-goal"><p class="orient-goal">' + esc(me.task) + '</p></div>' +
      '<div class="stage-pills" id="pills"></div>' +
      '<div class="coach-grid"><div><div class="chat-box" id="chat"></div>' +
      '<div id="composer"><div class="mic-row">' +
      '<button type="button" class="mic-btn" id="mic" aria-label="Record"><svg class="mic-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/></svg><svg class="stop-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/></svg></button>' +
      '<div class="mic-bars" id="bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
      '<div class="mic-live" id="live">Tap the mic. Tap again to send.</div></div>' +
      '<textarea class="say-box" id="say" placeholder="Or type, then press Enter."></textarea>' +
      '<div class="rp-err" id="err"></div></div></div>' +
      '<aside class="speech-card" id="speech-side"><h4>Lines to say</h4><ol id="lines"></ol><p class="bs-note" id="lines-empty">Your own sentences stay here.</p>' +
      '<div class="better-block" id="better-wrap"><h4>You could better say</h4><p class="bs-note">Listen, then compare it with your recording.<span class="zh">先听这一句，再和自己的录音比一比。</span></p><ol id="better-lines"></ol></div></aside></div>' +
      '<details class="pb"><summary>Expressions you can use</summary>' + bankHtml() + '</details>' +
      '<details class="pb"><summary>Your role and KPIs</summary>' + orientHtml(me) + '</details>' +
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
    $('speech-side').onclick = function (e) {
      var btn = e.target.closest ? e.target.closest('button') : null;
      if (!btn || btn.dataset.i == null || !btn.dataset.act) return;
      var i = Number(btn.dataset.i);
      if (btn.dataset.act === 'mine') playMine(i, btn);
      if (btn.dataset.act === 'model') speakBetter(i, btn);
    };
    $('reset').onclick = function () {
      if (!confirm('Clear this practice and start again?')) return;
      stopPlayer();
      var roleId = state.roleId;
      localStorage.removeItem(STORE_KEY + roleId);
      deleteRoleClips(roleId);
      enterRole(roleId);
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
    $('lines').innerHTML = state.lines.map(function (line, i) {
      var mine = line.audioKey ? '<button type="button" class="play-btn" data-act="mine" data-i="' + i + '">My recording</button>' : '';
      return '<li value="' + (i + 1) + '"><span class="line-text">' + esc(line.text) + '</span>' + mine + '</li>';
    }).join('');
    var betterHtml = state.lines.map(function (line, i) {
      if (!line.better) return '';
      return '<li value="' + (i + 1) + '"><span class="line-text">' + esc(line.better) + '</span><button type="button" class="play-btn" data-act="model" data-i="' + i + '">Listen</button></li>';
    }).join('');
    $('better-lines').innerHTML = betterHtml;
    $('better-wrap').style.display = betterHtml ? '' : 'none';
    $('lines-empty').style.display = state.lines.length ? 'none' : '';
    $('composer').classList.toggle('hidden', state.finished);
  }

  function renderChat() {
    var me = ROLES[state.roleId];
    $('chat').innerHTML = state.chat.map(function (m) {
      if (m.type === 'sys') return '<div class="msg-sys">' + esc(m.text) + '</div>';
      if (m.type === 'me') return '<div class="msg you-row" style="--c:' + me.color + '"><div class="you-avatar" aria-hidden="true"><svg viewBox="0 0 64 64"><circle cx="32" cy="28" r="14" fill="#fbcfe8"/><path d="M18 26c2-12 26-12 28 0v6H18z" fill="#1e3a8a"/><circle cx="27" cy="29" r="1.8" fill="#1e293b"/><circle cx="37" cy="29" r="1.8" fill="#1e293b"/><path d="M28 35c1.4 2 6.6 2 8 0" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/><path d="M16 58c2-12 30-12 32 0" fill="#93c5fd"/></svg></div><div><div class="msg-who">You</div><div class="msg-bubble">' + esc(m.text) + '</div></div></div>';
      var word = (m.word && m.word.try) ? '<span class="coach-note">Try: ' + esc(m.word.try) + '</span>' : '';
      var ask = m.ask ? '<span class="coach-ask">' + esc(m.ask) + '</span>' : '';
      return '<div class="msg coach-row" style="--c:#0f766e"><div class="coach-avatar" aria-hidden="true"><svg viewBox="0 0 64 64"><circle cx="32" cy="34" r="18" fill="#fde68a"/><circle cx="18" cy="30" r="7" fill="#fde68a"/><circle cx="46" cy="30" r="7" fill="#fde68a"/><circle cx="25" cy="33" r="2.2" fill="#1e293b"/><circle cx="39" cy="33" r="2.2" fill="#1e293b"/><path d="M26 40c2 3 10 3 12 0" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/><path d="M32 16c2-6 8-6 10-1" fill="none" stroke="#0f766e" stroke-width="3" stroke-linecap="round"/></svg></div><div><div class="msg-who">Coach</div><div class="msg-bubble">' + esc(m.logic || '') + word + ask + '</div></div></div>';
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
      'What this role controls: ' + me.controls + ' KPIs: ' + me.kpiLine + ' ' +
      'Use the role\'s KPIs when you coach. If the student speaks outside this job, point them back to one KPI in plain English. ' +
      'Do not role-play other people. Do not write the full speech for the student. ' +
      'Return ONLY JSON with keys logic, word, keep, better, ask, stageClear. ' +
      'logic: two or three complete sentences in plain English. First say what is already clear. Then give two or three useful words and one sentence frame with a blank, for example “Nvidia should ___ by ___.” Include a business term when the student talks about jobs, such as job displacement, new skills, or the final decision. Do not write the full speech. Do not use idioms. Do not reply in Chinese. Do not put the model sentence in logic. ' +
      'word: {"instead":"a short phrase they used or empty","try":"one clearer complete English sentence or empty"}. ' +
      'keep: their usable English sentence with only a light grammar fix, or "" if they did not say English. ' +
      'better: one complete B1 sentence they could say instead. Keep their meaning and this role. Use one clearer business word and a fuller sentence. One sentence only. No idioms. Empty string if they did not say English. ' +
      'ask: one simple complete question in English, under 18 words. ' +
      'stageClear: true only if their own latest words meet the stage requirement. ' +
      'If they write Chinese, ask them to try the same idea in English, put a usable English phrase in word.try, and leave better empty.';
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
      return { logic: 'That was Chinese. Try the same idea in one English sentence. I will help with the wording.', word: { instead: '', try: 'I partly agree that AI should stay under human control.' }, keep: '', better: '', ask: 'Can you say that in one English sentence?', stageClear: false };
    }
    if (stage === 0) clear = /(agree|extent|reservation|partly|largely|limited)/.test(t) && text.length > 35;
    if (stage === 1) clear = /(privacy|job|autonom)/.test(t) && /(should|address|human|process|framework|support|limit)/.test(t);
    if (stage === 2) clear = text.length > 80;
    return {
      logic: clear ? 'That covers this round.' : 'One piece is still missing. Use the question below.',
      word: { instead: '', try: stage === 1 ? 'Nvidia should address this by keeping a human decision.' : '' },
      keep: text.replace(/\s+/g, ' ').trim(),
      better: stage === 1
        ? 'On this concern, Nvidia should name what will change, and a person should still make the final decision.'
        : 'I partly agree that AI should stay under human control, because the system only processes data.',
      ask: clear ? 'Good. Add one more precise word if you want.' : STAGES[stage].ask,
      stageClear: clear
    };
  }

  function parseLLM(raw) {
    var s = String(raw == null ? '' : raw).replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    var o = null;
    try { o = JSON.parse(s); } catch (e) { o = null; }
    if (!o || typeof o !== 'object') {
      return { logic: s || 'The coach returned an empty reply.', word: {}, keep: '', better: '', ask: '', stageClear: false };
    }
    var better = typeof o.better === 'string' ? o.better.trim() : '';
    if (!better && o.word && typeof o.word.try === 'string' && o.word.try.trim().length > 20) better = o.word.try.trim();
    return {
      logic: o.logic || s,
      word: o.word || {},
      keep: typeof o.keep === 'string' ? o.keep.trim() : '',
      better: better,
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

  function addLine(keep, better, audioKey) {
    keep = String(keep || '').replace(/\s+/g, ' ').trim();
    better = String(better || '').replace(/\s+/g, ' ').trim();
    if (!keep) {
      if (audioKey) deleteClip(audioKey);
      return;
    }
    if (better && better.toLowerCase() === keep.toLowerCase()) better = '';
    for (var i = 0; i < state.lines.length; i++) {
      if (state.lines[i].text === keep) {
        if (better && !state.lines[i].better) state.lines[i].better = better;
        if (audioKey && !state.lines[i].audioKey) state.lines[i].audioKey = audioKey;
        else if (audioKey) deleteClip(audioKey);
        return;
      }
    }
    state.lines.push({ text: keep, better: better, audioKey: audioKey || '' });
  }

  function send(preset, blob) {
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
    var clipKey = (blob && blob.size > 500) ? (state.roleId + ':' + Date.now() + ':' + Math.random().toString(36).slice(2, 8)) : '';
    var clipJob = clipKey ? saveClip(clipKey, blob).then(function () { return clipKey; }).catch(function () { return ''; }) : Promise.resolve('');
    var job = isMock() ? Promise.resolve(mockReply(text)) : callLLM(text);
    Promise.all([job, clipJob]).then(function (pair) {
      var res = pair[0];
      var savedKey = pair[1];
      state.attempts += 1;
      state.chat.push({ type: 'coach', logic: res.logic, word: res.word, ask: res.ask });
      addLine(res.keep, res.better, savedKey);
      if (res.stageClear || state.attempts >= 3) advance(!!res.stageClear);
      save();
      state.sending = false;
      setMicBusy(false);
      if (live && !state.finished) live.textContent = 'Tap the mic. Tap again to send.';
      renderChat();
      renderSide();
    }).catch(function () {
      clipJob.then(function (k) { if (k) deleteClip(k); });
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

  function openAudioDb() {
    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) { reject(new Error('no db')); return; }
      var req = indexedDB.open('bsim_audio_' + GAME_ID, 1);
      req.onupgradeneeded = function () {
        if (!req.result.objectStoreNames.contains('clips')) req.result.createObjectStore('clips');
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function saveClip(key, blob) {
    return openAudioDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('clips', 'readwrite');
        tx.objectStore('clips').put(blob, key);
        tx.oncomplete = function () { resolve(key); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }

  function loadClip(key) {
    return openAudioDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var req = db.transaction('clips', 'readonly').objectStore('clips').get(key);
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  function deleteClip(key) {
    return openAudioDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('clips', 'readwrite');
        tx.objectStore('clips').delete(key);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    }).catch(function () {});
  }

  function deleteRoleClips(roleId) {
    var prefix = roleId + ':';
    return openAudioDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('clips', 'readwrite');
        var req = tx.objectStore('clips').openCursor();
        req.onsuccess = function () {
          var cur = req.result;
          if (!cur) return;
          if (String(cur.key).indexOf(prefix) === 0) cur.delete();
          cur.continue();
        };
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    }).catch(function () {});
  }

  var player = { audio: null, btn: null, url: null };
  var ttsCache = {};

  function stopPlayer() {
    if (player.audio) {
      player.audio.onended = null;
      player.audio.pause();
    }
    if (player.url) URL.revokeObjectURL(player.url);
    if (player.btn) player.btn.classList.remove('on');
    player.audio = null;
    player.btn = null;
    player.url = null;
  }

  function playBlob(blob, btn) {
    stopPlayer();
    var url = URL.createObjectURL(blob);
    var audio = new Audio(url);
    player.audio = audio;
    player.url = url;
    player.btn = btn;
    btn.classList.add('on');
    audio.onended = function () { stopPlayer(); };
    audio.play().catch(function () { stopPlayer(); });
  }

  function playMine(i, btn) {
    var line = state.lines[i];
    if (!line || !line.audioKey) return;
    if (player.btn === btn) { stopPlayer(); return; }
    btn.disabled = true;
    loadClip(line.audioKey).then(function (blob) {
      btn.disabled = false;
      if (!blob) return;
      playBlob(blob, btn);
    }).catch(function () { btn.disabled = false; });
  }

  function fetchTts(text) {
    var body = JSON.stringify({
      text: text,
      voice: 'en-US-JennyNeural',
      rate: '0.85',
      format: 'mp3',
      sample_rate: 16000
    });
    function once(i) {
      if (i >= TTS_ENDPOINTS.length) return Promise.reject(new Error('tts'));
      return fetch(TTS_ENDPOINTS[i], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      }).then(function (r) {
        return r.blob().then(function (blob) {
          var type = (r.headers.get('content-type') || '').toLowerCase();
          if (!r.ok || !blob || blob.size < 200 || type.indexOf('json') >= 0) throw new Error('bad audio');
          return blob;
        });
      }).catch(function () { return once(i + 1); });
    }
    return once(0);
  }

  function speakBetter(i, btn) {
    var line = state.lines[i];
    var text = line && line.better;
    if (!text) return;
    if (player.btn === btn) { stopPlayer(); return; }
    if (ttsCache[text]) { playBlob(ttsCache[text], btn); return; }
    var label = btn.textContent;
    btn.disabled = true;
    btn.textContent = '…';
    fetchTts(text).then(function (blob) {
      ttsCache[text] = blob;
      btn.disabled = false;
      btn.textContent = label;
      playBlob(blob, btn);
    }).catch(function () {
      btn.disabled = false;
      btn.textContent = label;
      var err = $('err');
      if (err) err.textContent = 'The model voice did not play. Try again.';
    });
  }

  function startRecording() {
    stopPlayer();
    var Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    var err = $('err');
    if (state.sending) return;
    if (!Rec || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (err) err.textContent = 'Voice input needs Chrome. Or type below and press Enter.';
      return;
    }
    var session = { stopped: false, finalText: '', rec: null, stream: null, audioCtx: null, raf: 0, chunks: [], mediaRec: null };
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
      if (window.MediaRecorder) {
        try {
          var mime = '';
          if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) mime = 'audio/webm;codecs=opus';
          else if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/mp4')) mime = 'audio/mp4';
          var mr = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
          session.mediaRec = mr;
          mr.ondataavailable = function (ev) { if (ev.data && ev.data.size) session.chunks.push(ev.data); };
          mr.start();
        } catch (eRec) {}
      }
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

  function finishSession(session, sendAfter, blob) {
    if (session.raf) cancelAnimationFrame(session.raf);
    if (session.stream) session.stream.getTracks().forEach(function (t) { t.stop(); });
    if (session.audioCtx) { try { session.audioCtx.close(); } catch (e) {} }
    if ($('mic')) $('mic').classList.remove('on');
    resetBars();
    var text = (($('say') && $('say').value) || session.finalText || '').replace(/\s+/g, ' ').trim();
    if (sendAfter) send(text, blob);
  }

  function stopRecording(sendAfter) {
    var session = recSession;
    if (!session) return;
    session.stopped = true;
    recSession = null;
    try { session.rec.stop(); } catch (e) {}
    var mr = session.mediaRec;
    if (mr && mr.state !== 'inactive') {
      mr.onstop = function () {
        var blob = new Blob(session.chunks || [], { type: mr.mimeType || 'audio/webm' });
        finishSession(session, sendAfter, blob.size > 500 ? blob : null);
      };
      try { mr.stop(); } catch (e2) { finishSession(session, sendAfter, null); }
      return;
    }
    finishSession(session, sendAfter, null);
  }

  function download() {
    var me = ROLES[state.roleId];
    var L = ['# Nvidia: A Tool in Human Hands', '', 'Role: ' + me.name + ' (' + me.zh + ')', 'Date: ' + new Date().toLocaleString(), '', '## Lines to say', ''];
    if (!state.lines.length) L.push('(No lines yet)', '');
    state.lines.forEach(function (line, i) {
      L.push((i + 1) + '. ' + line.text);
      if (line.better) L.push('   You could better say: ' + line.better);
    });
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
