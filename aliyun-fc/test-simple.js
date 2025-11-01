// 用于测试函数是否正常工作的最简单版本
// 如果这个版本能工作，说明函数配置没问题，问题在业务逻辑

exports.handler = async (event, context, callback) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Context:', JSON.stringify(context, null, 2));
  
  // 测试环境变量
  const envCheck = {
    AZURE_SPEECH_KEY: process.env.AZURE_SPEECH_KEY ? '✓ 已配置' : '✗ 未配置',
    AZURE_SPEECH_REGION: process.env.AZURE_SPEECH_REGION ? '✓ 已配置' : '✗ 未配置'
  };
  
  console.log('环境变量检查:', envCheck);
  
  // 简单的响应
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: 'Function is working',
      environment: envCheck,
      eventMethod: event.httpMethod || event.method || 'unknown',
      eventPath: event.path || 'unknown'
    }, null, 2)
  });
};

