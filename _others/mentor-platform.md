---
title: 翻译认知研究导师智能体（测试）
author: Huang Jie
layout: post
permalink: /mentor-platform/
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
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.module-card:hover {
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.12);
  transform: translateY(-4px);
  border-left-width: 6px;
}

@media (max-width: 1024px) {
  .module-card {
    margin-bottom: 16px;
  }
}

.module-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f3f4f6;
}

.module-number {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
  flex-shrink: 0;
}

.module-title {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  letter-spacing: -0.2px;
}

.module-desc {
  margin: 0 0 12px 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.6;
  font-weight: 400;
}

.module-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}

.module-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #1e40af;
  text-decoration: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
}

.module-link:hover {
  background: #eff6ff;
  border-color: #93c5fd;
  color: #1e3a8a;
  transform: translateX(2px);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
}

.module-link::before {
  content: "📄";
  font-size: 14px;
  flex-shrink: 0;
}

.link-external::before {
  content: "🔗";
}

/* 助手提示 */
.assistant-tip {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border: 2px solid #93c5fd;
  border-radius: 8px;
  padding: 12px 16px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
}

.assistant-tip-icon {
  font-size: 28px;
  margin-bottom: 4px;
  filter: drop-shadow(0 2px 4px rgba(37, 99, 235, 0.2));
}

.assistant-tip-text {
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
  color: #1e293b;
}

.assistant-tip-highlight {
  color: #1e40af;
  font-weight: 700;
}

/* 三列布局容器 */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.header-container {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 24px;
}

/* 响应式布局 - 根据实际页面宽度调整 */
@media (max-width: 1100px) {
  .modules-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  
  .module-card {
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 12px;
  }
  
  .tpr-header {
    margin-bottom: 0 !important;
    padding: 20px 24px !important;
  }
  
  .assistant-tip {
    width: 100% !important;
    margin: 0 !important;
  }
  
  .modules-grid {
    gap: 12px;
  }
}
</style>

<div class="no_toc">
<div class="header-container">
  <div class="tpr-header" style="flex:1;">
    <h2 class="no_toc">Translation Process Research · 导师指导平台</h2>
    <p class="tpr-header-subtitle">
      TPR 文献资源 · 眼动实验方法 · 统计分析工具 · AI 智能辅助
    </p>
  </div>
  
  <!-- 智能助手提示 -->
  <div class="assistant-tip" style="width:280px;margin:0;padding:14px 18px;cursor:pointer;" onclick="if(window.cozeClient) window.cozeClient.show();">
    <div class="assistant-tip-icon" style="font-size:28px;margin-bottom:4px;">🤖</div>
    <p class="assistant-tip-text" style="font-size:12px;line-height:1.5;">
      点击<span class="assistant-tip-highlight">此处</span>或右下角按钮<br>打开智能研究助手
    </p>
    <a href="https://www.coze.cn/store/agent/7586584916138655750?bot_id=true" target="_blank" style="font-size:10px;color:#2563eb;text-decoration:none;margin-top:5px;display:inline-block;opacity:0.8;">[ 图标未加载？点此直链访问 ]</a>
  </div>
</div>

<!-- 三列模块布局 -->
<div class="modules-grid">
<!-- 模块 01: TPR 文献资源 -->
<div class="module-card">
  <div class="module-header">
    <span class="module-number">01</span>
    <h3 class="module-title no_toc">TPR 文献</h3>
  </div>
  <p class="module-desc">
    翻译过程研究核心文献与理论框架
  </p>
  <div class="module-links">
    <a href="https://www.benjamins.com/catalog/btl" target="_blank" class="module-link link-external">BTL 系列丛书</a>
    <a href="https://www.jbe-platform.com/content/journals/10.1075/target" target="_blank" class="module-link link-external">Target 期刊</a>
    <a href="https://www.routledge.com/Translation-and-Interpreting-Studies/book-series/TIS" target="_blank" class="module-link link-external">TIS 研究系列</a>
  </div>
  <p style="margin:12px 0 0 0;padding:8px 10px;background:#fef3c7;border-left:3px solid #f59e0b;border-radius:4px;font-size:11px;color:#92400e;line-height:1.5;">
    <strong>📚</strong> 导师正在整理 TPR 专题文献库
  </p>
</div>

<!-- 模块 02: 眼动与实证方法 -->
<div class="module-card">
  <div class="module-header">
    <span class="module-number">02</span>
    <h3 class="module-title no_toc">眼动实验</h3>
  </div>
  <p class="module-desc">
    实验设计、指标解读与数据处理
  </p>
  <div class="module-links">
    <a href="https://link.springer.com/article/10.3758/s13428-020-01404-5" target="_blank" class="module-link link-external">方法指南</a>
    <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6942767/" target="_blank" class="module-link link-external">设计最佳实践</a>
    <a href="https://www.sr-research.com/support/" target="_blank" class="module-link link-external">EyeLink 文档</a>
  </div>
</div>

<!-- 模块 03: R 统计分析 -->
<div class="module-card">
  <div class="module-header">
    <span class="module-number">03</span>
    <h3 class="module-title no_toc">统计分析</h3>
  </div>
  <p class="module-desc">
    R 建模与学术图表可视化
  </p>
  <div class="module-links">
    <a href="https://ggplot2.tidyverse.org/" target="_blank" class="module-link link-external">ggplot2 文档</a>
    <a href="https://strengejacke.github.io/sjPlot/" target="_blank" class="module-link link-external">sjPlot 绘图</a>
    <a href="https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf" target="_blank" class="module-link link-external">lme4 混合模型</a>
    <a href="https://www.datanovia.com/en/blog/ggplot-examples-best-reference/" target="_blank" class="module-link link-external">ggplot 示例</a>
  </div>
</div>

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
      
      window.cozeClient = new CozeWebSDK.WebChatClient({
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
