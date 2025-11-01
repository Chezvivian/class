# 阿里云函数计算部署指南

## 概述

这是Azure Speech Service TTS的阿里云函数计算（FC）代理版本，用于解决国内用户访问Azure API的问题。

## 部署步骤

### 1. 准备工作

- 注册阿里云账号
- 开通函数计算（FC）服务
- 准备Azure Speech Service的API密钥和区域

### 2. 创建函数

#### 方法一：使用阿里云控制台

1. 登录[阿里云函数计算控制台](https://fc.console.aliyun.com/)
2. 选择或创建服务
3. 创建函数：
   - **函数名称**: `tts-proxy`（语音合成）和 `voices-proxy`（获取语音列表）
   - **运行环境**: Node.js 18
   - **函数入口**: `index.handler`
   - **请求处理程序类型**: 处理 HTTP 请求

#### 方法二：使用Serverless Devs工具（推荐）

安装Serverless Devs CLI：
```bash
npm install -g @serverless-devs/s
```

### 3. 上传代码

#### 对于TTS函数（tts-proxy）:
- 上传 `tts.js` 文件，重命名为 `index.js`
- 或者直接复制 `tts.js` 的内容到函数代码中

#### 对于Voices函数（voices-proxy）:
- 上传 `voices.js` 文件，重命名为 `index.js`
- 或者直接复制 `voices.js` 的内容到函数代码中

### 4. 配置环境变量

在函数配置中添加以下环境变量：
- `AZURE_SPEECH_KEY`: Azure Speech Service的密钥
- `AZURE_SPEECH_REGION`: Azure Speech Service的区域（如 `eastus`）

### 5. 配置HTTP触发器

1. 为每个函数创建HTTP触发器
2. **触发器类型**: HTTP触发器
3. **请求方法**: GET, POST, OPTIONS
4. **认证方式**: 匿名访问（或根据需要设置）
5. **路径**: 
   - TTS函数: `/api/tts` 或自定义
   - Voices函数: `/api/voices` 或自定义

### 6. 获取函数访问地址

部署后，阿里云会提供一个HTTP触发器地址，格式类似：
```
https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/your-service/tts-proxy/
```

## 前端集成

在前端代码中更新API端点：

```javascript
// 使用阿里云函数计算的端点
const apiBaseUrl = 'https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/your-service';

// 或者使用双代理（自动切换）
const proxyEndpoints = [
  'https://your-aliyun-fc-url',  // 阿里云代理（优先，国内访问快）
  'https://vercel-tts.vercel.app'  // Vercel代理（备用）
];
```

## 注意事项

1. **费用**: 阿里云函数计算有免费额度，超出后按量计费
2. **超时**: 函数默认超时时间，建议设置为30秒或更长
3. **内存**: 建议设置为512MB或更高（处理音频数据需要足够内存）
4. **并发**: 根据预期流量配置并发实例数
5. **CORS**: 代码中已设置CORS头，如果还有问题，可以在HTTP触发器中配置

## 故障排查

1. **环境变量未设置**: 检查函数的环境变量配置
2. **超时错误**: 增加函数超时时间
3. **内存不足**: 增加函数内存配置
4. **CORS问题**: 检查HTTP触发器的CORS设置

## 费用估算

- **免费额度**: 每月100万次函数调用，40万GB-秒
- **超出后**: 按实际使用量计费
- **HTTP触发器**: 通常不额外收费（除非使用自定义域名）

