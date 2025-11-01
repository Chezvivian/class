# 调试POST请求问题

## 当前状态

✅ **POST方法已勾选**（从截图可以看到GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH都已勾选）

但仍然返回405错误，可能的原因：
1. Event对象格式问题
2. 函数代码无法正确识别POST方法
3. 需要重新部署函数（使用更新后的代码）

## 调试步骤

### 步骤1：查看函数日志

在阿里云控制台：

1. **进入tts-proxy函数详情页**
2. **点击"日志查询"标签**
3. **执行一个POST测试请求**：
   ```bash
   curl -X POST https://tts-proxy-ranjwtrycj.ap-northeast-1.fcapp.run \
     -H "Content-Type: application/json" \
     -d '{"text":"Hello","voice":"en-US-JennyNeural","format":"wav","sample_rate":16000}'
   ```
4. **查看日志输出**：
   - 应该能看到："收到请求，HTTP方法: POST"
   - 或者："收到请求，HTTP方法: "（空，说明识别失败）
   - 或者："Event对象: ..."（可以看到event的实际格式）

### 步骤2：重新部署函数（使用更新后的代码）

我已经更新了代码，添加了更详细的日志。重新打包并部署：

```bash
# 在WSL中
cd ~/tts-proxy-local

# 复制更新后的代码
cp /mnt/d/GitHub/class/aliyun-fc/index-tts.js index.js

# 确保依赖已安装
npm install

# 重新打包
zip -r ../tts-proxy.zip .

# 上传到阿里云并部署
```

### 步骤3：测试并查看日志

重新部署后，再次测试POST请求，查看日志中的：
- "收到请求，HTTP方法: ?"
- "Event对象: ..."

这些信息可以帮助我们了解event的实际格式。

## 可能的解决方案

如果日志显示HTTP方法为空或不是POST，可能是event格式问题。根据日志信息，我们可能需要：

1. **调整代码以适配event格式**
2. **或者检查触发器的配置**

请先查看函数日志，告诉我看到的：
- "收到请求，HTTP方法:" 后面显示的是什么？
- "Event对象:" 显示了什么内容？

这样我可以根据实际情况修复代码。

