import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index',title:'内部文件登记系统' },
  ],
  fastRefresh: {},
  history: { type: "hash" },
  base: './',
  publicPath: './',
  hash: true,
});
