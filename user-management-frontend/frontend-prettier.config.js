/** @type {import('prettier').Config} */
export default {
  // Configurações básicas
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  
  // Configurações de formatação
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',
  
  // Configurações específicas por tipo de arquivo
  overrides: [
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
        tabWidth: 2,
        printWidth: 100,
      },
    },
    {
      files: '*.tsx',
      options: {
        parser: 'typescript',
        tabWidth: 2,
        printWidth: 100,
        jsxSingleQuote: true,
      },
    },
    {
      files: '*.js',
      options: {
        parser: 'babel',
        tabWidth: 2,
        printWidth: 100,
      },
    },
    {
      files: '*.jsx',
      options: {
        parser: 'babel',
        tabWidth: 2,
        printWidth: 100,
        jsxSingleQuote: true,
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
        tabWidth: 2,
        printWidth: 100,
      },
    },
    {
      files: '*.jsonc',
      options: {
        parser: 'json5',
        tabWidth: 2,
        printWidth: 100,
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        proseWrap: 'preserve',
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: '*.mdx',
      options: {
        parser: 'mdx',
        proseWrap: 'preserve',
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: '*.yml',
      options: {
        parser: 'yaml',
        tabWidth: 2,
        printWidth: 100,
      },
    },
    {
      files: '*.yaml',
      options: {
        parser: 'yaml',
        tabWidth: 2,
        printWidth: 100,
      },
    },
    {
      files: '*.css',
      options: {
        parser: 'css',
        tabWidth: 2,
        printWidth: 100,
      },
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss',
        tabWidth: 2,
        printWidth: 100,
      },
    },
    {
      files: '*.html',
      options: {
        parser: 'html',
        tabWidth: 2,
        printWidth: 100,
        htmlWhitespaceSensitivity: 'css',
      },
    },
    {
      files: '*.svg',
      options: {
        parser: 'html',
        tabWidth: 2,
        printWidth: 100,
      },
    },
    {
      files: '*.graphql',
      options: {
        parser: 'graphql',
        tabWidth: 2,
        printWidth: 100,
      },
    },
    {
      files: '*.gql',
      options: {
        parser: 'graphql',
        tabWidth: 2,
        printWidth: 100,
      },
    },
  ],
  
  // Plugins
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss',
  ],
  
  // Configurações específicas do plugin de organização de imports
  organizeImportsSkipDestructiveCodeActions: true,
  
  // Configurações específicas do Tailwind CSS
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
}
