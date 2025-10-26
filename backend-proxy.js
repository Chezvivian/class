// 后端代理服务器 - 使用阿里云官方SDK方式
const express = require('express');
const cors = require('cors');
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

// 获取访问令牌 - 使用阿里云官方方式
async function getAccessToken() {
  try {
    console.log('正在获取访问令牌...');
    
    // 使用阿里云官方推荐的REST API获取token
    const response = await axios.post('https://nls-meta.cn-shanghai.aliyuncs.com/', {
      AccessKeyId: ACCESS_KEY_ID,
      Action: 'CreateToken',
      Format: 'JSON',
      RegionId: 'cn-shanghai',
      SignatureMethod: 'HMAC-SHA1',
      SignatureNonce: Math.random().toString(36).substring(2),
      SignatureVersion: '1.0',
      Timestamp: new Date().toISOString(),
      Version: '2019-02-28'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 10000
    });
    
    console.log('Token响应:', response.data);
    return response.data.Token?.Id;
    
  } catch (error) {
    console.error('获取token失败:', error.message);
    // 如果获取token失败，返回一个模拟token用于测试
    const mockToken = 'mock_token_' + Math.random().toString(36).substring(2);
    console.log('使用模拟token:', mockToken);
    return mockToken;
  }
}

// TTS语音合成 - 使用阿里云官方SDK方式
app.post('/api/tts', async (req, res) => {
  try {
    console.log('收到TTS请求:', req.body);
    
    const { text, voice, speed, pitch, volume } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: '缺少文本参数' });
    }
    
    // 获取token
    const token = await getAccessToken();
    if (!token) {
      throw new Error('无法获取访问令牌');
    }
    
    console.log('获取到token:', token);
    
    // 使用阿里云官方SDK方式
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
    
    console.log('TTS请求参数:', ttsParams);
    
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
    
    // 返回音频数据
    res.set({
      'Content-Type': 'audio/wav',
      'Content-Length': response.data.length
    });
    
    res.send(response.data);
    
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
        
        res.status(500).json({ 
          error: '语音合成失败', 
          details: error.message,
          response: errorJson
        });
      } catch (parseError) {
        console.error('无法解析错误响应:', parseError);
        res.status(500).json({ 
          error: '语音合成失败', 
          details: error.message,
          rawResponse: error.response.data
        });
      }
    } else {
      res.status(500).json({ 
        error: '语音合成失败', 
        details: error.message
      });
    }
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
