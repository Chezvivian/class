---
layout: default
title: 本地化项目管理第三轮：翻译资产管理
permalink: /localization-sim-r3/
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
.prev-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;
}
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

/* ── 资产状态卡 ── */
.asset-card {
  border-radius: 12px; padding: 1.3rem 1.5rem; margin-bottom: 1.5rem; border: 2px solid;
}
.asset-green  { background: #eafaf1; border-color: #27ae60; }
.asset-yellow { background: #fffbf0; border-color: #f0a500; }
.asset-red    { background: #fef0f0; border-color: #e74c3c; }
.asset-title  { font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; }
.asset-body   { font-size: 0.87rem; color: #444; line-height: 1.65; margin-bottom: 0.9rem; }
.asset-metrics { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.asset-metric {
  flex: 1; min-width: 5rem; text-align: center;
  background: rgba(255,255,255,0.75); border-radius: 8px;
  padding: 0.5rem 0.4rem; font-size: 0.78rem;
}
.asset-metric-val { font-size: 1.3rem; font-weight: 700; line-height: 1; }
.asset-metric-lbl { font-size: 0.68rem; color: #666; margin-top: 0.2rem; }

/* ── 情景邮件 ── */
.email-card {
  background: #f0f8f5; border: 1px solid #a0d8c0;
  border-left: 5px solid #27ae60;
  border-radius: 0 10px 10px 0;
  padding: 1.25rem 1.5rem; margin-bottom: 1.75rem;
}
.email-meta { font-size: 0.8rem; color: #888; margin-bottom: 0.6rem; line-height: 1.7; }
.email-meta span { font-weight: 600; color: #555; }
.email-body { font-size: 0.9rem; line-height: 1.75; color: #333; }
.email-task {
  margin-top: 0.75rem; padding: 0.6rem 0.9rem;
  background: #d8f5ea; border-radius: 6px;
  font-weight: 600; font-size: 0.9rem; color: #1a6040;
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

/* ── ROI 计算器 ── */
.roi-section {
  background: #f8f5ff; border: 1.5px solid #c8aaf0;
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-bottom: 1.25rem;
}
.roi-title {
  font-size: 0.95rem; font-weight: 700; color: #4a0f90;
  margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;
}
.roi-table { font-size: 0.85rem; width: 100%; border-collapse: collapse; }
.roi-table tr:not(:last-child) td { border-bottom: 1px solid #e0d8f5; }
.roi-table td { padding: 0.4rem 0.5rem; }
.roi-table td:last-child { text-align: right; font-weight: 600; }
.roi-row-positive td:last-child { color: #27ae60; }
.roi-row-negative td:last-child { color: #e74c3c; }
.roi-total {
  display: flex; justify-content: space-between; align-items: baseline;
  font-weight: 700; font-size: 1rem; margin-top: 0.7rem;
  padding-top: 0.5rem; border-top: 2px solid #8e44ad; color: #4a0f90;
}
.roi-badge {
  display: inline-block; font-size: 1.1rem; font-weight: 700;
  padding: 0.2rem 0.8rem; border-radius: 6px; margin-left: 0.5rem;
}
.roi-positive { background: #d4efdf; color: #1e7e50; }
.roi-negative { background: #fdecea; color: #c0392b; }
.roi-compare {
  margin-top: 0.8rem; padding: 0.65rem 0.85rem;
  background: rgba(255,255,255,0.6); border-radius: 8px;
  font-size: 0.78rem; color: #666; line-height: 1.6;
}

/* ── 决策分区卡片 ── */
.d-card {
  background: white; border: 1.5px solid #e0e6f0;
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-bottom: 1.1rem;
}
.d-card-title {
  font-size: 0.95rem; font-weight: 700; color: #1a2f50;
  margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
}
.param-row { margin-bottom: 1.3rem; }
.param-row:last-child { margin-bottom: 0; }
.param-label {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 0.88rem; font-weight: 600; color: #444; margin-bottom: 0.4rem;
}
.param-name { font-weight: 600; }
.param-val  { font-size: 1rem; font-weight: 700; color: #2c6bac; min-width: 4rem; text-align: right; }
.param-hint { font-size: 0.75rem; color: #888; margin-top: 0.4rem; line-height: 1.5; }

/* ── 单选按钮组 ── */
.radio-group { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.radio-group label { flex: 1; min-width: 9rem; }
.radio-group input[type=radio] { display: none; }
.radio-group .radio-btn {
  display: block; text-align: center; padding: 0.65rem 0.5rem;
  border: 2px solid #dde4f0; border-radius: 8px; cursor: pointer;
  font-size: 0.83rem; color: #666; transition: all 0.15s; line-height: 1.35;
}
.radio-group input[type=radio]:checked + .radio-btn {
  border-color: #2c6bac; background: #eaf2ff; color: #1a4f90; font-weight: 600;
}
.radio-cost  { display: block; font-size: 0.78rem; font-weight: 700; color: #c0392b; margin-top: 0.2rem; }
.radio-gain  { display: block; font-size: 0.78rem; font-weight: 700; color: #27ae60; margin-top: 0.2rem; }
.radio-note  { display: block; font-size: 0.72rem; color: #888; margin-top: 0.15rem; }

/* ── 滑块控件 ── */
input[type=range] {
  -webkit-appearance: none; appearance: none; width: 100%; height: 6px;
  border-radius: 3px; background: #dde4f0; outline: none; cursor: pointer; margin: 0.3rem 0;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none; width: 20px; height: 20px;
  border-radius: 50%; background: #2c6bac; cursor: pointer;
  border: 2px solid white; box-shadow: 0 1px 4px rgba(44,107,172,0.4);
}
input[type=range]::-moz-range-thumb {
  width: 20px; height: 20px; border-radius: 50%; background: #2c6bac; cursor: pointer;
  border: 2px solid white; box-shadow: 0 1px 4px rgba(44,107,172,0.4);
}
.slider-labels {
  display: flex; justify-content: space-between;
  font-size: 0.68rem; color: #aaa; margin-top: 0.2rem;
}
.slider-callout {
  background: #eaf2ff; border: 1.5px solid #b8d0ee; border-radius: 8px;
  padding: 0.65rem 1rem; margin-top: 0.6rem; font-size: 0.82rem; color: #1a4f90;
  display: flex; gap: 1.2rem; flex-wrap: wrap; align-items: center;
}
.slider-callout strong { font-size: 1rem; }
.callout-warn {
  background: #fff8f0; border-color: #f5c87a; color: #8a4000;
}

/* ── 联动标签 ── */
.consequence-tag {
  display: inline-block; font-size: 0.7rem; font-weight: 700;
  padding: 0.15rem 0.55rem; border-radius: 4px;
}
.tag-r4 { background: #fdecea; color: #c0392b; border: 1px solid #f5b8b8; }
.tag-r4-pos { background: #e8f8f0; color: #1e7e50; border: 1px solid #a8dfc0; }

/* ── 实时预览 ── */
.preview-section {
  background: #f0f4fb; border: 1.5px solid #c8d8ee;
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-bottom: 1.1rem;
}
.preview-title { font-size: 0.95rem; font-weight: 700; color: #1a2f50; margin-bottom: 1rem; }
.delta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.delta-item {
  background: white; border-radius: 8px; padding: 0.75rem 0.9rem;
  border: 1px solid #dde4f0;
}
.delta-label { font-size: 0.72rem; color: #888; margin-bottom: 0.25rem; }
.delta-val   { font-size: 1.1rem; font-weight: 700; }
.delta-sub   { font-size: 0.72rem; color: #aaa; margin-top: 0.1rem; }
.impact-positive { color: #27ae60; }
.impact-negative { color: #e74c3c; }
.impact-neutral  { color: #2c6bac; }
.impact-warn     { color: #e67e22; }

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
.btn-next { background: #c0392b; margin-left: 0.6rem; }
.btn-next:hover { background: #a93226; }
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

@media (max-width: 640px) {
  .status-grid { grid-template-columns: 1fr 1fr; }
  .prev-grid   { grid-template-columns: 1fr; }
  .delta-grid  { grid-template-columns: 1fr 1fr; }
}
</style>

<!-- ── 密码门 ── -->
<div id="gate-overlay" class="gate-overlay">
  <div class="gate-box">
    <h2>🔒 第三轮已锁定</h2>
    <p>请等待教师宣布第二轮结束后<br>输入解锁密码进入第三轮。</p>
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
  <div class="round-tab active">第三轮 · 资产管理</div>
  <div class="round-tab locked">第四轮 · 风险应对</div>
</div>

<!-- 参数继承面板 -->
<div class="prev-panel">
  <div class="prev-panel-title">
    📥 继承自历史轮次的关键参数
    <span class="auto-badge" id="auto-badge" style="display:none">已自动读取</span>
  </div>
  <div class="prev-grid">
    <div class="prev-field">
      <label>第一轮：术语库建立时机</label>
      <select id="r1-glossary" onchange="onParamsChange()">
        <option value="early" selected>第1周建立（规范型）</option>
        <option value="during">翻译中积累（混合型）</option>
        <option value="none">未建立（混乱型）</option>
      </select>
    </div>
    <div class="prev-field">
      <label>第一轮：风险预案质量</label>
      <select id="r1-riskplan" onchange="onParamsChange()">
        <option value="detailed">详细预案</option>
        <option value="standard" selected>标准预案</option>
        <option value="brief">简略预案</option>
      </select>
    </div>
    <div class="prev-field">
      <label>第二轮：客户满意度（进入本轮）</label>
      <select id="r2-satisfaction" onchange="onParamsChange()">
        <option value="80">高（≥80分）</option>
        <option value="65" selected>中（65–79分）</option>
        <option value="50">低（＜65分）</option>
      </select>
    </div>
  </div>
  <div class="prev-hint">请对照历史轮次决策摘要核对以上参数。若已自动读取，请确认与小组实际决策一致。</div>
</div>

<!-- 差异化资产状态卡 -->
<div class="asset-card" id="asset-card">
  <div class="asset-title" id="asset-title">正在加载资产状态……</div>
  <div class="asset-body"  id="asset-body"></div>
  <div class="asset-metrics">
    <div class="asset-metric">
      <div class="asset-metric-val" id="am-full-match">—</div>
      <div class="asset-metric-lbl">TM 完全匹配率</div>
    </div>
    <div class="asset-metric">
      <div class="asset-metric-val" id="am-fuzzy-match">—</div>
      <div class="asset-metric-lbl">TM 模糊匹配率</div>
    </div>
    <div class="asset-metric">
      <div class="asset-metric-val" id="am-term-entries">—</div>
      <div class="asset-metric-lbl">术语库条目数</div>
    </div>
    <div class="asset-metric">
      <div class="asset-metric-val" id="am-cleaning-cost" style="color:#c0392b">—</div>
      <div class="asset-metric-lbl">资产清洗成本（基础）</div>
    </div>
  </div>
</div>

<!-- 情景邮件 -->
<div class="email-card">
  <div class="email-meta">
    <span>发件人：</span>米兔互娱 本地化负责人 张明 &lt;zhang.ming@mitugames.com&gt;<br>
    <span>收件人：</span>星桥语言科技 项目团队<br>
    <span>主题：</span>【续集项目确认】《星际侦探2》本地化项目 — 资产复用意向确认
  </div>
  <div class="email-body">
    你好，《星际侦探》北美上线后市场反响超出预期，续集项目已立项。我们优先考虑继续与贵司合作——前提是可以复用《星际侦探》项目积累的翻译资产。<br><br>
    <strong>《星际侦探2》基本信息：</strong><br>
    <ul style="margin:0.5rem 0 0.5rem 1.2rem; font-size:0.88rem; line-height:1.9;">
      <li>对话文本约 <strong>120,000 字</strong>，大量场景与第一部情节关联</li>
      <li>预算与第一部相当，但资产复用率越高，报价越有竞争力</li>
      <li>时间节点：6 周内开始，12 周内交付</li>
    </ul>
    请本周内提交：① 现有 TM 和术语库的质量评估；② 资产可复用比例估算；③ 续集资产管理规划；④ 正式续集报价方案。<br>
    <small style="color:#999">备注：如贵司无法提供有竞争力的资产复用方案，我们可能会考虑其他供应商。</small>
  </div>
  <div class="email-task">📋 本轮任务：评估资产现状（ROI计算），完成五项资产管理决策，生成并提交决策摘要。</div>
</div>

<!-- 小组信息 -->
<div class="group-input">
  <label>🏢 小组名称（LSP）</label>
  <input type="text" id="group-name" placeholder="与前两轮保持一致"
         oninput="updateSummary()">
</div>

<!-- 项目状态栏 -->
<div class="status-grid">
  <div class="status-card">
    <div class="status-label">TM 完全匹配率</div>
    <div class="status-value" id="stat-tm">—</div>
    <div class="status-sub" id="stat-tm-sub">资产质量指标</div>
  </div>
  <div class="status-card">
    <div class="status-label">本轮总额外投入</div>
    <div class="status-value" id="stat-clean">—</div>
    <div class="status-sub">清洗方案 + 架构建设</div>
  </div>
  <div class="status-card">
    <div class="status-label">续集项目净节省</div>
    <div class="status-value" id="stat-savings">—</div>
    <div class="status-sub" id="stat-savings-sub">TM 复用效益</div>
  </div>
  <div class="status-card">
    <div class="status-label">客户满意度</div>
    <div class="status-value" id="stat-satisfaction">—</div>
    <div class="status-sub">延续自第二轮</div>
  </div>
</div>

<!-- ROI 计算器 -->
<div class="roi-section">
  <div class="roi-title">📐 翻译资产 ROI 计算器（续集项目：120,000字）</div>
  <table class="roi-table">
    <tr class="roi-row-positive">
      <td>TM 完全匹配节省<span style="font-size:0.75rem;color:#888;margin-left:0.4rem" id="roi-full-detail">（65% × 120,000字 × ¥0.06/字）</span></td>
      <td id="roi-full-saving">—</td>
    </tr>
    <tr class="roi-row-positive">
      <td>TM 模糊匹配节省<span style="font-size:0.75rem;color:#888;margin-left:0.4rem" id="roi-fuzzy-detail">（15% × 120,000字 × ¥0.04/字）</span></td>
      <td id="roi-fuzzy-saving">—</td>
    </tr>
    <tr class="roi-row-positive">
      <td>术语一致降低 QA 成本<span style="font-size:0.75rem;color:#888;margin-left:0.4rem">(fewer terminology errors)</span></td>
      <td id="roi-qa-saving">—</td>
    </tr>
    <tr class="roi-row-negative">
      <td>本次资产清洗成本（基础）</td>
      <td id="roi-cleaning">—</td>
    </tr>
    <tr class="roi-row-negative">
      <td>第一轮术语库原始投入（已沉没）</td>
      <td id="roi-r1-invest">—</td>
    </tr>
  </table>
  <div class="roi-total">
    <span>续集项目净效益</span>
    <span id="roi-net">—<span class="roi-badge" id="roi-badge" style="display:none"></span></span>
  </div>
  <div class="roi-compare" id="roi-compare"></div>
</div>

<!-- ══════════════════════════════════════════════════════ -->
<!-- ── 决策 1：资产清洗方案 ── -->
<!-- ══════════════════════════════════════════════════════ -->
<div class="d-card">
  <div class="d-card-title"><span>🧹</span> 决策 1：资产清洗方案（由谁定标准？投入多大力度？）</div>

  <!-- 1a: 主导方式 -->
  <div class="param-row">
    <div class="param-label"><span class="param-name">选择清洗的主导方式</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="clean" value="internal" checked onchange="recalc()">
        <span class="radio-btn">内部自主清洗
          <span class="radio-cost">方式成本 +¥0</span>
          <span class="radio-note">⏱ 不占额外时间</span>
          <span class="radio-note">标准由贵司内部制定</span>
        </span>
      </label>
      <label>
        <input type="radio" name="clean" value="joint" onchange="recalc()">
        <span class="radio-btn">与客户联合审核
          <span class="radio-cost">方式成本 +¥2,000</span>
          <span class="radio-note">⏱ 额外协调 3 天</span>
          <span class="radio-gain">满意度 +8分，术语分歧↓</span>
        </span>
      </label>
      <label>
        <input type="radio" name="clean" value="thirdparty" onchange="recalc()">
        <span class="radio-btn">第三方机构标准化
          <span class="radio-cost">方式成本 +¥5,000</span>
          <span class="radio-note">⏱ 外包周期 7–10 天</span>
          <span class="radio-gain">TM匹配率大幅提升</span>
        </span>
      </label>
    </div>
    <div class="param-hint">
      <strong>联合审核</strong>：术语标准双方共同确认，第四轮续集执行分歧极低，但需额外协调资源。<br>
      <strong>内部自主</strong>：贵司认为"规范"的术语，客户可能有不同偏好——第四轮续集项目可能出现分歧，届时修正代价更高。
    </div>
  </div>

  <!-- 1b: 清洗力度（滑块） -->
  <div class="param-row">
    <div class="param-label">
      <span class="param-name">清洗投入力度</span>
      <span class="param-val" id="clean-level-val">适度清洗（4人天）</span>
    </div>
    <input type="range" min="1" max="5" step="1" value="3" id="clean-level" oninput="onCleanLevelChange()">
    <div class="slider-labels">
      <span>最低限度</span><span>基础清洗</span><span>适度清洗 ★</span><span>深度清洗</span><span>全面精修</span>
    </div>
    <div class="slider-callout" id="clean-level-callout">
      <span>额外人力成本：<strong id="cl-extra-cost">¥1,200</strong></span>
      <span>人天投入：<strong id="cl-days">4 人天</strong>（约¥400/天）</span>
      <span>TM匹配率额外提升：<strong id="cl-boost">+2%</strong></span>
    </div>
    <div class="param-hint">清洗力度越高，后续 TM 复用质量越好，但人力成本同步增加。建议结合资产初始状态判断：混乱型资产需要更高力度才能达到可用标准。</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════ -->
<!-- ── 决策 2：向客户披露资产历史 ── -->
<!-- ══════════════════════════════════════════════════════ -->
<div class="d-card">
  <div class="d-card-title"><span>📢</span> 决策 2：向客户披露资产历史情况</div>
  <div class="param-row">
    <div class="param-label"><span class="param-name">如何向客户说明现有资产的质量状况？</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="disclose" value="proactive" checked onchange="recalc()">
        <span class="radio-btn">主动披露＋改善方案
          <span class="radio-gain">满意度 +12分</span>
          <span class="radio-note">说明历史成因，提出解决路径</span>
          <span class="radio-note">建立长期信任基础</span>
        </span>
      </label>
      <label>
        <input type="radio" name="disclose" value="current" onchange="recalc()">
        <span class="radio-btn">仅提供当前状态
          <span class="radio-gain">满意度 +3分</span>
          <span class="radio-note">报告清洗后结果，不提历史</span>
          <span class="radio-note">中性，无风险亦无加分</span>
        </span>
      </label>
      <label>
        <input type="radio" name="disclose" value="selective" onchange="recalc()">
        <span class="radio-btn">选择性展示
          <span class="radio-cost">满意度 −8分</span>
          <span class="radio-note">只展示好的部分</span>
          <span class="radio-note">⚠ 第四轮隐患触发</span>
        </span>
      </label>
    </div>
    <div class="param-hint">
      对于"混乱型资产"小组：主动说明"由于第一项目中途才建术语库，导致早期资产一致性不足"，同时承诺在续集中改善——这是建立信任的最佳路径。<br>
      "选择性展示"短期无事，但若客户在使用资产时发现差异，将在第四轮续集项目执行阶段造成严重信任危机。
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════ -->
<!-- ── 决策 3：续集资产管理策略 ── -->
<!-- ══════════════════════════════════════════════════════ -->
<div class="d-card">
  <div class="d-card-title">
    <span>🗄</span> 决策 3：为《星际侦探2》规划资产管理策略
    <span class="consequence-tag tag-r4">→ 影响第四轮项目基础</span>
  </div>

  <!-- 3a: TM 架构 -->
  <div class="param-row">
    <div class="param-label"><span class="param-name">续集项目的翻译资产架构选择</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="strategy" value="three-tier" onchange="recalc()">
        <span class="radio-btn">三层 TM 架构
          <span class="radio-cost">建设成本 +¥10,000</span>
          <span class="radio-note">企业级＋客户级＋项目级</span>
          <span class="radio-gain">资产评分 +95，长期 ROI 最优</span>
        </span>
      </label>
      <label>
        <input type="radio" name="strategy" value="two-tier" checked onchange="recalc()">
        <span class="radio-btn">两层 TM 架构
          <span class="radio-cost">建设成本 +¥5,000</span>
          <span class="radio-note">客户级＋项目级</span>
          <span class="radio-gain">资产评分 +78，行业主流</span>
        </span>
      </label>
      <label>
        <input type="radio" name="strategy" value="basic" onchange="recalc()">
        <span class="radio-btn">基础 TM
          <span class="radio-cost">建设成本 ¥0</span>
          <span class="radio-note">仅项目级，最简方案</span>
          <span class="radio-note">资产评分 +50，下轮重头再来</span>
        </span>
      </label>
    </div>
    <div class="param-hint">
      <strong>三层架构</strong>：企业级 TM 可跨客户复用（游戏通用词汇），客户级 TM 专属《星际侦探》系列。初始成本高，但第五个项目开始就能持续获益。<br>
      <strong>两层架构</strong>：最常见的行业实践，平衡成本与长期效益。<br>
      <strong>基础 TM</strong>：每个新项目都从零开始，放弃了组织记忆积累的机会。
    </div>
  </div>

  <!-- 3b: 术语库规划 -->
  <div class="param-row">
    <div class="param-label"><span class="param-name">术语库与风格指南规划</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="termplan" value="full" onchange="recalc()">
        <span class="radio-btn">规范术语库＋风格指南
          <span class="radio-cost">额外 +¥3,000 · +2天</span>
          <span class="radio-gain">资产评分 +15</span>
          <span class="radio-note">完整文档，审校量↓↓</span>
        </span>
      </label>
      <label>
        <input type="radio" name="termplan" value="standard" checked onchange="recalc()">
        <span class="radio-btn">标准术语库
          <span class="radio-cost">额外 +¥1,500 · +1天</span>
          <span class="radio-gain">资产评分 +8</span>
          <span class="radio-note">完整术语，无风格规范</span>
        </span>
      </label>
      <label>
        <input type="radio" name="termplan" value="minimal" onchange="recalc()">
        <span class="radio-btn">最小化术语表
          <span class="radio-cost">额外 +¥500 · +0.5天</span>
          <span class="radio-note">资产评分 +2</span>
          <span class="radio-note">仅角色名和核心技能名</span>
        </span>
      </label>
    </div>
    <div class="param-hint">风格指南（Style Guide）规定语气、人称、标点等风格规范，是减少审校返工的重要资产。每减少 1% 的审校量，在 120,000 字项目中约节省 ¥480 的审校成本。</div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════ -->
<!-- ── 决策 4：续集项目 TM 折扣报价策略（新增）── -->
<!-- ══════════════════════════════════════════════════════ -->
<div class="d-card">
  <div class="d-card-title">
    <span>💰</span> 决策 4：向客户提供的 TM 复用折扣幅度
    <span class="consequence-tag tag-r4">→ 影响第四轮项目利润空间</span>
  </div>
  <div class="param-row">
    <div class="param-label">
      <span class="param-name">完全匹配折扣力度（相对标准译价 ¥0.08/字）</span>
      <span class="param-val" id="discount-val">35% off</span>
    </div>
    <input type="range" min="20" max="60" step="5" value="35" id="tm-discount" oninput="onDiscountChange()">
    <div class="slider-labels">
      <span>20%（保守）</span>
      <span style="text-align:center">35% ★</span>
      <span style="text-align:center">45%（积极）</span>
      <span style="text-align:right">60%（激进）</span>
    </div>
    <div class="slider-callout" id="discount-callout">
      <span>完全匹配单价：<strong id="dc-match-price">¥0.052/字</strong></span>
      <span>客户节省约：<strong id="dc-client-save">¥—</strong></span>
      <span>贵司少收约：<strong id="dc-revenue-loss">¥—</strong></span>
      <span id="dc-profit-badge" style="font-weight:700">利润适中</span>
    </div>
    <div class="param-hint">
      折扣越大，报价竞争力越强，客户续约意愿越高；但贵司续集项目的利润空间越薄。<br>
      <strong>折扣 ≥ 50%</strong>：续集项目利润严重压缩，第四轮遭遇危机时可用的紧急储备将减少。行业常见范围：完全匹配 25%–45% off。
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════ -->
<!-- ── 决策 5：续集合同保障条款（新增）── -->
<!-- ══════════════════════════════════════════════════════ -->
<div class="d-card">
  <div class="d-card-title">
    <span>📝</span> 决策 5：与客户签订《星际侦探2》的合同保障条款
    <span class="consequence-tag tag-r4">→ 直接影响第四轮情况二（追加文本）</span>
  </div>
  <div class="param-row">
    <div class="param-label"><span class="param-name">选择合同条款完善程度</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="contract" value="full" onchange="recalc()">
        <span class="radio-btn">完整条款套装
          <span class="radio-cost">法务费 +¥2,000 · +2天</span>
          <span class="radio-note">含变更管控(CCM)条款</span>
          <span class="radio-note">含 IP 授权责任边界</span>
          <span class="radio-gain">→ 第四轮变更谈判强势</span>
        </span>
      </label>
      <label>
        <input type="radio" name="contract" value="standard" checked onchange="recalc()">
        <span class="radio-btn">标准合同模板
          <span class="radio-cost">法务费 +¥0</span>
          <span class="radio-note">含基础交付与变更描述</span>
          <span class="radio-note">覆盖常见场景，细节有限</span>
          <span class="radio-note">→ 第四轮变更谈判一般</span>
        </span>
      </label>
      <label>
        <input type="radio" name="contract" value="minimal" onchange="recalc()">
        <span class="radio-btn">精简合同（快速签约）
          <span class="radio-gain">省时 2天，快速开始</span>
          <span class="radio-note">最小化保护条款</span>
          <span class="radio-cost">→ 第四轮变更无书面保护</span>
        </span>
      </label>
    </div>
    <div class="param-hint">
      合同中的<strong>变更管控条款（Change Control Management）</strong>明确规定：任何超出原始范围的需求必须通过书面变更申请（Change Request）流程处理，并重新评估费用和工期。<br>
      没有这一条款，客户追加文本时，贵司将处于完全被动地位——这正是第四轮情况二的核心考验。
    </div>
  </div>
</div>

<!-- 实时影响预估 -->
<div class="preview-section">
  <div class="preview-title">📊 本轮五项决策综合影响预估</div>
  <div class="delta-grid">
    <div class="delta-item">
      <div class="delta-label">本轮总额外投入</div>
      <div class="delta-val" id="dv-total-cost">—</div>
      <div class="delta-sub" id="dv-total-cost-sub">清洗 + 架构 + 合同</div>
    </div>
    <div class="delta-item">
      <div class="delta-label">客户满意度变化</div>
      <div class="delta-val" id="dv-sat">—</div>
      <div class="delta-sub" id="dv-sat-sub">—</div>
    </div>
    <div class="delta-item">
      <div class="delta-label">续集 TM 匹配率预估</div>
      <div class="delta-val" id="dv-future-tm">—</div>
      <div class="delta-sub" id="dv-future-sub">—</div>
    </div>
    <div class="delta-item">
      <div class="delta-label">资产规划综合评分</div>
      <div class="delta-val" id="dv-asset-score">—</div>
      <div class="delta-sub" id="dv-asset-sub">—</div>
    </div>
    <div class="delta-item">
      <div class="delta-label">续集预期利润空间</div>
      <div class="delta-val" id="dv-profit">—</div>
      <div class="delta-sub" id="dv-profit-sub">决策4：TM折扣影响</div>
    </div>
    <div class="delta-item">
      <div class="delta-label">第四轮变更谈判筹码</div>
      <div class="delta-val" id="dv-contract">—</div>
      <div class="delta-sub" id="dv-contract-sub">决策5：合同条款影响</div>
    </div>
  </div>
</div>

<!-- 摘要 -->
<div class="summary-section">
  <h3>📋 决策摘要（提交给教师）</h3>
  <div class="summary-box" id="summary-box">请填写小组名称并调整决策，摘要将自动生成。</div>
  <div>
    <button class="btn-primary" onclick="generateSummary()">生成摘要</button>
    <button class="btn-primary btn-copy" onclick="copySummary()">复制摘要</button>
    <span class="copy-feedback" id="copy-feedback">✓ 已复制</span>
    <button class="btn-primary btn-next" onclick="saveAndContinue()">🔓 完成第三轮 → 进入第四轮</button>
  </div>
</div>

</div><!-- /sim-body -->

<script>
const GATE_CODE = 'BANANA';

function checkGate() {
  const val = document.getElementById('gate-input').value.trim().toUpperCase();
  if (val === GATE_CODE) {
    sessionStorage.setItem('r3_unlocked', '1');
    document.getElementById('gate-overlay').style.display = 'none';
    document.getElementById('main-body').style.display = 'block';
    loadPrevData();
    recalc();
  } else {
    document.getElementById('gate-error').textContent = '密码不正确，请等待教师公布。';
  }
}

// ─────────────────────────────────────────────
// 历史数据读取
// ─────────────────────────────────────────────
function loadPrevData() {
  try {
    const r1 = JSON.parse(localStorage.getItem('sim_r1')) || {};
    const r2 = JSON.parse(localStorage.getItem('sim_r2')) || {};
    let autoLoaded = false;

    if (r1.group) {
      const gn = document.getElementById('group-name');
      if (!gn.value) gn.value = r1.group;
    }
    if (r1.glossary) {
      document.getElementById('r1-glossary').value = r1.glossary; autoLoaded = true;
    }
    if (r1.riskPlan) {
      document.getElementById('r1-riskplan').value = r1.riskPlan;
    }
    if (typeof r2.finalSatisfaction === 'number') {
      document.getElementById('r2-satisfaction').value =
        r2.finalSatisfaction >= 80 ? '80' : r2.finalSatisfaction >= 65 ? '65' : '50';
    }
    if (autoLoaded) document.getElementById('auto-badge').style.display = 'inline-block';
    onParamsChange();
  } catch(e) {}
}

// ─────────────────────────────────────────────
// 资产状态场景配置（源自第一轮术语库决策）
// ─────────────────────────────────────────────
const ASSET_SCENARIOS = {
  early: {
    tmFull: 65, tmFuzzy: 15, termEntries: 1200, cleanCost: 2000,
    qaSaving: 4000, r1Invest: 3000,
    cardClass: 'asset-green',
    title: '🟢 资产状态良好——规范型',
    body: '由于第一轮在项目启动时就建立了术语库，TM 数据质量较高，术语条目规范统一。资产清洗工作量较小，可以为《星际侦探2》提供有竞争力的复用方案。',
  },
  during: {
    tmFull: 40, tmFuzzy: 20, termEntries: 580, cleanCost: 6500,
    qaSaving: 2000, r1Invest: 1500,
    cardClass: 'asset-yellow',
    title: '⚠ 资产状态一般——混合型',
    body: '由于第一轮术语库在翻译过程中逐步积累，早期翻译的一致性较差。TM 中存在同一术语的多个译法，需要一定工作量进行清洗统一后才能高质量复用。',
  },
  none: {
    tmFull: 10, tmFuzzy: 5, termEntries: 0, cleanCost: 18000,
    qaSaving: 0, r1Invest: 0,
    cardClass: 'asset-red',
    title: '🔴 资产状态混乱——需重建',
    body: '由于第一轮未建立术语库，翻译资产高度分散，不同译者形成了各自的术语习惯。需要从已交付文本中反向提取并重建术语表，清洗成本高昂。此时你们面临的核心问题是：当时省下的 ¥3,000，现在要花多少代价弥补？',
  },
};

// ─────────────────────────────────────────────
// 决策影响配置
// ─────────────────────────────────────────────

// 决策1a：清洗主导方式
const CLEAN_CFG = {
  internal:   { extraCost: 0,    satDelta: 0,  futureBoost: 2,  label: '内部自主清洗' },
  joint:      { extraCost: 2000, satDelta: +8, futureBoost: 6,  label: '与客户联合审核（+¥2,000）' },
  thirdparty: { extraCost: 5000, satDelta: +5, futureBoost: 10, label: '第三方标准化（+¥5,000）' },
};

// 决策1b：清洗力度滑块（1–5级）
const CLEAN_LEVEL_CFG = {
  1: { days: 1,  extraCost: 0,    futureBoost: 0, label: '最低限度（1人天）' },
  2: { days: 2,  extraCost: 400,  futureBoost: 1, label: '基础清洗（2人天）' },
  3: { days: 4,  extraCost: 1200, futureBoost: 2, label: '适度清洗（4人天）' },
  4: { days: 7,  extraCost: 2400, futureBoost: 4, label: '深度清洗（7人天）' },
  5: { days: 12, extraCost: 4400, futureBoost: 6, label: '全面精修（12人天）' },
};

// 决策2：披露策略
const DISCLOSE_CFG = {
  proactive: { satDelta: +12, label: '主动披露历史问题并提解决方案' },
  current:   { satDelta:  +3, label: '仅提供清洗后当前状态' },
  selective: { satDelta:  -8, label: '选择性展示，隐瞒历史问题' },
};

// 决策3a：TM 架构
const STRATEGY_TM_CFG = {
  'three-tier': { buildCost: 10000, assetScore: 95, label: '三层 TM 架构', futureBoost: 12 },
  'two-tier':   { buildCost:  5000, assetScore: 78, label: '两层 TM 架构', futureBoost:  7 },
  'basic':      { buildCost:     0, assetScore: 50, label: '基础 TM（项目级）', futureBoost: 2 },
};

// 决策3b：术语库规划
const TERMPLAN_CFG = {
  full:     { extraCost: 3000, assetScore: 15, label: '规范术语库＋风格指南（+¥3,000）', futureBoost: 8 },
  standard: { extraCost: 1500, assetScore:  8, label: '标准术语库（+¥1,500）', futureBoost: 5 },
  minimal:  { extraCost:  500, assetScore:  2, label: '最小化术语表（+¥500）', futureBoost: 1 },
};

// 决策5：合同保障条款
const CONTRACT_CFG = {
  full:     { extraCost: 2000, timeSaved: -2, r4Bonus: 12, label: '完整条款套装（变更管控+IP+QA条款）' },
  standard: { extraCost:    0, timeSaved:  0, r4Bonus:  4, label: '标准合同模板（含基础变更描述）' },
  minimal:  { extraCost:    0, timeSaved: +2, r4Bonus:  0, label: '精简合同（快速签约，最小化保护）' },
};

// ─────────────────────────────────────────────
// 滑块更新回调
// ─────────────────────────────────────────────
function onCleanLevelChange() {
  const level = parseInt(document.getElementById('clean-level').value);
  const cfg = CLEAN_LEVEL_CFG[level];
  document.getElementById('clean-level-val').textContent = cfg.label;
  document.getElementById('cl-extra-cost').textContent = cfg.extraCost > 0 ? '¥' + cfg.extraCost.toLocaleString() : '¥0';
  document.getElementById('cl-days').textContent = cfg.days + ' 人天';
  document.getElementById('cl-boost').textContent = '+' + cfg.futureBoost + '%';
  const callout = document.getElementById('clean-level-callout');
  callout.className = level >= 4 ? 'slider-callout' : 'slider-callout';
  recalc();
}

function onDiscountChange() {
  const glossary = document.getElementById('r1-glossary').value;
  const sc = ASSET_SCENARIOS[glossary];
  const cleanLevel = parseInt(document.getElementById('clean-level').value);
  const clean    = (document.querySelector('input[name="clean"]:checked')    || { value: 'internal'  }).value;
  const strategy = (document.querySelector('input[name="strategy"]:checked') || { value: 'two-tier'  }).value;
  const termplan = (document.querySelector('input[name="termplan"]:checked') || { value: 'standard'  }).value;
  const cleanCfg  = CLEAN_CFG[clean];
  const cleanLvl  = CLEAN_LEVEL_CFG[cleanLevel];
  const stratCfg  = STRATEGY_TM_CFG[strategy];
  const termCfg   = TERMPLAN_CFG[termplan];
  const futureTM  = Math.min(85, sc.tmFull + cleanCfg.futureBoost + cleanLvl.futureBoost + stratCfg.futureBoost + termCfg.futureBoost);

  const discount = parseInt(document.getElementById('tm-discount').value);
  const fullMatchPrice = +(0.08 * (1 - discount / 100)).toFixed(4);
  const clientSave = Math.round(futureTM / 100 * 120000 * (0.08 - fullMatchPrice));
  const revenueLoss = clientSave;

  document.getElementById('discount-val').textContent = discount + '% off';
  document.getElementById('dc-match-price').textContent = '¥' + fullMatchPrice.toFixed(3) + '/字';
  document.getElementById('dc-client-save').textContent = '¥' + clientSave.toLocaleString();
  document.getElementById('dc-revenue-loss').textContent = '¥' + revenueLoss.toLocaleString();

  const badge = document.getElementById('dc-profit-badge');
  const callout = document.getElementById('discount-callout');
  if (discount <= 25) {
    badge.textContent = '💚 利润充足';  badge.style.color = '#1e7e50';
    callout.className = 'slider-callout';
  } else if (discount <= 35) {
    badge.textContent = '💛 利润适中';  badge.style.color = '#8a6000';
    callout.className = 'slider-callout';
  } else if (discount <= 45) {
    badge.textContent = '🟠 利润偏薄';  badge.style.color = '#a04000';
    callout.className = 'slider-callout callout-warn';
  } else {
    badge.textContent = '🔴 利润极薄，第四轮预算压力高';  badge.style.color = '#c0392b';
    callout.className = 'slider-callout callout-warn';
  }
  recalc();
}

// ─────────────────────────────────────────────
// 当参数改变时
// ─────────────────────────────────────────────
function onParamsChange() {
  const glossary = document.getElementById('r1-glossary').value;
  const sc = ASSET_SCENARIOS[glossary];

  const card = document.getElementById('asset-card');
  card.className = 'asset-card ' + sc.cardClass;
  document.getElementById('asset-title').textContent = sc.title;
  document.getElementById('asset-body').textContent  = sc.body;
  document.getElementById('am-full-match').textContent    = sc.tmFull + '%';
  document.getElementById('am-fuzzy-match').textContent   = sc.tmFuzzy + '%';
  document.getElementById('am-term-entries').textContent  = sc.termEntries ? sc.termEntries.toLocaleString() : '—（需重建）';
  document.getElementById('am-cleaning-cost').textContent = '¥' + sc.cleanCost.toLocaleString();

  const tmEl = document.getElementById('stat-tm');
  tmEl.textContent = sc.tmFull + '%';
  tmEl.style.color = sc.tmFull >= 55 ? '#27ae60' : sc.tmFull >= 35 ? '#e67e22' : '#c0392b';

  const sat = parseInt(document.getElementById('r2-satisfaction').value);
  const satEl = document.getElementById('stat-satisfaction');
  satEl.textContent = sat + ' 分';
  satEl.style.color = sat >= 75 ? '#27ae60' : sat >= 60 ? '#e67e22' : '#c0392b';

  updateROI(sc);
  recalc();
}

function updateROI(sc) {
  const fullSaving  = Math.round(120000 * sc.tmFull  / 100 * 0.06);
  const fuzzySaving = Math.round(120000 * sc.tmFuzzy / 100 * 0.04);
  const netBenefit  = fullSaving + fuzzySaving + sc.qaSaving - sc.cleanCost - sc.r1Invest;
  const roi = sc.r1Invest > 0 ? Math.round(netBenefit / sc.r1Invest * 100) : null;

  document.getElementById('roi-full-detail').textContent  = `（${sc.tmFull}% × 120,000字 × ¥0.06/字）`;
  document.getElementById('roi-fuzzy-detail').textContent = `（${sc.tmFuzzy}% × 120,000字 × ¥0.04/字）`;
  document.getElementById('roi-full-saving').textContent  = '¥' + fullSaving.toLocaleString();
  document.getElementById('roi-fuzzy-saving').textContent = '¥' + fuzzySaving.toLocaleString();
  document.getElementById('roi-qa-saving').textContent    = '¥' + sc.qaSaving.toLocaleString();
  document.getElementById('roi-cleaning').textContent     = '− ¥' + sc.cleanCost.toLocaleString();
  document.getElementById('roi-r1-invest').textContent    = '− ¥' + sc.r1Invest.toLocaleString();

  const netEl   = document.getElementById('roi-net');
  const badgeEl = document.getElementById('roi-badge');
  const netFmt  = (netBenefit >= 0 ? '¥' : '−¥') + Math.abs(netBenefit).toLocaleString('zh-CN');
  badgeEl.style.display = 'inline-block';
  if (netBenefit >= 0) {
    netEl.firstChild.textContent = '+ ' + netFmt + '  ';
    badgeEl.className = 'roi-badge roi-positive';
    badgeEl.textContent = roi !== null ? 'ROI ' + roi + '%' : 'ROI 正收益';
  } else {
    netEl.firstChild.textContent = netFmt + '  ';
    badgeEl.className = 'roi-badge roi-negative';
    badgeEl.textContent = '净亏损';
  }

  document.getElementById('stat-savings').textContent =
    (fullSaving + fuzzySaving >= 0 ? '¥' : '−¥') +
    Math.abs(fullSaving + fuzzySaving).toLocaleString();
  document.getElementById('stat-savings-sub').textContent = 'TM 复用节省 · 续集项目';

  const compares = {
    early:  '当初 ¥3,000 的术语库投资，在续集项目中已带来 ¥' + (fullSaving + fuzzySaving + sc.qaSaving).toLocaleString() + ' 的综合节省——净效益 ¥' + netBenefit.toLocaleString() + '。',
    during: '中途积累的术语库虽有节省，但清洗成本拖累了 ROI。如果第一轮就规范建立，此处净效益将增加约 ¥' + (18000 - 6500).toLocaleString() + '。',
    none:   '第一轮省下的 ¥3,000 术语库投入，今天需要花 ¥18,000 清洗代价来弥补，净损失 ¥' + Math.abs(netBenefit).toLocaleString() + '。这就是"短视决策"的成本。',
  };
  document.getElementById('roi-compare').textContent =
    compares[document.getElementById('r1-glossary').value];
}

// ─────────────────────────────────────────────
// 核心重算
// ─────────────────────────────────────────────
function recalc() {
  const glossary    = document.getElementById('r1-glossary').value;
  const sc          = ASSET_SCENARIOS[glossary];
  const clean       = (document.querySelector('input[name="clean"]:checked')    || { value: 'internal'   }).value;
  const disclose    = (document.querySelector('input[name="disclose"]:checked') || { value: 'proactive'  }).value;
  const strategy    = (document.querySelector('input[name="strategy"]:checked') || { value: 'two-tier'   }).value;
  const termplan    = (document.querySelector('input[name="termplan"]:checked') || { value: 'standard'   }).value;
  const contract    = (document.querySelector('input[name="contract"]:checked') || { value: 'standard'   }).value;
  const cleanLevel  = parseInt(document.getElementById('clean-level').value);
  const tmDiscount  = parseInt(document.getElementById('tm-discount').value);

  const cleanCfg    = CLEAN_CFG[clean];
  const cleanLvlCfg = CLEAN_LEVEL_CFG[cleanLevel];
  const discloseCfg = DISCLOSE_CFG[disclose];
  const stratCfg    = STRATEGY_TM_CFG[strategy];
  const termCfg     = TERMPLAN_CFG[termplan];
  const contractCfg = CONTRACT_CFG[contract];

  const initSat  = parseInt(document.getElementById('r2-satisfaction').value);
  const finalSat = Math.min(95, Math.max(30, initSat + discloseCfg.satDelta + cleanCfg.satDelta));
  const assetScore = Math.min(100, stratCfg.assetScore + termCfg.assetScore);
  const futureTM   = Math.min(85, sc.tmFull + cleanCfg.futureBoost + cleanLvlCfg.futureBoost + stratCfg.futureBoost + termCfg.futureBoost);

  // 本轮总额外投入（清洗方式 + 清洗力度 + TM架构建设 + 术语库 + 合同）
  const totalExtraCost = cleanCfg.extraCost + cleanLvlCfg.extraCost + stratCfg.buildCost + termCfg.extraCost + contractCfg.extraCost;

  // 更新状态栏总成本
  const cleanStatEl = document.getElementById('stat-clean');
  cleanStatEl.textContent = '¥' + totalExtraCost.toLocaleString();
  cleanStatEl.style.color = totalExtraCost >= 15000 ? '#c0392b' : totalExtraCost >= 8000 ? '#e67e22' : '#27ae60';

  // 续集利润空间
  const fullMatchPrice = 0.08 * (1 - tmDiscount / 100);
  const revenueLoss    = Math.round(futureTM / 100 * 120000 * (0.08 - fullMatchPrice));
  const profitPressure = tmDiscount >= 50;

  // ── 预估区更新 ──
  const totalCostEl = document.getElementById('dv-total-cost');
  totalCostEl.textContent = '¥' + totalExtraCost.toLocaleString();
  totalCostEl.className = 'delta-val ' + (totalExtraCost >= 15000 ? 'impact-negative' : totalExtraCost >= 7000 ? 'impact-warn' : 'impact-neutral');
  document.getElementById('dv-total-cost-sub').textContent =
    `清洗¥${(cleanCfg.extraCost + cleanLvlCfg.extraCost).toLocaleString()} + 架构¥${(stratCfg.buildCost + termCfg.extraCost).toLocaleString()} + 合同¥${contractCfg.extraCost.toLocaleString()}`;

  const satEl = document.getElementById('dv-sat');
  const satDelta = discloseCfg.satDelta + cleanCfg.satDelta;
  satEl.textContent = (satDelta >= 0 ? '+' : '') + satDelta + ' 分（→ ' + finalSat + '）';
  satEl.className = 'delta-val ' + (satDelta >= 0 ? 'impact-positive' : 'impact-negative');
  document.getElementById('dv-sat-sub').textContent = discloseCfg.label;

  const futureTMEl = document.getElementById('dv-future-tm');
  futureTMEl.textContent = futureTM + '%';
  futureTMEl.className = 'delta-val ' + (futureTM >= 70 ? 'impact-positive' : futureTM >= 50 ? 'impact-neutral' : 'impact-negative');
  document.getElementById('dv-future-sub').textContent = cleanCfg.label + '，力度：' + cleanLvlCfg.label;

  const scoreEl = document.getElementById('dv-asset-score');
  scoreEl.textContent = assetScore + ' / 100';
  scoreEl.className = 'delta-val ' + (assetScore >= 80 ? 'impact-positive' : assetScore >= 60 ? 'impact-neutral' : 'impact-negative');
  document.getElementById('dv-asset-sub').textContent = assetScore >= 80 ? '资产规范化程度高' : assetScore >= 60 ? '达到行业中等水准' : '资产管理仍有较大提升空间';

  const profitEl = document.getElementById('dv-profit');
  if (profitPressure) {
    profitEl.textContent = '偏薄（折扣' + tmDiscount + '%）';
    profitEl.className = 'delta-val impact-negative';
    document.getElementById('dv-profit-sub').textContent = '少收约¥' + revenueLoss.toLocaleString() + '，第四轮储备受限';
  } else {
    profitEl.textContent = tmDiscount <= 30 ? '充足' : '适中';
    profitEl.className = 'delta-val ' + (tmDiscount <= 30 ? 'impact-positive' : 'impact-neutral');
    document.getElementById('dv-profit-sub').textContent = '折扣' + tmDiscount + '%，少收约¥' + revenueLoss.toLocaleString();
  }

  const contractEl = document.getElementById('dv-contract');
  const contractLabels = { full: '强势（完整 CCM 条款）', standard: '一般（基础条款）', minimal: '被动（无变更保护）' };
  contractEl.textContent = contractLabels[contract];
  contractEl.className = 'delta-val ' + (contract === 'full' ? 'impact-positive' : contract === 'standard' ? 'impact-neutral' : 'impact-negative');
  document.getElementById('dv-contract-sub').textContent = '法务投入：¥' + contractCfg.extraCost.toLocaleString() + '，R4情况二加成：+' + contractCfg.r4Bonus + '分';

  // 同步更新 discount callout（避免 futureTM 过期）
  const clientSave2 = Math.round(futureTM / 100 * 120000 * (0.08 - fullMatchPrice));
  document.getElementById('dc-match-price').textContent = '¥' + fullMatchPrice.toFixed(3) + '/字';
  document.getElementById('dc-client-save').textContent = '¥' + clientSave2.toLocaleString();
  document.getElementById('dc-revenue-loss').textContent = '¥' + clientSave2.toLocaleString();

  updateSummary();
}

// ─────────────────────────────────────────────
// 摘要生成
// ─────────────────────────────────────────────
function generateSummary() { recalc(); }

function updateSummary() {
  const glossary    = document.getElementById('r1-glossary').value;
  const riskPlan    = document.getElementById('r1-riskplan').value;
  const sc          = ASSET_SCENARIOS[glossary];
  const clean       = (document.querySelector('input[name="clean"]:checked')    || { value: 'internal'   }).value;
  const disclose    = (document.querySelector('input[name="disclose"]:checked') || { value: 'proactive'  }).value;
  const strategy    = (document.querySelector('input[name="strategy"]:checked') || { value: 'two-tier'   }).value;
  const termplan    = (document.querySelector('input[name="termplan"]:checked') || { value: 'standard'   }).value;
  const contract    = (document.querySelector('input[name="contract"]:checked') || { value: 'standard'   }).value;
  const cleanLevel  = parseInt(document.getElementById('clean-level').value);
  const tmDiscount  = parseInt(document.getElementById('tm-discount').value);

  const cleanCfg    = CLEAN_CFG[clean];
  const cleanLvlCfg = CLEAN_LEVEL_CFG[cleanLevel];
  const discloseCfg = DISCLOSE_CFG[disclose];
  const stratCfg    = STRATEGY_TM_CFG[strategy];
  const termCfg     = TERMPLAN_CFG[termplan];
  const contractCfg = CONTRACT_CFG[contract];

  const initSat     = parseInt(document.getElementById('r2-satisfaction').value);
  const finalSat    = Math.min(95, Math.max(30, initSat + discloseCfg.satDelta + cleanCfg.satDelta));
  const assetScore  = Math.min(100, stratCfg.assetScore + termCfg.assetScore);
  const futureTM    = Math.min(85, sc.tmFull + cleanCfg.futureBoost + cleanLvlCfg.futureBoost + stratCfg.futureBoost + termCfg.futureBoost);
  const totalExtraCost = cleanCfg.extraCost + cleanLvlCfg.extraCost + stratCfg.buildCost + termCfg.extraCost + contractCfg.extraCost;
  const fullMatchPrice = +(0.08 * (1 - tmDiscount / 100)).toFixed(4);
  const revenueLoss    = Math.round(futureTM / 100 * 120000 * (0.08 - fullMatchPrice));
  const profitPressure = tmDiscount >= 50;

  const fullSaving  = Math.round(120000 * sc.tmFull  / 100 * 0.06);
  const fuzzySaving = Math.round(120000 * sc.tmFuzzy / 100 * 0.04);
  const netBenefit  = fullSaving + fuzzySaving + sc.qaSaving - sc.cleanCost - sc.r1Invest;

  const glossaryLabel = { early: '第1周建立（规范型）', during: '翻译中积累（混合型）', none: '未建立（混乱型）' };
  const riskLabel     = { detailed: '详细预案', standard: '标准预案', brief: '简略预案' };
  const profitLabel   = tmDiscount <= 25 ? '充足' : tmDiscount <= 35 ? '适中' : tmDiscount <= 45 ? '偏薄' : '极薄（有压力）';
  const emoji         = (n, hi, mid) => n >= hi ? '🟢' : n >= mid ? '🟡' : '🔴';

  const group = document.getElementById('group-name').value.trim() || '（未填写小组名）';
  const now   = new Date().toLocaleString('zh-CN', { hour12: false });

  const text = [
    '═══════════════════════════════════════════',
    '  翻译项目沙盘 · 第三轮决策摘要',
    '═══════════════════════════════════════════',
    `  小组名称：${group}`,
    `  提交时间：${now}`,
    '───────────────────────────────────────────',
    '  【继承自历史轮次的参数】',
    `  · 第一轮术语库决策：${glossaryLabel[glossary]}`,
    `  · 第一轮风险预案：${riskLabel[riskPlan]}（第四轮使用）`,
    `  · 进入本轮客户满意度：${initSat} 分`,
    '',
    '  【资产现状评估（ROI计算器结果）】',
    `  · TM 完全匹配率：${sc.tmFull}%，模糊匹配率：${sc.tmFuzzy}%`,
    `  · 术语库条目：${sc.termEntries || '需重建'}`,
    `  · 资产基础清洗成本：¥${sc.cleanCost.toLocaleString()}`,
    `  · 续集项目 TM 净效益：${netBenefit >= 0 ? '+¥' : '−¥'}${Math.abs(netBenefit).toLocaleString()}  ${emoji(netBenefit, 0, -10000)}`,
    '',
    '  【本轮五项决策】',
    `  · 决策 1a（清洗方式）：${cleanCfg.label}`,
    `  · 决策 1b（清洗力度）：${cleanLvlCfg.label}（额外¥${cleanLvlCfg.extraCost.toLocaleString()}）`,
    `  · 决策 2（客户沟通）：${discloseCfg.label}`,
    `  · 决策 3（资产架构）：${stratCfg.label}（建设¥${stratCfg.buildCost.toLocaleString()}）＋ ${termCfg.label}`,
    `  · 决策 4（TM折扣）：完全匹配折扣 ${tmDiscount}%（单价¥${fullMatchPrice.toFixed(3)}/字），利润空间：${profitLabel}`,
    `  · 决策 5（合同条款）：${contractCfg.label}`,
    '',
    `  本轮总额外投入：¥${totalExtraCost.toLocaleString()}`,
    '',
    '  【本轮决策影响预估】',
    `  · 客户满意度变化：${discloseCfg.satDelta + cleanCfg.satDelta >= 0 ? '+' : ''}${discloseCfg.satDelta + cleanCfg.satDelta} 分 → 最终 ${finalSat} 分  ${emoji(finalSat, 75, 60)}`,
    `  · 续集项目 TM 匹配率预估：${futureTM}%  ${emoji(futureTM, 65, 45)}`,
    `  · 资产规范化评分：${assetScore}/100  ${emoji(assetScore, 80, 60)}`,
    `  · 续集利润空间：${profitLabel}（折扣${tmDiscount}%，少收¥${revenueLoss.toLocaleString()}）`,
    '───────────────────────────────────────────',
    '  ★ 第四轮触发参数（教师参考）',
    `  → 风险预案资源：${riskLabel[riskPlan]}（源自第一轮）`,
    `  → 客户关系：${finalSat >= 75 ? '良好（续约谈判有筹码）' : finalSat >= 60 ? '一般（需维护）' : '紧张（续约面临压力）'}`,
    `  → 资产管理基础：${assetScore >= 80 ? '规范，有系统化 SOP 基础' : assetScore >= 60 ? '一般，部分内容需补充' : '薄弱，缺乏系统化积累'}`,
    `  → 情况二谈判筹码：${contractCfg.r4Bonus >= 10 ? '强（有完整CCM合同条款）' : contractCfg.r4Bonus >= 3 ? '一般（标准合同）' : '无（精简合同，无书面保护）'}`,
    `  → 续集利润压力：${profitPressure ? '高（折扣≥50%，紧急储备受限）' : '正常'}`,
    '═══════════════════════════════════════════',
  ].join('\n');

  document.getElementById('summary-box').textContent = text;

  try {
    localStorage.setItem('sim_r3', JSON.stringify({
      group,
      glossary,
      riskPlan,
      finalSatisfaction:  finalSat,
      assetScore,
      futureTM,
      cleanStrategy:      clean,
      cleanLevel,
      disclosureChoice:   disclose,
      assetStrategy:      strategy + '+' + termplan,
      contractLevel:      contract,
      contractR4Bonus:    contractCfg.r4Bonus,
      tmDiscountPct:      tmDiscount,
      profitPressure,
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
  recalc();
  window.location = '/localization-sim-r4/';
}

// ─────────────────────────────────────────────
// 初始化
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('r3_unlocked') === '1') {
    document.getElementById('gate-overlay').style.display = 'none';
    document.getElementById('main-body').style.display = 'block';
    loadPrevData();
    recalc();
  }
  // 初始化滑块显示
  onCleanLevelChange();
  onDiscountChange();
});
</script>
