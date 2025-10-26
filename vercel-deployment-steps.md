# Vercel 部署完整流程

## 当前步骤：项目配置

当 Vercel 询问 "what's the name of your existing project?" 时：

### 选择 1：创建新项目（推荐）
```
? What's the name of your existing project? 
> aliyun-tts-proxy
```

### 选择 2：如果询问是否链接到现有项目
```
? Link to existing project? (y/N)
> N
```

### 选择 3：项目名称
```
? What's your project's name? 
> aliyun-tts-proxy
```

## 后续配置步骤

### 1. 框架检测
```
? In which directory is your code located? 
> ./
```

### 2. 构建命令
```
? Want to override the settings? (y/N)
> N
```

### 3. 环境变量配置
部署完成后，需要在 Vercel Dashboard 中配置：

1. 访问 https://vercel.com/dashboard
2. 选择您的项目
3. 进入 Settings → Environment Variables
4. 添加以下变量：

| 变量名 | 值 | 说明 |
|--------|----|----|
| `ALIYUN_AK_ID` | 你的AccessKey ID | 阿里云访问密钥ID |
| `ALIYUN_AK_SECRET` | 你的AccessKey Secret | 阿里云访问密钥Secret |
| `NLS_APP_KEY` | 你的AppKey | 智能语音交互项目AppKey |

### 4. 重新部署
```bash
vercel --prod
```

## 项目结构检查

确保您的项目目录包含以下文件：
```
class/
├── api/
│   ├── token.js
│   └── tts.js
├── vercel.json
└── package.json (重命名自 package-vercel.json)
```

## 常见问题

### Q: 如果提示找不到项目文件？
A: 确保您在正确的目录中，并且 API 文件已创建

### Q: 如果部署失败？
A: 检查 vercel.json 配置和 API 文件语法

### Q: 如何测试部署？
A: 部署完成后，访问 `https://your-project.vercel.app/api/token` 测试
