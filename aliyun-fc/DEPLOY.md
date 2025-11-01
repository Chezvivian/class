# 阿里云函数计算部署详细指南

## 快速开始

### 第一步：准备阿里云账号和环境变量

1. 登录[阿里云控制台](https://console.aliyun.com/)
2. 开通函数计算（FC）服务
3. 准备以下信息：
   - Azure Speech Service 的 `AZURE_SPEECH_KEY`
   - Azure Speech Service 的 `AZURE_SPEECH_REGION`（如：`eastus`）

### 第二步：创建函数服务

1. 进入[函数计算控制台](https://fc.console.aliyun.com/)
2. 点击"创建服务"
3. 填写服务信息：
   - **服务名称**: `tts-proxy-service`（自定义）
   - **描述**: Azure TTS代理服务
4. 点击"确定"

### 第三步：创建TTS函数（语音合成）

1. 在刚创建的服务中，点击"创建函数"
2. 选择"使用自定义运行时创建"
3. 配置函数：
   - **函数名称**: `tts-proxy`
   - **运行环境**: Node.js 18
   - **函数入口**: `index.handler`
   - **请求处理程序类型**: 处理 HTTP 请求

4. **上传代码**（重要！必须包含package.json）：
   
   **推荐方式：上传zip文件（包含package.json）**
   
   步骤：
   1. 创建两个文件：
      - `index.js`：复制 `index-tts.js` 的内容
      - `package.json`：复制 `aliyun-fc/package.json` 的内容
   
   2. 将这两个文件打包成 `tts-proxy.zip`
   
   3. 在阿里云函数计算控制台：
      - 进入函数代码编辑页面
      - 选择"上传zip包"或"上传代码包"
      - 上传 `tts-proxy.zip`
   
   **不推荐：直接粘贴代码**
   - 如果直接在编辑器中粘贴代码，axios依赖不会自动安装，会导致 "Cannot find module 'axios'" 错误

5. **配置环境变量**：
   - 在函数配置中添加：
     - `AZURE_SPEECH_KEY`: 你的Azure密钥
     - `AZURE_SPEECH_REGION`: 你的Azure区域

6. **配置函数设置**：
   - **执行超时时间**: 30秒（建议，处理音频需要较长时间）
   - **内存规格**: 512MB（建议，处理音频需要足够内存）
   - **实例并发度**: 10（可根据需求调整）
   - **启动命令**: 留空（Node.js HTTP函数不需要启动命令）
   - **监听端口**: 留空或填写 `9000`（HTTP函数默认端口，留空由系统自动处理）

### 第四步：创建Voices函数（获取语音列表）

1. 在同一服务中，再次点击"创建函数"
2. 选择"使用自定义运行时创建"
3. 配置函数：
   - **函数名称**: `voices-proxy`
   - **运行环境**: Node.js 18
   - **函数入口**: `index.handler`
   - **请求处理程序类型**: 处理 HTTP 请求

4. **上传代码**（重要！必须包含package.json）：
   
   **推荐方式：上传zip文件（包含package.json）**
   
   步骤：
   1. 创建两个文件：
      - `index.js`：复制 `index-voices.js` 的内容
      - `package.json`：复制 `aliyun-fc/package.json` 的内容
   
   2. 将这两个文件打包成 `voices-proxy.zip`
   
   3. 在阿里云函数计算控制台：
      - 进入函数代码编辑页面
      - 选择"上传zip包"或"上传代码包"
      - 上传 `voices-proxy.zip`
   
   **不推荐：直接粘贴代码**
   - 如果直接在编辑器中粘贴代码，axios依赖不会自动安装，会导致 "Cannot find module 'axios'" 错误

5. **配置环境变量**（与TTS函数相同）：
   - `AZURE_SPEECH_KEY`
   - `AZURE_SPEECH_REGION`

6. **配置函数设置**：
   - **执行超时时间**: 10秒（获取语音列表通常很快）
   - **内存规格**: 256MB（足够处理语音列表数据）
   - **实例并发度**: 10（可根据需求调整）
   - **启动命令**: 留空（Node.js HTTP函数不需要启动命令）
   - **监听端口**: 留空或填写 `9000`（HTTP函数默认端口，留空由系统自动处理）

### 第五步：创建HTTP触发器

#### 为TTS函数创建触发器：
1. 进入 `tts-proxy` 函数详情页
2. 点击"触发器"标签
3. 点击"创建触发器"
4. 配置：
   - **触发器类型**: HTTP触发器
   - **请求方法**: GET, POST, OPTIONS（勾选这三个）
   - **认证方式**: **选择"无需认证"**（重要！前端代码没有认证，选择签名认证会导致调用失败）
   - **路径**: `/api/tts`（或自定义，建议保持 `/api/tts`）
   - **域名类型**: 默认域名（或绑定自定义域名）

5. 记录触发器地址，格式类似：
   ```
   https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/tts-proxy-service/tts-proxy/api/tts
   ```

#### 为Voices函数创建触发器：
1. 进入 `voices-proxy` 函数详情页
2. 点击"触发器"标签
3. 点击"创建触发器"
4. 配置：
   - **触发器类型**: HTTP触发器
   - **请求方法**: GET, POST, OPTIONS（勾选这三个）
   - **认证方式**: **选择"无需认证"**（重要！前端代码没有认证）
   - **路径**: `/api/voices`（或自定义，建议保持 `/api/voices`）
   - **域名类型**: 默认域名（或绑定自定义域名）

3. 记录触发器地址，格式类似：
   ```
   https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/tts-proxy-service/voices-proxy/api/voices
   ```

### 第六步：测试部署

#### 步骤1：查看函数日志（重要！）

在测试前，先查看函数的执行日志，了解具体错误：

1. 进入函数详情页
2. 点击"日志查询"标签
3. 查看最新的执行日志和错误信息

#### 步骤2：使用curl测试

```bash
# 测试Voices API（GET请求）
curl -v https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/tts-proxy-service/voices-proxy/api/voices

# 测试TTS API（POST请求）
curl -v -X POST https://your-service.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/tts-proxy-service/tts-proxy/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello, world!","voice":"en-US-JennyNeural","format":"wav","sample_rate":16000}'
```

**注意：** 使用 `-v` 参数可以看到详细的响应头和信息

#### 步骤3：如果遇到 500 错误

参考 `TROUBLESHOOTING.md` 文件，检查：
1. ✅ **环境变量是否配置**（最常见问题）
2. ✅ **axios依赖是否安装**（需要上传package.json）
3. ✅ **查看函数日志**了解具体错误
4. ✅ **测试简单响应**（使用test-simple.js）

### 第七步：更新前端代码

在前端代码中，更新API端点地址。

## 注意事项

### 1. 代码格式
- 阿里云函数计算的HTTP触发器代码必须导出为 `exports.handler`
- 函数入口必须是 `index.handler`
- 文件必须命名为 `index.js`

### 2. 环境变量
- 在函数配置中添加环境变量，不要硬编码在代码中
- 确保环境变量名称正确：`AZURE_SPEECH_KEY` 和 `AZURE_SPEECH_REGION`

### 3. 超时设置
- TTS函数建议设置为30秒（合成语音可能需要较长时间）
- Voices函数10秒足够

### 4. 内存配置
- TTS函数建议512MB或更高（处理音频数据需要足够内存）
- Voices函数256MB足够

### 5. 触发器路径
- HTTP触发器的路径会影响最终的访问地址
- 建议使用 `/api/tts` 和 `/api/voices` 以便前端调用

### 6. CORS配置
- 代码中已设置CORS头
- 如果还有问题，可以在HTTP触发器配置中启用CORS

### 7. 费用估算
- **免费额度**: 
  - 每月100万次函数调用
  - 40万GB-秒
- **超出后**: 按实际使用量计费
- **HTTP触发器**: 使用默认域名通常不额外收费

## 故障排查

### 问题1: 函数执行超时
**解决方案**: 增加函数超时时间（TTS建议30秒）

### 问题2: 内存不足
**解决方案**: 增加函数内存配置（TTS建议512MB）

### 问题3: 环境变量未生效
**解决方案**: 
- 检查环境变量名称是否正确
- 重新部署函数使环境变量生效

### 问题4: CORS错误
**解决方案**: 
- 检查代码中的CORS头设置
- 在HTTP触发器配置中启用CORS

### 问题5: 无法访问函数
**解决方案**: 
- 检查HTTP触发器是否已创建
- 确认触发器认证方式（如果是匿名访问）
- 检查函数是否已部署

## 后续优化

1. **使用自定义域名**: 绑定自己的域名，更专业
2. **启用日志**: 在函数计算控制台查看执行日志，便于调试
3. **设置告警**: 配置函数执行失败告警
4. **监控**: 使用阿里云监控查看函数调用量、耗时等指标

