---
title: 文字转语音工具
author: Huang Jie
layout: post
permalink: /tools/text-to-speech/
---

<!-- 工具简介区块 -->
<div style="background:#f5f7fa; border-radius:8px; padding:20px 30px; margin:24px 0 32px 0; font-size:1.1em; line-height:2.2;">
<strong>工具名称：</strong>文字转语音工具<br>
<strong>技术平台：</strong>微软 Azure AI Speech Service<br>
<strong>功能特点：</strong>实时语音合成、在线播放、音频下载<br>
<strong>适用场景：</strong>教学音频制作、播客内容生成、多语言学习<br>
<strong>推荐音色：</strong>如果想尝试多种说话风格，建议选择以下音色：Aria、Jenny、Davis、Guy、Jane、Jason、Nancy、Sara、Tony（这些音色提供10种以上的说话风格选项）<br>
<strong>更新时间：</strong>2025年11月1日<br>
<strong>制作人：</strong>黄婕（网站功能如有问题，欢迎联系 chezvivian@outlook.com）
</div>



<!-- 文字转语音工具界面 -->

<div style="background:#fff; border:1px solid #e0e0e0; border-radius:8px; padding:24px; margin:20px 0; box-shadow:0 2px 8px rgba(0,0,0,0.1);">

<!-- 输入区域 -->
<div style="margin-bottom:24px;">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
    <label for="textInput" style="display:block; font-weight:bold; color:#2d3a4a;">输入文本：</label>
    <button id="sampleTextBtn" style="background:#6f42c1; color:white; border:none; padding:8px 16px; border-radius:6px; font-size:14px; font-weight:500; cursor:pointer; transition:all 0.3s; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
      示例文本
    </button>
  </div>
  <textarea id="textInput" placeholder="请输入要转换为语音的文字内容..." style="width:100%; height:180px; padding:16px; border:1px solid #ddd; border-radius:8px; font-size:18px; line-height:1.6; resize:vertical; font-family:inherit;"></textarea>
  <div style="margin-top:8px; font-size:12px; color:#666;">
    字符数：<span id="charCount">0</span> / 5000
  </div>
</div>

<!-- 语音设置区域 -->
<div style="display:flex; gap:16px; margin-bottom:24px; flex-wrap:nowrap; align-items:flex-start;">
   <!-- 语言选择 -->
   <div style="flex:0 0 32%; min-width:0;">
     <label for="languageSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a; white-space:nowrap;">语言：</label>
     <select id="languageSelect" style="width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:6px; font-size:16px; box-sizing:border-box;">
       <option value="">正在加载...</option>
     </select>
   </div>
   
   <!-- 音色选择 -->
   <div style="flex:0 0 32%; min-width:0;">
     <label for="voiceSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a; white-space:nowrap;">音色：</label>
     <select id="voiceSelect" style="width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:6px; font-size:16px; box-sizing:border-box;" disabled>
       <option value="">请先选择语言</option>
     </select>
     <div id="voiceLoadingStatus" style="font-size:12px; color:#666; margin-top:4px;"></div>
   </div>
   
   <!-- Speaking Style选择 -->
   <div style="flex:0 0 32%; min-width:0;">
     <label for="styleSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a; white-space:nowrap;">说话风格：</label>
     <select id="styleSelect" style="width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:6px; font-size:16px; box-sizing:border-box;" disabled>
       <option value="">请先选择音色</option>
     </select>
   </div>
 </div>

<!-- 高级设置区域 - 语速、音调、音量 -->
<div style="display:flex; gap:16px; margin-bottom:24px; flex-wrap:nowrap; align-items:flex-start;">
   <div style="flex:0 0 32%; min-width:0;">
     <label for="rateSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a; white-space:nowrap;">语速：</label>
     <select id="rateSelect" style="width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:6px; font-size:16px; box-sizing:border-box;">
       <option value="x-slow">很慢</option>
       <option value="slow">慢速</option>
       <option value="medium" selected>正常</option>
       <option value="fast">快速</option>
       <option value="x-fast">很快</option>
     </select>
   </div>
   
   <div style="flex:0 0 32%; min-width:0;">
     <label for="pitchSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a; white-space:nowrap;">音调：</label>
     <select id="pitchSelect" style="width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:6px; font-size:16px; box-sizing:border-box;">
       <option value="x-low">很低</option>
       <option value="low">低</option>
       <option value="medium" selected>正常</option>
       <option value="high">高</option>
       <option value="x-high">很高</option>
     </select>
   </div>
   
   <div style="flex:0 0 32%; min-width:0;">
     <label for="volumeSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a; white-space:nowrap;">音量：</label>
     <select id="volumeSelect" style="width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:6px; font-size:16px; box-sizing:border-box;">
       <option value="x-soft">很小</option>
       <option value="soft">小</option>
       <option value="medium" selected>正常</option>
       <option value="loud">大</option>
       <option value="x-loud">很大</option>
     </select>
   </div>
 </div>

<!-- 高级设置区域 - 采样率、格式 -->
<div style="display:flex; gap:20px; margin-bottom:24px; flex-wrap:wrap;">
   <div style="flex:1; min-width:200px;">
     <label for="sampleRateSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">采样率：</label>
     <select id="sampleRateSelect" style="width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:6px; font-size:16px;">
       <option value="16000" selected>16 kHz（标准质量）</option>
       <option value="24000">24 kHz（高质量）</option>
       <option value="48000">48 kHz（超高保真）</option>
     </select>
   </div>
   
   <div style="flex:1; min-width:200px;">
     <label for="formatSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">格式：</label>
     <select id="formatSelect" style="width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:6px; font-size:16px;">
       <option value="wav" selected>WAV（PCM无损）</option>
       <option value="mp3">MP3（压缩格式）</option>
       <option value="ogg">OGG（Opus编码）</option>
     </select>
   </div>
 </div>

<!-- 控制按钮区域 -->
<div style="display:flex; gap:16px; margin-bottom:24px; flex-wrap:wrap;">
  <button id="synthesizeBtn" style="background:#4a90e2; color:white; border:none; padding:14px 28px; border-radius:8px; font-size:17px; font-weight:500; cursor:pointer; transition:all 0.3s; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    开始合成
  </button>
  <button id="playBtn" style="background:#52c41a; color:white; border:none; padding:14px 28px; border-radius:8px; font-size:17px; font-weight:500; cursor:pointer; transition:all 0.3s; box-shadow:0 2px 4px rgba(0,0,0,0.1);" disabled>
    播放
  </button>
  <button id="downloadBtn" style="background:#8c8c8c; color:white; border:none; padding:14px 28px; border-radius:8px; font-size:17px; font-weight:500; cursor:pointer; transition:all 0.3s; box-shadow:0 2px 4px rgba(0,0,0,0.1);" disabled>
    下载音频
  </button>
</div>

<!-- 进度条和状态显示 -->
<div style="margin-bottom:24px;">
  <div id="progressContainer" style="display:none;">
    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
      <span style="font-size:14px; color:#666;">合成进度</span>
      <span id="progressText" style="font-size:14px; color:#666;">0%</span>
    </div>
    <div style="background:#e9ecef; border-radius:4px; height:8px; overflow:hidden;">
      <div id="progressBar" style="background:#0066cc; height:100%; width:0%; transition:width 0.3s;"></div>
    </div>
  </div>
  <div id="statusText" style="font-size:14px; color:#666; margin-top:8px;"></div>
</div>

<!-- 音频播放器 -->
<div id="audioContainer" style="display:none;">
  <div style="background:#f8f9fa; border:1px solid #e0e0e0; border-radius:8px; padding:16px; margin-bottom:16px;">
    <div style="display:flex; align-items:center; gap:16px;">
      <label style="font-weight:bold; color:#2d3a4a; white-space:nowrap; min-width:80px; font-size:16px;">播放音量：</label>
      <input type="range" id="playbackVolumeSlider" min="0" max="100" value="50" step="1" style="flex:1; height:10px; border-radius:5px; outline:none; cursor:pointer;">
      <span id="playbackVolumeValue" style="font-weight:bold; color:#4a90e2; min-width:55px; text-align:right; font-size:16px;">50%</span>
    </div>
  </div>
  <audio id="audioPlayer" controls style="width:100%;">
    您的浏览器不支持音频播放。
  </audio>
</div>

<!-- 使用说明 -->
<div style="background:#f8f9fa; border:1px solid #e9ecef; border-radius:6px; padding:20px; margin-top:24px;">
  <h4 style="margin:0 0 16px 0; color:#2d3a4a; font-size:16px; font-weight:600;">使用说明</h4>
  <div style="color:#666; font-size:14px; line-height:1.8;">
    <p style="margin:0 0 12px 0;">输入要转换的文字内容（最多5000字符），然后依次选择语言、音色和说话风格。</p>
    <p style="margin:0 0 12px 0;">系统支持多种英语变体（美国、英国、加拿大、澳大利亚、印度等），每种语言提供多个音色选择。部分音色支持多种说话风格（Speaking Style），可根据文本内容选择合适的风格以获得更自然的语音效果。</p>
    <p style="margin:0;">选择合适的采样率和音频格式后，点击"开始合成"生成语音。合成完成后可在线播放或下载音频文件。</p>
  </div>
</div>

</div>

<!-- 播放音量滑块样式 -->
<style>
/* 播放音量滑块样式 */
#playbackVolumeSlider {
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  background: linear-gradient(to right, #4a90e2 0%, #4a90e2 var(--slider-progress, 100%), #ddd var(--slider-progress, 100%), #ddd 100%);
  border-radius: 5px;
  outline: none;
  transition: background 0.2s;
}

#playbackVolumeSlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #4a90e2;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: all 0.2s;
}

#playbackVolumeSlider::-webkit-slider-thumb:hover {
  background: #357abd;
  transform: scale(1.1);
}

#playbackVolumeSlider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #4a90e2;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: all 0.2s;
}

#playbackVolumeSlider::-moz-range-thumb:hover {
  background: #357abd;
  transform: scale(1.1);
}

#playbackVolumeSlider:active {
  cursor: grabbing;
}
</style>

<!-- 滑块样式 -->
<style>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-track {
  background: #ddd;
  height: 6px;
  border-radius: 3px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #4a90e2;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #357abd;
  transform: scale(1.1);
}

input[type="range"]::-moz-range-track {
  background: #ddd;
  height: 6px;
  border-radius: 3px;
  border: none;
}

input[type="range"]::-moz-range-thumb {
  background: #4a90e2;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

input[type="range"]::-moz-range-thumb:hover {
  background: #357abd;
}
</style>

<!-- JavaScript 代码 -->
<script>
// 全局变量
let audioBlob = null;
let audioUrl = null;

// DOM 元素
const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const languageSelect = document.getElementById('languageSelect');
const voiceSelect = document.getElementById('voiceSelect');
const styleSelect = document.getElementById('styleSelect');
const rateSelect = document.getElementById('rateSelect');
const pitchSelect = document.getElementById('pitchSelect');
const volumeSelect = document.getElementById('volumeSelect');
const sampleRateSelect = document.getElementById('sampleRateSelect');
const formatSelect = document.getElementById('formatSelect');
const sampleTextBtn = document.getElementById('sampleTextBtn');
const synthesizeBtn = document.getElementById('synthesizeBtn');
const playBtn = document.getElementById('playBtn');
const downloadBtn = document.getElementById('downloadBtn');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const statusText = document.getElementById('statusText');
const audioContainer = document.getElementById('audioContainer');
const audioPlayer = document.getElementById('audioPlayer');
const playbackVolumeSlider = document.getElementById('playbackVolumeSlider');
const playbackVolumeValue = document.getElementById('playbackVolumeValue');

// 存储语音数据
let voicesData = null;
let currentVoiceInfo = null;

// 字符计数
textInput.addEventListener('input', function() {
  const count = this.value.length;
  charCount.textContent = count;
  
  if (count > 5000) {
    charCount.style.color = '#dc3545';
    synthesizeBtn.disabled = true;
    synthesizeBtn.style.background = '#6c757d';
  } else {
    charCount.style.color = '#666';
    synthesizeBtn.disabled = false;
    synthesizeBtn.style.background = '#4a90e2';
  }
});

// 语言选择改变时，更新音色列表
languageSelect.addEventListener('change', function() {
  updateVoicesByLanguage(this.value);
});

// 音色选择改变时，更新Speaking styles
voiceSelect.addEventListener('change', function() {
  updateStyles(this.value);
});

// 示例文本按钮事件
sampleTextBtn.addEventListener('click', function() {
  loadSampleText();
});

// 按钮悬停效果
const buttons = [sampleTextBtn, synthesizeBtn, playBtn, downloadBtn];
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    if (!this.disabled) {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
    }
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
  });
});

// 合成语音
synthesizeBtn.addEventListener('click', async function() {
  const text = textInput.value.trim();
  if (!text) {
    alert('请输入要转换的文字内容！');
    return;
  }
  
  if (text.length > 5000) {
    alert('文字内容不能超过5000字符！');
    return;
  }
  
  // 显示进度条
  progressContainer.style.display = 'block';
  statusText.textContent = '正在合成语音，请稍候...';
  synthesizeBtn.disabled = true;
  synthesizeBtn.textContent = '🔄 合成中...';
  
  try {
    // 模拟进度更新
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 90) progress = 90;
      progressBar.style.width = progress + '%';
      progressText.textContent = Math.round(progress) + '%';
    }, 200);
    
    // 调用阿里云 TTS API
    const audioData = await synthesizeSpeech(text);
    
    clearInterval(progressInterval);
    progressBar.style.width = '100%';
    progressText.textContent = '100%';
    
     // 创建音频对象（根据格式设置MIME类型）
     const format = formatSelect.value;
     let mimeType = 'audio/wav';
     if (format === 'mp3') {
       mimeType = 'audio/mpeg';
     } else if (format === 'ogg') {
       mimeType = 'audio/ogg';
     }
     audioBlob = new Blob([audioData], { type: mimeType });
     audioUrl = URL.createObjectURL(audioBlob);
     audioPlayer.src = audioUrl;
     
     // 重置播放音量到50%
     if (playbackVolumeSlider && playbackVolumeValue) {
       playbackVolumeSlider.value = 50;
       audioPlayer.volume = 0.5;
       playbackVolumeValue.textContent = '50%';
       playbackVolumeSlider.style.setProperty('--slider-progress', '50%');
     }
    
    // 更新按钮状态
    playBtn.disabled = false;
    downloadBtn.disabled = false;
    synthesizeBtn.disabled = false;
    synthesizeBtn.textContent = '开始合成';
    
    statusText.textContent = '语音合成完成！';
    audioContainer.style.display = 'block';
    
  } catch (error) {
    console.error('合成失败:', error);
    const errorMessage = error.message || '未知错误';
    statusText.textContent = '合成失败：' + errorMessage;
    statusText.style.color = '#dc3545';
    
    // 显示更详细的错误信息
    if (errorMessage.includes('网络连接失败') || errorMessage.includes('无法连接到API服务器')) {
      statusText.textContent = errorMessage;
    } else if (errorMessage.includes('500') || errorMessage.includes('HTTP 500')) {
      statusText.textContent = '合成失败：服务器错误（500），请检查Vercel日志或联系管理员';
    } else if (errorMessage.includes('缺少必要的环境变量')) {
      statusText.textContent = '合成失败：环境变量未配置，请在Vercel中设置AZURE_SPEECH_KEY和AZURE_SPEECH_REGION';
    } else if (errorMessage.includes('401') || errorMessage.includes('HTTP 401')) {
      statusText.textContent = '合成失败：认证失败，请检查AZURE_SPEECH_KEY是否正确';
    }
    
    synthesizeBtn.disabled = false;
    synthesizeBtn.textContent = '开始合成';
    progressContainer.style.display = 'none';
  }
});

// 播放控制
playBtn.addEventListener('click', function() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = '暂停';
    statusText.textContent = '正在播放...';
  } else {
    audioPlayer.pause();
    playBtn.textContent = '播放';
    statusText.textContent = '已暂停';
  }
});

// 音频播放事件监听
audioPlayer.addEventListener('play', function() {
  playBtn.textContent = '暂停';
  statusText.textContent = '正在播放...';
});

audioPlayer.addEventListener('pause', function() {
  playBtn.textContent = '播放';
  statusText.textContent = '已暂停';
});

audioPlayer.addEventListener('ended', function() {
  playBtn.textContent = '播放';
  statusText.textContent = '播放完成';
});

// 播放音量控制
if (playbackVolumeSlider && playbackVolumeValue) {
  // 初始化音量滑块，默认50%
  audioPlayer.volume = playbackVolumeSlider.value / 100;
  
  // 更新滑块进度条样式
  function updateSliderStyle() {
    const value = playbackVolumeSlider.value;
    playbackVolumeSlider.style.setProperty('--slider-progress', value + '%');
  }
  updateSliderStyle();
  
  // 音量滑块变化时更新音频音量和显示
  playbackVolumeSlider.addEventListener('input', function() {
    const volume = this.value / 100;
    audioPlayer.volume = volume;
    playbackVolumeValue.textContent = Math.round(volume * 100) + '%';
    updateSliderStyle();
  });
  
  // 同步音频播放器自带音量控制到滑块（如果用户使用浏览器自带的音量控制）
  audioPlayer.addEventListener('volumechange', function() {
    playbackVolumeSlider.value = audioPlayer.volume * 100;
    playbackVolumeValue.textContent = Math.round(audioPlayer.volume * 100) + '%';
    updateSliderStyle();
  });
}

// 下载音频
downloadBtn.addEventListener('click', function() {
  if (audioPlayer.src) {
    const a = document.createElement('a');
    a.href = audioPlayer.src;
    a.download = `语音合成_${voiceSelect.value}_${new Date().getTime()}.${formatSelect.value}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    statusText.textContent = '音频下载完成！';
  }
});

// 代理端点配置（优先阿里云，备用Vercel）
const PROXY_ENDPOINTS = {
  voices: [
    'https://voices-update-tsnzxwridz.cn-shanghai.fcapp.run', // 阿里云代理（优先，国内访问快）
    'https://vercel-tts.vercel.app/api/voices'  // Vercel代理（备用，国外用户）
  ],
  tts: [
    'https://tts-update-jeicusdbgk.cn-shanghai.fcapp.run', // 阿里云代理（优先，国内访问快）
    'https://vercel-tts.vercel.app/api/tts'  // Vercel代理（备用，国外用户）
  ]
};

// 当前使用的代理端点索引
let currentProxyIndex = { voices: 0, tts: 0 };

/**
 * 尝试使用指定端点获取数据，失败时自动切换到下一个端点
 */
async function fetchWithFallback(urls, fetchOptions, endpointType) {
  const startIndex = currentProxyIndex[endpointType] || 0;
  
  for (let i = 0; i < urls.length; i++) {
    const index = (startIndex + i) % urls.length;
    const url = urls[index];
    
    try {
      console.log(`尝试使用端点 ${index + 1}/${urls.length}: ${url}`);
      const response = await fetch(url, fetchOptions);
      
      if (response.ok) {
        // 成功，记住当前使用的端点
        currentProxyIndex[endpointType] = index;
        console.log(`端点连接成功: ${url}`);
        return response;
      } else {
        // 响应不OK，尝试下一个端点
        // 405 Method Not Allowed 也应该尝试下一个端点
        const status = response.status;
        console.warn(`端点响应异常 (${status}): ${url}，尝试下一个端点...`);
        if (status === 405) {
          // 405错误可能是触发器配置问题，也尝试下一个端点
          console.warn(`方法不允许 (405)，可能是触发器配置问题，尝试下一个端点...`);
        }
        if (i === urls.length - 1) {
          // 所有端点都失败，返回最后一个响应
          return response;
        }
      }
    } catch (error) {
      console.warn(`端点连接失败: ${url}，错误: ${error.message}，尝试下一个端点...`);
      if (i === urls.length - 1) {
        // 所有端点都失败，抛出最后一个错误
        throw error;
      }
    }
  }
  
  // 理论上不会到达这里
  throw new Error('所有代理端点都不可用');
}

// 加载Azure语音列表
async function loadVoices() {
  const languageSelect = document.getElementById('languageSelect');
  const voiceLoadingStatus = document.getElementById('voiceLoadingStatus');
  
  try {
    voiceLoadingStatus.textContent = '正在加载语音列表...';
    const response = await fetchWithFallback(PROXY_ENDPOINTS.voices, {
      method: 'GET'
    }, 'voices');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: '无法解析错误响应' }));
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    console.log('语音列表API响应:', data);
    
    if (data.success && data.voices && data.languages) {
      // 存储语音数据供后续使用
      voicesData = data;
      
      // 清空语言选择器
      languageSelect.innerHTML = '';
      
      // 添加所有英语语言选项
      data.languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        // 设置English (United States)为默认选中
        if (lang.code === 'en-US') {
          option.selected = true;
        }
        languageSelect.appendChild(option);
      });
      
      // 确保English (United States)被选中，如果没有则选择第一个
      if (languageSelect.value !== 'en-US') {
        const usOption = Array.from(languageSelect.options).find(opt => opt.value === 'en-US');
        if (usOption) {
          usOption.selected = true;
        } else if (languageSelect.options.length > 0) {
          languageSelect.selectedIndex = 0;
        }
      }
      
      // 更新音色列表
      if (languageSelect.value) {
        updateVoicesByLanguage(languageSelect.value);
      }
      
      voiceLoadingStatus.textContent = `已加载 ${data.total} 个语音，${data.languages.length} 种英语语言`;
      console.log('语音列表加载成功:', data);
    } else {
      throw new Error('无法获取语音列表');
    }
  } catch (error) {
    console.error('加载语音列表失败:', error);
    
    // 检测是否是网络连接问题
    const isNetworkError = error.message.includes('NetworkError') || 
                          error.message.includes('Failed to fetch') || 
                          error.message.includes('fetch') ||
                          error.name === 'TypeError';
    
    if (isNetworkError) {
      voiceLoadingStatus.textContent = '网络连接失败，可能无法访问API服务器。已使用默认语音列表，您可以继续使用基本功能。';
      voiceLoadingStatus.style.color = '#dc3545';
    } else {
      voiceLoadingStatus.textContent = `加载失败: ${error.message}`;
      voiceLoadingStatus.style.color = '#dc3545';
    }
    
    // 使用默认值，确保用户仍可使用基本功能
    languageSelect.innerHTML = `
      <option value="en-US" selected>English (United States)</option>
      <option value="en-GB">English (United Kingdom)</option>
      <option value="en-CA">English (Canada)</option>
      <option value="en-AU">English (Australia)</option>
      <option value="en-IE">English (Ireland)</option>
      <option value="en-IN">English (India)</option>
      <option value="en-NZ">English (New Zealand)</option>
      <option value="en-ZA">English (South Africa)</option>
    `;
    languageSelect.selectedIndex = 0;
    
    // 提供常用音色的默认列表
    voicesData = {
      languages: [
        { code: 'en-US', name: 'English (United States)' },
        { code: 'en-GB', name: 'English (United Kingdom)' },
        { code: 'en-CA', name: 'English (Canada)' },
        { code: 'en-AU', name: 'English (Australia)' },
        { code: 'en-IE', name: 'English (Ireland)' },
        { code: 'en-IN', name: 'English (India)' },
        { code: 'en-NZ', name: 'English (New Zealand)' },
        { code: 'en-ZA', name: 'English (South Africa)' }
      ],
      voices: {
        'en-US': [
          { name: 'en-US-JennyNeural', displayName: 'Jenny', gender: 'Female', styles: ['chat', 'cheerful', 'sad', 'angry', 'fearful', 'disgruntled', 'serious', 'affectionate', 'gentle', 'lyrical', 'narration-professional', 'newscast-casual', 'newscast-formal'], roles: [] },
          { name: 'en-US-AriaNeural', displayName: 'Aria', gender: 'Female', styles: ['chat', 'cheerful', 'empathy', 'sad', 'angry', 'fearful', 'disgruntled', 'serious', 'affectionate', 'gentle', 'lyrical', 'newscast'], roles: [] },
          { name: 'en-US-AndrewNeural', displayName: 'Andrew', gender: 'Male', styles: [], roles: [] },
          { name: 'en-US-DavisNeural', displayName: 'Davis', gender: 'Male', styles: ['chat', 'angry', 'cheerful', 'sad', 'excited', 'friendly', 'terrified', 'whispering', 'hopeful', 'sad', 'disgruntled', 'serious', 'affectionate', 'gentle', 'lyrical', 'newscast-casual', 'newscast-formal', 'narration-relaxed'], roles: [] },
          { name: 'en-US-GuyNeural', displayName: 'Guy', gender: 'Male', styles: ['newscast', 'angry', 'cheerful', 'sad', 'excited', 'friendly', 'terrified', 'whispering', 'disgruntled'], roles: [] },
          { name: 'en-US-JaneNeural', displayName: 'Jane', gender: 'Female', styles: ['angry', 'cheerful', 'excited', 'friendly', 'hopeful', 'sad', 'scared', 'disgruntled', 'serious', 'affectionate', 'gentle', 'lyrical'], roles: [] },
          { name: 'en-US-JasonNeural', displayName: 'Jason', gender: 'Male', styles: ['angry', 'cheerful', 'sad', 'excited', 'friendly', 'nervous', 'scared', 'serious', 'whispering', 'affectionate', 'disgruntled'], roles: [] },
          { name: 'en-US-NancyNeural', displayName: 'Nancy', gender: 'Female', styles: ['angry', 'cheerful', 'sad', 'excited', 'friendly', 'terrified', 'whispering', 'hopeful', 'newscast'], roles: [] },
          { name: 'en-US-SaraNeural', displayName: 'Sara', gender: 'Female', styles: ['angry', 'cheerful', 'sad', 'excited', 'friendly', 'terrified', 'whispering', 'hopeful', 'newscast-casual'], roles: [] },
          { name: 'en-US-TonyNeural', displayName: 'Tony', gender: 'Male', styles: ['angry', 'cheerful', 'sad', 'excited', 'friendly', 'disgruntled', 'serious', 'affectionate', 'gentle', 'lyrical', 'newscast'], roles: [] }
        ],
        'en-GB': [
          { name: 'en-GB-RyanNeural', displayName: 'Ryan', gender: 'Male', styles: ['chat', 'cheerful', 'sad'], roles: [] },
          { name: 'en-GB-SoniaNeural', displayName: 'Sonia', gender: 'Female', styles: ['cheerful', 'sad'], roles: [] }
        ],
        'en-CA': [
          { name: 'en-CA-ClaraNeural', displayName: 'Clara', gender: 'Female', styles: [], roles: [] },
          { name: 'en-CA-LiamNeural', displayName: 'Liam', gender: 'Male', styles: [], roles: [] }
        ],
        'en-AU': [
          { name: 'en-AU-NatashaNeural', displayName: 'Natasha', gender: 'Female', styles: [], roles: [] },
          { name: 'en-AU-WilliamNeural', displayName: 'William', gender: 'Male', styles: [], roles: [] }
        ],
        'en-IE': [
          { name: 'en-IE-ConnorNeural', displayName: 'Connor', gender: 'Male', styles: [], roles: [] },
          { name: 'en-IE-EmilyNeural', displayName: 'Emily', gender: 'Female', styles: [], roles: [] }
        ],
        'en-IN': [
          { name: 'en-IN-NeerjaNeural', displayName: 'Neerja', gender: 'Female', styles: [], roles: [] },
          { name: 'en-IN-PrabhatNeural', displayName: 'Prabhat', gender: 'Male', styles: [] }
        ],
        'en-NZ': [
          { name: 'en-NZ-MitchellNeural', displayName: 'Mitchell', gender: 'Male', styles: [], roles: [] },
          { name: 'en-NZ-MollyNeural', displayName: 'Molly', gender: 'Female', styles: [] }
        ],
        'en-ZA': [
          { name: 'en-ZA-LeanneNeural', displayName: 'Leanne', gender: 'Female', styles: [], roles: [] },
          { name: 'en-ZA-LukeNeural', displayName: 'Luke', gender: 'Male', styles: [] }
        ]
      }
    };
    updateVoicesByLanguage('en-US');
  }
}

// 根据选择的语言更新音色列表
function updateVoicesByLanguage(languageCode) {
  if (!languageCode || !voicesData || !voicesData.voices) {
    voiceSelect.innerHTML = '<option value="">请先选择语言</option>';
    voiceSelect.disabled = true;
    styleSelect.innerHTML = '<option value="">请先选择语言</option>';
    styleSelect.disabled = true;
    return;
  }
  
  const voices = voicesData.voices[languageCode] || [];
  voiceSelect.innerHTML = '';
  
  if (voices.length === 0) {
    voiceSelect.innerHTML = '<option value="">该语言暂无可用语音</option>';
    voiceSelect.disabled = true;
    styleSelect.disabled = true;
    return;
  }
  
  voiceSelect.disabled = false;
  
  // 添加音色选项
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;  // 使用ShortName作为value（用于API调用）
    // 使用DisplayName显示，如果没有则使用name
    const displayText = voice.displayName || voice.friendlyName || voice.name;
    option.textContent = `${displayText} (${voice.gender === 'Male' ? '男声' : voice.gender === 'Female' ? '女声' : '未知'})`;
    option.dataset.voiceInfo = JSON.stringify(voice);
    voiceSelect.appendChild(option);
  });
  
  // 默认选中第一个
  if (voiceSelect.options.length > 0) {
    voiceSelect.selectedIndex = 0;
    updateStyles(voiceSelect.value);
  }
}

// 根据选择的音色更新Speaking styles
function updateStyles(voiceName) {
  if (!voiceName || !voicesData || !voicesData.voices) {
    styleSelect.innerHTML = '<option value="">请先选择音色</option>';
    styleSelect.disabled = true;
    return;
  }
  
  // 找到选中的语音信息
  currentVoiceInfo = null;
  for (const langCode in voicesData.voices) {
    const voice = voicesData.voices[langCode].find(v => v.name === voiceName);
    if (voice) {
      currentVoiceInfo = voice;
      break;
    }
  }
  
  if (!currentVoiceInfo) {
    styleSelect.innerHTML = '<option value="">未找到语音信息</option>';
    styleSelect.disabled = true;
    return;
  }
  
  // 更新Speaking styles选择器
  styleSelect.innerHTML = '<option value="">无（不设置）</option>';
  if (currentVoiceInfo.styles && currentVoiceInfo.styles.length > 0) {
    currentVoiceInfo.styles.forEach(style => {
      const option = document.createElement('option');
      option.value = style;
      option.textContent = style;
      styleSelect.appendChild(option);
    });
    styleSelect.disabled = false;
  } else {
    styleSelect.disabled = false;
  }
}

// 示例文本库
const sampleTexts = [
  {
    category: 'News',
    text: 'Breaking news from around the world today. Scientists have made a groundbreaking discovery in renewable energy technology. A team of researchers has developed a new solar panel design that could revolutionize the industry. This innovation promises to increase efficiency by thirty percent while reducing manufacturing costs. The announcement came during an international conference on sustainable energy solutions. Environmental experts are calling this development a major step forward in the fight against climate change.'
  },
  {
    category: 'Advertisement',
    text: 'Introducing our revolutionary new product that will change your daily routine forever. Experience unmatched quality and performance with our latest innovation. Thousands of satisfied customers have already made the switch. Join them today and discover the difference premium quality makes. Limited time offer available now. Don\'t miss this incredible opportunity to transform your life. Our dedicated team has spent years perfecting every detail. Trust the brand that millions rely on every single day.'
  },
  {
    category: 'Conversation',
    text: 'Hey, how was your weekend? Mine was pretty relaxing. I spent most of Saturday reading and then went for a long walk on Sunday morning. The weather was absolutely perfect. What about you? Did you do anything special? I\'ve been thinking about planning a trip for next month, maybe somewhere by the coast. Have you been anywhere interesting lately? I\'d love to hear your recommendations for a good weekend getaway destination.'
  },
  {
    category: 'Audiobook',
    text: 'The old house stood at the end of the quiet street, its windows dark and mysterious. Sarah approached cautiously, her heart pounding in her chest. She had received the letter three days ago, inviting her to this very location. The creaking of the gate sent shivers down her spine as she pushed it open. The garden was overgrown with wildflowers and ivy climbing the weathered stone walls. She took a deep breath and walked up the cobblestone path toward the front door.'
  },
  {
    category: 'Social Media',
    text: 'Just tried the most amazing new restaurant downtown! The food was absolutely incredible and the atmosphere was perfect for a casual dinner with friends. Highly recommend checking it out if you\'re in the area. The service was top-notch and the prices were really reasonable. Definitely going back soon. Has anyone else been there? Would love to hear your thoughts! Sharing some photos from the meal later tonight.'
  },
  {
    category: 'Narration',
    text: 'In the heart of the ancient forest, where sunlight barely touched the ground, lived a community of creatures rarely seen by human eyes. They moved through the shadows with grace and purpose, each playing a vital role in the delicate ecosystem that thrived beneath the towering canopy. The trees themselves seemed to breathe with a slow, steady rhythm, their roots intertwined in a vast network that stretched for miles beneath the earth.'
  },
  {
    category: 'E-Learning',
    text: 'Welcome to today\'s lesson on fundamental mathematics. We\'ll be exploring the concept of algebraic equations and how they apply to real-world problem solving. First, let\'s review the basic principles we covered in the previous session. Remember, an equation represents a balance between two expressions. Today, we\'ll learn to manipulate these equations while maintaining that balance. Pay close attention to each step, as understanding the process is more important than memorizing formulas.'
  },
  {
    category: 'Gaming',
    text: 'You enter the ancient temple, torch in hand, shadows dancing on the walls ahead. The air feels heavy and ancient, filled with the dust of centuries. Your footsteps echo through the vast chamber as you move forward cautiously. Strange symbols cover every surface, glowing faintly in the torchlight. A voice whispers from the darkness, warning you to turn back. But you\'ve come too far now. The adventure awaits, and the legendary treasure lies just beyond the next corridor.'
  },
  {
    category: 'Podcast',
    text: 'Today we\'re diving deep into the fascinating world of artificial intelligence and its impact on modern society. Our guest expert will share insights from years of research in this rapidly evolving field. We\'ll explore both the incredible opportunities and the important challenges that AI presents. From healthcare to education, technology is transforming how we live and work. This conversation is going to be really interesting, so stay tuned for some surprising revelations.'
  },
  {
    category: 'Customer Service',
    text: 'Thank you for contacting our customer support team today. We\'re here to help resolve any questions or concerns you may have. Your satisfaction is our top priority, and we want to ensure you have the best possible experience with our services. Please provide a few details about your inquiry so we can assist you most effectively. Our team is available to help with product information, technical support, billing questions, or any other assistance you might need.'
  }
];

// 加载示例文本
function loadSampleText() {
  // 随机选择一个示例文本
  const randomIndex = Math.floor(Math.random() * sampleTexts.length);
  const sample = sampleTexts[randomIndex];
  
  // 填充到文本框
  textInput.value = sample.text;
  
  // 触发input事件以更新字符计数
  textInput.dispatchEvent(new Event('input'));
  
  // 显示提示信息
  statusText.textContent = `已加载示例文本：${sample.category}（${sample.text.length}字符）`;
  statusText.style.color = '#666';
  
  // 滚动到文本框
  textInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  textInput.focus();
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
  statusText.textContent = '请输入文字内容开始合成语音';
  
  // 加载语音列表
  loadVoices();
  
  // 检查代理端点是否可用（尝试所有端点，使用第一个可用的）
  async function checkProxyAvailability() {
    for (let i = 0; i < PROXY_ENDPOINTS.tts.length; i++) {
      try {
        const response = await fetch(PROXY_ENDPOINTS.tts[i], { method: 'OPTIONS' });
        if (response.ok) {
          currentProxyIndex.tts = i;
          const proxyName = i === 0 ? '阿里云代理' : 'Vercel代理';
          statusText.textContent = `TTS服务已就绪（${proxyName}），可以开始使用`;
          statusText.style.color = '#28a745';
          console.log(`代理端点连接成功: ${proxyName} (${PROXY_ENDPOINTS.tts[i]})`);
          return;
        }
      } catch (error) {
        console.warn(`端点 ${i + 1} 连接失败:`, error.message);
        if (i === PROXY_ENDPOINTS.tts.length - 1) {
          // 所有端点都失败
          const isNetworkError = error.message.includes('Failed to fetch') || 
                                error.message.includes('NetworkError') ||
                                error.message.includes('fetch') ||
                                error.name === 'TypeError';
          
          if (isNetworkError) {
            statusText.textContent = '网络连接失败：无法连接到API服务器。如果您在中国大陆，可能需要使用VPN访问或部署阿里云函数计算代理。';
            statusText.style.color = '#dc3545';
          } else {
            statusText.textContent = 'TTS服务连接失败，请检查网络连接';
            statusText.style.color = '#dc3545';
          }
          console.error('所有代理端点连接失败:', error);
        }
      }
    }
  }
  
  checkProxyAvailability();
});


// 使用Azure Speech Service进行语音合成
async function synthesizeSpeech(text) {
  try {
    const selectedVoice = voiceSelect.value;
    const selectedStyle = styleSelect.value || null;
    
    console.log('调用Azure TTS API，参数:', {
      text: text.substring(0, 100) + '...',
      voice: selectedVoice,
      style: selectedStyle,
      rate: rateSelect.value,
      pitch: pitchSelect.value,
      volume: volumeSelect.value,
      sample_rate: parseInt(sampleRateSelect.value),
      format: formatSelect.value
    });
    
    // 使用代理端点（优先阿里云，备用Vercel）
    const response = await fetchWithFallback(PROXY_ENDPOINTS.tts, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        voice: selectedVoice,
        style: selectedStyle,
        rate: rateSelect.value,
        pitch: pitchSelect.value,
        volume: volumeSelect.value,
        sample_rate: parseInt(sampleRateSelect.value),
        format: formatSelect.value
      })
    }, 'tts');
    
    if (!response.ok) {
      // 尝试获取错误详情
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        const errorText = await response.text();
        errorData = { error: errorText };
      }
      console.error('TTS API错误响应:', errorData);
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(errorData, null, 2)}`);
    }
    
    // 获取音频数据
    const audioData = await response.arrayBuffer();
    
    if (!audioData || audioData.byteLength === 0) {
      throw new Error('收到空的音频数据');
    }
    
    console.log('音频数据大小:', audioData.byteLength);
    
    // 创建音频对象
    const audioBlob = new Blob([audioData], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // 更新音频播放器
    audioPlayer.src = audioUrl;
    
    // 重置播放音量到50%
    if (playbackVolumeSlider && playbackVolumeValue) {
      playbackVolumeSlider.value = 50;
      audioPlayer.volume = 0.5;
      playbackVolumeValue.textContent = '50%';
      playbackVolumeSlider.style.setProperty('--slider-progress', '50%');
    }
    
    audioContainer.style.display = 'block';
    
    // 更新按钮状态
    playBtn.disabled = false;
    downloadBtn.disabled = false;
    
    statusText.textContent = '语音合成完成！';
    
    return new Uint8Array(audioData);
    
  } catch (error) {
    console.error('TTS API调用失败:', error);
    console.error('错误详情:', error.message);
    
    // 检测是否是网络连接问题
    const isNetworkError = error.message.includes('Failed to fetch') || 
                          error.message.includes('NetworkError') ||
                          error.message.includes('fetch') ||
                          error.name === 'TypeError';
    
    if (isNetworkError) {
      throw new Error('网络连接失败：无法连接到API服务器。如果您在中国大陆，可能需要使用VPN或检查网络连接。');
    } else {
      throw new Error('语音合成失败：' + error.message);
    }
  }
}

// 注意：Azure Speech Service不需要单独的token获取步骤
// API密钥存储在Vercel环境变量中，通过后端代理安全调用

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
  statusText.textContent = '请输入文字内容开始合成语音';
});
</script>

