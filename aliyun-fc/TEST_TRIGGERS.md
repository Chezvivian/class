# 测试HTTP触发器

## 触发器URL格式

从触发器页面复制的URL可能是：
```
https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run
```

这个URL可能：
1. **不包含路径**：需要在URL后面添加路径（如 `/api/tts`）
2. **或者就是完整URL**：直接使用即可

## 测试方法

### 方法1：先测试GET请求（验证连接）

```bash
# 测试连接（如果支持GET）
curl -v https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run

# 如果有路径，加上路径：
curl -v https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run/api/tts
```

如果返回 `{"error":"Method not allowed"}`，说明：
- ✅ URL是正确的（函数能收到请求）
- ❌ 但请求方法不对（tts函数需要POST）

### 方法2：使用POST方法测试TTS

```bash
# 测试TTS（POST请求）
curl -v -X POST https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run/api/tts \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, world!",
    "voice": "en-US-JennyNeural",
    "format": "wav",
    "sample_rate": 16000
  }'
```

或者如果URL已经包含路径，直接使用：

```bash
curl -v -X POST https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, world!",
    "voice": "en-US-JennyNeural",
    "format": "wav",
    "sample_rate": 16000
  }'
```

### 方法3：测试Voices函数（GET请求）

如果voices函数的触发器URL是类似的格式：

```bash
# 获取voices触发器URL，然后：
curl -v https://voices-proxy-xxx.ap-northeast-1.fcapp.run/api/voices

# 或者如果没有路径：
curl -v https://voices-proxy-xxx.ap-northeast-1.fcapp.run
```

## 如何确认完整URL

### 在阿里云控制台查看

1. **进入触发器详情**
   - 进入函数详情页
   - 点击"触发器"标签
   - 点击具体的HTTP触发器

2. **查看完整URL**
   - 在触发器详情中应该能看到完整的访问地址
   - 包括域名和路径

3. **复制完整URL**
   - 应该能看到类似：
   ```
   https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run/api/tts
   ```
   或
   ```
   https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run
   ```

## 推荐测试步骤

### 步骤1：测试连接

```bash
# 先测试OPTIONS（预检请求）
curl -v -X OPTIONS https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run

# 如果有路径：
curl -v -X OPTIONS https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run/api/tts
```

如果返回200，说明连接正常。

### 步骤2：测试TTS POST请求

```bash
# 尝试带路径
curl -v -X POST https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello","voice":"en-US-JennyNeural","format":"wav","sample_rate":16000}'

# 如果上面返回404，尝试不带路径
curl -v -X POST https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello","voice":"en-US-JennyNeural","format":"wav","sample_rate":16000}'
```

### 步骤3：验证响应

成功的响应应该是：
- 返回音频数据（二进制）
- 或者返回JSON格式的错误信息

如果返回 `{"error":"Method not allowed"}`，说明：
- URL正确
- 但请求方法不对（应该用POST）

## 常见问题

### 问题1：返回404 Not Found

**原因**：URL路径不对

**解决**：
- 检查触发器配置中的路径（应该是 `/api/tts`）
- 在URL后面加上路径：`/api/tts`

### 问题2：返回405 Method Not Allowed

**原因**：请求方法不对

**解决**：
- TTS函数必须用POST
- Voices函数可以用GET

### 问题3：返回500 Internal Server Error

**原因**：函数执行错误

**解决**：
- 查看函数日志
- 检查环境变量是否配置
- 检查代码是否有错误

## 完整测试命令示例

```bash
# 1. 测试TTS（POST，带路径）
curl -v -X POST https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello, world!","voice":"en-US-JennyNeural","format":"wav","sample_rate":16000}' \
  --output test-audio.wav

# 2. 测试Voices（GET，带路径）
curl -v https://voices-proxy-xxx.ap-northeast-1.fcapp.run/api/voices
```

