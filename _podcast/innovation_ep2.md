---
layout: post
title: "第二话：数字创新又是什么？"
---

<!-- 上方：音频+字幕 | 灵光一现 -->
<div style="display: flex; gap: 24px; margin-bottom: 2em;">
  <!-- 左上：音频+字幕 -->
  <div style="flex: 2 1 0;">
    <audio id="audio-ep2" controls style="width: 100%; max-width: 700px;">
      <source src="/class/assets/podcasts/innovation_ep2.wav" type="audio/wav">
      您的浏览器不支持 audio 元素。
    </audio>
    <div id="lrc-container-ep2" style="width: 100%; max-width: 700px; max-height: 240px; min-height: 180px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background: #fafbfc; margin-bottom: 1.5em;">
      <ul id="lrc-list-ep2" style="margin:0; padding:0;"></ul>
    </div>
  </div>
  <!-- 右上：灵光一现 -->
  <div style="flex: 1 1 0; border: 1.5px solid #222; border-radius: 12px; padding: 18px; background: #fff; min-width: 220px;">
    <h3 style="margin-top:0;">灵光一现 (Eureka!)</h3>
    <div style="min-height: 120px; color: #888;">
      在这里写下你的感想或灵感……
    </div>
  </div>
</div>

<!-- 下方：关键术语表 | 资料来源 -->
<div style="display: flex; gap: 32px; margin-bottom: 2em;">
  <!-- 左下：关键术语表 -->
  <div style="flex: 1 1 0; min-width: 320px; max-height: 70vh; overflow-y: auto;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <h2 style="margin: 0;">关键术语词汇表</h2>
      <button id="toggle-all-terms" style="padding: 4px 12px; font-size: 0.95em; border-radius: 6px; border: 1px solid #888; background: #f5f5f5; cursor: pointer;">全部展开</button>
    </div>
    <ul id="term-list" style="list-style: none; padding: 0; margin-top: 1em;"></ul>
  </div>
  <!-- 右下：资料来源 -->
  <div style="flex: 1 1 0; min-width: 320px;">
    <h2 style="margin-top: 0;">资料来源</h2>
    <iframe src="/class/assets/podcasts/Chapter_2.pdf" width="100%" height="600px" style="border:1px solid #ccc; border-radius:8px;"></iframe>
  </div>
</div>

<script>
const terms = [
  {
    name: "数字创新 (Digital Innovation)",
    desc: "围绕信息的创建、捕获、存储/检索、处理和通信，以及将它们组合成具有涌现属性的高级系统的一系列技术。"
  },
  {
    name: "涌现属性 (Emergent Properties)",
    desc: "系统作为一个整体所具备的、其各个组成部分单独不具备的特性。在数字系统中，通过集成和连接，能产生超出各部分总和的功能和价值。"
  },
  {
    name: "摩尔定律 (Moore's Law)",
    desc: "一种观察，指出集成电路上可容纳的晶体管数量大约每两年翻一番，导致电子设备性能呈指数级增长，同时成本下降。"
  },
  {
    name: "物联网 (Internet of Things, IoT)",
    desc: "物理设备、车辆、家用电器及其他物品嵌入传感器、软件以及其他技术，通过网络连接，使这些物品能够交换数据。"
  },
  {
    name: "长波理论 (Long Waves)",
    desc: "由尼古拉·康德拉季耶夫提出的经济周期理论，认为经济活动存在50-60年的长期周期，由重大技术变革和创新驱动。"
  },
  {
    name: "技术经济范式 (Techno-Economic Paradigm, TEP)",
    desc: "克里斯·弗里曼和卡洛塔·佩雷斯提出的概念，指一种在特定历史时期影响整个经济和技术体系的通用技术体系和组织原则。"
  },
  {
    name: "生产力悖论 (Productivity Paradox)",
    desc: "指对信息技术进行大量投资后，并未观察到宏观经济层面的生产力显著提升的现象，通常归因于学习曲线和组织适应所需的时间。"
  },
  {
    name: "平台 (Platform)",
    desc: "一种数字基础设施，将不同的参与者（如生产者和消费者）连接起来，使他们能够以传统方式无法实现的方式进行创新或互动，并具有非线性增长的潜力。"
  },
  {
    name: "生态系统 (Ecosystem)",
    desc: "指围绕平台或核心技术形成的相互依赖的组织、个体和技术集合，共同创造和交付价值。"
  },
  {
    name: "众包 (Crowdsourcing)",
    desc: "将原先由内部员工完成的任务，通过开放的呼吁形式，外包给一大群非特定（通常是兼职或志愿）的个体。"
  },
  {
    name: "创新竞赛 (Innovation Contests)",
    desc: "一种开放创新工具，通过提供奖励，邀请大量参与者提交解决方案或想法。"
  },
  {
    name: "创新市场 (Innovation Markets)",
    desc: "将“寻求者”（有创新挑战的企业）和“解决者”（能够提供解决方案的个体或组织）通过在线平台进行匹配。"
  },
  {
    name: "协作平台 (Collaboration Platforms)",
    desc: "旨在促进团队或社区成员之间共享信息、想法和工作成果的在线工具或系统，常用于内部或外部创新活动。"
  },
  {
    name: "大数据 (Big Data)",
    desc: "指规模巨大、增长速度快、类型多样的信息资产，需要创新处理技术才能实现对其的深入分析，以帮助决策和获取洞察。通常用“3V”来概括：容量（Volume）、速度（Velocity）和多样性（Variety）。"
  },
  {
    name: "人工智能 (Artificial Intelligence, AI) / 机器学习 (Machine Learning)",
    desc: "计算机系统能够执行通常需要人类智能的任务，如学习、解决问题和决策。机器学习是AI的一个子集，使系统能够从数据中学习而无需明确编程。"
  },
  {
    name: "负责任创新 (Responsible Innovation)",
    desc: "一种创新方法，强调在技术开发和扩散过程中，预测更广泛的社会、环境和伦理后果，并灵活设计以确保技术的适应性和可控性。"
  }
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
    // 绑定点击事件
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
  const ul = document.getElementById('lrc-list-ep2');
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
  const ul = document.getElementById('lrc-list-ep2');
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
  const lrcText = await fetchLRC('/class/assets/podcasts/innovation_ep2.txt');
  const lrcArr = parseLRC(lrcText);
  renderLRC(lrcArr);
  const audio = document.getElementById('audio-ep2');
  syncLRC(audio, lrcArr);
})();
</script>
<style>
#lrc-list-ep2 li.active {
  color: #fff;
  background: #0078d7;
  font-weight: bold;
}
#lrc-list-ep2 li {
  padding: 2px 0;
  transition: background 0.2s;
  font-size: 1.08em;
  line-height: 1.7;
}
</style>
