import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Habilitar Fast Refresh
      fastRefresh: true,
      // Configurações do Babel
      babel: {
        plugins: [
          // Plugin para otimização de imports
          ['babel-plugin-import', {
            libraryName: '@chakra-ui/react',
            libraryDirectory: 'dist',
            camel2DashComponentName: false,
          }],
        ],
      },
    }),
  ],
  
  // Configurações de resolução
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@types': resolve(__dirname, 'src/types'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@theme': resolve(__dirname, 'src/theme'),
    },
  },
  
  // Configurações do servidor de desenvolvimento
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    proxy: {
      // Proxy para API do backend
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  
  // Configurações de preview
  preview: {
    port: 4173,
    host: true,
    open: true,
  },
  
  // Configurações de build
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        // Chunking strategy para otimização
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chakra-vendor': ['@chakra-ui/react', '@chakra-ui/system', '@emotion/react', '@emotion/styled'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'utils-vendor': ['axios', 'date-fns', 'lodash-es'],
        },
        // Naming strategy
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|gif|svg)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`
          }
          return `assets/[name]-[hash].${ext}`
        },
      },
    },
    // Configurações do Terser
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Limite de aviso para bundle size
    chunkSizeWarningLimit: 1000,
  },
  
  // Configurações de CSS
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  
  // Configurações de otimização
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@chakra-ui/react',
      '@chakra-ui/system',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
  
  // Configurações de ambiente
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  
  // Configurações de teste
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/dist/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  
  // Configurações de plugins adicionais
  plugins: [
    react(),
    // Plugin para análise de bundle (apenas em build)
    ...(process.env.ANALYZE === 'true' ? [
      // Plugin de análise de bundle seria adicionado aqui
    ] : []),
  ],
})
