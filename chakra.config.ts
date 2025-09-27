import { createSystem, defaultConfig } from '@chakra-ui/react'

/**
 * Configuração do Chakra UI v3 para User Management Application
 * 
 * Este arquivo define o sistema de design completo incluindo:
 * - Tokens de design (cores, tipografia, espaçamento)
 * - Componentes customizados
 * - Tema semântico
 * - Configurações de acessibilidade
 */

export const system = createSystem(defaultConfig, {
  theme: {
    // Tokens de Design
    tokens: {
      // Paleta de Cores
      colors: {
        // Cores Primárias (Azul)
        primary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3', // Cor principal
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        
        // Cores Secundárias (Roxo)
        secondary: {
          50: '#F3E5F5',
          100: '#E1BEE7',
          200: '#CE93D8',
          300: '#BA68C8',
          400: '#AB47BC',
          500: '#9C27B0', // Cor secundária
          600: '#8E24AA',
          700: '#7B1FA2',
          800: '#6A1B9A',
          900: '#4A148C',
        },
        
        // Cores de Status
        success: {
          50: '#E8F5E8',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        
        error: {
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#E53935',
          700: '#D32F2C',
          800: '#C62828',
          900: '#B71C1C',
        },
        
        warning: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
        },
        
        info: {
          50: '#E1F5FE',
          100: '#B3E5FC',
          200: '#81D4FA',
          300: '#4FC3F7',
          400: '#29B6F6',
          500: '#03A9F4',
          600: '#039BE5',
          700: '#0288D1',
          800: '#0277BD',
          900: '#01579B',
        },
        
        // Cores Neutras
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
      
      // Tipografia
      fonts: {
        heading: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        body: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        mono: 'JetBrains Mono, "Fira Code", Consolas, "Liberation Mono", Menlo, Courier, monospace',
      },
      
      // Tamanhos de Fonte
      fontSizes: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        md: '1rem',       // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
        '6xl': '3.75rem', // 60px
        '7xl': '4.5rem',  // 72px
        '8xl': '6rem',    // 96px
        '9xl': '8rem',    // 128px
      },
      
      // Pesos de Fonte
      fontWeights: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      
      // Alturas de Linha
      lineHeights: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
      },
      
      // Espaçamento
      space: {
        px: '1px',
        0: '0',
        0.5: '0.125rem', // 2px
        1: '0.25rem',    // 4px
        1.5: '0.375rem', // 6px
        2: '0.5rem',     // 8px
        2.5: '0.625rem', // 10px
        3: '0.75rem',    // 12px
        3.5: '0.875rem', // 14px
        4: '1rem',       // 16px
        5: '1.25rem',    // 20px
        6: '1.5rem',     // 24px
        7: '1.75rem',    // 28px
        8: '2rem',       // 32px
        9: '2.25rem',    // 36px
        10: '2.5rem',    // 40px
        11: '2.75rem',   // 44px
        12: '3rem',      // 48px
        14: '3.5rem',    // 56px
        16: '4rem',      // 64px
        20: '5rem',      // 80px
        24: '6rem',      // 96px
        28: '7rem',      // 112px
        32: '8rem',      // 128px
        36: '9rem',      // 144px
        40: '10rem',     // 160px
        44: '11rem',     // 176px
        48: '12rem',     // 192px
        52: '13rem',     // 208px
        56: '14rem',     // 224px
        60: '15rem',     // 240px
        64: '16rem',     // 256px
        72: '18rem',     // 288px
        80: '20rem',     // 320px
        96: '24rem',     // 384px
      },
      
      // Raios de Borda
      radii: {
        none: '0',
        sm: '0.125rem',   // 2px
        base: '0.25rem',  // 4px
        md: '0.375rem',   // 6px
        lg: '0.5rem',     // 8px
        xl: '0.75rem',    // 12px
        '2xl': '1rem',    // 16px
        '3xl': '1.5rem',  // 24px
        full: '9999px',
      },
      
      // Sombras
      shadows: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
      
      // Breakpoints
      breakpoints: {
        base: '0px',
        sm: '480px',
        md: '768px',
        lg: '992px',
        xl: '1280px',
        '2xl': '1536px',
      },
      
      // Z-Index
      zIndices: {
        hide: -1,
        auto: 'auto',
        base: 0,
        docked: 10,
        dropdown: 1000,
        sticky: 1100,
        banner: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        skipLink: 1600,
        toast: 1700,
        tooltip: 1800,
      },
    },
    
    // Tokens Semânticos
    semanticTokens: {
      colors: {
        // Backgrounds
        bg: {
          canvas: 'gray.50',
          default: 'white',
          subtle: 'gray.100',
          muted: 'gray.200',
          emphasized: 'gray.300',
          inverted: 'gray.900',
        },
        
        // Foregrounds
        fg: {
          default: 'gray.900',
          muted: 'gray.600',
          subtle: 'gray.500',
          inverted: 'white',
        },
        
        // Accent Colors
        accent: {
          default: 'primary.500',
          emphasized: 'primary.600',
          fg: 'white',
        },
        
        // Borders
        border: {
          default: 'gray.200',
          emphasized: 'gray.300',
        },
        
        // Status Colors
        success: {
          default: 'success.500',
          emphasized: 'success.600',
          fg: 'white',
        },
        
        error: {
          default: 'error.500',
          emphasized: 'error.600',
          fg: 'white',
        },
        
        warning: {
          default: 'warning.500',
          emphasized: 'warning.600',
          fg: 'white',
        },
        
        info: {
          default: 'info.500',
          emphasized: 'info.600',
          fg: 'white',
        },
      },
    },
  },
  
  // Configuração de Componentes
  globalCss: {
    body: {
      bg: 'bg.canvas',
      color: 'fg.default',
      fontFamily: 'body',
      lineHeight: 'normal',
    },
    '*': {
      borderColor: 'border.default',
    },
    '*::placeholder': {
      color: 'fg.muted',
    },
  },
  
  // Configurações de Acessibilidade
  config: {
    cssVarPrefix: 'chakra',
    respectReducedMotion: true,
    disableTransitionOnChange: false,
  },
})

// Exportar o sistema para uso na aplicação
export default system
