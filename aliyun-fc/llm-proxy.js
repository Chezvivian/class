// 阿里云函数计算 - LLM 代理(商务英语情境化模拟平台)
// 入口: index.handler(将本文件作为 index.js 上传),Node.js 18,HTTP 触发器
// 环境变量:
//   LLM_API_KEY   必填  LLM 服务的 API Key。Grok 用 xAI 控制台的密钥，不要写进网页
//   LLM_BASE_URL  选填  默认 https://api.x.ai/v1
//   LLM_MODEL     选填  默认 grok-4.6。调用的是 /v1/responses，不是 /chat/completions
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

exports.handler = async (event, context) => {
  if (context) context.callbackWaitsForEmptyEventLoop = false;
  const { method, body } = parseEvent(event);
  if (method === 'OPTIONS') return { statusCode: 204, headers: CORS(), body: '' };
  if (method !== 'POST') return reply(405, { error: 'Method not allowed' });
  if (body && body.ping) return reply(200, { content: 'pong' });

  const key = process.env.LLM_API_KEY;
  if (!key) return reply(500, { error: 'LLM_API_KEY not configured' });

  const { system, user } = body;
  if (typeof system !== 'string' || typeof user !== 'string') return reply(400, { error: 'system and user are required' });
  if (system.length + user.length > 16000) return reply(400, { error: 'prompt too long' });

  const base = (process.env.LLM_BASE_URL || 'https://api.x.ai/v1').replace(/\/$/, '');
  const model = process.env.LLM_MODEL || 'grok-4.6';

  function extractText(data) {
    if (!data) return '';
    if (typeof data.output_text === 'string') return data.output_text;
    const parts = [];
    (data.output || []).forEach(function (item) {
      (item.content || []).forEach(function (part) {
        if (part && typeof part.text === 'string') parts.push(part.text);
      });
    });
    if (parts.length) return parts.join('');
    const msg = data.choices && data.choices[0] && data.choices[0].message;
    return (msg && msg.content) || '';
  }

  async function complete() {
    const payload = {
      model: model,
      temperature: 0.7,
      input: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ]
    };
    const r = await fetch(base + '/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify(payload)
    });
    const data = await r.json().catch(function () { return {}; });
    return { ok: r.ok, status: r.status, data: data };
  }

  try {
    const result = await complete();
    if (!result.ok) {
      const msg = (result.data.error && (result.data.error.message || result.data.error)) || 'LLM error';
      return reply(502, { error: typeof msg === 'string' ? msg : JSON.stringify(msg) });
    }
    return reply(200, { content: extractText(result.data) });
  } catch (e) {
    const cause = e && e.cause;
    const detail = cause ? (cause.code || cause.name || '') + ' ' + (cause.message || '') : '';
    return reply(500, { error: String(e.message || e) + (detail ? ' (' + detail.trim() + ')' : '') });
  }
};
