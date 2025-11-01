// Vercel API 路由 - Azure Speech Service文本转语音合成
const axios = require('axios');

// 注意：现在直接使用Azure的语音名称，不再需要映射
// 如果前端传入的是旧名称，这里提供一个简单的向后兼容映射
// 建议前端更新为直接使用Azure语音名称（如：en-US-AndrewNeural, en-US-AmandaNeural等）
const legacyVoiceMapping = {
  'Betty': 'en-US-JennyNeural',
  'ava': 'en-US-AriaNeural',
  'Andy': 'en-US-GuyNeural',
  'Beth': 'en-US-JennyNeural',
  'Luca': 'en-GB-RyanNeural',
  'William': 'en-GB-RyanNeural',
  'Cindy': 'en-US-JennyNeural',
  'Luna': 'en-GB-SoniaNeural',
  'Abby': 'en-US-AriaNeural',
  'Donna': 'en-US-JennyNeural',
  'Emily': 'en-GB-SoniaNeural',
  'Lydia': 'zh-CN-XiaoxiaoNeural',
  'Eva': 'en-US-AriaNeural',
  'Eric': 'en-GB-RyanNeural',
  'Olivia': 'en-GB-SoniaNeural',
  'Brian': 'en-US-GuyNeural',
  'Annie': 'en-US-AriaNeural',
  'Wendy': 'en-GB-SoniaNeural',
  'Harry': 'en-GB-RyanNeural'
};

/**
 * 获取Azure语音名称
 * 如果是旧名称，则使用映射；如果已经是Azure格式，直接返回
 */
function getAzureVoiceName(voice) {
  // 如果已经是Azure格式（包含en-US-或en-GB-等），直接返回
  if (voice && (voice.startsWith('en-US-') || voice.startsWith('en-GB-') || voice.startsWith('zh-CN-'))) {
    return voice;
  }
  // 否则使用向后兼容映射
  return legacyVoiceMapping[voice] || 'en-US-JennyNeural';
}

/**
 * 将阿里云的speed参数(-500到500)转换为Azure的rate百分比(-50%到+100%)
 */
function convertSpeedToRate(speed) {
  const speedValue = parseInt(speed) || 0;
  if (speedValue <= 0) {
    // 负数或0：转换为-50%到0%
    return Math.max(-50, Math.round((speedValue / 500) * 50)) + '%';
  } else {
    // 正数：转换为0%到+100%
    return Math.min(100, Math.round((speedValue / 500) * 100)) + '%';
  }
}

/**
 * 将阿里云的pitch参数(-500到500)转换为Azure的pitch百分比(-50%到+50%)
 */
function convertPitchToPitch(pitch) {
  const pitchValue = parseInt(pitch) || 0;
  const pitchPercent = Math.round((pitchValue / 500) * 50);
  return Math.max(-50, Math.min(50, pitchPercent)) + '%';
}

/**
 * 将音量参数转换为百分比格式
 */
function convertVolumeToPercent(volume) {
  const volumeValue = parseInt(volume) || 50;
  return Math.max(0, Math.min(100, volumeValue)) + '%';
}

/**
 * 根据采样率和格式获取Azure的输出格式
 */
function getOutputFormat(format, sampleRate) {
  const sampleRateValue = parseInt(sampleRate) || 16000;
  
  // 优先考虑格式
  if (format === 'mp3') {
    if (sampleRateValue === 8000) return 'audio-8khz-128kbitrate-mono-mp3';
    if (sampleRateValue === 16000) return 'audio-16khz-128kbitrate-mono-mp3';
    if (sampleRateValue === 24000) return 'audio-24khz-160kbitrate-mono-mp3';
    return 'audio-16khz-128kbitrate-mono-mp3'; // 默认16kHz
  } else {
    // WAV格式（PCM）
    if (sampleRateValue === 8000) return 'riff-8khz-16bit-mono-pcm';
    if (sampleRateValue === 16000) return 'riff-16khz-16bit-mono-pcm';
    if (sampleRateValue === 24000) return 'riff-24khz-16bit-mono-pcm';
    if (sampleRateValue === 48000) return 'riff-48khz-16bit-mono-pcm';
    return 'riff-16khz-16bit-mono-pcm'; // 默认16kHz
  }
}

/**
 * 转义XML特殊字符
 */
function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * 构建SSML格式的请求体
 */
function buildSSML(text, voice, speed, pitch, volume) {
  const ratePercent = convertSpeedToRate(speed);
  const pitchPercent = convertPitchToPitch(pitch);
  const volumePercent = convertVolumeToPercent(volume);
  
  // 获取Azure语音名称
  const azureVoice = getAzureVoiceName(voice);
  
  // 根据语音名称确定语言
  let lang = 'en-US';
  if (azureVoice.startsWith('en-GB')) {
    lang = 'en-GB';
  } else if (azureVoice.startsWith('zh-CN')) {
    lang = 'zh-CN';
  }
  
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}">
  <voice name="${azureVoice}">
    <prosody rate="${ratePercent}" pitch="${pitchPercent}" volume="${volumePercent}">
      ${escapeXml(text)}
    </prosody>
  </voice>
</speak>`;
}

module.exports = async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('收到TTS请求:', req.body);
    
    const { text, voice, speed, pitch, volume, sample_rate, format } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: '缺少文本参数' });
    }
    
    if (text.length > 5000) {
      return res.status(400).json({ error: '文本长度不能超过5000字符' });
    }

    // 获取Azure环境变量
    const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
    const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION;
    
    if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
      throw new Error('缺少必要的环境变量 AZURE_SPEECH_KEY 或 AZURE_SPEECH_REGION');
    }

    // 构建Azure API端点
    const endpoint = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
    
    // 构建SSML请求体
    const ssml = buildSSML(
      text,
      voice || 'Betty',
      speed || 0,
      pitch || 0,
      volume || 50
    );
    
    // 获取输出格式
    const outputFormat = getOutputFormat(format || 'wav', sample_rate || 16000);
    
    console.log('Azure TTS请求参数:', {
      endpoint: endpoint,
      voice: voice || 'Betty',
      azureVoice: voiceMapping[voice] || voiceMapping['Betty'],
      speed: speed || 0,
      pitch: pitch || 0,
      volume: volume || 50,
      outputFormat: outputFormat
    });
    
    // 调用Azure Speech Service REST API
    const response = await axios.post(
      endpoint,
      ssml,
      {
        headers: {
          'Content-Type': 'application/ssml+xml',
          'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY,
          'X-Microsoft-OutputFormat': outputFormat
        },
        responseType: 'arraybuffer',
        timeout: 30000
      }
    );
    
    console.log('Azure TTS响应状态:', response.status);
    console.log('音频数据大小:', response.data.length);
    
    // 根据格式设置Content-Type
    const contentType = (format === 'mp3') ? 'audio/mpeg' : 'audio/wav';
    
    // 设置响应头
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', response.data.length);
    res.setHeader('Cache-Control', 'no-cache');
    
    // 返回音频数据
    return res.status(200).send(response.data);
    
  } catch (error) {
    console.error('TTS合成失败:', error.message);
    
    // 尝试解析错误响应
    if (error.response && error.response.data) {
      try {
        const errorText = Buffer.isBuffer(error.response.data) 
          ? error.response.data.toString('utf-8') 
          : error.response.data;
        console.error('错误响应:', errorText);
        
        // 尝试解析为JSON（Azure错误响应通常是JSON）
        try {
          const errorJson = JSON.parse(errorText);
          console.error('解析后的错误:', errorJson);
          
          return res.status(error.response.status || 500).json({ 
            error: '语音合成失败', 
            details: error.message,
            response: errorJson
          });
        } catch (parseError) {
          // 如果不是JSON，返回原始文本
          return res.status(error.response.status || 500).json({ 
            error: '语音合成失败', 
            details: error.message,
            rawResponse: errorText
          });
        }
      } catch (parseError) {
        console.error('无法解析错误响应:', parseError);
        return res.status(500).json({ 
          error: '语音合成失败', 
          details: error.message
        });
      }
    } else {
      return res.status(500).json({ 
        error: '语音合成失败', 
        details: error.message
      });
    }
  }
}
