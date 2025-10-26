---
title: 文字转语音工具
author: Huang Jie
date: 2025-8-21
layout: post
---

<!-- 工具简介区块 -->
<div style="background:#f5f7fa; border-radius:8px; padding:20px 30px; margin:24px 0 32px 0; font-size:1.1em; line-height:2.2;">
<strong>工具名称：</strong>文字转语音工具<br>
<strong>技术平台：</strong>阿里云智能语音交互<br>
<strong>功能特点：</strong>实时语音合成、在线播放、音频下载<br>
<strong>适用场景：</strong>教学音频制作、播客内容生成、多语言学习<br>
<strong>更新时间：</strong>2025年10月26日
</div>


<!-- 文字转语音工具界面 -->
## 文字转语音工具

<div style="background:#fff; border:1px solid #e0e0e0; border-radius:8px; padding:24px; margin:20px 0; box-shadow:0 2px 8px rgba(0,0,0,0.1);">

<!-- 输入区域 -->
<div style="margin-bottom:24px;">
  <label for="textInput" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">输入文本：</label>
  <textarea id="textInput" placeholder="请输入要转换为语音的文字内容..." style="width:100%; height:120px; padding:12px; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5; resize:vertical; font-family:inherit;"></textarea>
  <div style="margin-top:8px; font-size:12px; color:#666;">
    字符数：<span id="charCount">0</span> / 5000
  </div>
</div>

<!-- 语音设置区域 -->
<div style="display:flex; gap:20px; margin-bottom:24px; flex-wrap:wrap;">
   <div style="flex:1; min-width:200px;">
     <label for="voiceSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">音色：</label>
     <select id="voiceSelect" style="width:100%; padding:8px 12px; border:1px solid #ddd; border-radius:6px; font-size:14px;">
       <option value="Betty" selected>Betty（美式英文女声）</option>
       <option value="ava">ava（美式女声）</option>
       <option value="Andy">Andy（美音男声）</option>
       <option value="Beth">Beth（美式英文女声）</option>
       <option value="Luca">Luca（英音男声）</option>
       <option value="William">William（英音男声）</option>
       <option value="Cindy">Cindy（美式英文女声）</option>
       <option value="Luna">Luna（英音女声）</option>
       <option value="Abby">Abby（美音女声）</option>
       <option value="Donna">Donna（美式英文女声）</option>
       <option value="Emily">Emily（英音女声）</option>
       <option value="Lydia">Lydia（英中双语）</option>
       <option value="Eva">Eva（美式英文女声）</option>
       <option value="Eric">Eric（英音男声）</option>
       <option value="Olivia">Olivia（英音女声）</option>
       <option value="Brian">Brian（美式英文男声）</option>
       <option value="Annie">Annie（美语女声）</option>
       <option value="Wendy">Wendy（英音女声）</option>
       <option value="Harry">Harry（英音男声）</option>
     </select>
   </div>
  
  <div style="flex:1; min-width:200px;">
    <label for="speedSlider" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">语速：</label>
    <div style="display:flex; align-items:center; gap:12px;">
      <span style="font-size:12px; color:#666; min-width:30px;">-500</span>
      <input type="range" id="speedSlider" min="-500" max="500" value="0" step="10" 
             style="flex:1; height:6px; background:#ddd; border-radius:3px; outline:none; cursor:pointer;">
      <span style="font-size:12px; color:#666; min-width:30px;">500</span>
    </div>
    <div style="text-align:center; margin-top:4px;">
      <span id="speedValue" style="font-size:12px; color:#4a90e2; font-weight:500;">0（正常）</span>
    </div>
  </div>
  
   <div style="flex:1; min-width:200px;">
     <label for="volumeSlider" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">音量：</label>
     <div style="display:flex; align-items:center; gap:12px;">
       <span style="font-size:12px; color:#666; min-width:30px;">1</span>
       <input type="range" id="volumeSlider" min="1" max="100" value="50" step="1" 
              style="flex:1; height:6px; background:#ddd; border-radius:3px; outline:none; cursor:pointer;">
       <span style="font-size:12px; color:#666; min-width:30px;">100</span>
     </div>
     <div style="text-align:center; margin-top:4px;">
       <span id="volumeValue" style="font-size:12px; color:#4a90e2; font-weight:500;">50%</span>
     </div>
   </div>
   
   <div style="flex:1; min-width:200px;">
     <label for="pitchSlider" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">语调：</label>
     <div style="display:flex; align-items:center; gap:12px;">
       <span style="font-size:12px; color:#666; min-width:30px;">-500</span>
       <input type="range" id="pitchSlider" min="-500" max="500" value="0" step="10" 
              style="flex:1; height:6px; background:#ddd; border-radius:3px; outline:none; cursor:pointer;">
       <span style="font-size:12px; color:#666; min-width:30px;">500</span>
     </div>
     <div style="text-align:center; margin-top:4px;">
       <span id="pitchValue" style="font-size:12px; color:#4a90e2; font-weight:500;">0（正常）</span>
     </div>
   </div>
 </div>

<!-- 高级设置区域 -->
<div style="display:flex; gap:20px; margin-bottom:24px; flex-wrap:wrap;">
   <div style="flex:1; min-width:200px;">
     <label for="sampleRateSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">采样率：</label>
     <select id="sampleRateSelect" style="width:100%; padding:8px 12px; border:1px solid #ddd; border-radius:6px; font-size:14px;">
       <option value="8000">8000 Hz（电话质量）</option>
       <option value="16000" selected>16000 Hz（标准质量）</option>
       <option value="22050">22050 Hz（CD质量）</option>
       <option value="44100">44100 Hz（高音质）</option>
     </select>
   </div>
   
   <div style="flex:1; min-width:200px;">
     <label for="formatSelect" style="display:block; font-weight:bold; margin-bottom:8px; color:#2d3a4a;">格式：</label>
     <select id="formatSelect" style="width:100%; padding:8px 12px; border:1px solid #ddd; border-radius:6px; font-size:14px;">
       <option value="wav" selected>WAV（无损）</option>
       <option value="mp3">MP3（压缩）</option>
       <option value="pcm">PCM（原始）</option>
     </select>
   </div>
 </div>

<!-- 控制按钮区域 -->
<div style="display:flex; gap:16px; margin-bottom:24px; flex-wrap:wrap;">
  <button id="synthesizeBtn" style="background:#4a90e2; color:white; border:none; padding:14px 28px; border-radius:8px; font-size:15px; font-weight:500; cursor:pointer; transition:all 0.3s; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    ▶️ 开始合成
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
    <li>输入要转换的文字内容（最多5000字符）</li>
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
const voiceSelect = document.getElementById('voiceSelect');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const pitchSlider = document.getElementById('pitchSlider');
const pitchValue = document.getElementById('pitchValue');
const sampleRateSelect = document.getElementById('sampleRateSelect');
const formatSelect = document.getElementById('formatSelect');
const synthesizeBtn = document.getElementById('synthesizeBtn');
const playBtn = document.getElementById('playBtn');
const downloadBtn = document.getElementById('downloadBtn');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const statusText = document.getElementById('statusText');
const audioContainer = document.getElementById('audioContainer');
const audioPlayer = document.getElementById('audioPlayer');

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
    synthesizeBtn.style.background = '#0066cc';
  }
});

// 滑块事件监听
speedSlider.addEventListener('input', function() {
  const value = parseInt(this.value);
  let description = '';
  if (value < -200) description = '（很慢）';
  else if (value < -100) description = '（较慢）';
  else if (value < 0) description = '（稍慢）';
  else if (value === 0) description = '（正常）';
  else if (value <= 100) description = '（稍快）';
  else if (value <= 300) description = '（较快）';
  else description = '（很快）';
  speedValue.textContent = `${value}${description}`;
});

volumeSlider.addEventListener('input', function() {
  const value = parseInt(this.value);
  volumeValue.textContent = `${value}%`;
});

pitchSlider.addEventListener('input', function() {
  const value = parseInt(this.value);
  let description = '';
  if (value < -200) description = '（很低）';
  else if (value < -100) description = '（较低）';
  else if (value < 0) description = '（稍低）';
  else if (value === 0) description = '（正常）';
  else if (value <= 100) description = '（稍高）';
  else if (value <= 300) description = '（较高）';
  else description = '（很高）';
  pitchValue.textContent = `${value}${description}`;
});

// 按钮悬停效果
const buttons = [synthesizeBtn, playBtn, downloadBtn];
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
    statusText.textContent = '合成失败：' + error.message;
    synthesizeBtn.disabled = false;
    synthesizeBtn.innerHTML = '▶️ 开始合成';
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

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
  statusText.textContent = '请输入文字内容开始合成语音';
  
  // 检查 Vercel API 是否可用
  const apiBaseUrl = 'https://vercel-tts.vercel.app';
  fetch(`${apiBaseUrl}/api/token`, { method: 'POST' })
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

// 全局语音合成对象
let currentUtterance = null;

// 使用阿里云TTS API进行语音合成
async function synthesizeSpeech(text) {
  try {
    console.log('调用阿里云TTS API，参数:', {
      text: text,
      voice: voiceSelect.value,
      speech_rate: parseInt(speedSelect.value),
      pitch_rate: parseInt(pitchSelect.value),
      volume: parseInt(volumeSelect.value)
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
        voice: voiceSelect.value,
        speed: parseInt(speedSlider.value),
        pitch: parseInt(pitchSlider.value),
        volume: parseInt(volumeSlider.value),
        sample_rate: parseInt(sampleRateSelect.value),
        format: formatSelect.value
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // 获取音频数据
    const audioData = await response.arrayBuffer();
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
    throw new Error('语音合成失败：' + error.message);
  }
}

// 获取阿里云访问令牌
async function getToken(accessKeyId, accessKeySecret) {
  // 由于CORS限制，无法直接从浏览器调用阿里云API
  // 这里使用一个临时的解决方案：通过代理服务器或直接使用预生成的token
  console.log('注意：由于CORS限制，无法直接从浏览器获取token');
  console.log('建议：1. 使用后端代理 2. 或使用预生成的token');
  
  // 返回一个模拟token，实际使用时需要替换为有效的token
  return 'c887e110996e439eb7af6b221';
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
  statusText.textContent = '请输入文字内容开始合成语音';
});
</script>

