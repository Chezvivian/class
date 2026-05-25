---
layout: default
title: 本地化项目管理第四轮：风险应对
permalink: /localization-sim-r4/
---

<style>
.sim-body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Microsoft YaHei", sans-serif;
  color: #2c3e50; max-width: 860px; margin: 0 auto; padding: 0 0 3rem;
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
}
.gate-input:focus { border-color: #c0392b; }
.gate-btn {
  margin-top: 0.85rem; width: 100%; padding: 0.7rem;
  background: #c0392b; color: white; border: none; border-radius: 8px;
  font-size: 0.95rem; font-weight: 600; cursor: pointer;
}
.gate-btn:hover { background: #a93226; }
.gate-error { color: #c0392b; font-size: 0.82rem; margin-top: 0.5rem; min-height: 1.2em; }

/* ── 轮次导航 ── */
.round-nav { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.round-tab {
  padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.82rem; font-weight: 600;
  border: 2px solid #dce3ed; color: #aaa; background: #f5f7fa; cursor: default;
}
.round-tab.done   { background: #eafaf1; border-color: #27ae60; color: #1e7e50; }
.round-tab.active { background: #c0392b; color: white; border-color: #c0392b; }

/* ── 参数继承面板 ── */
.prev-panel {
  background: #f4f7fb; border: 1.5px solid #c8d8ee;
  border-radius: 12px; padding: 1.2rem 1.5rem; margin-bottom: 1.5rem;
}
.prev-panel-title {
  font-size: 0.85rem; font-weight: 700; color: #1a4f90; margin-bottom: 0.9rem;
  display: flex; align-items: center; gap: 0.5rem;
}
.auto-badge {
  display: inline-block; background: #27ae60; color: white;
  font-size: 0.68rem; padding: 0.1rem 0.5rem; border-radius: 10px; font-weight: 600;
}
.prev-grid   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.prev-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-top: 0.75rem; }
.prev-field label {
  display: block; font-size: 0.72rem; font-weight: 600; color: #777;
  margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.4px;
}
.prev-field select {
  width: 100%; padding: 0.45rem 0.7rem;
  border: 1.5px solid #c8d8ee; border-radius: 6px; font-size: 0.85rem;
  background: white; outline: none; color: #1a2f50;
}
.prev-hint { margin-top: 0.7rem; font-size: 0.75rem; color: #888; line-height: 1.5; }

/* ── 预案资源状态卡 ── */
.resource-card {
  border-radius: 12px; padding: 1.3rem 1.5rem; margin-bottom: 1.2rem; border: 2px solid;
}
.res-green  { background: #eafaf1; border-color: #27ae60; }
.res-yellow { background: #fffbf0; border-color: #f0a500; }
.res-red    { background: #fef0f0; border-color: #e74c3c; }
.res-title  { font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; }
.res-body   { font-size: 0.87rem; color: #444; line-height: 1.65; margin-bottom: 0.9rem; }
.res-grid   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }
.res-item {
  background: rgba(255,255,255,0.75); border-radius: 8px;
  padding: 0.6rem 0.65rem; font-size: 0.78rem; text-align: center;
}
.res-item-title { font-weight: 700; font-size: 0.75rem; margin-bottom: 0.25rem; }
.res-available   { color: #1e7e50; }
.res-partial     { color: #8a6000; }
.res-unavailable { color: #c0392b; }

/* ── 紧急预算池 ── */
.budget-pool {
  background: #f8fafb; border: 1.5px solid #e0e6f0;
  border-radius: 12px; padding: 1rem 1.4rem; margin-bottom: 1.1rem;
}
.budget-pool-title {
  font-size: 0.88rem; font-weight: 700; color: #1a2f50;
  margin-bottom: 0.7rem; display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;
}
.budget-bar-wrap {
  background: #eef2f7; border-radius: 5px; height: 10px;
  overflow: hidden; margin-bottom: 0.55rem;
}
.budget-bar-fill {
  height: 100%; border-radius: 5px; background: #2c6bac; transition: width 0.3s, background 0.3s;
}
.budget-bar-over { background: #e74c3c !important; }
.budget-nums {
  display: flex; gap: 1.4rem; font-size: 0.82rem; color: #555; flex-wrap: wrap;
}
.budget-nums strong { font-size: 0.9rem; }
.budget-warn {
  display: none; background: #fdecea; border: 1px solid #f5b8b8;
  border-radius: 6px; padding: 0.4rem 0.75rem; font-size: 0.8rem; font-weight: 600;
  color: #c0392b; margin-top: 0.5rem;
}
.budget-warn.show { display: block; }
.budget-pressure-badge {
  font-size: 0.72rem; font-weight: 700; padding: 0.1rem 0.5rem; border-radius: 4px;
}
.bp-normal  { background: #d4efdf; color: #1e7e50; }
.bp-tight   { background: #fdecea; color: #c0392b; }

/* ── 危机邮件组 ── */
.crisis-trio { display: flex; gap: 0.8rem; margin-bottom: 1.75rem; flex-wrap: wrap; }
.crisis-email {
  flex: 1; min-width: 230px;
  border-radius: 10px; padding: 1rem 1.1rem; border: 2px solid;
}
.crisis-red    { background: #fef2f2; border-color: #e74c3c; }
.crisis-orange { background: #fff8f0; border-color: #e67e22; }
.crisis-purple { background: #f8f4ff; border-color: #8e44ad; }
.crisis-badge {
  font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.5rem;
  border-radius: 4px; display: inline-block; margin-bottom: 0.4rem;
}
.badge-red    { background: #fdecea; color: #c0392b; border: 1px solid #f5b8b8; }
.badge-orange { background: #fef3e8; color: #c05000; border: 1px solid #f5c87a; }
.badge-purple { background: #f3eeff; color: #6a0dad; border: 1px solid #c8aaf0; }
.crisis-title { font-size: 0.88rem; font-weight: 700; margin-bottom: 0.5rem; }
.crisis-body  { font-size: 0.8rem; color: #444; line-height: 1.55; }

/* ── 项目状态栏 ── */
.status-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 0.7rem; margin-bottom: 1.2rem;
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
  margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
}
.crisis-indicator {
  font-size: 0.78rem; padding: 0.2rem 0.65rem; border-radius: 10px;
  font-weight: 600; display: inline-block;
}
.ind-red    { background: #fdecea; color: #c0392b; }
.ind-orange { background: #fef3e8; color: #c05000; }
.ind-purple { background: #f3eeff; color: #6a0dad; }
.resource-hint {
  background: #f8fafb; border: 1px solid #e0e6f0; border-radius: 6px;
  padding: 0.6rem 0.85rem; font-size: 0.8rem; line-height: 1.6;
  margin-bottom: 0.9rem; color: #555;
}
.resource-hint .avail  { color: #1e7e50; font-weight: 700; }
.resource-hint .noavail { color: #c0392b; font-weight: 700; }
.param-row { margin-bottom: 1.3rem; }
.param-row:last-child { margin-bottom: 0; }
.param-label {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 0.88rem; font-weight: 600; color: #444; margin-bottom: 0.4rem;
}
.param-name { font-weight: 600; }
.param-val  { font-size: 1rem; font-weight: 700; color: #c0392b; min-width: 4rem; text-align: right; }
.param-hint { font-size: 0.75rem; color: #888; margin-top: 0.4rem; line-height: 1.5; }

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
  border-color: #c0392b; background: #fff0ee; color: #8a0000; font-weight: 600;
}
.strategy-tag {
  display: inline-block; font-size: 0.68rem; font-weight: 700;
  padding: 0.1rem 0.4rem; border-radius: 3px; margin-bottom: 0.2rem;
}
.tag-mitigate { background: #e8f8f0; color: #1e7e50; }
.tag-transfer { background: #eaf2ff; color: #1a4f90; }
.tag-accept   { background: #fff9e6; color: #8a6000; }
.tag-avoid    { background: #fdecea; color: #c0392b; }
.radio-cost  { display: block; font-size: 0.78rem; font-weight: 700; color: #c0392b; margin-top: 0.15rem; }
.radio-gain  { display: block; font-size: 0.78rem; font-weight: 700; color: #27ae60; margin-top: 0.15rem; }
.radio-note  { display: block; font-size: 0.72rem; color: #888; margin-top: 0.1rem; }

/* ── 滑块控件 ── */
input[type=range] {
  -webkit-appearance: none; appearance: none; width: 100%; height: 6px;
  border-radius: 3px; background: #dde4f0; outline: none; cursor: pointer; margin: 0.3rem 0;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none; width: 20px; height: 20px;
  border-radius: 50%; background: #c0392b; cursor: pointer;
  border: 2px solid white; box-shadow: 0 1px 4px rgba(192,57,43,0.4);
}
input[type=range]::-moz-range-thumb {
  width: 20px; height: 20px; border-radius: 50%; background: #c0392b; cursor: pointer;
  border: 2px solid white;
}
.slider-labels {
  display: flex; justify-content: space-between;
  font-size: 0.68rem; color: #aaa; margin-top: 0.2rem;
}
.slider-callout {
  background: #fff0ee; border: 1.5px solid #f5b8b8; border-radius: 8px;
  padding: 0.65rem 1rem; margin-top: 0.6rem; font-size: 0.82rem;
  color: #8a0000; display: flex; gap: 1.2rem; flex-wrap: wrap; align-items: center;
}
.slider-callout strong { font-size: 1rem; }
.callout-warn { background: #fff8f0; border-color: #f5c87a; color: #8a4000; }
.callout-ok   { background: #eafaf1; border-color: #a8dfc0; color: #1a5030; }
.sub-slider-row { margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed #e0e6f0; }

/* ── 合同加成提示 ── */
.contract-badge {
  display: inline-block; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem;
  border-radius: 4px; margin-bottom: 0.6rem;
}
.cb-strong  { background: #d4efdf; color: #1e7e50; border: 1px solid #a8dfc0; }
.cb-mid     { background: #fff9e6; color: #8a6000; border: 1px solid #f5d87a; }
.cb-weak    { background: #fdecea; color: #c0392b; border: 1px solid #f5b8b8; }

/* ── 课程闭环反思 ── */
.reflection-section {
  background: #1a2f50; color: white;
  border-radius: 14px; padding: 1.6rem 1.8rem; margin: 1.5rem 0;
}
.reflection-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; color: #a8d8ff; }
.reflection-sub   { font-size: 0.85rem; color: #aac; margin-bottom: 1.2rem; line-height: 1.6; }
.reflection-table { width: 100%; border-collapse: collapse; font-size: 0.83rem; }
.reflection-table th {
  background: #243855; color: #a8d8ff; padding: 0.45rem 0.7rem;
  text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.4px;
}
.reflection-table td { padding: 0.55rem 0.7rem; border-bottom: 1px solid #2d4567; vertical-align: top; }
.reflection-table tr:last-child td { border-bottom: none; }
.ref-crisis { font-weight: 600; color: #e8c87a; }
.ref-plan   { color: #aac; }
.ref-result-good { color: #4ecb71; font-weight: 600; }
.ref-result-bad  { color: #ff7b7b; font-weight: 600; }
.ref-result-mid  { color: #f5c842; font-weight: 600; }
.reflection-closing {
  margin-top: 1rem; padding: 0.9rem 1rem;
  background: rgba(255,255,255,0.07); border-radius: 8px;
  font-size: 0.85rem; line-height: 1.7; color: #ccd;
  border-left: 3px solid #a8d8ff;
}

/* ── 实时预览 ── */
.preview-section {
  background: #f0f4fb; border: 1.5px solid #c8d8ee;
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-bottom: 1.1rem;
}
.preview-title { font-size: 0.95rem; font-weight: 700; color: #1a2f50; margin-bottom: 1rem; }
.impact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.impact-item {
  background: white; border-radius: 8px; padding: 0.75rem 0.9rem;
  border: 1px solid #dde4f0;
}
.impact-label { font-size: 0.72rem; color: #888; margin-bottom: 0.25rem; }
.impact-val   { font-size: 1rem; font-weight: 700; }
.impact-sub   { font-size: 0.72rem; color: #aaa; margin-top: 0.1rem; }
.color-green  { color: #27ae60; }
.color-orange { color: #e67e22; }
.color-red    { color: #c0392b; }
.color-blue   { color: #2c6bac; }

/* ── 摘要 ── */
.summary-section {
  background: white; border: 1.5px solid #e0e6f0;
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-top: 1.5rem;
}
.summary-section h3 { font-size: 0.95rem; font-weight: 700; color: #1a2f50; margin-bottom: 0.75rem; }
.summary-box {
  font-family: "Courier New", monospace; font-size: 0.82rem;
  background: #f8fafb; border: 1px solid #dde4f0; border-radius: 8px;
  padding: 1rem 1.1rem; white-space: pre-wrap; line-height: 1.7;
  min-height: 16rem; color: #2c3e50;
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
  background: #fff0ee; border: 1.5px solid #f5b8b8;
  border-radius: 10px; padding: 0.9rem 1.2rem; margin-bottom: 1.5rem;
}
.group-input label { font-weight: 700; font-size: 0.9rem; color: #8a0000; white-space: nowrap; }
.group-input input[type=text] {
  flex: 1; border: 1.5px solid #f5b8b8; border-radius: 6px;
  padding: 0.45rem 0.75rem; font-size: 0.9rem; outline: none;
}
.group-input input[type=text]:focus { border-color: #c0392b; }

@media (max-width: 640px) {
  .status-grid  { grid-template-columns: 1fr 1fr; }
  .prev-grid    { grid-template-columns: 1fr; }
  .prev-grid-2  { grid-template-columns: 1fr; }
  .impact-grid  { grid-template-columns: 1fr; }
  .res-grid     { grid-template-columns: 1fr; }
  .crisis-trio  { flex-direction: column; }
  .budget-nums  { flex-direction: column; gap: 0.4rem; }
}
</style>

<!-- ── 密码门 ── -->
<div id="gate-overlay" class="gate-overlay">
  <div class="gate-box">
    <h2>🔒 第四轮已锁定</h2>
    <p>请等待教师宣布第三轮结束后<br>输入解锁密码进入第四轮。</p>
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
  <div class="round-tab done">第二轮 · 质量管控 ✓</div>
  <div class="round-tab done">第三轮 · 资产管理 ✓</div>
  <div class="round-tab active">第四轮 · 风险应对</div>
</div>

<!-- 参数继承面板（5个字段，3+2布局） -->
<div class="prev-panel">
  <div class="prev-panel-title">
    📥 继承自历史轮次的关键参数
    <span class="auto-badge" id="auto-badge" style="display:none">已自动读取</span>
  </div>
  <!-- 行1：来自R1和R3的基础参数 -->
  <div class="prev-grid">
    <div class="prev-field">
      <label>第一轮：风险预案质量（最关键）</label>
      <select id="r1-riskplan" onchange="onParamsChange()">
        <option value="detailed">详细预案（备选译者+变更流程+版权清单）</option>
        <option value="standard" selected>标准预案（3类风险识别+基本应对）</option>
        <option value="brief">简略预案（仅列风险点）</option>
      </select>
    </div>
    <div class="prev-field">
      <label>第三轮：客户满意度（进入本轮）</label>
      <select id="r3-satisfaction" onchange="onParamsChange()">
        <option value="80">高（≥80分）</option>
        <option value="65" selected>中（65–79分）</option>
        <option value="50">低（＜65分）</option>
      </select>
    </div>
    <div class="prev-field">
      <label>第三轮：资产规范化评分</label>
      <select id="r3-asset" onchange="onParamsChange()">
        <option value="85">高（≥80分）</option>
        <option value="65" selected>中（60–79分）</option>
        <option value="45">低（＜60分）</option>
      </select>
    </div>
  </div>
  <!-- 行2：来自R3的新参数（本轮关键差异化因素） -->
  <div class="prev-grid-2">
    <div class="prev-field">
      <label>第三轮：续集合同保障等级（→ 影响情况二谈判）</label>
      <select id="r3-contract" onchange="onParamsChange()">
        <option value="full">完整条款套装（变更管控+IP条款）</option>
        <option value="standard" selected>标准合同模板（含基础变更描述）</option>
        <option value="minimal">精简合同（快速签约，无变更保护）</option>
      </select>
    </div>
    <div class="prev-field">
      <label>第三轮：续集利润压力（→ 影响紧急储备规模）</label>
      <select id="r3-profit" onchange="onParamsChange()">
        <option value="no" selected>正常（TM折扣 ＜ 50%，储备 ¥20,000）</option>
        <option value="yes">有压力（TM折扣 ≥ 50%，储备 ¥12,000）</option>
      </select>
    </div>
  </div>
  <div class="prev-hint">请对照历史轮次决策摘要核对以上五项参数。若已自动读取，请确认与小组实际决策一致。</div>
</div>

<!-- 预案资源状态卡 -->
<div class="resource-card" id="resource-card">
  <div class="res-title" id="res-title">正在加载预案资源……</div>
  <div class="res-body"  id="res-body"></div>
  <div class="res-grid">
    <div class="res-item" id="res-c1-item">
      <div class="res-item-title">情况一资源</div>
      <div id="res-c1-status">—</div>
      <div id="res-c1-detail" style="font-size:0.7rem;color:#888;margin-top:0.2rem"></div>
    </div>
    <div class="res-item" id="res-c2-item">
      <div class="res-item-title">情况二资源</div>
      <div id="res-c2-status">—</div>
      <div id="res-c2-detail" style="font-size:0.7rem;color:#888;margin-top:0.2rem"></div>
    </div>
    <div class="res-item" id="res-c3-item">
      <div class="res-item-title">情况三资源</div>
      <div id="res-c3-status">—</div>
      <div id="res-c3-detail" style="font-size:0.7rem;color:#888;margin-top:0.2rem"></div>
    </div>
  </div>
</div>

<!-- 紧急预算池 -->
<div class="budget-pool" id="budget-pool">
  <div class="budget-pool-title">
    💰 紧急处置预算池
    <span class="budget-pressure-badge" id="budget-badge">正常</span>
    <span style="font-size:0.75rem;color:#888;font-weight:400">（由第三轮 TM 折扣策略决定）</span>
  </div>
  <div class="budget-bar-wrap">
    <div class="budget-bar-fill" id="budget-bar-fill" style="width:0%"></div>
  </div>
  <div class="budget-nums">
    <span>已用：<strong id="budget-used">¥0</strong></span>
    <span>可用：<strong id="budget-available">¥20,000</strong></span>
    <span>剩余：<strong id="budget-remain">¥20,000</strong></span>
  </div>
  <div class="budget-warn" id="budget-warn">
    ⚠ 超支 <strong id="budget-over-amt">¥0</strong>——超出部分须从续集项目正常利润中划拨，PM 综合评分 -10 分
  </div>
</div>

<!-- 三封危机邮件 -->
<div class="crisis-trio">
  <div class="crisis-email crisis-red">
    <div><span class="crisis-badge badge-red">情况一 · 人员风险</span></div>
    <div class="crisis-title">主译者王磊突然住院 🏥</div>
    <div class="crisis-body">
      王磊负责的 40% 对话文本（约 <strong>22,000 字</strong>）尚未完成，预计住院休息 2–3 周。<br>
      剩余工期：<strong>3.5 周</strong>，交付节点<strong>不可延误</strong>。<br>
      问：如何在不延期的前提下确保交付？选择什么规格的替补？
    </div>
  </div>
  <div class="crisis-email crisis-orange">
    <div><span class="crisis-badge badge-orange">情况二 · 变更风险</span></div>
    <div class="crisis-title">客户追加 6,000 字，不加预算 📋</div>
    <div class="crisis-body">
      米兔互娱新增支线任务对话，共约 <strong>6,000 字</strong>，<strong>要求不增加预算、不延误上线</strong>。<br>
      项目当前已无剩余储备金可用。<br>
      问：如何回应？如果接受，用何种方式翻译这 6,000 字？
    </div>
  </div>
  <div class="crisis-email crisis-purple">
    <div><span class="crisis-badge badge-purple">情况三 · 合规风险</span></div>
    <div class="crisis-title">发现版权侵权风险 ⚖️</div>
    <div class="crisis-body">
      法务团队发现原始中文脚本某段独白与已出版小说高度相似，涉嫌抄袭。若原著权利人追诉，<strong>贵司作为本地化方也可能承担连带责任</strong>。<br>
      问：如何处理，如何告知客户？投入多大力度进行法务核查？
    </div>
  </div>
</div>

<!-- 小组信息 -->
<div class="group-input">
  <label>🏢 小组名称（LSP）</label>
  <input type="text" id="group-name" placeholder="与前三轮保持一致"
         oninput="updateSummary()">
</div>

<!-- 项目状态栏 -->
<div class="status-grid">
  <div class="status-card">
    <div class="status-label">预案资源等级</div>
    <div class="status-value" id="stat-resource">—</div>
    <div class="status-sub">源自第一轮风险预案</div>
  </div>
  <div class="status-card">
    <div class="status-label">当前客户满意度</div>
    <div class="status-value" id="stat-sat">—</div>
    <div class="status-sub">延续自第三轮</div>
  </div>
  <div class="status-card">
    <div class="status-label">紧急预算池</div>
    <div class="status-value" id="stat-budget">—</div>
    <div class="status-sub" id="stat-budget-sub">源自第三轮利润决策</div>
  </div>
  <div class="status-card">
    <div class="status-label">PM 综合评分</div>
    <div class="status-value" id="stat-score">—</div>
    <div class="status-sub">四轮决策综合</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════ -->
<!-- ── 决策 1：情况一——人员风险 ── -->
<!-- ══════════════════════════════════════════════════════ -->
<div class="d-card">
  <div class="d-card-title">
    <span class="crisis-indicator ind-red">情况一</span>
    <span>人员风险应对策略</span>
  </div>
  <div class="resource-hint" id="c1-hint">加载中……</div>

  <!-- 1a: PMBOK 策略单选 -->
  <div class="param-row">
    <div class="param-label"><span class="param-name">应对策略（PMBOK 四种风险应对）</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="c1" value="mitigate" checked onchange="onC1StrategyChange()">
        <span class="radio-btn">
          <span class="strategy-tag tag-mitigate">缓解 Mitigate</span>
          <span class="radio-note">启用备选译者补位</span>
          <span class="radio-note" id="c1-mitigate-note">基础到位成本：加载中……</span>
          <span class="radio-gain">工期不延误</span>
        </span>
      </label>
      <label>
        <input type="radio" name="c1" value="transfer" onchange="onC1StrategyChange()">
        <span class="radio-btn">
          <span class="strategy-tag tag-transfer">转移 Transfer</span>
          <span class="radio-note">分包给外部 LSP</span>
          <span class="radio-cost">套餐费 ¥10,000–15,000</span>
          <span class="radio-gain">工期不延误，快速到位</span>
        </span>
      </label>
      <label>
        <input type="radio" name="c1" value="accept" onchange="onC1StrategyChange()">
        <span class="radio-btn">
          <span class="strategy-tag tag-accept">接受 Accept</span>
          <span class="radio-note">申请延期 2 周</span>
          <span class="radio-gain">成本 ¥0</span>
          <span class="radio-cost">满意度 −10分，上线延误</span>
        </span>
      </label>
    </div>
  </div>

  <!-- 1b: 替补译者规格（缓解策略时显示） -->
  <div class="sub-slider-row" id="c1-translator-row">
    <div class="param-label">
      <span class="param-name">替补译者规格选择</span>
      <span class="param-val" id="c1-level-val">中级（¥0.09/字）</span>
    </div>
    <input type="range" min="1" max="3" step="1" value="2" id="c1-level" oninput="onC1LevelChange()">
    <div class="slider-labels">
      <span>初级（¥0.06/字）</span>
      <span style="text-align:center">中级（¥0.09/字）★</span>
      <span style="text-align:right">资深（¥0.14/字）</span>
    </div>
    <div class="slider-callout" id="c1-level-callout">
      <span>译者成本：<strong id="cl-trans-cost">¥1,980</strong></span>
      <span>QA 调整：<strong id="cl-qa-note">标准</strong></span>
      <span>总处置成本：<strong id="cl-total-cost">¥—</strong></span>
    </div>
    <div class="param-hint" id="c1-translator-hint">初级译者成本最低，但交接风险高，需额外 QA 介入（+¥400）；资深译者成本高但质量最优，可节省 QA 成本（-¥500）。选择时需综合考虑预算池余量。</div>
  </div>

  <!-- 1c: 外包套餐级别（转移策略时显示） -->
  <div class="sub-slider-row" id="c1-transfer-row" style="display:none">
    <div class="param-label">
      <span class="param-name">外包套餐级别</span>
      <span class="param-val" id="c1-tier-val">标准外包（¥12,000）</span>
    </div>
    <input type="range" min="1" max="3" step="1" value="2" id="c1-tier" oninput="onC1TierChange()">
    <div class="slider-labels">
      <span>快速套餐（¥10,000）</span>
      <span style="text-align:center">标准套餐（¥12,000）★</span>
      <span style="text-align:right">精品套餐（¥15,000）</span>
    </div>
    <div class="slider-callout callout-ok" id="c1-tier-callout">
      <span>套餐费用：<strong id="ct-cost">¥12,000</strong></span>
      <span>到位时间：<strong id="ct-time">1–3天</strong></span>
      <span>质量风险：<strong id="ct-quality">标准</strong></span>
    </div>
    <div class="param-hint">快速套餐注重速度，质量有一定风险需要额外审校；精品套餐质量优先，成本最高但后续 QA 成本最低。</div>
  </div>

  <div class="param-hint" id="c1-main-hint" style="margin-top:0.5rem">
    <strong>核心权衡：</strong>替补成本 = 招募/到位成本（由 R1 预案决定）+ 译者质量成本（由本轮滑块决定）。选择更高规格的译者，可以减少后续审校返工，但会压缩紧急预算池。
  </div>
</div>

<!-- ══════════════════════════════════════════════════════ -->
<!-- ── 决策 2：情况二——需求变更 ── -->
<!-- ══════════════════════════════════════════════════════ -->
<div class="d-card">
  <div class="d-card-title">
    <span class="crisis-indicator ind-orange">情况二</span>
    <span>需求变更管理策略</span>
  </div>
  <div class="resource-hint" id="c2-hint">加载中……</div>

  <!-- 合同条款加成标签 -->
  <div id="c2-contract-badge-row" style="margin-bottom:0.75rem"></div>

  <!-- 2a: PMBOK 策略单选 -->
  <div class="param-row">
    <div class="param-label"><span class="param-name">如何回应客户的追加文本请求？</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="c2" value="changereq" checked onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-avoid">规避 Avoid</span>
          <span class="radio-note">提交正式变更申请</span>
          <span class="radio-note">要求追加预算或延期</span>
          <span class="radio-note" id="c2-changereq-note">需合同依据</span>
        </span>
      </label>
      <label>
        <input type="radio" name="c2" value="negotiate" onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-mitigate">缓解 Mitigate</span>
          <span class="radio-note">分步协商：部分免费</span>
          <span class="radio-note">其余要求补偿</span>
          <span class="radio-gain">满意度 +5分，灵活</span>
        </span>
      </label>
      <label>
        <input type="radio" name="c2" value="absorb" onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-accept">接受 Accept</span>
          <span class="radio-note">无偿吸收全部追加</span>
          <span class="radio-gain">满意度 +8分（短期）</span>
          <span class="radio-cost">长期利润持续受损</span>
        </span>
      </label>
    </div>
  </div>

  <!-- 2b: 追加6,000字的翻译方式（MT比例滑块） -->
  <div class="sub-slider-row">
    <div class="param-label">
      <span class="param-name">追加 6,000 字的翻译方式（MT 使用比例）</span>
      <span class="param-val" id="c2-mt-val">0%（全人工）</span>
    </div>
    <input type="range" min="0" max="100" step="20" value="0" id="c2-mt" oninput="onC2MtChange()">
    <div class="slider-labels">
      <span>全人工</span>
      <span>20% MT</span>
      <span>40% MT</span>
      <span>60% MT</span>
      <span>80% MT</span>
      <span>纯 MT</span>
    </div>
    <div class="slider-callout" id="c2-mt-callout">
      <span>翻译成本：<strong id="c2-trans-cost">¥480</strong></span>
      <span>所需时间：<strong id="c2-trans-days">3.0天</strong></span>
      <span>质量风险：<strong id="c2-trans-risk">0%</strong></span>
    </div>
    <div id="c2-mt-warning" class="param-hint" style="display:none;color:#c0392b;font-weight:600"></div>
    <div class="param-hint">MT 比例越高，翻译成本越低、速度越快，但质量风险随之上升。无论最终由谁承担这笔成本（策略决策），翻译方式都需要独立决定。</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════ -->
<!-- ── 决策 3：情况三——合规风险 ── -->
<!-- ══════════════════════════════════════════════════════ -->
<div class="d-card">
  <div class="d-card-title">
    <span class="crisis-indicator ind-purple">情况三</span>
    <span>版权合规风险处理</span>
  </div>
  <div class="resource-hint" id="c3-hint">加载中……</div>

  <!-- 3a: PMBOK 策略单选 -->
  <div class="param-row">
    <div class="param-label"><span class="param-name">如何处理潜在的版权侵权风险？</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="c3" value="immediate" checked onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-avoid">规避 Avoid</span>
          <span class="radio-note">立即暂停该场景翻译</span>
          <span class="radio-note">通知客户，启动法务核查</span>
          <span class="radio-cost">工期 −0.5 周</span>
          <span class="radio-gain">合规，责任最小</span>
        </span>
      </label>
      <label>
        <input type="radio" name="c3" value="modify" onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-mitigate">缓解 Mitigate</span>
          <span class="radio-note">修改译文规避相似内容</span>
          <span class="radio-note">不通知客户</span>
          <span class="radio-cost">法律风险中等（未根除）</span>
        </span>
      </label>
      <label>
        <input type="radio" name="c3" value="deliver" onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-accept">接受 Accept</span>
          <span class="radio-note">按计划交付，事后处理</span>
          <span class="radio-cost">法律风险最高</span>
          <span class="radio-cost">连带责任完全暴露</span>
        </span>
      </label>
    </div>
  </div>

  <!-- 3b: 法务核查投入强度滑块 -->
  <div class="sub-slider-row">
    <div class="param-label">
      <span class="param-name">法务核查投入强度</span>
      <span class="param-val" id="c3-legal-val">外部法律顾问</span>
    </div>
    <input type="range" min="1" max="3" step="1" value="2" id="c3-legal" oninput="onC3LegalChange()">
    <div class="slider-labels">
      <span>内部自查（¥0）</span>
      <span style="text-align:center">外部顾问（¥3,000）★</span>
      <span style="text-align:right">完整核查（¥8,000）</span>
    </div>
    <div class="slider-callout" id="c3-legal-callout">
      <span>法务成本：<strong id="c3-legal-cost">¥3,000</strong></span>
      <span>残余法律风险：<strong id="c3-residual-risk">10%</strong></span>
      <span id="c3-checklist-note" style="font-size:0.78rem"></span>
    </div>
    <div class="param-hint">法务投入越高，残余法律责任风险越低。若第一轮制定了版权检查清单，已有的尽职审查记录可显著降低各级别的残余风险——这正是前期规划的长期价值。</div>
  </div>
</div>

<!-- ── 课程闭环反思（五轮决策弧终点）── -->
<div class="reflection-section">
  <div class="reflection-title">🔁 课程闭环反思——四轮学习弧的终点</div>
  <div class="reflection-sub">
    今日三个危机，来自四轮不同的关键决策。回顾每一个决策节点：你们当时的选择，是否在今天发挥了作用？或者带来了代价？
  </div>
  <table class="reflection-table">
    <thead>
      <tr>
        <th>今日危机 / 约束</th>
        <th>来源决策</th>
        <th>今日资源与后果</th>
      </tr>
    </thead>
    <tbody id="reflection-body">
      <tr><td colspan="3" style="color:#aac">加载中……</td></tr>
    </tbody>
  </table>
  <div class="reflection-closing" id="reflection-closing">加载中……</div>
</div>

<!-- 实时综合影响预估 -->
<div class="preview-section">
  <div class="preview-title">📊 三危机应对综合影响预估</div>
  <div class="impact-grid">
    <div class="impact-item">
      <div class="impact-label">情况一：处置总成本</div>
      <div class="impact-val" id="iv-c1-cost">—</div>
      <div class="impact-sub" id="iv-c1-sub">—</div>
    </div>
    <div class="impact-item">
      <div class="impact-label">情况二：变更成本 + 策略影响</div>
      <div class="impact-val" id="iv-c2-rel">—</div>
      <div class="impact-sub" id="iv-c2-sub">—</div>
    </div>
    <div class="impact-item">
      <div class="impact-label">情况三：残余法律风险</div>
      <div class="impact-val" id="iv-c3-legal">—</div>
      <div class="impact-sub" id="iv-c3-sub">—</div>
    </div>
    <div class="impact-item">
      <div class="impact-label">工期影响</div>
      <div class="impact-val" id="iv-schedule">—</div>
      <div class="impact-sub" id="iv-schedule-sub">—</div>
    </div>
    <div class="impact-item">
      <div class="impact-label">最终客户满意度</div>
      <div class="impact-val" id="iv-sat">—</div>
      <div class="impact-sub">四轮综合</div>
    </div>
    <div class="impact-item">
      <div class="impact-label">PM 综合评分</div>
      <div class="impact-val" id="iv-score">—</div>
      <div class="impact-sub" id="iv-score-sub">四轮决策质量</div>
    </div>
  </div>
</div>

<!-- 摘要 -->
<div class="summary-section">
  <h3>📋 决策摘要（最终版 · 提交给教师）</h3>
  <div class="summary-box" id="summary-box">请填写小组名称并调整决策，摘要将自动生成。</div>
  <div>
    <button class="btn-primary" onclick="generateSummary()">生成最终摘要</button>
    <button class="btn-primary btn-copy" onclick="copySummary()">复制摘要</button>
    <span class="copy-feedback" id="copy-feedback">✓ 已复制</span>
  </div>
</div>

</div><!-- /sim-body -->

<script>
const GATE_CODE = 'CAT';

// 模块级继承状态
let r1MtRatio      = 45;   // 第一轮 MT 比例
let r3ContractBonus = 4;   // 第三轮合同加成分数（0/4/12）

function checkGate() {
  const val = document.getElementById('gate-input').value.trim().toUpperCase();
  if (val === GATE_CODE) {
    sessionStorage.setItem('r4_unlocked', '1');
    document.getElementById('gate-overlay').style.display = 'none';
    document.getElementById('main-body').style.display = 'block';
    loadPrevData();
    recalc();
  } else {
    document.getElementById('gate-error').textContent = '密码不正确，请等待教师公布。';
  }
}

// ─────────────────────────────────────────────
// 历史数据读取（含 R3 新字段）
// ─────────────────────────────────────────────
function loadPrevData() {
  try {
    const r1 = JSON.parse(localStorage.getItem('sim_r1')) || {};
    const r3 = JSON.parse(localStorage.getItem('sim_r3')) || {};
    let loaded = false;

    if (r1.group) {
      const gn = document.getElementById('group-name');
      if (!gn.value) gn.value = r1.group;
    }
    if (r1.riskPlan) { document.getElementById('r1-riskplan').value = r1.riskPlan; loaded = true; }
    if (typeof r1.mtRatio === 'number') r1MtRatio = r1.mtRatio;

    if (typeof r3.finalSatisfaction === 'number') {
      document.getElementById('r3-satisfaction').value =
        r3.finalSatisfaction >= 80 ? '80' : r3.finalSatisfaction >= 65 ? '65' : '50';
    }
    if (typeof r3.assetScore === 'number') {
      document.getElementById('r3-asset').value =
        r3.assetScore >= 80 ? '85' : r3.assetScore >= 60 ? '65' : '45';
    }
    // 新增 R3 字段
    if (r3.contractLevel) {
      document.getElementById('r3-contract').value = r3.contractLevel;
    }
    if (typeof r3.contractR4Bonus === 'number') {
      r3ContractBonus = r3.contractR4Bonus;
    }
    if (typeof r3.profitPressure === 'boolean') {
      document.getElementById('r3-profit').value = r3.profitPressure ? 'yes' : 'no';
    }

    if (loaded) document.getElementById('auto-badge').style.display = 'inline-block';
    onParamsChange();
  } catch(e) {}
}

// ─────────────────────────────────────────────
// 预案资源场景配置（调整 overhead 成本，与新译者规格滑块配合）
// ─────────────────────────────────────────────
const RISK_SCENARIOS = {
  detailed: {
    cardClass: 'res-green',
    title: '🟢 预案充分——三个危机均有应对依据',
    body: '由于第一轮制定了详细风险预案，今天面对三个危机时你们有清晰的行动框架：备选译者名单已就位，变更审批流程有文档依据，版权检查清单提供了责任边界。',
    c1: { status: '🟢 有备选译者清单', cls: 'res-available', detail: '到位成本 ¥1,500（1–2天）', overhead: 1500 },
    c2: { status: '🟢 有变更审批流程', cls: 'res-available', detail: '谈判时有合同依据' },
    c3: { status: '🟢 有版权检查清单', cls: 'res-available', detail: '有尽职审查记录' },
  },
  standard: {
    cardClass: 'res-yellow',
    title: '⚠ 预案部分充分——部分危机有依据，部分需临时处置',
    body: '第一轮制定了标准预案，识别了主要风险并给出了基本应对思路。但细节不足——今天面对危机时，有些能找到参照，有些需要临时拍板。',
    c1: { status: '🟡 有基本风险识别', cls: 'res-partial', detail: '到位成本 ¥5,500（4–6天）', overhead: 5500 },
    c2: { status: '🟡 口头变更约定', cls: 'res-partial', detail: '谈判时依据不足' },
    c3: { status: '🔴 无版权检查清单', cls: 'res-unavailable', detail: '责任边界不清晰' },
  },
  brief: {
    cardClass: 'res-red',
    title: '🔴 预案严重不足——三个危机都需要临时救火',
    body: '第一轮只列出了风险点，没有制定具体预案。今天三个危机同时爆发，团队没有任何预定资源可以调用，所有响应都是临时决策，时间和成本代价极高。',
    c1: { status: '🔴 无备选译者方案', cls: 'res-unavailable', detail: '到位成本 ¥13,000（7–10天）', overhead: 13000 },
    c2: { status: '🔴 无变更流程记录', cls: 'res-unavailable', detail: '客户可拒绝任何诉求' },
    c3: { status: '🔴 无版权审查机制', cls: 'res-unavailable', detail: '法律风险敞口完全暴露' },
  },
};

// ─────────────────────────────────────────────
// 决策配置
// ─────────────────────────────────────────────
const C1_CFG = {
  mitigate: { label: '启用备选译者（缓解）',  scheduleDelta: 0,  satDelta: +5  },
  transfer: { label: '分包给外部 LSP（转移）', scheduleDelta: 0,  satDelta: +3  },
  accept:   { label: '申请延期2周（接受）',     scheduleDelta: -2, satDelta: -10 },
};
const C2_CFG = {
  changereq: { label: '提交正式变更申请（规避）', satDeltaBase: -3 },
  negotiate: { label: '分步协商（缓解）',          satDeltaBase: +5 },
  absorb:    { label: '无偿吸收（接受）',           satDeltaBase: +8 },
};
const C3_CFG = {
  immediate: { label: '立即暂停+通知客户+法务核查（规避）', satDelta: -5, scheduleDelta: -0.5 },
  modify:    { label: '修改译文规避，不通知客户（缓解）',     satDelta: 0,  scheduleDelta: 0    },
  deliver:   { label: '按计划交付，事后处理（接受）',          satDelta: -2, scheduleDelta: 0    },
};

// 译者规格（缓解策略）
const TRANSLATOR_CFG = {
  1: { pricePerWord: 0.06, words: 22000, qaCost: 400,  qaNote: '+¥400 额外QA', label: '初级译者（¥0.06/字）' },
  2: { pricePerWord: 0.09, words: 22000, qaCost: 0,    qaNote: '标准QA',       label: '中级译者（¥0.09/字）' },
  3: { pricePerWord: 0.14, words: 22000, qaCost: -500, qaNote: '节省¥500 QA',  label: '资深译者（¥0.14/字）' },
};

// 外包套餐（转移策略）
const TRANSFER_PKG = {
  1: { cost: 10000, time: '3–5天', quality: '需额外QA',    label: '快速外包套餐（¥10,000）' },
  2: { cost: 12000, time: '1–3天', quality: '标准质量',    label: '标准外包套餐（¥12,000）' },
  3: { cost: 15000, time: '1–2天', quality: '质量优先',    label: '精品外包套餐（¥15,000）' },
};

// 追加6,000字 MT 数据（步长20%，共6档）
const MT_DATA = [
  { mt: 0,   cost: 480, days: 3.0, risk: 0  },
  { mt: 20,  cost: 390, days: 2.5, risk: 2  },
  { mt: 40,  cost: 300, days: 2.0, risk: 4  },
  { mt: 60,  cost: 210, days: 1.5, risk: 7  },
  { mt: 80,  cost: 150, days: 1.0, risk: 10 },
  { mt: 100, cost: 60,  days: 0.5, risk: 15 },
];

// 法务投入（无版权清单 / 有版权清单）
const LEGAL_CFG = {
  1: { cost: 0,    riskNo: 35, riskYes: 15, label: '内部自查（¥0）' },
  2: { cost: 3000, riskNo: 10, riskYes: 2,  label: '外部法律顾问（+¥3,000）' },
  3: { cost: 8000, riskNo: 3,  riskYes: 0,  label: '完整法律核查（+¥8,000）' },
};

// ─────────────────────────────────────────────
// Helper 函数
// ─────────────────────────────────────────────
function getRiskPlan()      { return document.getElementById('r1-riskplan').value; }
function getSat()           { return parseInt(document.getElementById('r3-satisfaction').value); }
function getAsset()         { return parseInt(document.getElementById('r3-asset').value); }
function getContractBonus() {
  const cl = document.getElementById('r3-contract').value;
  return cl === 'full' ? 12 : cl === 'standard' ? 4 : 0;
}
function getEmergencyBudget() {
  return document.getElementById('r3-profit').value === 'yes' ? 12000 : 20000;
}
function hasCopyrightChecklist() { return getRiskPlan() === 'detailed'; }

// ─────────────────────────────────────────────
// 策略变化触发子滑块显示/隐藏
// ─────────────────────────────────────────────
function onC1StrategyChange() {
  const c1 = (document.querySelector('input[name="c1"]:checked') || { value: 'mitigate' }).value;
  document.getElementById('c1-translator-row').style.display = c1 === 'mitigate' ? 'block' : 'none';
  document.getElementById('c1-transfer-row').style.display   = c1 === 'transfer'  ? 'block' : 'none';
  recalc();
}

function onC1LevelChange() {
  const level = parseInt(document.getElementById('c1-level').value);
  const cfg   = TRANSLATOR_CFG[level];
  const rp    = getRiskPlan();
  const overhead = RISK_SCENARIOS[rp].c1.overhead;
  const transCost = Math.round(cfg.pricePerWord * cfg.words);
  const totalCost = overhead + transCost + cfg.qaCost;
  document.getElementById('c1-level-val').textContent   = cfg.label;
  document.getElementById('cl-trans-cost').textContent  = '¥' + transCost.toLocaleString();
  document.getElementById('cl-qa-note').textContent     = cfg.qaNote;
  document.getElementById('cl-total-cost').textContent  = '¥' + Math.max(0, totalCost).toLocaleString();
  const callout = document.getElementById('c1-level-callout');
  callout.className = level === 3 ? 'slider-callout callout-ok' : level === 1 ? 'slider-callout callout-warn' : 'slider-callout';
  recalc();
}

function onC1TierChange() {
  const tier = parseInt(document.getElementById('c1-tier').value);
  const pkg  = TRANSFER_PKG[tier];
  document.getElementById('c1-tier-val').textContent  = pkg.label;
  document.getElementById('ct-cost').textContent      = '¥' + pkg.cost.toLocaleString();
  document.getElementById('ct-time').textContent      = pkg.time;
  document.getElementById('ct-quality').textContent   = pkg.quality;
  recalc();
}

function onC2MtChange() {
  const mt    = parseInt(document.getElementById('c2-mt').value);
  const entry = MT_DATA[mt / 20];
  document.getElementById('c2-mt-val').textContent      = mt === 0 ? '0%（全人工）' : mt === 100 ? '100%（纯MT）' : mt + '% MT + PE';
  document.getElementById('c2-trans-cost').textContent  = '¥' + entry.cost;
  document.getElementById('c2-trans-days').textContent  = entry.days + '天';
  document.getElementById('c2-trans-risk').textContent  = entry.risk + '%';
  const callout = document.getElementById('c2-mt-callout');
  callout.className = mt >= 60 ? 'slider-callout callout-warn' : mt === 0 ? 'slider-callout callout-ok' : 'slider-callout';
  // R1 MT 警告
  const warnEl = document.getElementById('c2-mt-warning');
  if (mt >= 60 && r1MtRatio >= 50) {
    warnEl.style.display = 'block';
    warnEl.textContent = `⚠ 你们第一轮 MT 比例为 ${r1MtRatio}%，第二轮已因此遭遇质量投诉——此处再次使用 ${mt}% MT 存在重蹈覆辙的风险，客户记忆犹新。`;
  } else {
    warnEl.style.display = 'none';
  }
  recalc();
}

function onC3LegalChange() {
  const level  = parseInt(document.getElementById('c3-legal').value);
  const cfg    = LEGAL_CFG[level];
  const hasChecklist = hasCopyrightChecklist();
  const residual = hasChecklist ? cfg.riskYes : cfg.riskNo;
  document.getElementById('c3-legal-val').textContent   = cfg.label;
  document.getElementById('c3-legal-cost').textContent  = cfg.cost > 0 ? '¥' + cfg.cost.toLocaleString() : '¥0';
  document.getElementById('c3-residual-risk').textContent = residual + '%';
  const noteEl = document.getElementById('c3-checklist-note');
  if (hasChecklist) {
    noteEl.textContent = '✅ R1版权清单有效，残余风险已大幅降低';
    noteEl.style.color = '#1e7e50';
  } else {
    noteEl.textContent = '❌ 无版权清单，残余风险较高';
    noteEl.style.color = '#c0392b';
  }
  const callout = document.getElementById('c3-legal-callout');
  callout.className = residual === 0 ? 'slider-callout callout-ok' : residual <= 5 ? 'slider-callout callout-ok' : residual <= 15 ? 'slider-callout' : 'slider-callout callout-warn';
  recalc();
}

// ─────────────────────────────────────────────
// 参数变化（继承面板联动）
// ─────────────────────────────────────────────
function onParamsChange() {
  const rp = getRiskPlan();
  const sc = RISK_SCENARIOS[rp];

  // 资源卡
  const card = document.getElementById('resource-card');
  card.className = 'resource-card ' + sc.cardClass;
  document.getElementById('res-title').textContent = sc.title;
  document.getElementById('res-body').textContent  = sc.body;
  [['c1', sc.c1], ['c2', sc.c2], ['c3', sc.c3]].forEach(([id, r]) => {
    const el = document.getElementById('res-' + id + '-status');
    el.textContent = r.status; el.className = r.cls;
    document.getElementById('res-' + id + '-detail').textContent = r.detail;
  });

  // 状态栏
  const resEl = document.getElementById('stat-resource');
  resEl.textContent = rp === 'detailed' ? '丰富' : rp === 'standard' ? '有限' : '极少';
  resEl.style.color = rp === 'detailed' ? '#27ae60' : rp === 'standard' ? '#e67e22' : '#c0392b';

  const sat = getSat();
  const satEl = document.getElementById('stat-sat');
  satEl.textContent = sat + ' 分';
  satEl.style.color = sat >= 75 ? '#27ae60' : sat >= 60 ? '#e67e22' : '#c0392b';

  const budget = getEmergencyBudget();
  const statBudgetEl = document.getElementById('stat-budget');
  statBudgetEl.textContent = '¥' + budget.toLocaleString();
  statBudgetEl.style.color = budget >= 20000 ? '#27ae60' : '#e67e22';
  document.getElementById('stat-budget-sub').textContent = budget < 20000 ? '受R3折扣压缩' : '正常水位';

  // 预算池徽章
  const badgeEl = document.getElementById('budget-badge');
  const profitPressure = document.getElementById('r3-profit').value === 'yes';
  if (profitPressure) {
    badgeEl.textContent = '⚠ 利润压力，仅¥12,000';
    badgeEl.className = 'budget-pressure-badge bp-tight';
  } else {
    badgeEl.textContent = '正常，¥20,000';
    badgeEl.className = 'budget-pressure-badge bp-normal';
  }
  document.getElementById('budget-available').textContent = '¥' + budget.toLocaleString();

  // 更新情况一缓解选项成本提示
  document.getElementById('c1-mitigate-note').textContent =
    `基础到位成本：¥${sc.c1.overhead.toLocaleString()}（${rp === 'detailed' ? '有清单，1–2天' : rp === 'standard' ? '无名单，4–6天' : '从零招募，7–10天'})`;

  // 情况一 sub-slider 同步更新
  onC1LevelChange();
  onC1TierChange();

  // 情况二合同加成徽章
  updateC2ContractBadge();
  // 情况二 hint
  updateC2Hint();
  // 情况三 hint + sub-slider
  updateC3Hint();
  onC3LegalChange();

  updateReflection();
  recalc();
}

function updateC2ContractBadge() {
  const bonus = getContractBonus();
  const cl    = document.getElementById('r3-contract').value;
  const row   = document.getElementById('c2-contract-badge-row');
  if (bonus >= 10) {
    row.innerHTML = `<span class="contract-badge cb-strong">✅ R3 完整合同 CCM 条款有效——提交正式变更申请时，谈判强势（规避策略满意度额外 +${Math.round(bonus*0.5)}分）</span>`;
  } else if (bonus >= 3) {
    row.innerHTML = `<span class="contract-badge cb-mid">⚠ R3 标准合同——基础变更依据，谈判效果有限（规避策略满意度额外 +${Math.round(bonus*0.5)}分）</span>`;
  } else {
    row.innerHTML = `<span class="contract-badge cb-weak">❌ R3 精简合同——无书面变更保护，规避策略效果大打折扣（无额外加成）</span>`;
  }

  // 同步更新单选提示
  const noteEl = document.getElementById('c2-changereq-note');
  if (bonus >= 10) noteEl.textContent = '✅ 合同CCM条款完整，强势';
  else if (bonus >= 3) noteEl.textContent = '⚠ 合同依据有限，一般';
  else noteEl.textContent = '❌ 无书面依据，被动';
}

function updateC2Hint() {
  const rp = getRiskPlan();
  const sc = RISK_SCENARIOS[rp];
  const bonus = getContractBonus();
  const c2Hint = document.getElementById('c2-hint');

  let planPart = '';
  if (sc.c2.cls === 'res-available') {
    planPart = `<span class="avail">✅ R1有变更审批流程文档</span>——可引用合同"范围变更条款"，引导客户走正式流程。`;
  } else if (sc.c2.cls === 'res-partial') {
    planPart = `<span class="noavail">⚠ R1仅有口头约定</span>——缺乏书面变更流程，谈判时难以引用合同条款。`;
  } else {
    planPart = `<span class="noavail">❌ R1无变更管理流程</span>——客户认为追加文本是合理要求，没有书面依据可以拒绝。`;
  }
  let contractPart = '';
  if (bonus >= 10) contractPart = `<br><span class="avail">✅ R3完整合同条款</span>——可引用 CCM 条款，正式变更申请具有强约束力。`;
  else if (bonus >= 3) contractPart = `<br><span class="noavail">⚠ R3标准合同</span>——有基础变更描述，但缺乏完整 CCM 细节。`;
  else contractPart = `<br><span class="noavail">❌ R3精简合同</span>——无变更管控条款，客户可坚持无偿要求。`;

  c2Hint.innerHTML = planPart + contractPart;
}

function updateC3Hint() {
  const rp = getRiskPlan();
  const sc = RISK_SCENARIOS[rp];
  const c3Hint = document.getElementById('c3-hint');
  if (sc.c3.cls === 'res-available') {
    c3Hint.innerHTML = `<span class="avail">✅ R1有版权检查清单</span>——已有尽职审查记录，可向客户证明"我方已尽职审核"，有效降低各级法务投入的残余风险。`;
  } else {
    c3Hint.innerHTML = `<span class="noavail">❌ R1无版权检查清单</span>——无法证明已进行过版权尽职审查，各级法务投入的残余风险均偏高。这是本轮影响最深远的预案缺失。`;
  }
}

// ─────────────────────────────────────────────
// 闭环反思更新（5行：3行R1+2行R3）
// ─────────────────────────────────────────────
function updateReflection() {
  const rp    = getRiskPlan();
  const sc    = RISK_SCENARIOS[rp];
  const bonus = getContractBonus();
  const profitPressure = document.getElementById('r3-profit').value === 'yes';
  const budget = getEmergencyBudget();
  const cl    = document.getElementById('r3-contract').value;
  const clLabel = cl === 'full' ? '完整条款套装' : cl === 'standard' ? '标准合同模板' : '精简合同';

  const rows = [
    {
      crisis: '主译者住院（人员风险）',
      source: '第一轮：风险预案质量',
      plan: rp === 'detailed' ? '✅ 有备选译者清单' : rp === 'standard' ? '⚠ 有基本识别，无名单' : '❌ 仅列风险点',
      resultClass: sc.c1.cls === 'res-available' ? 'ref-result-good' : sc.c1.cls === 'res-partial' ? 'ref-result-mid' : 'ref-result-bad',
      result: sc.c1.cls === 'res-available' ? `到位成本¥1,500，1–2天快速响应` : sc.c1.cls === 'res-partial' ? `临时招募¥5,500，需4–6天` : `从零救火¥13,000，需7–10天`,
    },
    {
      crisis: '客户追加文本（变更风险）',
      source: '第一轮：风险预案质量',
      plan: rp === 'detailed' ? '✅ 有变更审批流程文档' : rp === 'standard' ? '⚠ 有基本变更意识' : '❌ 未识别此类风险',
      resultClass: sc.c2.cls === 'res-available' ? 'ref-result-good' : sc.c2.cls === 'res-partial' ? 'ref-result-mid' : 'ref-result-bad',
      result: sc.c2.cls === 'res-available' ? '谈判有R1预案依据' : sc.c2.cls === 'res-partial' ? 'R1依据不足，需配合R3合同' : '无R1预案，依赖R3合同条款',
    },
    {
      crisis: '版权侵权风险（合规风险）',
      source: '第一轮：风险预案质量',
      plan: rp === 'detailed' ? '✅ 有版权内容检查清单' : '❌ 未将版权风险纳入预案',
      resultClass: sc.c3.cls === 'res-available' ? 'ref-result-good' : 'ref-result-bad',
      result: sc.c3.cls === 'res-available' ? '有尽职审查证明，各级法务投入效果加倍' : '无检查清单，法律风险敞口更大',
    },
    {
      crisis: '情况二变更谈判筹码',
      source: '第三轮：续集合同保障条款（决策5）',
      plan: clLabel,
      resultClass: bonus >= 10 ? 'ref-result-good' : bonus >= 3 ? 'ref-result-mid' : 'ref-result-bad',
      result: bonus >= 10 ? 'CCM条款强势，规避策略额外+6分' : bonus >= 3 ? '基础依据，谈判效果有限（+2分）' : '无书面保护，规避策略效果大打折扣（+0分）',
    },
    {
      crisis: '三危机紧急预算充裕度',
      source: '第三轮：TM折扣报价策略（决策4）',
      plan: profitPressure ? 'TM折扣≥50%，利润压缩' : 'TM折扣＜50%，利润正常',
      resultClass: profitPressure ? 'ref-result-bad' : 'ref-result-good',
      result: profitPressure ? `紧急储备仅¥12,000，超支将损及利润` : `紧急储备¥20,000，应对空间充裕`,
    },
  ];

  const tbody = document.getElementById('reflection-body');
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td><span class="ref-crisis">${r.crisis}</span><br><span style="font-size:0.72rem;color:#778;font-style:italic">${r.source}</span></td>
      <td><span class="ref-plan">${r.plan}</span></td>
      <td><span class="${r.resultClass}">${r.result}</span></td>
    </tr>`).join('');

  const allGood = rp === 'detailed' && bonus >= 10 && !profitPressure;
  const allBad  = rp === 'brief'    && bonus === 0 && profitPressure;
  const closings = {
    allGood: '你们四轮的决策形成了一个完整的正向链条——第一轮的风险预案、第三轮的合同条款与合理定价，在今天的三个危机中全部发挥了作用。这就是前瞻性项目管理（Proactive PM）的价值：危机不可避免，但准备让你们以最低成本、最快速度、最专业的姿态应对。',
    allBad:  '四轮决策的代价今天全部浮现：第一轮没有预案，第三轮的合同没有保护，过高的TM折扣压缩了紧急储备——三个危机同时爆发，你们几乎没有任何工具可用。PMBOK将风险管理放在"规划过程组"，今天你们体验到了为什么。',
    default: `第一轮预案质量（${rp}）和第三轮合同决策共同决定了今天的应对资源。你们在某些方面有所准备，但也有遗漏。风险管理的价值不只在于识别风险，更在于为每个风险准备足够细化的应对资源——今天体验到的，正是四轮决策链的真实后果。`,
  };
  document.getElementById('reflection-closing').textContent =
    allGood ? closings.allGood : allBad ? closings.allBad : closings.default;
}

// ─────────────────────────────────────────────
// 预算池可视化
// ─────────────────────────────────────────────
function updateBudgetPool(totalCost, budget) {
  const pct    = Math.min(100, Math.round(totalCost / budget * 100));
  const over   = Math.max(0, totalCost - budget);
  const fillEl = document.getElementById('budget-bar-fill');
  fillEl.style.width = pct + '%';
  fillEl.className   = 'budget-bar-fill' + (over > 0 ? ' budget-bar-over' : '');
  document.getElementById('budget-used').textContent   = '¥' + totalCost.toLocaleString();
  document.getElementById('budget-remain').textContent =
    over > 0 ? '−¥' + over.toLocaleString() : '¥' + (budget - totalCost).toLocaleString();
  const warnEl = document.getElementById('budget-warn');
  if (over > 0) {
    warnEl.classList.add('show');
    document.getElementById('budget-over-amt').textContent = '¥' + over.toLocaleString();
  } else {
    warnEl.classList.remove('show');
  }
}

// ─────────────────────────────────────────────
// 核心重算
// ─────────────────────────────────────────────
function recalc() {
  const rp    = getRiskPlan();
  const sc    = RISK_SCENARIOS[rp];
  const sat   = getSat();
  const asset = getAsset();
  const contractBonus  = getContractBonus();
  const budget         = getEmergencyBudget();
  const hasCopyright   = hasCopyrightChecklist();

  const c1 = (document.querySelector('input[name="c1"]:checked') || { value: 'mitigate' }).value;
  const c2 = (document.querySelector('input[name="c2"]:checked') || { value: 'changereq' }).value;
  const c3 = (document.querySelector('input[name="c3"]:checked') || { value: 'immediate' }).value;
  const c1Level   = parseInt(document.getElementById('c1-level').value);
  const c1Tier    = parseInt(document.getElementById('c1-tier').value);
  const c2Mt      = parseInt(document.getElementById('c2-mt').value);
  const c3Legal   = parseInt(document.getElementById('c3-legal').value);

  // ── 成本计算 ──
  let c1Cost = 0;
  if (c1 === 'mitigate') {
    const tlCfg = TRANSLATOR_CFG[c1Level];
    c1Cost = sc.c1.overhead + Math.round(tlCfg.pricePerWord * tlCfg.words) + tlCfg.qaCost;
  } else if (c1 === 'transfer') {
    c1Cost = TRANSFER_PKG[c1Tier].cost;
  }

  const mtEntry = MT_DATA[c2Mt / 20];
  const c2TransCost = mtEntry.cost;

  const legalCfg  = LEGAL_CFG[c3Legal];
  const c3Cost    = legalCfg.cost;
  const residualRisk = hasCopyright ? legalCfg.riskYes : legalCfg.riskNo;

  const totalCost  = c1Cost + c2TransCost + c3Cost;
  const overBudget = totalCost > budget;
  updateBudgetPool(totalCost, budget);

  // ── 满意度计算 ──
  const c2SatDelta = C2_CFG[c2].satDeltaBase + (c2 === 'changereq' ? Math.round(contractBonus * 0.5) : 0);
  const satDelta   = C1_CFG[c1].satDelta + c2SatDelta + C3_CFG[c3].satDelta;
  const finalSat   = Math.min(95, Math.max(20, sat + satDelta));

  // ── 工期 ──
  const schedDelta = (C1_CFG[c1].scheduleDelta || 0) + (C3_CFG[c3].scheduleDelta || 0);

  // ── PM 评分 ──
  const riskScore     = { detailed: 35, standard: 22, brief: 8 }[rp];
  const c1Score       = c1 === 'mitigate' ? (c1Level === 3 ? 15 : c1Level === 2 ? 12 : 8)
                      : c1 === 'transfer' ? (8 + c1Tier - 1)
                      : 3;
  const c2StratScore  = c2 === 'changereq' ? 12 : c2 === 'negotiate' ? 9 : 4;
  const c2ContractAdd = Math.round(contractBonus * 0.5);
  const c2Score       = c2StratScore + c2ContractAdd;
  const c3StratScore  = c3 === 'immediate' ? 10 : c3 === 'modify' ? 4 : 0;
  const c3LegalScore  = c3Legal === 3 ? 6 : c3Legal === 2 ? 4 : 1;
  const c3Score       = c3StratScore + c3LegalScore;
  const assetContrib  = Math.round(asset / 100 * 8);
  const budgetPenalty = overBudget ? -10 : 0;
  const pmScore       = Math.min(100, riskScore + c1Score + c2Score + c3Score + assetContrib + budgetPenalty);

  // ── 更新影响预估区 ──
  const c1Label = c1 === 'mitigate' ? TRANSLATOR_CFG[c1Level].label : c1 === 'transfer' ? TRANSFER_PKG[c1Tier].label : '申请延期（¥0）';
  const c1CostEl = document.getElementById('iv-c1-cost');
  c1CostEl.textContent = '¥' + Math.max(0, c1Cost).toLocaleString();
  c1CostEl.className   = 'impact-val ' + (c1Cost > 12000 ? 'color-red' : c1Cost > 6000 ? 'color-orange' : 'color-green');
  document.getElementById('iv-c1-sub').textContent = C1_CFG[c1].label + (c1 !== 'accept' ? '（' + c1Label + '）' : '');

  const c2RelEl = document.getElementById('iv-c2-rel');
  c2RelEl.textContent = (c2SatDelta >= 0 ? '+' : '') + c2SatDelta + '分 · 翻译¥' + c2TransCost;
  c2RelEl.className   = 'impact-val ' + (c2SatDelta >= 5 ? 'color-green' : c2SatDelta >= 0 ? 'color-orange' : 'color-red');
  document.getElementById('iv-c2-sub').textContent = C2_CFG[c2].label + '，MT' + c2Mt + '%';

  const legalLabel = residualRisk === 0 ? '低（已消除）' : residualRisk <= 5 ? '极低（' + residualRisk + '%）' : residualRisk <= 15 ? '中（' + residualRisk + '%）' : '高（' + residualRisk + '%）';
  const c3LegalEl  = document.getElementById('iv-c3-legal');
  c3LegalEl.textContent = legalLabel;
  c3LegalEl.className   = 'impact-val ' + (residualRisk === 0 ? 'color-green' : residualRisk <= 10 ? 'color-green' : residualRisk <= 20 ? 'color-orange' : 'color-red');
  document.getElementById('iv-c3-sub').textContent = C3_CFG[c3].label.split('（')[0] + ' · ' + legalCfg.label;

  const schedEl = document.getElementById('iv-schedule');
  schedEl.textContent = schedDelta < 0 ? schedDelta + ' 周' : '不受影响';
  schedEl.className   = 'impact-val ' + (schedDelta < -1 ? 'color-red' : schedDelta < 0 ? 'color-orange' : 'color-green');
  document.getElementById('iv-schedule-sub').textContent = schedDelta < 0 ? '上线节点延误，需告知发行商' : '按计划交付';

  const satEl2 = document.getElementById('iv-sat');
  satEl2.textContent = finalSat + ' 分';
  satEl2.className   = 'impact-val ' + (finalSat >= 75 ? 'color-green' : finalSat >= 60 ? 'color-orange' : 'color-red');

  const scoreEl = document.getElementById('iv-score');
  scoreEl.textContent = pmScore + ' / 100';
  scoreEl.className   = 'impact-val ' + (pmScore >= 80 ? 'color-green' : pmScore >= 60 ? 'color-blue' : 'color-orange');
  document.getElementById('iv-score-sub').textContent =
    pmScore >= 80 ? '优秀 PM 决策' : pmScore >= 60 ? '合格，有提升空间' : '需要系统性加强';

  document.getElementById('stat-score').textContent = pmScore + ' 分';
  document.getElementById('stat-score').style.color =
    pmScore >= 80 ? '#27ae60' : pmScore >= 60 ? '#2c6bac' : '#e67e22';

  updateSummary();
}

// ─────────────────────────────────────────────
// 摘要生成
// ─────────────────────────────────────────────
function generateSummary() { recalc(); }

function updateSummary() {
  const rp    = getRiskPlan();
  const sat   = getSat();
  const asset = getAsset();
  const sc    = RISK_SCENARIOS[rp];
  const contractBonus  = getContractBonus();
  const budget         = getEmergencyBudget();
  const hasCopyright   = hasCopyrightChecklist();
  const profitPressure = document.getElementById('r3-profit').value === 'yes';

  const c1 = (document.querySelector('input[name="c1"]:checked') || { value: 'mitigate' }).value;
  const c2 = (document.querySelector('input[name="c2"]:checked') || { value: 'changereq' }).value;
  const c3 = (document.querySelector('input[name="c3"]:checked') || { value: 'immediate' }).value;
  const c1Level = parseInt(document.getElementById('c1-level').value);
  const c1Tier  = parseInt(document.getElementById('c1-tier').value);
  const c2Mt    = parseInt(document.getElementById('c2-mt').value);
  const c3Legal = parseInt(document.getElementById('c3-legal').value);

  let c1Cost = 0;
  if (c1 === 'mitigate') {
    const tlCfg = TRANSLATOR_CFG[c1Level];
    c1Cost = sc.c1.overhead + Math.round(tlCfg.pricePerWord * tlCfg.words) + tlCfg.qaCost;
  } else if (c1 === 'transfer') {
    c1Cost = TRANSFER_PKG[c1Tier].cost;
  }

  const mtEntry       = MT_DATA[c2Mt / 20];
  const c2TransCost   = mtEntry.cost;
  const legalCfg      = LEGAL_CFG[c3Legal];
  const c3Cost        = legalCfg.cost;
  const residualRisk  = hasCopyright ? legalCfg.riskYes : legalCfg.riskNo;
  const totalCost     = c1Cost + c2TransCost + c3Cost;
  const overBudget    = totalCost > budget;

  const c2SatDelta    = C2_CFG[c2].satDeltaBase + (c2 === 'changereq' ? Math.round(contractBonus * 0.5) : 0);
  const satDelta      = C1_CFG[c1].satDelta + c2SatDelta + C3_CFG[c3].satDelta;
  const finalSat      = Math.min(95, Math.max(20, sat + satDelta));
  const schedDelta    = (C1_CFG[c1].scheduleDelta || 0) + (C3_CFG[c3].scheduleDelta || 0);

  const riskScore     = { detailed: 35, standard: 22, brief: 8 }[rp];
  const c1Score       = c1 === 'mitigate' ? (c1Level === 3 ? 15 : c1Level === 2 ? 12 : 8) : c1 === 'transfer' ? (8 + c1Tier - 1) : 3;
  const c2Score       = (c2 === 'changereq' ? 12 : c2 === 'negotiate' ? 9 : 4) + Math.round(contractBonus * 0.5);
  const c3Score       = (c3 === 'immediate' ? 10 : c3 === 'modify' ? 4 : 0) + (c3Legal === 3 ? 6 : c3Legal === 2 ? 4 : 1);
  const assetContrib  = Math.round(asset / 100 * 8);
  const pmScore       = Math.min(100, riskScore + c1Score + c2Score + c3Score + assetContrib + (overBudget ? -10 : 0));

  const rpLabel   = { detailed: '详细预案（丰富）', standard: '标准预案（有限）', brief: '简略预案（极少）' };
  const clLabel   = { full: '完整条款套装', standard: '标准合同模板', minimal: '精简合同' };
  const c1Detail  = c1 === 'mitigate' ? TRANSLATOR_CFG[c1Level].label : c1 === 'transfer' ? TRANSFER_PKG[c1Tier].label : '申请延期';
  const emoji     = (n, hi, mid) => n >= hi ? '🟢' : n >= mid ? '🟡' : '🔴';
  const group     = document.getElementById('group-name').value.trim() || '（未填写小组名）';
  const now       = new Date().toLocaleString('zh-CN', { hour12: false });
  const cl        = document.getElementById('r3-contract').value;

  const text = [
    '═══════════════════════════════════════════',
    '  翻译项目沙盘 · 第四轮决策摘要（最终版）',
    '═══════════════════════════════════════════',
    `  小组名称：${group}`,
    `  提交时间：${now}`,
    '───────────────────────────────────────────',
    '  【进入本轮的关键参数】',
    `  · 第一轮风险预案：${rpLabel[rp]}`,
    `  · 进入本轮客户满意度：${sat} 分`,
    `  · 第三轮合同保障等级：${clLabel[cl] || cl}（谈判加成 +${Math.round(contractBonus*0.5)}分）`,
    `  · 第三轮利润压力：${profitPressure ? '有（TM折扣≥50%，储备¥12,000）' : '无（储备¥20,000）'}`,
    '',
    '  【三危机应对决策】',
    `  · 情况一（人员风险）：${C1_CFG[c1].label}`,
    `    └ 规格/套餐：${c1Detail}，处置成本 ¥${Math.max(0, c1Cost).toLocaleString()}`,
    `  · 情况二（需求变更）：${C2_CFG[c2].label}`,
    `    └ 6,000字翻译方式：MT${c2Mt}%，成本¥${c2TransCost}，用时${mtEntry.days}天，质量风险${mtEntry.risk}%`,
    `  · 情况三（合规风险）：${C3_CFG[c3].label.split('（')[0]}`,
    `    └ 法务投入：${legalCfg.label}，残余法律风险 ${residualRisk}%`,
    '',
    `  三危机总处置成本：¥${totalCost.toLocaleString()} / 可用¥${budget.toLocaleString()}  ${overBudget ? '🔴 超支' : '🟢 未超支'}`,
    '',
    '  【本轮综合影响】',
    `  · 客户满意度变化：${satDelta >= 0 ? '+' : ''}${satDelta} 分 → 最终 ${finalSat} 分  ${emoji(finalSat, 75, 60)}`,
    `  · 工期影响：${schedDelta < 0 ? schedDelta + ' 周（延误）' : '按计划交付'}  ${emoji(schedDelta, 0, -1)}`,
    `  · PM 综合评分：${pmScore} / 100  ${emoji(pmScore, 80, 60)}`,
    `    （R1预案${riskScore}+情况一${c1Score}+情况二${c2Score}+情况三${c3Score}+资产${assetContrib}${overBudget ? '-10超预算' : ''}）`,
    '───────────────────────────────────────────',
    '  ★ 四轮因果链闭环',
    `  · R1预案 → 今日到位成本：${rp === 'detailed' ? '¥1,500（低）' : rp === 'standard' ? '¥5,500（中）' : '¥13,000（高）'}`,
    `  · R3合同 → 今日变更谈判：${contractBonus >= 10 ? '强势' : contractBonus >= 3 ? '一般' : '被动'}`,
    `  · R3折扣 → 今日预算池：${profitPressure ? '¥12,000受限' : '¥20,000充裕'}`,
    `  · R1版权清单 → 今日法律风险：${hasCopyright ? '各级投入效果加倍' : '无清单，风险偏高'}`,
    '═══════════════════════════════════════════',
  ].join('\n');

  document.getElementById('summary-box').textContent = text;

  try {
    localStorage.setItem('sim_r4', JSON.stringify({
      group, pmScore, finalSat, rp,
      c1, c1Level, c1Tier,
      c2, c2Mt,
      c3, c3Legal,
      totalCrisisCost: totalCost,
      overBudget,
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

// ─────────────────────────────────────────────
// 初始化
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('r4_unlocked') === '1') {
    document.getElementById('gate-overlay').style.display = 'none';
    document.getElementById('main-body').style.display = 'block';
    loadPrevData();
    recalc();
  }
  // 初始化子滑块显示状态
  onC1StrategyChange();
  onC2MtChange();
  onC3LegalChange();
});
</script>
