// 后端代理服务器 - Node.js Express
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');

const app = express();
const PORT = 3001;

// 阿里云配置
const ACCESS_KEY_ID = 'LTAI5tPzwZ1dB68mbeh9Ycb4';
const ACCESS_KEY_SECRET = 'ACATWeSGbh9LYUXedt072kchM6GSh5XdESS';
const APP_KEY = 'CshIybgPtK7eGmNX';

// 中间件
app.use(cors());
app.use(express.json());

// 生成阿里云签名
function generateSignature(params, accessKeySecret) {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  
  const stringToSign = `GET&${encodeURIComponent('/')}&${encodeURIComponent(sortedParams)}`;
  const signature = crypto
    .createHmac('sha1', accessKeySecret + '&')
    .update(stringToSign)
    .digest('base64');
  
  return signature;
}

// 获取访问令牌
app.post('/api/token', async (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    const nonce = Math.random().toString(36).substring(2);
    
    const params = {
      AccessKeyId: ACCESS_KEY_ID,
      Action: 'CreateToken',
      Format: 'JSON',
      RegionId: 'cn-shanghai',
      SignatureMethod: 'HMAC-SHA1',
      SignatureNonce: nonce,
      SignatureVersion: '1.0',
      Timestamp: timestamp,
      Version: '2019-02-28'
    };
    
    const signature = generateSignature(params, ACCESS_KEY_SECRET);
    params.Signature = signature;
    
    const response = await axios.get('https://nls-meta.cn-shanghai.aliyuncs.com/', {
      params: params
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('获取token失败:', error);
    res.status(500).json({ error: '获取token失败' });
  }
});

// TTS语音合成代理
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice, speed, pitch, volume } = req.body;
    
    // 获取token
    const tokenResponse = await axios.post('http://localhost:3001/api/token');
    const token = tokenResponse.data.Token.Id;
    
    // 构建TTS请求
    const ttsParams = {
      appkey: APP_KEY,
      token: token,
      text: text,
      voice: voice || 'Abby',
      format: 'wav',
      sample_rate: 16000,
      speech_rate: speed || 0,
      pitch_rate: pitch || 0,
      volume: volume || 50
    };
    
    // 调用阿里云TTS API
    const ttsResponse = await axios.post(
      'https://nls-gateway.cn-shanghai.aliyuncs.com/stream/v1/tts',
      ttsParams,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );
    
    // 返回音频数据
    res.set({
      'Content-Type': 'audio/wav',
      'Content-Length': ttsResponse.data.length
    });
    
    res.send(ttsResponse.data);
    
  } catch (error) {
    console.error('TTS合成失败:', error);
    res.status(500).json({ error: '语音合成失败' });
  }
});

app.listen(PORT, () => {
  console.log(`代理服务器运行在 http://localhost:${PORT}`);
});
