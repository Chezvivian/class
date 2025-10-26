# 阿里云TTS代理服务器

## 🚀 快速启动

### 方法1：使用启动脚本（推荐）

1. **编辑启动脚本**，填入你的真实密钥：
   ```bash
   # Linux/WSL
   nano start-tts-server.sh
   
   # Windows
   notepad start-tts-server.bat
   ```

2. **运行启动脚本**：
   ```bash
   # Linux/WSL
   chmod +x start-tts-server.sh
   ./start-tts-server.sh
   
   # Windows
   start-tts-server.bat
   ```

### 方法2：手动设置环境变量

```bash
export ALIYUN_AK_ID="你的AccessKeyId"
export ALIYUN_AK_SECRET="你的AccessKeySecret"
export NLS_APP_KEY="你的AppKey"
npm start
```

## 🔒 安全提醒

- ⚠️ **不要推送包含密钥的文件到GitHub**
- ✅ **启动脚本已被.gitignore忽略**
- ✅ **只有代码文件可以安全推送**

## 📋 文件说明

- `backend-proxy.js` - 主服务器文件
- `package.json` - 依赖配置
- `start-tts-server.sh` - Linux/WSL启动脚本（包含密钥）
- `start-tts-server.bat` - Windows启动脚本（包含密钥）
- `config.template.sh` - 配置模板
- `.gitignore` - Git忽略文件配置

## 🎯 使用步骤

1. 编辑启动脚本，填入你的阿里云密钥
2. 运行启动脚本
3. 访问网页进行语音合成
4. 享受多种英文音色的语音合成！
