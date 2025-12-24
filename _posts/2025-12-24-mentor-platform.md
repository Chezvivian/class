---
title: 翻译认知研究导师指导平台
author: Huang Jie
date: 2025-12-24
layout: post
---

<style>
/* 整体专业风格 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
}

/* 顶部横幅 */
.tpr-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
  border-radius: 8px;
  padding: 28px 32px;
  margin: 0 0 24px 0;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.15);
  color: white;
}

.tpr-header h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.tpr-header-subtitle {
  margin: 0;
  font-size: 14px;
  opacity: 0.92;
  font-weight: 400;
  letter-spacing: 0.3px;
}

/* 模块卡片 */
.module-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #2563eb;
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 18px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.module-card:hover {
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.12);
  transform: translateX(4px);
  border-left-width: 6px;
}

.module-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f3f4f6;
}

.module-number {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
}

.module-title {
  font-size: 17px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  letter-spacing: -0.3px;
}

.module-desc {
  margin: 0 0 14px 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.7;
  font-weight: 400;
}

.module-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  margin-top: 14px;
}

.module-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #1e40af;
  text-decoration: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}

.module-link:hover {
  background: #eff6ff;
  border-color: #93c5fd;
  color: #1e3a8a;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
}

.module-link::before {
  content: "📄";
  font-size: 16px;
}

.link-external::before {
  content: "🔗";
}

/* 助手提示 */
.assistant-tip {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border: 2px solid #93c5fd;
  border-radius: 8px;
  padding: 18px 24px;
  margin-top: 24px;
  text-align: center;
}

.assistant-tip-icon {
  font-size: 36px;
  margin-bottom: 8px;
  filter: drop-shadow(0 2px 4px rgba(37, 99, 235, 0.2));
}

.assistant-tip-text {
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
  color: #1e293b;
}

.assistant-tip-highlight {
  color: #1e40af;
  font-weight: 700;
}
</style>

<div class="no_toc">
<div class="tpr-header">
  <h2 class="no_toc">Translation Process Research · 导师指导平台</h2>
  <p class="tpr-header-subtitle">
    TPR 文献资源 · 眼动实验方法 · 统计分析工具 · AI 智能辅助
  </p>
</div>

<!-- 模块 01: TPR 文献资源 -->
<div class="module-card">
  <div class="module-header">
    <span class="module-number">MODULE 01</span>
    <h3 class="module-title no_toc">TPR 核心文献与理论框架</h3>
  </div>
  <p class="module-desc">
    翻译过程研究 (Translation Process Research) 的经典文献、理论模型与最新研究进展
  </p>
  <div class="module-links">
    <a href="https://www.benjamins.com/catalog/btl" target="_blank" class="module-link link-external">BTL 系列丛书</a>
    <a href="https://www.jbe-platform.com/content/journals/10.1075/target" target="_blank" class="module-link link-external">Target 期刊</a>
    <a href="https://www.routledge.com/Translation-and-Interpreting-Studies/book-series/TIS" target="_blank" class="module-link link-external">TIS 系列</a>
  </div>
  <p style="margin:12px 0 0 0;padding:10px 14px;background:#fef3c7;border-left:3px solid #f59e0b;border-radius:4px;font-size:12px;color:#92400e;">
    <strong>📚 知识库建设中</strong>：导师正在整理 TPR 核心文献库，包含眼动研究、认知负荷、翻译策略等专题资源
  </p>
</div>

<!-- 模块 02: 眼动与实证方法 -->
<div class="module-card">
  <div class="module-header">
    <span class="module-number">MODULE 02</span>
    <h3 class="module-title no_toc">眼动追踪与实验设计</h3>
  </div>
  <p class="module-desc">
    眼动实验设计规范、指标解读、数据预处理与质量控制流程
  </p>
  <div class="module-links">
    <a href="https://link.springer.com/article/10.3758/s13428-020-01404-5" target="_blank" class="module-link link-external">Eye-tracking 方法指南</a>
    <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6942767/" target="_blank" class="module-link link-external">实验设计最佳实践</a>
    <a href="https://www.sr-research.com/support/" target="_blank" class="module-link link-external">EyeLink 官方文档</a>
  </div>
</div>

<!-- 模块 03: R/Python 统计分析 -->
<div class="module-card">
  <div class="module-header">
    <span class="module-number">MODULE 03</span>
    <h3 class="module-title no_toc">统计建模与数据可视化</h3>
  </div>
  <p class="module-desc">
    基于 R 的回归分析、混合效应模型与专业学术图表绘制
  </p>
  <div class="module-links">
    <a href="https://ggplot2.tidyverse.org/" target="_blank" class="module-link link-external">ggplot2 官方文档</a>
    <a href="https://strengejacke.github.io/sjPlot/" target="_blank" class="module-link link-external">sjPlot 绘图包</a>
    <a href="https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf" target="_blank" class="module-link link-external">lme4 混合模型</a>
    <a href="https://www.datanovia.com/en/blog/ggplot-examples-best-reference/" target="_blank" class="module-link link-external">ggplot 示例集</a>
  </div>
</div>

<!-- 智能助手提示 -->
<div class="assistant-tip">
  <div class="assistant-tip-icon">🤖</div>
  <p class="assistant-tip-text">
    点击页面<span class="assistant-tip-highlight">右下角紫色按钮</span>，即可打开<strong>智能研究助手</strong>进行即时问答、代码辅助与文献解读
  </p>
</div>

</div>

<script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js"></script>
<script>
(async function() {
  console.log('开始初始化 Coze 助手...');
  
  // 从阿里云函数获取 token（安全方式）
  async function fetchCozeToken() {
    try {
      console.log('正在从阿里云函数获取 token...');
      const res = await fetch('https://coze-proxy-fqunfbhbqk.cn-shanghai.fcapp.run', {
        method: 'GET',
        credentials: 'omit'
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      
      const data = await res.json();
      console.log('✓ Token 获取成功');
      return data.token;
    } catch (error) {
      console.error('✗ Token 获取失败:', error);
      throw error;
    }
  }

  // 初始化 Coze SDK
  async function initCozeChat() {
    try {
      const initialToken = await fetchCozeToken();
      
      console.log('正在初始化 Coze WebChatClient...');
      
      const client = new CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7586584916138655750',
        },
        componentProps: {
          title: '研究助手',
          layout: 'pc',
        },
        auth: {
          type: 'token',
          token: initialToken,
          onRefreshToken: fetchCozeToken
        }
      });
      
      console.log('✓ Coze SDK 初始化完成 - 请点击右下角紫色按钮打开对话');
      
    } catch (error) {
      console.error('✗ Coze 初始化失败:', error);
      alert('智能助手加载失败，请刷新页面重试');
    }
  }

  // 等待 SDK 加载完成
  if (typeof CozeWebSDK !== 'undefined') {
    initCozeChat();
  } else {
    window.addEventListener('load', function() {
      setTimeout(initCozeChat, 500);
    });
  }
})();
</script>
