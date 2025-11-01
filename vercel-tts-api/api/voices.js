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

    // 构建Azure API端点 - 语音列表API端点不包含/v1/
    const endpoint = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
    
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
      // 过滤出所有英语语言的语音（en-开头的所有变体）
      const englishVoices = response.data.filter(voice => {
        const locale = voice.Locale || voice.locale || '';
        return locale.startsWith('en-');
      });
      
      // 语言代码映射（用于显示友好名称）
      const languageNames = {
        'en-US': 'English (United States)',
        'en-GB': 'English (United Kingdom)',
        'en-CA': 'English (Canada)',
        'en-AU': 'English (Australia)',
        'en-NZ': 'English (New Zealand)',
        'en-IE': 'English (Ireland)',
        'en-IN': 'English (India)',
        'en-ZA': 'English (South Africa)'
      };
      
      // 按语言分组，收集所有英语语言
      const voicesByLanguage = {};
      const languageList = [];
      
      englishVoices.forEach(voice => {
        const locale = voice.Locale || voice.locale || '';
        const name = voice.ShortName || voice.shortName || voice.Name || voice.name || '';
        const gender = voice.Gender || voice.gender || 'Unknown';
        // 优先使用DisplayName，如果没有则使用FriendlyName，最后使用name
        const displayName = voice.DisplayName || voice.displayName || voice.FriendlyName || voice.friendlyName || name;
        
        // 提取语言代码（如 en-US, en-GB）
        const langCode = locale.split('-').slice(0, 2).join('-'); // 提取前两部分作为语言代码
        
        // 提取Personality（如果有）
        const personality = voice.Personality || voice.personality || voice.PersonalityTags || voice.personalityTags || null;
        
        // 提取Speaking styles（如果有）
        const styles = voice.StyleList || voice.styleList || voice.Style || voice.style || [];
        const styleArray = Array.isArray(styles) ? styles : (styles ? [styles] : []);
        
        // 提取Role playing styles（如果有）
        const roles = voice.RolePlayList || voice.rolePlayList || voice.Role || voice.role || [];
        const roleArray = Array.isArray(roles) ? roles : (roles ? [roles] : []);
        
        if (!voicesByLanguage[langCode]) {
          voicesByLanguage[langCode] = [];
          languageList.push({
            code: langCode,
            name: languageNames[langCode] || `English (${langCode})`
          });
        }
        
        voicesByLanguage[langCode].push({
          name: name,  // 保留ShortName用于API调用
          displayName: displayName,  // 用于前端显示
          gender: gender,
          locale: locale,
          personality: personality,
          styles: styleArray,
          roles: roleArray
        });
      });
      
      // 按语言代码排序
      languageList.sort((a, b) => a.code.localeCompare(b.code));
      
      // 每种语言内的语音按名称排序
      Object.keys(voicesByLanguage).forEach(lang => {
        voicesByLanguage[lang].sort((a, b) => a.name.localeCompare(b.name));
      });
      
      return res.status(200).json({
        success: true,
        languages: languageList,
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
        endpoint: `https://${process.env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/voices/list`
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

