---
title: 翻译认知研究导师指导平台
author: Huang Jie
date: 2025-12-24
layout: post
---

<style>
/* 整体布局容器 */
.mentor-platform-container {
  display: flex;
  gap: 20px;
  margin: 0 -20px;
  min-height: calc(100vh - 200px);
}

/* 左侧主内容区 */
.main-content {
  flex: 1;
  min-width: 0;
  padding: 0 20px;
}

/* 右侧聊天栏 */
.chat-sidebar {
  width: 380px;
  position: sticky;
  top: 80px;
  height: calc(100vh - 100px);
  background: #fff;
  border: 1px solid #e7e9ee;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-sidebar-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e7e9ee;
  background: linear-gradient(135deg, #6f42c1 0%, #5a34a1 100%);
  color: white;
}

.chat-sidebar-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.chat-sidebar-header p {
  margin: 4px 0 0 0;
  font-size: 12px;
  opacity: 0.9;
}

.chat-sidebar-body {
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* 移动端适配 */
@media (max-width: 1024px) {
  .mentor-platform-container {
    flex-direction: column;
  }
  
  .chat-sidebar {
    width: 100%;
    position: relative;
    top: 0;
    height: 500px;
    margin-top: 20px;
  }
}

/* Coze 嵌入式容器 */
#coze-chat-container {
  width: 100%;
  height: 100%;
}
</style>

<div class="no_toc">
<div style="background:#f5f7fa;border-radius:12px;padding:24px 28px;margin:12px 0 28px 0;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
  <h2 class="no_toc" style="margin:0 0 12px 0;">翻译认知研究导师指导平台</h2>
  <p style="margin:0;line-height:1.8;color:#4a5568;">
    面向翻译认知研究的分层学习导航，提供文献阅读、眼动与实证研究方法、以及 R / Python 统计分析实践的核心资源，并集成智能助手支持即时答疑。
  </p>
</div>

<div class="mentor-platform-container">
  <!-- 左侧主内容区 -->
  <div class="main-content">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;align-items:stretch;">
      <!-- 文献学习模块 -->
      <section style="background:#fff;border:1px solid #e7e9ee;border-radius:12px;padding:20px;box-shadow:0 3px 12px rgba(0,0,0,0.05);">
        <div style="color:#6f42c1;font-weight:600;font-size:14px;letter-spacing:0.02em;">模块 01</div>
        <h3 class="no_toc" style="margin:8px 0 12px 0;">文献学习模块</h3>
        <p style="color:#4a5568;line-height:1.7;">
          聚焦翻译认知与过程研究的文献导读，帮助快速建立概念框架与研究脉络，明确阅读要点与批判性思考路径。
        </p>
        <ul style="padding-left:18px;line-height:1.8;color:#2d3748;">
          <li>
            <a href="{{ '/archive/CAT-2025-spring' | relative_url }}" target="_blank" style="color:#2d7ff9;">CAT 课程阅读清单</a>：按周整理的阅读与课堂资料，便于系统回顾。
          </li>
          <li>
            <a href="{{ '/CAT_pdf/Week 9 译文质量控制技术与工具-github.pdf' | relative_url }}" target="_blank" style="color:#2d7ff9;">译文质量控制技术与工具</a>：从质量维度理解认知负荷与译后评估。
          </li>
          <li>
            <a href="{{ '/CAT_pdf/Week 1 计算机辅助翻译技术与工具概况-github.pdf' | relative_url }}" target="_blank" style="color:#2d7ff9;">计算机辅助翻译概况</a>：作为技术背景文献，理解认知研究中的工具生态。
          </li>
        </ul>
        <div style="margin-top:10px;padding:12px 14px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;color:#4b5563;line-height:1.6;">
          学习目标：掌握核心文献脉络，形成研究问题清单；提炼经典研究设计、变量与测量指标，支持后续实验设计。
        </div>
      </section>

      <!-- 眼动与实证研究方法模块 -->
      <section style="background:#fff;border:1px solid #e7e9ee;border-radius:12px;padding:20px;box-shadow:0 3px 12px rgba(0,0,0,0.05);">
        <div style="color:#6f42c1;font-weight:600;font-size:14px;letter-spacing:0.02em;">模块 02</div>
        <h3 class="no_toc" style="margin:8px 0 12px 0;">眼动和实证研究方法学习模块</h3>
        <p style="color:#4a5568;line-height:1.7;">
          针对翻译过程的实验设计、眼动指标解读与数据清洗流程，提供可复用的研究范式与操作指引。
        </p>
        <ul style="padding-left:18px;line-height:1.8;color:#2d3748;">
          <li>
            <a href="https://arxiv.org/pdf/2102.07044.pdf" target="_blank" style="color:#2d7ff9;">Eye-tracking Methodology Overview</a>：开放获取的眼动研究入门与实验范式综述。
          </li>
          <li>
            <a href="https://psyarxiv.com/3z6k7/download" target="_blank" style="color:#2d7ff9;">实验设计与报告标准（PREP 指南）</a>：实证研究的设计、前测与报告要点。
          </li>
          <li>
            <a href="https://osf.io/9x3w4/download" target="_blank" style="color:#2d7ff9;">眼动数据清洗与指标提取模板</a>：含 AOI 标注、眨眼剔除与停留时间计算示例。
          </li>
        </ul>
        <div style="margin-top:10px;padding:12px 14px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;color:#4b5563;line-height:1.6;">
          学习目标：能独立完成实验方案撰写、眼动任务配置与基础质量控制；建立可复用的数据清洗与指标计算流程。
        </div>
      </section>

      <!-- R / Python 统计分析模块 -->
      <section style="background:#fff;border:1px solid #e7e9ee;border-radius:12px;padding:20px;box-shadow:0 3px 12px rgba(0,0,0,0.05);">
        <div style="color:#6f42c1;font-weight:600;font-size:14px;letter-spacing:0.02em;">模块 03</div>
        <h3 class="no_toc" style="margin:8px 0 12px 0;">R 和 Python 统计分析学习模块</h3>
        <p style="color:#4a5568;line-height:1.7;">
          面向认知与眼动数据的统计建模与可视化，覆盖数据整理、描述性统计、方差分析与线性混合模型入门。
        </p>
        <ul style="padding-left:18px;line-height:1.8;color:#2d3748;">
          <li>
            <a href="https://cran.r-project.org/doc/manuals/r-release/R-intro.pdf" target="_blank" style="color:#2d7ff9;">R 入门手册</a>：涵盖数据导入、整形与基础统计，便于快速上手。
          </li>
          <li>
            <a href="https://pandas.pydata.org/docs/getting_started/index.html" target="_blank" style="color:#2d7ff9;">Pandas 快速上手</a>：Python 数据整理与描述性统计的核心操作示例。
          </li>
          <li>
            <a href="https://seaborn.pydata.org/tutorial.html" target="_blank" style="color:#2d7ff9;">Seaborn 可视化教程</a>：绘制分布、交互与回归可视化，支持结果呈现与报告。
          </li>
        </ul>
        <div style="margin-top:10px;padding:12px 14px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;color:#4b5563;line-height:1.6;">
          学习目标：掌握数据清洗与长宽表转换；完成基于 R/Python 的可重复统计分析；输出可视化图表与简要结果解读。
        </div>
      </section>
    </div>
  </div>

  <!-- 右侧智能助手聊天栏 -->
  <aside class="chat-sidebar">
    <div class="chat-sidebar-header">
      <h3>🤖 智能研究助手</h3>
      <p>实时答疑 · 代码辅助 · 文献解读</p>
    </div>
    <div class="chat-sidebar-body">
      <div id="coze-chat-container"></div>
    </div>
  </aside>
</div>

</div>

<!-- Coze SDK 脚本 -->
<script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js"></script>
<script>
(async function() {
  // 从阿里云函数获取 token
  async function fetchCozeToken() {
    try {
      const res = await fetch('https://coze-token-ikztxrqzlc.cn-shanghai.fcapp.run', {
        method: 'GET',
        credentials: 'omit'
      });
      
      if (!res.ok) {
        console.error('Token 获取失败:', res.status);
        throw new Error('token 获取失败');
      }
      
      const data = await res.json();
      console.log('Token 获取成功');
      return data.token;
    } catch (error) {
      console.error('获取 Coze token 失败:', error);
      throw error;
    }
  }

  // 初始化嵌入式聊天（右侧栏）
  try {
    new CozeWebSDK.WebChatClient({
      config: {
        bot_id: '7586584916138655750',
      },
      componentProps: {
        title: '研究助手',
        layout: 'pc',
      },
      auth: {
        type: 'token',
        token: '',
        onRefreshToken: fetchCozeToken
      },
      // 嵌入到指定容器
      el: document.getElementById('coze-chat-container')
    });
    console.log('Coze 聊天界面初始化成功');
  } catch (error) {
    console.error('Coze SDK 初始化失败:', error);
    document.getElementById('coze-chat-container').innerHTML = 
      '<div style="padding:20px;text-align:center;color:#666;">智能助手加载失败，请刷新页面重试</div>';
  }
})();
</script>
