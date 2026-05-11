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
.param-label { font-size: 0.88rem; font-weight: 600; color: #444; margin-bottom: 0.4rem; }
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

/* ── 联动标签 ── */
.consequence-tag {
  display: inline-block; font-size: 0.7rem; font-weight: 700;
  padding: 0.15rem 0.55rem; border-radius: 4px;
}
.tag-r4 { background: #fdecea; color: #c0392b; border: 1px solid #f5b8b8; }

/* ── 实时预览 ── */
.preview-section {
  background: #f0f4fb; border: 1.5px solid #c8d8ee;
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-bottom: 1.1rem;
}
.preview-title { font-size: 0.95rem; font-weight: 700; color: #1a2f50; margin-bottom: 1rem; }
.delta-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
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
  .delta-grid  { grid-template-columns: 1fr; }
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
      <div class="asset-metric-lbl">资产清洗成本</div>
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
    请本周内提交：① 现有 TM 和术语库的质量评估；② 资产可复用比例估算；③ 续集资产管理规划。<br>
    <small style="color:#999">备注：如贵司无法提供有竞争力的资产复用方案，我们可能会考虑其他供应商。</small>
  </div>
  <div class="email-task">📋 本轮任务：评估资产现状（ROI计算），完成三项资产管理决策，生成并提交决策摘要。</div>
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
    <div class="status-label">资产清洗成本</div>
    <div class="status-value" id="stat-clean">—</div>
    <div class="status-sub">本轮必要支出</div>
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
      <td>本次资产清洗成本</td>
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

<!-- ── 决策 1：资产清洗方案 ── -->
<div class="d-card">
  <div class="d-card-title"><span>🧹</span> 决策 1：资产清洗方案（由谁制定标准？）</div>
  <div class="param-row">
    <div class="param-label">选择资产清洗的主导方式</div>
    <div class="radio-group">
      <label>
        <input type="radio" name="clean" value="internal" checked onchange="recalc()">
        <span class="radio-btn">内部自主清洗<br><small>低成本，速度快</small></span>
      </label>
      <label>
        <input type="radio" name="clean" value="joint" onchange="recalc()">
        <span class="radio-btn">与客户联合审核<br><small>标准统一，额外沟通</small></span>
      </label>
      <label>
        <input type="radio" name="clean" value="thirdparty" onchange="recalc()">
        <span class="radio-btn">第三方标准化<br><small>最规范，成本最高</small></span>
      </label>
    </div>
    <div class="param-hint">
      <strong>联合审核</strong>的优势：术语标准由双方共同确认，未来返工风险极低，但需额外 ¥2,000 协调成本和 3 天时间。<br>
      <strong>内部自主</strong>风险：贵司认为"规范"的术语，客户可能有不同偏好，第四轮续集项目中可能出现分歧。
    </div>
  </div>
</div>

<!-- ── 决策 2：向客户披露资产历史 ── -->
<div class="d-card">
  <div class="d-card-title"><span>📢</span> 决策 2：向客户披露资产历史情况</div>
  <div class="param-row">
    <div class="param-label">如何向客户说明现有资产的质量状况？</div>
    <div class="radio-group">
      <label>
        <input type="radio" name="disclose" value="proactive" checked onchange="recalc()">
        <span class="radio-btn">主动披露＋改善方案<br><small>说明历史成因，提出解决路径</small></span>
      </label>
      <label>
        <input type="radio" name="disclose" value="current" onchange="recalc()">
        <span class="radio-btn">仅提供当前状态<br><small>报告清洗后结果，不提历史</small></span>
      </label>
      <label>
        <input type="radio" name="disclose" value="selective" onchange="recalc()">
        <span class="radio-btn">选择性展示<br><small>只展示好的部分</small></span>
      </label>
    </div>
    <div class="param-hint">
      对于"混乱型资产"小组：主动说明"由于第一项目中途才建术语库，导致早期资产一致性不足"，同时承诺在续集中改善——这是建立信任的最佳路径。<br>
      "选择性展示"短期看没问题，但若客户在使用资产时发现差异，将严重损害信任。
    </div>
  </div>
</div>

<!-- ── 决策 3：续集资产管理策略 ── -->
<div class="d-card">
  <div class="d-card-title">
    <span>🗄</span> 决策 3：为《星际侦探2》规划资产管理策略
    <span class="consequence-tag tag-r4">→ 影响第四轮项目基础</span>
  </div>
  <div class="param-row">
    <div class="param-label">续集项目的翻译资产架构选择</div>
    <div class="radio-group">
      <label>
        <input type="radio" name="strategy" value="three-tier" onchange="recalc()">
        <span class="radio-btn">三层 TM 架构<br><small>企业级＋客户级＋项目级</small></span>
      </label>
      <label>
        <input type="radio" name="strategy" value="two-tier" checked onchange="recalc()">
        <span class="radio-btn">两层 TM 架构<br><small>客户级＋项目级</small></span>
      </label>
      <label>
        <input type="radio" name="strategy" value="basic" onchange="recalc()">
        <span class="radio-btn">基础 TM<br><small>仅项目级，最简方案</small></span>
      </label>
    </div>
    <div class="param-hint">
      <strong>三层架构</strong>：企业级 TM 可跨客户复用（如游戏通用词汇），客户级 TM 专属《星际侦探》系列，项目级记录本次新词。初始建设成本较高但长期 ROI 最优。<br>
      <strong>两层架构</strong>：最常见的行业实践，平衡成本与效益。<br>
      <strong>基础 TM</strong>：仅本项目使用，下个项目还得重头开始。
    </div>
  </div>

  <div class="param-row">
    <div class="param-label">术语库与风格指南规划</div>
    <div class="radio-group">
      <label>
        <input type="radio" name="termplan" value="full" onchange="recalc()">
        <span class="radio-btn">规范术语库＋风格指南<br><small>完整文档，最高标准</small></span>
      </label>
      <label>
        <input type="radio" name="termplan" value="standard" checked onchange="recalc()">
        <span class="radio-btn">标准术语库<br><small>完整术语，无风格指南</small></span>
      </label>
      <label>
        <input type="radio" name="termplan" value="minimal" onchange="recalc()">
        <span class="radio-btn">最小化术语表<br><small>仅核心角色名和技能名</small></span>
      </label>
    </div>
    <div class="param-hint">风格指南（Style Guide）规定语气、人称、标点等风格规范，是减少未来审校工作量的重要工具，但需要额外约 2 天时间编写。</div>
  </div>
</div>

<!-- 实时影响预估 -->
<div class="preview-section">
  <div class="preview-title">📊 本轮决策综合影响预估</div>
  <div class="delta-grid">
    <div class="delta-item">
      <div class="delta-label">本轮额外清洗成本调整</div>
      <div class="delta-val" id="dv-clean-adj">—</div>
      <div class="delta-sub" id="dv-clean-sub">—</div>
    </div>
    <div class="delta-item">
      <div class="delta-label">客户满意度变化</div>
      <div class="delta-val" id="dv-sat">—</div>
      <div class="delta-sub" id="dv-sat-sub">—</div>
    </div>
    <div class="delta-item">
      <div class="delta-label">续集 TM 匹配率预估（提升后）</div>
      <div class="delta-val" id="dv-future-tm">—</div>
      <div class="delta-sub" id="dv-future-sub">—</div>
    </div>
    <div class="delta-item">
      <div class="delta-label">资产规划综合评分</div>
      <div class="delta-val" id="dv-asset-score">—</div>
      <div class="delta-sub" id="dv-asset-sub">—</div>
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
const GATE_CODE = 'ROUND3';

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
// 资产状态场景配置
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
const CLEAN_CFG = {
  internal:   { extraCost: 0,    satDelta: 0,   futureBoost: 3,  label: '内部自主清洗' },
  joint:      { extraCost: 2000, satDelta: +8,  futureBoost: 8,  label: '与客户联合审核（+¥2,000）' },
  thirdparty: { extraCost: 5000, satDelta: +5,  futureBoost: 12, label: '第三方标准化（+¥5,000）' },
};
const DISCLOSE_CFG = {
  proactive: { satDelta: +12, label: '主动披露历史问题并提解决方案' },
  current:   { satDelta:  +3, label: '仅提供清洗后当前状态' },
  selective: { satDelta:  -8, label: '选择性展示，隐瞒历史问题' },
};
const STRATEGY_TM_CFG = {
  'three-tier': { assetScore: 95, label: '三层 TM 架构', futureBoost: 12 },
  'two-tier':   { assetScore: 78, label: '两层 TM 架构', futureBoost:  7 },
  'basic':      { assetScore: 50, label: '基础 TM（项目级）', futureBoost: 2 },
};
const TERMPLAN_CFG = {
  full:     { assetScore: 15, label: '规范术语库＋风格指南', futureBoost: 8 },
  standard: { assetScore:  8, label: '标准术语库', futureBoost: 5 },
  minimal:  { assetScore:  2, label: '最小化术语表', futureBoost: 1 },
};

// ─────────────────────────────────────────────
// 当参数改变时
// ─────────────────────────────────────────────
function onParamsChange() {
  const glossary = document.getElementById('r1-glossary').value;
  const sc = ASSET_SCENARIOS[glossary];

  // 更新资产状态卡
  const card = document.getElementById('asset-card');
  card.className = 'asset-card ' + sc.cardClass;
  document.getElementById('asset-title').textContent = sc.title;
  document.getElementById('asset-body').textContent  = sc.body;
  document.getElementById('am-full-match').textContent    = sc.tmFull + '%';
  document.getElementById('am-fuzzy-match').textContent   = sc.tmFuzzy + '%';
  document.getElementById('am-term-entries').textContent  = sc.termEntries ? sc.termEntries.toLocaleString() : '—（需重建）';
  document.getElementById('am-cleaning-cost').textContent = '¥' + sc.cleanCost.toLocaleString();

  // 更新状态栏
  const tmEl = document.getElementById('stat-tm');
  tmEl.textContent = sc.tmFull + '%';
  tmEl.style.color = sc.tmFull >= 55 ? '#27ae60' : sc.tmFull >= 35 ? '#e67e22' : '#c0392b';

  const cleanEl = document.getElementById('stat-clean');
  cleanEl.textContent = '¥' + sc.cleanCost.toLocaleString();
  cleanEl.style.color = sc.cleanCost >= 10000 ? '#c0392b' : sc.cleanCost >= 5000 ? '#e67e22' : '#27ae60';

  const sat = parseInt(document.getElementById('r2-satisfaction').value);
  const satEl = document.getElementById('stat-satisfaction');
  satEl.textContent = sat + ' 分';
  satEl.style.color = sat >= 75 ? '#27ae60' : sat >= 60 ? '#e67e22' : '#c0392b';

  // 更新 ROI 计算器（基于资产状态）
  updateROI(sc);

  recalc();
}

function updateROI(sc) {
  const fullSaving  = Math.round(120000 * sc.tmFull  / 100 * 0.06);
  const fuzzySaving = Math.round(120000 * sc.tmFuzzy / 100 * 0.04);
  const netBenefit  = fullSaving + fuzzySaving + sc.qaSaving - sc.cleanCost - sc.r1Invest;
  const roi = sc.r1Invest > 0 ? Math.round(netBenefit / sc.r1Invest * 100) : null;

  document.getElementById('roi-full-detail').textContent  =
    `（${sc.tmFull}% × 120,000字 × ¥0.06/字）`;
  document.getElementById('roi-fuzzy-detail').textContent =
    `（${sc.tmFuzzy}% × 120,000字 × ¥0.04/字）`;
  document.getElementById('roi-full-saving').textContent  = '¥' + fullSaving.toLocaleString();
  document.getElementById('roi-fuzzy-saving').textContent = '¥' + fuzzySaving.toLocaleString();
  document.getElementById('roi-qa-saving').textContent    = '¥' + sc.qaSaving.toLocaleString();
  document.getElementById('roi-cleaning').textContent     = '− ¥' + sc.cleanCost.toLocaleString();
  document.getElementById('roi-r1-invest').textContent    = '− ¥' + sc.r1Invest.toLocaleString();

  const netEl    = document.getElementById('roi-net');
  const badgeEl  = document.getElementById('roi-badge');
  const netFmt   = (netBenefit >= 0 ? '¥' : '−¥') + Math.abs(netBenefit).toLocaleString('zh-CN');
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

  // 对比说明
  const compares = {
    early:  '当初 ¥3,000 的术语库投资，在续集项目中已带来 ¥' + (fullSaving + fuzzySaving + sc.qaSaving).toLocaleString() + ' 的综合节省——净效益 ¥' + netBenefit.toLocaleString() + '。',
    during: '中途积累的术语库虽有节省，但清洗成本拖累了 ROI。如果第一轮就规范建立，此处净效益将增加约 ¥' + (18000 - 6500).toLocaleString() + '。',
    none:   '第一轮省下的 ¥3,000 术语库投入，今天需要花 ¥18,000 清洗代价来弥补，净损失 ¥' + Math.abs(netBenefit).toLocaleString() + '。这就是"短视决策"的成本。',
  };
  document.getElementById('roi-compare').textContent =
    compares[document.getElementById('r1-glossary').value];
}

// ─────────────────────────────────────────────
// 重算
// ─────────────────────────────────────────────
function recalc() {
  const glossary = document.getElementById('r1-glossary').value;
  const sc       = ASSET_SCENARIOS[glossary];
  const clean    = (document.querySelector('input[name="clean"]:checked')    || { value: 'internal'  }).value;
  const disclose = (document.querySelector('input[name="disclose"]:checked') || { value: 'proactive' }).value;
  const strategy = (document.querySelector('input[name="strategy"]:checked') || { value: 'two-tier'  }).value;
  const termplan = (document.querySelector('input[name="termplan"]:checked') || { value: 'standard'  }).value;

  const cleanCfg    = CLEAN_CFG[clean];
  const discloseCfg = DISCLOSE_CFG[disclose];
  const stratCfg    = STRATEGY_TM_CFG[strategy];
  const termCfg     = TERMPLAN_CFG[termplan];

  const initSat  = parseInt(document.getElementById('r2-satisfaction').value);
  const finalSat = Math.min(95, Math.max(30, initSat + discloseCfg.satDelta + cleanCfg.satDelta));
  const assetScore = Math.min(100, stratCfg.assetScore + termCfg.assetScore);
  const futureTM   = Math.min(85, sc.tmFull + cleanCfg.futureBoost + stratCfg.futureBoost + termCfg.futureBoost);

  // Delta grid
  const cleanAdj = document.getElementById('dv-clean-adj');
  cleanAdj.textContent = cleanCfg.extraCost > 0
    ? '+¥' + cleanCfg.extraCost.toLocaleString() : '¥0（无额外费用）';
  cleanAdj.className = 'delta-val ' + (cleanCfg.extraCost > 0 ? 'impact-negative' : 'impact-neutral');
  document.getElementById('dv-clean-sub').textContent = cleanCfg.label;

  const satEl = document.getElementById('dv-sat');
  const satDelta = discloseCfg.satDelta + cleanCfg.satDelta;
  satEl.textContent = (satDelta >= 0 ? '+' : '') + satDelta + ' 分（→ ' + finalSat + '）';
  satEl.className = 'delta-val ' + (satDelta >= 0 ? 'impact-positive' : 'impact-negative');
  document.getElementById('dv-sat-sub').textContent = discloseCfg.label;

  document.getElementById('dv-future-tm').textContent = futureTM + '%';
  document.getElementById('dv-future-tm').className = 'delta-val ' +
    (futureTM >= 70 ? 'impact-positive' : futureTM >= 50 ? 'impact-neutral' : 'impact-negative');
  document.getElementById('dv-future-sub').textContent = stratCfg.label + ' · ' + termCfg.label;

  const scoreEl = document.getElementById('dv-asset-score');
  scoreEl.textContent = assetScore + ' / 100';
  scoreEl.className = 'delta-val ' + (assetScore >= 80 ? 'impact-positive' : assetScore >= 60 ? 'impact-neutral' : 'impact-negative');
  document.getElementById('dv-asset-sub').textContent = assetScore >= 80 ? '资产规范化程度高' : assetScore >= 60 ? '达到行业中等水准' : '资产管理仍有较大提升空间';

  updateSummary();
}

// ─────────────────────────────────────────────
// 摘要生成
// ─────────────────────────────────────────────
function generateSummary() { recalc(); }

function updateSummary() {
  const glossary = document.getElementById('r1-glossary').value;
  const riskPlan = document.getElementById('r1-riskplan').value;
  const sc       = ASSET_SCENARIOS[glossary];
  const clean    = (document.querySelector('input[name="clean"]:checked')    || { value: 'internal'  }).value;
  const disclose = (document.querySelector('input[name="disclose"]:checked') || { value: 'proactive' }).value;
  const strategy = (document.querySelector('input[name="strategy"]:checked') || { value: 'two-tier'  }).value;
  const termplan = (document.querySelector('input[name="termplan"]:checked') || { value: 'standard'  }).value;

  const cleanCfg    = CLEAN_CFG[clean];
  const discloseCfg = DISCLOSE_CFG[disclose];
  const stratCfg    = STRATEGY_TM_CFG[strategy];
  const termCfg     = TERMPLAN_CFG[termplan];

  const initSat  = parseInt(document.getElementById('r2-satisfaction').value);
  const finalSat = Math.min(95, Math.max(30, initSat + discloseCfg.satDelta + cleanCfg.satDelta));
  const assetScore = Math.min(100, stratCfg.assetScore + termCfg.assetScore);
  const futureTM   = Math.min(85, sc.tmFull + cleanCfg.futureBoost + stratCfg.futureBoost + termCfg.futureBoost);

  const fullSaving  = Math.round(120000 * sc.tmFull  / 100 * 0.06);
  const fuzzySaving = Math.round(120000 * sc.tmFuzzy / 100 * 0.04);
  const netBenefit  = fullSaving + fuzzySaving + sc.qaSaving - sc.cleanCost - sc.r1Invest;

  const glossaryLabel = { early: '第1周建立（规范型）', during: '翻译中积累（混合型）', none: '未建立（混乱型）' };
  const riskLabel     = { detailed: '详细预案', standard: '标准预案', brief: '简略预案' };
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
    `  · 资产清洗成本：¥${sc.cleanCost.toLocaleString()}`,
    `  · 续集项目 TM 净效益：${netBenefit >= 0 ? '+¥' : '−¥'}${Math.abs(netBenefit).toLocaleString()}  ${emoji(netBenefit, 0, -10000)}`,
    '',
    '  【本轮三项决策】',
    `  · 决策 1（资产清洗方案）：${cleanCfg.label}`,
    `  · 决策 2（客户沟通策略）：${discloseCfg.label}`,
    `  · 决策 3（资产管理架构）：${stratCfg.label} ＋ ${termCfg.label}`,
    '',
    '  【本轮决策影响预估】',
    `  · 客户满意度变化：${discloseCfg.satDelta + cleanCfg.satDelta >= 0 ? '+' : ''}${discloseCfg.satDelta + cleanCfg.satDelta} 分 → 最终 ${finalSat} 分  ${emoji(finalSat, 75, 60)}`,
    `  · 续集项目 TM 匹配率预估：${futureTM}%  ${emoji(futureTM, 65, 45)}`,
    `  · 资产规范化评分：${assetScore}/100  ${emoji(assetScore, 80, 60)}`,
    '───────────────────────────────────────────',
    '  ★ 第四轮触发参数（教师参考）',
    `  → 风险预案资源：${riskLabel[riskPlan]}（源自第一轮）`,
    `  → 客户关系：${finalSat >= 75 ? '良好（续约谈判有筹码）' : finalSat >= 60 ? '一般（需维护）' : '紧张（续约面临压力）'}`,
    `  → 资产管理基础：${assetScore >= 80 ? '规范，有系统化 SOP 基础' : assetScore >= 60 ? '一般，部分内容需补充' : '薄弱，缺乏系统化积累'}`,
    '═══════════════════════════════════════════',
  ].join('\n');

  document.getElementById('summary-box').textContent = text;

  try {
    localStorage.setItem('sim_r3', JSON.stringify({
      group,
      glossary,
      riskPlan,
      finalSatisfaction: finalSat,
      assetScore,
      futureTM,
      cleanStrategy:    clean,
      disclosureChoice: disclose,
      assetStrategy:    strategy + '+' + termplan,
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
  window.location = '/class/localization-sim-r4/';
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
});
</script>
