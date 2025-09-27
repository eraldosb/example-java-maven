import { defineConfig } from '@chakra-ui/react'

/**
 * Configuração de Componentes Customizados para Chakra UI v3
 * 
 * Este arquivo define componentes customizados que estendem
 * os componentes base do Chakra UI com estilos específicos
 * para o User Management Application.
 */

export const components = defineConfig({
  // Botão Customizado
  Button: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'md',
      transition: 'all 0.2s',
      _focus: {
        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        boxShadow: 'none',
      },
    },
    variants: {
      solid: {
        bg: 'accent.default',
        color: 'accent.fg',
        _hover: {
          bg: 'accent.emphasized',
          transform: 'translateY(-1px)',
          boxShadow: 'md',
        },
        _active: {
          bg: 'accent.emphasized',
          transform: 'translateY(0)',
        },
      },
      outline: {
        border: '2px solid',
        borderColor: 'border.default',
        color: 'fg.default',
        bg: 'transparent',
        _hover: {
          bg: 'bg.muted',
          borderColor: 'accent.default',
          color: 'accent.default',
        },
        _active: {
          bg: 'bg.emphasized',
        },
      },
      ghost: {
        color: 'fg.default',
        bg: 'transparent',
        _hover: {
          bg: 'bg.muted',
          color: 'accent.default',
        },
        _active: {
          bg: 'bg.emphasized',
        },
      },
      link: {
        color: 'accent.default',
        bg: 'transparent',
        textDecoration: 'underline',
        _hover: {
          color: 'accent.emphasized',
          textDecoration: 'none',
        },
      },
    },
    sizes: {
      xs: {
        px: 2,
        py: 1,
        fontSize: 'xs',
        minH: '6',
      },
      sm: {
        px: 3,
        py: 1.5,
        fontSize: 'sm',
        minH: '8',
      },
      md: {
        px: 4,
        py: 2,
        fontSize: 'md',
        minH: '10',
      },
      lg: {
        px: 6,
        py: 3,
        fontSize: 'lg',
        minH: '12',
      },
      xl: {
        px: 8,
        py: 4,
        fontSize: 'xl',
        minH: '14',
      },
    },
    defaultProps: {
      variant: 'solid',
      size: 'md',
    },
  },

  // Input Customizado
  Input: {
    baseStyle: {
      field: {
        borderRadius: 'md',
        border: '2px solid',
        borderColor: 'border.default',
        bg: 'bg.default',
        transition: 'all 0.2s',
        _hover: {
          borderColor: 'border.emphasized',
        },
        _focus: {
          borderColor: 'accent.default',
          boxShadow: '0 0 0 1px var(--chakra-colors-accent-default)',
        },
        _invalid: {
          borderColor: 'error.default',
          boxShadow: '0 0 0 1px var(--chakra-colors-error-default)',
        },
        _disabled: {
          bg: 'bg.muted',
          cursor: 'not-allowed',
          opacity: 0.6,
        },
      },
    },
    variants: {
      outline: {
        field: {
          border: '2px solid',
          borderColor: 'border.default',
        },
      },
      filled: {
        field: {
          bg: 'bg.muted',
          border: '2px solid',
          borderColor: 'transparent',
          _hover: {
            bg: 'bg.emphasized',
          },
          _focus: {
            bg: 'bg.default',
            borderColor: 'accent.default',
          },
        },
      },
      flushed: {
        field: {
          border: 'none',
          borderBottom: '2px solid',
          borderColor: 'border.default',
          borderRadius: '0',
          px: 0,
          _focus: {
            borderColor: 'accent.default',
            boxShadow: 'none',
          },
        },
      },
      unstyled: {
        field: {
          bg: 'transparent',
          border: 'none',
          px: 0,
          _focus: {
            boxShadow: 'none',
          },
        },
      },
    },
    sizes: {
      xs: {
        field: {
          px: 2,
          py: 1,
          fontSize: 'xs',
          minH: '6',
        },
      },
      sm: {
        field: {
          px: 3,
          py: 1.5,
          fontSize: 'sm',
          minH: '8',
        },
      },
      md: {
        field: {
          px: 4,
          py: 2,
          fontSize: 'md',
          minH: '10',
        },
      },
      lg: {
        field: {
          px: 6,
          py: 3,
          fontSize: 'lg',
          minH: '12',
        },
      },
    },
    defaultProps: {
      variant: 'outline',
      size: 'md',
    },
  },

  // Card Customizado
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'lg',
        border: '1px solid',
        borderColor: 'border.default',
        bg: 'bg.default',
        boxShadow: 'sm',
        overflow: 'hidden',
      },
    },
    variants: {
      elevated: {
        container: {
          boxShadow: 'md',
          _hover: {
            boxShadow: 'lg',
            transform: 'translateY(-2px)',
            transition: 'all 0.2s',
          },
        },
      },
      outline: {
        container: {
          border: '2px solid',
          borderColor: 'border.default',
          boxShadow: 'none',
        },
      },
      filled: {
        container: {
          bg: 'bg.muted',
          border: 'none',
          boxShadow: 'none',
        },
      },
      unstyled: {
        container: {
          bg: 'transparent',
          border: 'none',
          boxShadow: 'none',
          borderRadius: 'none',
        },
      },
    },
    defaultProps: {
      variant: 'elevated',
    },
  },

  // Modal Customizado
  Modal: {
    baseStyle: {
      overlay: {
        bg: 'blackAlpha.600',
        backdropFilter: 'blur(4px)',
      },
      dialog: {
        borderRadius: 'xl',
        boxShadow: '2xl',
        bg: 'bg.default',
        border: '1px solid',
        borderColor: 'border.default',
      },
      header: {
        px: 6,
        py: 4,
        borderBottom: '1px solid',
        borderColor: 'border.default',
        fontSize: 'lg',
        fontWeight: 'semibold',
      },
      body: {
        px: 6,
        py: 4,
      },
      footer: {
        px: 6,
        py: 4,
        borderTop: '1px solid',
        borderColor: 'border.default',
      },
    },
  },

  // Table Customizado
  Table: {
    baseStyle: {
      table: {
        borderCollapse: 'separate',
        borderSpacing: 0,
      },
      th: {
        bg: 'bg.muted',
        color: 'fg.default',
        fontWeight: 'semibold',
        textTransform: 'none',
        letterSpacing: 'normal',
        borderBottom: '1px solid',
        borderColor: 'border.default',
      },
      td: {
        borderBottom: '1px solid',
        borderColor: 'border.default',
      },
      caption: {
        color: 'fg.muted',
        fontSize: 'sm',
        fontWeight: 'medium',
      },
    },
    variants: {
      simple: {
        th: {
          borderBottom: '1px solid',
          borderColor: 'border.default',
        },
        td: {
          borderBottom: '1px solid',
          borderColor: 'border.default',
        },
      },
      striped: {
        th: {
          borderBottom: '1px solid',
          borderColor: 'border.default',
        },
        td: {
          borderBottom: '1px solid',
          borderColor: 'border.default',
        },
        tbody: {
          tr: {
            '&:nth-of-type(odd)': {
              bg: 'bg.muted',
            },
          },
        },
      },
      unstyled: {
        th: {
          borderBottom: 'none',
        },
        td: {
          borderBottom: 'none',
        },
      },
    },
    defaultProps: {
      variant: 'simple',
    },
  },

  // Badge Customizado
  Badge: {
    baseStyle: {
      borderRadius: 'full',
      px: 2,
      py: 1,
      textTransform: 'none',
      fontSize: 'xs',
      fontWeight: 'medium',
    },
    variants: {
      solid: {
        bg: 'accent.default',
        color: 'accent.fg',
      },
      subtle: {
        bg: 'accent.50',
        color: 'accent.700',
      },
      outline: {
        border: '1px solid',
        borderColor: 'accent.default',
        color: 'accent.default',
        bg: 'transparent',
      },
    },
    defaultProps: {
      variant: 'subtle',
    },
  },

  // Alert Customizado
  Alert: {
    baseStyle: {
      container: {
        borderRadius: 'md',
        px: 4,
        py: 3,
      },
      title: {
        fontWeight: 'semibold',
        fontSize: 'sm',
      },
      description: {
        fontSize: 'sm',
        opacity: 0.8,
      },
    },
    variants: {
      subtle: {
        container: {
          bg: 'bg.muted',
        },
      },
      'left-accent': {
        container: {
          borderLeft: '4px solid',
          borderColor: 'accent.default',
          bg: 'bg.muted',
        },
      },
      'top-accent': {
        container: {
          borderTop: '4px solid',
          borderColor: 'accent.default',
          bg: 'bg.muted',
        },
      },
      solid: {
        container: {
          bg: 'accent.default',
          color: 'accent.fg',
        },
      },
    },
    defaultProps: {
      variant: 'subtle',
    },
  },

  // Spinner Customizado
  Spinner: {
    baseStyle: {
      color: 'accent.default',
    },
    sizes: {
      xs: {
        w: 3,
        h: 3,
      },
      sm: {
        w: 4,
        h: 4,
      },
      md: {
        w: 6,
        h: 6,
      },
      lg: {
        w: 8,
        h: 8,
      },
      xl: {
        w: 12,
        h: 12,
      },
    },
    defaultProps: {
      size: 'md',
    },
  },

  // Progress Customizado
  Progress: {
    baseStyle: {
      track: {
        bg: 'bg.muted',
        borderRadius: 'full',
      },
      filledTrack: {
        bg: 'accent.default',
        borderRadius: 'full',
        transition: 'width 0.3s ease',
      },
    },
    variants: {
      solid: {
        filledTrack: {
          bg: 'accent.default',
        },
      },
      subtle: {
        filledTrack: {
          bg: 'accent.200',
        },
      },
    },
    defaultProps: {
      variant: 'solid',
    },
  },

  // Tooltip Customizado
  Tooltip: {
    baseStyle: {
      bg: 'gray.800',
      color: 'white',
      borderRadius: 'md',
      px: 3,
      py: 2,
      fontSize: 'sm',
      fontWeight: 'medium',
      boxShadow: 'lg',
      maxW: 'xs',
    },
  },

  // Popover Customizado
  Popover: {
    baseStyle: {
      content: {
        bg: 'bg.default',
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 'lg',
        boxShadow: 'xl',
        p: 0,
        overflow: 'hidden',
      },
      header: {
        px: 4,
        py: 3,
        borderBottom: '1px solid',
        borderColor: 'border.default',
        fontSize: 'sm',
        fontWeight: 'semibold',
      },
      body: {
        px: 4,
        py: 3,
      },
      footer: {
        px: 4,
        py: 3,
        borderTop: '1px solid',
        borderColor: 'border.default',
      },
    },
  },
})

export default components
