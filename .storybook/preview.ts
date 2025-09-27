import type { Preview } from '@storybook/react'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '../chakra.config'
import { withThemeByClassName } from '@storybook/addon-themes'

// Importar estilos globais
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    // Configurações de ações
    actions: { argTypesRegex: '^on[A-Z].*' },
    
    // Configurações de controles
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    
    // Configurações de acessibilidade
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
          {
            id: 'focus-management',
            enabled: true,
          },
        ],
      },
    },
    
    // Configurações de viewport
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    
    // Configurações de backgrounds
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
    
    // Configurações de docs
    docs: {
      toc: true,
      source: {
        type: 'dynamic',
      },
    },
    
    // Configurações de layout
    layout: 'centered',
    
    // Configurações de tema
    themes: {
      default: 'light',
      list: [
        {
          name: 'light',
          title: 'Light',
          class: 'light-theme',
          color: '#ffffff',
        },
        {
          name: 'dark',
          title: 'Dark',
          class: 'dark-theme',
          color: '#1a1a1a',
        },
      ],
    },
  },
  
  // Decoradores globais
  decorators: [
    (Story) => (
      <ChakraProvider value={system}>
        <Story />
      </ChakraProvider>
    ),
    withThemeByClassName({
      themes: {
        light: 'light-theme',
        dark: 'dark-theme',
      },
      defaultTheme: 'light',
    }),
  ],
  
  // Configurações de argTypes
  argTypes: {
    // Ocultar props internas do React
    children: {
      table: {
        disable: true,
      },
    },
    ref: {
      table: {
        disable: true,
      },
    },
    key: {
      table: {
        disable: true,
      },
    },
    // Configurações específicas do Chakra UI
    sx: {
      table: {
        disable: true,
      },
    },
    __css: {
      table: {
        disable: true,
      },
    },
    css: {
      table: {
        disable: true,
      },
    },
  },
}

export default preview
