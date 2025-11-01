# 阿里云HTTP触发器函数打包指南

## 重要说明

阿里云函数计算的**HTTP触发器**使用**Node.js标准HTTP Stream API**：
- `request` 对象：标准Node.js HTTP IncomingMessage对象
- `response` 对象：标准Node.js HTTP ServerResponse对象
- 使用 `response.writeHead()` 和 `response.end()` 方法

**不要使用**：
- ❌ `response.setStatusCode()` 或 `response.setHeader()` - 这些不是标准Node.js方法
- ❌ `response.send()` - 这不是标准Node.js方法
- ❌ `module.exports.handler = async function(request, response, context)` - 不需要async，会导致超时

## 正确的HTTP触发器格式

### ✅ 正确格式

```javascript
const axios = require('axios');

exports.handler = (request, response, context) => {
  console.log('Request方法:', request.method);
  
  // 设置CORS响应头 - 使用Node.js标准API
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  
  // 处理OPTIONS预检请求
  if (request.method === 'OPTIONS') {
    response.end('');
    return;
  }
  
  // 只接受POST请求
  if (request.method !== 'POST') {
    response.writeHead(405, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }
  
  // 获取请求体 - 使用Node.js Stream API
  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });
  
  request.on('end', async () => {
    try {
      const requestBody = JSON.parse(body);
      
      // 处理业务逻辑...
      const result = await someAsyncOperation(requestBody);
      
      // 返回成功响应
      response.writeHead(200, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      response.end(JSON.stringify(result));
      
    } catch (error) {
      console.error('处理失败:', error.message);
      
      // 返回错误响应
      response.writeHead(500, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      response.end(JSON.stringify({ 
        error: '处理失败',
        details: error.message
      }));
    }
  });
};
```

### ❌ 错误格式（不要使用）

```javascript
// 错误1: 使用不存在的方法
exports.handler = (request, response, context) => {
  response.setStatusCode(200);  // ❌ 不是标准Node.js方法
  response.setHeader('Content-Type', 'application/json');  // ❌
  response.send(JSON.stringify(data));  // ❌
};

// 错误2: 使用async但不正确处理Stream
module.exports.handler = async function(request, response, context) {
  // ❌ async函数在Stream完成前返回，导致函数超时
  const body = await getRawBody(request);  // ❌ 需要额外依赖
};
```

## TTS函数打包步骤

### 1. 准备文件

在本地创建一个新目录 `tts-proxy-local/`：

```bash
mkdir ~/tts-proxy-local
cd ~/tts-proxy-local
```

### 2. 复制文件

```bash
# 复制TTS函数代码（重命名为 index.js）
cp /mnt/d/GitHub/class/aliyun-fc/index-tts.js index.js

# 复制package.json
cp /mnt/d/GitHub/class/aliyun-fc/package.json package.json
```

### 3. 安装依赖

```bash
npm install
```

这会安装：
- `axios` - HTTP客户端（用于调用Azure API）

### 4. 打包

```bash
zip -r ../tts-proxy.zip .
```

或者只打包必要文件：

```bash
zip -r ../tts-proxy.zip index.js package.json node_modules/
```

### 5. 上传到阿里云

1. 登录阿里云函数计算控制台
2. 进入 `tts-proxy` 函数
3. 选择"上传代码包"或"上传zip包"
4. 上传 `tts-proxy.zip`
5. **确认环境变量**：`AZURE_SPEECH_KEY`、`AZURE_SPEECH_REGION`

## Voices函数打包步骤

与TTS函数类似：

```bash
mkdir ~/voices-proxy-local
cd ~/voices-proxy-local

# 复制Voices函数代码（重命名为 index.js）
cp /mnt/d/GitHub/class/aliyun-fc/index-voices.js index.js

# 复制package.json
cp /mnt/d/GitHub/class/aliyun-fc/package.json package.json

# 安装依赖
npm install

# 打包
zip -r ../voices-proxy.zip .
```

## 测试HTTP触发器

### 测试TTS函数（POST请求）

```bash
curl -X POST https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","voice":"en-US-JennyNeural","format":"wav","sample_rate":16000}' \
  --output test.wav
```

**预期输出**：
- 生成 `test.wav` 文件
- 文件大小 > 0
- 可以正常播放

### 测试Voices函数（GET或POST均可）

```bash
curl https://voices-proxy-oucqkhrhda.ap-northeast-1.fcapp.run
```

**预期输出**：
- JSON格式的语音列表
- 包含多个语言分组
- 每个语言下有多个语音

## 查看函数日志

在阿里云控制台：
1. 进入函数详情页
2. 点击"日志查询"标签
3. 查看最近的调用日志

**成功的日志应该包含**：
- `收到请求`
- `Request方法: POST`
- `请求体长度: xxx`
- `Azure TTS请求参数: {...}`
- `Azure TTS响应状态: 200`
- `音频数据大小: xxx`

## 常见问题

### Q: 为什么报错 `response.setHeader is not a function`？

**A:** 因为使用了不存在的方法。阿里云HTTP触发器的response对象是**标准Node.js HTTP ServerResponse**，应该使用：
- ✅ `response.writeHead(statusCode, headers)`
- ✅ `response.end(body)`

而不是：
- ❌ `response.setStatusCode(statusCode)`
- ❌ `response.setHeader(key, value)`
- ❌ `response.send(body)`

### Q: Node.js Stream API是什么？

**A:** Node.js的HTTP模块使用Stream（流）来处理请求和响应：
- **请求体读取**：通过 `request.on('data')` 和 `request.on('end')` 事件
- **响应写入**：通过 `response.writeHead()` 设置状态和头，`response.end()` 发送响应体

### Q: 为什么不用async/await？

**A:** 因为HTTP Stream API基于事件回调，直接在handler中使用async会导致函数在Stream处理完成前返回。正确做法是在 `request.on('end')` 回调中使用async。

### Q: 需要什么依赖？

**A:** 只需要 `axios`：
```json
{
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

不需要 `raw-body` 或其他额外的依赖。

### Q: 如何确认函数类型？

**A:** 在阿里云函数计算控制台：
1. 进入函数详情页
2. 查看"函数配置"标签
3. 找到"请求处理程序类型"字段
4. 应该显示"处理 HTTP 请求"

### Q: POST请求为什么一直返回405？

**A:** 之前的原因是：
1. 代码格式错误，使用了不存在的API方法
2. HTTP方法判断逻辑有误
3. 没有正确处理Node.js Stream

现在使用正确的格式后应该能正常工作。

## 总结

### ✅ 正确做法

1. **使用标准Node.js HTTP API**：
   ```javascript
   exports.handler = (request, response, context) => { ... }
   ```

2. **使用 `response.writeHead()` 和 `response.end()`**：
   ```javascript
   response.writeHead(200, { 'Content-Type': 'application/json' });
   response.end(JSON.stringify(data));
   ```

3. **使用Node.js Stream API读取请求体**：
   ```javascript
   let body = '';
   request.on('data', (chunk) => { body += chunk.toString(); });
   request.on('end', async () => { /* 处理body */ });
   ```

4. **在 `request.on('end')` 回调中使用async/await**：
   ```javascript
   request.on('end', async () => {
     const result = await someAsyncOperation();
     response.end(JSON.stringify(result));
   });
   ```

### ❌ 错误做法

1. ❌ 使用不存在的方法：`response.setStatusCode()`, `response.setHeader()`, `response.send()`
2. ❌ 使用 `async function` 作为主handler
3. ❌ 使用 `raw-body` 或其他非必要依赖
4. ❌ 在Stream完成前返回响应

## 参考资料

- [Node.js HTTP文档](https://nodejs.org/api/http.html)
- [阿里云函数计算HTTP触发器文档](https://help.aliyun.com/document_detail/74756.html)
