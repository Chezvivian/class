// 阿里云函数计算 - Azure Speech Service获取音色列表代理
// HTTP触发器格式 - 使用Node.js标准Stream API

const axios = require('axios');

/**
 * 阿里云函数计算 HTTP触发器入口
 * request和response是Node.js标准HTTP对象
 */
exports.handler = (request, response, context) => {
  console.log('收到请求');
  console.log('Request方法:', request.method);
  console.log('Request URL:', request.url);
  
  // 设置CORS响应头 - 使用Node.js标准API
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  
  // 处理 OPTIONS 预检请求
  if (request.method === 'OPTIONS') {
    response.end('');
    return;
  }
  
  // 异步处理
  (async () => {
    try {
      // 从环境变量获取Azure配置
      const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
      const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION;
      
      if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
        response.writeHead(500, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        response.end(JSON.stringify({ 
          error: '获取音色列表失败',
          details: '缺少必要的环境变量 AZURE_SPEECH_KEY 或 AZURE_SPEECH_REGION'
        }));
        return;
      }

      // 构建Azure API端点
      const endpoint = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
      
      console.log('请求Azure Voices API:', endpoint);
      
      // 调用Azure Speech Service REST API获取音色列表
      const azureResponse = await axios.get(endpoint, {
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY
        },
        timeout: 10000
      });
      
      console.log('Azure API响应状态:', azureResponse.status);
      console.log('音色数量:', azureResponse.data.length);
      
      // 筛选所有英语locale的音色，并按语言分组
      const englishVoices = azureResponse.data.filter(voice => 
        voice.Locale && voice.Locale.startsWith('en-')
      );
      
      console.log('英语音色数量:', englishVoices.length);
      
      // 按locale分组
      const voicesByLanguage = {};
      
      // 定义语言优先级（用于排序）
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
      
      englishVoices.forEach(voice => {
        const locale = voice.Locale;
        
        if (!voicesByLanguage[locale]) {
          voicesByLanguage[locale] = {
            language: locale,
            languageName: voice.LocaleName || locale,
            voices: []
          };
        }
        
        // 提取关键信息
        const voiceInfo = {
          name: voice.ShortName || voice.Name,
          displayName: voice.DisplayName || voice.FriendlyName || voice.ShortName,
          friendlyName: voice.FriendlyName || voice.DisplayName || voice.ShortName,
          gender: voice.Gender,
          locale: voice.Locale,
          styles: voice.StyleList || [],
          roles: voice.RolePlayList || []
        };
        
        voicesByLanguage[locale].voices.push(voiceInfo);
      });
      
      // 转换为数组并排序
      const result = Object.values(voicesByLanguage).sort((a, b) => {
        const priorityA = languagePriority[a.language] || 999;
        const priorityB = languagePriority[b.language] || 999;
        return priorityA - priorityB;
      });
      
      console.log('返回的语言分组数:', result.length);
      
      // 返回JSON数据
      response.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*'
      });
      response.end(JSON.stringify(result));
      
    } catch (error) {
      console.error('获取音色列表失败:', error.message);
      console.error('错误堆栈:', error.stack);
      
      if (error.response) {
        console.error('Azure API错误:', error.response.status, error.response.statusText);
        console.error('响应数据:', error.response.data);
      }
      
      response.writeHead(500, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      response.end(JSON.stringify({ 
        error: '获取音色列表失败',
        details: error.message
      }));
    }
  })();
};
