// Vercel API 路由 - 获取Azure Speech Service语音列表
const axios = require('axios');

module.exports = async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 获取Azure环境变量
    const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
    const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION;
    
    if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
      return res.status(500).json({
        error: '缺少必要的环境变量 AZURE_SPEECH_KEY 或 AZURE_SPEECH_REGION'
      });
    }

    // 构建Azure API端点
    const endpoint = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1/voices/list`;
    
    // 调用Azure Speech Service REST API获取语音列表
    console.log('调用Azure语音列表API:', endpoint);
    const response = await axios.get(endpoint, {
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY
      },
      timeout: 10000
    });
    
    console.log('Azure API响应状态:', response.status);
    console.log('响应数据类型:', typeof response.data);
    console.log('响应是否为数组:', Array.isArray(response.data));
    if (response.data && response.data.length > 0) {
      console.log('第一个语音示例:', JSON.stringify(response.data[0], null, 2));
    }
    
    if (response.status === 200 && Array.isArray(response.data)) {
      // 过滤出英语（美国）和英语（英国）的语音
      const englishVoices = response.data.filter(voice => {
        const locale = voice.Locale || voice.locale || '';
        return locale.startsWith('en-US') || locale.startsWith('en-GB');
      });
      
      // 按语言和性别分组
      const voicesByLanguage = {
        'en-US': [],
        'en-GB': []
      };
      
      englishVoices.forEach(voice => {
        const locale = voice.Locale || voice.locale || '';
        const name = voice.ShortName || voice.shortName || voice.Name || voice.name || '';
        const gender = voice.Gender || voice.gender || 'Unknown';
        const friendlyName = voice.FriendlyName || voice.friendlyName || name;
        
        if (locale.startsWith('en-US')) {
          voicesByLanguage['en-US'].push({
            name: name,
            friendlyName: friendlyName,
            gender: gender,
            locale: locale
          });
        } else if (locale.startsWith('en-GB')) {
          voicesByLanguage['en-GB'].push({
            name: name,
            friendlyName: friendlyName,
            gender: gender,
            locale: locale
          });
        }
      });
      
      // 按名称排序
      voicesByLanguage['en-US'].sort((a, b) => a.name.localeCompare(b.name));
      voicesByLanguage['en-GB'].sort((a, b) => a.name.localeCompare(b.name));
      
      return res.status(200).json({
        success: true,
        voices: voicesByLanguage,
        total: englishVoices.length
      });
    } else {
      return res.status(500).json({
        error: '无法解析语音列表响应',
        response: response.data
      });
    }
    
  } catch (error) {
    console.error('获取语音列表失败:', error.message);
    console.error('错误详情:', error.response?.data);
    console.error('错误状态:', error.response?.status);
    
    // 返回详细的错误信息，方便调试
    if (error.response) {
      return res.status(error.response.status || 500).json({
        success: false,
        error: '获取语音列表失败',
        details: error.message,
        status: error.response.status,
        response: error.response.data,
        endpoint: `https://${process.env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1/voices/list`
      });
    } else {
      return res.status(500).json({
        success: false,
        error: '获取语音列表失败',
        details: error.message,
        message: '可能是网络错误或Azure API端点不可访问'
      });
    }
  }
}

