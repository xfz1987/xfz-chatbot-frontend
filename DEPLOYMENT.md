# Frontend 部署到 Cloudflare Pages 指南

本文档将指导你一步步将前端应用部署到 Cloudflare Pages。

## 前提条件

- ✅ 已将代码推送到 GitHub 仓库
- ✅ 拥有 Cloudflare 账户
- ✅ 后端已部署到 Cloudflare Workers 并获得 URL

## 部署方式选择

有两种部署方式:
1. **通过 Cloudflare Dashboard** (推荐,更简单直观)
2. **通过 Wrangler CLI** (适合自动化部署)

---

## 方式一: 通过 Cloudflare Dashboard 部署

### 第一步: 登录 Cloudflare Dashboard

访问: https://dash.cloudflare.com/

使用你的 Cloudflare 账户登录。

### 第二步: 创建 Pages 项目

1. 在左侧导航栏选择 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Pages** 标签
4. 点击 **Connect to Git**

### 第三步: 连接 GitHub 仓库

1. 如果首次使用,点击 **Connect GitHub**
2. 授权 Cloudflare 访问你的 GitHub 账户
3. 选择要部署的仓库: `xfz-chatbot-frontend`
4. 点击 **Begin setup**

### 第四步: 配置构建设置

在构建配置页面填写:

#### 基本设置
- **Project name**: `xfz-chatbot-frontend` (或自定义名称)
- **Production branch**: `main` (或 `master`)

#### 构建设置
- **Framework preset**: 选择 `Vite`

  如果没有自动检测,手动配置:
  - **Build command**: `npm run build`
  - **Build output directory**: `dist`

#### 环境变量
点击 **Add variable** 添加:

| Variable name | Value |
|--------------|-------|
| `VITE_GRAPHQL_ENDPOINT` | `https://xfz-chatbot-backend.your-subdomain.workers.dev/graphql` |

> **重要**: 将 URL 替换为你的后端 Worker 实际地址!

### 第五步: 部署

1. 确认所有配置正确
2. 点击 **Save and Deploy**
3. 等待构建完成 (通常 2-5 分钟)

部署成功后,你会看到:
```
✨ Success! Your site is live at:
   https://xfz-chatbot-frontend.pages.dev
```

### 第六步: 测试部署

访问你的网站:
```
https://xfz-chatbot-frontend.pages.dev
```

测试 AI 对话功能:
1. 在输入框输入消息
2. 点击发送
3. 查看 AI 回复

---

## 方式二: 通过 Wrangler CLI 部署

### 第一步: 安装 Wrangler (如果还未安装)

```bash
npm install -g wrangler
```

### 第二步: 登录 Cloudflare

```bash
wrangler login
```

### 第三步: 配置环境变量

创建或编辑 `.env.production`:

```bash
echo "VITE_GRAPHQL_ENDPOINT=https://xfz-chatbot-backend.your-subdomain.workers.dev/graphql" > .env.production
```

> 替换为你的后端 Worker 实际地址

### 第四步: 构建项目

```bash
npm run build
```

检查构建输出:
```bash
ls -la dist/
```

### 第五步: 创建 Pages 项目

```bash
wrangler pages project create xfz-chatbot-frontend
```

### 第六步: 部署

```bash
wrangler pages deploy dist --project-name=xfz-chatbot-frontend
```

部署成功后会显示 URL:
```
✨ Success! Uploaded 15 files
   https://xfz-chatbot-frontend.pages.dev
```

### 第七步: 配置环境变量

```bash
wrangler pages secret put VITE_GRAPHQL_ENDPOINT --project-name=xfz-chatbot-frontend
```

输入后端 GraphQL 端点 URL。

---

## 配置自定义域名

### 在 Dashboard 配置

1. 进入 **Workers & Pages**
2. 选择你的 Pages 项目
3. 点击 **Custom domains** 标签
4. 点击 **Set up a custom domain**
5. 输入你的域名,如: `chat.yourdomain.com`
6. 点击 **Activate domain**

Cloudflare 会自动配置 DNS 记录。

### 验证域名

等待 DNS 传播 (通常几分钟):
```bash
nslookup chat.yourdomain.com
```

访问自定义域名测试:
```
https://chat.yourdomain.com
```

---

## 自动部署设置

### GitHub 集成自动部署

使用 Dashboard 部署方式时,会自动配置:

- ✅ **推送到 main 分支** → 自动部署到生产环境
- ✅ **创建 Pull Request** → 自动创建预览部署
- ✅ **每次提交** → 生成唯一的预览 URL

### 查看部署历史

1. 进入 Pages 项目
2. 点击 **Deployments** 标签
3. 查看所有部署记录
4. 可以回滚到任意版本

---

## 环境变量管理

### 添加环境变量

#### 在 Dashboard:
1. 进入 Pages 项目
2. 点击 **Settings** > **Environment variables**
3. 区分环境:
   - **Production**: 生产环境变量
   - **Preview**: 预览环境变量
4. 点击 **Add variable**

#### 通过 CLI:
```bash
wrangler pages secret put VARIABLE_NAME --project-name=xfz-chatbot-frontend
```

### 查看环境变量

```bash
wrangler pages secret list --project-name=xfz-chatbot-frontend
```

---

## 更新部署

### 方式一: Git 推送自动部署

```bash
git add .
git commit -m "Update: 描述你的修改"
git push
```

Cloudflare 会自动检测推送并重新部署。

### 方式二: 手动重新部署

在 Dashboard:
1. 进入 **Deployments**
2. 点击最新部署的 **Retry deployment**

通过 CLI:
```bash
npm run build
wrangler pages deploy dist --project-name=xfz-chatbot-frontend
```

---

## 预览部署 (Preview Deployments)

### 为分支创建预览

1. 创建新分支:
```bash
git checkout -b feature/new-feature
```

2. 修改代码并推送:
```bash
git push -u origin feature/new-feature
```

3. Cloudflare 会自动创建预览部署

4. 在 Dashboard 或 GitHub PR 中查看预览 URL:
```
https://abc123.xfz-chatbot-frontend.pages.dev
```

---

## 性能优化

### 1. 启用生产优化

确保 `vite.config.ts` 已配置优化:

```typescript
export default defineConfig({
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'apollo-vendor': ['@apollo/client'],
        },
      },
    },
  },
});
```

### 2. 配置 Cache Control

在 Pages 项目根目录创建 `_headers` 文件:

```
/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/index.html
  Cache-Control: public, max-age=0, must-revalidate
```

将 `_headers` 文件放到 `public/` 目录。

### 3. 配置重定向

创建 `public/_redirects`:

```
/*    /index.html   200
```

这确保 React Router 正常工作。

---

## 监控和分析

### 查看访问统计

1. 进入 Pages 项目
2. 点击 **Analytics** 标签
3. 查看:
   - 页面浏览量
   - 访问者数量
   - 请求数
   - 带宽使用

### Web Analytics (可选)

启用 Cloudflare Web Analytics:

1. 在 Dashboard 进入 **Analytics** > **Web Analytics**
2. 创建新站点
3. 获取 tracking code
4. 添加到 `index.html` 的 `<head>` 部分

---

## 常见问题

### Q1: 环境变量不生效

**解决方案**:
1. 确保变量名以 `VITE_` 开头
2. 在 Dashboard 中正确设置环境变量
3. 重新部署:点击 **Retry deployment**

### Q2: 构建失败

**检查事项**:
1. 查看构建日志 (在 Deployments 页面)
2. 确认 `package.json` 中的依赖完整
3. 本地测试构建: `npm run build`

**常见错误**:
```bash
# 如果提示找不到模块
npm install

# 如果 TypeScript 错误
npm run type-check
```

### Q3: 页面白屏

**原因**: 通常是 GraphQL 端点配置错误

**解决方案**:
1. 打开浏览器控制台查看错误
2. 检查环境变量 `VITE_GRAPHQL_ENDPOINT` 是否正确
3. 测试后端 API 是否正常工作

### Q4: CORS 错误

**解决方案**: 在后端 `src/index.ts` 中更新 CORS 配置:

```typescript
cors: {
  origin: 'https://xfz-chatbot-frontend.pages.dev', // 你的前端域名
  credentials: true,
  methods: ['POST', 'GET', 'OPTIONS'],
}
```

重新部署后端。

### Q5: 自定义域名不工作

**检查**:
1. DNS 是否正确配置
2. SSL 证书是否已颁发 (通常几分钟)
3. 使用 `nslookup` 检查 DNS 解析

---

## 回滚部署

### 在 Dashboard 回滚

1. 进入 **Deployments**
2. 找到要回滚的版本
3. 点击 **...** > **Rollback to this deployment**

### 通过 Git 回滚

```bash
git revert HEAD
git push
```

或者回到特定提交:
```bash
git reset --hard <commit-hash>
git push --force
```

---

## 成本

### Cloudflare Pages 定价

**免费版包含**:
- ✅ 无限请求
- ✅ 无限带宽
- ✅ 500 次构建/月
- ✅ 1 次并发构建

**付费版** ($20/月):
- 5,000 次构建/月
- 5 次并发构建
- 更高级的功能

对于个人项目,**免费版完全足够**!

---

## 最终检查清单

部署完成后,检查以下项目:

- [ ] 网站可以正常访问
- [ ] 可以发送消息给 AI
- [ ] AI 能正常回复
- [ ] 样式显示正常
- [ ] 在移动设备上测试
- [ ] 检查浏览器控制台无错误
- [ ] 配置自定义域名 (可选)
- [ ] 设置 Web Analytics (可选)

---

## 下一步优化建议

1. **添加加载状态优化**
   - 骨架屏
   - 加载动画

2. **错误处理改进**
   - 友好的错误提示
   - 重试机制

3. **功能增强**
   - 对话历史保存
   - 支持 Markdown 渲染
   - 代码高亮
   - 多轮对话上下文

4. **性能监控**
   - 添加性能追踪
   - 错误上报

---

## 有用的命令汇总

```bash
# 本地开发
npm run dev

# 构建
npm run build

# 预览构建
npm run preview

# 部署 (CLI)
wrangler pages deploy dist --project-name=xfz-chatbot-frontend

# 查看环境变量
wrangler pages secret list --project-name=xfz-chatbot-frontend

# 设置环境变量
wrangler pages secret put VITE_GRAPHQL_ENDPOINT --project-name=xfz-chatbot-frontend
```

---

## 参考链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Pages 部署配置](https://developers.cloudflare.com/pages/platform/build-configuration/)
- [自定义域名设置](https://developers.cloudflare.com/pages/platform/custom-domains/)
- [环境变量配置](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)

---

## 完成!

🎉 恭喜!你的 AI 对话应用已成功部署到 Cloudflare Pages!

现在你拥有:
- ✅ 全球 CDN 加速的前端
- ✅ 边缘计算的 Serverless 后端
- ✅ 强大的 OpenAI AI 能力

享受你的 AI 对话应用吧! 🚀
