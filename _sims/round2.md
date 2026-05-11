---
layout: default
title: 本地化项目管理第二轮：质量管控
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

/* ── 密码门 ── */
.gate-overlay {
  position: fixed; inset: 0; background: rgba(20,30,50,0.88);
  display: flex; align-items: center; justify-content: center; z-index: 9999;
}
.gate-box {
  background: white; border-radius: 16px; padding: 2.5rem 2.5rem 2rem;
  text-align: center; max-width: 360px; width: 90%;
}
.gate-box h2 { font-size: 1.2rem; color: #1a2f50; margin-bottom: 0.5rem; }
.gate-box p  { font-size: 0.85rem; color: #888; margin-bottom: 1.2rem; line-height: 1.6; }
.gate-input {
  width: 100%; padding: 0.65rem 1rem; font-size: 1rem;
  border: 2px solid #dde4f0; border-radius: 8px; text-align: center;
  letter-spacing: 0.2em; outline: none; box-sizing: border-box;
  transition: border-color 0.15s;
}
.gate-input:focus { border-color: #2c6bac; }
.gate-btn {
  margin-top: 0.85rem; width: 100%; padding: 0.7rem;
  background: #2c6bac; color: white; border: none; border-radius: 8px;
  font-size: 0.95rem; font-weight: 600; cursor: pointer;
}
.gate-btn:hover { background: #1a5496; }
.gate-error { color: #c0392b; font-size: 0.82rem; margin-top: 0.5rem; min-height: 1.2em; }

/* ── 轮次导航 ── */
.round-nav { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.round-tab {
  padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.82rem; font-weight: 600;
  border: 2px solid #dce3ed; color: #aaa; background: #f5f7fa; cursor: default;
}
.round-tab.done   { background: #eafaf1; border-color: #27ae60; color: #1e7e50; }
.round-tab.active { background: #2c6bac; color: white; border-color: #2c6bac; }
.round-tab.locked { opacity: 0.45; }

/* ── R1 参数继承面板 ── */
.r1-panel {
  background: #f4f7fb; border: 1.5px solid #c8d8ee;
  border-radius: 12px; padding: 1.2rem 1.5rem; margin-bottom: 1.5rem;
}
.r1-panel-title {
  font-size: 0.85rem; font-weight: 700; color: #1a4f90; margin-bottom: 0.9rem;
  display: flex; align-items: center; gap: 0.5rem;
}
.r1-auto-badge {
  display: inline-block; background: #27ae60; color: white;
  font-size: 0.68rem; padding: 0.1rem 0.5rem; border-radius: 10px; font-weight: 600;
}
.r1-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;
}
.r1-field label {
  display: block; font-size: 0.72rem; font-weight: 600; color: #777;
  margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.4px;
}
.r1-field select {
  width: 100%; padding: 0.45rem 0.7rem;
  border: 1.5px solid #c8d8ee; border-radius: 6px; font-size: 0.85rem;
  background: white; outline: none; color: #1a2f50;
}
.r1-hint {
  margin-top: 0.7rem; font-size: 0.75rem; color: #888; line-height: 1.5;
}

/* ── 后果卡片 ── */
.consequence-card {
  border-radius: 12px; padding: 1.3rem 1.5rem; margin-bottom: 1.5rem;
  border: 2px solid;
}
.cq-red    { background: #fef2f2; border-color: #e74c3c; }
.cq-yellow { background: #fffbf0; border-color: #f0a500; }
.cq-green  { background: #eafaf1; border-color: #27ae60; }
.cq-title  { font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; }
.cq-body   { font-size: 0.87rem; color: #444; line-height: 1.65; margin-bottom: 0.85rem; }
.cq-metrics { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
.cq-metric {
  flex: 1; min-width: 5rem; text-align: center;
  background: rgba(255,255,255,0.7); border-radius: 8px;
  padding: 0.5rem 0.4rem; font-size: 0.78rem;
}
.cq-metric-val { font-size: 1.4rem; font-weight: 700; line-height: 1; }
.cq-metric-lbl { font-size: 0.68rem; color: #777; margin-top: 0.2rem; }
.cq-lqs {
  font-size: 0.82rem; padding: 0.45rem 0.75rem;
  border-radius: 6px; background: rgba(255,255,255,0.6);
}

/* ── 情景邮件卡片 ── */
.email-card {
  background: #fffcf0; border: 1px solid #e8d47a;
  border-left: 5px solid #f0a500;
  border-radius: 0 10px 10px 0;
  padding: 1.25rem 1.5rem; margin-bottom: 1.75rem;
}
.email-meta { font-size: 0.8rem; color: #888; margin-bottom: 0.6rem; line-height: 1.7; }
.email-meta span { font-weight: 600; color: #555; }
.email-body { font-size: 0.9rem; line-height: 1.75; color: #333; }
.email-task {
  margin-top: 0.75rem; padding: 0.6rem 0.9rem;
  background: #fff8e1; border-radius: 6px;
  font-weight: 600; font-size: 0.9rem; color: #8a6000;
}

/* ── 项目状态栏 ── */
.status-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 0.7rem; margin-bottom: 1.75rem;
}
.status-card {
  background: white; border: 1.5px solid #e0e6f0;
  border-radius: 10px; padding: 0.85rem 0.9rem; text-align: center;
}
.status-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.5px; color: #999; margin-bottom: 0.3rem; }
.status-value { font-size: 1.2rem; font-weight: 700; line-height: 1.2; }
.status-sub   { font-size: 0.7rem; color: #aaa; margin-top: 0.2rem; }

/* ── 决策分区卡片 ── */
.d-card {
  background: white; border: 1.5px solid #e0e6f0;
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-bottom: 1.1rem;
}
.d-card-title {
  font-size: 0.95rem; font-weight: 700; color: #1a2f50;
  margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
}

/* ── 单选按钮组 ── */
.radio-group { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.radio-group label { flex: 1; min-width: 8.5rem; }
.radio-group input[type=radio] { display: none; }
.radio-group .radio-btn {
  display: block; text-align: center; padding: 0.65rem 0.5rem;
  border: 2px solid #dde4f0; border-radius: 8px; cursor: pointer;
  font-size: 0.83rem; color: #666; transition: all 0.15s; line-height: 1.35;
}
.radio-group input[type=radio]:checked + .radio-btn {
  border-color: #2c6bac; background: #eaf2ff; color: #1a4f90; font-weight: 600;
}
.radio-group .radio-btn.danger-opt { border-color: #f5c8c8; }
.radio-group input[type=radio]:checked + .radio-btn.danger-opt {
  border-color: #e74c3c; background: #fef0f0; color: #c0392b;
}
.param-hint { font-size: 0.75rem; color: #888; margin-top: 0.4rem; line-height: 1.5; }
.param-row  { margin-bottom: 1.3rem; }
.param-row:last-child { margin-bottom: 0; }
.param-label { font-size: 0.88rem; font-weight: 600; color: #444; margin-bottom: 0.4rem; }

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
.range-label {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 0.88rem; color: #444; margin-bottom: 0.4rem;
}
.range-val { font-size: 1rem; font-weight: 700; color: #2c6bac; }

/* ── 协商结果面板 ── */
.negotiation-panel {
  background: #f8f5ff; border: 1.5px solid #c8aaf0;
  border-radius: 10px; padding: 0.9rem 1.1rem; margin-top: 0.6rem;
  font-size: 0.82rem; line-height: 1.6; display: none;
}
.negotiation-panel.visible { display: block; }
.neg-strong { color: #6a0dad; font-weight: 700; }
.neg-weak   { color: #c0392b; font-weight: 700; }

/* ── 实时预览 ── */
.preview-section {
  background: #f0f4fb; border: 1.5px solid #c8d8ee;
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-bottom: 1.1rem;
}
.preview-title {
  font-size: 0.95rem; font-weight: 700; color: #1a2f50;
  margin-bottom: 1rem;
}
.delta-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
.delta-item {
  background: white; border-radius: 8px; padding: 0.75rem 0.9rem;
  border: 1px solid #dde4f0;
}
.delta-label { font-size: 0.72rem; color: #888; margin-bottom: 0.25rem; }
.delta-val { font-size: 1.1rem; font-weight: 700; }
.delta-sub  { font-size: 0.72rem; color: #aaa; margin-top: 0.1rem; }
.impact-positive { color: #27ae60; }
.impact-negative { color: #e74c3c; }
.impact-neutral  { color: #888; }

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
  min-height: 12rem; color: #2c3e50;
}
.btn-primary {
  display: inline-block; margin-top: 0.85rem; padding: 0.7rem 1.8rem;
  background: #2c6bac; color: white; border: none; border-radius: 8px;
  font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.15s;
}
.btn-primary:hover { background: #1a5496; }
.btn-copy { margin-left: 0.6rem; background: #27ae60; }
.btn-copy:hover { background: #1e8449; }
.btn-next { background: #8e44ad; margin-left: 0.6rem; }
.btn-next:hover { background: #7d3c98; }
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
  padding: 0.45rem 0.75rem; font-size: 0.9rem; outline: none;
}
.group-input input[type=text]:focus { border-color: #2c6bac; }

/* ── 联动标签 ── */
.consequence-tag {
  display: inline-block; font-size: 0.7rem; font-weight: 700;
  padding: 0.15rem 0.55rem; border-radius: 4px;
}
.tag-r3 { background: #e8f8f0; color: #1e7e50; border: 1px solid #a8dfc0; }

@media (max-width: 640px) {
  .status-grid { grid-template-columns: 1fr 1fr; }
  .r1-grid     { grid-template-columns: 1fr; }
  .delta-grid  { grid-template-columns: 1fr; }
}
</style>

<!-- ── 密码门 ── -->
<div id="gate-overlay" class="gate-overlay">
  <div class="gate-box">
    <h2>🔒 第二轮已锁定</h2>
    <p>请等待教师宣布第一轮结束后<br>输入解锁密码进入第二轮。</p>
    <input class="gate-input" id="gate-input" type="text" placeholder="输入密码"
           onkeydown="if(event.key==='Enter') checkGate()">
    <button class="gate-btn" onclick="checkGate()">确认解锁</button>
    <div class="gate-error" id="gate-error"></div>
  </div>
</div>

<div class="sim-body" id="main-body" style="display:none">

<!-- 轮次导航 -->
<div class="round-nav">
  <div class="round-tab done">第一轮 · 项目启动 ✓</div>
  <div class="round-tab active">第二轮 · 质量管控</div>
  <div class="round-tab locked">第三轮 · 资产管理</div>
  <div class="round-tab locked">第四轮 · 风险应对</div>
</div>

<!-- R1 参数继承面板 -->
<div class="r1-panel">
  <div class="r1-panel-title">
    📥 继承自第一轮的决策参数
    <span class="r1-auto-badge" id="auto-badge" style="display:none">已自动读取</span>
  </div>
  <div class="r1-grid">
    <div class="r1-field">
      <label>对话 MT 比例（等级）</label>
      <select id="r1-mt-level" onchange="onR1Change()">
        <option value="low">低（＜30%）</option>
        <option value="medium" selected>中（30–59%）</option>
        <option value="high">高（≥60%）</option>
      </select>
    </div>
    <div class="r1-field">
      <label>是否预设 LQS</label>
      <select id="r1-has-lqs" onchange="onR1Change()">
        <option value="yes" selected>是（有 LQS 条款）</option>
        <option value="no">否（无 LQS）</option>
      </select>
    </div>
    <div class="r1-field">
      <label>术语库状态</label>
      <select id="r1-glossary" onchange="onR1Change()">
        <option value="early" selected>第1周建立（规范型）</option>
        <option value="during">翻译中积累（混合型）</option>
        <option value="none">未建立（混乱型）</option>
      </select>
    </div>
    <div class="r1-field">
      <label>风险预案质量</label>
      <select id="r1-risk-plan" onchange="onR1Change()">
        <option value="detailed">详细预案</option>
        <option value="standard" selected>标准预案</option>
        <option value="brief">简略预案</option>
      </select>
    </div>
  </div>
  <div class="r1-hint">请对照第一轮决策摘要核对以上参数。若已自动读取，请确认与小组实际决策一致。</div>
</div>

<!-- 差异化后果卡 -->
<div class="consequence-card cq-yellow" id="consequence-card">
  <div class="cq-title" id="cq-title">正在加载后果……</div>
  <div class="cq-body"  id="cq-body"></div>
  <div class="cq-metrics">
    <div class="cq-metric">
      <div class="cq-metric-val" id="cq-critical" style="color:#c0392b">—</div>
      <div class="cq-metric-lbl">Critical 错误数</div>
    </div>
    <div class="cq-metric">
      <div class="cq-metric-val" id="cq-major" style="color:#e67e22">—</div>
      <div class="cq-metric-lbl">Major 错误数</div>
    </div>
    <div class="cq-metric">
      <div class="cq-metric-val" id="cq-minor" style="color:#888">—</div>
      <div class="cq-metric-lbl">Minor 错误数</div>
    </div>
    <div class="cq-metric">
      <div class="cq-metric-val" id="cq-schedule-buffer" style="color:#2c6bac">—</div>
      <div class="cq-metric-lbl">剩余进度缓冲（周）</div>
    </div>
  </div>
  <div class="cq-lqs" id="cq-lqs">加载中……</div>
</div>

<!-- 情景邮件（客户质量投诉） -->
<div class="email-card">
  <div class="email-meta">
    <span>发件人：</span>米兔互娱 本地化负责人 张明 &lt;zhang.ming@mitugames.com&gt;<br>
    <span>收件人：</span>星桥语言科技 项目团队<br>
    <span>主题：</span>【紧急】《星际侦探》英文内测反馈 — 请48小时内提交整改方案
  </div>
  <div class="email-body" id="scenario-email">（根据第一轮 MT 比例自动生成……）</div>
  <div class="email-task">📋 本轮任务：完成下方三项决策，确定整改方案并提交摘要。</div>
</div>

<!-- 小组信息 -->
<div class="group-input">
  <label>🏢 小组名称（LSP）</label>
  <input type="text" id="group-name" placeholder="与第一轮保持一致"
         oninput="updateSummary()">
</div>

<!-- 项目状态栏 -->
<div class="status-grid">
  <div class="status-card">
    <div class="status-label">剩余预算</div>
    <div class="status-value" id="stat-budget">—</div>
    <div class="status-sub" id="stat-budget-sub">来自第一轮储备金</div>
  </div>
  <div class="status-card">
    <div class="status-label">当前质量得分</div>
    <div class="status-value" id="stat-quality">—</div>
    <div class="status-sub" id="stat-quality-sub">内测反馈</div>
  </div>
  <div class="status-card">
    <div class="status-label">进度缓冲</div>
    <div class="status-value" id="stat-schedule">—</div>
    <div class="status-sub" id="stat-schedule-sub">周（剩余）</div>
  </div>
  <div class="status-card">
    <div class="status-label">客户满意度</div>
    <div class="status-value" id="stat-satisfaction">—</div>
    <div class="status-sub">100分制</div>
  </div>
</div>

<!-- ── 决策 1：LQA 调查范围 ── -->
<div class="d-card">
  <div class="d-card-title">
    <span>🔍</span> 决策 1：LQA 调查范围与抽样策略
  </div>

  <div class="param-row">
    <div class="param-label">选择 LQA 抽样策略</div>
    <div class="radio-group">
      <label>
        <input type="radio" name="lqa" value="full" onchange="recalc()">
        <span class="radio-btn">全量审查<br><small>所有文本逐一检查</small></span>
      </label>
      <label>
        <input type="radio" name="lqa" value="risk" checked onchange="recalc()">
        <span class="radio-btn">风险导向抽样<br><small>对话优先，15%抽样</small></span>
      </label>
      <label>
        <input type="radio" name="lqa" value="minimal" onchange="recalc()">
        <span class="radio-btn">最小化抽样<br><small>仅抽取5%，省时省钱</small></span>
      </label>
    </div>
    <div class="param-hint">
      <strong>全量审查</strong>：成本约 ¥8,000，用时约 3 天，结论最可靠，但进度和预算压力大。<br>
      <strong>风险导向抽样</strong>：成本约 ¥3,500，覆盖高风险文本类型，性价比最优。<br>
      <strong>最小化抽样</strong>：成本约 ¥1,200，省时省钱，但结论置信度低，客户可能不接受。
    </div>
  </div>
</div>

<!-- ── 决策 2：客户沟通策略（核心） ── -->
<div class="d-card">
  <div class="d-card-title">
    <span>💬</span> 决策 2：客户沟通策略
  </div>

  <div class="param-row">
    <div class="param-label">如何回应客户的质量投诉邮件？</div>
    <div class="radio-group">
      <label>
        <input type="radio" name="comm" value="proactive" checked onchange="recalc()">
        <span class="radio-btn">主动披露＋整改方案<br><small>诚实说明问题，提交详细计划</small></span>
      </label>
      <label>
        <input type="radio" name="comm" value="honest" onchange="recalc()">
        <span class="radio-btn">如实汇报进度<br><small>说明情况，等待客户指示</small></span>
      </label>
      <label>
        <input type="radio" name="comm" value="minimal" onchange="recalc()">
        <span class="radio-btn">仅汇报整体进度<br><small>回避具体质量数字</small></span>
      </label>
    </div>
    <div class="param-hint">
      沟通策略与 LQS 的有无高度相关——有 LQS 的小组可以用合同语言引导谈判；无 LQS 的小组选择"主动披露"后可能被客户反向追责。
    </div>
  </div>

  <!-- 谈判态势提示（基于LQS动态显示） -->
  <div class="negotiation-panel visible" id="neg-panel">
    <span class="neg-strong" id="neg-text">加载中……</span>
  </div>
</div>

<!-- ── 决策 3：铁三角协商 ── -->
<div class="d-card">
  <div class="d-card-title">
    <span>⚖️</span> 决策 3：铁三角协商方案
    <span class="consequence-tag tag-r3">→ 影响第三轮起始状态</span>
  </div>

  <div class="param-row">
    <div class="param-label">面对质量问题和进度压力，你们的整改方案是？</div>
    <div class="radio-group">
      <label>
        <input type="radio" name="triangle" value="ontime" checked onchange="recalc()">
        <span class="radio-btn">保证工期，压缩修复<br><small>按时交付，但修复不彻底</small></span>
      </label>
      <label>
        <input type="radio" name="triangle" value="delay" onchange="recalc()">
        <span class="radio-btn">申请延期 3–5 天<br><small>优先质量，主动告知客户</small></span>
      </label>
      <label>
        <input type="radio" name="triangle" value="budget" onchange="recalc()">
        <span class="radio-btn">申请追加预算<br><small>增加审校资源，加速修复</small></span>
      </label>
      <label>
        <input type="radio" name="triangle" value="scope" onchange="recalc()">
        <span class="radio-btn">协商降低验收标准<br><small class="danger-opt">承认无法达到原定质量</small></span>
      </label>
    </div>
    <div class="param-hint">
      不同选择对预算、工期、质量的影响各不相同——请结合你们的 LQS 状态和沟通策略做出最有说服力的整体方案。
    </div>
  </div>
</div>

<!-- ── 实时影响预估 ── -->
<div class="preview-section">
  <div class="preview-title">📊 本轮决策影响预估</div>
  <div class="delta-grid">
    <div class="delta-item">
      <div class="delta-label">LQA 成本（本轮额外支出）</div>
      <div class="delta-val" id="dv-lqa-cost">—</div>
      <div class="delta-sub" id="dv-lqa-sub">—</div>
    </div>
    <div class="delta-item">
      <div class="delta-label">质量得分变化</div>
      <div class="delta-val" id="dv-quality">—</div>
      <div class="delta-sub" id="dv-quality-sub">—</div>
    </div>
    <div class="delta-item">
      <div class="delta-label">工期变化</div>
      <div class="delta-val" id="dv-schedule">—</div>
      <div class="delta-sub" id="dv-schedule-sub">—</div>
    </div>
    <div class="delta-item">
      <div class="delta-label">客户满意度变化</div>
      <div class="delta-val" id="dv-satisfaction">—</div>
      <div class="delta-sub" id="dv-satisfaction-sub">—</div>
    </div>
  </div>
</div>

<!-- ── 决策摘要 & 导出 ── -->
<div class="summary-section">
  <h3>📋 决策摘要（提交给教师）</h3>
  <div class="summary-box" id="summary-box">请填写小组名称并调整决策，摘要将自动生成。</div>
  <div>
    <button class="btn-primary" onclick="generateSummary()">生成摘要</button>
    <button class="btn-primary btn-copy" onclick="copySummary()">复制摘要</button>
    <span class="copy-feedback" id="copy-feedback">✓ 已复制</span>
    <button class="btn-primary btn-next" onclick="saveAndContinue()">🔓 完成第二轮 → 进入第三轮</button>
  </div>
</div>

</div><!-- /sim-body -->

<script>
// ─────────────────────────────────────────────
// 密码门
// ─────────────────────────────────────────────
const GATE_CODE = 'ROUND2';

function checkGate() {
  const val = document.getElementById('gate-input').value.trim().toUpperCase();
  if (val === GATE_CODE) {
    document.getElementById('gate-overlay').style.display = 'none';
    document.getElementById('main-body').style.display = 'block';
    loadR1Data();
    recalc();
  } else {
    document.getElementById('gate-error').textContent = '密码不正确，请等待教师公布。';
  }
}

// ─────────────────────────────────────────────
// 第一轮数据读取
// ─────────────────────────────────────────────
function loadR1Data() {
  try {
    const d = JSON.parse(localStorage.getItem('sim_r1'));
    if (!d) return;

    // 自动填充小组名
    if (d.group) {
      const gn = document.getElementById('group-name');
      if (!gn.value) gn.value = d.group;
    }

    // MT 等级
    const mtSel = document.getElementById('r1-mt-level');
    if (d.mtLevel) {
      mtSel.value = d.mtLevel;
    } else if (typeof d.mtRatio === 'number') {
      mtSel.value = d.mtRatio >= 60 ? 'high' : d.mtRatio >= 30 ? 'medium' : 'low';
    }

    // LQS
    if (typeof d.hasLQS !== 'undefined') {
      document.getElementById('r1-has-lqs').value = d.hasLQS ? 'yes' : 'no';
    }

    // 术语库
    if (d.glossary) {
      document.getElementById('r1-glossary').value = d.glossary;
    }

    // 风险预案
    if (d.riskPlan) {
      document.getElementById('r1-risk-plan').value = d.riskPlan;
    }

    document.getElementById('auto-badge').style.display = 'inline-block';
    onR1Change();
  } catch(e) {}
}

// ─────────────────────────────────────────────
// 后果场景配置
// ─────────────────────────────────────────────
const SCENARIOS = {
  high: {
    critical: 3, major: 10, minor: 20, scheduleBuffer: 2.5,
    cardClass: 'cq-red',
    initQuality: 55,
    initSatisfaction: 45,
    title: '🔴 质量危机爆发——机翻感问题严重，客户要求暂停验收',
    body: '由于第一轮对话文本使用了高比例 MT（≥60%），内测样本中错误密度显著偏高。客户的玩家体验主管已发出措辞强硬的邮件，要求书面说明质量整改方案，并暗示将重新评估合作。',
    email: `你好，<br><br>我们刚收到内测团队的反馈报告，情况令人担忧。<br><br>
<strong>内测问题摘要（样本量：500字对话片段）：</strong><br>
&bull; Critical 错误（意义严重偏差/角色语气完全不符）：<strong>3 处</strong><br>
&bull; Major 错误（语义不准确/术语不一致）：<strong>10 处</strong><br>
&bull; Minor 错误（语气生硬/标点问题）：<strong>20 处</strong><br><br>
这与我们合同要求的"正式商业上线版本"标准相去甚远。请<strong>48小时内</strong>提交书面整改方案，包括：错误根因分析、修复范围及工期、质量保障措施。<br><br>
如无法提供令人满意的整改方案，我方将不得不考虑终止合作并启动索赔程序。<br><br>
张明`,
  },
  medium: {
    critical: 1, major: 5, minor: 12, scheduleBuffer: 3.0,
    cardClass: 'cq-yellow',
    initQuality: 70,
    initSatisfaction: 65,
    title: '⚠ 质量问题引起关注——需提交正式 LQA 报告',
    body: '内测发现若干质量问题，集中在对话文本的术语不一致和语气自然度。客户邮件措辞较为温和，但正式要求在验收会前提交 LQA 报告，并说明错误成因。本轮需要主动出击、专业应对。',
    email: `你好，<br><br>内测团队完成了首批对话内容的质量审核，发现了一些需要关注的问题。<br><br>
<strong>内测问题摘要（样本量：500字对话片段）：</strong><br>
&bull; Critical 错误：<strong>1 处</strong>（某角色身份关键信息翻译偏差）<br>
&bull; Major 错误：<strong>5 处</strong>（术语不一致、部分对话语气不符合角色性格）<br>
&bull; Minor 错误：<strong>12 处</strong>（标点、语气词等问题）<br><br>
请在本周五验收会议前提交正式 LQA 报告，说明错误成因及修复计划。<br>
我们相信贵司有能力解决这些问题，期待看到整改方案。<br><br>
张明`,
  },
  low: {
    critical: 0, major: 2, minor: 7, scheduleBuffer: 0.5,
    cardClass: 'cq-yellow',
    initQuality: 82,
    initSatisfaction: 75,
    title: '🟡 质量尚可，但进度资源极度吃紧',
    body: '由于第一轮使用了低比例 MT，翻译质量整体较好，内测仅有少量问题。但工期缓冲所剩无几——本轮任何额外投入（修复工时、LQA 费用）都可能触发进度超期警报。决策时需格外权衡成本。',
    email: `你好，<br><br>内测初步反馈显示翻译质量整体不错，但仍有少量问题需要处理。<br><br>
<strong>内测问题摘要（样本量：500字对话片段）：</strong><br>
&bull; Critical 错误：<strong>0 处</strong><br>
&bull; Major 错误：<strong>2 处</strong>（术语选用不当）<br>
&bull; Minor 错误：<strong>7 处</strong>（语气和标点问题）<br><br>
请提交修复方案。另请注意：根据我方项目计划，你们的进度缓冲空间已非常有限，<br>
修复所需时间请务必控制在2天以内，否则将影响整体上线节点。<br><br>
张明`,
  },
};

// ─────────────────────────────────────────────
// 获取第一轮参数
// ─────────────────────────────────────────────
function getR1() {
  return {
    mtLevel:  document.getElementById('r1-mt-level').value,
    hasLQS:   document.getElementById('r1-has-lqs').value === 'yes',
    glossary: document.getElementById('r1-glossary').value,
    riskPlan: document.getElementById('r1-risk-plan').value,
  };
}

// ─────────────────────────────────────────────
// 获取第二轮当前决策
// ─────────────────────────────────────────────
function getDecisions() {
  const lqa      = (document.querySelector('input[name="lqa"]:checked')      || { value: 'risk'      }).value;
  const comm     = (document.querySelector('input[name="comm"]:checked')     || { value: 'proactive' }).value;
  const triangle = (document.querySelector('input[name="triangle"]:checked') || { value: 'ontime'    }).value;
  return { lqa, comm, triangle };
}

// ─────────────────────────────────────────────
// 后果卡更新（R1变化时触发）
// ─────────────────────────────────────────────
function onR1Change() {
  const r1 = getR1();
  const sc = SCENARIOS[r1.mtLevel];

  // 更新后果卡
  const card = document.getElementById('consequence-card');
  card.className = 'consequence-card ' + sc.cardClass;
  document.getElementById('cq-title').textContent = sc.title;
  document.getElementById('cq-body').textContent  = sc.body;
  document.getElementById('cq-critical').textContent     = sc.critical;
  document.getElementById('cq-major').textContent        = sc.major;
  document.getElementById('cq-minor').textContent        = sc.minor;
  document.getElementById('cq-schedule-buffer').textContent = sc.scheduleBuffer;

  const lqsEl = document.getElementById('cq-lqs');
  lqsEl.textContent = r1.hasLQS
    ? '🟢 谈判优势：有 LQS 合同条款，可用"Critical=0，Major≤5/1000字"标准与客户据理力争。'
    : '🔴 谈判弱势：无 LQS，客户提出任何质量要求时均无量化标准可参照，处于被动。';

  // 更新情景邮件
  document.getElementById('scenario-email').innerHTML = sc.email;

  // 更新初始状态栏
  const r1Data = (() => {
    try { return JSON.parse(localStorage.getItem('sim_r1')) || {}; } catch(e) { return {}; }
  })();
  const reserveAmt = r1Data.reservePct
    ? Math.round((r1Data.budgetPct || 90) * 1500 * r1Data.reservePct / 100)
    : 8000;

  document.getElementById('stat-quality').textContent = sc.initQuality + ' 分';
  document.getElementById('stat-quality').style.color =
    sc.initQuality >= 80 ? '#27ae60' : sc.initQuality >= 65 ? '#e67e22' : '#c0392b';
  document.getElementById('stat-quality-sub').textContent = '内测反馈得分';

  document.getElementById('stat-schedule').textContent = sc.scheduleBuffer + ' 周';
  document.getElementById('stat-schedule').style.color =
    sc.scheduleBuffer >= 2 ? '#27ae60' : sc.scheduleBuffer >= 1 ? '#e67e22' : '#c0392b';

  document.getElementById('stat-budget').textContent = '¥' + reserveAmt.toLocaleString('zh-CN');
  document.getElementById('stat-satisfaction').textContent = sc.initSatisfaction + ' 分';
  document.getElementById('stat-satisfaction').style.color =
    sc.initSatisfaction >= 70 ? '#27ae60' : sc.initSatisfaction >= 55 ? '#e67e22' : '#c0392b';

  recalc();
}

// ─────────────────────────────────────────────
// LQA 成本配置
// ─────────────────────────────────────────────
const LQA_CFG = {
  full:    { cost: 8000, qualityBoost: 15, label: '全量审查（+¥8,000，+3天）',    confidence: '高置信度' },
  risk:    { cost: 3500, qualityBoost:  8, label: '风险导向抽样（+¥3,500，+1.5天）', confidence: '中等置信度' },
  minimal: { cost: 1200, qualityBoost:  3, label: '最小化抽样（+¥1,200，+0.5天）',  confidence: '低置信度' },
};

// 沟通策略影响
const COMM_CFG = {
  proactive: { satisfactionDelta: +15, name: '主动披露＋整改方案' },
  honest:    { satisfactionDelta:  +5, name: '如实汇报进度' },
  minimal:   { satisfactionDelta: -10, name: '仅汇报整体进度' },
};

// 铁三角协商影响
const TRIANGLE_CFG = {
  ontime:  { costDelta: 0,    qualityDelta: -5,  scheduleDelta: 0,  satisfactionDelta:  -5, name: '保证工期，压缩修复' },
  delay:   { costDelta: 0,    qualityDelta: +10, scheduleDelta: -4, satisfactionDelta:  +5, name: '申请延期 3–5 天' },
  budget:  { costDelta: 6000, qualityDelta: +12, scheduleDelta: 0,  satisfactionDelta:  +8, name: '申请追加预算（约¥6,000）' },
  scope:   { costDelta: 0,    qualityDelta: -15, scheduleDelta: 0,  satisfactionDelta: -20, name: '协商降低验收标准' },
};

// ─────────────────────────────────────────────
// 核心重算
// ─────────────────────────────────────────────
function recalc() {
  const r1 = getR1();
  const d  = getDecisions();
  const sc = SCENARIOS[r1.mtLevel];
  const lqaCfg      = LQA_CFG[d.lqa];
  const commCfg     = COMM_CFG[d.comm];
  const triangleCfg = TRIANGLE_CFG[d.triangle];

  // LQS 影响沟通效果
  const lqsBonus = r1.hasLQS ? 10 : -5;
  const commFinalSatisfaction = commCfg.satisfactionDelta + (d.comm === 'proactive' ? lqsBonus : 0);

  // 质量变化（LQA + 铁三角）
  const qualityDelta = lqaCfg.qualityBoost + triangleCfg.qualityDelta;
  const finalQuality = Math.min(95, Math.max(30, sc.initQuality + qualityDelta));

  // 满意度变化（沟通 + 铁三角）
  const satisfactionDelta = commFinalSatisfaction + triangleCfg.satisfactionDelta;
  const finalSatisfaction = Math.min(95, Math.max(20, sc.initSatisfaction + satisfactionDelta));

  // 进度变化（天 → 周）
  const scheduleDeltaWeeks = triangleCfg.scheduleDelta / 7 + (d.lqa === 'full' ? -3/7 : d.lqa === 'risk' ? -1.5/7 : -0.5/7);
  const finalBuffer = Math.round((sc.scheduleBuffer + scheduleDeltaWeeks) * 10) / 10;

  // 格式化辅助
  function sign(n) { return n > 0 ? '+' + n : String(n); }
  function signW(n) { const r = Math.round(n * 10) / 10; return r > 0 ? '+' + r : String(r); }

  // 谈判态势面板
  const negPanel = document.getElementById('neg-panel');
  const negText  = document.getElementById('neg-text');
  if (d.comm !== 'minimal') {
    negPanel.classList.add('visible');
    if (r1.hasLQS) {
      negText.className = 'neg-strong';
      negText.textContent =
        '🟢 谈判优势：你们有 LQS 合同条款作为依据。回复时可引用"Critical=0，Major≤5/1000字"标准，将质量讨论拉回量化框架，避免客户无限扩大要求。';
    } else {
      negText.className = 'neg-weak';
      negText.textContent =
        '🔴 谈判劣势：没有 LQS，客户可以主观评判质量好坏，你们缺乏有力的反驳依据。建议在回复中主动提出建立量化验收标准，争取主动权。';
    }
  } else {
    negPanel.classList.remove('visible');
  }

  // 影响预估展示
  const lqaVal = document.getElementById('dv-lqa-cost');
  lqaVal.textContent = '¥' + lqaCfg.cost.toLocaleString('zh-CN');
  lqaVal.className = 'delta-val impact-negative';
  document.getElementById('dv-lqa-sub').textContent = lqaCfg.label;

  const qVal = document.getElementById('dv-quality');
  qVal.textContent = sign(qualityDelta) + ' 分（→ ' + finalQuality + '）';
  qVal.className = 'delta-val ' + (qualityDelta >= 0 ? 'impact-positive' : 'impact-negative');
  document.getElementById('dv-quality-sub').textContent = lqaCfg.confidence + ' · ' + triangleCfg.name;

  const sVal = document.getElementById('dv-schedule');
  sVal.textContent = signW(scheduleDeltaWeeks) + ' 周（→ 缓冲 ' + finalBuffer + '周）';
  sVal.className = 'delta-val ' + (scheduleDeltaWeeks >= 0 ? 'impact-neutral' : 'impact-negative');
  document.getElementById('dv-schedule-sub').textContent =
    finalBuffer <= 0 ? '⚠ 进度缓冲耗尽！' : '仍有缓冲空间';

  const satVal = document.getElementById('dv-satisfaction');
  satVal.textContent = sign(satisfactionDelta) + ' 分（→ ' + finalSatisfaction + '）';
  satVal.className = 'delta-val ' + (satisfactionDelta >= 0 ? 'impact-positive' : 'impact-negative');
  document.getElementById('dv-satisfaction-sub').textContent =
    commCfg.name + (d.comm === 'proactive' && r1.hasLQS ? '（LQS 加成 +10）' :
                    d.comm === 'proactive' && !r1.hasLQS ? '（无LQS 扣分 −5）' : '');

  updateSummary();
}

// ─────────────────────────────────────────────
// 摘要生成
// ─────────────────────────────────────────────
function generateSummary() { updateSummary(); }

function updateSummary() {
  const r1 = getR1();
  const d  = getDecisions();
  const sc = SCENARIOS[r1.mtLevel];

  const lqaCfg      = LQA_CFG[d.lqa];
  const commCfg     = COMM_CFG[d.comm];
  const triangleCfg = TRIANGLE_CFG[d.triangle];

  const lqsBonus = r1.hasLQS ? 10 : -5;
  const commFinalSat = commCfg.satisfactionDelta + (d.comm === 'proactive' ? lqsBonus : 0);
  const qualityDelta = lqaCfg.qualityBoost + triangleCfg.qualityDelta;
  const finalQuality = Math.min(95, Math.max(30, sc.initQuality + qualityDelta));
  const satisfactionDelta = commFinalSat + triangleCfg.satisfactionDelta;
  const finalSatisfaction = Math.min(95, Math.max(20, sc.initSatisfaction + satisfactionDelta));

  const group = document.getElementById('group-name').value.trim() || '（未填写小组名）';
  const now   = new Date().toLocaleString('zh-CN', { hour12: false });

  const mtLabel = { low: '低（＜30%）', medium: '中（30–59%）', high: '高（≥60%）' };
  const glossaryLabel = { early: '第1周建立（规范型）', during: '翻译中积累（混合型）', none: '未建立（混乱型）' };
  const riskPlanLabel = { detailed: '详细预案', standard: '标准预案', brief: '简略预案' };
  const emoji = (n, hi, mid) => n >= hi ? '🟢' : n >= mid ? '🟡' : '🔴';

  const text = [
    '═══════════════════════════════════════════',
    '  翻译项目沙盘 · 第二轮决策摘要',
    '═══════════════════════════════════════════',
    `  小组名称：${group}`,
    `  提交时间：${now}`,
    '───────────────────────────────────────────',
    '  【继承自第一轮的参数】',
    `  · MT 使用比例等级：${mtLabel[r1.mtLevel]}`,
    `  · 质量验收标准（LQS）：${r1.hasLQS ? '✅ 已预设' : '❌ 未预设'}`,
    `  · 术语库状态：${glossaryLabel[r1.glossary]}`,
    `  · 风险预案质量：${riskPlanLabel[r1.riskPlan]}`,
    '',
    '  【本轮起始状态（差异化后果）】',
    `  · Critical 错误：${sc.critical}，Major 错误：${sc.major}，Minor 错误：${sc.minor}`,
    `  · 初始质量得分：${sc.initQuality} 分  ${emoji(sc.initQuality, 75, 60)}`,
    `  · 初始客户满意度：${sc.initSatisfaction} 分  ${emoji(sc.initSatisfaction, 70, 55)}`,
    `  · 进度缓冲：${sc.scheduleBuffer} 周  ${emoji(sc.scheduleBuffer, 2, 1)}`,
    '',
    '  【本轮三项决策】',
    `  · 决策 1（LQA 策略）：${lqaCfg.label}`,
    `  · 决策 2（客户沟通）：${commCfg.name}${d.comm === 'proactive' ? (r1.hasLQS ? '（LQS 谈判优势加持）' : '（无 LQS，谈判被动）') : ''}`,
    `  · 决策 3（铁三角协商）：${triangleCfg.name}`,
    '',
    '  【本轮决策影响预估】',
    `  · 质量变化：${qualityDelta > 0 ? '+' : ''}${qualityDelta} 分 → 最终 ${finalQuality} 分  ${emoji(finalQuality, 80, 65)}`,
    `  · 客户满意度变化：${satisfactionDelta > 0 ? '+' : ''}${satisfactionDelta} 分 → 最终 ${finalSatisfaction} 分  ${emoji(finalSatisfaction, 70, 55)}`,
    `  · LQA 额外支出：¥${lqaCfg.cost.toLocaleString('zh-CN')}`,
    '───────────────────────────────────────────',
    '  ★ 第三轮触发参数（教师参考）',
    `  → 资产状态：${glossaryLabel[r1.glossary]}（${r1.glossary === 'early' ? '第三轮资产复用顺畅' : r1.glossary === 'during' ? '部分可复用，需人工整理' : '需从零重建，成本高'})`,
    `  → 客户关系：${finalSatisfaction >= 70 ? '良好（第三轮续约谈判有优势）' : finalSatisfaction >= 55 ? '一般（续约需要额外努力）' : '紧张（第三轮续约面临阻力）'}`,
    '═══════════════════════════════════════════',
  ].join('\n');

  document.getElementById('summary-box').textContent = text;

  // 保存至 localStorage
  try {
    localStorage.setItem('sim_r2', JSON.stringify({
      group,
      finalQuality,
      finalSatisfaction,
      lqaStrategy: d.lqa,
      commStrategy: d.comm,
      triangleChoice: d.triangle,
      glossary: r1.glossary,
      riskPlan: r1.riskPlan,
    }));
  } catch(e) {}
}

function copySummary() {
  navigator.clipboard.writeText(document.getElementById('summary-box').textContent).then(() => {
    const fb = document.getElementById('copy-feedback');
    fb.style.opacity = '1';
    setTimeout(() => { fb.style.opacity = '0'; }, 2000);
  });
}

function saveAndContinue() {
  updateSummary();
  window.location = '/class/localization-sim-r3/';
}

// ─────────────────────────────────────────────
// 初始化
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // 如果已经解锁过（同会话），自动打开
  if (sessionStorage.getItem('r2_unlocked') === '1') {
    document.getElementById('gate-overlay').style.display = 'none';
    document.getElementById('main-body').style.display = 'block';
    loadR1Data();
    recalc();
  }
});

// 解锁后记录会话状态
(function patchCheckGate() {
  const orig = checkGate;
  window.checkGate = function() {
    const val = document.getElementById('gate-input').value.trim().toUpperCase();
    if (val === GATE_CODE) {
      sessionStorage.setItem('r2_unlocked', '1');
    }
    orig();
  };
})();
</script>
