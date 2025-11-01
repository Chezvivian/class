# 在WSL中安装Node.js和npm

## 问题

执行命令时显示：
```
command nmp not found
```

这有两个可能的原因：
1. **命令拼写错误**：应该是 `npm` 而不是 `nmp`
2. **npm未安装**：WSL中可能没有安装Node.js和npm

## 解决方案

### 步骤1：检查Node.js和npm是否已安装

```bash
# 检查Node.js版本
node --version

# 检查npm版本
npm --version
```

如果显示版本号，说明已安装。如果显示"command not found"，需要安装。

### 步骤2：安装Node.js和npm

#### 方法A：使用NodeSource安装（推荐，简单快捷）

```bash
# 1. 更新系统包
sudo apt update

# 2. 安装Node.js 18.x（与阿里云函数计算匹配）
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# 3. 安装Node.js（会自动包含npm）
sudo apt install -y nodejs

# 4. 验证安装
node --version
npm --version
```

#### 方法B：使用nvm安装（更灵活，可以管理多个版本）

```bash
# 1. 安装nvm（Node Version Manager）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 2. 重新加载shell配置
source ~/.bashrc

# 3. 安装Node.js 18
nvm install 18

# 4. 使用Node.js 18
nvm use 18

# 5. 验证
node --version
npm --version
```

#### 方法C：使用apt安装（简单但版本可能较旧）

```bash
# 1. 更新系统包
sudo apt update

# 2. 安装Node.js和npm
sudo apt install -y nodejs npm

# 3. 验证
node --version
npm --version
```

**注意**：方法C安装的版本可能较旧，建议使用方法A。

### 步骤3：验证安装成功

```bash
# 检查Node.js版本（应该是v18.x.x）
node --version

# 检查npm版本（应该是8.x.x或更高）
npm --version

# 如果两个命令都显示版本号，说明安装成功
```

### 步骤4：安装axios依赖

安装完Node.js和npm后，继续之前的步骤：

```bash
# 1. 进入你的项目目录
cd ~/voices-proxy-local  # 或你创建的目录

# 2. 确保有package.json文件
ls -la package.json

# 3. 安装依赖（注意是npm，不是nmp）
npm install

# 4. 验证axios已安装
ls -la node_modules/axios

# 或者测试
node -e "const axios = require('axios'); console.log('axios版本:', axios.VERSION || 'OK')"
```

## 常见问题

### 问题1：sudo权限不足

如果提示权限不足，确保：
- 你有sudo权限
- 或者使用不需要sudo的nvm方法

### 问题2：网络连接问题

如果下载慢或失败，可以：
- 使用国内镜像（如果在中国）
- 或者使用代理

### 问题3：版本不匹配

确保安装Node.js 18.x（与阿里云函数计算匹配）：
```bash
node --version
# 应该显示 v18.x.x
```

## 快速检查清单

- [ ] Node.js已安装：`node --version` 显示版本
- [ ] npm已安装：`npm --version` 显示版本
- [ ] 版本正确：Node.js是18.x.x
- [ ] 命令正确：使用 `npm install`（不是 `nmp`）

## 如果安装后还是有问题

检查：
1. 是否正确安装了Node.js和npm
2. 是否正确进入了项目目录
3. 是否正确输入了命令（`npm install`，不是 `nmp`）

