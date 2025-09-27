# 🎨 Chakra UI v3 - Regras de Desenvolvimento

## 📋 Visão Geral

Este documento define as regras e padrões para integração e uso do **Chakra UI v3** no frontend do projeto **User Management Application**.

## 🎯 Objetivos

- **Consistência Visual**: Manter design system uniforme
- **Acessibilidade**: Garantir componentes acessíveis
- **Performance**: Otimizar bundle size e renderização
- **Manutenibilidade**: Facilitar customização e extensão
- **Responsividade**: Design adaptável a todos os dispositivos

## 🏗️ Arquitetura Frontend

### Estrutura de Pastas
```
frontend/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ui/              # Componentes base do Chakra
│   │   ├── forms/           # Formulários
│   │   ├── layout/          # Layout components
│   │   └── common/          # Componentes comuns
│   ├── pages/               # Páginas da aplicação
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utilitários
│   ├── theme/               # Configuração do tema
│   ├── types/               # TypeScript types
│   └── constants/           # Constantes
├── public/                  # Arquivos estáticos
└── package.json
```

## 🎨 Padrões de Design System

### 1. Tema e Tokens

#### Configuração do Tema
```typescript
// theme/index.ts
import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
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
      },
      fonts: {
        heading: 'Inter, system-ui, sans-serif',
        body: 'Inter, system-ui, sans-serif',
        mono: 'JetBrains Mono, monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      space: {
        px: '1px',
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
      },
      radii: {
        none: '0',
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
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
    },
    semanticTokens: {
      colors: {
        bg: {
          canvas: 'gray.50',
          default: 'white',
          subtle: 'gray.100',
          muted: 'gray.200',
          emphasized: 'gray.300',
          inverted: 'gray.900',
        },
        fg: {
          default: 'gray.900',
          muted: 'gray.600',
          subtle: 'gray.500',
          inverted: 'white',
        },
        accent: {
          default: 'primary.500',
          emphasized: 'primary.600',
          fg: 'white',
        },
        border: {
          default: 'gray.200',
          emphasized: 'gray.300',
        },
      },
    },
  },
})
```

### 2. Componentes Base

#### Configuração de Componentes
```typescript
// theme/components.ts
export const components = {
  Button: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'md',
      _focus: {
        boxShadow: 'outline',
      },
    },
    variants: {
      solid: {
        bg: 'accent.default',
        color: 'accent.fg',
        _hover: {
          bg: 'accent.emphasized',
        },
        _active: {
          bg: 'accent.emphasized',
        },
      },
      outline: {
        border: '1px solid',
        borderColor: 'border.default',
        color: 'fg.default',
        _hover: {
          bg: 'bg.muted',
        },
      },
      ghost: {
        color: 'fg.default',
        _hover: {
          bg: 'bg.muted',
        },
      },
    },
    sizes: {
      sm: {
        px: 3,
        py: 1,
        fontSize: 'sm',
      },
      md: {
        px: 4,
        py: 2,
        fontSize: 'md',
      },
      lg: {
        px: 6,
        py: 3,
        fontSize: 'lg',
      },
    },
    defaultProps: {
      variant: 'solid',
      size: 'md',
    },
  },
  Input: {
    baseStyle: {
      field: {
        borderRadius: 'md',
        border: '1px solid',
        borderColor: 'border.default',
        _focus: {
          borderColor: 'accent.default',
          boxShadow: '0 0 0 1px var(--chakra-colors-accent-default)',
        },
        _invalid: {
          borderColor: 'error.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-error-500)',
        },
      },
    },
    variants: {
      filled: {
        field: {
          bg: 'bg.muted',
          _hover: {
            bg: 'bg.emphasized',
          },
          _focus: {
            bg: 'white',
          },
        },
      },
    },
    defaultProps: {
      variant: 'outline',
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'lg',
        border: '1px solid',
        borderColor: 'border.default',
        bg: 'bg.default',
        boxShadow: 'sm',
      },
    },
    variants: {
      elevated: {
        container: {
          boxShadow: 'md',
        },
      },
      outline: {
        container: {
          border: '1px solid',
          borderColor: 'border.default',
        },
      },
    },
    defaultProps: {
      variant: 'elevated',
    },
  },
}
```

## 📝 Padrões de Componentes

### 1. Nomenclatura

#### Convenções
- **Componentes**: PascalCase (`UserCard`, `LoginForm`)
- **Props**: camelCase (`isLoading`, `onSubmit`)
- **Variantes**: kebab-case (`primary-button`, `large-input`)
- **Tokens**: kebab-case (`primary-500`, `font-size-lg`)

### 2. Estrutura de Componentes

#### Template Base
```typescript
// components/ui/Button.tsx
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface ButtonProps extends ChakraButtonProps {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  loadingText?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'solid', size = 'md', ...props }, ref) => {
    return (
      <ChakraButton
        ref={ref}
        variant={variant}
        size={size}
        {...props}
      >
        {children}
      </ChakraButton>
    )
  }
)

Button.displayName = 'Button'
```

### 3. Formulários

#### Padrão de Formulário
```typescript
// components/forms/UserForm.tsx
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Idade mínima é 18 anos'),
})

type UserFormData = z.infer<typeof userSchema>

interface UserFormProps {
  onSubmit: (data: UserFormData) => void
  isLoading?: boolean
  defaultValues?: Partial<UserFormData>
}

export const UserForm = ({ onSubmit, isLoading, defaultValues }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  })

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nome</FormLabel>
          <Input
            {...register('name')}
            placeholder="Digite o nome"
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register('email')}
            placeholder="Digite o email"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.age}>
          <FormLabel>Idade</FormLabel>
          <Input
            type="number"
            {...register('age', { valueAsNumber: true })}
            placeholder="Digite a idade"
          />
          <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Salvando..."
        >
          Salvar Usuário
        </Button>
      </VStack>
    </Box>
  )
}
```

## 🎨 Padrões de Layout

### 1. Grid System

#### Layout Responsivo
```typescript
// components/layout/PageLayout.tsx
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react'

interface PageLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
}

export const PageLayout = ({ children, sidebar, header }: PageLayoutProps) => {
  return (
    <Box minH="100vh" bg="bg.canvas">
      {header && (
        <Box as="header" bg="bg.default" borderBottom="1px solid" borderColor="border.default">
          <Container maxW="container.xl" py={4}>
            {header}
          </Container>
        </Box>
      )}
      
      <Container maxW="container.xl" py={8}>
        <Grid
          templateColumns={{ base: '1fr', lg: sidebar ? '300px 1fr' : '1fr' }}
          gap={8}
          minH="calc(100vh - 200px)"
        >
          {sidebar && (
            <GridItem>
              <Box
                position={{ lg: 'sticky' }}
                top={8}
                bg="bg.default"
                borderRadius="lg"
                p={6}
                border="1px solid"
                borderColor="border.default"
                boxShadow="sm"
              >
                {sidebar}
              </Box>
            </GridItem>
          )}
          
          <GridItem>
            <VStack spacing={6} align="stretch">
              {children}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
```

### 2. Responsividade

#### Breakpoints
```typescript
// theme/breakpoints.ts
export const breakpoints = {
  base: '0px',
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1280px',
  '2xl': '1536px',
}

// Uso em componentes
const ResponsiveGrid = () => (
  <Grid
    templateColumns={{
      base: '1fr',
      md: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)',
      xl: 'repeat(4, 1fr)',
    }}
    gap={6}
  >
    {/* Grid items */}
  </Grid>
)
```

## 🚀 Padrões de Performance

### 1. Lazy Loading

#### Componentes Lazy
```typescript
// utils/lazy.tsx
import { lazy, Suspense } from 'react'
import { Spinner, Box } from '@chakra-ui/react'

const LazyComponent = lazy(() => import('./HeavyComponent'))

export const LazyWrapper = () => (
  <Suspense
    fallback={
      <Box display="flex" justifyContent="center" py={8}>
        <Spinner size="lg" />
      </Box>
    }
  >
    <LazyComponent />
  </Suspense>
)
```

### 2. Memoização

#### Componentes Otimizados
```typescript
// components/ui/OptimizedCard.tsx
import { memo } from 'react'
import { Card, CardProps } from '@chakra-ui/react'

interface OptimizedCardProps extends CardProps {
  title: string
  description: string
  onAction?: () => void
}

export const OptimizedCard = memo<OptimizedCardProps>(
  ({ title, description, onAction, ...props }) => {
    return (
      <Card {...props}>
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <CardBody>
          <Text>{description}</Text>
        </CardBody>
        {onAction && (
          <CardFooter>
            <Button onClick={onAction}>Ação</Button>
          </CardFooter>
        )}
      </Card>
    )
  }
)

OptimizedCard.displayName = 'OptimizedCard'
```

## ♿ Padrões de Acessibilidade

### 1. ARIA Labels

#### Componentes Acessíveis
```typescript
// components/ui/AccessibleButton.tsx
import { Button, ButtonProps } from '@chakra-ui/react'

interface AccessibleButtonProps extends ButtonProps {
  ariaLabel?: string
  ariaDescribedBy?: string
}

export const AccessibleButton = ({
  ariaLabel,
  ariaDescribedBy,
  children,
  ...props
}: AccessibleButtonProps) => {
  return (
    <Button
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...props}
    >
      {children}
    </Button>
  )
}
```

### 2. Focus Management

#### Navegação por Teclado
```typescript
// hooks/useFocusManagement.ts
import { useRef, useEffect } from 'react'

export const useFocusManagement = (isOpen: boolean) => {
  const triggerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.focus()
    } else if (!isOpen && triggerRef.current) {
      triggerRef.current.focus()
    }
  }, [isOpen])

  return { triggerRef, contentRef }
}
```

## 🧪 Padrões de Testes

### 1. Testes de Componentes

#### Testing Library + Chakra
```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../components/ui/Button'

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when loading', () => {
    render(<Button isLoading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### 2. Testes de Acessibilidade

#### Jest Axe
```typescript
// __tests__/accessibility/Button.test.tsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '../components/ui/Button'

expect.extend(toHaveNoViolations)

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

## 📦 Configuração do Projeto

### 1. Package.json

#### Dependências
```json
{
  "dependencies": {
    "@chakra-ui/react": "^3.0.0",
    "@chakra-ui/system": "^3.0.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "framer-motion": "^10.16.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.47.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.0",
    "jest-axe": "^7.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 2. TypeScript Config

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```

## 🔄 Integração com Backend

### 1. API Client

#### Configuração do Cliente
```typescript
// utils/api.ts
import { createApiClient } from '@chakra-ui/react'

const apiClient = createApiClient({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const userApi = {
  getAll: () => apiClient.get('/users'),
  getById: (id: string) => apiClient.get(`/users/${id}`),
  create: (data: CreateUserRequest) => apiClient.post('/users', data),
  update: (id: string, data: UpdateUserRequest) => apiClient.put(`/users/${id}`, data),
  delete: (id: string) => apiClient.delete(`/users/${id}`),
}
```

### 2. Estado Global

#### Context API + Chakra
```typescript
// context/AppContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

interface AppState {
  user: User | null
  isLoading: boolean
  error: string | null
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  if (state.isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" />
      </Box>
    )
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
```

## ✅ Checklist de Desenvolvimento

### Antes de Criar Componentes
- [ ] Definir variantes e tamanhos necessários
- [ ] Configurar tokens de design apropriados
- [ ] Implementar acessibilidade (ARIA, focus)
- [ ] Adicionar testes unitários
- [ ] Documentar props e exemplos de uso

### Code Review
- [ ] Componente segue padrões de nomenclatura
- [ ] Props são tipadas corretamente
- [ ] Acessibilidade implementada
- [ ] Performance otimizada (memo, lazy)
- [ ] Testes cobrem casos principais
- [ ] Responsividade testada

### Deploy
- [ ] Bundle size otimizado
- [ ] Imagens otimizadas
- [ ] Lazy loading implementado
- [ ] Error boundaries configurados
- [ ] Analytics configurado

## 🎯 Métricas de Qualidade

### Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB gzipped

### Acessibilidade
- **WCAG 2.1 AA**: 100% conformidade
- **Keyboard Navigation**: Funcional
- **Screen Reader**: Compatível
- **Color Contrast**: Mínimo 4.5:1

### Código
- **TypeScript Coverage**: 100%
- **Test Coverage**: > 80%
- **ESLint Errors**: 0
- **Bundle Analyzer**: Otimizado

---

**🎨 Chakra UI v3 - Design System Completo e Acessível!**
