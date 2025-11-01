# 故障排查指南

## 问题：Internal Server Error (500)

### 可能原因和解决方案

#### 1. 环境变量未配置 ✅ **最常见**

**检查方法：**
- 进入函数详情页
- 查看"环境变量"标签
- 确认是否配置了 `AZURE_SPEECH_KEY` 和 `AZURE_SPEECH_REGION`

**解决方法：**
- 添加环境变量：
  - `AZURE_SPEECH_KEY`: 你的Azure密钥
  - `AZURE_SPEECH_REGION`: 你的Azure区域（如 `eastus`）

**验证：**
```bash
# 在函数代码中添加临时日志（部署前记得删除）
console.log('AZURE_SPEECH_KEY:', process.env.AZURE_SPEECH_KEY ? '已配置' : '未配置');
console.log('AZURE_SPEECH_REGION:', process.env.AZURE_SPEECH_REGION ? '已配置' : '未配置');
```

#### 2. axios依赖未安装 ✅ **很常见**

**检查方法：**
- 在阿里云控制台查看函数代码
- 确认是否上传了 `package.json` 文件
- 或者在代码中直接包含 `axios`（内联）

**解决方法：**

**方法A：上传package.json（推荐）**
1. 创建 `package.json` 文件，内容如下：
```json
{
  "name": "azure-tts-aliyun-fc-proxy",
  "version": "1.0.0",
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

2. 将 `index.js` 和 `package.json` 一起打包成 zip 文件
3. 在函数配置中上传 zip 文件（而不是直接在编辑器粘贴代码）

**方法B：使用内联axios（临时方案）**
- 直接在代码中引入axios（如果阿里云支持npm install）

#### 3. 代码格式问题

**检查方法：**
- 查看阿里云函数计算的执行日志
- 进入函数详情页 → "日志查询" 标签
- 查看错误堆栈信息

**可能的问题：**
- `event` 对象格式不对
- `callback` 调用格式不对
- 缺少错误处理

**解决方法：**
- 确保代码正确导出了 `exports.handler`
- 确保 `callback` 正确调用（第一个参数是错误，第二个是响应）

#### 4. 网络访问问题

**检查方法：**
- 查看日志中的错误信息
- 确认是否是访问Azure API超时

**可能的原因：**
- 阿里云函数计算无法访问外网（需要配置VPC或公网访问）
- Azure API响应慢

**解决方法：**
- 配置函数的VPC或公网访问
- 增加超时时间

#### 5. 函数入口配置错误

**检查方法：**
- 进入函数配置
- 查看"函数入口"是否正确填写为 `index.handler`

**解决方法：**
- 确保入口设置为 `index.handler`（不是 `index.js` 或 `handler`）

### 快速诊断步骤

1. **查看日志**：
   ```
   阿里云控制台 → 函数计算 → 你的函数 → 日志查询
   ```
   查看具体的错误信息

2. **测试环境变量**：
   在函数代码开头添加：
   ```javascript
   console.log('环境变量检查:');
   console.log('AZURE_SPEECH_KEY:', process.env.AZURE_SPEECH_KEY ? '✓' : '✗');
   console.log('AZURE_SPEECH_REGION:', process.env.AZURE_SPEECH_REGION ? '✓' : '✗');
   ```

3. **测试最简单的响应**：
   临时修改代码，直接返回成功：
   ```javascript
   exports.handler = async (event, context, callback) => {
     callback(null, {
       statusCode: 200,
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ message: 'Function is working' })
     });
   };
   ```
   如果这个能工作，说明函数本身没问题，问题在业务逻辑。

### 推荐的测试命令

```bash
# 测试Voices API（GET请求）
curl -v https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/tts-proxy-service/voices-proxy/api/voices

# 测试TTS API（POST请求）
curl -v -X POST https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/tts-proxy-service/tts-proxy/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello","voice":"en-US-JennyNeural","format":"wav","sample_rate":16000}'
```

**注意：** 使用 `-v` 参数可以看到详细的响应信息

### 查看详细错误信息

如果curl返回500错误，但看不到具体原因，可以：

1. **在阿里云控制台查看日志**：
   - 进入函数详情页
   - 点击"日志查询"标签
   - 查看最新的执行日志和错误信息

2. **在代码中添加详细日志**：
   ```javascript
   console.log('Event:', JSON.stringify(event, null, 2));
   console.log('Context:', JSON.stringify(context, null, 2));
   ```

### 常见错误信息对照表

| 错误信息 | 可能原因 | 解决方法 |
|---------|---------|---------|
| "缺少必要的环境变量" | 环境变量未配置 | 配置 `AZURE_SPEECH_KEY` 和 `AZURE_SPEECH_REGION` |
| "Cannot find module 'axios'" | axios未安装 | 上传 `package.json` 或使用内联依赖 |
| "timeout" | 网络访问超时 | 检查网络配置，增加超时时间 |
| "ENOTFOUND" | 域名解析失败 | 检查Azure区域配置是否正确 |

