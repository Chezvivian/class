# 从阿里云TTS迁移到Azure Speech Service指南

## 一、架构对比

### 当前架构（阿里云TTS）
- **认证方式**：需要先获取token（通过`/api/token`），然后使用token调用TTS API
- **API端点**：`https://nls-gateway.cn-shanghai.aliyuncs.com/stream/v1/tts`
- **参数格式**：JSON body，包含appkey、token、text、voice、speech_rate、pitch_rate、volume等
- **环境变量**：`ALIYUN_AK_ID`、`ALIYUN_AK_SECRET`、`NLS_APP_KEY`

### Azure Speech Service架构
- **认证方式**：直接使用API密钥，通过`Ocp-Apim-Subscription-Key`头部传递
- **API端点**：`https://{region}.tts.speech.microsoft.com/cognitiveservices/v1`
- **参数格式**：支持SSML（推荐）或纯文本，通过请求体传递
- **环境变量**：`AZURE_SPEECH_KEY`、`AZURE_SPEECH_REGION`

## 二、Azure Speech Service REST API说明

### 1. API端点格式
```
POST https://{region}.tts.speech.microsoft.com/cognitiveservices/v1
```
- `{region}` 需要替换为您在Azure门户中获取的区域，例如：`eastus`、`westus2`、`southeastasia`等

### 2. 请求头
```
Content-Type: application/ssml+xml (使用SSML时)
            或 application/json (使用纯文本时)
Ocp-Apim-Subscription-Key: {您的API密钥}
X-Microsoft-OutputFormat: audio-16khz-128kbitrate-mono-mp3 (或其他格式)
```

### 3. 支持的音频格式
- `audio-16khz-128kbitrate-mono-mp3`
- `audio-16khz-32kbitrate-mono-mp3`
- `audio-16khz-64kbitrate-mono-mp3`
- `audio-24khz-160kbitrate-mono-mp3`
- `audio-24khz-48kbitrate-mono-mp3`
- `audio-24khz-96kbitrate-mono-mp3`
- `audio-48khz-192kbitrate-mono-mp3`
- `raw-16khz-16bit-mono-pcm` (WAV格式)
- `raw-24khz-16bit-mono-pcm` (WAV格式)
- `raw-48khz-16bit-mono-pcm` (WAV格式)
- `riff-16khz-16bit-mono-pcm` (WAV格式)
- `riff-24khz-16bit-mono-pcm` (WAV格式)
- `riff-48khz-16bit-mono-pcm` (WAV格式)

### 4. SSML格式说明
Azure推荐使用SSML格式，可以精确控制语音合成的各个方面：

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
  <voice name="en-US-JennyNeural">
    <prosody rate="0%" pitch="0%" volume="50%">
      要合成的文本内容
    </prosody>
  </voice>
</speak>
```

**SSML参数说明**：
- `rate`: 语速（-50%到+100%），对应阿里云的speed参数
- `pitch`: 语调（-50%到+50%），对应阿里云的pitch参数
- `volume`: 音量（0%到100%），对应阿里云的volume参数

### 5. 支持的语音列表
Azure提供大量语音选项，包括：
- `en-US-JennyNeural`（美式英文女声）
- `en-US-GuyNeural`（美式英文男声）
- `en-GB-SoniaNeural`（英式英文女声）
- `en-GB-RyanNeural`（英式英文男声）
- 等等...

完整列表请参考：https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts

## 三、代码修改步骤

### 步骤1：修改后端API（`api/tts.js`）

#### 需要修改的部分：
1. **移除token获取逻辑**：Azure不需要token，直接使用API密钥
2. **修改API端点**：从阿里云端点改为Azure端点
3. **修改请求格式**：从JSON改为SSML格式
4. **修改认证方式**：从token改为API密钥头部认证
5. **修改环境变量**：使用Azure的密钥和区域

#### 具体修改：
```javascript
// 修改前（阿里云）
const tokenResponse = await axios.post(`${apiBaseUrl}/api/token`, {});
const token = tokenResponse.data.token;
const response = await axios.post(
  'https://nls-gateway.cn-shanghai.aliyuncs.com/stream/v1/tts',
  { appkey, token, text, voice, ... }
);

// 修改后（Azure）
const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION;
const endpoint = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

// 构建SSML
const ssml = buildSSML(text, voice, speed, pitch, volume);

const response = await axios.post(endpoint, ssml, {
  headers: {
    'Content-Type': 'application/ssml+xml',
    'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY,
    'X-Microsoft-OutputFormat': getOutputFormat(format, sample_rate)
  },
  responseType: 'arraybuffer'
});
```

### 步骤2：创建SSML构建函数

需要在后端API中添加构建SSML的函数：
```javascript
function buildSSML(text, voice, speed, pitch, volume) {
  // 将speed从阿里云范围(-500到500)转换为Azure百分比(-50%到+100%)
  const ratePercent = convertSpeedToRate(speed);
  
  // 将pitch从阿里云范围(-500到500)转换为Azure百分比(-50%到+50%)
  const pitchPercent = convertPitchToPitch(pitch);
  
  // volume已经是百分比(1-100)，保持不变
  const volumePercent = volume;
  
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="${voice}">
      <prosody rate="${ratePercent}%" pitch="${pitchPercent}%" volume="${volumePercent}%">
        ${escapeXml(text)}
      </prosody>
    </voice>
  </speak>`;
}
```

### 步骤3：修改语音映射

阿里云的voice名称需要映射到Azure的voice名称：
```javascript
const voiceMapping = {
  'Betty': 'en-US-JennyNeural',
  'ava': 'en-US-AriaNeural',
  'Andy': 'en-US-GuyNeural',
  'Beth': 'en-US-JennyNeural',
  'Luca': 'en-GB-RyanNeural',
  'William': 'en-GB-RyanNeural',
  'Cindy': 'en-US-JennyNeural',
  'Luna': 'en-GB-SoniaNeural',
  'Abby': 'en-US-AriaNeural',
  'Donna': 'en-US-JennyNeural',
  'Emily': 'en-GB-SoniaNeural',
  'Lydia': 'zh-CN-XiaoxiaoNeural', // 中英双语
  'Eva': 'en-US-AriaNeural',
  'Eric': 'en-GB-RyanNeural',
  'Olivia': 'en-GB-SoniaNeural',
  'Brian': 'en-US-GuyNeural',
  'Annie': 'en-US-AriaNeural',
  'Wendy': 'en-GB-SoniaNeural',
  'Harry': 'en-GB-RyanNeural'
};
```

### 步骤4：修改前端（可选）

如果后端API保持相同的接口格式，前端代码基本不需要修改。但需要注意：
- 确保前端传递的voice参数能正确映射到Azure语音名称
- 或者在后端统一处理映射

### 步骤5：移除token.js（可选）

由于Azure不需要token获取流程，可以删除`api/token.js`文件，或者保留用于其他用途。

## 四、环境变量配置

在Vercel或您的部署环境中，需要设置以下环境变量：

### 删除以下变量（如果存在）：
- `ALIYUN_AK_ID`
- `ALIYUN_AK_SECRET`
- `NLS_APP_KEY`

### 添加以下变量：
- `AZURE_SPEECH_KEY`: 您的Azure Speech Service API密钥
- `AZURE_SPEECH_REGION`: 您的Azure资源区域（如：eastus、westus2等）

## 五、参数转换说明

### 语速（Speed）转换
- **阿里云范围**：-500到500
- **Azure范围**：-50%到+100%
- **转换公式**：
  - 如果speed <= 0: `rate = (speed / 500) * 50`（结果为负数或0）
  - 如果speed > 0: `rate = (speed / 500) * 100`（结果为正数）

### 语调（Pitch）转换
- **阿里云范围**：-500到500
- **Azure范围**：-50%到+50%
- **转换公式**：`pitch = (pitch / 500) * 50`

### 音量（Volume）
- **阿里云范围**：1到100
- **Azure范围**：0%到100%
- **转换公式**：`volume = volume`（保持原值，添加%）

### 采样率（Sample Rate）转换
- **阿里云**：8000 Hz 或 16000 Hz
- **Azure**：通过`X-Microsoft-OutputFormat`指定，例如：
  - 8000 Hz: `audio-8khz-16bit-16kbps-mono-mp3`
  - 16000 Hz: `audio-16khz-16bit-16kbps-mono-mp3`
  - 24000 Hz: `audio-24khz-16bit-24kbps-mono-mp3`

## 六、错误处理

Azure API的错误响应格式：
```json
{
  "error": {
    "code": "InvalidRequest",
    "message": "错误描述"
  }
}
```

需要在代码中正确处理这些错误。

## 七、测试建议

1. **单条文本测试**：测试基本功能是否正常
2. **参数测试**：测试不同的语速、语调、音量设置
3. **语音测试**：测试不同的语音选项
4. **格式测试**：测试不同的音频格式输出
5. **错误处理测试**：测试无效请求的错误处理

## 八、迁移检查清单

- [ ] 获取Azure Speech Service API密钥和区域
- [ ] 在Vercel或部署环境中配置环境变量
- [ ] 修改`api/tts.js`以使用Azure API
- [ ] 实现SSML构建函数
- [ ] 实现参数转换函数（speed、pitch等）
- [ ] 实现语音名称映射
- [ ] 实现音频格式转换函数
- [ ] 测试基本功能
- [ ] 测试各种参数组合
- [ ] 更新前端（如果需要）
- [ ] 删除不再使用的token.js相关代码
- [ ] 更新文档说明

## 九、注意事项

1. **API限制**：Azure Speech Service有调用频率限制，需要注意配额
2. **字符限制**：Azure SSML请求体有大小限制（通常为10KB），长文本可能需要分段处理
3. **区域选择**：选择离用户最近的区域可以提高响应速度
4. **成本考虑**：Azure按使用量计费，注意成本控制
5. **语音质量**：Azure的Neural语音质量通常很好，但语音选择需要根据实际需求调整

## 十、参考资料

- Azure Speech Service官方文档：https://learn.microsoft.com/azure/ai-services/speech-service/
- REST API参考：https://learn.microsoft.com/azure/ai-services/speech-service/rest-text-to-speech
- SSML参考：https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup
- 支持的语音列表：https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts

