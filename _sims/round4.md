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
.gate-input:focus { border-color: #2c6bac; }
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
.prev-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
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
  border-radius: 12px; padding: 1.3rem 1.5rem; margin-bottom: 1.5rem; border: 2px solid;
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
  margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
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
  margin-bottom: 1rem; color: #555;
}
.resource-hint .avail  { color: #1e7e50; font-weight: 700; }
.resource-hint .noavail { color: #c0392b; font-weight: 700; }
.param-row { margin-bottom: 0; }
.param-label { font-size: 0.88rem; font-weight: 600; color: #444; margin-bottom: 0.4rem; }
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
  border-color: #2c6bac; background: #eaf2ff; color: #1a4f90; font-weight: 600;
}
.strategy-tag {
  display: inline-block; font-size: 0.68rem; font-weight: 700;
  padding: 0.1rem 0.4rem; border-radius: 3px; margin-top: 0.2rem;
}
.tag-mitigate { background: #e8f8f0; color: #1e7e50; }
.tag-transfer { background: #eaf2ff; color: #1a4f90; }
.tag-accept   { background: #fff9e6; color: #8a6000; }
.tag-avoid    { background: #fdecea; color: #c0392b; }

/* ── 课程闭环反思 ── */
.reflection-section {
  background: #1a2f50; color: white;
  border-radius: 14px; padding: 1.6rem 1.8rem; margin: 1.5rem 0;
}
.reflection-title {
  font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem;
  color: #a8d8ff;
}
.reflection-sub {
  font-size: 0.85rem; color: #aac; margin-bottom: 1.2rem; line-height: 1.6;
}
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
  .status-grid  { grid-template-columns: 1fr 1fr; }
  .prev-grid    { grid-template-columns: 1fr; }
  .impact-grid  { grid-template-columns: 1fr; }
  .res-grid     { grid-template-columns: 1fr; }
  .crisis-trio  { flex-direction: column; }
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

<!-- 参数继承面板 -->
<div class="prev-panel">
  <div class="prev-panel-title">
    📥 继承自历史轮次的关键参数
    <span class="auto-badge" id="auto-badge" style="display:none">已自动读取</span>
  </div>
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
  <div class="prev-hint">请对照历史轮次决策摘要核对以上参数。若已自动读取，请确认与小组实际决策一致。</div>
</div>

<!-- 预案资源状态卡（差异化） -->
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

<!-- 三封危机邮件（并排） -->
<div class="crisis-trio">
  <div class="crisis-email crisis-red">
    <div><span class="crisis-badge badge-red">情况一 · 人员风险</span></div>
    <div class="crisis-title">主译者王磊突然住院 🏥</div>
    <div class="crisis-body">
      王磊负责的 40%对话文本（约22,000字）尚未完成，预计住院休息2–3周。<br>
      剩余工期：<strong>3.5 周</strong>，交付节点<strong>不可延误</strong>。<br>
      问：如何在不延期的前提下确保交付？
    </div>
  </div>
  <div class="crisis-email crisis-orange">
    <div><span class="crisis-badge badge-orange">情况二 · 变更风险</span></div>
    <div class="crisis-title">客户追加6,000字，不加预算 📋</div>
    <div class="crisis-body">
      米兔互娱新增了一个支线任务的对话内容，共约6,000字，<strong>要求不增加预算、不延误上线</strong>。<br>
      项目当前已无剩余储备金可用。<br>
      问：如何处理这个范围变更请求？
    </div>
  </div>
  <div class="crisis-email crisis-purple">
    <div><span class="crisis-badge badge-purple">情况三 · 合规风险</span></div>
    <div class="crisis-title">发现版权侵权风险 ⚖️</div>
    <div class="crisis-body">
      法务团队发现原始中文脚本中某段独白与已出版小说存在高度相似，涉嫌抄袭。若原著权利人追诉，<strong>贵司作为本地化方也可能承担连带责任</strong>。<br>
      问：如何处理，如何告知客户？
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
    <div class="status-label">剩余工期</div>
    <div class="status-value" id="stat-week">3.5 周</div>
    <div class="status-sub">三危机同时爆发</div>
  </div>
  <div class="status-card">
    <div class="status-label">危机应对综合评分</div>
    <div class="status-value" id="stat-score">—</div>
    <div class="status-sub">三轮决策综合</div>
  </div>
</div>

<!-- ── 决策 1：情况一——人员风险 ── -->
<div class="d-card">
  <div class="d-card-title">
    <span class="crisis-indicator ind-red">情况一</span>
    <span>人员风险应对策略</span>
  </div>
  <div class="resource-hint" id="c1-hint">加载中……</div>
  <div class="param-row">
    <div class="param-label">选择应对策略（PMBOK 四种风险应对）</div>
    <div class="radio-group">
      <label>
        <input type="radio" name="c1" value="mitigate" checked onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-mitigate">缓解 Mitigate</span><br>
          启用备选译者补位<br><small id="c1-mitigate-cost">加载中……</small>
        </span>
      </label>
      <label>
        <input type="radio" name="c1" value="transfer" onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-transfer">转移 Transfer</span><br>
          分包给外部 LSP<br><small>约¥12,000，速度快</small>
        </span>
      </label>
      <label>
        <input type="radio" name="c1" value="accept" onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-accept">接受 Accept</span><br>
          申请延期 2 周<br><small>质量保证，但上线延误</small>
        </span>
      </label>
    </div>
    <div class="param-hint">
      <strong>风险预案影响：</strong>有备选译者清单的组，"缓解"选项成本大幅降低。无清单的组只能临时通过招聘渠道寻找，时间和成本均偏高。
    </div>
  </div>
</div>

<!-- ── 决策 2：情况二——需求变更 ── -->
<div class="d-card">
  <div class="d-card-title">
    <span class="crisis-indicator ind-orange">情况二</span>
    <span>需求变更管理策略</span>
  </div>
  <div class="resource-hint" id="c2-hint">加载中……</div>
  <div class="param-row">
    <div class="param-label">如何回应客户的追加文本请求？</div>
    <div class="radio-group">
      <label>
        <input type="radio" name="c2" value="changereq" checked onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-avoid">规避 Avoid</span><br>
          提交正式变更申请<br><small>要求追加预算或延期</small>
        </span>
      </label>
      <label>
        <input type="radio" name="c2" value="negotiate" onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-mitigate">缓解 Mitigate</span><br>
          分步协商：部分免费，其余补偿<br><small>灵活，但需谈判</small>
        </span>
      </label>
      <label>
        <input type="radio" name="c2" value="absorb" onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-accept">接受 Accept</span><br>
          无偿吸收，维护客户关系<br><small>短期满意，长期亏损</small>
        </span>
      </label>
    </div>
    <div class="param-hint">
      <strong>变更管理核心原则：</strong>任何超出原合同范围的工作，无论大小，都应形成书面变更记录（Change Request），哪怕最终双方同意免费处理。这是保护双方权益的基础。有变更审批流程预案的小组，此处有合同依据可参照。
    </div>
  </div>
</div>

<!-- ── 决策 3：情况三——合规风险 ── -->
<div class="d-card">
  <div class="d-card-title">
    <span class="crisis-indicator ind-purple">情况三</span>
    <span>版权合规风险处理</span>
  </div>
  <div class="resource-hint" id="c3-hint">加载中……</div>
  <div class="param-row">
    <div class="param-label">如何处理潜在的版权侵权风险？</div>
    <div class="radio-group">
      <label>
        <input type="radio" name="c3" value="immediate" checked onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-avoid">规避 Avoid</span><br>
          立即暂停该场景翻译，通知客户，启动法务核查<br><small>合规但影响工期</small>
        </span>
      </label>
      <label>
        <input type="radio" name="c3" value="modify" onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-mitigate">缓解 Mitigate</span><br>
          修改译文规避相似内容，不通知客户<br><small>快速，但回避了根本问题</small>
        </span>
      </label>
      <label>
        <input type="radio" name="c3" value="deliver" onchange="recalc()">
        <span class="radio-btn">
          <span class="strategy-tag tag-accept">接受 Accept</span><br>
          按计划交付，事后处理<br><small>最高法律风险</small>
        </span>
      </label>
    </div>
    <div class="param-hint">
      合规风险是最容易被低估、但影响最深远的风险类型。版权侵权一旦坐实，LSP 可能承担连带责任，损失远超本项目合同金额。有版权检查清单的组，此刻有处理依据，且可向客户证明"我方已尽职审查"。
    </div>
  </div>
</div>

<!-- ── 课程闭环反思 ── -->
<div class="reflection-section">
  <div class="reflection-title">🔁 课程闭环反思——四轮学习弧的终点</div>
  <div class="reflection-sub">
    回到你们第一轮的简报：你们当时的风险预案里，有没有识别今天这三个危机？<br>
    如果有，今天的应对资源是什么？如果没有，你们漏掉了什么，代价是多少？
  </div>
  <table class="reflection-table">
    <thead>
      <tr>
        <th>今日危机</th>
        <th>第一轮预案中的对应内容</th>
        <th>今日应对资源</th>
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
      <div class="impact-label">情况一：额外成本</div>
      <div class="impact-val" id="iv-c1-cost">—</div>
      <div class="impact-sub" id="iv-c1-sub">—</div>
    </div>
    <div class="impact-item">
      <div class="impact-label">情况二：关系影响</div>
      <div class="impact-val" id="iv-c2-rel">—</div>
      <div class="impact-sub" id="iv-c2-sub">—</div>
    </div>
    <div class="impact-item">
      <div class="impact-label">情况三：法律风险</div>
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
const GATE_CODE = 'ROUND4';

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
// 历史数据读取
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
    if (r1.riskPlan) {
      document.getElementById('r1-riskplan').value = r1.riskPlan; loaded = true;
    }
    if (typeof r3.finalSatisfaction === 'number') {
      document.getElementById('r3-satisfaction').value =
        r3.finalSatisfaction >= 80 ? '80' : r3.finalSatisfaction >= 65 ? '65' : '50';
    }
    if (typeof r3.assetScore === 'number') {
      document.getElementById('r3-asset').value =
        r3.assetScore >= 80 ? '85' : r3.assetScore >= 60 ? '65' : '45';
    }
    if (loaded) document.getElementById('auto-badge').style.display = 'inline-block';
    onParamsChange();
  } catch(e) {}
}

// ─────────────────────────────────────────────
// 预案资源场景配置
// ─────────────────────────────────────────────
const RISK_SCENARIOS = {
  detailed: {
    cardClass: 'res-green',
    title: '🟢 预案充分——三个危机均有应对依据',
    body: '由于第一轮制定了详细风险预案，今天面对三个危机时你们有清晰的行动框架：备选译者名单已就位，变更审批流程有文档依据，版权检查清单提供了责任边界。',
    c1: { status: '🟢 有备选译者清单', cls: 'res-available', detail: '启用成本 ≈ ¥3,500', mitigateCost: 3500 },
    c2: { status: '🟢 有变更审批流程', cls: 'res-available', detail: '谈判时有合同依据' },
    c3: { status: '🟢 有版权检查清单', cls: 'res-available', detail: '有尽职审查记录' },
  },
  standard: {
    cardClass: 'res-yellow',
    title: '⚠ 预案部分充分——部分危机有依据，部分需临时处置',
    body: '第一轮制定了标准预案，识别了主要风险并给出了基本应对思路。但细节不足——今天面对危机时，有些能找到参照，有些需要临时拍板。',
    c1: { status: '🟡 有基本风险识别', cls: 'res-partial', detail: '临时招募，成本偏高', mitigateCost: 7500 },
    c2: { status: '🟡 口头变更约定', cls: 'res-partial', detail: '谈判时依据不足' },
    c3: { status: '🔴 无版权检查清单', cls: 'res-unavailable', detail: '责任边界不清晰' },
  },
  brief: {
    cardClass: 'res-red',
    title: '🔴 预案严重不足——三个危机都需要临时救火',
    body: '第一轮只列出了风险点，没有制定具体预案。今天三个危机同时爆发，团队没有任何预定资源可以调用，所有响应都是临时决策，时间和成本代价极高。',
    c1: { status: '🔴 无备选译者方案', cls: 'res-unavailable', detail: '临时招募需7–10天，额外约¥15,000', mitigateCost: 15000 },
    c2: { status: '🔴 无变更流程记录', cls: 'res-unavailable', detail: '客户可拒绝任何诉求' },
    c3: { status: '🔴 无版权审查机制', cls: 'res-unavailable', detail: '法律风险敞口完全暴露' },
  },
};

// ─────────────────────────────────────────────
// 决策影响配置
// ─────────────────────────────────────────────
const C1_CFG = {
  mitigate: { label: '启用备选译者（缓解）',  scheduleDelta: 0,  satDelta: +5,  legalRisk: 0 },
  transfer: { label: '分包给外部 LSP（转移）', scheduleDelta: 0,  satDelta: +3,  legalRisk: 0 },
  accept:   { label: '申请延期2周（接受）',     scheduleDelta: -2, satDelta: -10, legalRisk: 0 },
};
const C2_CFG = {
  changereq: { label: '提交正式变更申请（规避）', satDelta: -3, legalRisk: 0, costDelta: 0 },
  negotiate: { label: '分步协商（缓解）',         satDelta: +5, legalRisk: 0, costDelta: 2000 },
  absorb:    { label: '无偿吸收（接受）',          satDelta: +8, legalRisk: 0, costDelta: 4500 },
};
const C3_CFG = {
  immediate: { label: '立即暂停+通知客户+法务核查（规避）', satDelta: -5, legalRisk: 0,   scheduleDelta: -0.5 },
  modify:    { label: '修改译文规避，不通知客户（缓解）',     satDelta: 0,  legalRisk: -20, scheduleDelta: 0 },
  deliver:   { label: '按计划交付，事后处理（接受）',          satDelta: -2, legalRisk: -40, scheduleDelta: 0 },
};

function getRiskPlan() { return document.getElementById('r1-riskplan').value; }
function getSat()      { return parseInt(document.getElementById('r3-satisfaction').value); }
function getAsset()    { return parseInt(document.getElementById('r3-asset').value); }

// ─────────────────────────────────────────────
// 参数变化
// ─────────────────────────────────────────────
function onParamsChange() {
  const rp = getRiskPlan();
  const sc = RISK_SCENARIOS[rp];

  // 更新资源卡
  const card = document.getElementById('resource-card');
  card.className = 'resource-card ' + sc.cardClass;
  document.getElementById('res-title').textContent = sc.title;
  document.getElementById('res-body').textContent  = sc.body;

  [['c1', sc.c1], ['c2', sc.c2], ['c3', sc.c3]].forEach(([id, r]) => {
    const el = document.getElementById('res-' + id + '-status');
    el.textContent = r.status;
    el.className = r.cls;
    document.getElementById('res-' + id + '-detail').textContent = r.detail;
  });

  // 更新状态栏
  const resEl = document.getElementById('stat-resource');
  resEl.textContent = rp === 'detailed' ? '丰富' : rp === 'standard' ? '有限' : '极少';
  resEl.style.color = rp === 'detailed' ? '#27ae60' : rp === 'standard' ? '#e67e22' : '#c0392b';

  const sat = getSat();
  const satEl = document.getElementById('stat-sat');
  satEl.textContent = sat + ' 分';
  satEl.style.color = sat >= 75 ? '#27ae60' : sat >= 60 ? '#e67e22' : '#c0392b';

  // 更新决策区资源提示
  const c1Hint = document.getElementById('c1-hint');
  c1Hint.innerHTML = sc.c1.cls === 'res-available'
    ? `<span class="avail">✅ 有备选译者清单</span>——直接联系清单中的备选译者，估计 1–2 天可到位，额外成本约 ¥${sc.c1.mitigateCost.toLocaleString()}。`
    : sc.c1.cls === 'res-partial'
    ? `<span class="noavail">⚠ 无完整备选名单</span>——需临时通过招聘渠道寻找，预计需 4–6 天，额外成本约 ¥${sc.c1.mitigateCost.toLocaleString()}。`
    : `<span class="noavail">❌ 无任何备选方案</span>——只能从零开始招募，预计需 7–10 天，额外成本约 ¥${sc.c1.mitigateCost.toLocaleString()}。这是风险预案缺失的直接代价。`;

  const c2Hint = document.getElementById('c2-hint');
  c2Hint.innerHTML = sc.c2.cls === 'res-available'
    ? `<span class="avail">✅ 有变更审批流程文档</span>——可向客户出示合同中的"范围变更条款"，引导其走正式变更流程，谈判时有充分依据。`
    : sc.c2.cls === 'res-partial'
    ? `<span class="noavail">⚠ 仅有口头约定</span>——缺乏书面变更流程，谈判时难以引用合同条款，客户可能坚持无偿追加。`
    : `<span class="noavail">❌ 无变更管理流程</span>——客户认为追加文本是合理要求，你们没有书面依据可以拒绝。接受后将进一步压缩利润空间。`;

  const c3Hint = document.getElementById('c3-hint');
  c3Hint.innerHTML = sc.c3.cls === 'res-available'
    ? `<span class="avail">✅ 有版权检查清单</span>——清单记录了已做版权尽职调查的证明，可向客户证明"我方已尽职审核"，有效限制连带责任。`
    : `<span class="noavail">❌ 无版权检查清单</span>——无法证明已进行过版权尽职审查，一旦发生侵权诉讼，贵司连带责任风险较高。这是本轮影响最深远的预案缺失。`;

  // 更新情况一缓解选项成本标注
  document.getElementById('c1-mitigate-cost').textContent =
    `额外约¥${sc.c1.mitigateCost.toLocaleString()}（${rp === 'detailed' ? '有清单，速度快' : rp === 'standard' ? '无完整清单，偏慢' : '无预案，成本高'})`;

  updateReflection();
  recalc();
}

// ─────────────────────────────────────────────
// 闭环反思更新
// ─────────────────────────────────────────────
function updateReflection() {
  const rp = getRiskPlan();
  const sc = RISK_SCENARIOS[rp];

  const planLabel = { detailed: '详细预案', standard: '标准预案', brief: '简略预案' };
  const rows = [
    {
      crisis: '主译者住院（人员风险）',
      plan: rp === 'detailed' ? '✅ 已识别并制定备选译者清单' : rp === 'standard' ? '⚠ 已识别，但无详细备选方案' : '❌ 仅列为风险点，无预案',
      resultClass: sc.c1.cls === 'res-available' ? 'ref-result-good' : sc.c1.cls === 'res-partial' ? 'ref-result-mid' : 'ref-result-bad',
      result: sc.c1.cls === 'res-available' ? '资源充足，低成本应对（约¥3,500）' : sc.c1.cls === 'res-partial' ? '资源有限，中等成本（约¥7,500）' : '无预案，高成本救火（约¥15,000）',
    },
    {
      crisis: '客户追加文本（需求变更风险）',
      plan: rp === 'detailed' ? '✅ 已建立变更审批流程文档' : rp === 'standard' ? '⚠ 有基本变更流程意识' : '❌ 未识别此类风险',
      resultClass: sc.c2.cls === 'res-available' ? 'ref-result-good' : sc.c2.cls === 'res-partial' ? 'ref-result-mid' : 'ref-result-bad',
      result: sc.c2.cls === 'res-available' ? '谈判有据，能有效维护权益' : sc.c2.cls === 'res-partial' ? '谈判依据不足，结果不确定' : '无任何书面依据，被动接受',
    },
    {
      crisis: '版权侵权风险（合规风险）',
      plan: rp === 'detailed' ? '✅ 已制作版权内容检查清单' : '❌ 未将版权风险纳入预案',
      resultClass: sc.c3.cls === 'res-available' ? 'ref-result-good' : 'ref-result-bad',
      result: sc.c3.cls === 'res-available' ? '有尽职审查证明，连带责任可限制' : '无记录，法律责任敞口最大',
    },
  ];

  const tbody = document.getElementById('reflection-body');
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td><span class="ref-crisis">${r.crisis}</span></td>
      <td><span class="ref-plan">${r.plan}</span></td>
      <td><span class="${r.resultClass}">${r.result}</span></td>
    </tr>`).join('');

  const closings = {
    detailed: '你们第一轮投入的风险预案工作，在今天的三个危机中全部发挥了作用——这就是前瞻性风险管理（Proactive Risk Management）的价值：危机不可避免，但预案让你们以更低的成本、更快的速度、更专业的姿态应对。',
    standard: '你们第一轮的标准预案，在部分危机中提供了依据，但在版权和变更细节上留下了缺口。风险管理的价值不只在于识别风险，更在于为每个风险准备足够细化的应对资源——"识别了"和"有预案"是两件完全不同的事。',
    brief: '今天三个危机都付出了额外代价——这就是第一轮"省下"风险预案时间和成本的真实代价。PMBOK 将风险管理放在"规划过程组"是有深刻原因的：危机爆发时才开始应对，永远比事前规划的成本高。',
  };
  document.getElementById('reflection-closing').textContent = closings[rp];
}

// ─────────────────────────────────────────────
// 重算
// ─────────────────────────────────────────────
function recalc() {
  const rp  = getRiskPlan();
  const sc  = RISK_SCENARIOS[rp];
  const sat = getSat();
  const asset = getAsset();

  const c1 = (document.querySelector('input[name="c1"]:checked') || { value: 'mitigate' }).value;
  const c2 = (document.querySelector('input[name="c2"]:checked') || { value: 'changereq' }).value;
  const c3 = (document.querySelector('input[name="c3"]:checked') || { value: 'immediate' }).value;

  const c1Cfg = C1_CFG[c1];
  const c2Cfg = C2_CFG[c2];
  const c3Cfg = C3_CFG[c3];

  // 成本计算
  const mitigateCost = sc.c1.mitigateCost;
  const c1Cost = c1 === 'mitigate' ? mitigateCost : c1 === 'transfer' ? 12000 : 0;
  const c2Cost = c2Cfg.costDelta || 0;

  // 满意度综合
  const satDelta = c1Cfg.satDelta + c2Cfg.satDelta + c3Cfg.satDelta;
  const finalSat = Math.min(95, Math.max(20, sat + satDelta));

  // 工期影响（周）
  const schedDelta = (c1Cfg.scheduleDelta || 0) + (c3Cfg.scheduleDelta || 0);

  // 法律风险（0 = 安全, -20 = 中风险, -40 = 高风险）
  const legalRisk = c3Cfg.legalRisk;

  // 综合评分（基于预案质量 + 应对决策质量）
  const riskScore = { detailed: 40, standard: 25, brief: 10 }[rp];
  const c1Score = c1 === 'mitigate' ? 15 : c1 === 'transfer' ? 10 : 5;
  const c2Score = c2 === 'changereq' ? 15 : c2 === 'negotiate' ? 12 : 5;
  const c3Score = c3 === 'immediate' ? 15 : c3 === 'modify' ? 5 : 0;
  const assetScore = Math.round(asset / 100 * 15);
  const pmScore = Math.min(100, riskScore + c1Score + c2Score + c3Score + assetScore);

  // 更新影响预估
  const c1CostEl = document.getElementById('iv-c1-cost');
  c1CostEl.textContent = '+ ¥' + c1Cost.toLocaleString();
  c1CostEl.className = 'impact-val ' + (c1Cost > 10000 ? 'color-red' : c1Cost > 5000 ? 'color-orange' : 'color-green');
  document.getElementById('iv-c1-sub').textContent = c1Cfg.label;

  const c2RelEl = document.getElementById('iv-c2-rel');
  c2RelEl.textContent = c2Cfg.satDelta > 0 ? '+' + c2Cfg.satDelta + ' 分' : c2Cfg.satDelta + ' 分';
  c2RelEl.className = 'impact-val ' + (c2Cfg.satDelta > 0 ? 'color-green' : c2Cfg.satDelta < -5 ? 'color-red' : 'color-orange');
  document.getElementById('iv-c2-sub').textContent = c2Cfg.label;

  const c3LegalEl = document.getElementById('iv-c3-legal');
  c3LegalEl.textContent = legalRisk === 0 ? '低（已规避）' : legalRisk === -20 ? '中（未消除）' : '高（完全暴露）';
  c3LegalEl.className = 'impact-val ' + (legalRisk === 0 ? 'color-green' : legalRisk === -20 ? 'color-orange' : 'color-red');
  document.getElementById('iv-c3-sub').textContent = c3Cfg.label;

  const schedEl = document.getElementById('iv-schedule');
  schedEl.textContent = schedDelta < 0 ? schedDelta + ' 周' : '不受影响';
  schedEl.className = 'impact-val ' + (schedDelta < -1 ? 'color-red' : schedDelta < 0 ? 'color-orange' : 'color-green');
  document.getElementById('iv-schedule-sub').textContent =
    schedDelta < 0 ? '上线节点延误，需告知发行商' : '按计划交付';

  const satEl2 = document.getElementById('iv-sat');
  satEl2.textContent = finalSat + ' 分';
  satEl2.className = 'impact-val ' + (finalSat >= 75 ? 'color-green' : finalSat >= 60 ? 'color-orange' : 'color-red');

  const scoreEl = document.getElementById('iv-score');
  scoreEl.textContent = pmScore + ' / 100';
  scoreEl.className = 'impact-val ' + (pmScore >= 80 ? 'color-green' : pmScore >= 60 ? 'color-blue' : 'color-orange');
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
  const rp  = getRiskPlan();
  const sat = getSat();
  const sc  = RISK_SCENARIOS[rp];

  const c1 = (document.querySelector('input[name="c1"]:checked') || { value: 'mitigate' }).value;
  const c2 = (document.querySelector('input[name="c2"]:checked') || { value: 'changereq' }).value;
  const c3 = (document.querySelector('input[name="c3"]:checked') || { value: 'immediate' }).value;

  const c1Cost  = c1 === 'mitigate' ? sc.c1.mitigateCost : c1 === 'transfer' ? 12000 : 0;
  const satDelta = C1_CFG[c1].satDelta + C2_CFG[c2].satDelta + C3_CFG[c3].satDelta;
  const finalSat = Math.min(95, Math.max(20, sat + satDelta));
  const schedDelta = (C1_CFG[c1].scheduleDelta || 0) + (C3_CFG[c3].scheduleDelta || 0);
  const legalRisk = C3_CFG[c3].legalRisk;

  const riskScore = { detailed: 40, standard: 25, brief: 10 }[rp];
  const pmScore = Math.min(100, riskScore +
    (c1 === 'mitigate' ? 15 : c1 === 'transfer' ? 10 : 5) +
    (c2 === 'changereq' ? 15 : c2 === 'negotiate' ? 12 : 5) +
    (c3 === 'immediate' ? 15 : c3 === 'modify' ? 5 : 0) +
    Math.round(getAsset() / 100 * 15));

  const rpLabel = { detailed: '详细预案（丰富）', standard: '标准预案（有限）', brief: '简略预案（极少）' };
  const emoji   = (n, hi, mid) => n >= hi ? '🟢' : n >= mid ? '🟡' : '🔴';

  const group = document.getElementById('group-name').value.trim() || '（未填写小组名）';
  const now   = new Date().toLocaleString('zh-CN', { hour12: false });

  const text = [
    '═══════════════════════════════════════════',
    '  翻译项目沙盘 · 第四轮决策摘要（最终版）',
    '═══════════════════════════════════════════',
    `  小组名称：${group}`,
    `  提交时间：${now}`,
    '───────────────────────────────────────────',
    '  【进入本轮的关键参数】',
    `  · 第一轮风险预案质量：${rpLabel[rp]}`,
    `  · 进入本轮客户满意度：${sat} 分`,
    '',
    '  【三危机应对决策】',
    `  · 情况一（人员风险）：${C1_CFG[c1].label}`,
    `    额外成本：¥${c1Cost.toLocaleString()}`,
    `  · 情况二（需求变更）：${C2_CFG[c2].label}`,
    `  · 情况三（合规风险）：${C3_CFG[c3].label}`,
    `    法律风险等级：${legalRisk === 0 ? '低（已规避）' : legalRisk === -20 ? '中（未消除）' : '高（完全暴露）'}  ${emoji(-legalRisk, 30, 10)}`,
    '',
    '  【本轮综合影响】',
    `  · 客户满意度变化：${satDelta >= 0 ? '+' : ''}${satDelta} 分 → 最终 ${finalSat} 分  ${emoji(finalSat, 75, 60)}`,
    `  · 工期影响：${schedDelta < 0 ? schedDelta + ' 周（延误）' : '按计划交付'}  ${emoji(-schedDelta, -0.1, -1)}`,
    `  · PM 综合评分：${pmScore} / 100  ${emoji(pmScore, 80, 60)}`,
    '───────────────────────────────────────────',
    '  ★ 课程闭环反思',
    `  · 风险预案资源等级：${rpLabel[rp]}`,
    `  · 情况一（人员风险）预案：${rp === 'detailed' ? '✅ 有备选译者清单，低成本应对' : rp === 'standard' ? '⚠ 有基本识别，成本偏高' : '❌ 无预案，高成本救火'}`,
    `  · 情况二（变更管理）预案：${rp === 'detailed' ? '✅ 有变更审批流程，谈判有据' : '❌ 无流程文档，谈判被动'}`,
    `  · 情况三（版权合规）预案：${rp === 'detailed' ? '✅ 有版权检查清单，责任可限制' : '❌ 无版权检查机制，风险敞口大'}`,
    '───────────────────────────────────────────',
    '  核心反思：',
    `  风险管理属于"规划过程组"，不是"危机爆发才开始应对"。`,
    `  今天体验到的，就是第一轮决策的最终后果。`,
    '═══════════════════════════════════════════',
  ].join('\n');

  document.getElementById('summary-box').textContent = text;

  try {
    localStorage.setItem('sim_r4', JSON.stringify({ group, pmScore, finalSat, rp, c1, c2, c3 }));
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
});
</script>
