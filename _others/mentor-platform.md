---
title: MTI 培养指导平台
author: Huang Jie
layout: post
permalink: /mentor-platform/
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/mentor-platform/platform.css">

<div class="mp-wrap no_toc">

<div class="mp-header">
  <h2 class="no_toc">MTI 培养指导平台</h2>
  <p>论文全流程路径 · 权威资料库 · 导师指导体系 · AI 辅助答疑</p>
</div>

<div class="mp-section">
  <h2 class="no_toc">从哪里进入</h2>
  <div class="mp-grid-3">
    <a class="mp-card" href="#student-path">
      <span class="tag">学生</span>
      <h3 class="no_toc">论文全流程路径</h3>
      <p>按开题—实践—写作—盲审—答辩节点查看 Best Practice 与 Q&A。</p>
    </a>
    <a class="mp-card" href="{{ site.baseurl }}/mentor-platform/library/">
      <span class="tag">共享</span>
      <h3 class="no_toc">权威资料库</h3>
      <p>全国/校级规范与培养、写作相关论文索引（持续收录中）。</p>
    </a>
    <a class="mp-card" href="{{ site.baseurl }}/mentor-platform/faculty/">
      <span class="tag">导师</span>
      <h3 class="no_toc">导师指导体系</h3>
      <p>学年节奏、反馈框架、分类评估与写作量规（建设中）。</p>
    </a>
  </div>
</div>

<div class="mp-section" id="student-path">
  <h2 class="no_toc">学生路径：七个节点</h2>
  <p style="margin:0 0 12px;font-size:14px;color:#64748b;line-height:1.6;">
    点击节点进入占位页。内容将按你的积累逐步填充；「翻译实践和素材」分口译 / 笔译两条路径。
  </p>

  <div class="mp-path">
    <a class="mp-step" href="{{ site.baseurl }}/mentor-platform/path/01-topic/">
      <div class="mp-step-num">01</div>
      <div class="mp-step-body">
        <h3 class="no_toc">选题定向</h3>
        <p>可做与不可做的边界、与实践语料对齐、研究问题收窄。</p>
      </div>
    </a>

    <a class="mp-step" href="{{ site.baseurl }}/mentor-platform/path/02-proposal/">
      <div class="mp-step-num">02</div>
      <div class="mp-step-body">
        <h3 class="no_toc">开题报告</h3>
        <p>问题表述、文献综述结构、理论框架如何落地到案例分析。</p>
      </div>
    </a>

    <div class="mp-step" style="cursor:default;">
      <div class="mp-step-num">03</div>
      <div class="mp-step-body">
        <h3 class="no_toc">翻译实践和素材</h3>
        <p>素材积累与过程记录；口译与笔译分路径（评估方式不同）。</p>
        <div class="mp-step-sub">
          <a href="{{ site.baseurl }}/mentor-platform/path/03-practice/">节点总览</a>
          <a href="{{ site.baseurl }}/mentor-platform/path/03-practice-interpreting/">口译方向</a>
          <a href="{{ site.baseurl }}/mentor-platform/path/03-practice-translation/">笔译方向</a>
        </div>
      </div>
    </div>

    <a class="mp-step" href="{{ site.baseurl }}/mentor-platform/path/04-report/">
      <div class="mp-step-num">04</div>
      <div class="mp-step-body">
        <h3 class="no_toc">报告主体写作</h3>
        <p>译前 / 译中 / 译后结构、案例选择与分析深度。</p>
      </div>
    </a>

    <a class="mp-step" href="{{ site.baseurl }}/mentor-platform/path/05-ai-pe/">
      <div class="mp-step-num">05</div>
      <div class="mp-step-body">
        <h3 class="no_toc">AI / 译后编辑路径</h3>
        <p>工具披露、流程完整性、避免写成工具说明书。</p>
      </div>
    </a>

    <a class="mp-step" href="{{ site.baseurl }}/mentor-platform/path/06-blind-review/">
      <div class="mp-step-num">06</div>
      <div class="mp-step-body">
        <h3 class="no_toc">盲审修改</h3>
        <p>意见类型分类应对、高频扣分点与修改策略。</p>
      </div>
    </a>

    <a class="mp-step" href="{{ site.baseurl }}/mentor-platform/path/07-defense/">
      <div class="mp-step-num">07</div>
      <div class="mp-step-body">
        <h3 class="no_toc">答辩准备</h3>
        <p>陈述结构、评委高频追问、材料边界。</p>
      </div>
    </a>
  </div>
</div>

<div class="mp-section">
  <h2 class="no_toc">使用说明</h2>
  <div class="mp-placeholder">
    <strong>给学生：</strong>按当前所处节点进入页面，先看 Best Practice 与自查清单，再翻 Q&A；规范与论文见资料库。<br>
    <strong>给导师：</strong>从「导师指导体系」进入学年节奏与评估框架（占位，待填）。<br>
    <strong>AI：</strong>节点正文优先；仍有个性化问题，再用右下角助手或下方入口。
  </div>
</div>

<div class="mp-ai">
  需要针对个人选题或章节的即时讨论？
  <a href="javascript:void(0)" onclick="if(window.cozeClient) window.cozeClient.show();">打开 AI 导师</a>
  ·
  <a href="https://www.coze.cn/store/agent/7586584916138655750?bot_id=true" target="_blank" rel="noopener">直链访问</a>
</div>

</div>

<script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js"></script>
<script>
(async function () {
  async function fetchCozeToken() {
    const res = await fetch('https://coze-proxy-fqunfbhbqk.cn-shanghai.fcapp.run', {
      method: 'GET',
      credentials: 'omit'
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    return data.token;
  }

  async function initCozeChat() {
    try {
      const initialToken = await fetchCozeToken();
      window.cozeClient = new CozeWebSDK.WebChatClient({
        config: { bot_id: '7586584916138655750' },
        componentProps: { title: '研究助手', layout: 'pc' },
        auth: {
          type: 'token',
          token: initialToken,
          onRefreshToken: fetchCozeToken
        }
      });
    } catch (error) {
      console.error('Coze 初始化失败:', error);
    }
  }

  if (typeof CozeWebSDK !== 'undefined') {
    initCozeChat();
  } else {
    window.addEventListener('load', function () {
      setTimeout(initCozeChat, 500);
    });
  }
})();
</script>
