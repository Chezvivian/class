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
.round-nav { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.round-tab {
  padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.82rem; font-weight: 600;
  border: 2px solid #dce3ed; color: #aaa; background: #f5f7fa; cursor: default;
}
.round-tab.active { background: #2c6bac; color: white; border-color: #2c6bac; }
.round-tab.locked { opacity: 0.45; }

/* ── 情景邮件卡片 ── */
.email-card {
  background: #fffcf0;
  border: 1px solid #e8d47a;
  border-left: 5px solid #f0a500;
  border-radius: 0 10px 10px 0;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.75rem;
}
.email-meta { font-size: 0.8rem; color: #888; margin-bottom: 0.6rem; line-height: 1.7; }
.email-meta span { font-weight: 600; color: #555; }
.email-body { font-size: 0.92rem; line-height: 1.75; color: #333; }
.email-task {
  margin-top: 0.75rem; padding: 0.6rem 0.9rem;
  background: #fff8e1; border-radius: 6px;
  font-weight: 600; font-size: 0.9rem; color: #8a6000;
}

/* ── 项目状态栏 ── */
.status-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
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
  margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
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
.param-hint { font-size: 0.75rem; color: #888; margin-top: 0.3rem; line-height: 1.5; }

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

/* ── 步进器 ── */
.stepper { display: flex; align-items: center; gap: 0.5rem; }
.stepper button {
  width: 30px; height: 30px; border-radius: 50%; border: 2px solid #dde4f0;
  background: white; font-size: 1.1rem; cursor: pointer; font-weight: 700;
  color: #2c6bac; display: flex; align-items: center; justify-content: center;
  transition: all 0.15s; padding: 0; line-height: 1;
}
.stepper button:hover { border-color: #2c6bac; background: #eaf2ff; }
.step-val { font-size: 1.4rem; font-weight: 700; color: #1a2f50; min-width: 1.5rem; text-align: center; }
.step-unit { font-size: 0.85rem; color: #999; }

/* ── 单选按钮组 ── */
.radio-group { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.radio-group label { flex: 1; min-width: 8rem; }
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
.tag-r2 { background: #fff0dc; color: #a05000; border: 1px solid #f5c87a; }
.tag-r3 { background: #e8f8f0; color: #1e7e50; border: 1px solid #a8dfc0; }
.tag-r4 { background: #fdecea; color: #c0392b; border: 1px solid #f5b8b8; }

/* ── 铁三角警示 ── */
.triangle-alert {
  border-radius: 10px; padding: 1.1rem 1.4rem;
  margin-bottom: 1.5rem; display: none;
}
.triangle-alert.visible { display: block; }
.triangle-alert.ok     { background: #eafaf1; border: 2px solid #27ae60; }
.triangle-alert.warn   { background: #fffbf0; border: 2px solid #f0a500; }
.triangle-alert.danger { background: #fef0f0; border: 2px solid #e74c3c; }
.triangle-title { font-weight: 700; font-size: 0.92rem; margin-bottom: 0.4rem; }
.triangle-body  { font-size: 0.82rem; color: #555; line-height: 1.6; margin-bottom: 0.75rem; }
.triangle-grid  { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.tri-item {
  flex: 1; min-width: 5.5rem; text-align: center;
  padding: 0.45rem 0.6rem; border-radius: 6px; font-size: 0.8rem;
}
.tri-item.green  { background: #d4efdf; color: #1e7e50; }
.tri-item.yellow { background: #fef9e7; color: #8a6000; border: 1px solid #f5d87a; }
.tri-item.red    { background: #fdecea; color: #c0392b; border: 1px solid #f5b8b8; }
.tri-label  { font-weight: 700; font-size: 0.75rem; }
.tri-status { font-size: 0.7rem; margin-top: 0.15rem; }

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

/* ── 风险仪表 ── */
.risk-meter { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; margin-top: 0.9rem; }
.risk-item { border-radius: 8px; padding: 0.65rem 0.7rem; font-size: 0.8rem; text-align: center; }
.risk-label { font-weight: 600; margin-bottom: 0.2rem; }
.risk-desc  { font-size: 0.72rem; opacity: 0.85; }
.risk-green  { background: #e8f8f0; color: #1e7e50; border: 1px solid #b0e8cc; }
.risk-yellow { background: #fff9e6; color: #8a6000; border: 1px solid #f5d87a; }
.risk-red    { background: #fef0f0; color: #c0392b; border: 1px solid #f5b8b8; }

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
  padding: 0.45rem 0.75rem; font-size: 0.9rem; outline: none; transition: border-color 0.15s;
}
.group-input input[type=text]:focus { border-color: #2c6bac; }

@media (max-width: 640px) {
  .status-grid { grid-template-columns: 1fr 1fr; }
  .risk-meter  { grid-template-columns: 1fr; }
  .triangle-grid { flex-direction: column; }
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
    你好，感谢贵司快速响应。附件已上传完整 RFQ，<strong>核心项目参数如下</strong>：
    <ul style="margin:0.6rem 0 0.6rem 1.2rem; font-size:0.9rem; line-height:1.9;">
      <li>文本总量：约 <strong>143,000 字</strong>（对话剧情 12万字 / UI+字幕 2.3万字）</li>
      <li>语言对：简体中文 → 美式英语</li>
      <li>交付截止：<strong>8 周内</strong>（游戏上线档期锁定，不可延误）</li>
      <li>预算上限：<strong>¥150,000</strong>（含所有环节，不可超支）</li>
      <li>质量要求：正式商业上线版本，<strong>不接受明显机翻感</strong></li>
      <li>特殊要求：必须建立官方游戏术语库，角色名全程统一</li>
    </ul>
    请贵司今日提交<strong>项目启动方案</strong>，涵盖：团队配置、MT 使用策略、术语与质量规划、风险预案及工期承诺。<br>
    <small style="color:#999">提示：请仔细核算工期与预算的可行性——8 周内完成 14.3 万字的数学约束值得认真对待。</small>
  </div>
  <div class="email-task">📋 本轮任务：完成下方四项核心决策配置，生成决策摘要并提交给教师。</div>
</div>

<!-- 小组信息 -->
<div class="group-input">
  <label>🏢 小组名称（LSP）</label>
  <input type="text" id="group-name" placeholder="例：TransPerfect组 / 文思海辉组"
         oninput="updateSummary()">
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
    <div class="status-label">8 周内可行性</div>
    <div class="status-value" id="stat-schedule">—</div>
    <div class="status-sub" id="stat-schedule-sub">调整参数后显示</div>
  </div>
</div>

<!-- ── 决策区 1：团队配置 ── -->
<div class="d-card">
  <div class="d-card-title"><span class="icon">👥</span> 团队配置</div>

  <div class="param-row">
    <div class="param-label">
      <span class="param-name">翻译人员数量</span>
      <span class="param-val" id="lbl-translators">3 人</span>
    </div>
    <div class="stepper">
      <button onclick="step('translators',-1)">−</button>
      <span class="step-val" id="val-translators">3</span>
      <span class="step-unit">人</span>
      <button onclick="step('translators',+1)">＋</button>
    </div>
    <div class="param-hint">每位译者月产能约 15,000 字（基准）；人力成本 ¥12,000/人·月。范围：2 – 6 人。</div>
  </div>

  <div class="param-row">
    <div class="param-label">
      <span class="param-name">审校人员数量</span>
      <span class="param-val" id="lbl-reviewers">1 人</span>
    </div>
    <div class="stepper">
      <button onclick="step('reviewers',-1)">−</button>
      <span class="step-val" id="val-reviewers">1</span>
      <span class="step-unit">人</span>
      <button onclick="step('reviewers',+1)">＋</button>
    </div>
    <div class="param-hint">每位审校可覆盖约 40,000 字/月；成本 ¥8,000/人·月。0 人审校将显著提升质量风险。范围：0 – 3 人。</div>
  </div>
</div>

<!-- ── 决策区 2：MT 使用策略（核心决策 A）── -->
<div class="d-card">
  <div class="d-card-title">
    <span class="icon">⚙️</span> 核心决策 A：机器翻译（MT）策略
    <span class="consequence-tag tag-r2">→ 决定第二轮样本难度</span>
  </div>

  <div class="param-row">
    <div class="param-label">
      <span class="param-name">对话 / 剧情文本 MT 比例（12万字）</span>
      <span class="param-val" id="lbl-mt-dialogue">0%</span>
    </div>
    <input type="range" id="mt-dialogue" min="0" max="100" step="5" value="0"
           oninput="updateVal('mt-dialogue','lbl-mt-dialogue','%'); recalc()">
    <div class="param-hint">
      MT 比例越高 → 成本低、工期短，但"机翻感"风险上升，直接决定第二轮你们收到的质量样本难度。<br>
      <strong>思考：</strong>低 MT（&lt;30%）保质量但工期偏紧；高 MT（&gt;60%）解决工期但质量存疑。
    </div>
  </div>

  <div class="param-row">
    <div class="param-label"><span class="param-name">MT 后编辑（PE）标准</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="pe" value="light" onchange="recalc()">
        <span class="radio-btn">轻度 PE<br><small>仅修明显错误</small></span>
      </label>
      <label>
        <input type="radio" name="pe" value="standard" checked onchange="recalc()">
        <span class="radio-btn">标准 PE<br><small>流畅度＋准确性</small></span>
      </label>
      <label>
        <input type="radio" name="pe" value="full" onchange="recalc()">
        <span class="radio-btn">完整 PE<br><small>接近人工水准</small></span>
      </label>
    </div>
    <div class="param-hint">完整 PE 质量最高，但耗时约为轻度 PE 的 2×，成本相应上升。</div>
  </div>
</div>

<!-- ── 决策区 3：翻译资产规划（核心决策 B）── -->
<div class="d-card">
  <div class="d-card-title">
    <span class="icon">🗂</span> 核心决策 B：翻译资产与质量标准规划
    <span class="consequence-tag tag-r3">→ 决定第三轮资产状态</span>
  </div>

  <div class="param-row">
    <div class="param-label"><span class="param-name">术语库建立时机</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="glossary" value="early" checked onchange="recalc()">
        <span class="radio-btn">第 1 周就建立<br><small>额外 ¥3,000，长期收益高</small></span>
      </label>
      <label>
        <input type="radio" name="glossary" value="during" onchange="recalc()">
        <span class="radio-btn">翻译中积累<br><small>额外 ¥1,500，一致性有隐患</small></span>
      </label>
      <label>
        <input type="radio" name="glossary" value="none" onchange="recalc()">
        <span class="radio-btn">暂不建立<br><small>节省成本，但违反 RFQ 要求</small></span>
      </label>
    </div>
    <div class="param-hint">
      客户 RFQ 已明确要求建立术语库。选择"暂不建立"会触发客户关系惩罚。
      第三轮《星际侦探2》项目复用资产时，此决策的后果将完全浮现。
    </div>
  </div>

  <div class="param-row">
    <div class="param-label"><span class="param-name">是否在启动简报中预设质量验收标准（LQS）</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="lqs" value="yes" checked onchange="recalc()">
        <span class="radio-btn">预设 LQS<br><small>明确 Critical / Major 阈值</small></span>
      </label>
      <label>
        <input type="radio" name="lqs" value="no" onchange="recalc()">
        <span class="radio-btn">不预设<br><small>省时间，但第二轮谈判被动</small></span>
      </label>
    </div>
    <div class="param-hint">
      LQS 示例："Critical 错误 = 0，Major 错误 ≤ 5/1000 字"。
      第二轮质量危机出现时，有 LQS 的小组可用合同条款据理力争；无 LQS 的小组将被动应对客户的任意要求。
    </div>
  </div>
</div>

<!-- ── 决策区 4：风险预案（核心决策 C）── -->
<div class="d-card">
  <div class="d-card-title">
    <span class="icon">🛡</span> 核心决策 C：风险预案质量
    <span class="consequence-tag tag-r4">→ 决定第四轮危机应对资源</span>
  </div>

  <div class="param-row">
    <div class="param-label"><span class="param-name">为本项目制定的风险预案详细程度</span></div>
    <div class="radio-group">
      <label>
        <input type="radio" name="riskplan" value="detailed" onchange="recalc()">
        <span class="radio-btn">详细预案<br><small>备选译者＋变更流程＋版权清单</small></span>
      </label>
      <label>
        <input type="radio" name="riskplan" value="standard" checked onchange="recalc()">
        <span class="radio-btn">标准预案<br><small>3 类风险识别＋基本应对</small></span>
      </label>
      <label>
        <input type="radio" name="riskplan" value="brief" onchange="recalc()">
        <span class="radio-btn">简略预案<br><small>仅列出风险点，无预案</small></span>
      </label>
    </div>
    <div class="param-hint">
      <strong>详细预案</strong>内容：① 备选译者联系人清单；② 范围变更审批流程；③ 版权内容检查清单。额外耗时约半周，成本约 ¥1,500。<br>
      <strong>简略预案</strong>在第四轮三个危机同时爆发时将无路可走，只能临时救火，代价高昂。
    </div>
  </div>
</div>

<!-- ── 决策区 5：工期与储备金 ── -->
<div class="d-card">
  <div class="d-card-title"><span class="icon">📅</span> 工期承诺与风险储备</div>

  <div class="param-row">
    <div class="param-label">
      <span class="param-name">向客户承诺的交付工期</span>
      <span class="param-val" id="lbl-weeks">8 周</span>
    </div>
    <input type="range" id="weeks" min="6" max="12" step="1" value="8"
           oninput="updateVal('weeks','lbl-weeks',' 周'); recalc()">
    <div class="param-hint">
      客户硬性要求 8 周。承诺更短（6–7 周）客户满意但风险极高；
      承诺更长（9–12 周）更安全，但需与客户沟通并说明理由。
    </div>
  </div>

  <div class="param-row">
    <div class="param-label">
      <span class="param-name">风险储备金（占预计总成本比例）</span>
      <span class="param-val" id="lbl-reserve">5%</span>
    </div>
    <input type="range" id="reserve" min="0" max="20" step="1" value="5"
           oninput="updateVal('reserve','lbl-reserve','%'); recalc()">
    <div class="param-hint">储备金用于应对第二至四轮的突发危机。储备越高越安全，但占用预算空间。建议：5–15%。</div>
  </div>
</div>

<!-- ── 铁三角冲突警示（动态显示）── -->
<div id="triangle-alert" class="triangle-alert">
  <div class="triangle-title" id="tri-title">正在计算……</div>
  <div class="triangle-body" id="tri-body"></div>
  <div class="triangle-grid">
    <div class="tri-item" id="tri-budget">
      <div class="tri-label">💰 预算</div>
      <div class="tri-status" id="tri-budget-status">—</div>
    </div>
    <div class="tri-item" id="tri-schedule">
      <div class="tri-label">📅 工期（8周）</div>
      <div class="tri-status" id="tri-schedule-status">—</div>
    </div>
    <div class="tri-item" id="tri-quality">
      <div class="tri-label">⭐ 质量</div>
      <div class="tri-status" id="tri-quality-status">—</div>
    </div>
  </div>
</div>

<!-- ── 实时预览 ── -->
<div class="preview-section">
  <div class="preview-title">📊 实时成本预估</div>
  <div class="cost-breakdown">
    <div class="cost-row"><span>人工翻译成本（翻译团队）</span><span id="pc-translator">—</span></div>
    <div class="cost-row"><span>人工审校成本（审校团队）</span><span id="pc-reviewer">—</span></div>
    <div class="cost-row"><span>MT 处理费（按字计费）</span><span id="pc-mt">—</span></div>
    <div class="cost-row"><span>MT 节省的人力（估算）</span><span id="pc-saving" style="color:#27ae60">—</span></div>
    <div class="cost-row"><span>术语库建设费用</span><span id="pc-glossary">—</span></div>
    <div class="cost-row"><span>风险预案编制成本</span><span id="pc-riskplan">—</span></div>
    <div class="cost-row"><span>风险储备金</span><span id="pc-reserve">—</span></div>
  </div>
  <div class="cost-total">
    <span>本轮预计总支出</span>
    <span id="pc-total">—</span>
  </div>
  <div id="cost-warn" class="cost-warn"></div>

  <div style="margin-top:1.1rem; font-size:0.82rem; font-weight:700; color:#444; margin-bottom:0.5rem;">综合风险评估</div>
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
  <h3>📋 决策摘要（提交给教师）</h3>
  <div class="summary-box" id="summary-box">请先填写小组名称并调整参数，摘要将自动生成。</div>
  <div>
    <button class="btn-primary" onclick="generateSummary()">生成摘要</button>
    <button class="btn-primary btn-copy" onclick="copySummary()">复制摘要</button>
    <span class="copy-feedback" id="copy-feedback">✓ 已复制</span>
    <button class="btn-primary btn-next" onclick="saveAndGoRound2()">🔓 完成第一轮 → 进入第二轮</button>
  </div>
</div>

</div><!-- /sim-body -->

<script>
// ─────────────────────────────────────────────
// 配置常量
// ─────────────────────────────────────────────
const C = {
  totalBudget:        150000,
  dialogueWords:      120000,
  uiWords:             23000,
  translatorMonthly:   12000,   // ¥/人·月
  reviewerMonthly:      8000,   // ¥/人·月
  translatorCapacity:  15000,   // 字/人·月（基准）
  mtCostPerWord:       0.015,   // ¥/字（MT 处理费）
  humanSavingPerWord:  0.065,   // ¥/字（MT 替代人工的节省）
  pe: {
    light:    { savingMul: 1.00, qualityBonus:  0 },
    standard: { savingMul: 0.70, qualityBonus:  8 },
    full:     { savingMul: 0.42, qualityBonus: 18 },
  },
  glossary: {
    early:  { cost: 3000, qualityBonus: 5, r3label: '规范型资产',  clientPenalty:  0 },
    during: { cost: 1500, qualityBonus: 2, r3label: '混合型资产',  clientPenalty:  0 },
    none:   { cost:    0, qualityBonus: 0, r3label: '混乱型资产',  clientPenalty: -8 },
  },
  riskPlan: {
    detailed: { cost: 1500, r4label: '丰富（详细预案）' },
    standard: { cost:  600, r4label: '有限（标准预案）' },
    brief:    { cost:    0, r4label: '极少（简略预案）' },
  },
};

const state = { translators: 3, reviewers: 1 };
const stepCfg = {
  translators: { min: 2, max: 6 },
  reviewers:   { min: 0, max: 3 },
};

// ─────────────────────────────────────────────
// 步进器
// ─────────────────────────────────────────────
function step(key, delta) {
  const cfg = stepCfg[key];
  state[key] = Math.min(cfg.max, Math.max(cfg.min, state[key] + delta));
  document.getElementById('val-' + key).textContent = state[key];
  document.getElementById('lbl-' + key).textContent = state[key] + ' 人';
  recalc();
}

// ─────────────────────────────────────────────
// 滑块值同步
// ─────────────────────────────────────────────
function updateVal(id, lblId, suffix) {
  document.getElementById(lblId).textContent = document.getElementById(id).value + suffix;
}

// ─────────────────────────────────────────────
// 获取当前所有参数
// ─────────────────────────────────────────────
function getParams() {
  const mtD          = parseInt(document.getElementById('mt-dialogue').value);
  const weeks        = parseInt(document.getElementById('weeks').value);
  const reservePct   = parseInt(document.getElementById('reserve').value);
  const pe           = (document.querySelector('input[name="pe"]:checked')       || { value: 'standard' }).value;
  const glossary     = (document.querySelector('input[name="glossary"]:checked') || { value: 'early'    }).value;
  const hasLQS       = (document.querySelector('input[name="lqs"]:checked')      || { value: 'yes'      }).value === 'yes';
  const riskPlan     = (document.querySelector('input[name="riskplan"]:checked') || { value: 'standard' }).value;
  return { translators: state.translators, reviewers: state.reviewers,
           mtD, weeks, reservePct, pe, glossary, hasLQS, riskPlan };
}

// ─────────────────────────────────────────────
// 核心计算
// ─────────────────────────────────────────────
function calc(p) {
  const months      = p.weeks / 4;
  const peFactor    = C.pe[p.pe];
  const glossaryCfg = C.glossary[p.glossary];
  const riskCfg     = C.riskPlan[p.riskPlan];

  // 成本
  const translatorCost = p.translators * C.translatorMonthly * months;
  const reviewerCost   = p.reviewers   * C.reviewerMonthly   * months;
  const mtWords        = C.dialogueWords * p.mtD / 100;
  const mtCost         = mtWords * C.mtCostPerWord;
  const humanSaving    = mtWords * C.humanSavingPerWord * peFactor.savingMul;
  const glossaryCost   = glossaryCfg.cost;
  const riskPlanCost   = riskCfg.cost;
  const lqsCost        = p.hasLQS ? 500 : 0;
  const subTotal = translatorCost + reviewerCost + mtCost - humanSaving
                 + glossaryCost + riskPlanCost + lqsCost;
  const reserve  = Math.round(subTotal * p.reservePct / 100);
  const total    = Math.round(subTotal + reserve);
  const budgetPct = Math.round(total / C.totalBudget * 100);

  // 质量预估
  const dQ = Math.max(35, 92 - p.mtD * 0.38 + peFactor.qualityBonus * 0.6);
  const uQ = Math.max(42, 90 - p.mtD * 0.08);
  const blended = (dQ * C.dialogueWords + uQ * C.uiWords) / (C.dialogueWords + C.uiWords)
                + Math.min(12, p.reviewers * 4)
                + glossaryCfg.qualityBonus
                + (p.hasLQS ? 2 : 0);
  const quality = Math.round(Math.min(98, blended));

  // 进度可行性（8周是否现实）
  const mtBoost      = 1 + p.mtD * 0.003;
  const capacity     = p.translators * C.translatorCapacity * mtBoost;  // words/month
  const weeksNeeded  = Math.round((C.dialogueWords + C.uiWords) / capacity * 4 * 10) / 10;
  const scheduleOK   = weeksNeeded <= p.weeks;
  const scheduleTight = weeksNeeded > p.weeks * 0.88;

  // 风险等级
  const budgetRisk   = budgetPct   > 95 ? 'red' : budgetPct > 82   ? 'yellow' : 'green';
  const qualityRisk  = quality     >= 80 ? 'green' : quality >= 65  ? 'yellow' : 'red';
  const scheduleRisk = !scheduleOK ? 'red' : scheduleTight          ? 'yellow' : 'green';

  // 差异化触发键（供后续轮次使用）
  const mtLevel = p.mtD >= 60 ? 'high' : p.mtD >= 30 ? 'medium' : 'low';
  const r2SamplePack =
    mtLevel === 'high'   ? '🔴 高错误密度样本包（Critical 较多）' :
    mtLevel === 'medium' ? '🟡 中等错误密度样本包' :
                           '🟢 低错误密度样本包（但进度缓冲极小）';
  const r2Negotiation = p.hasLQS
    ? '🟢 强势（有 LQS 合同条款依据）'
    : '🔴 被动（无 LQS，无量化标准可参照）';
  const r3AssetState = glossaryCfg.r3label;
  const r4Resource   = riskCfg.r4label;

  return {
    translatorCost: Math.round(translatorCost),
    reviewerCost:   Math.round(reviewerCost),
    mtCost:         Math.round(mtCost),
    humanSaving:    Math.round(humanSaving),
    glossaryCost, riskPlanCost, lqsCost, reserve, total, budgetPct,
    quality, weeksNeeded,
    budgetRisk, qualityRisk, scheduleRisk,
    mtLevel, r2SamplePack, r2Negotiation, r3AssetState, r4Resource,
  };
}

// ─────────────────────────────────────────────
// UI 刷新
// ─────────────────────────────────────────────
function fmt(n) { return '¥' + Math.round(n).toLocaleString('zh-CN'); }

function setRisk(id, level, desc) {
  document.getElementById(id).className = 'risk-item risk-' + level;
  document.getElementById(id + '-desc').textContent = desc;
}

function recalc() {
  const p = getParams();
  const r = calc(p);

  // 状态栏
  const costEl = document.getElementById('stat-cost');
  costEl.textContent = fmt(r.total);
  costEl.style.color = r.budgetRisk === 'red' ? '#c0392b' : r.budgetRisk === 'yellow' ? '#e67e22' : '#27ae60';
  document.getElementById('stat-budget-pct').textContent = '预算使用率 ' + r.budgetPct + '%';

  const bar = document.getElementById('budget-bar');
  bar.style.width = Math.min(100, r.budgetPct) + '%';
  bar.style.background = r.budgetRisk === 'red' ? '#e74c3c' : r.budgetRisk === 'yellow' ? '#f39c12' : '#2c6bac';

  const qEl = document.getElementById('stat-quality');
  qEl.textContent = r.quality + ' 分';
  qEl.style.color = r.qualityRisk === 'red' ? '#c0392b' : r.qualityRisk === 'yellow' ? '#e67e22' : '#27ae60';
  document.getElementById('stat-quality-sub').textContent =
    r.quality >= 80 ? '符合上线质量标准' : r.quality >= 65 ? '接近及格线，有风险' : '质量风险高';

  const sEl = document.getElementById('stat-schedule');
  sEl.textContent = r.weeksNeeded + ' 周';
  sEl.style.color = r.scheduleRisk === 'red' ? '#c0392b' : r.scheduleRisk === 'yellow' ? '#e67e22' : '#27ae60';
  document.getElementById('stat-schedule-sub').textContent =
    r.weeksNeeded <= p.weeks
      ? '可按期交付（缓冲 ' + (p.weeks - r.weeksNeeded).toFixed(1) + ' 周）'
      : '⚠ 超出 ' + (r.weeksNeeded - p.weeks).toFixed(1) + ' 周，无法按期';

  // 铁三角警示
  const ta = document.getElementById('triangle-alert');
  ta.classList.add('visible');
  const allGreen = r.budgetRisk === 'green' && r.qualityRisk === 'green' && r.scheduleRisk === 'green';
  const anyRed   = r.budgetRisk === 'red'   || r.qualityRisk === 'red'   || r.scheduleRisk === 'red';
  ta.className = 'triangle-alert visible ' + (allGreen ? 'ok' : anyRed ? 'danger' : 'warn');
  document.getElementById('tri-title').textContent =
    allGreen ? '✅ 铁三角暂时平衡——三项约束目前均在可接受范围内' :
    anyRed   ? '🔴 铁三角冲突——至少一项约束无法满足，必须做出牺牲或与客户重新谈判' :
               '⚠ 铁三角存在张力——至少一项约束接近上限，请权衡取舍';
  document.getElementById('tri-body').textContent =
    allGreen ? '' : '请检查以下三项状态，思考：你愿意牺牲哪一项？或者如何向客户说明？';

  document.getElementById('tri-budget').className   = 'tri-item ' + r.budgetRisk;
  document.getElementById('tri-schedule').className = 'tri-item ' + r.scheduleRisk;
  document.getElementById('tri-quality').className  = 'tri-item ' + r.qualityRisk;
  document.getElementById('tri-budget-status').textContent   = fmt(r.total) + '（' + r.budgetPct + '%）';
  document.getElementById('tri-schedule-status').textContent = '需 ' + r.weeksNeeded + '周，承诺 ' + p.weeks + '周';
  document.getElementById('tri-quality-status').textContent  = '预估质量 ' + r.quality + ' 分';

  // 成本明细
  document.getElementById('pc-translator').textContent = fmt(r.translatorCost);
  document.getElementById('pc-reviewer').textContent   = fmt(r.reviewerCost);
  document.getElementById('pc-mt').textContent         = fmt(r.mtCost);
  document.getElementById('pc-saving').textContent     = '− ' + fmt(r.humanSaving);
  document.getElementById('pc-glossary').textContent   = fmt(r.glossaryCost);
  document.getElementById('pc-riskplan').textContent   = fmt(r.riskPlanCost);
  document.getElementById('pc-reserve').textContent    = fmt(r.reserve);
  document.getElementById('pc-total').textContent      = fmt(r.total);

  const warn = document.getElementById('cost-warn');
  warn.textContent =
    r.total > C.totalBudget
      ? '⚠ 超出客户预算 ' + fmt(r.total - C.totalBudget) + '，需要与客户重新谈判或削减配置。'
    : r.budgetPct > 85
      ? '⚠ 预算使用率 ' + r.budgetPct + '%，储备金空间较小，后续风险缓冲不足。'
    : '';

  // 风险仪表
  setRisk('risk-quality',  r.qualityRisk,
    'MT ' + p.mtD + '%，预估 ' + r.quality + ' 分' + (r.qualityRisk === 'red' ? '（高风险）' : ''));
  setRisk('risk-schedule', r.scheduleRisk,
    r.weeksNeeded > p.weeks
      ? '需 ' + r.weeksNeeded + '周 ＞ 承诺 ' + p.weeks + '周'
      : '需 ' + r.weeksNeeded + '周，缓冲 ' + (p.weeks - r.weeksNeeded).toFixed(1) + '周');
  setRisk('risk-budget', r.budgetRisk, fmt(r.total) + '（' + r.budgetPct + '% 预算）');

  updateSummary();
}

// ─────────────────────────────────────────────
// 摘要生成
// ─────────────────────────────────────────────
function generateSummary() { updateSummary(); }

function updateSummary() {
  const p = getParams();
  const r = calc(p);
  const group  = document.getElementById('group-name').value.trim() || '（未填写小组名）';
  const peLabel       = { light: '轻度 PE', standard: '标准 PE', full: '完整 PE' };
  const glossaryLabel = { early: '第1周就建立', during: '翻译中积累', none: '暂不建立' };
  const riskLabel     = { detailed: '详细预案（备选译者+变更流程+版权清单）', standard: '标准预案', brief: '简略预案' };
  const emoji         = { green: '🟢', yellow: '🟡', red: '🔴' };
  const now = new Date().toLocaleString('zh-CN', { hour12: false });

  const text = [
    '═══════════════════════════════════════════',
    '  翻译项目沙盘 · 第一轮决策摘要',
    '═══════════════════════════════════════════',
    `  小组名称：${group}`,
    `  提交时间：${now}`,
    '───────────────────────────────────────────',
    '  【团队配置】',
    `  · 翻译人员：${p.translators} 人`,
    `  · 审校人员：${p.reviewers} 人`,
    '',
    '  【核心决策 A：MT 使用策略】',
    `  · 对话文本 MT 比例：${p.mtD}%（${r.mtLevel === 'high' ? '高' : r.mtLevel === 'medium' ? '中' : '低'}）`,
    `  · PE 标准：${peLabel[p.pe]}`,
    '',
    '  【核心决策 B：翻译资产与质量标准】',
    `  · 术语库建立时机：${glossaryLabel[p.glossary]}`,
    `  · 质量验收标准（LQS）：${p.hasLQS ? '✅ 已预设（Critical=0，Major≤5/1000字）' : '❌ 未预设'}`,
    '',
    '  【核心决策 C：风险预案】',
    `  · 预案详细程度：${riskLabel[p.riskPlan]}`,
    '',
    '  【工期与预算】',
    `  · 承诺交付工期：${p.weeks} 周（实际所需约 ${r.weeksNeeded} 周）`,
    `  · 风险储备金：${p.reservePct}%（${fmt(r.reserve)}）`,
    '───────────────────────────────────────────',
    '  【系统估算结果】',
    `  · 预计总支出：${fmt(r.total)}（预算使用率 ${r.budgetPct}%）  ${emoji[r.budgetRisk]}`,
    `  · 质量预估：${r.quality} 分  ${emoji[r.qualityRisk]}`,
    `  · 进度可行性：需 ${r.weeksNeeded} 周  ${emoji[r.scheduleRisk]}`,
    '───────────────────────────────────────────',
    '  ★ 差异化触发键（教师参考，用于分发后续轮次材料）',
    `  → 第二轮样本包  ：${r.r2SamplePack}`,
    `  → 第二轮谈判态势：${r.r2Negotiation}`,
    `  → 第三轮资产状态：${r.r3AssetState}`,
    `  → 第四轮危机资源：${r.r4Resource}`,
    '═══════════════════════════════════════════',
  ].join('\n');

  document.getElementById('summary-box').textContent = text;

  // 保存至 localStorage，供后续轮次读取
  try {
    localStorage.setItem('sim_r1', JSON.stringify({
      group,
      mtRatio:        p.mtD,
      mtLevel:        r.mtLevel,
      glossary:       p.glossary,
      riskPlan:       p.riskPlan,
      hasLQS:         p.hasLQS,
      weeksCommitted: p.weeks,
      quality:        r.quality,
      budgetPct:      r.budgetPct,
      reservePct:     p.reservePct,
      r2SamplePack:   r.r2SamplePack,
      r2Negotiation:  r.r2Negotiation,
      r3AssetState:   r.r3AssetState,
      r4Resource:     r.r4Resource,
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

function saveAndGoRound2() {
  updateSummary();
  window.location = '/class/localization-sim-r2/';
}

// ─────────────────────────────────────────────
// 初始化
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => { recalc(); });
</script>
