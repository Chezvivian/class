---
title: 本地化项目管理：商业模拟
author: Huang Jie
layout: post
permalink: /localization-sim/
---

<style>
/* ── 整体容器 ── */
.sim-body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Microsoft YaHei", sans-serif;
  color: #2c3e50;
  max-width: 860px;
  margin: 0 auto;
  padding: 0 0 3rem;
}

/* ── 轮次导航 ── */
.round-nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.round-tab {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 600;
  border: 2px solid #dce3ed;
  color: #aaa;
  background: #f5f7fa;
  cursor: default;
}
.round-tab.active {
  background: #2c6bac;
  color: white;
  border-color: #2c6bac;
}
.round-tab.locked {
  opacity: 0.45;
}

/* ── 情景邮件卡片 ── */
.email-card {
  background: #fffcf0;
  border: 1px solid #e8d47a;
  border-left: 5px solid #f0a500;
  border-radius: 0 10px 10px 0;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.75rem;
}
.email-meta {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.6rem;
  line-height: 1.7;
}
.email-meta span { font-weight: 600; color: #555; }
.email-body {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #333;
}
.email-task {
  margin-top: 0.75rem;
  padding: 0.6rem 0.9rem;
  background: #fff8e1;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #8a6000;
}

/* ── 项目状态栏 ── */
.status-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;
  margin-bottom: 1.75rem;
}
.status-card {
  background: white;
  border: 1.5px solid #e0e6f0;
  border-radius: 10px;
  padding: 1rem 1.1rem;
  text-align: center;
}
.status-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #999;
  margin-bottom: 0.35rem;
}
.status-value {
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.2;
}
.status-sub {
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 0.25rem;
}
.budget-bar-wrap {
  background: #eef2f7;
  border-radius: 4px;
  height: 6px;
  margin-top: 0.5rem;
  overflow: hidden;
}
.budget-bar {
  height: 100%;
  border-radius: 4px;
  background: #2c6bac;
  transition: width 0.3s;
}

/* ── 决策分区卡片 ── */
.d-card {
  background: white;
  border: 1.5px solid #e0e6f0;
  border-radius: 12px;
  padding: 1.4rem 1.6rem;
  margin-bottom: 1.1rem;
}
.d-card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a2f50;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.d-card-title .icon { font-size: 1.1rem; }

/* ── 参数行 ── */
.param-row {
  margin-bottom: 1.3rem;
}
.param-row:last-child { margin-bottom: 0; }
.param-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.88rem;
  color: #444;
  margin-bottom: 0.4rem;
}
.param-name { font-weight: 600; }
.param-val {
  font-size: 1rem;
  font-weight: 700;
  color: #2c6bac;
  min-width: 4rem;
  text-align: right;
}
.param-hint {
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 0.3rem;
  line-height: 1.4;
}

/* ── Range 滑块样式 ── */
input[type=range] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #dde4f0;
  outline: none;
  cursor: pointer;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #2c6bac;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 1px 4px rgba(44,107,172,0.4);
}

/* ── 步进按钮 ── */
.stepper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.stepper button {
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 2px solid #2c6bac;
  background: white;
  color: #2c6bac;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
  flex-shrink: 0;
}
.stepper button:hover { background: #2c6bac; color: white; }
.stepper .step-val {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c6bac;
  min-width: 2rem;
  text-align: center;
}
.stepper .step-unit {
  font-size: 0.85rem;
  color: #888;
}

/* ── 单选按钮组 ── */
.radio-group {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.radio-group label {
  flex: 1;
  min-width: 6rem;
}
.radio-group input[type=radio] { display: none; }
.radio-group .radio-btn {
  display: block;
  text-align: center;
  padding: 0.55rem 0.5rem;
  border: 2px solid #dde4f0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.83rem;
  color: #666;
  transition: all 0.15s;
  line-height: 1.3;
}
.radio-group input[type=radio]:checked + .radio-btn {
  border-color: #2c6bac;
  background: #eaf2ff;
  color: #1a4f90;
  font-weight: 600;
}

/* ── 风险仪表 ── */
.risk-meter {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  margin-top: 0.5rem;
}
.risk-item {
  border-radius: 8px;
  padding: 0.6rem 0.7rem;
  font-size: 0.8rem;
  text-align: center;
}
.risk-label { font-weight: 600; margin-bottom: 0.2rem; }
.risk-desc { font-size: 0.72rem; opacity: 0.85; }
.risk-green { background: #e8f8f0; color: #1e7e50; border: 1px solid #b0e8cc; }
.risk-yellow { background: #fff9e6; color: #8a6000; border: 1px solid #f5d87a; }
.risk-red { background: #fef0f0; color: #c0392b; border: 1px solid #f5b8b8; }

/* ── 实时预览 ── */
.preview-section {
  background: #f0f4fb;
  border: 1.5px solid #c8d8ee;
  border-radius: 12px;
  padding: 1.4rem 1.6rem;
  margin-bottom: 1.1rem;
}
.preview-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a2f50;
  margin-bottom: 1rem;
  display: flex; align-items: center; gap: 0.5rem;
}
.cost-breakdown {
  font-size: 0.85rem;
  line-height: 2;
  color: #444;
}
.cost-row {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0;
  border-bottom: 1px solid #dce6f5;
}
.cost-row:last-child { border-bottom: none; }
.cost-total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1rem;
  margin-top: 0.6rem;
  padding-top: 0.4rem;
  border-top: 2px solid #2c6bac;
  color: #1a2f50;
}
.cost-warn {
  margin-top: 0.6rem;
  font-size: 0.78rem;
  color: #c0392b;
  font-weight: 600;
}

/* ── 摘要导出 ── */
.summary-section {
  background: white;
  border: 1.5px solid #e0e6f0;
  border-radius: 12px;
  padding: 1.4rem 1.6rem;
  margin-top: 1.5rem;
}
.summary-section h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a2f50;
  margin-bottom: 0.75rem;
}
.summary-box {
  font-family: "Courier New", monospace;
  font-size: 0.82rem;
  background: #f8fafb;
  border: 1px solid #dde4f0;
  border-radius: 8px;
  padding: 1rem 1.1rem;
  white-space: pre-wrap;
  line-height: 1.7;
  min-height: 10rem;
  color: #2c3e50;
}
.btn-primary {
  display: inline-block;
  margin-top: 0.85rem;
  padding: 0.7rem 1.8rem;
  background: #2c6bac;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-primary:hover { background: #1a5496; }
.btn-copy {
  margin-left: 0.6rem;
  background: #27ae60;
}
.btn-copy:hover { background: #1e8449; }
.copy-feedback {
  display: inline-block;
  margin-left: 0.75rem;
  font-size: 0.8rem;
  color: #27ae60;
  opacity: 0;
  transition: opacity 0.3s;
}

/* ── 小组输入 ── */
.group-input {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #eaf2ff;
  border: 1.5px solid #b8d0ee;
  border-radius: 10px;
  padding: 0.9rem 1.2rem;
  margin-bottom: 1.5rem;
}
.group-input label {
  font-weight: 700;
  font-size: 0.9rem;
  color: #1a4f90;
  white-space: nowrap;
}
.group-input input[type=text] {
  flex: 1;
  border: 1.5px solid #b8d0ee;
  border-radius: 6px;
  padding: 0.45rem 0.75rem;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.15s;
}
.group-input input[type=text]:focus { border-color: #2c6bac; }

/* 响应式 */
@media (max-width: 600px) {
  .status-grid { grid-template-columns: 1fr 1fr; }
  .risk-meter { grid-template-columns: 1fr; }
}
</style>

<div class="sim-body">

<!-- 轮次导航 -->
<div class="round-nav">
  <div class="round-tab active">第一轮 · 项目启动</div>
  <div class="round-tab locked">第二轮 · 质量管控</div>
  <div class="round-tab locked">第三轮 · 资产管理</div>
  <div class="round-tab locked">第四轮 · 风险应对</div>
</div>

<!-- 情景邮件 -->
<div class="email-card">
  <div class="email-meta">
    <span>发件人：</span>米兔互娱 本地化负责人 张明 &lt;zhang.ming@mitugames.com&gt;<br>
    <span>收件人：</span>星桥语言科技 项目团队<br>
    <span>主题：</span>【需求确认】《星际侦探》北美英语本地化项目 — 请提交项目启动方案
  </div>
  <div class="email-body">
    你好，感谢贵司的快速响应。附件已上传完整 RFQ 文档，项目概况如下：
    <ul style="margin:0.6rem 0 0.6rem 1.2rem; font-size:0.9rem; line-height:1.9;">
      <li>文本总量：约 <strong>143,000 字</strong>（游戏对话 12万 / UI+字幕 2.3万）</li>
      <li>语言对：简体中文 → 美式英语</li>
      <li>计划上线：Q3（距今约 <strong>16 周</strong>）</li>
      <li>总预算上限：<strong>¥150,000</strong>（含所有环节）</li>
      <li>特殊要求：游戏术语需建立官方术语库，角色名须全程一致</li>
    </ul>
    请贵司今日提交<strong>项目启动方案</strong>，说明团队配置、技术路线和工期承诺。期待合作！
  </div>
  <div class="email-task">📋 本轮任务：完成下方参数配置，生成你们小组的决策摘要并提交给教师。</div>
</div>

<!-- 小组信息 -->
<div class="group-input">
  <label>🏢 小组名称（LSP）</label>
  <input type="text" id="group-name" placeholder="例：TransPerfect组 / 文思海辉组" 
         oninput="updateSummary()" />
</div>

<!-- 项目状态栏（实时更新） -->
<div class="status-grid">
  <div class="status-card">
    <div class="status-label">预算使用预估</div>
    <div class="status-value" id="stat-cost">—</div>
    <div class="budget-bar-wrap"><div class="budget-bar" id="budget-bar" style="width:0%"></div></div>
    <div class="status-sub" id="stat-budget-pct">调整参数后显示</div>
  </div>
  <div class="status-card">
    <div class="status-label">质量风险预估</div>
    <div class="status-value" id="stat-quality">—</div>
    <div class="status-sub" id="stat-quality-sub">调整参数后显示</div>
  </div>
  <div class="status-card">
    <div class="status-label">进度可行性</div>
    <div class="status-value" id="stat-schedule">—</div>
    <div class="status-sub" id="stat-schedule-sub">调整参数后显示</div>
  </div>
</div>

<!-- ── 决策区 1：团队配置 ── -->
<div class="d-card">
  <div class="d-card-title"><span class="icon">👥</span> 团队配置</div>

  <!-- 翻译人员 -->
  <div class="param-row">
    <div class="param-label">
      <span class="param-name">翻译人员数量</span>
      <span class="param-val" id="lbl-translators">—</span>
    </div>
    <div class="stepper">
      <button onclick="step('translators',-1)">−</button>
      <span class="step-val" id="val-translators">3</span>
      <span class="step-unit">人</span>
      <button onclick="step('translators',+1)">＋</button>
    </div>
    <div class="param-hint">每位译者月产能约 15,000 字（基准），人力成本 ¥12,000/人·月。范围：2 – 6 人。</div>
  </div>

  <!-- 审校人员 -->
  <div class="param-row">
    <div class="param-label">
      <span class="param-name">审校人员数量</span>
      <span class="param-val" id="lbl-reviewers">—</span>
    </div>
    <div class="stepper">
      <button onclick="step('reviewers',-1)">−</button>
      <span class="step-val" id="val-reviewers">1</span>
      <span class="step-unit">人</span>
      <button onclick="step('reviewers',+1)">＋</button>
    </div>
    <div class="param-hint">每位审校可覆盖约 40,000 字/月，成本 ¥8,000/人·月。0 人审校意味着质量高风险。范围：0 – 3 人。</div>
  </div>
</div>

<!-- ── 决策区 2：技术路线 ── -->
<div class="d-card">
  <div class="d-card-title"><span class="icon">⚙️</span> 机器翻译（MT）使用策略</div>

  <!-- MT 对话文本 -->
  <div class="param-row">
    <div class="param-label">
      <span class="param-name">对话 / 剧情文本 MT 比例（12万字）</span>
      <span class="param-val" id="lbl-mt-dialogue">0%</span>
    </div>
    <input type="range" id="mt-dialogue" min="0" max="100" step="5" value="0"
           oninput="updateVal('mt-dialogue','lbl-mt-dialogue','%'); recalc()">
    <div class="param-hint">对话文本 MT 比例越高，成本越低，但机翻感风险上升；需配合人工后编辑（PE）。建议值：30–60%。</div>
  </div>

  <!-- MT UI/字幕 -->
  <div class="param-row">
    <div class="param-label">
      <span class="param-name">UI / 字幕文本 MT 比例（2.3万字）</span>
      <span class="param-val" id="lbl-mt-ui">0%</span>
    </div>
    <input type="range" id="mt-ui" min="0" max="100" step="5" value="0"
           oninput="updateVal('mt-ui','lbl-mt-ui','%'); recalc()">
    <div class="param-hint">UI 错误玩家直接可见，影响评分更大。字幕有时轴约束，MT 错误更难修复。建议值：20–50%。</div>
  </div>

  <!-- PE 标准 -->
  <div class="param-row">
    <div class="param-label">
      <span class="param-name">MT 后编辑（PE）标准</span>
    </div>
    <div class="radio-group">
      <label>
        <input type="radio" name="pe" value="light" onchange="recalc()">
        <span class="radio-btn">轻度 PE<br><small>修改明显错误</small></span>
      </label>
      <label>
        <input type="radio" name="pe" value="standard" checked onchange="recalc()">
        <span class="radio-btn">标准 PE<br><small>流畅度+准确性</small></span>
      </label>
      <label>
        <input type="radio" name="pe" value="full" onchange="recalc()">
        <span class="radio-btn">完整 PE<br><small>接近人工水准</small></span>
      </label>
    </div>
    <div class="param-hint">完整 PE 质量最高，但耗时约为轻度 PE 的 2 倍，成本接近人工翻译。</div>
  </div>
</div>

<!-- ── 决策区 3：时间与预算 ── -->
<div class="d-card">
  <div class="d-card-title"><span class="icon">📅</span> 时间与预算规划</div>

  <!-- 工期 -->
  <div class="param-row">
    <div class="param-label">
      <span class="param-name">向客户承诺的交付工期</span>
      <span class="param-val" id="lbl-weeks">8 周</span>
    </div>
    <input type="range" id="weeks" min="6" max="14" step="1" value="8"
           oninput="updateVal('weeks','lbl-weeks',' 周'); recalc()">
    <div class="param-hint">客户窗口期 16 周。工期越短客户越满意，但风险越高；过长则客户满意度下降。建议评估后再承诺。</div>
  </div>

  <!-- 风险储备 -->
  <div class="param-row">
    <div class="param-label">
      <span class="param-name">风险储备金（占本轮总成本的比例）</span>
      <span class="param-val" id="lbl-reserve">5%</span>
    </div>
    <input type="range" id="reserve" min="0" max="20" step="1" value="5"
           oninput="updateVal('reserve','lbl-reserve','%'); recalc()">
    <div class="param-hint">储备金用于应对后续危机（译者请假、追加内容等）。储备越高越安全，但占用预算。建议：5–15%。</div>
  </div>
</div>

<!-- ── 决策区 4：客户管理 ── -->
<div class="d-card">
  <div class="d-card-title"><span class="icon">💬</span> 客户沟通策略</div>

  <div class="param-row">
    <div class="param-label">
      <span class="param-name">与客户定期汇报频率</span>
    </div>
    <div class="radio-group">
      <label>
        <input type="radio" name="contact" value="1" onchange="recalc()">
        <span class="radio-btn">每周 1 次<br><small>低成本，信息滞后</small></span>
      </label>
      <label>
        <input type="radio" name="contact" value="2" checked onchange="recalc()">
        <span class="radio-btn">每周 2 次<br><small>平衡型（推荐）</small></span>
      </label>
      <label>
        <input type="radio" name="contact" value="3" onchange="recalc()">
        <span class="radio-btn">每周 3 次<br><small>高透明度，占用时间</small></span>
      </label>
    </div>
    <div class="param-hint">沟通频率影响客户满意度和 PM 时间消耗。过少易出现误解；过多增加内部会议成本。</div>
  </div>

  <div class="param-row">
    <div class="param-label">
      <span class="param-name">是否在启动阶段建立官方术语库</span>
    </div>
    <div class="radio-group">
      <label>
        <input type="radio" name="glossary" value="yes" checked onchange="recalc()">
        <span class="radio-btn">是，现在建立<br><small>额外 ¥3,000，但降低后期风险</small></span>
      </label>
      <label>
        <input type="radio" name="glossary" value="no" onchange="recalc()">
        <span class="radio-btn">否，翻译中积累<br><small>省前期成本，一致性风险</small></span>
      </label>
    </div>
    <div class="param-hint">客户 RFQ 已要求建立术语库。现在建立成本较低，后期修复不一致问题成本极高。</div>
  </div>
</div>

<!-- ── 实时预览 ── -->
<div class="preview-section">
  <div class="preview-title">📊 实时成本预估（基于当前参数）</div>
  <div class="cost-breakdown">
    <div class="cost-row"><span>人工翻译成本（翻译人员）</span><span id="pc-translator">—</span></div>
    <div class="cost-row"><span>人工审校成本（审校人员）</span><span id="pc-reviewer">—</span></div>
    <div class="cost-row"><span>MT 处理费（按字计费）</span><span id="pc-mt">—</span></div>
    <div class="cost-row"><span>MT 节省的人力（估算）</span><span id="pc-saving" style="color:#27ae60">—</span></div>
    <div class="cost-row"><span>术语库建设（一次性）</span><span id="pc-glossary">—</span></div>
    <div class="cost-row"><span>客户沟通 / 会议时间成本</span><span id="pc-contact">—</span></div>
    <div class="cost-row"><span>风险储备金</span><span id="pc-reserve">—</span></div>
  </div>
  <div class="cost-total">
    <span>本轮预计总支出</span>
    <span id="pc-total">—</span>
  </div>
  <div id="cost-warn" class="cost-warn"></div>

  <!-- 风险仪表 -->
  <div style="margin-top:1.1rem; font-size:0.82rem; font-weight:700; color:#444; margin-bottom:0.5rem;">风险评估</div>
  <div class="risk-meter">
    <div id="risk-quality" class="risk-item risk-yellow">
      <div class="risk-label">质量风险</div>
      <div class="risk-desc" id="risk-quality-desc">调整参数后显示</div>
    </div>
    <div id="risk-schedule" class="risk-item risk-yellow">
      <div class="risk-label">进度风险</div>
      <div class="risk-desc" id="risk-schedule-desc">调整参数后显示</div>
    </div>
    <div id="risk-budget" class="risk-item risk-green">
      <div class="risk-label">预算风险</div>
      <div class="risk-desc" id="risk-budget-desc">调整参数后显示</div>
    </div>
  </div>
</div>

<!-- ── 决策摘要 & 导出 ── -->
<div class="summary-section">
  <h4>📋 决策摘要（提交给教师）</h4>
  <div class="summary-box" id="summary-box">请先填写小组名称并调整参数，摘要将自动生成。</div>
  <div>
    <button class="btn-primary" onclick="generateSummary()">生成摘要</button>
    <button class="btn-primary btn-copy" onclick="copySummary()">复制摘要</button>
    <span class="copy-feedback" id="copy-feedback">✓ 已复制</span>
    <button class="btn-primary" onclick="saveAndGoRound2()"
            style="background:#8e44ad; margin-left:0.6rem">🔓 进入第二轮</button>
  </div>
</div>

</div><!-- /sim-body -->

<script>
// ──────────────────────────────────────────────
// 配置常量
// ──────────────────────────────────────────────
const C = {
  totalBudget: 150000,
  dialogueWords: 120000,
  uiWords: 23000,
  translatorMonthly: 12000,   // ¥/人·月
  reviewerMonthly: 8000,      // ¥/人·月
  mtCostPerWord: 0.015,       // ¥/字（MT 处理费）
  humanSavingPerWord: 0.06,   // MT 每字节省的人力成本
  contactCostPerMeeting: 600, // ¥/次（PM 时间折算）
  glossaryCost: 3000,         // ¥（术语库建设一次性成本）
  // PE 系数：影响 MT 节省量和质量分
  pe: { light: { savingMul: 1.0, qualityBonus: 0 },
        standard: { savingMul: 0.7, qualityBonus: 8 },
        full:     { savingMul: 0.45, qualityBonus: 18 } },
};

// ──────────────────────────────────────────────
// 状态
// ──────────────────────────────────────────────
const state = {
  translators: 3,
  reviewers: 1,
};

// ──────────────────────────────────────────────
// 步进器
// ──────────────────────────────────────────────
const stepCfg = {
  translators: { min: 2, max: 6 },
  reviewers:   { min: 0, max: 3 },
};

function step(key, delta) {
  const cfg = stepCfg[key];
  state[key] = Math.min(cfg.max, Math.max(cfg.min, state[key] + delta));
  document.getElementById('val-' + key).textContent = state[key];
  recalc();
}

// ──────────────────────────────────────────────
// 滑块值同步
// ──────────────────────────────────────────────
function updateVal(id, lblId, suffix) {
  document.getElementById(lblId).textContent = document.getElementById(id).value + suffix;
}

// ──────────────────────────────────────────────
// 获取当前所有参数
// ──────────────────────────────────────────────
function getParams() {
  const mtD = parseInt(document.getElementById('mt-dialogue').value);
  const mtU = parseInt(document.getElementById('mt-ui').value);
  const weeks = parseInt(document.getElementById('weeks').value);
  const reservePct = parseInt(document.getElementById('reserve').value);
  const peVal = (document.querySelector('input[name="pe"]:checked') || { value: 'standard' }).value;
  const contactFreq = parseInt((document.querySelector('input[name="contact"]:checked') || { value: '2' }).value);
  const useGlossary = (document.querySelector('input[name="glossary"]:checked') || { value: 'yes' }).value === 'yes';
  return {
    translators: state.translators,
    reviewers: state.reviewers,
    mtD, mtU, weeks, reservePct, pe: peVal, contactFreq, useGlossary,
  };
}

// ──────────────────────────────────────────────
// 核心计算
// ──────────────────────────────────────────────
function calc(p) {
  const months = p.weeks / 4;
  const peFactor = C.pe[p.pe];

  // 人力成本
  const translatorCost = p.translators * C.translatorMonthly * months;
  const reviewerCost = p.reviewers * C.reviewerMonthly * months;

  // MT 处理费
  const mtWords = C.dialogueWords * p.mtD / 100 + C.uiWords * p.mtU / 100;
  const mtCost = mtWords * C.mtCostPerWord;

  // MT 节省（MT 覆盖的字数减少了人工翻译量）
  const saving = mtWords * C.humanSavingPerWord * peFactor.savingMul;

  // 客户沟通成本
  const contactCost = p.contactFreq * C.contactCostPerMeeting * months;

  // 术语库
  const glossaryCost = p.useGlossary ? C.glossaryCost : 0;

  // 小计 & 储备
  const sub = translatorCost + reviewerCost + mtCost - saving + contactCost + glossaryCost;
  const reserve = sub * p.reservePct / 100;
  const total = sub + reserve;

  // ── 质量预估 (0–100) ──
  // 对话质量：MT 越高质量风险越大，PE 水准缓解
  const dQ = Math.max(35, 92 - p.mtD * 0.38 + peFactor.qualityBonus * 0.6);
  // UI 质量：错误更显眼
  const uQ = Math.max(35, 93 - p.mtU * 0.45 + peFactor.qualityBonus * 0.4);
  // 审校加成
  const reviewBonus = Math.min(12, p.reviewers * 4);
  const blended = (dQ * C.dialogueWords + uQ * C.uiWords) / (C.dialogueWords + C.uiWords) + reviewBonus;
  const quality = Math.round(Math.min(98, blended));

  // ── 进度可行性 ──
  // 月产能：base + MT 提速
  const mtBoostFactor = 1 + (p.mtD * 0.003 + p.mtU * 0.001);
  const monthlyCapacity = p.translators * 15000 * mtBoostFactor;
  const weeksNeeded = Math.round(((C.dialogueWords + C.uiWords) / monthlyCapacity) * 4 * 10) / 10;
  let scheduleRisk;
  if (weeksNeeded > p.weeks) scheduleRisk = 'red';
  else if (weeksNeeded > p.weeks * 0.88) scheduleRisk = 'yellow';
  else scheduleRisk = 'green';

  // ── 预算风险 ──
  const budgetPct = Math.round(total / C.totalBudget * 100);
  let budgetRisk;
  if (budgetPct > 95) budgetRisk = 'red';
  else if (budgetPct > 80) budgetRisk = 'yellow';
  else budgetRisk = 'green';

  // ── 质量风险等级 ──
  let qualityRisk;
  if (quality >= 80) qualityRisk = 'green';
  else if (quality >= 65) qualityRisk = 'yellow';
  else qualityRisk = 'red';

  return {
    translatorCost: Math.round(translatorCost),
    reviewerCost: Math.round(reviewerCost),
    mtCost: Math.round(mtCost),
    saving: Math.round(saving),
    contactCost: Math.round(contactCost),
    glossaryCost: Math.round(glossaryCost),
    reserve: Math.round(reserve),
    total: Math.round(total),
    budgetPct, quality, qualityRisk,
    weeksNeeded, scheduleRisk, budgetRisk,
  };
}

// ──────────────────────────────────────────────
// 刷新 UI
// ──────────────────────────────────────────────
function fmt(n) {
  return '¥' + n.toLocaleString('zh-CN');
}
function riskClass(r) {
  return r === 'green' ? 'risk-green' : r === 'yellow' ? 'risk-yellow' : 'risk-red';
}
function riskLabel(r) {
  return r === 'green' ? '低' : r === 'yellow' ? '中' : '高';
}

function recalc() {
  const p = getParams();
  const r = calc(p);

  // 状态栏
  document.getElementById('stat-cost').textContent = fmt(r.total);
  document.getElementById('stat-cost').style.color =
    r.budgetRisk === 'red' ? '#c0392b' : r.budgetRisk === 'yellow' ? '#e67e22' : '#27ae60';
  document.getElementById('stat-budget-pct').textContent = r.budgetPct + '% 总预算';

  const bar = document.getElementById('budget-bar');
  bar.style.width = Math.min(100, r.budgetPct) + '%';
  bar.style.background = r.budgetRisk === 'red' ? '#e74c3c' : r.budgetRisk === 'yellow' ? '#f39c12' : '#2c6bac';

  const qEl = document.getElementById('stat-quality');
  qEl.textContent = r.quality + ' 分';
  qEl.style.color = r.qualityRisk === 'red' ? '#c0392b' : r.qualityRisk === 'yellow' ? '#e67e22' : '#27ae60';
  document.getElementById('stat-quality-sub').textContent =
    r.quality >= 80 ? '质量达标预期' : r.quality >= 65 ? '质量存在风险' : '质量风险较高';

  const sEl = document.getElementById('stat-schedule');
  sEl.textContent = r.scheduleRisk === 'green' ? '✓ 可行' : r.scheduleRisk === 'yellow' ? '⚠ 紧张' : '✗ 超期';
  sEl.style.color = r.scheduleRisk === 'red' ? '#c0392b' : r.scheduleRisk === 'yellow' ? '#e67e22' : '#27ae60';
  document.getElementById('stat-schedule-sub').textContent = '估算约 ' + r.weeksNeeded + ' 周';

  // 成本明细
  document.getElementById('pc-translator').textContent = fmt(r.translatorCost);
  document.getElementById('pc-reviewer').textContent = fmt(r.reviewerCost);
  document.getElementById('pc-mt').textContent = fmt(r.mtCost);
  document.getElementById('pc-saving').textContent = '− ' + fmt(r.saving);
  document.getElementById('pc-glossary').textContent = r.glossaryCost > 0 ? fmt(r.glossaryCost) : '¥0（跳过）';
  document.getElementById('pc-contact').textContent = fmt(r.contactCost);
  document.getElementById('pc-reserve').textContent = fmt(r.reserve);
  document.getElementById('pc-total').textContent = fmt(r.total);

  const warn = document.getElementById('cost-warn');
  warn.textContent = r.budgetPct > 100
    ? `⚠ 预算超出上限 ${r.budgetPct - 100}%，需要调整参数或与客户协商追加预算。`
    : r.budgetPct > 90
    ? `⚠ 预算使用率 ${r.budgetPct}%，安全空间不足 10%，后续追加任务将超支。`
    : '';

  // 风险仪表
  setRisk('risk-quality', r.qualityRisk,
    r.qualityRisk === 'green' ? '质量预估 ' + r.quality + ' 分，达标'
    : r.qualityRisk === 'yellow' ? '质量预估 ' + r.quality + ' 分，边缘'
    : '质量预估 ' + r.quality + ' 分，高风险');

  setRisk('risk-schedule', r.scheduleRisk,
    r.scheduleRisk === 'green' ? '约 ' + r.weeksNeeded + ' 周，有缓冲'
    : r.scheduleRisk === 'yellow' ? '约 ' + r.weeksNeeded + ' 周，较紧'
    : '约 ' + r.weeksNeeded + ' 周，将超期');

  setRisk('risk-budget', r.budgetRisk,
    r.budgetRisk === 'green' ? '使用 ' + r.budgetPct + '%，充裕'
    : r.budgetRisk === 'yellow' ? '使用 ' + r.budgetPct + '%，偏高'
    : '使用 ' + r.budgetPct + '%，超支风险');

  updateSummary();
}

function setRisk(id, level, desc) {
  const el = document.getElementById(id);
  el.className = 'risk-item ' + riskClass(level);
  document.getElementById(id + '-desc').textContent = desc;
}

// ──────────────────────────────────────────────
// 摘要生成
// ──────────────────────────────────────────────
function generateSummary() {
  updateSummary();
}

function updateSummary() {
  const p = getParams();
  const r = calc(p);
  const group = document.getElementById('group-name').value.trim() || '（未填写小组名）';
  const peLabels = { light: '轻度 PE', standard: '标准 PE', full: '完整 PE' };
  const riskEmoji = { green: '🟢', yellow: '🟡', red: '🔴' };

  const now = new Date().toLocaleString('zh-CN', { hour12: false });

  const text = [
    '═══════════════════════════════════════',
    '  翻译项目沙盘 · 第一轮决策摘要',
    '═══════════════════════════════════════',
    `  小组名称：${group}`,
    `  提交时间：${now}`,
    '───────────────────────────────────────',
    '  【团队配置】',
    `  · 翻译人员：${p.translators} 人`,
    `  · 审校人员：${p.reviewers} 人`,
    '',
    '  【技术路线】',
    `  · 对话文本 MT 比例：${p.mtD}%`,
    `  · UI/字幕 MT 比例：${p.mtU}%`,
    `  · 后编辑标准：${peLabels[p.pe]}`,
    '',
    '  【时间与预算】',
    `  · 承诺交付工期：${p.weeks} 周`,
    `  · 风险储备金：${p.reservePct}%`,
    `  · 是否建立术语库：${p.useGlossary ? '是（¥3,000）' : '否'}`,
    '',
    '  【客户管理】',
    `  · 沟通频率：每周 ${p.contactFreq} 次`,
    '───────────────────────────────────────',
    '  【系统估算结果】',
    `  · 预计总支出：${fmt(r.total)}（占预算 ${r.budgetPct}%）`,
    `  · 质量风险：${riskEmoji[r.qualityRisk]} 预估质量分 ${r.quality}/100`,
    `  · 进度风险：${riskEmoji[r.scheduleRisk]} 估算工期 ${r.weeksNeeded} 周`,
    `  · 预算风险：${riskEmoji[r.budgetRisk]}`,
    '═══════════════════════════════════════',
  ].join('\n');

  document.getElementById('summary-box').textContent = text;
}

function copySummary() {
  const text = document.getElementById('summary-box').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const fb = document.getElementById('copy-feedback');
    fb.style.opacity = '1';
    setTimeout(() => { fb.style.opacity = '0'; }, 2000);
  });
}

function saveAndGoRound2() {
  const p = getParams();
  const r = calc(p);
  const code = prompt('📋 请输入教师提供的第二轮口令：');
  if (code !== 'ROUND2') {
    alert('❌ 口令不正确，请等待教师公布。');
    return;
  }
  try {
    localStorage.setItem('sim_r1', JSON.stringify({
      quality:   r.quality,
      budgetPct: r.budgetPct,
      mtD:       p.mtD,
      group:     document.getElementById('group-name').value.trim(),
    }));
  } catch(e) {}
  window.location.href = '/class/localization-sim-r2/';
}

// ──────────────────────────────────────────────
// 初始化
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // 同步滑块初始标签
  updateVal('mt-dialogue', 'lbl-mt-dialogue', '%');
  updateVal('mt-ui',       'lbl-mt-ui',       '%');
  updateVal('weeks',       'lbl-weeks',       ' 周');
  updateVal('reserve',     'lbl-reserve',     '%');
  recalc();
});
</script>
