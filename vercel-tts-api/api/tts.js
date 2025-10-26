// Vercel API 路由 - 阿里云TTS语音合成
const axios = require('axios');

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
    
    const { text, voice, speed, pitch, volume } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: '缺少文本参数' });
    }
    
    if (text.length > 5000) {
      return res.status(400).json({ error: '文本长度不能超过5000字符' });
    }

    const ACCESS_KEY_ID = process.env.ALIYUN_AK_ID;
    const ACCESS_KEY_SECRET = process.env.ALIYUN_AK_SECRET;
    const APP_KEY = process.env.NLS_APP_KEY;
    
    if (!ACCESS_KEY_ID || !ACCESS_KEY_SECRET || !APP_KEY) {
      throw new Error('缺少必要的环境变量');
    }

    // 获取访问令牌
    const tokenResponse = await axios.post(`${req.headers.origin || 'https://your-domain.vercel.app'}/api/token`, {}, {
      timeout: 10000
    });
    
    if (!tokenResponse.data.success) {
      throw new Error('无法获取访问令牌: ' + tokenResponse.data.error);
    }
    
    const token = tokenResponse.data.token;
    console.log('获取到token:', token.substring(0, 10) + '...');
    
    // 构建TTS请求参数
    const ttsParams = {
      appkey: APP_KEY,
      token: token,
      text: text,
      voice: voice || 'Abby',
      format: 'wav',
      sample_rate: 16000,
      speech_rate: parseInt(speed) || 0,
      pitch_rate: parseInt(pitch) || 0,
      volume: parseInt(volume) || 50
    };
    
    console.log('TTS请求参数:', { ...ttsParams, token: '***' });
    
    // 调用阿里云TTS API
    const response = await axios.post(
      'https://nls-gateway.cn-shanghai.aliyuncs.com/stream/v1/tts',
      ttsParams,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer',
        timeout: 30000
      }
    );
    
    console.log('TTS响应状态:', response.status);
    console.log('音频数据大小:', response.data.length);
    
    // 设置响应头
    res.setHeader('Content-Type', 'audio/wav');
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
          ? error.response.data.toString() 
          : error.response.data;
        console.error('错误响应:', errorText);
        
        // 尝试解析为JSON
        const errorJson = JSON.parse(errorText);
        console.error('解析后的错误:', errorJson);
        
        return res.status(500).json({ 
          error: '语音合成失败', 
          details: error.message,
          response: errorJson
        });
      } catch (parseError) {
        console.error('无法解析错误响应:', parseError);
        return res.status(500).json({ 
          error: '语音合成失败', 
          details: error.message,
          rawResponse: error.response.data
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
