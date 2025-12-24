---
title: 翻译认知研究导师指导平台
author: Huang Jie
date: 2025-12-24
layout: post
---

<style>
/* 整体布局 */
.mentor-container {
  display: flex;
  gap: 24px;
  margin: 20px 0;
}

.modules-section {
  flex: 1;
  min-width: 0;
}

.module-card {
  background: #fff;
  border: 1px solid #e7e9ee;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.module-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.module-number {
  background: linear-gradient(135deg, #6f42c1, #5a34a1);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
}

.module-title {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.module-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.module-link {
  display: inline-block;
  padding: 4px 12px;
  background: #f0f4ff;
  color: #2d7ff9;
  text-decoration: none;
  border-radius: 6px;
  font-size: 13px;
  transition: all 0.2s;
}

.module-link:hover {
  background: #e0ebff;
  transform: translateY(-1px);
}

/* 右侧助手栏 */
.chat-sidebar {
  width: 380px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  height: calc(100vh - 100px);
  background: #fff;
  border: 1px solid #e7e9ee;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 14px 18px;
  background: linear-gradient(135deg, #6f42c1, #5a34a1);
  color: white;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.chat-header h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.chat-body {
  flex: 1;
  overflow: hidden;
  position: relative;
  min-height: 0;
}

#coze-chat-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* 移动端适配 */
@media (max-width: 1024px) {
  .mentor-container {
    flex-direction: column;
  }
  
  .chat-sidebar {
    width: 100%;
    position: relative;
    top: 0;
    height: 500px;
  }
}
</style>

<div class="no_toc">
<div style="background:#f5f7fa;border-radius:10px;padding:20px 24px;margin:0 0 20px 0;box-shadow:0 2px 6px rgba(0,0,0,0.04);">
  <h2 class="no_toc" style="margin:0 0 8px 0;font-size:20px;">翻译认知研究导师指导平台</h2>
  <p style="margin:0;line-height:1.6;color:#4a5568;font-size:14px;">
    整合文献、眼动实验与统计分析资源，配备智能助手即时答疑
  </p>
</div>

<div class="mentor-container">
  <!-- 左侧模块区 -->
  <div class="modules-section">
    <!-- 模块 01 -->
    <div class="module-card">
      <div class="module-header">
        <span class="module-number">01</span>
        <h3 class="module-title no_toc">文献学习</h3>
      </div>
      <p style="margin:8px 0;color:#4a5568;font-size:13px;line-height:1.6;">
        核心文献与研究脉络导读
      </p>
      <div class="module-links">
        <a href="{{ '/archive/CAT-2025-spring' | relative_url }}" target="_blank" class="module-link">CAT 阅读清单</a>
        <a href="{{ '/CAT_pdf/Week 9 译文质量控制技术与工具-github.pdf' | relative_url }}" target="_blank" class="module-link">质量控制</a>
        <a href="{{ '/CAT_pdf/Week 1 计算机辅助翻译技术与工具概况-github.pdf' | relative_url }}" target="_blank" class="module-link">CAT 概况</a>
      </div>
    </div>

    <!-- 模块 02 -->
    <div class="module-card">
      <div class="module-header">
        <span class="module-number">02</span>
        <h3 class="module-title no_toc">眼动与实证方法</h3>
      </div>
      <p style="margin:8px 0;color:#4a5568;font-size:13px;line-height:1.6;">
        实验设计、眼动指标与数据清洗流程
      </p>
      <div class="module-links">
        <a href="https://arxiv.org/pdf/2102.07044.pdf" target="_blank" class="module-link">眼动方法综述</a>
        <a href="https://psyarxiv.com/3z6k7/download" target="_blank" class="module-link">实验设计标准</a>
        <a href="https://osf.io/9x3w4/download" target="_blank" class="module-link">数据清洗模板</a>
      </div>
    </div>

    <!-- 模块 03 -->
    <div class="module-card">
      <div class="module-header">
        <span class="module-number">03</span>
        <h3 class="module-title no_toc">R / Python 统计分析</h3>
      </div>
      <p style="margin:8px 0;color:#4a5568;font-size:13px;line-height:1.6;">
        数据整理、统计建模与可视化
      </p>
      <div class="module-links">
        <a href="https://cran.r-project.org/doc/manuals/r-release/R-intro.pdf" target="_blank" class="module-link">R 入门手册</a>
        <a href="https://pandas.pydata.org/docs/getting_started/index.html" target="_blank" class="module-link">Pandas 快速上手</a>
        <a href="https://seaborn.pydata.org/tutorial.html" target="_blank" class="module-link">Seaborn 可视化</a>
      </div>
    </div>
  </div>

  <!-- 右侧智能助手 -->
  <aside class="chat-sidebar">
    <div class="chat-header">
      <h3>🤖 智能研究助手</h3>
    </div>
    <div class="chat-body">
      <iframe id="coze-chat-iframe" src="" frameborder="0" allow="microphone"></iframe>
    </div>
  </aside>
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
      
      console.log('✓ Coze SDK 初始化完成');
      
      // 隐藏 iframe，显示悬浮按钮（SDK 会自动创建）
      const iframe = document.getElementById('coze-chat-iframe');
      if (iframe) iframe.style.display = 'none';
      
      // 在侧边栏显示提示
      const chatBody = document.querySelector('.chat-body');
      chatBody.innerHTML = '<div style="padding:30px 20px;text-align:center;color:#6f42c1;font-size:14px;line-height:1.8;">点击右下角<br><strong style="font-size:16px;">紫色按钮</strong><br>打开智能助手对话</div>';
      
    } catch (error) {
      console.error('✗ Coze 初始化失败:', error);
      const chatBody = document.querySelector('.chat-body');
      chatBody.innerHTML = '<div style="padding:20px;text-align:center;color:#999;font-size:13px;">智能助手加载失败<br><small style="color:#ccc;">' + error.message + '</small><br><br>请刷新页面重试</div>';
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
