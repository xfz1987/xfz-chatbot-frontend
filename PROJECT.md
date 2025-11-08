# XFZ Chatbot - 前端项目

基于 React + TypeScript 的 AI 对话应用前端，部署在 Cloudflare Pages 上。

## 技术选型

### 核心框架
- **React 18** - 现代化的 UI 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 快速的前端构建工具

### GraphQL 客户端
- **Apollo Client** - 强大的 GraphQL 客户端
- **@apollo/client** - React 集成
- **GraphQL** - 查询语言

### 部署平台
- **Cloudflare Pages** - 全球 CDN 加速的静态网站托管

## 项目结构

```
frontend/
├── src/
│   ├── graphql/          # GraphQL 相关配置
│   │   ├── client.ts     # Apollo Client 配置
│   │   ├── queries.ts    # GraphQL 查询
│   │   └── mutations.ts  # GraphQL 变更
│   ├── components/       # React 组件
│   ├── App.tsx           # 主应用组件
│   └── main.tsx          # 应用入口
├── public/               # 静态资源
├── .env.example          # 环境变量示例
├── vite.config.ts        # Vite 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 项目依赖
```

## 环境变量配置

复制 `.env.example` 为 `.env` 并配置:

```bash
cp .env.example .env
```

配置项:
- `VITE_GRAPHQL_ENDPOINT` - GraphQL API 端点
  - 开发环境: `http://localhost:8787/graphql`
  - 生产环境: `https://your-worker.workers.dev/graphql`

## 开发指南

### 安装依赖

```bash
npm install
```

### 本地开发

启动开发服务器 (默认运行在 http://localhost:5173):

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 部署到 Cloudflare Pages

### 方式一: 通过 Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** 服务
3. 点击 **Create a project**
4. 连接你的 GitHub 仓库
5. 配置构建设置:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. 添加环境变量:
   - `VITE_GRAPHQL_ENDPOINT`: 你的 Worker GraphQL 端点
7. 点击 **Save and Deploy**

### 方式二: 通过 Wrangler CLI

1. 安装 Wrangler:
```bash
npm install -g wrangler
```

2. 登录 Cloudflare:
```bash
wrangler login
```

3. 创建 Pages 项目:
```bash
wrangler pages project create xfz-chatbot-frontend
```

4. 部署:
```bash
npm run build
wrangler pages deploy dist --project-name=xfz-chatbot-frontend
```

### 配置自定义域名

1. 在 Cloudflare Pages 项目设置中
2. 进入 **Custom domains**
3. 添加你的域名
4. 按照提示配置 DNS 记录

## GraphQL 客户端使用

### 查询示例

```typescript
import { useQuery } from '@apollo/client';
import { HELLO_QUERY } from './graphql/queries';

function HelloComponent() {
  const { loading, error, data } = useQuery(HELLO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{data.hello}</div>;
}
```

### 变更(Mutation)示例

```typescript
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from './graphql/mutations';

function ChatComponent() {
  const [sendMessage, { loading, error, data }] = useMutation(SEND_MESSAGE);

  const handleSend = async (message: string) => {
    await sendMessage({
      variables: { message }
    });
  };

  return (
    <button onClick={() => handleSend('Hello AI!')}>
      Send Message
    </button>
  );
}
```

## 性能优化建议

1. **代码分割**: 使用 React.lazy() 进行组件懒加载
2. **缓存策略**: 配置 Apollo Client 的缓存策略
3. **图片优化**: 使用 WebP 格式，配置响应式图片
4. **CDN 缓存**: 利用 Cloudflare Pages 的全球 CDN
5. **预加载**: 关键资源使用 `<link rel="preload">`

## 常见问题

### CORS 错误

确保后端 Worker 配置了正确的 CORS 头:
```typescript
cors: {
  origin: 'https://your-frontend.pages.dev',
  credentials: true,
}
```

### 环境变量不生效

- Vite 环境变量必须以 `VITE_` 开头
- 修改环境变量后需要重启开发服务器
- Cloudflare Pages 需要在 Dashboard 中配置环境变量

### 构建失败

- 检查 Node.js 版本 (建议 18+)
- 清理依赖重新安装: `rm -rf node_modules package-lock.json && npm install`
- 检查 TypeScript 类型错误: `npm run type-check`

## 相关链接

- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Apollo Client 文档](https://www.apollographql.com/docs/react/)
- [Vite 文档](https://vitejs.dev/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)

## 开发规范

### 组件开发
- 使用函数组件和 Hooks
- 组件文件名使用 PascalCase
- 一个文件一个组件

### TypeScript
- 为所有函数参数和返回值添加类型
- 避免使用 `any` 类型
- 使用接口(interface)定义对象类型

### 样式
- 推荐使用 CSS Modules 或 styled-components
- 遵循 BEM 命名规范(如使用普通 CSS)

### Git 提交
- 遵循 Conventional Commits 规范
- 提交前运行 lint 和类型检查
