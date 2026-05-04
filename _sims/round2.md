---
layout: default
title: 翻译项目沙盘 · 第二轮：质量管控
permalink: /localization-sim-r2/
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
.round-nav { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.round-tab {
  padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.82rem; font-weight: 600;
  border: 2px solid #dce3ed; color: #aaa; background: #f5f7fa; cursor: default;
}
.round-tab.active { background: #2c6bac; color: white; border-color: #2c6bac; }
.round-tab.done {
  background: #e8f5ee; color: #27ae60; border-color: #a8dfc0; cursor: pointer;
}
.round-tab.locked { opacity: 0.45; }

/* ── 后果展示卡 ── */
.consequence-card {
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 5px solid;
}
.consequence-card.cq-green  { background:#e8f8f0; border-color:#27ae60; }
.consequence-card.cq-yellow { background:#fff9e6; border-color:#f0a500; }
.consequence-card.cq-red    { background:#fef0f0; border-color:#e74c3c; }
.cq-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.6rem; }
.cq-body  { font-size: 0.88rem; line-height: 1.75; }
.cq-stats {
  display: flex; gap: 1rem; flex-wrap: wrap;
  margin-top: 0.75rem; font-size: 0.82rem;
}
.cq-stat {
  background: rgba(255,255,255,0.7);
  border-radius: 6px; padding: 0.35rem 0.65rem;
  font-weight: 600;
}

/* ── R1 数据输入区 ── */
.r1-import {
  background: #f0f4fb;
  border: 1.5px dashed #a8c0e0;
  border-radius: 10px;
  padding: 1.1rem 1.4rem;
  margin-bottom: 1.5rem;
}
.r1-import-title {
  font-size: 0.82rem; font-weight: 700; color: #2c6bac;
  margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px;
}
.r1-import-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;
}
.r1-field label { display: block; font-size: 0.78rem; color: #666; margin-bottom: 0.3rem; font-weight: 600; }
.r1-field input[type=number] {
  width: 100%; padding: 0.45rem 0.65rem;
  border: 1.5px solid #b8d0ee; border-radius: 6px;
  font-size: 1rem; font-weight: 700; color: #2c6bac;
  outline: none; text-align: center; box-sizing: border-box;
}
.r1-field input[type=number]:focus { border-color: #2c6bac; }
.r1-hint { font-size: 0.75rem; color: #999; margin-top: 0.65rem; }
.r1-auto-badge {
  display: inline-block; background: #27ae60; color: white;
  font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.5rem;
  border-radius: 4px; margin-left: 0.5rem; vertical-align: middle;
}

/* ── 情景邮件卡片 ── */
.email-card {
  background: #fff0f0;
  border: 1px solid #f0b0a0;
  border-left: 5px solid #e74c3c;
  border-radius: 0 10px 10px 0;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.75rem;
}
.email-meta { font-size: 0.8rem; color: #888; margin-bottom: 0.6rem; line-height: 1.7; }
.email-meta span { font-weight: 600; color: #555; }
.email-body { font-size: 0.92rem; line-height: 1.75; color: #333; }
.email-task {
  margin-top: 0.75rem; padding: 0.6rem 0.9rem;
  background: #fde8e8; border-radius: 6px;
  font-weight: 600; font-size: 0.9rem; color: #922b21;
}

/* ── 项目状态栏 ── */
.status-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 0.9rem; margin-bottom: 1.75rem;
}
.status-card {
  background: white; border: 1.5px solid #e0e6f0;
  border-radius: 10px; padding: 1rem 1.1rem; text-align: center;
}
.status-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.6px; color: #999; margin-bottom: 0.35rem; }
.status-value { font-size: 1.35rem; font-weight: 700; line-height: 1.2; }
.status-sub { font-size: 0.75rem; color: #aaa; margin-top: 0.25rem; }
.budget-bar-wrap { background: #eef2f7; border-radius: 4px; height: 6px; margin-top: 0.5rem; overflow: hidden; }
.budget-bar { height: 100%; border-radius: 4px; background: #2c6bac; transition: width 0.3s; }

/* ── 决策分区卡片 ── */
.d-card {
  background: white; border: 1.5px solid #e0e6f0;
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-bottom: 1.1rem;
}
.d-card-title {
  font-size: 0.95rem; font-weight: 700; color: #1a2f50;
  margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.5rem;
}
.d-card-title .icon { font-size: 1.1rem; }

/* ── 参数行 ── */
.param-row { margin-bottom: 1.3rem; }
.param-row:last-child { margin-bottom: 0; }
.param-label {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 0.88rem; color: #444; margin-bottom: 0.4rem;
}
.param-name { font-weight: 600; }
.param-val { font-size: 1rem; font-weight: 700; color: #2c6bac; min-width: 4rem; text-align: right; }
.param-hint { font-size: 0.75rem; color: #aaa; margin-top: 0.3rem; line-height: 1.4; }

/* ── Range 滑块 ── */
input[type=range] {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 6px; border-radius: 3px;
  background: #dde4f0; outline: none; cursor: pointer;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 18px; height: 18px; border-radius: 50%;
  background: #2c6bac; cursor: pointer;
  border: 2px solid white; box-shadow: 0 1px 4px rgba(44,107,172,0.4);
}

/* ── 单选按钮组 ── */
.radio-group { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.radio-group label { flex: 1; min-width: 6rem; }
.radio-group input[type=radio] { display: none; }
.radio-group .radio-btn {
  display: block; text-align: center; padding: 0.55rem 0.5rem;
  border: 2px solid #dde4f0; border-radius: 8px; cursor: pointer;
  font-size: 0.83rem; color: #666; transition: all 0.15s; line-height: 1.3;
}
.radio-group input[type=radio]:checked + .radio-btn {
  border-color: #2c6bac; background: #eaf2ff; color: #1a4f90; font-weight: 600;
}

/* ── 条件显示区（MT 调整子参数）── */
.conditional-block {
  background: #f5f8ff; border: 1.5px solid #c8d8ee;
  border-radius: 8px; padding: 1rem 1.1rem;
  margin-top: 0.75rem; display: none;
}
.conditional-block.visible { display: block; }

/* ── 风险仪表 ── */
.risk-meter { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; margin-top: 0.5rem; }
.risk-item { border-radius: 8px; padding: 0.6rem 0.7rem; font-size: 0.8rem; text-align: center; }
.risk-label { font-weight: 600; margin-bottom: 0.2rem; }
.risk-desc { font-size: 0.72rem; opacity: 0.85; }
.risk-green  { background: #e8f8f0; color: #1e7e50; border: 1px solid #b0e8cc; }
.risk-yellow { background: #fff9e6; color: #8a6000; border: 1px solid #f5d87a; }
.risk-red    { background: #fef0f0; color: #c0392b; border: 1px solid #f5b8b8; }

/* ── 实时预览 ── */
.preview-section {
  background: #f0f4fb; border: 1.5px solid #c8d8ee;
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-bottom: 1.1rem;
}
.preview-title {
  font-size: 0.95rem; font-weight: 700; color: #1a2f50;
  margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;
}
.cost-breakdown { font-size: 0.85rem; line-height: 2; color: #444; }
.cost-row {
  display: flex; justify-content: space-between;
  padding: 0.2rem 0; border-bottom: 1px solid #dce6f5;
}
.cost-row:last-child { border-bottom: none; }
.cost-total {
  display: flex; justify-content: space-between;
  font-weight: 700; font-size: 1rem; margin-top: 0.6rem;
  padding-top: 0.4rem; border-top: 2px solid #2c6bac; color: #1a2f50;
}
.cost-warn { margin-top: 0.6rem; font-size: 0.78rem; color: #c0392b; font-weight: 600; }

/* ── 质量变化展示 ── */
.quality-change {
  display: flex; align-items: center; gap: 0.75rem;
  background: white; border-radius: 10px; padding: 0.9rem 1.1rem;
  margin-top: 1rem; border: 1.5px solid #e0e6f0;
}
.qc-from, .qc-to {
  text-align: center; flex: 1;
}
.qc-label { font-size: 0.72rem; color: #999; text-transform: uppercase; letter-spacing: 0.5px; }
.qc-val { font-size: 1.8rem; font-weight: 700; }
.qc-arrow { font-size: 1.5rem; color: #aaa; }
.qc-delta {
  text-align: center; flex: 1;
  font-size: 1rem; font-weight: 700;
}

/* ── 摘要导出 ── */
.summary-section {
  background: white; border: 1.5px solid #e0e6f0;
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-top: 1.5rem;
}
.summary-section h3 { font-size: 0.95rem; font-weight: 700; color: #1a2f50; margin-bottom: 0.75rem; }
.summary-box {
  font-family: "Courier New", monospace; font-size: 0.82rem;
  background: #f8fafb; border: 1px solid #dde4f0; border-radius: 8px;
  padding: 1rem 1.1rem; white-space: pre-wrap; line-height: 1.7;
  min-height: 10rem; color: #2c3e50;
}
.btn-primary {
  display: inline-block; margin-top: 0.85rem; padding: 0.7rem 1.8rem;
  background: #2c6bac; color: white; border: none; border-radius: 8px;
  font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.15s;
}
.btn-primary:hover { background: #1a5496; }
.btn-copy { margin-left: 0.6rem; background: #27ae60; }
.btn-copy:hover { background: #1e8449; }
.copy-feedback { display: inline-block; margin-left: 0.75rem; font-size: 0.8rem; color: #27ae60; opacity: 0; transition: opacity 0.3s; }

/* ── 小组输入 ── */
.group-input {
  display: flex; align-items: center; gap: 1rem;
  background: #eaf2ff; border: 1.5px solid #b8d0ee;
  border-radius: 10px; padding: 0.9rem 1.2rem; margin-bottom: 1.5rem;
}
.group-input label { font-weight: 700; font-size: 0.9rem; color: #1a4f90; white-space: nowrap; }
.group-input input[type=text] {
  flex: 1; border: 1.5px solid #b8d0ee; border-radius: 6px;
  padding: 0.45rem 0.75rem; font-size: 0.9rem; outline: none; transition: border-color 0.15s;
}
.group-input input[type=text]:focus { border-color: #2c6bac; }

/* 响应式 */
@media (max-width: 640px) {
  .status-grid { grid-template-columns: 1fr 1fr; }
  .r1-import-grid { grid-template-columns: 1fr; }
}
</style>

<div class="sim-body">

<!-- 轮次导航 -->
<div class="round-nav">
  <div class="round-tab done" onclick="window.location='/class/localization-sim/'">第一轮 · 项目启动 ✓</div>
  <div class="round-tab active">第二轮 · 质量管控</div>
  <div class="round-tab locked">第三轮 · 资产管理</div>
  <div class="round-tab locked">第四轮 · 风险应对</div>
</div>

<!-- ── R1 数据导入 ── -->
<div class="r1-import">
  <div class="r1-import-title">
    📥 导入第一轮结果
    <span id="auto-badge" class="r1-auto-badge" style="display:none">已自动读取</span>
  </div>
  <div class="r1-import-grid">
    <div class="r1-field">
      <label>第一轮质量预估分（0–100）</label>
      <input type="number" id="r1-quality" min="40" max="98" value="75"
             oninput="onR1Change()">
    </div>
    <div class="r1-field">
      <label>第一轮预算使用率（%）</label>
      <input type="number" id="r1-budget-pct" min="10" max="100" value="65"
             oninput="onR1Change()">
    </div>
    <div class="r1-field">
      <label>第一轮对话文本 MT 比例（%）</label>
      <input type="number" id="r1-mt-ratio" min="0" max="100" value="40"
             oninput="onR1Change()">
    </div>
  </div>
  <div class="r1-hint">请对照第一轮决策摘要填写以上数字，系统将据此生成本轮初始状态。</div>
</div>

<!-- ── 第一轮后果展示 ── -->
<div id="consequence-card" class="consequence-card cq-yellow">
  <div class="cq-title" id="cq-title">⚠ 第一轮结算后——项目状态</div>
  <div class="cq-body" id="cq-body">请先填写第一轮数据，系统将自动生成后果描述。</div>
  <div class="cq-stats" id="cq-stats"></div>
</div>

<!-- 情景邮件 -->
<div class="email-card">
  <div class="email-meta">
    <span>发件人：</span>米兔互娱 玩家体验主管 李玲 &lt;li.ling@mitugames.com&gt;<br>
    <span>收件人：</span>星桥语言科技 项目团队<br>
    <span>主题：</span>【紧急】内测质量反馈——玩家体验团队报告"机翻感"问题，请说明
  </div>
  <div class="email-body">
    你好，我们内部测试团队本周对已交付的 60% 文本进行了玩家体验测试，收到多名测试员反馈"翻译读起来像机器翻的"，
    尤其集中在主线剧情对话部分。<br><br>
    我没法给你具体指出哪里有问题——但希望贵司能<strong>主动核查、量化问题、给出改进方案</strong>，
    并在下周的验收会前提交一份语言质量评估报告（LQA Report）。<br><br>
    另外，目前进度如何？距离最终交付还有多少余量？请一并说明。
  </div>
  <div class="email-task">🔎 本轮任务：配置质量调查方案和修复策略，生成决策摘要提交给教师。</div>
</div>

<!-- 小组信息 -->
<div class="group-input">
  <label>🏢 小组名称（LSP）</label>
  <input type="text" id="group-name" placeholder="例：TransPerfect组 / 文思海辉组"
         oninput="updateSummary()">
</div>

<!-- 项目状态栏（4 格，新增客户满意度）-->
<div class="status-grid">
  <div class="status-card">
    <div class="status-label">剩余预算</div>
    <div class="status-value" id="stat-budget">—</div>
    <div class="budget-bar-wrap"><div class="budget-bar" id="budget-bar" style="width:0%"></div></div>
    <div class="status-sub" id="stat-budget-sub">—</div>
  </div>
  <div class="status-card">
    <div class="status-label">质量分（修复后预估）</div>
    <div class="status-value" id="stat-quality">—</div>
    <div class="status-sub" id="stat-quality-sub">—</div>
  </div>
  <div class="status-card">
    <div class="status-label">进度影响</div>
    <div class="status-value" id="stat-schedule">—</div>
    <div class="status-sub" id="stat-schedule-sub">—</div>
  </div>
  <div class="status-card">
    <div class="status-label">客户满意度（新）</div>
    <div class="status-value" id="stat-satisfaction">—</div>
    <div class="status-sub" id="stat-satisfaction-sub">—</div>
  </div>
</div>

<!-- ── 决策区 1：LQA 调查 ── -->
<div class="d-card">
  <div class="d-card-title"><span class="icon">🔬</span> 语言质量调查（LQA）</div>

  <div class="param-row">
    <div class="param-label">
      <span class="param-name">LQA 抽样比例</span>
      <span class="param-val" id="lbl-lqa-sample">20%</span>
    </div>
    <input type="range" id="lqa-sample" min="10" max="100" step="5" value="20"
           oninput="updateVal('lqa-sample','lbl-lqa-sample','%'); recalc()">
    <div class="param-hint">
      抽样比例越高，发现的问题越完整，但 LQA 费用约为 ¥0.05/字。
      10% ≈ ¥715；50% ≈ ¥3,575；100% ≈ ¥7,150。建议：20–50%。
    </div>
  </div>

  <div class="param-row">
    <div class="param-label"><span class="param-name">抽样策略</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="sample-strategy" value="random" onchange="recalc()">
        <span class="radio-btn">随机抽样<br><small>成本低，覆盖均匀</small></span>
      </label>
      <label>
        <input type="radio" name="sample-strategy" value="stratified" checked onchange="recalc()">
        <span class="radio-btn">分层抽样<br><small>按文本类型分配（推荐）</small></span>
      </label>
      <label>
        <input type="radio" name="sample-strategy" value="high-risk" onchange="recalc()">
        <span class="radio-btn">高风险优先<br><small>集中查剧情对话</small></span>
      </label>
    </div>
    <div class="param-hint">
      分层抽样按剧情/UI/字幕分配样本，发现问题效率比纯随机高约 25%。
      高风险优先集中在最易出错区域，发现率最高，但可能漏掉其他区域的系统性问题。
    </div>
  </div>
</div>

<!-- ── 决策区 2：错误修复 ── -->
<div class="d-card">
  <div class="d-card-title"><span class="icon">🔧</span> 错误修复投入</div>

  <div class="param-row">
    <div class="param-label">
      <span class="param-name">投入修复工时</span>
      <span class="param-val" id="lbl-fix-hours">20 h</span>
    </div>
    <input type="range" id="fix-hours" min="0" max="80" step="5" value="20"
           oninput="updateVal('fix-hours','lbl-fix-hours',' h'); recalc()">
    <div class="param-hint">
      按 ¥150/小时计算（审校人员费率）。0 h = 不修复；20 h ≈ ¥3,000；80 h ≈ ¥12,000。
      修复工时同时消耗翻译团队在剩余文本上的进度资源。
    </div>
  </div>

  <div class="param-row">
    <div class="param-label"><span class="param-name">修复优先级策略</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="fix-priority" value="critical" checked onchange="recalc()">
        <span class="radio-btn">Critical 优先<br><small>先清零严重错误</small></span>
      </label>
      <label>
        <input type="radio" name="fix-priority" value="major" onchange="recalc()">
        <span class="radio-btn">Major 优先<br><small>优先改善明显错误</small></span>
      </label>
      <label>
        <input type="radio" name="fix-priority" value="full" onchange="recalc()">
        <span class="radio-btn">全面修复<br><small>三类错误均匀分配</small></span>
      </label>
    </div>
    <div class="param-hint">
      Critical 优先策略在同等工时下对质量分提升最大（严重错误权重高）。
      全面修复策略在后续客户测试中表现更均匀，但单次提分效率较低。
    </div>
  </div>
</div>

<!-- ── 决策区 3：剩余文本策略调整 ── -->
<div class="d-card">
  <div class="d-card-title"><span class="icon">⚙️</span> 剩余文本（约 40%）翻译策略调整</div>

  <div class="param-row">
    <div class="param-label"><span class="param-name">是否调整剩余文本的 MT 使用比例？</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="mt-adjust" value="no" checked onchange="toggleMTAdjust()">
        <span class="radio-btn">维持原策略<br><small>不增加额外成本</small></span>
      </label>
      <label>
        <input type="radio" name="mt-adjust" value="yes" onchange="toggleMTAdjust()">
        <span class="radio-btn">降低 MT 比例<br><small>提升剩余文本质量</small></span>
      </label>
    </div>
    <div class="param-hint">
      选择降低后可设置新的 MT 比例。降低 MT 比例将增加人工翻译量，产生额外成本，但有助于改善整体质量分。
    </div>
  </div>

  <div id="mt-adjust-block" class="conditional-block">
    <div class="param-row" style="margin-bottom:0">
      <div class="param-label">
        <span class="param-name">剩余文本新 MT 比例（对话）</span>
        <span class="param-val" id="lbl-new-mt">—</span>
      </div>
      <input type="range" id="new-mt" min="0" max="100" step="5" value="20"
             oninput="syncNewMtLabel(); recalc()">
      <div class="param-hint">
        额外成本 = (原比例 − 新比例) × 剩余字数 × ¥0.08/字。
        例：从 60% 降至 20%，额外成本约 ¥1,830（剩余 57,000 字）。
      </div>
    </div>
  </div>
</div>

<!-- ── 决策区 4：储备金动用 ── -->
<div class="d-card">
  <div class="d-card-title"><span class="icon">💰</span> 储备金动用</div>

  <div class="param-row">
    <div class="param-label"><span class="param-name">是否动用第一轮的风险储备金？</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="use-reserve" value="no" checked onchange="toggleReserve()">
        <span class="radio-btn">不动用<br><small>留作后备</small></span>
      </label>
      <label>
        <input type="radio" name="use-reserve" value="yes" onchange="toggleReserve()">
        <span class="radio-btn">动用部分储备金<br><small>补贴本轮修复成本</small></span>
      </label>
    </div>
    <div class="param-hint">
      储备金动用后无法恢复，第三、四轮遭遇危机时可用的缓冲将减少。
      <strong>可用储备金：</strong><span id="avail-reserve">计算中…</span>
    </div>
  </div>

  <div id="reserve-block" class="conditional-block">
    <div class="param-row" style="margin-bottom:0">
      <div class="param-label">
        <span class="param-name">本轮动用储备金金额</span>
        <span class="param-val" id="lbl-reserve-use">¥0</span>
      </div>
      <input type="range" id="reserve-use" min="0" max="20000" step="500" value="0"
             oninput="syncReserveLabel(); recalc()">
    </div>
  </div>
</div>

<!-- ── 决策区 5：客户沟通策略 ── -->
<div class="d-card">
  <div class="d-card-title"><span class="icon">💬</span> 质量问题沟通策略</div>

  <div class="param-row">
    <div class="param-label"><span class="param-name">如何向米兔互娱汇报本轮质量调查结果？</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="comm-strategy" value="active" checked onchange="recalc()">
        <span class="radio-btn">主动提出<br>改进方案<br><small>透明度高，展示专业度</small></span>
      </label>
      <label>
        <input type="radio" name="comm-strategy" value="honest" onchange="recalc()">
        <span class="radio-btn">如实汇报<br>问题数量<br><small>客观呈现，不加评价</small></span>
      </label>
      <label>
        <input type="radio" name="comm-strategy" value="silent" onchange="recalc()">
        <span class="radio-btn">仅汇报进度<br>不提质量<br><small>短期无压力，有隐患</small></span>
      </label>
    </div>
    <div class="param-hint">
      主动提方案将显著提升客户满意度（+20），但需要额外准备时间（占用约 4 小时工时）。
      隐瞒质量问题会在后续验收时触发更严重的客户反应，可能导致第三/四轮惩罚事件。
    </div>
  </div>
</div>

<!-- ── 实时预览 ── -->
<div class="preview-section">
  <div class="preview-title">📊 本轮决策预估结果</div>

  <!-- 质量变化 -->
  <div class="quality-change">
    <div class="qc-from">
      <div class="qc-label">修复前质量分</div>
      <div class="qc-val" id="qc-from" style="color:#e74c3c">—</div>
    </div>
    <div class="qc-arrow">→</div>
    <div class="qc-to">
      <div class="qc-label">修复后质量分</div>
      <div class="qc-val" id="qc-to" style="color:#27ae60">—</div>
    </div>
    <div class="qc-arrow"></div>
    <div class="qc-delta">
      <div class="qc-label">提升</div>
      <div class="qc-val" id="qc-delta" style="color:#2c6bac">—</div>
    </div>
  </div>

  <!-- 成本明细 -->
  <div class="cost-breakdown" style="margin-top:1rem">
    <div class="cost-row"><span>LQA 调查成本</span><span id="pc-lqa">—</span></div>
    <div class="cost-row"><span>错误修复工时成本</span><span id="pc-fix">—</span></div>
    <div class="cost-row"><span>MT 策略调整成本</span><span id="pc-mt-adj">—</span></div>
    <div class="cost-row"><span>本轮追加沟通成本</span><span id="pc-comm">—</span></div>
    <div class="cost-row"><span>储备金抵扣</span><span id="pc-reserve" style="color:#27ae60">—</span></div>
  </div>
  <div class="cost-total">
    <span>本轮净追加支出</span>
    <span id="pc-total">—</span>
  </div>
  <div id="cost-warn" class="cost-warn"></div>

  <!-- 三色风险仪表 -->
  <div style="margin-top:1.1rem; font-size:0.82rem; font-weight:700; color:#444; margin-bottom:0.5rem;">综合风险评估</div>
  <div class="risk-meter">
    <div id="risk-quality" class="risk-item risk-yellow">
      <div class="risk-label">质量风险</div>
      <div class="risk-desc" id="risk-quality-desc">—</div>
    </div>
    <div id="risk-budget" class="risk-item risk-yellow">
      <div class="risk-label">预算风险</div>
      <div class="risk-desc" id="risk-budget-desc">—</div>
    </div>
    <div id="risk-client" class="risk-item risk-yellow">
      <div class="risk-label">客户关系风险</div>
      <div class="risk-desc" id="risk-client-desc">—</div>
    </div>
  </div>
</div>

<!-- ── 摘要导出 ── -->
<div class="summary-section">
  <h3>📋 决策摘要（提交给教师）</h3>
  <div class="summary-box" id="summary-box">请先填写小组名称并调整参数，摘要将自动生成。</div>
  <div>
    <button class="btn-primary" onclick="generateSummary()">生成摘要</button>
    <button class="btn-primary btn-copy" onclick="copySummary()">复制摘要</button>
    <span class="copy-feedback" id="copy-feedback">✓ 已复制</span>
  </div>
</div>

</div><!-- /sim-body -->

<script>
// ──────────────────────────────────────────────
// 常量
// ──────────────────────────────────────────────
const TOTAL_BUDGET   = 150000;
const TOTAL_WORDS    = 143000;
const DIALOGUE_WORDS = 120000;
const UI_WORDS       = 23000;
const REMAINING_PCT  = 0.40;   // 剩余未翻译文本比例

// LQA 费率：¥0.05/字
const LQA_COST_PER_WORD = 0.05;
// 修复费率：¥150/小时
const FIX_COST_PER_HOUR = 150;
// MT 策略调整：减少 MT 后，额外人工翻译成本 ¥0.08/字
const MT_EXTRA_COST_PER_WORD = 0.08;
// 沟通成本（主动提方案多准备 4 小时，折算 ¥600）
const COMM_ACTIVE_COST = 600;

// 抽样策略系数（发现问题的相对效率）
const STRATEGY_FACTOR = { random: 1.0, stratified: 1.25, 'high-risk': 1.55 };

// 修复优先级系数（每小时修复问题的相对效率）
const PRIORITY_FACTOR = { critical: 1.5, major: 1.2, full: 1.0 };

// ──────────────────────────────────────────────
// 状态：第一轮数据
// ──────────────────────────────────────────────
function getR1() {
  const q   = parseInt(document.getElementById('r1-quality').value)    || 75;
  const bp  = parseInt(document.getElementById('r1-budget-pct').value) || 65;
  const mt  = parseInt(document.getElementById('r1-mt-ratio').value)   || 40;
  return { quality: q, budgetPct: bp, mtRatio: mt };
}

// ──────────────────────────────────────────────
// 第一轮后果计算
// ──────────────────────────────────────────────
function computeIssues(q) {
  // Critical: 低质量时指数级增加
  const critical = Math.round(Math.max(0, (100 - q) ** 2 / 500));
  const major    = Math.round(Math.max(0, (100 - q) * 2.0));
  const minor    = Math.round(Math.max(0, (100 - q) * 5.0));
  return { critical, major, minor, total: critical + major + minor };
}

function updateConsequences() {
  const r1 = getR1();
  const q  = r1.quality;
  const issues = computeIssues(q);
  const card   = document.getElementById('consequence-card');
  const title  = document.getElementById('cq-title');
  const body   = document.getElementById('cq-body');
  const stats  = document.getElementById('cq-stats');

  let level, titleText, bodyText;

  if (q >= 85) {
    level     = 'cq-green';
    titleText = '✅ 第一轮结算后——内测反馈整体良好';
    bodyText  = '内部测试团队反馈翻译质量尚可，仅发现少量措辞和风格问题。客户邮件措辞较温和，对贵司仍有信心。'
              + '本轮的主要任务是完成标准 LQA 核查，给客户提交一份专业报告，进一步巩固信任。';
  } else if (q >= 72) {
    level     = 'cq-yellow';
    titleText = '⚠ 第一轮结算后——质量问题引起客户关注';
    bodyText  = '内测发现若干翻译问题，客户已通过邮件正式提出质量关切。"机翻感"集中在对话文本，'
              + '玩家体验主管要求在下周验收会前提交 LQA 报告。贵司需要主动调查并拿出解决方案。';
  } else if (q >= 58) {
    level     = 'cq-red';
    titleText = '🔴 第一轮结算后——质量问题严重，客户要求暂停验收';
    bodyText  = '内测结果显示大量翻译错误，尤其是剧情对话中的文化误译和术语不一致。客户态度强硬，'
              + '已要求暂停当前版本的验收流程，书面要求贵司提交质量整改方案和时间表。本轮压力极大。';
  } else {
    level     = 'cq-red';
    titleText = '🚨 第一轮结算后——客户发出警告函，项目面临终止风险';
    bodyText  = '质量问题触发了客户的合同违约条款，法务团队介入。游戏内容大规模返工，客户已询问是否更换翻译供应商。'
              + '本轮的核心任务不只是修复质量，更是挽救客户关系。';
  }

  card.className = 'consequence-card ' + level;
  title.textContent = titleText;
  body.textContent  = bodyText;
  stats.innerHTML = `
    <span class="cq-stat">🔴 Critical 错误：约 ${issues.critical} 处</span>
    <span class="cq-stat">🟡 Major 错误：约 ${issues.major} 处</span>
    <span class="cq-stat">⚪ Minor 错误：约 ${issues.minor} 处</span>
    <span class="cq-stat">💰 剩余预算：¥${Math.round(TOTAL_BUDGET * (1 - r1.budgetPct / 100)).toLocaleString('zh-CN')}</span>
  `;

  // 更新储备金可用量显示
  const reserveAmt = Math.round(TOTAL_BUDGET * (r1.budgetPct / 100) * 0.1);
  document.getElementById('avail-reserve').textContent =
    '约 ¥' + reserveAmt.toLocaleString('zh-CN') + '（基于第一轮预算的 10% 估算）';

  // 更新储备金滑块上限
  const rSlider = document.getElementById('reserve-use');
  if (rSlider) {
    rSlider.max = reserveAmt;
    if (parseInt(rSlider.value) > reserveAmt) rSlider.value = reserveAmt;
    syncReserveLabel();
  }

  recalc();
}

function onR1Change() {
  updateConsequences();
}

// ──────────────────────────────────────────────
// 条件显示切换
// ──────────────────────────────────────────────
function toggleMTAdjust() {
  const show = document.querySelector('input[name="mt-adjust"]:checked').value === 'yes';
  document.getElementById('mt-adjust-block').classList.toggle('visible', show);
  syncNewMtLabel();
  recalc();
}

function toggleReserve() {
  const show = document.querySelector('input[name="use-reserve"]:checked').value === 'yes';
  document.getElementById('reserve-block').classList.toggle('visible', show);
  recalc();
}

function syncNewMtLabel() {
  const r1mt = parseInt(document.getElementById('r1-mt-ratio').value) || 40;
  const newMt = parseInt(document.getElementById('new-mt').value);
  const lbl = document.getElementById('lbl-new-mt');
  if (newMt >= r1mt) {
    lbl.textContent = newMt + '% （≥ 原比例，无效果）';
    lbl.style.color = '#e74c3c';
  } else {
    lbl.textContent = newMt + '%';
    lbl.style.color = '#2c6bac';
  }
}

function syncReserveLabel() {
  const v = parseInt(document.getElementById('reserve-use').value);
  document.getElementById('lbl-reserve-use').textContent = '¥' + v.toLocaleString('zh-CN');
}

// ──────────────────────────────────────────────
// 滑块值同步
// ──────────────────────────────────────────────
function updateVal(id, lblId, suffix) {
  document.getElementById(lblId).textContent = document.getElementById(id).value + suffix;
}

// ──────────────────────────────────────────────
// 核心计算
// ──────────────────────────────────────────────
function getParams() {
  const r1       = getR1();
  const lqaSample  = parseInt(document.getElementById('lqa-sample').value);
  const strategy   = (document.querySelector('input[name="sample-strategy"]:checked') || { value: 'stratified' }).value;
  const fixHours   = parseInt(document.getElementById('fix-hours').value);
  const fixPriority= (document.querySelector('input[name="fix-priority"]:checked') || { value: 'critical' }).value;
  const mtAdjust   = (document.querySelector('input[name="mt-adjust"]:checked') || { value: 'no' }).value === 'yes';
  const newMt      = mtAdjust ? parseInt(document.getElementById('new-mt').value) : r1.mtRatio;
  const useReserve = (document.querySelector('input[name="use-reserve"]:checked') || { value: 'no' }).value === 'yes';
  const reserveUse = useReserve ? parseInt(document.getElementById('reserve-use').value) : 0;
  const commStrategy = (document.querySelector('input[name="comm-strategy"]:checked') || { value: 'active' }).value;
  return { r1, lqaSample, strategy, fixHours, fixPriority, mtAdjust, newMt, useReserve, reserveUse, commStrategy };
}

function calc(p) {
  const r1 = p.r1;
  const issues = computeIssues(r1.quality);
  const remainingBudget = Math.round(TOTAL_BUDGET * (1 - r1.budgetPct / 100));

  // ── LQA 成本 ──
  const lqaCost = Math.round(TOTAL_WORDS * p.lqaSample / 100 * LQA_COST_PER_WORD);

  // ── 修复成本 ──
  const fixCost = Math.round(p.fixHours * FIX_COST_PER_HOUR);

  // ── MT 调整成本 ──
  let mtAdjCost = 0;
  if (p.mtAdjust && p.newMt < r1.mtRatio) {
    const mtReduction = (r1.mtRatio - p.newMt) / 100;
    const remainingDialogue = DIALOGUE_WORDS * REMAINING_PCT;
    mtAdjCost = Math.round(mtReduction * remainingDialogue * MT_EXTRA_COST_PER_WORD);
  }

  // ── 沟通成本 ──
  const commCost = p.commStrategy === 'active' ? COMM_ACTIVE_COST : 0;

  // ── 储备金抵扣 ──
  const reserveDeduct = p.reserveUse;

  // ── 净追加支出 ──
  const grossCost = lqaCost + fixCost + mtAdjCost + commCost;
  const netCost   = Math.max(0, grossCost - reserveDeduct);
  const newRemaining = remainingBudget - netCost;
  const budgetPct = Math.round((TOTAL_BUDGET - newRemaining) / TOTAL_BUDGET * 100);

  // ── 质量改善 ──
  // 发现问题数
  const discovered = Math.round(issues.total * p.lqaSample / 100 * STRATEGY_FACTOR[p.strategy]);
  // 可修复数量（工时限制）
  const fixCapacity  = Math.round(p.fixHours * 2 * PRIORITY_FACTOR[p.fixPriority]);
  const fixed        = Math.min(discovered, fixCapacity);
  // Critical 优先策略对质量分影响更大（critical 问题权重 3x）
  const priorityImpactBonus = p.fixPriority === 'critical' ? 1.5 : p.fixPriority === 'major' ? 1.1 : 1.0;
  // 质量提升
  const maxGain = 100 - r1.quality;
  const improvement = Math.round(
    Math.min(maxGain * 0.85,
      (fixed / Math.max(1, issues.total)) * maxGain * 0.9 * priorityImpactBonus
    )
  );
  // MT 调整对剩余文本质量的影响
  let mtQualityBonus = 0;
  if (p.mtAdjust && p.newMt < r1.mtRatio) {
    mtQualityBonus = Math.round((r1.mtRatio - p.newMt) * REMAINING_PCT * 0.08);
  }
  const newQuality = Math.min(98, r1.quality + improvement + mtQualityBonus);

  // ── 进度影响 ──
  // 修复和 LQA 工时占用翻译资源
  const weeklyCapacityLost = (p.fixHours + p.lqaSample / 100 * 20) / 40; // 周损耗比例
  const scheduleSlipDays = Math.round(weeklyCapacityLost * 5); // 约折算天数

  // ── 客户满意度 ──
  const commBonus = p.commStrategy === 'active' ? 20 : p.commStrategy === 'honest' ? 5 : -15;
  const qualityBonus = (newQuality - 70) * 0.5;
  const silentRisk = (p.commStrategy === 'silent' && newQuality < 75) ? -10 : 0;
  const satisfaction = Math.min(100, Math.max(0,
    Math.round(55 + qualityBonus + commBonus + silentRisk)
  ));

  // ── 风险等级 ──
  const qualityRisk = newQuality >= 80 ? 'green' : newQuality >= 65 ? 'yellow' : 'red';
  const budgetRisk  = newRemaining >= 30000 ? 'green' : newRemaining >= 10000 ? 'yellow' : 'red';
  const clientRisk  = satisfaction >= 70 ? 'green' : satisfaction >= 50 ? 'yellow' : 'red';

  return {
    lqaCost, fixCost, mtAdjCost, commCost, reserveDeduct,
    grossCost, netCost, newRemaining, budgetPct,
    improvement, mtQualityBonus, newQuality,
    scheduleSlipDays, satisfaction,
    qualityRisk, budgetRisk, clientRisk,
    discovered, fixed,
  };
}

// ──────────────────────────────────────────────
// UI 刷新
// ──────────────────────────────────────────────
function fmt(n) { return '¥' + n.toLocaleString('zh-CN'); }
function setRisk(id, level, desc) {
  const el = document.getElementById(id);
  el.className = 'risk-item ' + (level === 'green' ? 'risk-green' : level === 'yellow' ? 'risk-yellow' : 'risk-red');
  document.getElementById(id + '-desc').textContent = desc;
}

function recalc() {
  const p = getParams();
  const r = calc(p);

  // 状态栏
  document.getElementById('stat-budget').textContent = fmt(r.newRemaining);
  document.getElementById('stat-budget').style.color =
    r.budgetRisk === 'red' ? '#c0392b' : r.budgetRisk === 'yellow' ? '#e67e22' : '#27ae60';
  document.getElementById('stat-budget-sub').textContent = '已用 ' + r.budgetPct + '%';

  const bar = document.getElementById('budget-bar');
  bar.style.width = Math.min(100, r.budgetPct) + '%';
  bar.style.background = r.budgetRisk === 'red' ? '#e74c3c' : r.budgetRisk === 'yellow' ? '#f39c12' : '#2c6bac';

  const qEl = document.getElementById('stat-quality');
  qEl.textContent = r.newQuality + ' 分';
  qEl.style.color = r.qualityRisk === 'red' ? '#c0392b' : r.qualityRisk === 'yellow' ? '#e67e22' : '#27ae60';
  document.getElementById('stat-quality-sub').textContent =
    r.newQuality >= 80 ? '符合交付标准' : r.newQuality >= 65 ? '接近及格线' : '仍低于标准';

  const sEl = document.getElementById('stat-schedule');
  sEl.textContent = r.scheduleSlipDays > 0 ? '−' + r.scheduleSlipDays + ' 天' : '无影响';
  sEl.style.color = r.scheduleSlipDays > 7 ? '#c0392b' : r.scheduleSlipDays > 3 ? '#e67e22' : '#27ae60';
  document.getElementById('stat-schedule-sub').textContent =
    r.scheduleSlipDays > 0 ? '修复占用进度资源' : '未影响交付计划';

  const satEl = document.getElementById('stat-satisfaction');
  satEl.textContent = r.satisfaction + ' 分';
  satEl.style.color = r.clientRisk === 'red' ? '#c0392b' : r.clientRisk === 'yellow' ? '#e67e22' : '#27ae60';
  document.getElementById('stat-satisfaction-sub').textContent =
    r.satisfaction >= 70 ? '客户关系良好' : r.satisfaction >= 50 ? '客户存在疑虑' : '客户信心不足';

  // 质量变化
  document.getElementById('qc-from').textContent = p.r1.quality + ' 分';
  document.getElementById('qc-to').textContent   = r.newQuality + ' 分';
  const delta = r.newQuality - p.r1.quality;
  document.getElementById('qc-delta').textContent = (delta >= 0 ? '+' : '') + delta + ' 分';
  document.getElementById('qc-delta').style.color = delta >= 5 ? '#27ae60' : delta > 0 ? '#e67e22' : '#e74c3c';

  // 成本明细
  document.getElementById('pc-lqa').textContent    = fmt(r.lqaCost);
  document.getElementById('pc-fix').textContent    = fmt(r.fixCost);
  document.getElementById('pc-mt-adj').textContent = r.mtAdjCost > 0 ? fmt(r.mtAdjCost) : '¥0（未调整）';
  document.getElementById('pc-comm').textContent   = r.commCost > 0 ? fmt(r.commCost) : '¥0';
  document.getElementById('pc-reserve').textContent = r.reserveDeduct > 0 ? '− ' + fmt(r.reserveDeduct) : '¥0（未动用）';
  document.getElementById('pc-total').textContent  = fmt(r.netCost);

  const warn = document.getElementById('cost-warn');
  warn.textContent = r.newRemaining < 0
    ? `⚠ 预算已超支 ${fmt(Math.abs(r.newRemaining))}，需要谈判追加或削减范围。`
    : r.newRemaining < 15000
    ? `⚠ 剩余预算仅 ${fmt(r.newRemaining)}，第三、四轮应对危机空间极小。`
    : '';

  // 风险仪表
  setRisk('risk-quality', r.qualityRisk,
    '修复后预估 ' + r.newQuality + ' 分，发现 ' + r.discovered + ' 问题，修复 ' + r.fixed);
  setRisk('risk-budget', r.budgetRisk,
    '剩余 ' + fmt(r.newRemaining) + '，已用 ' + r.budgetPct + '%');
  setRisk('risk-client', r.clientRisk,
    '满意度 ' + r.satisfaction + ' 分，' +
    (p.commStrategy === 'silent' ? '⚠ 隐瞒风险存在' : '沟通策略适当'));

  updateSummary();
}

// ──────────────────────────────────────────────
// 摘要生成
// ──────────────────────────────────────────────
function generateSummary() { updateSummary(); }

function updateSummary() {
  const p = getParams();
  const r = calc(p);
  const group = document.getElementById('group-name').value.trim() || '（未填写小组名）';
  const strategyLabel = { random: '随机抽样', stratified: '分层抽样', 'high-risk': '高风险优先' };
  const priorityLabel = { critical: 'Critical 优先', major: 'Major 优先', full: '全面修复' };
  const commLabel     = { active: '主动提出改进方案', honest: '如实汇报问题', silent: '仅汇报进度' };
  const riskEmoji     = { green: '🟢', yellow: '🟡', red: '🔴' };
  const now = new Date().toLocaleString('zh-CN', { hour12: false });
  const delta = r.newQuality - p.r1.quality;

  const text = [
    '═══════════════════════════════════════',
    '  翻译项目沙盘 · 第二轮决策摘要',
    '═══════════════════════════════════════',
    `  小组名称：${group}`,
    `  提交时间：${now}`,
    '───────────────────────────────────────',
    '  【第一轮承接数据】',
    `  · 第一轮质量分：${p.r1.quality} 分`,
    `  · 第一轮预算使用率：${p.r1.budgetPct}%`,
    `  · 第一轮对话 MT 比例：${p.r1.mtRatio}%`,
    '',
    '  【LQA 调查决策】',
    `  · 抽样比例：${p.lqaSample}%（约 ${Math.round(TOTAL_WORDS * p.lqaSample / 100).toLocaleString()} 字）`,
    `  · 抽样策略：${strategyLabel[p.strategy]}`,
    '',
    '  【错误修复决策】',
    `  · 修复工时：${p.fixHours} 小时`,
    `  · 修复优先级：${priorityLabel[p.fixPriority]}`,
    '',
    '  【剩余文本策略】',
    `  · MT 比例调整：${p.mtAdjust ? '是，新比例 ' + p.newMt + '%' : '否，维持原策略'}`,
    '',
    '  【资源调配】',
    `  · 储备金动用：${p.reserveUse > 0 ? fmt(p.reserveUse) : '不动用'}`,
    '',
    '  【客户沟通策略】',
    `  · ${commLabel[p.commStrategy]}`,
    '───────────────────────────────────────',
    '  【系统估算结果】',
    `  · 本轮净追加支出：${fmt(r.netCost)}`,
    `  · 剩余预算：${fmt(r.newRemaining)}（已用 ${r.budgetPct}%）`,
    `  · 质量分变化：${p.r1.quality} → ${r.newQuality}（${delta >= 0 ? '+' : ''}${delta} 分）`,
    `  · 质量风险：${riskEmoji[r.qualityRisk]}`,
    `  · 预算风险：${riskEmoji[r.budgetRisk]}`,
    `  · 客户满意度：${r.satisfaction} 分 ${riskEmoji[r.clientRisk]}`,
    `  · 进度影响：${r.scheduleSlipDays > 0 ? '延误约 ' + r.scheduleSlipDays + ' 天' : '无延误'}`,
    '═══════════════════════════════════════',
  ].join('\n');

  document.getElementById('summary-box').textContent = text;

  // 保存至 localStorage，供第三轮读取
  try {
    localStorage.setItem('sim_r2', JSON.stringify({
      quality: r.newQuality,
      budgetPct: r.budgetPct,
      remainingBudget: r.newRemaining,
      satisfaction: r.satisfaction,
      reserveUsed: p.reserveUse,
    }));
  } catch(e) {}
}

function copySummary() {
  const text = document.getElementById('summary-box').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const fb = document.getElementById('copy-feedback');
    fb.style.opacity = '1';
    setTimeout(() => { fb.style.opacity = '0'; }, 2000);
  });
}

// ──────────────────────────────────────────────
// 尝试从 localStorage 读取第一轮数据
// ──────────────────────────────────────────────
function tryLoadR1FromStorage() {
  try {
    const saved = localStorage.getItem('sim_r1');
    if (!saved) return;
    const d = JSON.parse(saved);
    if (d.quality)           document.getElementById('r1-quality').value    = d.quality;
    if (d.budgetPct)         document.getElementById('r1-budget-pct').value = d.budgetPct;
    if (d.mtD !== undefined) document.getElementById('r1-mt-ratio').value   = d.mtD;
    if (d.group)             document.getElementById('group-name').value     = d.group;
    document.getElementById('auto-badge').style.display = 'inline-block';
  } catch(e) {}
}

// ──────────────────────────────────────────────
// 初始化
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // ── 密码门控 ──
  const unlocked = sessionStorage.getItem('r2_unlocked');
  if (!unlocked) {
    document.querySelector('.sim-body').style.display = 'none';
    const code = prompt('📋 请输入教师提供的第二轮口令：');
    if (code === 'ROUND2') {
      sessionStorage.setItem('r2_unlocked', '1');
      document.querySelector('.sim-body').style.display = 'block';
    } else {
      document.body.innerHTML =
        '<p style="padding:3rem 2rem;color:#c0392b;font-size:1.1rem;font-family:sans-serif">' +
        '⛔ 口令不正确，请等待教师公布第二轮口令。</p>';
      return;
    }
  }
  // ── 原有逻辑 ──
  tryLoadR1FromStorage();
  updateConsequences();   // 渲染后果卡 + 初始化计算
});
</script>
