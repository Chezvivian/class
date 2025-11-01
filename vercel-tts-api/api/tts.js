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
  // 如果已经是Azure格式（包含en-开头的所有英语变体或zh-CN-等），直接返回
  if (voice && (voice.startsWith('en-') || voice.startsWith('zh-CN-'))) {
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
  
  // 根据格式和采样率返回Azure支持的输出格式
  if (format === 'mp3') {
    if (sampleRateValue === 16000) return 'audio-16khz-128kbitrate-mono-mp3';
    if (sampleRateValue === 24000) return 'audio-24khz-160kbitrate-mono-mp3';
    if (sampleRateValue === 48000) return 'audio-48khz-192kbitrate-mono-mp3';
    return 'audio-16khz-128kbitrate-mono-mp3'; // 默认16kHz
  } else if (format === 'ogg') {
    if (sampleRateValue === 16000) return 'ogg-16khz-16bit-mono-opus';
    if (sampleRateValue === 24000) return 'ogg-24khz-16bit-mono-opus';
    if (sampleRateValue === 48000) return 'ogg-48khz-16bit-mono-opus';
    return 'ogg-16khz-16bit-mono-opus'; // 默认16kHz
  } else {
    // WAV格式（PCM）
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
 * @param {string} text - 要合成的文本
 * @param {string} voice - Azure语音名称（如：en-US-JennyNeural）
 * @param {string|null} personality - Personality（如果有）
 * @param {string|null} style - Speaking style（如果有）
 */
function buildSSML(text, voice, personality, style) {
  // voice参数应该是Azure语音名称（如：en-US-JennyNeural）
  const azureVoice = voice;
  
  // 根据语音名称确定语言
  let lang = 'en-US';
  if (azureVoice && azureVoice.startsWith('en-GB')) {
    lang = 'en-GB';
  } else if (azureVoice && azureVoice.startsWith('en-CA')) {
    lang = 'en-CA';
  } else if (azureVoice && azureVoice.startsWith('en-AU')) {
    lang = 'en-AU';
  } else if (azureVoice && azureVoice.startsWith('en-IN')) {
    lang = 'en-IN';
  } else if (azureVoice && azureVoice.startsWith('zh-CN')) {
    lang = 'zh-CN';
  }
  
  // 构建基础SSML
  let ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${lang}">
  <voice name="${azureVoice}">`;
  
  // 如果设置了Personality或Style，使用mstts:express-as标签
  if (personality || style) {
    ssml += `<mstts:express-as`;
    if (style) {
      ssml += ` style="${escapeXml(style)}"`;
    }
    if (personality) {
      ssml += ` personality="${escapeXml(personality)}"`;
    }
    ssml += `>`;
  }
  
  // 添加文本内容
  ssml += escapeXml(text);
  
  // 关闭mstts:express-as标签（如果有）
  if (personality || style) {
    ssml += `</mstts:express-as>`;
  }
  
  // 关闭voice和speak标签
  ssml += `
  </voice>
</speak>`;
  
  return ssml;
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
    
    const { text, voice, personality, style, sample_rate, format } = req.body;
    
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
    
    // 获取Azure语音名称（支持直接使用Azure格式或向后兼容）
    const azureVoice = getAzureVoiceName(voice || 'en-US-JennyNeural');
    
    // 构建SSML请求体（支持Personality和Speaking styles）
    const ssml = buildSSML(
      text,
      azureVoice,
      personality || null,
      style || null
    );
    
    // 获取输出格式
    const outputFormat = getOutputFormat(format || 'wav', sample_rate || 16000);
    
    console.log('Azure TTS请求参数:', {
      endpoint: endpoint,
      inputVoice: voice || 'en-US-JennyNeural',
      azureVoice: azureVoice,
      personality: personality || '无',
      style: style || '无',
      outputFormat: outputFormat,
      ssmlLength: ssml.length
    });
    console.log('SSML内容:', ssml);
    
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
    let contentType = 'audio/wav';
    if (format === 'mp3') {
      contentType = 'audio/mpeg';
    } else if (format === 'ogg') {
      contentType = 'audio/ogg';
    }
    
    // 设置响应头
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', response.data.length);
    res.setHeader('Cache-Control', 'no-cache');
    
    // 返回音频数据
    return res.status(200).send(response.data);
    
  } catch (error) {
    console.error('TTS合成失败:', error.message);
    console.error('错误堆栈:', error.stack);
    
    // 尝试解析错误响应
    if (error.response && error.response.data) {
      try {
        const errorText = Buffer.isBuffer(error.response.data) 
          ? error.response.data.toString('utf-8') 
          : error.response.data;
        console.error('Azure API错误响应:', errorText);
        console.error('错误状态码:', error.response.status);
        console.error('错误头部:', error.response.headers);
        
        // 尝试解析为JSON（Azure错误响应通常是JSON）
        try {
          const errorJson = JSON.parse(errorText);
          console.error('解析后的错误:', errorJson);
          
          return res.status(error.response.status || 500).json({ 
            error: '语音合成失败', 
            details: error.message,
            azureError: errorJson,
            endpoint: endpoint
          });
        } catch (parseError) {
          // 如果不是JSON，返回原始文本
          return res.status(error.response.status || 500).json({ 
            error: '语音合成失败', 
            details: error.message,
            rawResponse: errorText,
            endpoint: endpoint
          });
        }
      } catch (parseError) {
        console.error('无法解析错误响应:', parseError);
        return res.status(500).json({ 
          error: '语音合成失败', 
          details: error.message,
          parseError: parseError.message
        });
      }
    } else {
      // 没有响应（可能是网络错误或超时）
      console.error('无响应错误，可能是网络问题或超时');
      return res.status(500).json({ 
        error: '语音合成失败', 
        details: error.message,
        type: error.code || 'UNKNOWN_ERROR',
        endpoint: endpoint
      });
    }
  }
}
