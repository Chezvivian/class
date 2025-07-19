---
layout: post
title: "第一话：创新？是不是很虚啊？"
---

<!-- 上方：音频+字幕 | Vivian 的灵光一现 -->
<div style="display: flex; gap: 24px; margin-bottom: 2em; align-items: stretch; max-height: 340px; min-height: 240px;">
  <!-- 左上：音频+字幕 -->
  <div style="flex: 2 1 0; display: flex; flex-direction: column; justify-content: flex-start;">
    <audio id="audio-ep1" controls style="width: 100%; max-width: 700px;">
      <source src="/class/assets/podcasts/innovation_ep1.wav" type="audio/wav">
      您的浏览器不支持 audio 元素。
    </audio>
    <div id="lrc-container-ep1" style="width: 100%; max-width: 700px; max-height: 240px; min-height: 180px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background: #fafbfc; margin-bottom: 1.5em;">
      <ul id="lrc-list-ep1" style="margin:0; padding:0;"></ul>
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
<div style="display: flex; gap: 32px; margin-bottom: 2em;">
  <!-- 左下：关键术语词汇表 -->
  <div style="flex: 1 1 0; min-width: 320px; max-height: 70vh; overflow-y: auto;">
    <div style="position: sticky; top: 0; z-index: 2; background: #fff; display: flex; align-items: center; gap: 12px;">
      <h2 style="margin: 0;">关键术语词汇表</h2>
      <button id="toggle-all-terms" style="padding: 4px 12px; font-size: 0.95em; border-radius: 6px; border: 1px solid #888; background: #f5f5f5; cursor: pointer;">全部展开</button>
    </div>
    <ul id="term-list" style="list-style: none; padding: 0; margin-top: 1em;"></ul>
  </div>
  <!-- 右下：资料来源 -->
  <div style="flex: 1 1 0; min-width: 320px;">
    <h2 style="margin-top: 0;">资料来源</h2>
    <iframe src="/class/assets/podcasts/Chapter 1.pdf" width="100%" height="600px" style="border:1px solid #ccc; border-radius:8px;"></iframe>
  </div>
</div>

<script>
// 关键术语词汇表内容可后续补充
const terms = [
  { name: "创新 (Innovation)", desc: "新思想的成功利用；将机会转化为新思想并将其付诸实践以创造价值的过程。" },
  { name: "创业精神 (Entrepreneurship)", desc: "将愿景、激情、精力、洞察力、判断力和勤奋结合起来，将好想法变为现实的人类特质。" },
  { name: "创造性破坏 (Creative Destruction)", desc: "约瑟夫·熊彼特提出的概念，指新产品、新流程、新商业模式的出现，不断瓦解旧有的市场和产业结构，建立新的规则。" },
  { name: "搜索 (Search)", desc: "创新过程的第一阶段，旨在发现创新机会并生成多样化的新想法。" },
  { name: "选择 (Select)", desc: "创新过程的第二阶段，从生成的想法中选择最具潜力的方案进行推进。" },
  { name: "实施 (Implement)", desc: "创新过程的第三阶段，将选定的想法转化为实际产品、服务或流程。" },
  { name: "捕获 (Capture)", desc: "创新过程的第四阶段，确保创新努力能带来预期的商业或社会价值。" },
  { name: "产品创新 (Product Innovation)", desc: "组织提供的产品或服务本身的变化。" },
  { name: "过程创新 (Process Innovation)", desc: "组织创造和交付产品或服务的方式的变化。" },
  { name: "定位创新 (Position Innovation)", desc: "产品或服务引入的背景或目标市场的变化。" },
  { name: "范式创新 (Paradigm Innovation)", desc: "组织行动的底层心智模型或商业模式的变化。" },
  { name: "增量创新 (Incremental Innovation)", desc: "在现有产品或流程基础上进行的小规模改进。" },
  { name: "激进创新 (Radical Innovation)", desc: "带来根本性变革，创造全新产品或流程的创新。" },
  { name: "组件创新 (Component Innovation)", desc: "改进复杂系统中的某个独立组成部分。" },
  { name: "架构创新 (Architectural Innovation)", desc: "改变复杂系统各组件之间的组合方式。" },
  { name: "平台创新 (Platform Innovation)", desc: "建立一个稳健的基础设计或核心技术，可以在其上开发多个变体或后续产品世代。" },
  { name: "创新生命周期 (Innovation Life Cycle)", desc: "描述创新在行业或技术发展不同阶段（流体、过渡、特定）的模式。" },
  { name: "流体阶段 (Fluid Phase)", desc: "创新生命周期的早期阶段，高度不确定，大量实验，主要关注产品创新。" },
  { name: "主导设计 (Dominant Design)", desc: "创新生命周期的过渡阶段出现的现象，指行业内对产品或流程的关键特性达成普遍接受的共识。" },
  { name: "特定阶段 (Specific Phase)", desc: "创新生命周期的成熟阶段，创新主要集中在成本降低、效率提升和产品差异化，以过程创新为主。" },
  { name: "不连续创新 (Discontinuous Innovation)", desc: "颠覆现有行业规则的创新，通常由新技术、新市场或新商业模式引发。" },
  { name: "帆船效应 (Sailing Ship Effect)", desc: "指一项成熟技术在面对新兴竞争时，其改进速度反而会加速的现象。" },
  { name: "非我发明综合症 (Not Invented Here - NIH)", desc: "一种组织文化现象，指企业拒绝采纳源自外部且不符合其现有认知或业务模式的技术或想法。" },
  { name: "商业模式创新 (Business Model Innovation)", desc: "改变组织创造、交付和捕获价值的底层逻辑和方式。" }
];

function renderTerms(expandAll = false) {
  const ul = document.getElementById('term-list');
  ul.innerHTML = '';
  terms.forEach((term, idx) => {
    const li = document.createElement('li');
    li.style.marginBottom = '10px';
    li.innerHTML = `
      <div class="term-title" style="font-weight:bold; cursor:pointer; display:flex; align-items:center;">
        <span style="flex:1;">${term.name}</span>
        <span class="arrow" style="transition:transform 0.2s;">${expandAll ? '▼' : '▶'}</span>
      </div>
      <div class="term-desc" style="display:${expandAll ? 'block' : 'none'}; margin-top:6px; color:#444; background:#f8f8f8; border-radius:6px; padding:8px 12px;">
        ${term.desc}
      </div>
    `;
    li.querySelector('.term-title').onclick = function() {
      const desc = li.querySelector('.term-desc');
      const arrow = li.querySelector('.arrow');
      if (desc.style.display === 'none') {
        desc.style.display = 'block';
        arrow.textContent = '▼';
      } else {
        desc.style.display = 'none';
        arrow.textContent = '▶';
      }
    };
    ul.appendChild(li);
  });
}

let allExpanded = false;
document.addEventListener('DOMContentLoaded', function() {
  renderTerms(false);
  document.getElementById('toggle-all-terms').onclick = function() {
    allExpanded = !allExpanded;
    renderTerms(allExpanded);
    this.textContent = allExpanded ? '全部折叠' : '全部展开';
  };
});
</script>

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
  const ul = document.getElementById('lrc-list-ep1');
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
  const ul = document.getElementById('lrc-list-ep1');
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
  const lrcText = await fetchLRC('/class/assets/podcasts/innovation_ep1.txt');
  const lrcArr = parseLRC(lrcText);
  renderLRC(lrcArr);
  const audio = document.getElementById('audio-ep1');
  syncLRC(audio, lrcArr);
})();
</script>
<style>
#lrc-list-ep1 li.active {
  color: #fff;
  background: #0078d7;
  font-weight: bold;
}
#lrc-list-ep1 li {
  padding: 2px 0;
  transition: background 0.2s;
  font-size: 1.08em;
  line-height: 1.7;
}
</style>


