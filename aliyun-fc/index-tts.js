// 阿里云函数计算 - Azure Speech Service文本转语音合成代理
// 入口文件：index.js（将此文件重命名为index.js）

const axios = require('axios');

// 向后兼容的语音名称映射
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

function getAzureVoiceName(voice) {
  if (voice && (voice.startsWith('en-') || voice.startsWith('zh-CN-'))) {
    return voice;
  }
  return legacyVoiceMapping[voice] || 'en-US-JennyNeural';
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSSML(text, voice, style, rate, pitch, volume) {
  const azureVoice = voice;
  
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
  
  let ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${lang}">
  <voice name="${azureVoice}">`;
  
  const hasStyle = style && style.trim() !== '';
  const hasRate = rate && rate.trim() !== '' && rate !== 'medium';
  const hasPitch = pitch && pitch.trim() !== '' && pitch !== 'medium';
  const hasVolume = volume && volume.trim() !== '' && volume !== 'medium';
  const hasProsody = hasRate || hasPitch || hasVolume;
  
  let prosodyAttrs = [];
  if (hasRate) {
    prosodyAttrs.push(`rate="${escapeXml(rate)}"`);
  }
  if (hasPitch) {
    prosodyAttrs.push(`pitch="${escapeXml(pitch)}"`);
  }
  if (hasVolume) {
    prosodyAttrs.push(`volume="${escapeXml(volume)}"`);
  }
  const prosodyAttrsStr = prosodyAttrs.join(' ');
  
  if (hasStyle && hasProsody) {
    ssml += `<mstts:express-as style="${escapeXml(style)}">`;
    ssml += `<prosody ${prosodyAttrsStr}>`;
    ssml += escapeXml(text);
    ssml += `</prosody>`;
    ssml += `</mstts:express-as>`;
  } else if (hasStyle) {
    ssml += `<mstts:express-as style="${escapeXml(style)}">`;
    ssml += escapeXml(text);
    ssml += `</mstts:express-as>`;
  } else if (hasProsody) {
    ssml += `<prosody ${prosodyAttrsStr}>`;
    ssml += escapeXml(text);
    ssml += `</prosody>`;
  } else {
    ssml += escapeXml(text);
  }
  
  ssml += `
  </voice>
</speak>`;
  
  return ssml;
}

function getOutputFormat(format, sampleRate) {
  const sampleRateValue = parseInt(sampleRate) || 16000;
  
  if (format === 'mp3') {
    if (sampleRateValue === 16000) return 'audio-16khz-128kbitrate-mono-mp3';
    if (sampleRateValue === 24000) return 'audio-24khz-160kbitrate-mono-mp3';
    if (sampleRateValue === 48000) return 'audio-48khz-192kbitrate-mono-mp3';
    return 'audio-16khz-128kbitrate-mono-mp3';
  } else if (format === 'ogg') {
    if (sampleRateValue === 16000) return 'ogg-16khz-16bit-mono-opus';
    if (sampleRateValue === 24000) return 'ogg-24khz-16bit-mono-opus';
    if (sampleRateValue === 48000) return 'ogg-48khz-16bit-mono-opus';
    return 'ogg-16khz-16bit-mono-opus';
  } else {
    if (sampleRateValue === 16000) return 'riff-16khz-16bit-mono-pcm';
    if (sampleRateValue === 24000) return 'riff-24khz-16bit-mono-pcm';
    if (sampleRateValue === 48000) return 'riff-48khz-16bit-mono-pcm';
    return 'riff-16khz-16bit-mono-pcm';
  }
}

/**
 * 阿里云函数计算 HTTP触发器 处理函数
 * 阿里云函数计算的HTTP触发器使用标准事件函数格式
 */
exports.handler = async (event, context, callback) => {
  // 设置响应头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  // 处理 OPTIONS 预检请求
  if (event.httpMethod === 'OPTIONS' || (event.request && event.request.method === 'OPTIONS')) {
    callback(null, {
      statusCode: 200,
      headers: headers,
      body: ''
    });
    return;
  }
  
  if (event.httpMethod !== 'POST' && (!event.request || event.request.method !== 'POST')) {
    callback(null, {
      statusCode: 405,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    });
    return;
  }

  try {
    // 获取请求体
    let body;
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else if (event.body) {
      body = event.body;
    } else if (event.request && event.request.body) {
      if (typeof event.request.body === 'string') {
        body = JSON.parse(event.request.body);
      } else {
        body = event.request.body;
      }
    } else {
      body = {};
    }
    
    const { text, voice, style, rate, pitch, volume, sample_rate, format } = body;
    
    if (!text) {
      callback(null, {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: '缺少文本参数' })
      });
      return;
    }

    if (text.length > 5000) {
      callback(null, {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: '文本长度不能超过5000字符' })
      });
      return;
    }

    // 从环境变量获取Azure配置
    const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
    const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION;
    
    if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
      callback(null, {
        statusCode: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: '语音合成失败',
          details: '缺少必要的环境变量 AZURE_SPEECH_KEY 或 AZURE_SPEECH_REGION'
        })
      });
      return;
    }

    // 构建Azure API端点
    const endpoint = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
    
    // 获取Azure语音名称
    const azureVoice = getAzureVoiceName(voice || 'en-US-JennyNeural');
    
    // 构建SSML请求体
    const ssml = buildSSML(
      text,
      azureVoice,
      style || null,
      rate || null,
      pitch || null,
      volume || null
    );
    
    // 获取输出格式
    const outputFormat = getOutputFormat(format || 'wav', sample_rate || 16000);
    
    console.log('Azure TTS请求参数:', {
      endpoint: endpoint,
      azureVoice: azureVoice,
      style: style || '无',
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
    let contentType = 'audio/wav';
    if (format === 'mp3') {
      contentType = 'audio/mpeg';
    } else if (format === 'ogg') {
      contentType = 'audio/ogg';
    }
    
    // 返回音频数据（base64编码）
    const base64Audio = Buffer.from(response.data).toString('base64');
    
    callback(null, {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': contentType,
        'Content-Length': response.data.length.toString(),
        'Cache-Control': 'no-cache'
      },
      body: base64Audio,
      isBase64Encoded: true
    });
    
  } catch (error) {
    console.error('TTS合成失败:', error.message);
    console.error('错误堆栈:', error.stack);
    
    callback(null, {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: '语音合成失败',
        details: error.message
      })
    });
  }
};

