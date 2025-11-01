# 前端配置说明

## 更新代理端点地址

部署阿里云函数计算后，需要在前端代码中更新代理端点地址。

### 步骤1：获取阿里云函数计算的HTTP触发器地址

1. 登录[阿里云函数计算控制台](https://fc.console.aliyun.com/)
2. 进入你的服务（如 `tts-proxy-service`）
3. 找到对应的函数（`tts-proxy` 和 `voices-proxy`）
4. 点击"触发器"标签，查看HTTP触发器地址

地址格式类似：
```
https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/tts-proxy-service/tts-proxy/api/tts
https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/tts-proxy-service/voices-proxy/api/voices
```

### 步骤2：更新前端代码

在 `_posts/2025-08-21-text-to-speech.md` 文件中，找到以下代码：

```javascript
const PROXY_ENDPOINTS = {
  voices: [
    'https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/tts-proxy-service/voices-proxy/api/voices', // 阿里云代理（优先，国内访问快）
    'https://vercel-tts.vercel.app/api/voices'  // Vercel代理（备用，国外用户）
  ],
  tts: [
    'https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/tts-proxy-service/tts-proxy/api/tts', // 阿里云代理（优先，国内访问快）
    'https://vercel-tts.vercel.app/api/tts'  // Vercel代理（备用，国外用户）
  ]
};
```

将 `https://your-service.cn-hangzhou.fc.aliyuncs.com/...` 替换为你实际的阿里云函数计算地址。

### 步骤3：测试

1. 保存文件并提交到GitHub
2. GitHub Pages会自动更新
3. 访问网站测试功能：
   - 国内用户应优先使用阿里云代理（速度快）
   - 国外用户应使用Vercel代理
   - 如果第一个端点失败，会自动切换到备用端点

## 工作原理

前端代码会自动尝试所有配置的代理端点：
1. **优先使用第一个端点**（通常是阿里云代理，国内访问快）
2. **如果第一个端点失败**，自动切换到下一个端点
3. **成功后记住当前使用的端点**，下次请求继续使用该端点
4. **如果所有端点都失败**，显示错误信息

这样设计的好处：
- 国内用户自动使用阿里云代理（速度快、稳定）
- 国外用户自动使用Vercel代理（不需要配置）
- 自动故障转移（一个端点挂了，自动切换到另一个）
- 无需手动选择，系统自动选择最佳端点

