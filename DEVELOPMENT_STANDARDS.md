# Padrões de Desenvolvimento e Boas Práticas

**Autor:** Agente de Desenvolvimento  
**Data:** 2024-01-15  
**Versão:** 1.0.0  

## Resumo Executivo

Este documento estabelece os padrões de desenvolvimento, boas práticas e guidelines para o projeto User Management Application. Os padrões cobrem desde convenções de código até arquitetura, testes e documentação.

### Objetivos:
- **Consistência**: Código uniforme e previsível
- **Qualidade**: Alta qualidade e manutenibilidade
- **Produtividade**: Desenvolvimento eficiente
- **Colaboração**: Facilita trabalho em equipe
- **Escalabilidade**: Suporte ao crescimento do projeto

## Convenções de Código

### Java - Backend

#### Nomenclatura
```java
// Classes: PascalCase
public class UserController { }

// Métodos: camelCase
public User createUser(User user) { }

// Variáveis: camelCase
String userName = "João";
boolean isActive = true;

// Constantes: UPPER_SNAKE_CASE
public static final String DEFAULT_EMAIL = "admin@example.com";

// Packages: lowercase
package com.example.usermanagement.controller;
```

#### Estrutura de Classes
```java
@RestController
@RequestMapping("/api/users")
@Validated
@Slf4j
public class UserController {
    
    // 1. Campos
    private final UserService userService;
    
    // 2. Construtores
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    // 3. Métodos públicos
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        // implementação
    }
    
    // 4. Métodos privados
    private void validateUser(User user) {
        // implementação
    }
}
```

#### Anotações Spring Boot
```java
// Controllers
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
@Validated

// Services
@Service
@Transactional
@Slf4j

// Repositories
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // métodos customizados
}

// Entities
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100)
    private String name;
}
```

### TypeScript/React - Frontend

#### Nomenclatura
```typescript
// Componentes: PascalCase
export const UserTable: React.FC<UserTableProps> = ({ users }) => { }

// Funções: camelCase
const handleUserEdit = (user: User) => { }

// Variáveis: camelCase
const isLoading = false;
const userList = [];

// Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8080/api';

// Interfaces: PascalCase
interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
}
```

#### Estrutura de Componentes
```typescript
import React from 'react'
import { ComponentProps } from './types'

interface ComponentProps {
  // props definition
}

export const Component: React.FC<ComponentProps> = ({
  prop1,
  prop2,
  onAction,
}) => {
  // 1. Hooks
  const [state, setState] = useState()
  const { data } = useQuery()
  
  // 2. Event handlers
  const handleAction = useCallback(() => {
    // implementation
  }, [])
  
  // 3. Effects
  useEffect(() => {
    // side effects
  }, [])
  
  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

## Arquitetura e Design Patterns

### Backend Patterns

#### 1. Repository Pattern
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByActiveTrue();
    
    @Query("SELECT u FROM User u WHERE u.age BETWEEN :minAge AND :maxAge")
    List<User> findByAgeBetween(@Param("minAge") Integer minAge, 
                                @Param("maxAge") Integer maxAge);
}
```

#### 2. Service Layer Pattern
```java
@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email já está em uso");
        }
        return userRepository.save(user);
    }
}
```

#### 3. DTO Pattern
```java
public class CreateUserRequest {
    @NotBlank(message = "Nome é obrigatório")
    private String name;
    
    @Email(message = "Email inválido")
    private String email;
    
    // getters, setters, constructors
}

public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    
    // getters, setters, constructors
}
```

### Frontend Patterns

#### 1. Custom Hooks Pattern
```typescript
export const useUsers = (filters?: UserFilters) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => userService.getUsers(filters),
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  
  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast({
        title: 'Usuário criado com sucesso!',
        status: 'success',
      })
    },
  })
}
```

#### 2. Compound Components Pattern
```typescript
const UserForm = {
  Root: UserFormRoot,
  Field: UserFormField,
  Submit: UserFormSubmit,
}

// Usage
<UserForm.Root onSubmit={handleSubmit}>
  <UserForm.Field name="name" label="Nome" />
  <UserForm.Field name="email" label="Email" />
  <UserForm.Submit>Criar Usuário</UserForm.Submit>
</UserForm.Root>
```

#### 3. Render Props Pattern
```typescript
interface DataFetcherProps<T> {
  url: string;
  children: (data: T, loading: boolean, error: Error | null) => React.ReactNode;
}

export const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [url],
    queryFn: () => fetch(url).then(res => res.json()),
  })
  
  return <>{children(data, isLoading, error)}</>
}
```

## Validação e Tratamento de Erros

### Backend Validation

#### Bean Validation
```java
@Entity
public class User {
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    private String name;
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ter formato válido")
    private String email;
    
    @Min(value = 0, message = "Idade deve ser maior ou igual a 0")
    @Max(value = 120, message = "Idade deve ser menor ou igual a 120")
    private Integer age;
}
```

#### Custom Validators
```java
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneValidator.class)
public @interface ValidPhone {
    String message() default "Telefone inválido";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

public class PhoneValidator implements ConstraintValidator<ValidPhone, String> {
    private static final Pattern PHONE_PATTERN = 
        Pattern.compile("^\\(\\d{2}\\)\\s?\\d{4,5}-?\\d{4}$");
    
    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        if (phone == null || phone.isEmpty()) return true;
        return PHONE_PATTERN.matcher(phone).matches();
    }
}
```

#### Global Exception Handler
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(FieldError::getDefaultMessage)
            .collect(Collectors.toList());
            
        ErrorResponse error = new ErrorResponse("Dados inválidos", errors);
        return ResponseEntity.badRequest().body(error);
    }
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage());
        return ResponseEntity.badRequest().body(error);
    }
}
```

### Frontend Validation

#### Form Validation with Yup
```typescript
const userSchema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: yup
    .string()
    .required('Email é obrigatório')
    .email('Formato de email inválido'),
  phone: yup
    .string()
    .nullable()
    .test('phone-format', 'Formato de telefone inválido', (value) => {
      if (!value) return true
      const phoneRegex = /^(\(\d{2}\)\s?\d{4,5}-?\d{4}|\d{10,11})$/
      return phoneRegex.test(value)
    }),
  age: yup
    .number()
    .required('Idade é obrigatória')
    .min(0, 'Idade deve ser maior ou igual a 0')
    .max(120, 'Idade deve ser menor ou igual a 120')
    .integer('Idade deve ser um número inteiro'),
})
```

#### Error Boundary
```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <Box textAlign="center" py={10}>
          <Text fontSize="xl" color="red.500">
            Algo deu errado!
          </Text>
          <Button mt={4} onClick={() => window.location.reload()}>
            Recarregar página
          </Button>
        </Box>
      )
    }
    
    return this.props.children
  }
}
```

## Testes

### Backend Testing

#### Unit Tests
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void shouldCreateUser_WhenValidData() {
        // Given
        User user = new User("João Silva", "joao@email.com");
        when(userRepository.existsByEmail("joao@email.com")).thenReturn(false);
        when(userRepository.save(user)).thenReturn(user);
        
        // When
        User result = userService.createUser(user);
        
        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("João Silva");
        verify(userRepository).save(user);
    }
    
    @Test
    void shouldThrowException_WhenEmailExists() {
        // Given
        User user = new User("João Silva", "joao@email.com");
        when(userRepository.existsByEmail("joao@email.com")).thenReturn(true);
        
        // When & Then
        assertThatThrownBy(() -> userService.createUser(user))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("Email já está em uso: joao@email.com");
    }
}
```

#### Integration Tests
```java
@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@Transactional
@Rollback
class UserControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldCreateUser_WhenValidRequest() {
        // Given
        CreateUserRequest request = new CreateUserRequest(
            "João Silva", "joao@email.com", "11999999999", 30
        );
        
        // When
        ResponseEntity<User> response = restTemplate.postForEntity(
            "/api/users", request, User.class
        );
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getName()).isEqualTo("João Silva");
        
        Optional<User> savedUser = userRepository.findByEmail("joao@email.com");
        assertThat(savedUser).isPresent();
    }
}
```

### Frontend Testing

#### Component Tests
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { UserForm } from './UserForm'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ChakraProvider>
  )
}

describe('UserForm', () => {
  test('renders form fields correctly', () => {
    render(
      <UserForm isOpen={true} onClose={jest.fn()} mode="create" />,
      { wrapper: createWrapper() }
    )
    
    expect(screen.getByLabelText('Nome *')).toBeInTheDocument()
    expect(screen.getByLabelText('Email *')).toBeInTheDocument()
    expect(screen.getByLabelText('Telefone')).toBeInTheDocument()
    expect(screen.getByLabelText('Idade *')).toBeInTheDocument()
  })
  
  test('validates required fields', async () => {
    render(
      <UserForm isOpen={true} onClose={jest.fn()} mode="create" />,
      { wrapper: createWrapper() }
    )
    
    fireEvent.click(screen.getByText('Criar Usuário'))
    
    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    })
  })
})
```

#### Hook Tests
```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUsers } from './useUsers'
import { userService } from '../services/api'

jest.mock('../services/api')
const mockUserService = userService as jest.Mocked<typeof userService>

describe('useUsers', () => {
  test('fetches users successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'João Silva', email: 'joao@email.com', active: true, createdAt: '2024-01-15T10:30:00' }
    ]
    
    mockUserService.getUsers.mockResolvedValue(mockUsers)
    
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
    
    const { result } = renderHook(() => useUsers(), { wrapper })
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    
    expect(result.current.data).toEqual(mockUsers)
  })
})
```

## Performance e Otimização

### Backend Performance

#### Database Optimization
```java
// Indexes
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_email", columnList = "email"),
    @Index(name = "idx_user_active", columnList = "active"),
    @Index(name = "idx_user_age", columnList = "age")
})
public class User {
    // entity definition
}

// Pagination
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findByActiveTrue(Pageable pageable);
    Page<User> findByNameContainingIgnoreCase(String name, Pageable pageable);
}

// Service with pagination
@Service
public class UserService {
    public Page<User> getUsers(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return userRepository.findAll(pageable);
    }
}
```

#### Caching
```java
@Service
public class UserService {
    
    @Cacheable(value = "users", key = "#id")
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    @CacheEvict(value = "users", key = "#user.id")
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    
    @CacheEvict(value = "users", allEntries = true)
    public void clearCache() {
        // Cache cleared
    }
}
```

### Frontend Performance

#### Code Splitting
```typescript
// Lazy loading
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const UsersPage = lazy(() => import('./pages/UsersPage'))

// Usage with Suspense
<Suspense fallback={<Spinner />}>
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/users" element={<UsersPage />} />
  </Routes>
</Suspense>
```

#### Memoization
```typescript
// Component memoization
const UserTable = React.memo<UserTableProps>(({ users, onEdit }) => {
  return (
    <Table>
      {users.map(user => (
        <UserRow key={user.id} user={user} onEdit={onEdit} />
      ))}
    </Table>
  )
})

// Callback memoization
const UserPage = () => {
  const handleEdit = useCallback((user: User) => {
    setEditingUser(user)
    setIsFormOpen(true)
  }, [])
  
  return <UserTable users={users} onEdit={handleEdit} />
}
```

#### Virtual Scrolling
```typescript
import { FixedSizeList as List } from 'react-window'

const VirtualizedUserList = ({ users }: { users: User[] }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <UserRow user={users[index]} />
    </div>
  )
  
  return (
    <List
      height={600}
      itemCount={users.length}
      itemSize={60}
      width="100%"
    >
      {Row}
    </List>
  )
}
```

## Segurança

### Backend Security

#### Input Validation
```java
@RestController
@Validated
public class UserController {
    
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequest request) {
        // Validation is handled by @Valid annotation
        User user = userService.createUser(request);
        return ResponseEntity.ok(user);
    }
}
```

#### SQL Injection Prevention
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Use parameterized queries
    @Query("SELECT u FROM User u WHERE u.name LIKE %:name%")
    List<User> findByNameContaining(@Param("name") String name);
    
    // Avoid string concatenation
    // BAD: @Query("SELECT u FROM User u WHERE u.name = '" + name + "'")
    // GOOD: @Query("SELECT u FROM User u WHERE u.name = :name")
}
```

### Frontend Security

#### XSS Prevention
```typescript
// Sanitize user input
import DOMPurify from 'dompurify'

const UserDisplay = ({ user }: { user: User }) => {
  const sanitizedName = DOMPurify.sanitize(user.name)
  
  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: sanitizedName }} />
    </div>
  )
}
```

#### CSRF Protection
```typescript
// Include CSRF token in requests
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'X-CSRF-Token': getCsrfToken(),
  },
})
```

## Documentação

### Code Documentation

#### JavaDoc
```java
/**
 * Service para gerenciar operações de usuários.
 * 
 * <p>Este serviço fornece métodos para criar, buscar, atualizar e deletar usuários,
 * incluindo validações de negócio e tratamento de exceções.</p>
 * 
 * @author Desenvolvedor
 * @version 1.0
 * @since 1.0
 */
@Service
@Transactional
public class UserService {
    
    /**
     * Cria um novo usuário no sistema.
     * 
     * @param user dados do usuário a ser criado
     * @return usuário criado com ID gerado
     * @throws IllegalArgumentException se o email já existe
     * @throws ValidationException se os dados são inválidos
     */
    public User createUser(User user) {
        // implementation
    }
}
```

#### TypeScript Documentation
```typescript
/**
 * Hook para gerenciar operações de usuários
 * 
 * @param filters - Filtros opcionais para busca de usuários
 * @returns Query result com lista de usuários
 * 
 * @example
 * ```typescript
 * const { data: users, isLoading } = useUsers({ active: true })
 * ```
 */
export const useUsers = (filters?: UserFilters) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => userService.getUsers(filters),
    staleTime: 5 * 60 * 1000,
  })
}
```

### API Documentation

#### OpenAPI/Swagger
```java
@RestController
@RequestMapping("/api/users")
@Api(tags = "User Management")
public class UserController {
    
    @PostMapping
    @ApiOperation(value = "Criar usuário", notes = "Cria um novo usuário no sistema")
    @ApiResponses({
        @ApiResponse(code = 201, message = "Usuário criado com sucesso"),
        @ApiResponse(code = 400, message = "Dados inválidos"),
        @ApiResponse(code = 409, message = "Email já existe")
    })
    public ResponseEntity<User> createUser(
            @ApiParam(value = "Dados do usuário", required = true)
            @Valid @RequestBody CreateUserRequest request) {
        // implementation
    }
}
```

## Git Workflow

### Branch Strategy
```bash
# Main branches
main          # Produção
develop       # Desenvolvimento

# Feature branches
feature/user-authentication
feature/user-profile
feature/email-notifications

# Hotfix branches
hotfix/critical-bug-fix

# Release branches
release/v1.2.0
```

### Commit Messages
```bash
# Format: type(scope): description

feat(user): adicionar endpoint para ativar usuário
fix(api): corrigir erro 500 na busca de usuários
docs(readme): atualizar instruções de instalação
style(ui): ajustar espaçamento dos botões
refactor(service): simplificar lógica de validação
test(controller): adicionar testes para UserController
chore(deps): atualizar dependências do Spring Boot
```

### Pull Request Template
```markdown
## Descrição
Breve descrição das mudanças realizadas.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Checklist
- [ ] Código compila sem erros
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Código revisado
- [ ] Testes de integração executados

## Screenshots (se aplicável)
Adicionar screenshots das mudanças visuais.

## Issues Relacionadas
Closes #123
```

## Ferramentas e Configurações

### IDE Configuration

#### IntelliJ IDEA
```xml
<!-- .idea/codeStyles/Project.xml -->
<component name="ProjectCodeStyleConfiguration">
  <code_scheme name="Project" version="173">
    <JavaCodeStyleSettings>
      <option name="IMPORT_LAYOUT_TABLE">
        <value>
          <option name="name" value="java" />
          <option name="value" value="java.*" />
          <option name="name" value="javax" />
          <option name="value" value="javax.*" />
          <option name="name" value="org" />
          <option name="value" value="org.*" />
          <option name="name" value="com" />
          <option name="value" value="com.*" />
        </value>
      </option>
    </JavaCodeStyleSettings>
  </code_scheme>
</component>
```

#### VS Code
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "java.format.settings.url": "./formatter.xml",
  "java.saveActions.organizeImports": true
}
```

### Linting and Formatting

#### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    '@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
```

#### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## Referências

- [Java Code Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-contents.html)
- [Spring Boot Best Practices](https://spring.io/guides/tutorials/spring-boot-oauth2/)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Style Guide](https://typescript-eslint.io/rules/)
- [Clean Code Principles](https://clean-code-developer.com/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)