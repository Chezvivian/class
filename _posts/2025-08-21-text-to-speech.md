---
title: 文字转语音工具
author: Huang Jie
date: 2025-8-21
layout: post
---

<!-- 工具简介区块 -->
<div style="background:#f5f7fa; border-radius:8px; padding:20px 30px; margin:24px 0 32px 0; font-size:1.1em; line-height:2.2;">
<strong>工具名称：</strong>文字转语音工具<br>
<strong>技术平台：</strong>微软Azure AI Speech Service<br>
<strong>功能特点：</strong>实时语音合成、在线播放、音频下载<br>
<strong>适用场景：</strong>教学音频制作、播客内容生成、多语言学习<br>
<strong>更新时间：</strong>2025年11月1日
</div>


<!-- 使用说明 -->
<div style="background:#e8f4fd; border:1px solid #b3d9ff; border-radius:8px; padding:16px; margin:20px 0; font-size:14px; line-height:1.6;">
<strong>📝 使用说明：</strong><br>
• 输入要转换的文字内容（支持最多5000字符）<br>
• 选择合适的音色、语速、音量和语调<br>
• 点击"开始合成"按钮生成语音<br>
• 合成完成后可以播放或下载音频<br>
• 支持多种音色和参数调节，满足不同需求
</div>

<!-- 文字转语音工具界面 -->

<div style="background:#fff; border:1px solid #e0e0e0; border-radius:8px; padding:24px; margin:20px 0; box-shadow:0 2px 8px rgba(0,0,0,0.1);">

<!-- 输入区域 -->
<div style="margin-bottom:24px;">
  <label for="textInput" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">输入文本：</label>
  <textarea id="textInput" placeholder="请输入要转换为语音的文字内容..." style="width:100%; height:150px; padding:16px; border:1px solid #ddd; border-radius:8px; font-size:16px; line-height:1.6; resize:vertical; font-family:inherit;"></textarea>
  <div style="margin-top:8px; font-size:12px; color:#666;">
    字符数：<span id="charCount">0</span> / 5000
  </div>
</div>

<!-- 语音设置区域 -->
<div style="display:flex; gap:20px; margin-bottom:24px; flex-wrap:wrap;">
   <!-- 语言选择 -->
   <div style="flex:1; min-width:200px;">
     <label for="languageSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">语言（Language）：</label>
     <select id="languageSelect" style="width:100%; padding:8px 12px; border:1px solid #ddd; border-radius:6px; font-size:14px;">
       <option value="">正在加载...</option>
     </select>
   </div>
   
   <!-- 音色选择 -->
   <div style="flex:1; min-width:200px;">
     <label for="voiceSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">音色（Voice）：</label>
     <select id="voiceSelect" style="width:100%; padding:8px 12px; border:1px solid #ddd; border-radius:6px; font-size:14px;" disabled>
       <option value="">请先选择语言</option>
     </select>
     <div id="voiceLoadingStatus" style="font-size:12px; color:#666; margin-top:4px;"></div>
   </div>
   
   <!-- Personality选择 -->
   <div style="flex:1; min-width:200px;">
     <label for="personalitySelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">性格（Personality）：</label>
     <select id="personalitySelect" style="width:100%; padding:8px 12px; border:1px solid #ddd; border-radius:6px; font-size:14px;" disabled>
       <option value="">请先选择音色</option>
     </select>
   </div>
   
   <!-- Speaking Style选择 -->
   <div style="flex:1; min-width:200px;">
     <label for="styleSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">说话风格（Speaking Style）：</label>
     <select id="styleSelect" style="width:100%; padding:8px 12px; border:1px solid #ddd; border-radius:6px; font-size:14px;" disabled>
       <option value="">请先选择音色</option>
     </select>
   </div>
 </div>

<!-- 高级设置区域 -->
<div style="display:flex; gap:20px; margin-bottom:24px; flex-wrap:wrap;">
   <div style="flex:1; min-width:200px;">
     <label for="sampleRateSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">采样率：</label>
     <select id="sampleRateSelect" style="width:100%; padding:8px 12px; border:1px solid #ddd; border-radius:6px; font-size:14px;">
       <option value="8000">8000 Hz（电话质量）</option>
       <option value="16000" selected>16000 Hz（标准质量）</option>
     </select>
   </div>
   
   <div style="flex:1; min-width:200px;">
     <label for="formatSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">格式：</label>
     <select id="formatSelect" style="width:100%; padding:8px 12px; border:1px solid #ddd; border-radius:6px; font-size:14px;">
       <option value="wav" selected>WAV（无损）</option>
       <option value="mp3">MP3（压缩）</option>
     </select>
   </div>
 </div>

<!-- 控制按钮区域 -->
<div style="display:flex; gap:16px; margin-bottom:24px; flex-wrap:wrap;">
  <button id="synthesizeBtn" style="background:#4a90e2; color:white; border:none; padding:14px 28px; border-radius:8px; font-size:15px; font-weight:500; cursor:pointer; transition:all 0.3s; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    ▶️ 开始合成
  </button>
  <button id="previewBtn" style="background:#6f42c1; color:white; border:none; padding:14px 28px; border-radius:8px; font-size:15px; font-weight:500; cursor:pointer; transition:all 0.3s; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    👁️ 预览文本
  </button>
  <button id="playBtn" style="background:#52c41a; color:white; border:none; padding:14px 28px; border-radius:8px; font-size:15px; font-weight:500; cursor:pointer; transition:all 0.3s; box-shadow:0 2px 4px rgba(0,0,0,0.1);" disabled>
    ⏯️ 播放
  </button>
  <button id="downloadBtn" style="background:#8c8c8c; color:white; border:none; padding:14px 28px; border-radius:8px; font-size:15px; font-weight:500; cursor:pointer; transition:all 0.3s; box-shadow:0 2px 4px rgba(0,0,0,0.1);" disabled>
    ⬇️ 下载音频
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
  <audio id="audioPlayer" controls style="width:100%; margin-top:16px;">
    您的浏览器不支持音频播放。
  </audio>
</div>

<!-- 使用说明 -->
<div style="background:#f8f9fa; border:1px solid #e9ecef; border-radius:6px; padding:16px; margin-top:24px;">
  <h4 style="margin:0 0 12px 0; color:#2d3a4a;">使用说明：</h4>
  <ul style="margin:0; padding-left:20px; color:#666; font-size:14px; line-height:1.6;">
    <li>输入要转换的文字内容</li>
    <li>选择合适的音色、语速和音量</li>
    <li>点击"开始合成"按钮生成语音</li>
    <li>合成完成后可以播放、暂停、停止或下载音频</li>
    <li>支持多种音色和语速调节，满足不同需求</li>
  </ul>
</div>

</div>

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
const personalitySelect = document.getElementById('personalitySelect');
const styleSelect = document.getElementById('styleSelect');
const sampleRateSelect = document.getElementById('sampleRateSelect');
const formatSelect = document.getElementById('formatSelect');
const synthesizeBtn = document.getElementById('synthesizeBtn');
const previewBtn = document.getElementById('previewBtn');
const playBtn = document.getElementById('playBtn');
const downloadBtn = document.getElementById('downloadBtn');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const statusText = document.getElementById('statusText');
const audioContainer = document.getElementById('audioContainer');
const audioPlayer = document.getElementById('audioPlayer');

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

// 音色选择改变时，更新Personality和Speaking styles
voiceSelect.addEventListener('change', function() {
  updatePersonalityAndStyles(this.value);
});

// 预览文本按钮事件
previewBtn.addEventListener('click', function() {
  showSegmentPreview();
});

// 按钮悬停效果
const buttons = [synthesizeBtn, previewBtn, playBtn, downloadBtn];
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
    
     // 创建音频对象
     audioBlob = new Blob([audioData], { type: 'audio/wav' });
     audioUrl = URL.createObjectURL(audioBlob);
     audioPlayer.src = audioUrl;
    
    // 更新按钮状态
    playBtn.disabled = false;
    downloadBtn.disabled = false;
    synthesizeBtn.disabled = false;
    synthesizeBtn.innerHTML = '▶️ 开始合成';
    
    statusText.textContent = '语音合成完成！';
    audioContainer.style.display = 'block';
    
  } catch (error) {
    console.error('合成失败:', error);
    const errorMessage = error.message || '未知错误';
    statusText.textContent = '合成失败：' + errorMessage;
    statusText.style.color = '#dc3545';
    
    // 显示更详细的错误信息
    if (errorMessage.includes('500') || errorMessage.includes('HTTP 500')) {
      statusText.textContent = '合成失败：服务器错误（500），请检查Vercel日志或联系管理员';
    } else if (errorMessage.includes('缺少必要的环境变量')) {
      statusText.textContent = '合成失败：环境变量未配置，请在Vercel中设置AZURE_SPEECH_KEY和AZURE_SPEECH_REGION';
    } else if (errorMessage.includes('401') || errorMessage.includes('HTTP 401')) {
      statusText.textContent = '合成失败：认证失败，请检查AZURE_SPEECH_KEY是否正确';
    }
    
    synthesizeBtn.disabled = false;
    synthesizeBtn.innerHTML = '▶️ 开始合成';
    progressContainer.style.display = 'none';
  }
});

// 播放控制
playBtn.addEventListener('click', function() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.innerHTML = '⏸️ 暂停';
    statusText.textContent = '正在播放...';
  } else {
    audioPlayer.pause();
    playBtn.innerHTML = '⏯️ 播放';
    statusText.textContent = '已暂停';
  }
});

// 音频播放事件监听
audioPlayer.addEventListener('play', function() {
  playBtn.innerHTML = '⏸️ 暂停';
  statusText.textContent = '正在播放...';
});

audioPlayer.addEventListener('pause', function() {
  playBtn.innerHTML = '⏯️ 播放';
  statusText.textContent = '已暂停';
});

audioPlayer.addEventListener('ended', function() {
  playBtn.innerHTML = '⏯️ 播放';
  statusText.textContent = '播放完成';
});

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

// 加载Azure语音列表
async function loadVoices() {
  const languageSelect = document.getElementById('languageSelect');
  const voiceLoadingStatus = document.getElementById('voiceLoadingStatus');
  const apiBaseUrl = 'https://vercel-tts.vercel.app';
  
  try {
    voiceLoadingStatus.textContent = '正在加载语音列表...';
    const response = await fetch(`${apiBaseUrl}/api/voices`);
    
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
      languageSelect.innerHTML = '<option value="">请选择语言</option>';
      
      // 添加所有英语语言选项
      data.languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        languageSelect.appendChild(option);
      });
      
      // 设置默认选中第一个语言
      if (languageSelect.options.length > 1) {
        languageSelect.selectedIndex = 1;
        updateVoicesByLanguage(languageSelect.value);
      }
      
      voiceLoadingStatus.textContent = `已加载 ${data.total} 个语音，${data.languages.length} 种英语语言`;
      console.log('语音列表加载成功:', data);
    } else {
      throw new Error('无法获取语音列表');
    }
  } catch (error) {
    console.error('加载语音列表失败:', error);
    voiceLoadingStatus.textContent = `加载失败: ${error.message}`;
    voiceLoadingStatus.style.color = '#dc3545';
    
    // 使用默认值
    languageSelect.innerHTML = `
      <option value="en-US" selected>English (United States)</option>
      <option value="en-GB">English (United Kingdom)</option>
    `;
    languageSelect.selectedIndex = 0;
    voicesData = {
      languages: [
        { code: 'en-US', name: 'English (United States)' },
        { code: 'en-GB', name: 'English (United Kingdom)' }
      ],
      voices: {
        'en-US': [
          { name: 'en-US-JennyNeural', displayName: 'Jenny', gender: 'Female', styles: [], roles: [] }
        ],
        'en-GB': [
          { name: 'en-GB-RyanNeural', displayName: 'Ryan', gender: 'Male', styles: [], roles: [] }
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
    return;
  }
  
  const voices = voicesData.voices[languageCode] || [];
  voiceSelect.innerHTML = '';
  
  if (voices.length === 0) {
    voiceSelect.innerHTML = '<option value="">该语言暂无可用语音</option>';
    voiceSelect.disabled = true;
    personalitySelect.disabled = true;
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
    updatePersonalityAndStyles(voiceSelect.value);
  }
}

// 根据选择的音色更新Personality和Speaking styles
function updatePersonalityAndStyles(voiceName) {
  if (!voiceName || !voicesData || !voicesData.voices) {
    personalitySelect.innerHTML = '<option value="">请先选择音色</option>';
    styleSelect.innerHTML = '<option value="">请先选择音色</option>';
    personalitySelect.disabled = true;
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
    personalitySelect.innerHTML = '<option value="">未找到语音信息</option>';
    styleSelect.innerHTML = '<option value="">未找到语音信息</option>';
    personalitySelect.disabled = true;
    styleSelect.disabled = true;
    return;
  }
  
  // 更新Personality选择器
  personalitySelect.innerHTML = '<option value="">无（不设置）</option>';
  if (currentVoiceInfo.personality) {
    const personalityArray = Array.isArray(currentVoiceInfo.personality) 
      ? currentVoiceInfo.personality 
      : [currentVoiceInfo.personality];
    personalityArray.forEach(personality => {
      const option = document.createElement('option');
      option.value = personality;
      option.textContent = personality;
      personalitySelect.appendChild(option);
    });
    personalitySelect.disabled = false;
  } else {
    personalitySelect.disabled = false;
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

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
  statusText.textContent = '请输入文字内容开始合成语音';
  
  // 加载语音列表
  loadVoices();
  
  // 检查 Vercel API 是否可用（Azure不需要token，直接检查TTS端点）
  const apiBaseUrl = 'https://vercel-tts.vercel.app';
  // 使用HEAD请求检查API端点是否可访问
  fetch(`${apiBaseUrl}/api/tts`, { method: 'OPTIONS' })
    .then(response => {
      if (response.ok) {
        statusText.textContent = 'TTS服务已就绪，可以开始使用';
        console.log('Vercel API 连接成功');
      } else {
        statusText.textContent = 'TTS服务暂时不可用，请稍后重试';
        console.warn('Vercel API 响应异常');
      }
    })
    .catch(error => {
      statusText.textContent = 'TTS服务连接失败，请检查网络连接';
      console.error('Vercel API 连接失败:', error);
    });
});

// 显示文本预览
function showSegmentPreview() {
  const text = textInput.value.trim();
  if (!text) {
    alert('请输入文本内容');
    return;
  }
  alert(`文本预览（${text.length}字符）：\n\n${text.substring(0, 500)}${text.length > 500 ? '...' : ''}`);
}

// 使用Azure Speech Service进行语音合成
async function synthesizeSpeech(text) {
  try {
    const selectedVoice = voiceSelect.value;
    const selectedPersonality = personalitySelect.value || null;
    const selectedStyle = styleSelect.value || null;
    
    console.log('调用Azure TTS API，参数:', {
      text: text.substring(0, 100) + '...',
      voice: selectedVoice,
      personality: selectedPersonality,
      style: selectedStyle,
      sample_rate: parseInt(sampleRateSelect.value),
      format: formatSelect.value
    });
    
    // 使用 Vercel API 端点
    const apiBaseUrl = 'https://vercel-tts.vercel.app';
    const response = await fetch(`${apiBaseUrl}/api/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        voice: selectedVoice,
        personality: selectedPersonality,
        style: selectedStyle,
        sample_rate: parseInt(sampleRateSelect.value),
        format: formatSelect.value
      })
    });
    
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
    audioContainer.style.display = 'block';
    
    // 更新按钮状态
    playBtn.disabled = false;
    downloadBtn.disabled = false;
    
    statusText.textContent = '语音合成完成！';
    
    return new Uint8Array(audioData);
    
  } catch (error) {
    console.error('TTS API调用失败:', error);
    console.error('错误详情:', error.message);
    throw new Error('语音合成失败：' + error.message);
  }
}

// 注意：Azure Speech Service不需要单独的token获取步骤
// API密钥存储在Vercel环境变量中，通过后端代理安全调用

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
  statusText.textContent = '请输入文字内容开始合成语音';
});
</script>

