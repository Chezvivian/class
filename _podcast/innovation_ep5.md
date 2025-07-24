---
layout: post
title: "第五话：怕什么失败？干就完了"
---

<!-- 上方：音频+字幕 | Vivian 的灵光一现 -->
<div style="display: flex; gap: 24px; margin-bottom: 2em; align-items: stretch; max-height: 340px; min-height: 240px; max-width: 1000 px;">
  <!-- 左上：音频+字幕 -->
  <div style="flex: 2 1 0; display: flex; flex-direction: column; justify-content: flex-start; border: 1px solid #222; border-radius: 12px; padding: 18px 36px; background: #fff;">
    <audio id="audio-ep5" controls style="width: 100%; max-width: 700px;">
      <source src="/class/assets/podcasts/innovation_ep5.wav" type="audio/wav">
      您的浏览器不支持 audio 元素。
    </audio>
    <div id="lrc-container-ep5" style="width: 100%; max-width: 700px; max-height: 240px; min-height: 180px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background: #fafbfc; margin-bottom: 1.5em;">
      <ul id="lrc-list-ep5" style="margin:0; padding:0;"></ul>
    </div>
  </div>
  <!-- 右上：Vivian 的灵光一现 -->
  <div style="flex: 1 1 0; border: 1.5px solid #222; border-radius: 12px; padding: 18px; background: #fff; min-width: 220px; display: flex; flex-direction: column;">
    <h3 style="margin-top:0;">Vivian 的灵光一现 (Eureka!)</h3>
    <div style="flex:1; height: 100%; overflow-y: auto; min-height: 120px; color: #888;">
      <p>（此处为灵光一现内容占位，后续可补充个人感想或灵感）</p>
    </div>
  </div>
</div>

<!-- 下方：关键术语词汇表 | 资料来源 -->
<div style="margin-bottom:2em; border:1.5px solid #bbb; border-radius:12px; background:#fff; padding:24px 18px; max-width:1000px;">
  <h2 style="margin: 0;">关键术语词汇表</h2>
    <ul style="list-style:none; padding:0; margin-top:1em;">

<script>
const terms = [
  { name: "创新型组织 (Innovative Organization)", desc: "一种通过结构、文化和管理实践支持和鼓励新想法产生、发展和实施的组织。" },
  { name: "个人层面 (Individual Level)", desc: "创新型组织管理中的一个关注点，侧重于个体员工的创造力、领导力和想法识别能力。" },
  { name: "集体层面 (Collective Level)", desc: "创新型组织管理中的一个关注点，涉及团队、群体和流程如何共同促进创新行为和成果。" },
  { name: "氛围层面 (Climate/Context Level)", desc: "创新型组织管理中的一个关注点，评估组织环境和文化因素对创新的影响。" },
  { name: "共同愿景 (Shared Vision)", desc: "组织成员共同持有并致力于实现的清晰目标和目的，是创新领导力的核心。" },
  { name: "核心刚性 (Core Rigidities)", desc: "组织因其核心竞争力而形成的思维定势和行为模式，可能成为阻碍其适应新变化和创新的障碍。" },
  { name: "转型领导力 (Transformational Leadership)", desc: "一种领导风格，通过愿景、激励和智力刺激来激发下属的创新潜力和组织承诺。" },
  { name: "领导-成员交换 (Leader-Member Exchange, LMX)", desc: "领导者与下属之间关系的质量和性质，对下属的创造力和自我决定感有重要影响。" },
  { name: "上层梯队理论 (Upper Echelons Theory)", desc: "认为高层管理团队（TMT）的特质和经验会影响组织的战略选择和绩效。" },
  { name: "有机式组织 (Organic Organization)", desc: "一种灵活、非正式的组织结构，适用于快速变化和不确定性高的环境，强调去中心化和横向沟通。" },
  { name: "机械式组织 (Mechanistic Organization)", desc: "一种 rigid、 formal 的组织结构，适用于稳定和可预测的环境，强调层级控制和标准化流程。" },
  { name: "简单结构 (Simple Structure)", desc: "明茨伯格结构原型之一，高度集中、有机，适用于小型初创企业，创新力强但依赖创始人。" },
  { name: "机械式官僚结构 (Machine Bureaucracy)", desc: "明茨伯格结构原型之一，高度集中、机械化，适用于大规模生产，创新通过专家系统实现。" },
  { name: "事业部制 (Divisionalized Form)", desc: "明茨伯格结构原型之一，分散式有机结构，适用于大型多元化组织，各事业部具有一定自主权。" },
  { name: "专业官僚结构 (Professional Bureaucracy)", desc: "明茨伯格结构原型之一，分散式机械化结构，权力下放给专业人员，通过共同标准协调。" },
  { name: "特设机构 (Adhocracy)", desc: "明茨伯格结构原型之一，项目型、高度灵活的组织，适用于复杂和不稳定环境，创新力极强。" },
  { name: "使命导向型 (Mission-oriented)", desc: "明茨伯格结构原型之一（新兴模式），由共同价值观驱动，成员高度承诺并自主行动。" },
  { name: "技术推动者 (Technical Champion)", desc: "在创新项目中提供关键技术知识、解决问题和激励团队的个体。" },
  { name: "组织赞助者 (Organizational Sponsor)", desc: "在组织内部为创新项目提供资源、支持和排除障碍，并在高层进行倡导的个体。" },
  { name: "商业创新者 (Business Innovator)", desc: "在创新项目中代表市场或用户视角，确保新想法符合商业需求和用户体验的个体。" },
  { name: "技术守门人 (Technological Gatekeeper)", desc: "在组织内部信息网络中充当枢纽的个体，负责收集外部信息并将其传递给相关人员。" },
  { name: "高参与度创新 (High Involvement in Innovation, HII)", desc: "一种将创新能力扩散到整个组织，鼓励所有员工持续贡献想法和改进的实践。" },
  { name: "持续改进 (Kaizen)", desc: "源自日本的哲学，强调通过小而持续的增量改进来提高质量和效率。" },
  { name: "精益思维 (Lean Thinking)", desc: "一种管理哲学，旨在通过消除浪费、优化流程和高员工参与来提高效率和价值创造。" },
  { name: "组织冗余 (Organizational Slack)", desc: "组织中超出现有任务需求的多余资源，在不确定和需要创新时，它能作为实验和探索的缓冲。" },
  { name: "团队 (Team)", desc: "一群为实现共同目标而协作，并共同承担责任的个体组合。" },
  { name: "团队角色 (Team Roles)", desc: "指在团队中个体倾向于扮演的特定行为模式和贡献类型，如Belbin的团队角色理论。" },
  { name: "创新氛围 (Creative Climate)", desc: "组织中支持和鼓励创造性思维和创新行为的共享感知和行为模式。" },
  { name: "组织文化 (Organizational Culture)", desc: "组织深层次的共享价值观、信仰、假设和规范，决定了组织“行事的方式”。" },
  { name: "信任与开放 (Trust and Openness)", desc: "创新氛围的一个维度，指组织内部人际关系中的情感安全，鼓励员工提出想法而无惧惩罚。" },
  { name: "挑战与投入 (Challenge and Involvement)", desc: "创新氛围的一个维度，指员工对工作和组织目标的内在激励和承诺程度。" },
  { name: "想法支持与空间 (Support and Space for Ideas)", desc: "创新氛围的一个维度，指组织提供给员工讨论、测试和发展新想法的时间和资源。" },
  { name: "冲突与辩论 (Conflict and Debate)", desc: "创新氛围的一个维度，建设性冲突（如任务冲突）和开放辩论对创新有益，而关系冲突则有害。" },
  { name: "风险承担 (Risk-taking)", desc: "创新氛围的一个维度，指组织对不确定性和模糊性的容忍度，鼓励员工尝试大胆的新举措。" },
  { name: "自由 (Freedom)", desc: "创新氛围的一个维度，指员工在工作中享有的自主权和定义自己工作的独立性。" },
  { name: "跨界合作 (Boundary-Spanning)", desc: "指组织内部或组织之间超越传统界限的合作，以促进信息、知识和想法的流动。" },
  { name: "开放创新 (Open Innovation)", desc: "一种范式，认为企业可以并将使用内部和外部的理念，以及内部和外部的市场路径来推进其技术。" },
  { name: "集体效率 (Collective Efficiency)", desc: "通过产业集群或网络中多个组织的紧密协作和互动，实现单个组织无法达到的整体绩效提升。" },
  { name: "供应链学习 (Supply Chain Learning, SCL)", desc: "供应链中各方通过信息共享、协作和共同解决问题来获取知识和提升能力的过程。" }
];

  <!-- 右下：资料来源 -->
  <div style="flex: 1 1 0; min-width: 320px;">
    <h2 style="margin-top: 0;">资料来源</h2>
    <iframe src="/class/assets/podcasts/Chapter 5.pdf" width="100%" height="600px" style="border:1px solid #ccc; border-radius:8px;"></iframe>
  </div>
</div>


<script>
async function fetchLRC(url) {
  const res = await fetch(url);
  return await res.text();
}
function parseLRC(lrc) {
  const lines = lrc.split('\n');
  const result = [];
  const timeExp = /^(\d{2}):(\d{2})\s+/;
  for (let line of lines) {
    const match = timeExp.exec(line);
    if (match) {
      const min = parseInt(match[1]);
      const sec = parseInt(match[2]);
      const time = min * 60 + sec;
      const text = line.replace(timeExp, '').trim();
      result.push({ time, text });
    }
  }
  return result;
}
function renderLRC(lrcArr) {
  const ul = document.getElementById('lrc-list-ep5');
  ul.innerHTML = '';
  lrcArr.forEach((item, idx) => {
    const li = document.createElement('li');
    li.textContent = item.text;
    li.setAttribute('data-idx', idx);
    li.style.listStyle = 'none';
    ul.appendChild(li);
  });
}
function syncLRC(audio, lrcArr) {
  const ul = document.getElementById('lrc-list-ep5');
  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    let idx = 0;
    for (let i = 0; i < lrcArr.length; i++) {
      if (currentTime >= lrcArr[i].time) idx = i;
      else break;
    }
    ul.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    const activeLi = ul.querySelector(`li[data-idx=\"${idx}\"]`);
    if (activeLi) {
      activeLi.classList.add('active');
      activeLi.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
(async function() {
  const lrcText = await fetchLRC('/class/assets/podcasts/innovation_ep5.txt');
  const lrcArr = parseLRC(lrcText);
  renderLRC(lrcArr);
  const audio = document.getElementById('audio-ep5');
  syncLRC(audio, lrcArr);
})();
</script> 