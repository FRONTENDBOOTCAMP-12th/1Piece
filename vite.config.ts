import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { reactClickToComponent } from 'vite-plugin-react-click-to-component';

const viteConfig = defineConfig(() => {
  return {
    base: '/',
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      reactClickToComponent(),
    ],
    server: {
      host: 'localhost',
      port: 3000,
      cors: true,
    },
    preview: {
      host: 'localhost',
      port: 8080,
      cors: true,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  };
});

export default viteConfig;
