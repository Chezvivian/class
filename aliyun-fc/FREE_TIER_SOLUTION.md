# 免费版函数计算依赖解决方案

## 问题

使用免费版或标准版阿里云函数计算时：
- ❌ 不支持自定义依赖层
- ✅ 只支持官方公共层
- ❌ 上传的 `package.json` 不会被使用

## 解决方案：本地安装依赖并打包

由于不支持自定义层，需要在**本地安装依赖**，然后将 `node_modules` 一起打包上传。

### 步骤1：在本地安装依赖

在WSL中：

```bash
# 1. 创建目录
cd ~
mkdir voices-proxy-local
cd voices-proxy-local

# 2. 复制文件
cp /mnt/d/GitHub/class/aliyun-fc/index-voices.js index.js
cp /mnt/d/GitHub/class/aliyun-fc/package.json package.json

# 3. 安装依赖（关键！）
npm install

# 4. 验证依赖已安装
ls -la node_modules/axios
# 应该能看到 axios 目录

# 测试一下
node -e "const axios = require('axios'); console.log('axios OK:', axios.VERSION || 'installed')"
```

### 步骤2：打包所有内容（包括 node_modules）

```bash
# 确保在 voices-proxy-local 目录中
# 打包整个目录（包括 node_modules）
zip -r ../voices-proxy.zip .

# 验证zip内容
cd ..
unzip -l voices-proxy.zip | grep -E "(index.js|package.json|node_modules/axios)"
# 应该能看到：
# index.js
# package.json
# node_modules/axios/...
```

### 步骤3：上传到阿里云

1. **进入函数代码页面**
   - 进入 `voices-proxy` 函数
   - 点击"函数代码"标签

2. **上传zip文件**
   - 选择"上传zip包"或"上传代码包"
   - 上传 `voices-proxy.zip`（包含 node_modules）
   - 点击"部署"

3. **等待部署完成**
   - 包含 node_modules 的zip文件会比较大（几MB）
   - 上传和部署可能需要更长时间

### 步骤4：测试

```bash
curl -v https://your-voices-trigger-url
```

如果不再报 "Cannot find module 'axios'"，说明成功！

## 对于 tts-proxy 函数

同样的步骤：

```bash
# 1. 创建目录
mkdir tts-proxy-local
cd tts-proxy-local

# 2. 复制文件
cp /mnt/d/GitHub/class/aliyun-fc/index-tts.js index.js
cp /mnt/d/GitHub/class/aliyun-fc/package.json package.json

# 3. 安装依赖
npm install

# 4. 打包
zip -r ../tts-proxy.zip .

# 5. 上传到阿里云
```

## 为什么这个方案有效？

- ✅ **包含已安装的依赖**：`node_modules` 中已经有 `axios`
- ✅ **不需要依赖层**：直接包含在代码包中
- ✅ **适用于免费版**：不依赖专有版服务
- ✅ **100%可靠**：依赖直接打包在代码中

## 注意事项

1. **zip文件大小**
   - 包含 `node_modules` 后，zip文件会比较大（几MB）
   - 这是正常的，axios 及其依赖会被包含

2. **上传时间**
   - 大文件上传和部署可能需要更长时间
   - 请耐心等待

3. **依赖更新**
   - 如果需要更新 `axios` 版本
   - 需要在本地重新 `npm install` 并重新打包上传

4. **优化（可选）**
   - 如果需要减小zip大小，可以只打包必要的依赖
   - 但通常不需要，axios 很小

## 验证清单

- [ ] 在本地执行了 `npm install`
- [ ] 验证了 `node_modules/axios` 存在
- [ ] zip文件包含 `node_modules` 目录
- [ ] 上传到阿里云并部署
- [ ] 测试不再报 "Cannot find module 'axios'"

## 如果还是不工作

检查：

1. **zip文件结构**
   ```bash
   unzip -l voices-proxy.zip | head -20
   ```
   确保看到 `node_modules/` 目录

2. **文件内容**
   ```bash
   mkdir test-unzip
   cd test-unzip
   unzip ../voices-proxy.zip
   ls -la node_modules/axios
   ```
   确保 `node_modules/axios` 存在且有内容

3. **上传方式**
   - 确保使用"上传zip包"而不是其他方式
   - 确保上传后点击了"部署"

## 总结

由于免费版限制，**必须本地安装依赖并打包 node_modules**。

步骤：
1. 本地 `npm install` ✅
2. 打包包含 `node_modules` 的 zip ✅
3. 上传到阿里云 ✅
4. 测试 ✅

这是唯一可靠的方法（对于免费版）。

