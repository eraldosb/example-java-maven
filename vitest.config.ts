import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  
  // Configurações de resolução (mesmas do Vite)
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
  
  // Configurações de teste
  test: {
    // Ambiente de teste
    globals: true,
    environment: 'jsdom',
    
    // Arquivos de setup
    setupFiles: ['./src/test/setup.ts'],
    
    // Configurações de CSS
    css: true,
    
    // Configurações de coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/dist/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/*.stories.*',
        '**/stories/**',
        '**/.storybook/**',
      ],
      include: [
        'src/**/*.{ts,tsx}',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        // Thresholds específicos por arquivo
        'src/components/**/*.{ts,tsx}': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        'src/hooks/**/*.{ts,tsx}': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
        'src/utils/**/*.{ts,tsx}': {
          branches: 95,
          functions: 95,
          lines: 95,
          statements: 95,
        },
      },
    },
    
    // Configurações de timeout
    testTimeout: 10000,
    hookTimeout: 10000,
    
    // Configurações de watch
    watch: false,
    
    // Configurações de reporter
    reporter: ['verbose', 'html'],
    
    // Configurações de output
    outputFile: {
      html: './coverage/index.html',
      json: './coverage/coverage.json',
    },
    
    // Configurações de include/exclude
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
      'coverage',
      '**/*.stories.*',
      '**/stories/**',
      '**/.storybook/**',
    ],
    
    // Configurações de pool
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
    
    // Configurações de isolate
    isolate: true,
    
    // Configurações de passWithNoTests
    passWithNoTests: true,
    
    // Configurações de retry
    retry: 2,
    
    // Configurações de bail
    bail: 0,
    
    // Configurações de logHeapUsage
    logHeapUsage: true,
    
    // Configurações de silent
    silent: false,
    
    // Configurações de clearMocks
    clearMocks: true,
    
    // Configurações de restoreMocks
    restoreMocks: true,
    
    // Configurações de mockReset
    mockReset: true,
    
    // Configurações de unmock
    unmock: true,
  },
  
  // Configurações de define
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
})
