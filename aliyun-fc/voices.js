// 阿里云函数计算 - 获取Azure Speech Service语音列表
// 入口文件：index.js

const axios = require('axios');

/**
 * 阿里云函数计算 HTTP触发器 处理函数
 */
exports.handler = async (req, res, context) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.setStatusCode(200);
    res.send('');
    return;
  }

  try {
    // 从环境变量获取Azure配置
    const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY || context.env.AZURE_SPEECH_KEY;
    const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION || context.env.AZURE_SPEECH_REGION;
    
    if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
      res.setStatusCode(500);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        error: '缺少必要的环境变量 AZURE_SPEECH_KEY 或 AZURE_SPEECH_REGION'
      }));
      return;
    }

    // 构建Azure API端点
    const endpoint = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
    
    // 调用Azure Speech Service REST API获取语音列表
    console.log('调用Azure语音列表API:', endpoint);
    const response = await axios.get(endpoint, {
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY
      },
      timeout: 10000
    });
    
    if (response.status === 200 && Array.isArray(response.data)) {
      // 语言代码映射
      const languageNames = {
        'en-US': 'English (United States)',
        'en-GB': 'English (United Kingdom)',
        'en-CA': 'English (Canada)',
        'en-AU': 'English (Australia)',
        'en-IE': 'English (Ireland)',
        'en-IN': 'English (India)',
        'en-NZ': 'English (New Zealand)',
        'en-ZA': 'English (South Africa)'
      };
      
      // 语言优先级顺序
      const languagePriority = {
        'en-US': 1,
        'en-GB': 2,
        'en-CA': 3,
        'en-AU': 4,
        'en-IE': 5,
        'en-IN': 6,
        'en-NZ': 7,
        'en-ZA': 8
      };
      
      // 过滤出所有英语语言的语音（en-开头的所有变体）
      const englishVoices = response.data.filter(voice => {
        const locale = voice.Locale || voice.locale || '';
        return locale.startsWith('en-');
      });
      
      // 按语言分组
      const voicesByLanguage = {};
      const languageList = [];
      
      englishVoices.forEach(voice => {
        const locale = voice.Locale || voice.locale || '';
        const name = voice.ShortName || voice.shortName || voice.Name || voice.name || '';
        const gender = voice.Gender || voice.gender || 'Unknown';
        const displayName = voice.DisplayName || voice.displayName || voice.FriendlyName || voice.friendlyName || name;
        
        // 提取语言代码（如 en-US, en-GB）
        const langCode = locale.split('-').slice(0, 2).join('-');
        
        // 提取Speaking styles
        const styles = voice.StyleList || voice.styleList || voice.Style || voice.style || [];
        const styleArray = Array.isArray(styles) ? styles : (styles ? [styles] : []);
        
        // 提取Role playing styles
        const roles = voice.RolePlayList || voice.rolePlayList || voice.Role || voice.role || [];
        const roleArray = Array.isArray(roles) ? roles : (roles ? [roles] : []);
        
        if (!voicesByLanguage[langCode]) {
          voicesByLanguage[langCode] = [];
          const displayName = languageNames[langCode];
          if (displayName) {
            languageList.push({
              code: langCode,
              name: displayName
            });
          } else {
            languageList.push({
              code: langCode,
              name: `English (${langCode.split('-')[1] || langCode})`
            });
          }
        }
        
        voicesByLanguage[langCode].push({
          name: name,
          displayName: displayName,
          gender: gender,
          locale: locale,
          styles: styleArray,
          roles: roleArray
        });
      });
      
      // 按优先级排序
      languageList.sort((a, b) => {
        const priorityA = languagePriority[a.code] || 999;
        const priorityB = languagePriority[b.code] || 999;
        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }
        return a.code.localeCompare(b.code);
      });
      
      // 每种语言内的语音按名称排序
      Object.keys(voicesByLanguage).forEach(lang => {
        voicesByLanguage[lang].sort((a, b) => a.name.localeCompare(b.name));
      });
      
      res.setStatusCode(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        success: true,
        languages: languageList,
        voices: voicesByLanguage,
        total: englishVoices.length
      }));
    } else {
      res.setStatusCode(500);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        error: '无法解析语音列表响应'
      }));
    }
  } catch (error) {
    console.error('获取语音列表失败:', error.message);
    console.error('错误堆栈:', error.stack);
    
    res.setStatusCode(500);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      error: '获取语音列表失败',
      details: error.message
    }));
  }
};

