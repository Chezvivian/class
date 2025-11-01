# 检查TTS触发器配置

## 关键问题

TTS函数返回405 "Method not allowed"的原因可能是：

1. **HTTP触发器没有配置POST方法**
2. **Event对象格式不对，代码无法识别POST方法**

## 检查步骤

### 步骤1：检查TTS触发器的HTTP方法配置

1. **进入阿里云函数计算控制台**
   - 进入 `tts-proxy` 函数详情页
   - 点击"触发器"标签

2. **检查HTTP触发器配置**
   - 点击TTS函数的HTTP触发器
   - 查看"请求方法"配置
   - **必须勾选：POST**（重要！）
   - 应该勾选：GET, POST, OPTIONS

3. **如果没有勾选POST**
   - 点击"编辑"触发器
   - 确保勾选 **POST**
   - 保存配置

### 步骤2：查看函数日志

1. **进入函数详情页**
   - 点击"日志查询"标签

2. **测试POST请求**
   ```bash
   curl -X POST https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run \
     -H "Content-Type: application/json" \
     -d '{"text":"Hello","voice":"en-US-JennyNeural","format":"wav","sample_rate":16000}'
   ```

3. **查看日志输出**
   - 应该能看到："收到请求，HTTP方法: POST"
   - 如果看到："收到请求，HTTP方法: "（空），说明event格式不对

## 如果触发器配置正确但仍然405

可能是event对象格式问题。我已经更新了代码，添加了：
- 更详细的日志输出
- 多种event格式的支持
- 更清晰的错误信息

需要重新部署函数：
1. 使用更新后的 `index-tts.js`
2. 重新打包并上传
3. 测试POST请求

