# 阿里云 TTS Vercel 中间层部署指南

## 概述

本方案将阿里云 TTS API 部署到 Vercel 作为中间层，解决本地部署的复杂性和 CORS 问题，实现云端自动化运行。

## 项目结构

```
vercel-tts-proxy/
├── api/
│   ├── token.js          # 获取阿里云访问令牌
│   └── tts.js            # TTS语音合成API
├── vercel.json           # Vercel配置文件
├── package-vercel.json   # 依赖配置
└── vercel-env-config.md # 环境变量配置说明
```

## 部署步骤

### 1. 准备阿里云资源

#### 1.1 创建 AccessKey
1. 登录 [阿里云控制台](https://ecs.console.aliyun.com/)
2. 进入 **RAM访问控制** → **用户**
3. 创建用户或选择现有用户
4. 创建 AccessKey，记录 AccessKey ID 和 AccessKey Secret

#### 1.2 创建智能语音交互项目
1. 进入 [智能语音交互控制台](https://nls-portal.console.aliyun.com/)
2. 创建新项目
3. 记录 AppKey

#### 1.3 配置权限
确保 AccessKey 具有以下权限：
- `AliyunNLSFullAccess` 或自定义权限包含：
  - `nls:CreateToken`
  - `nls:Synthesize`

### 2. 部署到 Vercel

#### 2.1 创建 Vercel 项目
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 初始化项目
vercel init aliyun-tts-proxy
cd aliyun-tts-proxy
```

#### 2.2 上传项目文件
将以下文件上传到 Vercel 项目：
- `api/token.js`
- `api/tts.js`
- `vercel.json`
- `package-vercel.json` (重命名为 `package.json`)

#### 2.3 配置环境变量
在 Vercel Dashboard 中设置环境变量：

| 变量名 | 值 | 说明 |
|--------|----|----|
| `ALIYUN_AK_ID` | 你的AccessKey ID | 阿里云访问密钥ID |
| `ALIYUN_AK_SECRET` | 你的AccessKey Secret | 阿里云访问密钥Secret |
| `NLS_APP_KEY` | 你的AppKey | 智能语音交互项目AppKey |

#### 2.4 部署
```bash
# 部署到生产环境
vercel --prod
```

### 3. 更新前端代码

前端代码已更新为使用 Vercel API 端点：

```javascript
// 自动检测当前域名
const apiBaseUrl = window.location.origin;

// 调用 TTS API
const response = await fetch(`${apiBaseUrl}/api/tts`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: text,
    voice: voiceSelect.value,
    speed: parseInt(speedSelect.value),
    pitch: parseInt(pitchSelect.value),
    volume: parseInt(volumeSelect.value)
  })
});
```

## API 端点

### 1. 获取访问令牌
- **URL**: `/api/token`
- **方法**: POST
- **响应**: 
```json
{
  "success": true,
  "token": "access_token_here",
  "expireTime": 1234567890
}
```

### 2. 语音合成
- **URL**: `/api/tts`
- **方法**: POST
- **请求体**:
```json
{
  "text": "要合成的文本",
  "voice": "Abby",
  "speed": 0,
  "pitch": 0,
  "volume": 50
}
```
- **响应**: 音频文件 (WAV格式)

## 优势

### 1. 无需本地部署
- 不需要本地运行 Node.js 服务器
- 不需要配置本地环境变量
- 自动处理服务器维护和更新

### 2. 自动扩展
- Vercel 自动处理流量扩展
- 全球 CDN 加速
- 99.9% 可用性保证

### 3. 安全性
- 环境变量安全存储
- HTTPS 加密传输
- 自动 CORS 处理

### 4. 成本效益
- Vercel 免费额度充足
- 按使用量付费
- 无需维护服务器成本

## 监控和维护

### 1. 监控 API 使用
- 在 Vercel Dashboard 查看函数调用次数
- 监控响应时间和错误率
- 设置告警通知

### 2. 阿里云费用监控
- 在阿里云控制台设置费用告警
- 监控 TTS API 调用量
- 定期检查账单

### 3. 日志查看
```bash
# 查看 Vercel 函数日志
vercel logs
```

## 故障排除

### 1. 常见错误

#### Token 获取失败
- 检查 AccessKey 是否正确
- 确认权限配置
- 检查网络连接

#### TTS 合成失败
- 检查 AppKey 是否正确
- 确认文本长度不超过5000字符
- 检查音色参数是否有效

#### CORS 错误
- 确认 Vercel 配置中的 CORS 头设置
- 检查请求域名是否匹配

### 2. 调试方法
1. 查看 Vercel 函数日志
2. 使用浏览器开发者工具
3. 检查网络请求和响应

## 更新和维护

### 1. 更新代码
```bash
# 重新部署
vercel --prod
```

### 2. 更新环境变量
在 Vercel Dashboard 中更新环境变量，无需重新部署

### 3. 监控和优化
- 定期检查 API 使用情况
- 优化响应时间
- 更新依赖包

## 总结

通过 Vercel 中间层方案，您可以：
- ✅ 无需本地部署和配置
- ✅ 自动处理 CORS 问题
- ✅ 享受云端自动扩展
- ✅ 简化维护工作
- ✅ 提高系统可靠性

这个方案完全解决了本地部署的复杂性问题，让 TTS 功能可以自动化运行。
