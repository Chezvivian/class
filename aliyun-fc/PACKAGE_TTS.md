# 打包 tts-proxy 函数

## 步骤

### 步骤1：创建目录并复制文件

在WSL中：

```bash
# 1. 创建目录
cd ~
mkdir tts-proxy-local
cd tts-proxy-local

# 2. 复制文件（根据你的实际路径调整）
cp /mnt/d/GitHub/class/aliyun-fc/index-tts.js index.js
cp /mnt/d/GitHub/class/aliyun-fc/package.json package.json

# 3. 验证文件已复制
ls -la
# 应该能看到：
# index.js
# package.json
```

### 步骤2：安装依赖

```bash
# 确保在 tts-proxy-local 目录中
# 安装依赖
npm install

# 4. 验证依赖已安装
ls -la node_modules/axios
# 应该能看到 axios 目录

# 或者测试
node -e "const axios = require('axios'); console.log('axios版本:', axios.VERSION || 'installed')"
```

### 步骤3：打包所有内容（包括 node_modules）

```bash
# 确保在 tts-proxy-local 目录中
# 打包整个目录（包括 node_modules）
zip -r ../tts-proxy.zip .

# 验证zip内容
cd ..
unzip -l tts-proxy.zip | grep -E "(index.js|package.json|node_modules/axios)"
# 应该能看到：
# index.js
# package.json
# node_modules/axios/...
```

### 步骤4：上传到阿里云

1. **进入函数代码页面**
   - 进入 `tts-proxy` 函数详情页
   - 点击"函数代码"标签

2. **上传zip文件**
   - 选择"上传zip包"或"上传代码包"
   - 上传 `tts-proxy.zip`（包含 node_modules）
   - 点击"部署"

3. **等待部署完成**
   - 包含 node_modules 的zip文件会比较大（几MB）
   - 上传和部署可能需要更长时间

### 步骤5：测试

```bash
# 测试TTS API（POST请求）
curl -v -X POST https://your-tts-trigger-url \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello, world!","voice":"en-US-JennyNeural","format":"wav","sample_rate":16000}'
```

如果返回音频数据或不再报 "Cannot find module 'axios'"，说明成功！

## 快速命令汇总

```bash
# 1. 创建目录
cd ~ && mkdir tts-proxy-local && cd tts-proxy-local

# 2. 复制文件
cp /mnt/d/GitHub/class/aliyun-fc/index-tts.js index.js
cp /mnt/d/GitHub/class/aliyun-fc/package.json package.json

# 3. 安装依赖
npm install

# 4. 打包
zip -r ../tts-proxy.zip .

# 5. 验证
cd .. && unzip -l tts-proxy.zip | grep -E "(index.js|package.json|node_modules/axios)"

# 6. 上传到阿里云控制台
```

## 注意事项

1. **文件名必须是 index.js**
   - 复制的是 `index-tts.js`，但保存为 `index.js`
   - 这是阿里云函数计算的要求

2. **zip文件会比较大**
   - 包含 node_modules 后，zip文件会比较大（几MB）
   - 这是正常的

3. **上传时间**
   - 大文件上传和部署可能需要更长时间
   - 请耐心等待

## 验证清单

- [ ] 创建了 `tts-proxy-local` 目录
- [ ] 复制了 `index-tts.js` 并重命名为 `index.js`
- [ ] 复制了 `package.json`
- [ ] 执行了 `npm install`（依赖已安装）
- [ ] 打包了包含 `node_modules` 的zip文件
- [ ] 上传到阿里云并部署
- [ ] 测试不再报 "Cannot find module 'axios'" 错误

完成这些步骤后，tts-proxy 函数就应该可以正常工作了！

