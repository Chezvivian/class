// 阿里云函数计算 - LLM 代理(商务英语情境化模拟平台)
// 入口: index.handler(将本文件作为 index.js 上传),Node.js 18,HTTP 触发器
// 环境变量:
//   LLM_API_KEY   必填  LLM 服务的 API Key
//   LLM_BASE_URL  选填  默认 https://api.deepseek.com  (通义: https://dashscope.aliyuncs.com/compatible-mode/v1)
//   LLM_MODEL     选填  默认 deepseek-chat             (通义: qwen-plus)
//   ALLOW_ORIGIN  选填  默认 *,建议改为你的站点域名

const CORS = () => ({
  'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8'
});

function reply(statusCode, obj) {
  return { statusCode, headers: CORS(), body: JSON.stringify(obj) };
}

function parseEvent(event) {
  // HTTP 触发器: event 可能是 Buffer / JSON 字符串 / 对象
  let ev = event;
  if (Buffer.isBuffer(ev)) ev = ev.toString('utf8');
  if (typeof ev === 'string') { try { ev = JSON.parse(ev); } catch (e) { ev = {}; } }
  const method = (ev.requestContext && ev.requestContext.http && ev.requestContext.http.method)
    || ev.httpMethod || ev.method || 'POST';
  let body = ev.body;
  if (ev.isBase64Encoded && typeof body === 'string') body = Buffer.from(body, 'base64').toString('utf8');
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  return { method: String(method).toUpperCase(), body: body || {} };
}

exports.handler = async (event) => {
  const { method, body } = parseEvent(event);
  if (method === 'OPTIONS') return { statusCode: 204, headers: CORS(), body: '' };
  if (method !== 'POST') return reply(405, { error: 'Method not allowed' });

  const key = process.env.LLM_API_KEY;
  if (!key) return reply(500, { error: 'LLM_API_KEY not configured' });

  const { system, user } = body;
  if (typeof system !== 'string' || typeof user !== 'string') return reply(400, { error: 'system and user are required' });
  if (system.length + user.length > 8000) return reply(400, { error: 'prompt too long' });

  const base = (process.env.LLM_BASE_URL || 'https://api.deepseek.com').replace(/\/$/, '');
  try {
    const r = await fetch(base + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify({
        model: process.env.LLM_MODEL || 'deepseek-chat',
        temperature: 0.7,
        max_tokens: 1200,
        response_format: { type: 'json_object' },
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }]
      })
    });
    const data = await r.json();
    if (!r.ok) return reply(502, { error: (data.error && data.error.message) || 'LLM error' });
    const content = data.choices && data.choices[0] && data.choices[0].message.content;
    return reply(200, { content: content || '' });
  } catch (e) {
    return reply(500, { error: String(e.message || e) });
  }
};
