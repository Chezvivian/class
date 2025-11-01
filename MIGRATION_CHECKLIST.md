# Azure迁移检查清单

## ✅ 已完成的代码修改

1. ✅ **后端API (`vercel-tts-api/api/tts.js`)**
   - 已改为使用Azure Speech Service REST API
   - 移除了阿里云token获取逻辑
   - 添加了SSML构建函数
   - 添加了参数转换函数（speed、pitch、volume）
   - 添加了语音名称映射表
   - 添加了音频格式转换函数

2. ✅ **前端代码 (`_posts/2025-08-21-text-to-speech.md`)**
   - 更新了工具简介区块（技术平台改为Azure）
   - 移除了token检查逻辑
   - 更新了注释和函数说明

3. ✅ **配置文件 (`vercel-tts-api/package.json`)**
   - 更新了项目名称和描述

## 📋 您需要完成的步骤

### 1. 在Vercel中配置环境变量

在Vercel项目设置中，删除以下阿里云环境变量（如果存在）：
- ❌ `ALIYUN_AK_ID`
- ❌ `ALIYUN_AK_SECRET`
- ❌ `NLS_APP_KEY`

添加以下Azure环境变量：
- ✅ `AZURE_SPEECH_KEY` - 您的Azure Speech Service API密钥
- ✅ `AZURE_SPEECH_REGION` - 您的Azure资源区域（如：`eastus`、`westus2`、`southeastasia`等）

**如何获取Azure密钥和区域：**
1. 登录 [Azure门户](https://portal.azure.com/)
2. 进入您创建的"语音服务"资源
3. 在左侧菜单选择"密钥和终结点"
4. 复制 `Key1` 或 `Key2`（作为 `AZURE_SPEECH_KEY`）
5. 复制"位置"信息（作为 `AZURE_SPEECH_REGION`）

### 2. 部署到Vercel

```bash
cd vercel-tts-api
vercel --prod
```

或者通过GitHub自动部署（如果已配置）。

### 3. 测试验证

部署完成后，测试以下功能：
- [ ] 基本文本转语音功能
- [ ] 不同语音选项（测试语音映射是否正确）
- [ ] 语速调节（-500到500范围）
- [ ] 语调调节（-500到500范围）
- [ ] 音量调节（1到100范围）
- [ ] 不同采样率（8000、16000 Hz）
- [ ] 不同格式（WAV、MP3）
- [ ] 音频播放功能
- [ ] 音频下载功能

### 4. 可选：删除不再需要的文件

如果确定不再使用阿里云TTS，可以删除：
- `vercel-tts-api/api/token.js`（Azure不需要token获取）
- `api/token.js`（如果在根目录也有）

**注意**：建议先保留这些文件，确保迁移成功后再删除。

## 🔍 故障排查

### 如果遇到"缺少必要的环境变量"错误
- 检查Vercel环境变量是否正确配置
- 确保变量名称完全匹配：`AZURE_SPEECH_KEY` 和 `AZURE_SPEECH_REGION`
- 重新部署Vercel项目

### 如果遇到401认证错误
- 检查 `AZURE_SPEECH_KEY` 是否正确
- 确认密钥未过期或被撤销

### 如果遇到404或网络错误
- 检查 `AZURE_SPEECH_REGION` 是否正确
- 确认区域格式正确（如：`eastus`，不是 `East US`）
- 查看Vercel日志了解详细错误信息

### 如果语音效果不理想
- 检查语音映射表是否正确
- 可能需要根据实际效果调整语音映射
- 参考Azure官方文档获取更多语音选项

## 📚 参考资源

- [Azure Speech Service官方文档](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/)
- [REST API参考](https://learn.microsoft.com/azure/ai-services/speech-service/rest-text-to-speech)
- [支持的语音列表](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts)
- [SSML参考](https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup)

## 🎉 迁移完成

完成上述步骤后，您的文字转语音工具应该已经成功迁移到Azure Speech Service！

