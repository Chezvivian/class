// 后端代理服务器 - 使用阿里云官方SDK方式
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

// 阿里云配置 - 使用环境变量
const ACCESS_KEY_ID = process.env.ALIYUN_AK_ID;
const ACCESS_KEY_SECRET = process.env.ALIYUN_AK_SECRET;
const APP_KEY = process.env.NLS_APP_KEY;

// 检查环境变量是否设置
if (!ACCESS_KEY_ID || !ACCESS_KEY_SECRET || !APP_KEY) {
  console.error('❌ 缺少必要的环境变量！');
  console.error('请设置以下环境变量：');
  console.error('  ALIYUN_AK_ID=你的AccessKeyId');
  console.error('  ALIYUN_AK_SECRET=你的AccessKeySecret');
  console.error('  NLS_APP_KEY=你的AppKey');
  process.exit(1);
}

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

// 获取访问令牌 - 修复签名算法
async function getAccessToken() {
  try {
    console.log('正在获取访问令牌...');
    
    // 使用正确的签名算法获取token
    const crypto = require('crypto');
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
    
    // 生成签名
    const sortedKeys = Object.keys(params).sort();
    const queryString = sortedKeys
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
    
    const stringToSign = `GET&${encodeURIComponent('/')}&${encodeURIComponent(queryString)}`;
    const signature = crypto
      .createHmac('sha1', ACCESS_KEY_SECRET + '&')
      .update(stringToSign)
      .digest('base64');
    
    params.Signature = signature;
    
    console.log('Token请求参数:', params);
    
    const response = await axios.get('https://nls-meta.cn-shanghai.aliyuncs.com/', {
      params: params,
      timeout: 10000
    });
    
    console.log('Token响应:', response.data);
    return response.data.Token?.Id;
    
  } catch (error) {
    console.error('获取token失败:', error.message);
    console.error('错误详情:', error.response?.data);
    throw new Error('无法获取访问令牌: ' + error.message);
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
      voice: voice || 'Abby', // 支持音色切换
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
