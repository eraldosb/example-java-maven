# 🤖 Instruções do Agente de Desenvolvimento

## 📋 Visão Geral

Este documento contém as instruções completas para o **Agente de Desenvolvimento** do projeto **User Management Application**. O agente deve seguir rigorosamente todas as diretrizes definidas nos arquivos de configuração.

## 🎯 Objetivo do Agente

O agente é responsável por:

1. **Manter consistência** com os padrões definidos
2. **Garantir qualidade** do código e testes
3. **Seguir arquitetura** em camadas
4. **Implementar boas práticas** de Spring Boot e Java
5. **Manter documentação** atualizada

## 📚 Documentos de Referência

### Documentos Principais
- **`DEVELOPMENT_STANDARDS.md`** - Padrões detalhados de desenvolvimento
- **`GIT_WORKFLOW.md`** - Fluxo de trabalho Git e convenções de commit
- **`.cursorrules`** - Configuração específica do agente para o Cursor

### Configurações de Qualidade
- **`checkstyle.xml`** - Regras de estilo de código
- **`sonar-project.properties`** - Configuração do SonarQube
- **`.editorconfig`** - Configuração de formatação
- **`.prettierrc`** - Configuração do Prettier
- **`.eslintrc.json`** - Configuração do ESLint

### CI/CD e Automação
- **`.github/workflows/ci-cd.yml`** - Pipeline de CI/CD
- **`.husky/`** - Git hooks para validação automática

## 🏗️ Arquitetura do Projeto

### Estrutura de Camadas
```
Controller Layer  →  Service Layer  →  Repository Layer  →  Model Layer
     ↓                    ↓                    ↓                ↓
  REST API         Lógica de Negócio      Acesso a Dados    Entidades JPA
  Validação        Transações            Queries           DTOs
  Tratamento       Cache                 Mapeamento        Enums
  de Exceções      Logs                  Relacionamentos
```

### Estrutura de Pacotes
```
com.example.usermanagement/
├── UserManagementApplication.java     # Classe principal
├── config/                           # Configurações
├── controller/                       # Controllers REST
├── service/                          # Serviços de negócio
├── repository/                       # Repositórios
├── model/                           # Entidades
├── dto/                             # Data Transfer Objects
├── exception/                       # Exceções customizadas
├── util/                            # Utilitários
└── security/                        # Segurança
```

## 📝 Padrões de Código

### Nomenclatura
- **Classes**: PascalCase (`UserController`, `UserService`)
- **Métodos**: camelCase (`findUserById`, `createUser`)
- **Variáveis**: camelCase (`userName`, `isActive`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_USER_AGE`)

### Anotações Spring Boot
```java
// Controllers
@RestController
@RequestMapping("/api/users")
@Validated
@Slf4j

// Services
@Service
@Transactional
@Slf4j

// Repositories
@Repository
public interface UserRepository extends JpaRepository<User, Long>
```

### Tratamento de Exceções
```java
@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Usuário não encontrado com ID: " + id);
    }
}
```

### Validação de Dados
```java
@NotBlank(message = "Nome é obrigatório")
@Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
private String name;

@Email(message = "Email deve ter formato válido")
private String email;
```

## 🧪 Padrões de Testes

### Estrutura de Testes
- **Testes Unitários**: Testam classes isoladamente com mocks
- **Testes de Integração**: Testam fluxo completo da aplicação
- **Cobertura Mínima**: 80%

### Convenções de Nomenclatura
```java
@Test
public void shouldReturnUser_WhenValidIdProvided() {
    // Given
    // When
    // Then
}

@Test
public void shouldThrowException_WhenUserNotFound() {
    // Given
    // When & Then
}
```

### Configuração de Testes
```java
// Testes de Integração
@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@Transactional
@Rollback

// Testes Unitários
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
}
```

## 🔄 Padrões de API REST

### Endpoints
- `GET /api/users` - Listar usuários
- `GET /api/users/{id}` - Buscar por ID
- `POST /api/users` - Criar usuário
- `PUT /api/users/{id}` - Atualizar usuário
- `DELETE /api/users/{id}` - Deletar usuário

### Códigos de Status
- `200 OK` - Sucesso
- `201 Created` - Recurso criado
- `400 Bad Request` - Dados inválidos
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro interno

### Estrutura de Resposta
```json
{
  "data": { ... },
  "message": "Operação realizada com sucesso",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📊 Padrões de Logging

### Configuração
```properties
logging.level.com.example.usermanagement=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
```

### Uso
```java
@Slf4j
@Service
public class UserService {
    public User createUser(CreateUserRequest request) {
        log.info("Criando novo usuário com email: {}", request.getEmail());
        // ... implementação
        log.debug("Usuário criado com sucesso. ID: {}", user.getId());
    }
}
```

## 🔒 Padrões de Segurança

### Validação
- Sempre validar dados de entrada
- Usar Bean Validation
- Sanitizar dados para prevenir injection

### Configuração
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/users/**").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
```

## 🚀 Padrões de Performance

### Queries Otimizadas
```java
@Query("SELECT u FROM User u WHERE u.active = true AND u.age >= :minAge")
List<User> findActiveUsersByMinAge(@Param("minAge") int minAge);

Page<User> findByActiveTrue(Pageable pageable);
```

### Cache
```java
@Cacheable(value = "users", key = "#id")
public User findById(Long id) { ... }

@CacheEvict(value = "users", key = "#user.id")
public User updateUser(User user) { ... }
```

## 📦 Padrões de Build

### Maven
- Versões específicas para todas as dependências
- Plugins de qualidade (Checkstyle, SpotBugs, PMD)
- Cobertura de testes > 80%

### Docker
```dockerfile
FROM openjdk:11-jre-slim
WORKDIR /app
COPY target/user-management-app-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## 🔄 Padrões de Git

### Commits
Formato: `tipo(escopo): descrição`

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

Exemplos:
- `feat(user): adicionar endpoint para ativar usuário`
- `fix(api): corrigir erro 500 na busca de usuários`
- `test(service): adicionar testes para UserService`

### Branches
- `main` - Código estável
- `develop` - Desenvolvimento
- `feature/*` - Novas funcionalidades
- `hotfix/*` - Correções urgentes

## ✅ Checklist de Desenvolvimento

### Antes de Commitar
- [ ] Código compila sem erros
- [ ] Todos os testes passam
- [ ] Cobertura de testes mantida
- [ ] Logs apropriados adicionados
- [ ] Validações implementadas
- [ ] Tratamento de exceções adequado

### Code Review
- [ ] Padrões de nomenclatura seguidos
- [ ] Arquitetura em camadas respeitada
- [ ] Performance considerada
- [ ] Segurança implementada
- [ ] Testes adequados

## 🎯 Métricas de Qualidade

- **Cobertura de Código**: Mínimo 80%, Ideal 90%+
- **Complexidade Ciclomática**: Máximo 10, Ideal 5
- **Linhas por Método**: Máximo 20, Ideal 10
- **Linhas por Classe**: Máximo 200, Ideal 100

## 🛠️ Comandos Úteis

### Desenvolvimento
```bash
# Compilar e executar
mvn clean compile
mvn spring-boot:run

# Executar testes
mvn test

# Gerar relatório de cobertura
mvn jacoco:report

# Verificar qualidade do código
mvn checkstyle:check
mvn spotbugs:check
mvn pmd:check
```

### Git
```bash
# Criar feature branch
git checkout -b feature/nova-funcionalidade

# Commitar com mensagem padronizada
git commit -m "feat(user): adicionar validação de email"

# Push da feature
git push origin feature/nova-funcionalidade
```

### Docker
```bash
# Build da imagem
docker build -t user-management-app .

# Executar container
docker run -p 8080:8080 user-management-app

# Executar com Docker Compose
docker-compose up -d
```

## 📚 Recursos de Referência

- [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [Java Code Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-contents.html)
- [REST API Design Best Practices](https://restfulapi.net/)
- [Clean Code Principles](https://clean-code-developer.com/)

## ⚠️ Instruções Importantes

1. **SEMPRE** siga os padrões definidos nos documentos de referência
2. **NUNCA** comprometa a qualidade do código por velocidade
3. **SEMPRE** adicione testes para novas funcionalidades
4. **SEMPRE** valide dados de entrada
5. **SEMPRE** trate exceções adequadamente
6. **SEMPRE** documente código complexo
7. **SEMPRE** mantenha a arquitetura em camadas
8. **SEMPRE** use logs apropriados
9. **SEMPRE** considere performance e segurança
10. **SEMPRE** mantenha a consistência com o projeto existente

## 🎯 Objetivo Final

Manter um código limpo, testável, performático e seguro que siga as melhores práticas de desenvolvimento Java e Spring Boot, garantindo a qualidade e manutenibilidade do projeto.

---

**🤖 Agente de Desenvolvimento - User Management Application**
