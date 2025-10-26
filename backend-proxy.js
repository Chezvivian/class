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

// 获取访问令牌 - 使用阿里云官方SDK方式
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
    throw error;
  }
}

// TTS语音合成 - 使用WebSocket方式
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
    
    // 使用WebSocket连接进行TTS
    return new Promise((resolve, reject) => {
      const wsUrl = 'wss://nls-gateway-cn-shanghai.aliyuncs.com/ws/v1';
      const ws = new WebSocket(wsUrl);
      
      let audioData = [];
      let isCompleted = false;
      
      ws.on('open', () => {
        console.log('WebSocket连接已建立');
        
        // 发送开始合成请求
        const startRequest = {
          header: {
            namespace: 'SpeechSynthesizer',
            name: 'StartSynthesis',
            message_id: Math.random().toString(36).substring(2),
            appkey: APP_KEY,
            task_id: Math.random().toString(36).substring(2)
          },
          payload: {
            text: text,
            voice: voice || 'Abby',
            format: 'wav',
            sample_rate: 16000,
            speech_rate: speed || 0,
            pitch_rate: pitch || 0,
            volume: volume || 50
          },
          context: {
            sdk: {
              name: 'nls-sdk-nodejs',
              version: '1.0.0'
            }
          }
        };
        
        ws.send(JSON.stringify(startRequest));
        console.log('发送TTS请求:', startRequest);
      });
      
      ws.on('message', (data) => {
        try {
          const response = JSON.parse(data.toString());
          console.log('收到响应:', response);
          
          if (response.header.name === 'SynthesisCompleted') {
            console.log('TTS合成完成');
            isCompleted = true;
            
            // 合并所有音频数据
            const buffer = Buffer.concat(audioData);
            
            // 返回音频数据
            res.set({
              'Content-Type': 'audio/wav',
              'Content-Length': buffer.length
            });
            
            res.send(buffer);
            ws.close();
            resolve();
            
          } else if (response.payload && response.payload.data) {
            // 接收音频数据
            const audioChunk = Buffer.from(response.payload.data, 'base64');
            audioData.push(audioChunk);
            console.log('收到音频数据块，大小:', audioChunk.length);
          }
          
        } catch (error) {
          console.error('解析响应失败:', error);
        }
      });
      
      ws.on('error', (error) => {
        console.error('WebSocket错误:', error);
        if (!isCompleted) {
          res.status(500).json({ error: 'WebSocket连接失败', details: error.message });
          reject(error);
        }
      });
      
      ws.on('close', () => {
        console.log('WebSocket连接已关闭');
        if (!isCompleted) {
          res.status(500).json({ error: 'WebSocket连接意外关闭' });
          reject(new Error('WebSocket连接意外关闭'));
        }
      });
      
      // 设置超时
      setTimeout(() => {
        if (!isCompleted) {
          ws.close();
          res.status(500).json({ error: 'TTS请求超时' });
          reject(new Error('TTS请求超时'));
        }
      }, 30000);
    });
    
  } catch (error) {
    console.error('TTS合成失败:', error.message);
    res.status(500).json({ 
      error: '语音合成失败', 
      details: error.message
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
