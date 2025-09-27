import { addons } from '@storybook/manager-api'
import { themes } from '@storybook/theming'

// Configuração do tema do Storybook
addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'User Management UI',
    brandUrl: 'https://github.com/your-username/user-management-app',
    brandImage: undefined,
    brandTarget: '_self',
    
    // Cores do tema
    colorPrimary: '#2196F3',
    colorSecondary: '#9C27B0',
    
    // Cores de UI
    appBg: '#ffffff',
    appContentBg: '#ffffff',
    appPreviewBg: '#ffffff',
    appBorderColor: '#e0e0e0',
    appBorderRadius: 4,
    
    // Cores de texto
    textColor: '#333333',
    textInverseColor: '#ffffff',
    textMutedColor: '#666666',
    
    // Cores de barra de ferramentas
    barTextColor: '#333333',
    barSelectedColor: '#2196F3',
    barBg: '#f5f5f5',
    
    // Cores de input
    inputBg: '#ffffff',
    inputBorder: '#e0e0e0',
    inputTextColor: '#333333',
    inputBorderRadius: 4,
    
    // Cores de botão
    buttonBg: '#2196F3',
    buttonBorder: 'transparent',
    booleanBg: '#f5f5f5',
    booleanSelectedBg: '#2196F3',
  },
  
  // Configurações do painel
  panelPosition: 'bottom',
  
  // Configurações de inicialização
  initialActive: 'sidebar',
  
  // Configurações de sidebar
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
  
  // Configurações de toolbar
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
  
  // Configurações de addons
  addons: {
    'storybook/backgrounds': {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
    'storybook/viewport': {
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
  },
})
