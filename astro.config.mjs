// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 必须改成你自己的 GitHub Pages 地址！
  site: 'https://frank-zhi-0804.github.io',
  // 必须加 base: '/'，否则部署到 Pages 会路径错误！
  base: '/',
  integrations: [mdx(), sitemap(), vue()],
});