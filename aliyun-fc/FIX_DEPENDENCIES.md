# 修复依赖安装问题

## 问题

即使上传了包含 `package.json` 的 zip 文件，阿里云函数计算仍然报错：
```
Error: Cannot find module 'axios'
```

原因是：**阿里云函数计算不会自动安装依赖**，需要手动安装并打包。

## 解决方案

### 方案A：本地安装依赖并打包 node_modules（推荐，100%有效）

这是最可靠的方法，因为直接包含已安装的依赖。

#### 步骤1：在WSL中准备文件

```bash
# 创建临时目录
cd ~
mkdir voices-proxy-fix
cd voices-proxy-fix

# 复制文件
cp /mnt/d/GitHub/class/aliyun-fc/index-voices.js index.js
cp /mnt/d/GitHub/class/aliyun-fc/package.json package.json

# 验证文件
ls -la
# 应该看到：
# index.js
# package.json
```

#### 步骤2：安装依赖

```bash
# 确保在 voices-proxy-fix 目录中
npm install

# 验证安装成功
ls -la node_modules/axios
# 应该能看到 axios 目录

# 或者
node -e "console.log(require('axios').version)"
# 应该能看到axios版本号
```

#### 步骤3：打包（包含 node_modules）

```bash
# 确保在 voices-proxy-fix 目录中
# 打包整个目录内容（包括 node_modules）
zip -r ../voices-proxy.zip .

# 或者，如果要确保文件在zip根目录：
cd ..
zip -r voices-proxy.zip voices-proxy-fix/

# 验证zip内容
unzip -l voices-proxy.zip | head -20
# 应该能看到：
# index.js
# package.json
# node_modules/...
# node_modules/axios/...
```

**重要：** 这次打包必须包含 `node_modules` 目录！

#### 步骤4：上传到阿里云

1. 进入函数代码页面
2. 上传新的 `voices-proxy.zip`
3. 部署函数
4. 等待部署完成

#### 步骤5：验证

```bash
curl -v https://your-voices-trigger-url
```

如果不再报 "Cannot find module 'axios'"，说明成功。

### 方案B：在阿里云控制台创建 package.json（可能有效）

某些阿里云函数计算版本可能会自动安装，试试这个方法：

#### 步骤1：进入函数代码页面

1. 进入 `voices-proxy` 函数详情页
2. 点击"函数代码"标签

#### 步骤2：检查文件

查看文件列表：
- 是否有 `package.json`？
- 是否有 `node_modules/` 目录？

#### 步骤3：创建 package.json

如果没有 `package.json`：

1. 点击"新建文件"或"创建文件"
2. 文件名：`package.json`
3. 内容：
```json
{
  "name": "azure-tts-aliyun-fc-proxy",
  "version": "1.0.0",
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

#### 步骤4：保存并查看

1. 保存文件
2. 点击"部署"
3. 等待2-3分钟
4. 刷新页面，查看是否有 `node_modules/` 目录

#### 步骤5：如果仍没有 node_modules

说明自动安装不工作，使用方案A。

## 推荐操作流程

### 对于 voices-proxy 函数：

```bash
# 1. 创建目录
cd ~
mkdir voices-proxy-fix
cd voices-proxy-fix

# 2. 复制代码
cp /mnt/d/GitHub/class/aliyun-fc/index-voices.js index.js
cp /mnt/d/GitHub/class/aliyun-fc/package.json package.json

# 3. 安装依赖（关键步骤！）
npm install

# 4. 验证
ls node_modules/axios

# 5. 打包（包含所有内容）
zip -r ../voices-proxy.zip .

# 6. 验证zip内容
cd ..
unzip -l voices-proxy.zip | grep -E "(index.js|package.json|node_modules/axios)"

# 7. 上传到阿里云控制台
```

### 对于 tts-proxy 函数：

同样的步骤，但使用：
- `index-tts.js` 作为 `index.js`
- 打包为 `tts-proxy.zip`

## 注意事项

1. **zip文件大小**：
   - 包含 `node_modules` 后，zip文件会比较大（几MB）
   - 这是正常的，因为包含了所有依赖

2. **上传时间**：
   - 包含 `node_modules` 的zip文件上传和部署可能需要更长时间
   - 请耐心等待

3. **验证依赖**：
   ```bash
   # 上传前，在本地验证
   node -e "const axios = require('axios'); console.log('axios版本:', axios.version || 'OK')"
   ```

## 如果方案A也不行

可能的原因：
1. zip文件结构不对
2. node_modules 没有被正确打包
3. 阿里云环境有问题

检查方法：
```bash
# 解压并验证
mkdir test-unzip
cd test-unzip
unzip ../voices-proxy.zip
ls -la
ls -la node_modules/axios
```

如果 `node_modules/axios` 存在，但阿里云还是报错，可能需要联系阿里云技术支持。

