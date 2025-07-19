---
layout: post
title: "第六话：请填写标题"
---

<!-- 上方：音频+字幕 | Vivian 的灵光一现 -->
<div style="display: flex; gap: 24px; margin-bottom: 2em; align-items: stretch; max-height: 340px; min-height: 240px;">
  <!-- 左上：音频+字幕 -->
  <div style="flex: 2 1 0; display: flex; flex-direction: column; justify-content: flex-start;">
    <audio id="audio-ep6" controls style="width: 100%; max-width: 700px;">
      <source src="/class/assets/podcasts/innovation_ep6.wav" type="audio/wav">
      您的浏览器不支持 audio 元素。
    </audio>
    <div id="lrc-container-ep6" style="width: 100%; max-width: 700px; max-height: 240px; min-height: 180px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background: #fafbfc; margin-bottom: 1.5em;">
      <ul id="lrc-list-ep6" style="margin:0; padding:0;"></ul>
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
    <iframe src="/class/assets/podcasts/Chapter 6.pdf" width="100%" height="600px" style="border:1px solid #ccc; border-radius:8px;"></iframe>
  </div>
</div>

<script>
const terms = [
  { name: "尤里卡时刻 (Eureka Moment)", desc: "灵光一现的瞬间，通常与突然的发现或顿悟联系在一起。" },
  { name: "知识推动 (Knowledge Push)", desc: "创新源于科学研究和技术进步，将新知识和技术推向市场。" },
  { name: "需求拉动 (Need Pull)", desc: "创新源于市场或用户对解决问题或满足未被满足需求的需求。" },
  { name: "研发 (R&D)", desc: "研究与开发，旨在发现新知识和创造新技术、产品或工艺的系统性活动。" },
  { name: "增量创新 (Incremental Innovation)", desc: "对现有产品、流程或服务进行的渐进式改进。" },
  { name: "突破性创新 (Breakthrough Innovation)", desc: "引入与以往产品、流程或服务截然不同的全新概念或技术，通常具有显著的市场影响。" },
  { name: "摩尔定律 (Moore's Law)", desc: "一项观察结果，认为集成电路上的晶体管数量大约每两年翻一番，导致计算能力和存储能力的指数级增长。" },
  { name: "改善 (Kaizen)", desc: "源于日本的持续改进哲学，涉及组织内所有层级的员工持续寻找和实施小规模改进。" },
  { name: "精益思想 (Lean Thinking)", desc: "一种旨在消除所有形式浪费的系统性方法，以提高效率和价值。" },
  { name: "危机驱动创新 (Crisis-Driven Innovation)", desc: "在面临紧急需求、资源稀缺或系统性冲击时被迫进行的创新。" },
  { name: "服务不足市场 (Underserved Markets)", desc: "指其需求未被现有产品或服务充分满足的消费者群体。" },
  { name: "颠覆性创新 (Disruptive Innovation)", desc: "一种创新，最初可能针对边缘或服务不足的市场，提供更简单、更便宜或更便捷的解决方案，最终颠覆主流市场。" },
  { name: "技术超前 (Technology Overshoot)", desc: "产品功能超出用户实际需求，导致复杂性增加和价值感知降低。" },
  { name: "逆向创新 (Reverse Innovation)", desc: "为新兴市场开发并在这些市场取得成功的创新，随后被应用于发达市场。" },
  { name: "节俭创新 (Frugal Innovation)", desc: "在资源有限的情况下，以最小的资源创造最大价值的创新方法，通常强调简单、可维护和可负担性。" },
  { name: "蓝海战略 (Blue Ocean Strategy)", desc: "通过创造无竞争的市场空间来建立竞争优势，而不是在现有市场中竞争。" },
  { name: "大规模定制 (Mass Customization)", desc: "在大规模生产效率下，提供高度个性化产品或服务的能力，满足个体客户的需求。" },
  { name: "分销定制 (Distribution Customization)", desc: "客户可以定制产品包装、交付计划和位置，但产品本身是标准化的。" },
  { name: "组装定制 (Assembly Customization)", desc: "客户从预定义的选项中选择，产品使用标准化组件按订单组装。" },
  { name: "制造定制 (Fabrication Customization)", desc: "客户选择预定义的设计，产品按订单制造。" },
  { name: "设计定制 (Design Customization)", desc: "客户参与到产品设计过程的早期，共同创造独特的产品。" },
  { name: "用户作为创新者 (Users as Innovators)", desc: "认为用户主动贡献新产品和服务的想法和原型，而不是被动接受者。" },
  { name: "领用者 (Lead Users)", desc: "在其市场中拥有高级需求且先于主流市场发现创新解决方案的用户。" },
  { name: "免费创新 (Free Innovation)", desc: "创新者主要出于个人需求而非盈利动机进行创新，但其成果可能被更广泛地传播或商业化。" },
  { name: "自由披露 (Free Revealing)", desc: "在线社区中用户自愿与同行分享创新成果的行为。" },
  { name: "众包 (Crowdsourcing)", desc: "组织向大型开放网络发出号召，以获取自愿贡献、想法或执行特定任务。" },
  { name: "极端用户 (Extreme Users)", desc: "在具有极端或独特需求的严苛环境中的用户，其解决方案可能具有更广泛的适用性。" },
  { name: "原型设计 (Prototyping)", desc: "创建一个产品或流程的早期版本，以测试想法、收集反馈并促进迭代开发。" },
  { name: "边界对象 (Boundary Object)", desc: "一个共享的工件或概念，允许不同背景和视角的个体围绕它进行沟通和协作。" },
  { name: "最小可行产品 (Minimum Viable Product, MVP)", desc: "具有足够功能以满足早期客户需求并收集反馈以供未来开发的最低限度产品版本。" },
  { name: "逆向工程 (Reverse Engineering)", desc: "拆解或分析产品以理解其设计、功能和制造过程。" },
  { name: "标杆管理 (Benchmarking)", desc: "与其他组织进行系统比较，以识别最佳实践并改进自身绩效。" },
  { name: "重组创新 (Recombinant Innovation)", desc: "将在一个领域常见的想法和应用转移或组合到另一个新环境中。" },
  { name: "双联 (Bisociation)", desc: "将看似不相关的概念结合起来，产生新的见解和创新。" },
  { name: "设计驱动创新 (Design-Driven Innovation)", desc: "创新通过设计过程来赋予产品新的意义、形状和形式，为用户带来惊喜和愉悦。" },
  { name: "体验经济 (Experience Economy)", desc: "经济发展阶段，产品和服务被视为创造难忘的个人体验的工具。" },
  { name: "法规 (Regulation)", desc: "政府或机构制定的规则和法律，可以限制或刺激创新。" },
  { name: "反创新 (Counter-Innovation)", desc: "旨在规避或利用现有法规或限制的创新。" },
  { name: "未来与预测 (Futures and Forecasting)", desc: "探索和想象替代性未来情景，以刺激创新思维和战略规划。" },
  { name: "事故 (Accidents)", desc: "意想不到的事件或错误，有时会触发意想不到的创新发现。" },
  { name: "管理假阴性 (Managing False Negatives)", desc: "从最初被认为是失败的实验或意想不到的负面结果中发现创新机会。" }
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
  const ul = document.getElementById('lrc-list-ep6');
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
  const ul = document.getElementById('lrc-list-ep6');
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
  const lrcText = await fetchLRC('/class/assets/podcasts/innovation_ep6.txt');
  const lrcArr = parseLRC(lrcText);
  renderLRC(lrcArr);
  const audio = document.getElementById('audio-ep6');
  syncLRC(audio, lrcArr);
})();
</script> 