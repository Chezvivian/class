---
title: "03A · 翻译实践和素材（笔译）"
author: Huang Jie
layout: post
permalink: /mentor-platform/path/03-practice-translation/
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/mentor-platform/platform.css">

<div class="mp-wrap">

<nav class="mp-page-toc" aria-label="本页目录">
  <a href="#sec-goals">本阶段目标</a>
  <a href="#sec-why">为什么先整理语料</a>
  <a href="#sec-workflow">建议的语料工作流</a>
  <a href="#sec-bp">Best Practice</a>
  <a href="#sec-qa">Q&amp;A</a>
  <a href="#sec-check">自查清单</a>
  <a href="#sec-read">延伸阅读</a>
</nav>

<div class="mp-section">
  <h2 id="sec-goals">本阶段目标</h2>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:0 0 8px;">学生要完成</h3>
  <ul class="mp-goals">
    <li>把零散的笔译实践材料整理好，后面能用来分析、能回头查。不要只留下一份最终译文。</li>
    <li>至少做三层整理：①双语对照文本；②按句段建好的记忆库（TM）；③术语表（可以先自动抽取，再人工确认）。</li>
    <li>同时记下过程：材料从哪来、有几个版本、用了什么工具、怎么清洗、质控怎么做。这些记录就是后面写 Project Design / Implementation 的依据。</li>
    <li>笔译方向的材料，可以支撑 <a href="{{ site.baseurl }}/mentor-platform/path/01-topic/">01 选题定向</a> 里除口译实践操作类以外的五类报告。材料整理得越清楚，后面可选的类型越多。</li>
  </ul>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:16px 0 8px;">导师关注</h3>
  <ul class="mp-goals">
    <li>Project Design / Implementation 是否看得出你遇到了什么问题、怎么解决的。评阅时这部分看得最细，也能看出项目管理能力。</li>
    <li>是不是还在按译前 / 译中 / 译后的老写法流水账。现在 AI 辅助已经很强，只按这三段写，对找工作和写论文帮助都有限。</li>
    <li>语料工作有没有把整理、清洗、质控、流程说清楚。这些写明白了，印象会好很多。</li>
  </ul>
</div>

<div class="mp-section">
  <h2 id="sec-why">为什么先整理语料</h2>
  <p style="margin:0 0 12px;">同一批笔译素材，整理深度不同，能支撑的报告类型就不同：</p>
  <div class="mp-table-wrap">
    <table class="mp-table">
      <thead>
        <tr>
          <th style="width:28%;">你留下的材料</th>
          <th style="width:72%;">更容易写成的报告类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>只有终稿译文</td>
          <td>几乎只能写传统笔译实践操作类，而且分析容易写空</td>
        </tr>
        <tr>
          <td>双语对照文本</td>
          <td>笔译实践操作类；也可支撑部分质量审校类（若保留 MT 稿）</td>
        </tr>
        <tr>
          <td>句段记忆库（TM）</td>
          <td>语言资产管理类；技术应用类（分句、对齐、导入 CAT 的流程）</td>
        </tr>
        <tr>
          <td>术语表 + 抽取/筛选记录</td>
          <td>语言资产管理类；项目质量审校类（MTPE 时术语一致性）</td>
        </tr>
        <tr>
          <td>清洗规则、版本、质控节点、工具链说明</td>
          <td>翻译项目管理类；翻译技术应用类</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p style="color:#64748b;margin:0;">建议不要等「决定写哪一类」再去找材料。先按能反复使用的标准整理好，类型选择会自然变宽。</p>
</div>

<div class="mp-section">
  <h2 id="sec-workflow">建议的语料工作流</h2>
  <p style="font-size:14px;color:#94a3b8;margin:0 0 12px;">尽量能自动处理，并且能留档。工具可以是 Trados / memoQ / OmegaT，也可以是脚本加表格。关键是规则清楚，版本能回头看。</p>
  <ol class="mp-list">
    <li><strong>选取</strong>：优先真实项目或能说明来源的实践文本；主题相对集中；注意版权与保密。笔译附录原文须「从未有过译文」，且体积要够（教指委：原文不少于 10,000 汉字）。</li>
    <li><strong>对照</strong>：把原文与译文（含 MT 稿、PE 稿、终稿，若有）整理成双语对照，标明每一版的生成方式和日期。</li>
    <li><strong>句段化</strong>：按句段（segment）切分并对齐，导入翻译记忆库。后面检索、复用、统计错误，都是按句段来做的。</li>
    <li><strong>术语</strong>：自动抽取候选术语，再人工筛选、统一译名、记下取舍理由。只写「抽了 400 条、用了 60 条」却不说明标准，评阅时会被追问。</li>
    <li><strong>清洗与质控</strong>：记下分句规则、对齐纠错、重复句处理、数字和格式检查、抽检比例。这些就是 Implementation 里最有说服力的「你做了什么」。</li>
  </ol>
</div>

<div class="mp-section">
  <h2 id="sec-bp">Best Practice</h2>
  <div class="mp-qa">
    <h4 class="no_toc">把 Implementation 写成项目管理，不要写成翻译流水账</h4>
    <p>评阅时，Project Design 和 Implementation 最能看出学生有没有从实践里找出问题、再解决问题的能力。理想情况不是「我先译前准备、再翻译、再审校」，而是：语料从零散到能用，中间遇到了什么（编码混乱、句段切分不准、术语冲突、MT 错误集中在某类结构），你用什么规则、工具或流程把它管住。能写出创造语料、管理语料、清洗、质控、流程节点，就是项目管理思维，印象会明显加分。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">现在再用译前、译中、译后三段来写，帮助有限</h4>
    <p>机器翻译和大模型已经能完成相当一部分「把意思译出来」。如果报告的主体仍是译前 / 译中 / 译后的常规描述，缺少对语料、工具和质控决策的交代，参考价值会偏弱。更有用的写法是：你如何设计流程、如何让语料后面还能用、如何在人机协作中做判断。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">不同版本要分开存，后面才写得动</h4>
    <p>至少分清：原文、MT 稿（注明引擎）、PE / 人工修改稿、终稿。混成一份「译文」后，质量审校类和技术应用类都很难写；第四章也会缺少可对比的例子。</p>
  </div>
</div>

<div class="mp-section">
  <h2 id="sec-qa">Q&amp;A</h2>
  <div class="mp-qa">
    <h4 class="no_toc">Q1 · 我是笔译方向，是不是只能写笔译实践操作类？</h4>
    <p>不是。除口译实践操作类外，其余五类都可以用笔译实践素材来写。差别在于你归档了什么：有 TM 和术语，就更适合语言资产；有完整工具链和质控节点，就更适合项目管理或技术应用；保留了 MT 与 PE 对照，就更适合项目质量审校（MTPE）。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q2 · 必须用 Trados 吗？Excel 或脚本可以吗？</h4>
    <p>可以。学院并不指定某一款 CAT。关键是：双语对齐、句段单位、术语表、版本记录这几件事要做实，并且能在报告里说明你怎么做、规则是什么。能自动处理更好，但「用了高级工具却说不清操作」，不如「工具普通但记录完整」。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q3 · 实习文本涉密，不能附原文怎么办？</h4>
    <p>教指委允许由保密方出具签字盖章说明。即便不能公开附录，你仍应在本地按同样标准归档（对照、句段、术语、过程日志），报告里写清脱敏后的规模、类型与处理流程，否则 Implementation 会空洞。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q4 · 语料还没收齐，能先写开题吗？</h4>
    <p>开题需要证明「语料可以拿到」。可以先用一小批样本跑通上述工作流，确认切分、对齐、抽取是可行的，再在开题里写清后续扩容计划。不要等全部 10,000 字齐了才开始整理。</p>
  </div>
</div>

<div class="mp-section">
  <h2 id="sec-check">自查清单</h2>
  <ul class="mp-check">
    <li>原文来源可说明，版权 / 保密已处理；体积达到附录底线或已有扩容计划</li>
    <li>已有双语对照文本，且 MT / PE / 终稿（若涉及）分版保存</li>
    <li>已按句段切分并对齐，可导入或已导入翻译记忆库</li>
    <li>已形成术语表，并记录抽取方式与筛选标准</li>
    <li>过程日志能回答：用了什么工具、做了哪些清洗、质控节点是什么</li>
    <li>我能根据现有材料，说出这批语料最适合写成六大类型中的哪一类（或哪两类）</li>
  </ul>
</div>

<div class="mp-section">
  <h2 id="sec-read">延伸阅读</h2>
  <p style="color:#64748b;">教指委对笔译附录与实践量的底线，见 <a href="{{ site.baseurl }}/mentor-platform/library/">资料下载</a> 中的《基本要求（试行）》。类型选择仍以 <a href="{{ site.baseurl }}/mentor-platform/path/01-topic/">01 选题定向</a> 为准。</p>
</div>

<p class="mp-note">上一节点：<a href="{{ site.baseurl }}/mentor-platform/path/02-proposal/">02 开题报告</a> · 对照：<a href="{{ site.baseurl }}/mentor-platform/path/03-practice-interpreting/">03B 口译</a> · 下一节点：<a href="{{ site.baseurl }}/mentor-platform/path/04-report/">04 论文主体写作</a></p>
{% include mentor-footnote.html %}
</div>
