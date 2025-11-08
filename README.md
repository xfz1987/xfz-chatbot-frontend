# XFZ Chatbot Frontend

基于 React + TypeScript + GraphQL 的 AI 对话应用前端,部署在 Cloudflare Pages。

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Apollo Client** - GraphQL 客户端
- **Cloudflare Pages** - 部署平台

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件,配置 GraphQL 端点:
```
VITE_GRAPHQL_ENDPOINT=http://localhost:8787/graphql
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
src/
├── graphql/          # GraphQL 配置
│   ├── client.ts     # Apollo Client
│   ├── queries.ts    # GraphQL 查询
│   └── mutations.ts  # GraphQL 变更
├── components/       # React 组件
├── App.tsx          # 主应用
└── main.tsx         # 入口文件
```

## 部署

### Cloudflare Pages

1. 连接 GitHub 仓库到 Cloudflare Pages
2. 配置构建设置:
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
3. 设置环境变量 `VITE_GRAPHQL_ENDPOINT`
4. 部署

详细说明请查看 [PROJECT.md](PROJECT.md)

## 相关链接

- [后端仓库](https://github.com/YOUR_USERNAME/xfz-chatbot-backend)
- [项目文档](PROJECT.md)

## License

MIT
