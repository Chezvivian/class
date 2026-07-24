---
title: PDF 添加目录工具
author: Huang Jie
layout: post
permalink: /tools/pdf-toc/
---

<!-- 工具简介区块 -->
<div style="background:#f5f7fa; border-radius:8px; padding:20px 30px; margin:24px 0 32px 0; font-size:1.1em; line-height:2.2;">
<strong>工具名称：</strong>PDF 添加目录工具<br>
<strong>运行方式：</strong>纯前端 · 浏览器本地处理（文件不上传服务器）<br>
<strong>功能特点：</strong>解析英文 Contents 页 / 编号标题 → 表格微调 → 写入书签并下载<br>
<strong>适用场景：</strong>整理学术文献、老书可编辑 PDF 的书签补全（英文目录为主）<br>
<strong>技术栈：</strong>pdf.js（读文字）· @cantoo/pdf-lib（写书签）<br>
<strong>更新时间：</strong>2026年7月<br>
<strong>制作人：</strong>黄婕（网站功能如有问题，欢迎联系 chezvivian@outlook.com）
</div>

<div style="background:#fff; border:1px solid #e0e0e0; border-radius:8px; padding:24px; margin:20px 0; box-shadow:0 2px 8px rgba(0,0,0,0.1);">

  <!-- 上传区 -->
  <div id="pdfDropZone" style="border:2px dashed #c5ced9; border-radius:8px; background:#f8fafc; padding:36px 20px; text-align:center; cursor:pointer; transition:all 0.2s; margin-bottom:20px;">
    <div style="font-size:2em; margin-bottom:8px;">📄</div>
    <div style="font-weight:bold; color:#2d3a4a; margin-bottom:6px;">点击或拖拽上传 PDF</div>
    <div style="font-size:13px; color:#888;">优先解析英文 Contents；若无则按 Chapter / 1.2 等编号识别。文件仅在本地处理。</div>
    <input type="file" id="pdfFileInput" accept="application/pdf,.pdf" style="display:none;">
  </div>

  <!-- 元信息 -->
  <div id="pdfTocMeta" style="display:none; background:#f0f4f8; border-radius:6px; padding:12px 16px; margin-bottom:16px; font-size:14px; color:#333;">
    <span id="pdfTocMetaText"></span>
  </div>

  <div id="pdfTocOcrHint" style="display:none; background:#fff8e6; border:1px solid #ffe58f; border-radius:6px; padding:12px 16px; margin-bottom:16px; font-size:14px; color:#8a6d3b;">
    扫描版 OCR（tesseract.js）计划在下一版接入。当前请使用带文字层的可编辑 PDF。
  </div>

  <!-- 进度 -->
  <div id="pdfTocProgress" style="display:none; margin-bottom:16px;">
    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
      <span id="pdfTocProgressLabel" style="font-size:14px; color:#666;">处理中</span>
      <span id="pdfTocProgressText" style="font-size:14px; color:#666;">0%</span>
    </div>
    <div style="background:#e9ecef; border-radius:4px; height:8px; overflow:hidden;">
      <div id="pdfTocProgressBar" style="background:#4472c4; height:100%; width:0%; transition:width 0.2s;"></div>
    </div>
  </div>

  <div id="pdfTocStatus" style="font-size:14px; color:#666; margin-bottom:16px;"></div>

  <!-- 编辑区 -->
  <div id="pdfTocEditSection" style="display:none;">
    <div style="display:flex; flex-wrap:wrap; gap:16px; align-items:flex-end; margin-bottom:16px;">
      <div style="flex:0 0 200px;">
        <label for="pdfPageOffset" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">页码偏移量</label>
        <input type="number" id="pdfPageOffset" value="0" step="1" style="width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:6px; font-size:16px; box-sizing:border-box;">
      </div>
      <div style="flex:1; min-width:220px; font-size:13px; color:#666; line-height:1.6; padding-bottom:4px;">
        最终 PDF 页码 = 表格中的页码 + 偏移量。<br>
        从 Contents 解析时表格多为<strong>印刷页码</strong>，请用偏移量对齐到 PDF 页。共 <b id="pdfTocRowCount">0</b> 条。
      </div>
    </div>

    <div style="overflow-x:auto; margin-bottom:16px; border:1px solid #e8ecf0; border-radius:6px;">
      <table style="width:100%; border-collapse:collapse; font-size:14px; min-width:560px;">
        <thead>
          <tr style="background:#f5f7fa; text-align:left;">
            <th style="padding:10px 8px; width:48px; border-bottom:1px solid #e0e0e0;">#</th>
            <th style="padding:10px 8px; border-bottom:1px solid #e0e0e0;">标题</th>
            <th style="padding:10px 8px; width:90px; border-bottom:1px solid #e0e0e0;">层级</th>
            <th style="padding:10px 8px; width:100px; border-bottom:1px solid #e0e0e0;">页码</th>
            <th style="padding:10px 8px; width:56px; border-bottom:1px solid #e0e0e0;"></th>
          </tr>
        </thead>
        <tbody id="pdfTocBody"></tbody>
      </table>
    </div>

    <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:8px;">
      <button type="button" id="pdfAddRowBtn" disabled style="background:#6c757d; color:white; border:none; padding:12px 20px; border-radius:8px; font-size:15px; font-weight:500; cursor:pointer;">添加一行</button>
      <button type="button" id="pdfClearBtn" style="background:#fff; color:#666; border:1px solid #ddd; padding:12px 20px; border-radius:8px; font-size:15px; font-weight:500; cursor:pointer;">清空草稿</button>
      <button type="button" id="pdfGenerateBtn" disabled style="background:#4472c4; color:white; border:none; padding:12px 28px; border-radius:8px; font-size:16px; font-weight:600; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.1);">生成并下载带书签 PDF</button>
    </div>
  </div>

  <!-- 使用说明 -->
  <div style="background:#f8f9fa; border:1px solid #e9ecef; border-radius:6px; padding:20px; margin-top:24px;">
    <h4 style="margin:0 0 16px 0; color:#2d3a4a; font-size:16px; font-weight:600;">使用说明</h4>
    <div style="color:#666; font-size:14px; line-height:1.8;">
      <p style="margin:0 0 12px 0;">1. 上传可编辑 PDF。工具优先解析书前英文 Contents / Table of Contents；若找不到，再按 Chapter、1.2、Appendix 等编号模式从正文识别。</p>
      <p style="margin:0 0 12px 0;">2. 在表格中修改标题、层级、页码。Contents 解析出的页码通常是印刷页码，用「页码偏移量」对齐到实际 PDF 页（最终页码 = 表格页码 + 偏移量）。</p>
      <p style="margin:0 0 12px 0;">3. 点击生成后下载带书签的新 PDF，在阅读器左侧书签面板查看。</p>
      <p style="margin:0;">隐私：全部在本地完成，PDF 不会上传到任何服务器。</p>
    </div>
  </div>

</div>

<!-- 库与脚本：逻辑在 assets 静态 JS 中，避免 Liquid 误伤；pdf.js 由 app.js 按需动态 import -->
<script src="https://cdn.jsdelivr.net/npm/@cantoo/pdf-lib@2.7.4/dist/pdf-lib.min.js"></script>
<script src="{{ site.baseurl }}/assets/pdf-toc/outline.js"></script>
<script src="{{ site.baseurl }}/assets/pdf-toc/app.js"></script>
