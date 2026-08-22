---
title: "04 · 报告主体写作"
author: Huang Jie
layout: post
permalink: /mentor-platform/path/04-report/
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/mentor-platform/platform.css">

<div class="mp-wrap">

<nav class="mp-page-toc" aria-label="本页目录">
  <a href="#sec-goals">本阶段目标</a>
  <a href="#sec-bp">Best Practice</a>
  <a href="#sec-qa">Q&amp;A</a>
  <a href="#sec-check">自查清单</a>
  <a href="#sec-read">延伸阅读</a>
</nav>

<div class="mp-section">
  <h2 id="sec-goals">本阶段目标</h2>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:0 0 8px;">学生要完成</h3>
  <ul class="mp-goals">
    <li>把开题里的 Project Focus 写成能执行的 Chapter 3 Project Implementation：项目怎么做、用什么工具、每一步的规则是什么。尽量写到可复现、可自动化的颗粒度。</li>
    <li>Chapter 4 Results 只汇报<strong>结果</strong>：错误类型、频次、对照译文、图表。不在这里下结论、做推断。</li>
    <li>Chapter 5 Discussion and Conclusion 再讨论与收束：回答研究问题、说明局限与可迁移的经验。结论里不要突然出现 Chapter 4 没出现过的新数据。</li>
    <li>图表、版本、术语、评分流程与正文互相咬合：Chapter 3 写过的步骤，Chapter 4 要能对得上。</li>
  </ul>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:16px 0 8px;">导师关注</h3>
  <ul class="mp-goals">
    <li>Chapter 3 能否看出发现问题、解决问题的项目管理思维，而不是译前 / 译中 / 译后的空架子。</li>
    <li>事实与观点是否分开：Results 有没有夹带评价，Discussion and Conclusion 有没有无中生有的新数字。</li>
    <li>图表与案例是否规范、可核对：有无版权截图、坐标轴误导、图表悬空、MT / PE / 终稿混成一版。</li>
  </ul>
</div>

<div class="mp-section">
  <h2 id="sec-bp">Best Practice</h2>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:0 0 8px;">Chapter 3 Project Implementation</h3>
  <p style="margin:0 0 12px;">这一章写<strong>你怎么把项目做完</strong>：逻辑、方法、细节。读者看完应能大致复现你的流程。目标是高效、高质，能自动化的步骤尽量自动化，并写清规则。</p>
  <ul class="mp-goals">
    <li><strong>先讲做了什么，再讲为什么。</strong>引擎、CAT、提示词、评分框架，都要落到具体名称、版本或调用方式（网页 / 插件 / API）。不要用单个译例凭手感决定选哪家引擎。</li>
    <li><strong>写方法，不写案例分析。</strong>原文特征、字数、工具链、术语如何抽取与筛选、质控节点，放在这里；具体译例和错误分布放到 Chapter 4 Results。</li>
    <li><strong>能自动化的写进流程。</strong>分句与对齐、术语抽取、QA 检查、批量调用 MT，说明工具、参数和人工复核点。筛选标准必须写清（例如抽了多少条、留了多少条、为什么删）。</li>
    <li><strong>评分与审校要可核对。</strong>几位评分员、如何分工、是否独立打分、如何处理分歧。若不用常规的评分者信度，须说明如何控制主观性。</li>
    <li><strong>写作时态用过去时。</strong>终稿时项目已完成。开题报告里的写作计划表不要留在 Chapter 3。</li>
    <li><strong>题目、类型、流程三者一致。</strong>实际做了 MTPE，就按译后编辑来写，不要口头上说翻译却不交代 MT 稿从哪来。</li>
  </ul>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:16px 0 8px;">Chapter 4 Results</h3>
  <p style="margin:0 0 12px;">这一章的主题是<strong>汇报研究结果</strong>。只呈现你观察到的事实：数量、分布、对照文本。不包括推断和结论，那些留给 Chapter 5 Discussion and Conclusion。</p>
  <ul class="mp-goals">
    <li><strong>分清事实和观点。</strong>“某类错误出现 N 次”“PE 后该类错误降至 M”是结果；“因此该策略优于……”是讨论，不要提前写进 Chapter 4。</li>
    <li><strong>版本必须对得上 Chapter 3。</strong>若流程里有 MT、LLM-PE、人工 PE，结果里就要分版呈现，不能突然冒出 TT1 / TT2，也不能把两步合成一个 PE。</li>
    <li><strong>案例要能看出你的劳动。</strong>译后编辑类至少给出 MT 稿与你的修改稿；只放终稿，看不出策略和工作量。</li>
    <li><strong>图表不能单独存在。</strong>顺序是：一两句说明将看到什么 → 插入 Figure / Table 并编号引用 → 用文字解释图中要点。不要图后无字，也不要连续堆三张截图当三幅图。</li>
    <li><strong>坐标轴与数据诚实。</strong>柱状 / 折线的 Y 轴默认从 0 起；若截取区间，须在图注说明原因，否则微小差异会被放大，误导读者。</li>
    <li><strong>不要盗用出版物截图。</strong>框架图请自行绘制或标注 Adapted from …。软件界面截图只保留必要逻辑，并说明来源。</li>
  </ul>

  <h3 class="no_toc" style="font-size:15px;color:#1e40af;margin:16px 0 8px;">Chapter 5 Discussion and Conclusion</h3>
  <ul class="mp-goals">
    <li><strong>回答 Chapter 3 提出的问题。</strong>讨论要把结果说清楚对实践有什么启发；结论收束为可迁移的经验，而不是再报一遍数字。</li>
    <li><strong>不出现新数据。</strong>某项修正率、某类错误占比，若结论要用，必须先在 Chapter 4 出现。</li>
    <li><strong>每个研究问题都要有着落。</strong>只总结主要错误类型、却不谈如何应对或预判，问题就只答了一半。</li>
    <li>局限与下一步写具体：缺哪类对照、哪步尚未自动化、换场景是否仍成立。空泛地写未来可以扩大语料，帮助不大。</li>
  </ul>
</div>

<div class="mp-section">
  <h2 id="sec-qa">Q&amp;A</h2>
  <p style="font-size:14px;color:#94a3b8;margin:0 0 12px;">以下根据近两年 MTI 实践报告评阅中的高频问题整理，不针对某一篇论文。</p>

  <div class="mp-qa">
    <h4 class="no_toc">Q1 · Chapter 3 写到用了 CAT / AI / 术语库，还要细到什么程度？</h4>
    <p>要细到别人能复现：哪款软件、是否启用翻译记忆和术语库、MT 是网页还是插件、AI 是网页对话、API 还是智能体。只写“使用了在线术语库和 AI”等于没写。ChatGPT 是大模型，不是机器翻译引擎，不要和 Google Translate、有道混称。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q2 · 研究问题能不能写成“我将完成 MT、PE 和质量评估”？</h4>
    <p>不能。那是任务清单。研究问题应是可回答的，例如某类文本在某流程中最常见的错误类型是什么、哪些编辑策略最有效。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q3 · Chapter 3 能不能举译例来说明理论或文本特征？</h4>
    <p>尽量不要。Chapter 3 交代项目如何设计、如何完成；具体策略和译例放 Chapter 4 Results。否则读者会在方法章里看到分析、在结果章里又看不到对应版本，结构会乱。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q4 · 术语抽了几百条、只用了几十条，需要解释吗？</h4>
    <p>需要。写出筛选标准，否则会被问：工具准不准？留下的条目依据是什么？术语在项目里是译前约束、译中辅助，还是译后质检，也要说清。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q5 · 请了同学或老师审校，怎么写才专业？</h4>
    <p>写资质、任务分工、是否独立审、依据哪套标准（如 MQM 的哪些错误类型）。不要只写 professor and classmates 做了 professional proofreading。多人审校若说不清流程，译文信度会受影响。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q6 · Chapter 4 图表前后必须有文字吗？连续截图可以吗？</h4>
    <p>必须：先预告、再出图、再解释，正文用 Figure 4-1 这样的编号引用。内容连贯的多张截图应拼成一幅图，不要 Figure 3-1、3-2、3-3 连着排、中间没有说明。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q7 · 数据的纵轴可不可以只呈现 80–90 的区间？差异看起来更清楚啊。</h4>
    <p>这会视觉放大很小的差距，属于不规范的数据呈现。Y 轴从 0 起；确需截取时，在图注说明原因。</p>
  </div>
  <div class="mp-qa">
    <h4 class="no_toc">Q8 · 结论里写了一个 Chapter 4 没有的百分比，可以吗？</h4>
    <p>不可以。结论只能讨论已经汇报过的结果。新数字先补进 Chapter 4 Results，再在 Chapter 5 引用。</p>
  </div>

</div>

<div class="mp-section">
  <h2 id="sec-check">自查清单</h2>
  <ul class="mp-check">
    <li>Chapter 3 能回答：用了什么工具、每一步规则是什么、术语和评分如何筛选；时态为过去时</li>
    <li>Chapter 3 没有大段译例分析，也没有开题用的写作时间表</li>
    <li>Chapter 4 只报事实，推断和“所以应该……”已放到 Chapter 5</li>
    <li>MT / PE / 终稿等版本与 Chapter 3 流程一致，案例里分得开</li>
    <li>每张图、表都有编号、前置说明和后续解释；Y 轴未随意截取</li>
    <li>结论未引入 Chapter 4 没有的新数据；每个研究问题都有对应回答</li>
    <li>文内注为作者姓 + 年份；中英文使用弯引号，不用网页直引号</li>
  </ul>
</div>

<div class="mp-section">
  <h2 id="sec-read">延伸阅读</h2>
  <p style="color:#64748b;">结构与篇幅以学院下发的学位论文模板为准。语料与流程准备见 <a href="{{ site.baseurl }}/mentor-platform/path/03-practice-translation/">03A 笔译</a>、<a href="{{ site.baseurl }}/mentor-platform/path/03-practice-interpreting/">03B 口译</a>。</p>
</div>

<p class="mp-note">上一节点：<a href="{{ site.baseurl }}/mentor-platform/path/03-practice-translation/">03A 笔译</a> · <a href="{{ site.baseurl }}/mentor-platform/path/03-practice-interpreting/">03B 口译</a> · 下一节点：<a href="{{ site.baseurl }}/mentor-platform/path/05-blind-review/">05 盲审修改</a></p>
</div>
