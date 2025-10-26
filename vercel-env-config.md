# Vercel 环境变量配置

## 必需的环境变量

在 Vercel 项目设置中添加以下环境变量：

### 1. ALIYUN_AK_ID
- **描述**: 阿里云 AccessKey ID
- **获取方式**: 登录阿里云控制台 → RAM访问控制 → 用户 → 创建AccessKey
- **示例**: `LTAI5tPzwZ1dB68mbeh9Ycb4`

### 2. ALIYUN_AK_SECRET  
- **描述**: 阿里云 AccessKey Secret
- **获取方式**: 同上，创建AccessKey时获得
- **示例**: `your_access_key_secret_here`

### 3. NLS_APP_KEY
- **描述**: 智能语音交互应用的AppKey
- **获取方式**: 阿里云控制台 → 智能语音交互 → 项目管理 → 创建项目
- **示例**: `CshIybgPtK7eGmNX`

## 配置步骤

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 进入 Settings → Environment Variables
4. 添加上述三个环境变量
5. 确保所有环境（Production, Preview, Development）都设置了这些变量

## 安全建议

- 定期轮换 AccessKey
- 使用最小权限原则，只授予必要的权限
- 监控 API 调用量和费用
- 设置使用量告警

## 权限配置

确保您的阿里云 AccessKey 具有以下权限：
- `AliyunNLSFullAccess` - 智能语音交互服务权限
- 或者自定义权限包含：
  - `nls:CreateToken`
  - `nls:Synthesize`
