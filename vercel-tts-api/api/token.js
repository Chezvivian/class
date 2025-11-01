// Vercel API 路由 - Token API（已弃用，Azure不需要token）
// 此API保留用于向后兼容，但已不再使用

module.exports = async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Azure Speech Service不需要token，直接返回成功信息
  return res.status(200).json({
    success: true,
    message: 'Azure Speech Service不需要token，可以直接调用TTS API',
    note: '此API已弃用，保留用于向后兼容'
  });
}
