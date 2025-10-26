# 快速部署脚本

## 一键部署到 Vercel

```bash
#!/bin/bash

# 创建项目目录
mkdir aliyun-tts-vercel
cd aliyun-tts-vercel

# 创建 API 目录
mkdir api

# 复制文件（请确保文件存在）
cp ../api/token.js api/
cp ../api/tts.js api/
cp ../vercel.json .
cp ../package-vercel.json package.json

# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

echo "部署完成！请在 Vercel Dashboard 中配置环境变量："
echo "ALIYUN_AK_ID=你的AccessKey ID"
echo "ALIYUN_AK_SECRET=你的AccessKey Secret"  
echo "NLS_APP_KEY=你的AppKey"
```

## 环境变量快速配置

```bash
# 使用 Vercel CLI 设置环境变量
vercel env add ALIYUN_AK_ID
vercel env add ALIYUN_AK_SECRET
vercel env add NLS_APP_KEY

# 部署到生产环境
vercel --prod
```

## 测试 API

```bash
# 测试 Token API
curl -X POST https://your-project.vercel.app/api/token

# 测试 TTS API
curl -X POST https://your-project.vercel.app/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello World","voice":"Abby","speed":0,"pitch":0,"volume":50}' \
  --output test.wav
```
