// Vercel API 路由 - 获取阿里云访问令牌
const crypto = require('crypto');
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
    console.log('正在获取阿里云访问令牌...');
    
    const ACCESS_KEY_ID = process.env.ALIYUN_AK_ID;
    const ACCESS_KEY_SECRET = process.env.ALIYUN_AK_SECRET;
    
    if (!ACCESS_KEY_ID || !ACCESS_KEY_SECRET) {
      throw new Error('缺少必要的环境变量 ALIYUN_AK_ID 或 ALIYUN_AK_SECRET');
    }

    // 生成请求参数
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
    
    console.log('Token请求参数:', { ...params, AccessKeyId: '***' });
    
    // 调用阿里云API获取token
    const response = await axios.get('https://nls-meta.cn-shanghai.aliyuncs.com/', {
      params: params,
      timeout: 10000
    });
    
    console.log('Token响应:', response.data);
    
    if (response.data.Token && response.data.Token.Id) {
      return res.status(200).json({
        success: true,
        token: response.data.Token.Id,
        expireTime: response.data.Token.ExpireTime
      });
    } else {
      throw new Error('无法从响应中获取token');
    }
    
  } catch (error) {
    console.error('获取token失败:', error.message);
    console.error('错误详情:', error.response?.data);
    
    return res.status(500).json({
      success: false,
      error: '获取访问令牌失败',
      details: error.message,
      response: error.response?.data
    });
  }
}
