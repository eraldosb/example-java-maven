import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.story.@(js|jsx|mjs|ts|tsx)',
  ],
  
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-toolbars',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-highlight',
    '@storybook/addon-themes',
  ],
  
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  
  docs: {
    autodocs: 'tag',
  },
  
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
          '@components': resolve(__dirname, '../src/components'),
          '@pages': resolve(__dirname, '../src/pages'),
          '@hooks': resolve(__dirname, '../src/hooks'),
          '@utils': resolve(__dirname, '../src/utils'),
          '@types': resolve(__dirname, '../src/types'),
          '@constants': resolve(__dirname, '../src/constants'),
          '@assets': resolve(__dirname, '../src/assets'),
          '@theme': resolve(__dirname, '../src/theme'),
        },
      },
    })
  },
}

export default config
