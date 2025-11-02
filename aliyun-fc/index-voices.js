// 阿里云函数计算 - Azure Speech Service 获取音色列表代理
// 返回前端期望的格式

const axios = require('axios');

exports.handler = async (request, response, context) => {
  console.log('收到请求');
  
  try {
    const method = (request.method || request.httpMethod || 'GET').toUpperCase();
    console.log('解析后的方法:', method);
    
    // 处理 OPTIONS 预检
    if (method === 'OPTIONS') {
      response.statusCode = 204;
      response.headers = {};
      response.body = '';
      return response;
    }
    
    // 只允许 GET 请求
    if (method !== 'GET') {
      response.statusCode = 405;
      response.headers = { 'Content-Type': 'application/json' };
      response.body = JSON.stringify({
        success: false,
        error: 'Method not allowed'
      });
      return response;
    }
    
    // 获取 Azure 配置
    const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
    const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION;
    
    if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
      console.error('环境变量未配置');
      response.statusCode = 500;
      response.headers = { 'Content-Type': 'application/json' };
      response.body = JSON.stringify({
        success: false,
        error: '服务配置错误'
      });
      return response;
    }
    
    console.log('Azure 配置:', {
      region: AZURE_SPEECH_REGION,
      keyLength: AZURE_SPEECH_KEY.length
    });
    
    // 构建 Azure API 端点
    const endpoint = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
    console.log('请求 Azure API:', endpoint);
    
    // 调用 Azure Speech Service REST API
    let azureResponse;
    try {
      azureResponse = await axios.get(endpoint, {
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY
        },
        timeout: 20000
      });
    } catch (axiosError) {
      console.error('Azure API 调用失败:', axiosError.message);
      response.statusCode = 500;
      response.headers = { 'Content-Type': 'application/json' };
      response.body = JSON.stringify({
        success: false,
        error: 'Azure API 调用失败',
        details: axiosError.message
      });
      return response;
    }
    
    console.log('Azure API 响应状态:', azureResponse.status);
    console.log('总音色数量:', azureResponse.data.length);
    
    // 筛选所有英语 locale 的音色
    const englishVoices = azureResponse.data.filter(voice => 
      voice.Locale && voice.Locale.startsWith('en-')
    );
    
    console.log('英语音色数量:', englishVoices.length);
    
    // 定义语言优先级和名称映射
    const languageInfo = {
      'en-US': { code: 'en-US', name: 'English (United States)', priority: 1 },
      'en-GB': { code: 'en-GB', name: 'English (United Kingdom)', priority: 2 },
      'en-CA': { code: 'en-CA', name: 'English (Canada)', priority: 3 },
      'en-AU': { code: 'en-AU', name: 'English (Australia)', priority: 4 },
      'en-IE': { code: 'en-IE', name: 'English (Ireland)', priority: 5 },
      'en-IN': { code: 'en-IN', name: 'English (India)', priority: 6 },
      'en-NZ': { code: 'en-NZ', name: 'English (New Zealand)', priority: 7 },
      'en-ZA': { code: 'en-ZA', name: 'English (South Africa)', priority: 8 },
      'en-HK': { code: 'en-HK', name: 'English (Hong Kong SAR)', priority: 9 },
      'en-KE': { code: 'en-KE', name: 'English (Kenya)', priority: 10 },
      'en-NG': { code: 'en-NG', name: 'English (Nigeria)', priority: 11 },
      'en-PH': { code: 'en-PH', name: 'English (Philippines)', priority: 12 },
      'en-SG': { code: 'en-SG', name: 'English (Singapore)', priority: 13 },
      'en-TZ': { code: 'en-TZ', name: 'English (Tanzania)', priority: 14 }
    };
    
    // 按语言代码分组音色
    const voicesByLanguage = {};
    const languagesSet = new Set();
    
    englishVoices.forEach(voice => {
      const locale = voice.Locale;
      languagesSet.add(locale);
      
      if (!voicesByLanguage[locale]) {
        voicesByLanguage[locale] = [];
      }
      
      const voiceInfo = {
        name: voice.ShortName || voice.Name,
        displayName: voice.DisplayName || voice.FriendlyName || voice.ShortName,
        friendlyName: voice.FriendlyName || voice.DisplayName || voice.ShortName,
        gender: voice.Gender,
        locale: voice.Locale,
        styles: voice.StyleList || [],
        roles: voice.RolePlayList || []
      };
      
      voicesByLanguage[locale].push(voiceInfo);
    });
    
    // 构建语言列表（按优先级排序）
    const languages = Array.from(languagesSet)
      .map(locale => {
        const info = languageInfo[locale];
        return info ? info : { 
          code: locale, 
          name: locale,
          priority: 999 
        };
      })
      .sort((a, b) => a.priority - b.priority)
      .map(({ code, name }) => ({ code, name }));
    
    console.log('返回的语言数量:', languages.length);
    
    // 🔑 关键：返回前端期望的格式
    const result = {
      success: true,
      voices: voicesByLanguage,  // 对象格式，键是语言代码
      languages: languages,        // 数组格式，包含 code 和 name
      total: englishVoices.length  // 总音色数量
    };
    
    console.log('数据格式:', {
      success: result.success,
      languagesCount: result.languages.length,
      voicesKeysCount: Object.keys(result.voices).length,
      total: result.total
    });
    
    // 返回 JSON 数据
    response.statusCode = 200;
    response.headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    };
    response.body = JSON.stringify(result);
    
    return response;
    
  } catch (error) {
    console.error('函数执行错误:', error.message);
    console.error('错误堆栈:', error.stack);
    
    response.statusCode = 500;
    response.headers = { 'Content-Type': 'application/json' };
    response.body = JSON.stringify({
      success: false,
      error: '服务器内部错误',
      details: error.message
    });
    
    return response;
  }
};