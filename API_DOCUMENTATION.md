# Documentação da API REST - User Management

**Autor:** Agente de Desenvolvimento  
**Data:** 2024-01-15  
**Versão:** 1.0.0  

## Sumário

- [Resumo Executivo](#resumo-executivo)
- [Contexto](#contexto)
- [Estrutura da API](#estrutura-da-api)
- [Endpoints da API](#endpoints-da-api)
- [Modelo de Dados](#modelo-de-dados)
- [Validações e Regras de Negócio](#validações-e-regras-de-negócio)
- [Tratamento de Erros](#tratamento-de-erros)
- [Exemplos de Integração](#exemplos-de-integração)
- [Rate Limiting e Performance](#rate-limiting-e-performance)
- [Segurança](#segurança)
- [Monitoramento e Logs](#monitoramento-e-logs)
- [Referências](#referências)

## Resumo Executivo

A API REST da User Management Application fornece endpoints completos para gerenciamento de usuários, implementando operações CRUD, busca avançada, filtros e estatísticas. A API segue os princípios RESTful e utiliza Spring Boot com validação robusta de dados.

### Características Principais:
- **Base URL**: `http://localhost:8080/api`
- **Formato**: JSON
- **Autenticação**: JWT (JSON Web Token)
- **Validação**: Bean Validation (JSR-303)
- **CORS**: Habilitado para todas as origens

## Contexto

### Objetivo
Fornecer uma interface programática para:
- Gerenciamento completo de usuários (CRUD)
- Operações de ativação/desativação (soft delete)
- Busca e filtros avançados
- Estatísticas e relatórios
- Integração com sistemas externos

### Padrões Adotados
- **RESTful**: Uso correto de verbos HTTP
- **Status Codes**: Códigos HTTP semânticos
- **JSON**: Formato de dados padronizado
- **Validação**: Validação de entrada robusta
- **Tratamento de Erros**: Respostas de erro consistentes

## Estrutura da API

### Base URL e Versionamento
```
Base URL: http://localhost:8080/api
Versionamento: Não implementado (v1 implícita)
```

### Códigos de Status HTTP

| Código | Descrição | Uso |
|--------|-----------|-----|
| `200` | OK | Operação bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `400` | Bad Request | Dados inválidos ou erro de validação |
| `404` | Not Found | Recurso não encontrado |
| `500` | Internal Server Error | Erro interno do servidor |

### Estrutura de Resposta

#### Sucesso
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999",
  "age": 30,
  "active": true,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": null
}
```

#### Erro
```json
{
  "message": "Email já está em uso: joao@email.com"
}
```

## Autenticação

### Sistema JWT
A API utiliza JWT (JSON Web Token) para autenticação. Todos os endpoints protegidos requerem um token válido no header `Authorization`.

#### Como obter um token:
1. **Registrar novo usuário** via `POST /api/auth/register`
2. **Fazer login** via `POST /api/auth/login`

#### Como usar o token:
```bash
# Incluir o token no header Authorization
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" http://localhost:8080/api/users
```

#### Usuários padrão criados automaticamente:
- **Admin**: `admin@example.com` / `admin123`
- **User**: `user@example.com` / `user123`

### Endpoints de Autenticação

#### 1.1 Login
**POST** `/api/auth/login`

Autentica um usuário e retorna um token JWT.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "user123"
}
```

**Respostas:**
- `200 OK`: Login bem-sucedido
- `400 Bad Request`: Credenciais inválidas

**Exemplo de Uso:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "user123"
  }'
```

**Resposta de Sucesso:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Usuário Padrão",
    "email": "user@example.com",
    "roles": ["USER"]
  }
}
```

#### 1.2 Registro
**POST** `/api/auth/register`

Registra um novo usuário no sistema.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "phone": "11999999999",
  "age": 30
}
```

**Validações:**
- `name`: Obrigatório, 2-100 caracteres
- `email`: Obrigatório, formato válido, único
- `password`: Obrigatório, mínimo 6 caracteres
- `phone`: Opcional, 6-20 caracteres
- `age`: Opcional, número inteiro

**Respostas:**
- `200 OK`: Usuário registrado com sucesso
- `400 Bad Request`: Dados inválidos ou email duplicado

**Exemplo de Uso:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123",
    "phone": "11999999999",
    "age": 30
  }'
```

#### 1.3 Validação de Token
**POST** `/api/auth/validate`

Valida se um token JWT é válido.

**Headers:**
- `Authorization`: Bearer token

**Respostas:**
- `200 OK`: Token válido
- `400 Bad Request`: Token inválido ou expirado

**Exemplo de Uso:**
```bash
curl -X POST http://localhost:8080/api/auth/validate \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta de Sucesso:**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "name": "Usuário Padrão",
    "email": "user@example.com",
    "roles": ["USER"]
  }
}
```

## Endpoints da API

### 2. Usuários

#### 1.1 Criar Usuário
**POST** `/api/users`

Cria um novo usuário no sistema.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999",
  "age": 30
}
```

**Validações:**
- `name`: Obrigatório, 2-100 caracteres
- `email`: Obrigatório, formato válido, único
- `phone`: Opcional, 6-20 caracteres
- `age`: Opcional, número inteiro

**Respostas:**
- `201 Created`: Usuário criado com sucesso
- `400 Bad Request`: Dados inválidos ou email duplicado

**Exemplo de Uso:**
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "11999999999",
    "age": 30
  }'
```

#### 1.2 Listar Todos os Usuários
**GET** `/api/users`

Retorna todos os usuários cadastrados no sistema.

**Respostas:**
- `200 OK`: Lista de usuários

**Exemplo de Uso:**
```bash
curl http://localhost:8080/api/users
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "11999999999",
    "age": 30,
    "active": true,
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": null
  },
  {
    "id": 2,
    "name": "Maria Santos",
    "email": "maria@email.com",
    "phone": "11888888888",
    "age": 25,
    "active": true,
    "createdAt": "2024-01-15T11:00:00",
    "updatedAt": null
  }
]
```

#### 1.3 Buscar Usuário por ID
**GET** `/api/users/{id}`

Retorna um usuário específico pelo ID.

**Parâmetros:**
- `id` (path): ID do usuário (obrigatório)

**Respostas:**
- `200 OK`: Usuário encontrado
- `404 Not Found`: Usuário não encontrado

**Exemplo de Uso:**
```bash
curl http://localhost:8080/api/users/1
```

#### 1.4 Buscar Usuário por Email
**GET** `/api/users/email/{email}`

Retorna um usuário específico pelo email.

**Parâmetros:**
- `email` (path): Email do usuário (obrigatório)

**Respostas:**
- `200 OK`: Usuário encontrado
- `404 Not Found`: Usuário não encontrado

**Exemplo de Uso:**
```bash
curl http://localhost:8080/api/users/email/joao@email.com
```

#### 1.5 Atualizar Usuário
**PUT** `/api/users/{id}`

Atualiza os dados de um usuário existente.

**Parâmetros:**
- `id` (path): ID do usuário (obrigatório)

**Request Body:**
```json
{
  "name": "João Santos",
  "email": "joao.santos@email.com",
  "phone": "11777777777",
  "age": 31,
  "active": true
}
```

**Respostas:**
- `200 OK`: Usuário atualizado com sucesso
- `400 Bad Request`: Dados inválidos ou email duplicado
- `404 Not Found`: Usuário não encontrado

**Exemplo de Uso:**
```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Santos",
    "email": "joao.santos@email.com",
    "phone": "11777777777",
    "age": 31,
    "active": true
  }'
```

#### 1.6 Ativar Usuário
**PATCH** `/api/users/{id}/activate`

Ativa um usuário (soft delete reverso).

**Parâmetros:**
- `id` (path): ID do usuário (obrigatório)

**Respostas:**
- `200 OK`: Usuário ativado com sucesso
- `400 Bad Request`: Usuário não encontrado

**Exemplo de Uso:**
```bash
curl -X PATCH http://localhost:8080/api/users/1/activate
```

#### 1.7 Desativar Usuário
**PATCH** `/api/users/{id}/deactivate`

Desativa um usuário (soft delete).

**Parâmetros:**
- `id` (path): ID do usuário (obrigatório)

**Respostas:**
- `200 OK`: Usuário desativado com sucesso
- `400 Bad Request`: Usuário não encontrado

**Exemplo de Uso:**
```bash
curl -X PATCH http://localhost:8080/api/users/1/deactivate
```

#### 1.8 Deletar Usuário
**DELETE** `/api/users/{id}`

Remove um usuário permanentemente do sistema.

**Parâmetros:**
- `id` (path): ID do usuário (obrigatório)

**Respostas:**
- `204 No Content`: Usuário removido com sucesso
- `400 Bad Request`: Usuário não encontrado

**Exemplo de Uso:**
```bash
curl -X DELETE http://localhost:8080/api/users/1
```

### 2. Busca e Filtros

#### 2.1 Listar Usuários Ativos
**GET** `/api/users/active`

Retorna apenas os usuários ativos.

**Respostas:**
- `200 OK`: Lista de usuários ativos

**Exemplo de Uso:**
```bash
curl http://localhost:8080/api/users/active
```

#### 2.2 Buscar Usuários por Nome
**GET** `/api/users/search?name={name}`

Busca usuários que contenham o nome especificado (case insensitive).

**Parâmetros:**
- `name` (query): Nome ou parte do nome (obrigatório)

**Respostas:**
- `200 OK`: Lista de usuários encontrados

**Exemplo de Uso:**
```bash
curl "http://localhost:8080/api/users/search?name=João"
```

#### 2.3 Buscar Usuários por Faixa Etária
**GET** `/api/users/age-range?minAge={minAge}&maxAge={maxAge}`

Busca usuários dentro de uma faixa etária específica.

**Parâmetros:**
- `minAge` (query): Idade mínima (obrigatório)
- `maxAge` (query): Idade máxima (obrigatório)

**Respostas:**
- `200 OK`: Lista de usuários na faixa etária
- `400 Bad Request`: Parâmetros inválidos

**Exemplo de Uso:**
```bash
curl "http://localhost:8080/api/users/age-range?minAge=25&maxAge=35"
```

### 3. Estatísticas

#### 3.1 Estatísticas dos Usuários
**GET** `/api/users/stats`

Retorna estatísticas gerais dos usuários.

**Respostas:**
- `200 OK`: Estatísticas dos usuários

**Exemplo de Uso:**
```bash
curl http://localhost:8080/api/users/stats
```

**Resposta:**
```json
{
  "totalUsers": 150,
  "activeUsers": 120,
  "inactiveUsers": 30
}
```

## Modelo de Dados

### Entidade User

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999",
  "age": 30,
  "active": true,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T11:00:00"
}
```

### Campos da Entidade

| Campo | Tipo | Obrigatório | Descrição | Validações |
|-------|------|-------------|-----------|------------|
| `id` | Long | Não | ID único do usuário | Gerado automaticamente |
| `name` | String | Sim | Nome completo | 2-100 caracteres |
| `email` | String | Sim | Email do usuário | Formato válido, único |
| `phone` | String | Não | Telefone | 6-20 caracteres |
| `age` | Integer | Não | Idade | Número inteiro |
| `active` | Boolean | Não | Status ativo/inativo | Padrão: true |
| `createdAt` | LocalDateTime | Não | Data de criação | Gerado automaticamente |
| `updatedAt` | LocalDateTime | Não | Data de atualização | Atualizado automaticamente |

## Validações e Regras de Negócio

### Validações de Entrada

#### Nome
- **Obrigatório**: Sim
- **Tamanho**: 2-100 caracteres
- **Mensagem de erro**: "Nome é obrigatório" / "Nome deve ter entre 2 e 100 caracteres"

#### Email
- **Obrigatório**: Sim
- **Formato**: Email válido
- **Unicidade**: Deve ser único no sistema
- **Mensagem de erro**: "Email é obrigatório" / "Email deve ter um formato válido" / "Email já está em uso"

#### Telefone
- **Obrigatório**: Não
- **Tamanho**: 6-20 caracteres
- **Mensagem de erro**: "Telefone deve ter entre 6 e 20 caracteres"

#### Idade
- **Obrigatório**: Não
- **Tipo**: Número inteiro
- **Validação**: Apenas números positivos

### Regras de Negócio

1. **Email Único**: Não é possível criar ou atualizar usuários com emails duplicados
2. **Soft Delete**: Usuários são desativados, não removidos permanentemente
3. **Timestamps**: `createdAt` é definido na criação, `updatedAt` é atualizado a cada modificação
4. **Status Padrão**: Novos usuários são criados como ativos por padrão

## Tratamento de Erros

### Tipos de Erro

#### 1. Erro de Validação (400 Bad Request)
```json
{
  "message": "Email já está em uso: joao@email.com"
}
```

#### 2. Recurso Não Encontrado (404 Not Found)
```json
{
  "message": "Usuário não encontrado com ID: 999"
}
```

#### 3. Erro Interno (500 Internal Server Error)
```json
{
  "message": "Erro interno do servidor"
}
```

### Códigos de Erro Comuns

| Código | Cenário | Mensagem |
|--------|---------|----------|
| `400` | Email duplicado | "Email já está em uso: {email}" |
| `400` | Dados inválidos | "Nome é obrigatório" |
| `400` | Usuário não encontrado | "Usuário não encontrado com ID: {id}" |
| `404` | Recurso não encontrado | Sem corpo de resposta |
| `500` | Erro interno | "Erro interno do servidor" |

## Exemplos de Integração

### JavaScript/TypeScript

```typescript
// Cliente HTTP usando Axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Criar usuário
const createUser = async (userData: CreateUserRequest) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao criar usuário');
  }
};

// Buscar usuários
const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar usuários');
  }
};

// Atualizar usuário
const updateUser = async (id: number, userData: UpdateUserRequest) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário');
  }
};
```

### Python

```python
import requests
import json

BASE_URL = 'http://localhost:8080/api'

def create_user(user_data):
    """Cria um novo usuário"""
    response = requests.post(
        f'{BASE_URL}/users',
        json=user_data,
        headers={'Content-Type': 'application/json'}
    )
    
    if response.status_code == 201:
        return response.json()
    else:
        raise Exception(f'Erro ao criar usuário: {response.json().get("message")}')

def get_users():
    """Busca todos os usuários"""
    response = requests.get(f'{BASE_URL}/users')
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception('Erro ao buscar usuários')

def search_users_by_name(name):
    """Busca usuários por nome"""
    response = requests.get(f'{BASE_URL}/users/search', params={'name': name})
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception('Erro ao buscar usuários')

# Exemplo de uso
user_data = {
    'name': 'João Silva',
    'email': 'joao@email.com',
    'phone': '11999999999',
    'age': 30
}

try:
    user = create_user(user_data)
    print(f'Usuário criado: {user}')
    
    users = get_users()
    print(f'Total de usuários: {len(users)}')
    
    search_results = search_users_by_name('João')
    print(f'Usuários encontrados: {len(search_results)}')
    
except Exception as e:
    print(f'Erro: {e}')
```

### cURL - Scripts Completos

```bash
#!/bin/bash

BASE_URL="http://localhost:8080/api"

# Função para criar usuário
create_user() {
    local name="$1"
    local email="$2"
    local phone="$3"
    local age="$4"
    
    curl -X POST "$BASE_URL/users" \
        -H "Content-Type: application/json" \
        -d "{
            \"name\": \"$name\",
            \"email\": \"$email\",
            \"phone\": \"$phone\",
            \"age\": $age
        }"
}

# Função para buscar usuários
get_users() {
    curl -X GET "$BASE_URL/users"
}

# Função para buscar usuário por ID
get_user_by_id() {
    local id="$1"
    curl -X GET "$BASE_URL/users/$id"
}

# Função para atualizar usuário
update_user() {
    local id="$1"
    local name="$2"
    local email="$3"
    local phone="$4"
    local age="$5"
    
    curl -X PUT "$BASE_URL/users/$id" \
        -H "Content-Type: application/json" \
        -d "{
            \"name\": \"$name\",
            \"email\": \"$email\",
            \"phone\": \"$phone\",
            \"age\": $age,
            \"active\": true
        }"
}

# Função para desativar usuário
deactivate_user() {
    local id="$1"
    curl -X PATCH "$BASE_URL/users/$id/deactivate"
}

# Função para ativar usuário
activate_user() {
    local id="$1"
    curl -X PATCH "$BASE_URL/users/$id/activate"
}

# Função para deletar usuário
delete_user() {
    local id="$1"
    curl -X DELETE "$BASE_URL/users/$id"
}

# Função para buscar usuários ativos
get_active_users() {
    curl -X GET "$BASE_URL/users/active"
}

# Função para buscar por nome
search_users_by_name() {
    local name="$1"
    curl -X GET "$BASE_URL/users/search?name=$name"
}

# Função para buscar por faixa etária
get_users_by_age_range() {
    local min_age="$1"
    local max_age="$2"
    curl -X GET "$BASE_URL/users/age-range?minAge=$min_age&maxAge=$max_age"
}

# Função para obter estatísticas
get_user_stats() {
    curl -X GET "$BASE_URL/users/stats"
}

# Exemplos de uso
echo "=== Criando usuário ==="
create_user "João Silva" "joao@email.com" "11999999999" 30

echo -e "\n=== Buscando todos os usuários ==="
get_users

echo -e "\n=== Buscando usuário por ID ==="
get_user_by_id 1

echo -e "\n=== Buscando usuários ativos ==="
get_active_users

echo -e "\n=== Buscando por nome ==="
search_users_by_name "João"

echo -e "\n=== Buscando por faixa etária ==="
get_users_by_age_range 25 35

echo -e "\n=== Obtendo estatísticas ==="
get_user_stats
```

## Rate Limiting e Performance

### Limitações Atuais
- **Rate Limiting**: Não implementado
- **Paginação**: Não implementada
- **Cache**: Não implementado
- **Timeout**: Padrão do servidor web

### Recomendações para Produção

1. **Implementar Rate Limiting**
   ```java
   @RateLimiter(name = "user-api", fallbackMethod = "fallbackMethod")
   @GetMapping("/users")
   public ResponseEntity<List<User>> getAllUsers() {
       // implementação
   }
   ```

2. **Adicionar Paginação**
   ```java
   @GetMapping("/users")
   public ResponseEntity<Page<User>> getAllUsers(
       @RequestParam(defaultValue = "0") int page,
       @RequestParam(defaultValue = "10") int size) {
       // implementação
   }
   ```

3. **Implementar Cache**
   ```java
   @Cacheable(value = "users", key = "#id")
   public Optional<User> getUserById(Long id) {
       // implementação
   }
   ```

## Segurança

### Implementações Atuais
- **Autenticação**: JWT (JSON Web Token)
- **Autorização**: Baseada em roles (USER, ADMIN)
- **CORS**: Habilitado para todas as origens
- **Validação**: Bean Validation para entrada de dados
- **Criptografia**: BCrypt para senhas

### Sistema de Autenticação

#### JWT Token
- **Algoritmo**: HS256
- **Expiração**: 24 horas (configurável)
- **Secret**: Configurável via `jwt.secret`
- **Header**: `Authorization: Bearer <token>`

#### Roles e Permissões
- **USER**: Acesso aos endpoints `/api/users/**`
- **ADMIN**: Acesso completo + endpoints `/api/admin/**`
- **Público**: Endpoints `/api/auth/**` e `/api/health/**`

#### Endpoints Protegidos
```bash
# Requer autenticação USER ou ADMIN
GET /api/users
POST /api/users
PUT /api/users/{id}
DELETE /api/users/{id}

# Requer autenticação ADMIN
GET /api/admin/users
POST /api/admin/users
```

### Recomendações para Produção

1. **Configurar HTTPS**
2. **Implementar Rate Limiting**
3. **Configurar CORS adequadamente**
4. **Usar secret JWT forte**
5. **Implementar refresh tokens**
6. **Logging de auditoria**
7. **Validação adicional de entrada**

## Monitoramento e Logs

### Logs Atuais
- **Nível**: DEBUG para desenvolvimento
- **Formato**: Console
- **Informações**: SQL queries, requests, responses

### Recomendações
1. **Implementar Logging Estruturado**
2. **Adicionar Métricas de Performance**
3. **Configurar Alertas**
4. **Implementar Health Checks**

## Referências

- [Spring Boot REST Documentation](https://spring.io/guides/gs/rest-service/)
- [REST API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [JSON Schema Validation](https://json-schema.org/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Bean Validation (JSR-303)](https://beanvalidation.org/)
