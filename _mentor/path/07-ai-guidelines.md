---
title: "08 · AI 使用指南"
author: Huang Jie
layout: post
permalink: /mentor-platform/path/08-ai-guidelines/
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/mentor-platform/platform.css">

<div class="mp-wrap">

<nav class="mp-page-toc" aria-label="本页目录">
  <a href="#sec-goals">本阶段目标</a>
  <a href="#sec-howto">一、写作中怎么用 AI</a>
  <a href="#sec-ethics">二、AI 使用伦理</a>
  <a href="#sec-bp">Best Practice</a>
  <a href="#sec-qa">Q&amp;A</a>
  <a href="#sec-check">自查清单</a>
  <a href="#sec-read">延伸阅读</a>
</nav>

<div class="mp-section">
  <h2 id="sec-goals">本阶段目标</h2>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:0 0 8px;">学生要完成</h3>
  <ul class="mp-goals">
    <li>学会给对话式 AI（如 ChatGPT）下清晰、可追问的指令，不满足于一次性生成的成品。</li>
    <li>了解 Cursor、Codex 这类「智能体」（agentic AI）工具和对话式 AI 的区别，尝试用它们管理论文写作过程中的资料。</li>
    <li>把 AI 用在项目管理上（进度、版本、自查），而不只是用来生成文字。</li>
    <li>建立自己的 AI 使用记录习惯：清楚知道自己在哪个环节用了 AI，哪个环节是独立完成的。</li>
    <li>知道 AI 容易在哪些地方出错，对 AI 给出的关键信息一律核实，不盲目采信。</li>
  </ul>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:16px 0 8px;">导师关注</h3>
  <ul class="mp-goals">
    <li>学生是否只会「一次性提问、直接拿答案」，还是能通过多轮追问、拆解任务，让 AI 的产出可核查。</li>
    <li>涉及 AI 辅助的部分，学生能不能准确说清楚自己的判断依据，而不是一句「AI 是这么说的」。</li>
    <li>对 AI 给出的数据、文献、术语判断，学生是否做过独立核实。</li>
  </ul>
</div>

<div class="mp-section">
  <h2 id="sec-howto">一、写作中怎么用 AI</h2>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:0 0 8px;">1. 对话式 AI：Prompt 规范</h3>
  <p style="margin:0 0 12px;">ChatGPT、文心一言这类网页对话式 AI，效果很大程度取决于你怎么问。几条实用规范：</p>
  <ul class="mp-list">
    <li><strong>先给背景，再给任务。</strong>告诉它你在写哪种类型的报告（笔译实践 / 口译实践 / 调研报告）、当前处于哪个阶段（开题 / 正文写作 / 修改），再提具体要求。不要直接说「帮我写开题报告」。</li>
    <li><strong>把任务拆小，一步步来。</strong>先要大纲、确认没问题，再逐段展开；不要一次性要一整章成品，那样很难核查、也很难看出哪里是它编的。</li>
    <li><strong>要求它说明依据。</strong>多问一句「你这个说法/建议是基于什么」，方便你判断是否可信，也能帮你自己想清楚要不要采纳。</li>
    <li><strong>让它反过来审查你，而不只是替你写。</strong>比如把自己写好的一段贴给它，要求「请扮演盲审专家，挑出这段的问题」，往往比直接要 AI 代写更有帮助，也更不容易踩学术诚信的边界。</li>
    <li><strong>喂给它你已确定的材料作为上下文。</strong>比如已定稿的开题报告、术语表，再让它在这个范围内工作，能明显减少它凭空编造内容的情况。</li>
  </ul>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:16px 0 8px;">2. Agentic AI（如 Cursor、Codex）：和对话式 AI 有什么不同</h3>
  <p style="margin:0 0 12px;">除了网页对话式 AI，现在也有 Cursor、Codex 这类「智能体」（agentic AI）工具，思路和用法都不一样，值得了解并尝试。</p>
  <div class="mp-table-wrap">
    <table class="mp-table">
      <thead>
        <tr>
          <th style="width:22%;"></th>
          <th style="width:39%;">对话式 AI（网页版 ChatGPT 等）</th>
          <th style="width:39%;">Agentic AI（Cursor、Codex 等）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>怎么获取上下文</td>
          <td>靠你手动复制粘贴，每次对话它并不「记得」你的文件</td>
          <td>可以直接连接到你本地的文件夹，自己读取、检索里面的内容</td>
        </tr>
        <tr>
          <td>能不能自己动手</td>
          <td>只能在对话框里给文字，改动要你自己搬回文档</td>
          <td>可以直接打开、编辑、新建文件，按你给的任务自主完成多个步骤</td>
        </tr>
        <tr>
          <td>典型用法</td>
          <td>单次提问、单段生成或润色</td>
          <td>「帮我把这三份访谈记录整理成统一格式的语料表」「检查正文里有没有和开题报告矛盾的地方」这类跨文件、多步骤任务</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p style="margin:0 0 12px;">对论文写作来说，一个现实可行的用法是：把开题报告、文献笔记、访谈 / 语料记录、各章草稿都放进同一个文件夹，让 agentic AI 工具帮你管理和检索——比如让它在所有笔记里找某个理论关键词出现的地方，或者对照最新一版开题报告，检查正文有没有前后不一致。</p>
  <p style="color:#64748b;margin:0;">需要提醒的边界：agent 能自动执行多步操作，效率更高，但也更容易在你没留意的时候改动或生成大段内容。一定要养成「每一步变动都看一眼」的习惯，不要因为工具看起来「很智能」就放松核查，具体的核查原则见下文「AI 使用伦理」。</p>
</div>

<div class="mp-section">
  <h2 id="sec-ethics">二、AI 使用伦理</h2>
  <p style="margin:0 0 12px;">参考国内外高校（如斯坦福、密歇根、哈佛等）近年发布的教师 / 学生 AI 使用规范，可以把「怎么用 AI」落到两条底线上：<strong>留痕</strong>和<strong>独立思考与操作执行分开</strong>。</p>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:0 0 8px;">1. 留痕：清楚记录自己在什么步骤用了 AI</h3>
  <p style="margin:0 0 12px;">建议给自己的论文建一份简单的「AI 使用记录」，哪怕只是一个表格，也比什么都不记录要好：</p>
  <div class="mp-table-wrap">
    <table class="mp-table">
      <thead>
        <tr>
          <th style="width:16%;">日期</th>
          <th style="width:20%;">工具 / 模型</th>
          <th style="width:24%;">使用环节</th>
          <th style="width:20%;">指令 / 提示词概要</th>
          <th style="width:20%;">我做了什么修改或取舍</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>示例</td>
          <td>ChatGPT</td>
          <td>第三章初稿生成</td>
          <td>「基于以下术语表和访谈记录，起草 3.2 节」</td>
          <td>删去了两处编造的数据，改写了结论段</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p style="color:#64748b;margin:0;">这份记录不一定要提交，但盲审或答辩被问到「这部分是不是 AI 写的」时，能立刻说清楚用在哪、改了什么，比含糊其辞更让人信任，也是对自己负责的一种方式。</p>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:16px 0 8px;">2. 独立思考与操作执行：一个简单的三色分区</h3>
  <p style="margin:0 0 12px;">借用高校 AI 使用规范里常见的「红黄绿三色灯」思路，把论文写作中的不同环节分成三类，越靠近「这是不是你自己的学术判断」，AI 介入就应该越少、你的核查也应该越严：</p>
  <div class="mp-table-wrap">
    <table class="mp-table">
      <thead>
        <tr>
          <th style="width:14%;">分区</th>
          <th style="width:43%;">典型环节</th>
          <th style="width:43%;">对 AI 的态度</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>🔴 红区</td>
          <td>研究问题的提出、理论 / 分析框架的选择、案例分析的最终结论、答辩现场的回答</td>
          <td>不能让 AI 替你下结论。AI 最多帮你梳理思路、列举可能性，最终判断必须是你自己的</td>
        </tr>
        <tr>
          <td>🟡 黄区</td>
          <td>文献检索与综述整理初稿、译后编辑的具体修改、数据整理与图表初步生成、语言润色</td>
          <td>可以用 AI 提高效率，但产出必须经过你自己的核实和修改，且要按上表留痕</td>
        </tr>
        <tr>
          <td>🟢 绿区</td>
          <td>参考文献格式转换、术语表初步抽取、排版与配图辅助、写作日程与任务提醒</td>
          <td>可以放心批量使用，通常无需特别说明</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p style="color:#64748b;margin:0;">这个分区不是绝对标准，具体到你的选题可以和导师商量调整，但核心原则不变。论文正文里如果涉及具体的工具使用披露（例如译后编辑用了哪个引擎、怎么调用），写作要求见 <a href="{{ site.baseurl }}/mentor-platform/path/04-report/">04 报告主体写作</a>。</p>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:16px 0 8px;">3. AI 容易在哪里犯错，核实责任在你</h3>
  <ul class="mp-list">
    <li><strong>编造文献和数据（幻觉）。</strong>AI 可能生成看起来很真实的引用、页码、数字，但实际并不存在。凡是 AI 给出的文献引用和具体数据，必须自己去数据库或原始来源核实。</li>
    <li><strong>很少主动说「不确定」。</strong>遇到专业性强、比较冷门的问题，AI 的回答往往语气很自信，但不代表内容正确，越是你不熟悉的领域，越要多留一分警惕。</li>
    <li><strong>长文本容易前后不一致。</strong>论点、案例和结论之间出现脱节或矛盾，是生成式 AI 常见的问题，需要你自己通读全文检查逻辑是否连贯。</li>
    <li><strong>对翻译和术语问题容易机械化处理。</strong>AI 容易忽略语境和文化负载词的细微差别，给出字面正确、但语用不当的译法或术语判断，这部分仍需要你的专业判断把关。</li>
    <li><strong>文责自负：无论 AI 犯了什么错，论文提交后责任在你，不在 AI。</strong>把 AI 当作一个「经验丰富但有时会说错话」的助手来对待，而不是权威来源。</li>
  </ul>
</div>

<div class="mp-section">
  <h2 id="sec-bp">Best Practice</h2>
  <div class="mp-qa">
    <h4 class="no_toc">用 AI 维护一份写作进度清单，而不只是用来生成文字</h4>
    <p>可以让 AI 帮你根据本站 8 个节点，对照当前写作阶段列出「已完成 / 进行中 / 还没开始」，并提出下一步建议。定期做这件事，比只在遇到困难时才想起用 AI，更能发挥它在项目管理上的作用。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">让 AI 帮你做版本对比，而不是肉眼比对</h4>
    <p>修改稿越改越多版本时，可以把两版内容都给 AI，让它列出实质性差异（不是逐字比对格式），这在处理盲审修改前后版本、或多次译后编辑的对照时特别省时间。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">阶段性地让 AI 扮演「导师 / 评委」自查</h4>
    <p>写完一个阶段后，把本站对应节点的自查清单发给 AI，让它对照你的文本逐条检查是否遗漏。这不能替代导师的真实反馈，但可以帮你在正式提交前先过一遍，减少明显疏漏。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">保留每一版草稿，不要覆盖式修改</h4>
    <p>建议按 v1、v2、v3 保留版本（哪怕只是简单地另存文件名），方便追溯某个 AI 建议是在哪一版被采纳、又是在哪一版被你推翻的，这也是「留痕」的一部分。</p>
  </div>
</div>

<div class="mp-section">
  <h2 id="sec-qa">Q&amp;A</h2>
  <div class="mp-qa">
    <h4 class="no_toc">Q1 · 我该用对话式 AI 还是 agentic AI（Cursor / Codex 之类）？</h4>
    <p class="mp-muted">不是二选一。零散的问答、单段润色，对话式 AI 已经够用；如果你的论文材料比较多（大量访谈记录、语料、多章草稿），需要跨文件检索、批量整理或反复核对一致性，agentic AI 会明显更省事。可以两者搭配：日常问答用对话式，资料量大的整理和核查工作交给 agent。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q2 · 三色分区里，「文献综述初稿」算黄区，是不是意味着综述可以主要靠 AI 写？</h4>
    <p class="mp-muted">不是。黄区的意思是可以用 AI 提高整理效率（比如快速梳理某类文献的共性观点），但你仍需要自己判断哪些文献真正相关、怎么组织进综述、支撑什么论点，这些属于学术判断，AI 只是帮你加快查找和初步整理的速度。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q3 · AI 使用记录一定要写进论文里吗？</h4>
    <p class="mp-muted">论文正文里该披露到什么程度，参考 <a href="{{ site.baseurl }}/mentor-platform/path/04-report/">04 报告主体写作</a> 中关于工具使用的具体要求。本页建议的「AI 使用记录表」主要是给自己留档、方便被问到时能说清楚，不等同于论文里必须逐条列出的正式披露内容。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q4 · 用 Cursor / Codex 这类工具直接改了我的文件，会不会不算「自己写的」？</h4>
    <p class="mp-muted">关键不在工具本身，而在红黄绿分区里你的环节属于哪一类。用 agent 帮你整理语料、检查一致性（黄区 / 绿区工作），并不影响论文是「你写的」；但如果让它直接生成你的核心论点或结论（红区工作）却不加甄别地采纳，就需要认真反思这是否还是你自己的学术判断。</p>
  </div>
</div>

<div class="mp-section">
  <h2 id="sec-check">自查清单</h2>
  <ul class="mp-check">
    <li>我给 AI 下指令时，会先给背景再提任务，并把大任务拆成小步骤，而不是一次要一整章成品</li>
    <li>我了解 agentic AI（如 Cursor、Codex）和对话式 AI 的区别，并考虑过用它管理自己的论文资料</li>
    <li>我建立了自己的 AI 使用记录（哪怕只是简单表格），知道自己在哪个环节用了什么工具</li>
    <li>我能清楚说出论文中哪些内容属于「红区」（必须自己判断）、哪些属于「黄区」（AI 辅助但需核实）</li>
    <li>AI 给出的文献引用、数据、术语判断，我都做过独立核实，没有直接照搬</li>
    <li>我保留了写作过程中的多个版本，能追溯 AI 建议在哪一版被采纳或推翻</li>
  </ul>
</div>

<div class="mp-section">
  <h2 id="sec-read">延伸阅读</h2>
  <p style="font-size:14px;color:#64748b;">
    见 <a href="{{ site.baseurl }}/mentor-platform/library/">资料下载</a>；论文正文中工具使用的披露要求见 <a href="{{ site.baseurl }}/mentor-platform/path/04-report/">04 报告主体写作</a>。
    本页「三色分区」思路参考了斯坦福、密歇根、哈佛等高校近年发布的 AI 使用规范培训内容。
  </p>
</div>

<p class="mp-note">返回 <a href="{{ site.baseurl }}/mentor-platform/">平台总览</a></p>

<div class="mp-ai">
  个性化问题可返回 <a href="{{ site.baseurl }}/mentor-platform/">总览</a> 使用 AI 导师。
</div>
{% include mentor-footnote.html %}
</div>
