# 快速修复：Cannot find module 'axios'

## 问题

日志显示错误：
```
Error: Cannot find module 'axios'
```

## 原因

代码中使用了 `axios` 库，但没有安装依赖。阿里云函数计算需要 `package.json` 文件来安装依赖。

## 解决方案

### 方法1：上传包含 package.json 的 zip 文件（推荐）

#### 对于 voices-proxy 函数：

1. **创建两个文件**：

   **文件1：`index.js`**
   - 复制 `aliyun-fc/index-voices.js` 的全部内容
   - 保存为 `index.js`

   **文件2：`package.json`**
   - 复制 `aliyun-fc/package.json` 的全部内容：
   ```json
   {
     "name": "azure-tts-aliyun-fc-proxy",
     "version": "1.0.0",
     "dependencies": {
       "axios": "^1.6.0"
     }
   }
   ```
   - 保存为 `package.json`

2. **打包成zip文件**：
   ```bash
   # 在WSL或命令行中
   zip voices-proxy.zip index.js package.json
   ```

3. **上传到阿里云**：
   - 进入 `voices-proxy` 函数详情页
   - 点击"函数代码"标签
   - 选择"上传zip包"或"上传代码包"
   - 上传 `voices-proxy.zip`
   - 点击"部署"

#### 对于 tts-proxy 函数：

步骤相同，但使用：
- `aliyun-fc/index-tts.js` 作为 `index.js`
- 打包为 `tts-proxy.zip`

### 方法2：使用阿里云的依赖安装功能（如果有）

某些阿里云函数计算界面可能支持：
1. 在代码编辑器中直接编辑 `package.json`
2. 点击"安装依赖"按钮

### 验证

上传后：
1. 等待部署完成（可能需要1-2分钟安装依赖）
2. 再次使用 curl 测试：
   ```bash
   curl -v https://your-voices-trigger-url
   ```
3. 查看函数日志，确认没有 "Cannot find module" 错误

## 注意事项

- ✅ 必须包含 `package.json` 文件
- ✅ 文件名必须是 `index.js`（不是 `index-voices.js`）
- ✅ zip 文件中的 `package.json` 必须包含 `axios` 依赖
- ✅ 上传后等待依赖安装完成再测试

## 如果仍然失败

1. **检查 package.json 格式**：
   - 确保是有效的 JSON
   - 确保包含 `axios` 依赖

2. **查看部署日志**：
   - 在函数详情页查看依赖安装是否成功
   - 确认 Node.js 版本兼容（需要 Node.js 18）

3. **尝试重新部署**：
   - 删除旧版本
   - 重新上传 zip 文件

