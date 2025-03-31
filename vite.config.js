import { join, resolve } from 'path';
import { defineConfig } from 'vite';

import pages, { getRollupInput } from 'vite-mpa';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import createSvgSpritePlugin from 'vite-plugin-svg-spriter';

import pug from './plugins/pug/vite-plugin-pug.js';

const rootDir = resolve(__dirname, 'src');
const pagesDir = resolve(rootDir, 'pug/pages/');
const svgDir = resolve(rootDir, 'img/sprite/');
// const svgOutDir = resolve(__dirname, 'public/img');
const publicDir = resolve(__dirname, 'public');
const root = './src';
const port = 8080;

// запуск сборки с анализом зависимостей
// yarn vite --debug --force 2>&1 | tee vite.log

export default defineConfig(({ command }) => {
  const isDev = command !== 'build';
  return {
    plugins: [
      pug(),
      createSvgSpritePlugin({
        svgFolder: svgDir,
        svgSpriteConfig: {
          shape: {
            transform: ['svgo'],
          },
        },
        transformIndexHtmlTag: {
          injectTo: 'body',
        },
      }),
      pages(isDev),
      chunkSplitPlugin({
        strategy: 'default',
        customSplitting: {},
      }),
    ],

    optimizeDeps: {
      include: [],
    },

    publicDir,

    root,
    base: '/dist/',

    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },

    build: {
      outDir: resolve(__dirname, 'dist'),
      rollupOptions: {
        input: getRollupInput({ root, rootDir, port, pagesDir }, isDev),
      },
      emptyOutDir: false,
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: true,
        mangle: false,
      },
    },

    server: {
      port,
      open: '/pug/pages/main/',
    },

    resolve: {
      alias: {
        pages: join(rootDir, 'pages'),
      },
    },
  };
});
