import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// GraphQL 端点 URL
// 开发环境使用本地 Workers
// 生产环境使用部署后的 Workers URL
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:8787/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
