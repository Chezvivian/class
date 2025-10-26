// 后端代理服务器 - 使用阿里云官方推荐方式
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const axios = require('axios');

const app = express();
const PORT = 3001;

// 阿里云配置 - 使用环境变量
const ACCESS_KEY_ID = process.env.ALIYUN_AK_ID || 'LTAI5tPzwZ1dB68mbeh9Ycb4';
const ACCESS_KEY_SECRET = process.env.ALIYUN_AK_SECRET || 'ACATWeSGbh9LYUXedt072kchM6GSh5XdESS';
const APP_KEY = process.env.NLS_APP_KEY || 'CshIybgPtK7eGmNX';

console.log('阿里云配置:');
console.log('ACCESS_KEY_ID:', ACCESS_KEY_ID);
console.log('APP_KEY:', APP_KEY);
console.log('ACCESS_KEY_SECRET:', ACCESS_KEY_SECRET ? '***已设置***' : '未设置');

// 中间件
app.use(cors());
app.use(express.json());

// 添加请求日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 获取访问令牌 - 简化版本，先跳过签名验证
async function getAccessToken() {
  try {
    console.log('正在获取访问令牌...');
    
    // 暂时使用一个模拟的token，避免签名问题
    // 实际使用时需要正确的签名算法
    const mockToken = 'mock_token_' + Math.random().toString(36).substring(2);
    console.log('使用模拟token:', mockToken);
    return mockToken;
    
  } catch (error) {
    console.error('获取token失败:', error.message);
    throw error;
  }
}

// TTS语音合成 - 使用REST API方式（更简单可靠）
app.post('/api/tts', async (req, res) => {
  try {
    console.log('收到TTS请求:', req.body);
    
    const { text, voice, speed, pitch, volume } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: '缺少文本参数' });
    }
    
    // 使用阿里云REST API进行TTS
    const ttsParams = {
      appkey: APP_KEY,
      text: text,
      voice: voice || 'Abby',
      format: 'wav',
      sample_rate: 16000,
      speech_rate: speed || 0,
      pitch_rate: pitch || 0,
      volume: volume || 50
    };
    
    console.log('TTS请求参数:', ttsParams);
    
    // 调用阿里云TTS REST API
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
    
    // 返回音频数据
    res.set({
      'Content-Type': 'audio/wav',
      'Content-Length': response.data.length
    });
    
    res.send(response.data);
    
  } catch (error) {
    console.error('TTS合成失败:', error.message);
    console.error('错误详情:', error.response?.data);
    res.status(500).json({ 
      error: '语音合成失败', 
      details: error.message,
      response: error.response?.data 
    });
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    config: {
      accessKeyId: ACCESS_KEY_ID,
      appKey: APP_KEY
    }
  });
});

app.listen(PORT, () => {
  console.log(`代理服务器运行在 http://localhost:${PORT}`);
  console.log('健康检查: http://localhost:3001/api/health');
});
