# 修复 axios 依赖问题

## 问题

即使上传了包含 `package.json` 的 zip 文件，仍然报错：
```
Error: Cannot find module 'axios'
```

## 可能的原因

1. **zip文件结构不对**：文件可能在子目录中
2. **package.json格式问题**：可能有隐藏字符或格式错误
3. **依赖安装失败**：阿里云可能没有自动安装依赖
4. **上传方式问题**：可能需要使用特定的上传方式

## 解决方案

### 方案1：检查zip文件结构（最重要）

zip文件的结构应该是这样的：
```
voices-proxy.zip
├── index.js
└── package.json
```

**不要**是这样的（常见错误）：
```
voices-proxy.zip
└── voices-proxy/
    ├── index.js
    └── package.json
```

#### 在WSL中正确打包：

```bash
# 方法1：在目录外打包（推荐）
cd ~
mkdir temp-voices
cd temp-voices

# 复制文件
cp /mnt/d/GitHub/class/aliyun-fc/index-voices.js index.js
cp /mnt/d/GitHub/class/aliyun-fc/package.json package.json

# 验证文件
ls -la
# 应该看到：
# index.js
# package.json

# 打包（在目录外打包，这样文件在zip的根目录）
zip voices-proxy.zip index.js package.json

# 验证zip内容
unzip -l voices-proxy.zip
# 应该看到：
# index.js
# package.json
# （不要有 voices-proxy/ 前缀）
```

### 方案2：直接在阿里云控制台创建 package.json

如果zip上传后依赖仍不安装，可以在阿里云控制台直接创建：

1. 进入函数详情页 → "函数代码"
2. 如果看到文件列表，应该能看到：
   - `index.js`
   - `package.json`（如果上传了）

3. 如果没有 `package.json`：
   - 点击"新建文件"或"创建文件"
   - 文件名：`package.json`
   - 内容：
   ```json
   {
     "name": "azure-tts-aliyun-fc-proxy",
     "version": "1.0.0",
     "dependencies": {
       "axios": "^1.6.0"
     }
   }
   ```

4. 保存后，系统会自动安装依赖（可能需要几分钟）

### 方案3：使用阿里云的依赖安装功能

某些阿里云函数计算版本可能支持：

1. 在函数代码页面
2. 查看是否有"安装依赖"或"npm install"按钮
3. 点击后系统会自动安装 package.json 中的依赖

### 方案4：检查部署日志

查看依赖安装是否成功：

1. 进入函数详情页
2. 点击"日志查询"
3. 查看部署相关的日志
4. 查找是否有 "npm install" 或依赖安装的信息
5. 如果有错误，查看具体的错误信息

### 方案5：验证 package.json 格式

确保 package.json 格式正确：

```bash
# 在WSL中验证JSON格式
cat package.json | python3 -m json.tool
# 或者
node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8')); console.log('Valid JSON')"
```

如果报错，说明JSON格式有问题。

### 方案6：手动测试 package.json

在WSL中测试 package.json 是否能正常工作：

```bash
# 创建测试目录
mkdir test-axios
cd test-axios

# 复制package.json
cp /mnt/d/GitHub/class/aliyun-fc/package.json .

# 安装依赖
npm install

# 验证axios是否安装
node -e "console.log(require('axios').version)"

# 如果成功，应该能看到axios的版本号
```

### 方案7：使用内联依赖（临时方案）

如果以上方法都不行，可以考虑：

1. 不使用 axios，改用 Node.js 原生的 `https` 模块
2. 或者使用内置的 fetch（Node.js 18+）

但这需要修改代码，不推荐作为首选方案。

## 推荐步骤

1. **首先验证zip文件结构**：
   ```bash
   unzip -l voices-proxy.zip
   ```
   确保文件直接在zip根目录，不在子目录中

2. **如果结构不对，重新打包**：
   ```bash
   # 在包含 index.js 和 package.json 的目录中
   zip ../voices-proxy.zip index.js package.json
   ```

3. **上传并等待**：
   - 上传 zip 文件
   - 等待 2-3 分钟让依赖安装
   - 查看部署日志确认依赖安装成功

4. **如果还是失败，使用方案2**：
   - 在阿里云控制台直接创建 package.json 文件

5. **查看日志**：
   - 确认是否有依赖安装的日志
   - 如果有错误，根据错误信息调整

## 验证方法

上传后，等待几分钟，然后查看：

1. **函数代码页面**：是否能看到 `node_modules` 目录（说明依赖已安装）

2. **日志查询**：是否有 "Installing dependencies" 或类似信息

3. **测试调用**：使用 curl 测试，如果不再报 "Cannot find module"，说明成功了

