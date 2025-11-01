// 阿里云函数计算 - Azure Speech Service文本转语音合成代理
// 入口文件：index.js

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

/**
 * 获取Azure语音名称
 */
function getAzureVoiceName(voice) {
  if (voice && (voice.startsWith('en-') || voice.startsWith('zh-CN-'))) {
    return voice;
  }
  return legacyVoiceMapping[voice] || 'en-US-JennyNeural';
}

/**
 * 转义XML特殊字符
 */
function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * 构建SSML格式的请求体
 */
function buildSSML(text, voice, style, rate, pitch, volume) {
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
  
  // 检查是否需要使用标签
  const hasStyle = style && style.trim() !== '';
  const hasRate = rate && rate.trim() !== '' && rate !== 'medium';
  const hasPitch = pitch && pitch.trim() !== '' && pitch !== 'medium';
  const hasVolume = volume && volume.trim() !== '' && volume !== 'medium';
  const hasProsody = hasRate || hasPitch || hasVolume;
  
  // 构建prosody属性字符串
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
  
  // 根据是否有Style和Prosody组合标签
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
  
  // 关闭voice和speak标签
  ssml += `
  </voice>
</speak>`;
  
  return ssml;
}

/**
 * 根据采样率和格式获取Azure的输出格式
 */
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
 * 支持两种格式：
 * 1. 标准HTTP触发器格式（使用request/response对象）
 * 2. 事件函数格式（使用event/context对象）
 */
exports.handler = async (event, context, callback) => {
  // 判断是HTTP触发器还是事件函数格式
  const isHttpTrigger = event && (event.request || event.method || event.path);
  const isEventFunction = event && !event.request && !event.method && event.body;
  
  // HTTP触发器格式
  if (isHttpTrigger) {
    const req = event.request || event;
    const res = event.response || {
      setHeader: () => {},
      setStatusCode: (code) => { this.statusCode = code; },
      send: (data) => { this.body = data; },
      setHeader: (key, value) => { this.headers = this.headers || {}; this.headers[key] = value; }
    };
    
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理 OPTIONS 预检请求
    if (req.method === 'OPTIONS' || event.method === 'OPTIONS') {
      res.setStatusCode(200);
      res.send('');
      return;
    }

    if (req.method !== 'POST' && event.method !== 'POST') {
      res.setStatusCode(405);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }
  }
  
  // 事件函数格式（兼容）
  if (isEventFunction || !isHttpTrigger) {
    // 返回标准HTTP响应格式
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    
    // 处理 OPTIONS 预检请求
    if (event.httpMethod === 'OPTIONS' || event.method === 'OPTIONS') {
      callback(null, {
        statusCode: 200,
        headers: headers,
        body: ''
      });
      return;
    }
    
    if (event.httpMethod !== 'POST' && event.method !== 'POST') {
      callback(null, {
        statusCode: 405,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Method not allowed' })
      });
      return;
    }
  }

  try {
    // 获取请求体（适配不同格式）
    let body;
    if (isHttpTrigger) {
      const req = event.request || event;
      if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
      } else {
        body = req.body || {};
      }
    } else {
      // 事件函数格式
      if (typeof event.body === 'string') {
        body = JSON.parse(event.body);
      } else {
        body = event.body || {};
      }
    }
    
    const { text, voice, style, rate, pitch, volume, sample_rate, format } = body;
    
    if (!text) {
      res.setStatusCode(400);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ error: '缺少文本参数' }));
      return;
    }

    if (text.length > 5000) {
      res.setStatusCode(400);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ error: '文本长度不能超过5000字符' }));
      return;
    }

    // 从环境变量获取Azure配置（阿里云函数计算的环境变量）
    const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY || (context && context.env && context.env.AZURE_SPEECH_KEY);
    const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION || (context && context.env && context.env.AZURE_SPEECH_REGION);
    
    if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
      if (isHttpTrigger) {
        const res = event.response || {
          setStatusCode: (code) => { this.statusCode = code; },
          setHeader: (key, value) => { this.headers = this.headers || {}; this.headers[key] = value; },
          send: (data) => { this.body = data; }
        };
        res.setStatusCode(500);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 
          error: '语音合成失败',
          details: '缺少必要的环境变量 AZURE_SPEECH_KEY 或 AZURE_SPEECH_REGION'
        }));
        return;
      } else {
        callback(null, {
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            error: '语音合成失败',
            details: '缺少必要的环境变量 AZURE_SPEECH_KEY 或 AZURE_SPEECH_REGION'
          })
        });
        return;
      }
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
      inputVoice: voice || 'en-US-JennyNeural',
      azureVoice: azureVoice,
      style: style || '无',
      rate: rate || 'medium',
      pitch: pitch || 'medium',
      volume: volume || 'medium',
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
    
    // 返回响应（适配不同格式）
    if (isHttpTrigger) {
      const res = event.response || {
        setStatusCode: (code) => { this.statusCode = code; },
        setHeader: (key, value) => { this.headers = this.headers || {}; this.headers[key] = value; },
        send: (data) => { this.body = data; }
      };
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Length', response.data.length);
      res.setHeader('Cache-Control', 'no-cache');
      res.setStatusCode(200);
      
      // 如果是Buffer，直接发送；否则转换为base64
      if (Buffer.isBuffer(response.data)) {
        res.send(response.data);
      } else {
        res.send(Buffer.from(response.data));
      }
    } else {
      // 事件函数格式，返回base64编码的音频
      const base64Audio = Buffer.from(response.data).toString('base64');
      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Length': response.data.length.toString(),
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        },
        body: base64Audio,
        isBase64Encoded: true
      });
    }
    
  } catch (error) {
    console.error('TTS合成失败:', error.message);
    console.error('错误堆栈:', error.stack);
    
    if (isHttpTrigger) {
      const res = event.response || {
        setStatusCode: (code) => { this.statusCode = code; },
        setHeader: (key, value) => { this.headers = this.headers || {}; this.headers[key] = value; },
        send: (data) => { this.body = data; }
      };
      res.setStatusCode(500);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ 
        error: '语音合成失败',
        details: error.message
      }));
    } else {
      callback(null, {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: '语音合成失败',
          details: error.message
        })
      });
    }
  }
};

