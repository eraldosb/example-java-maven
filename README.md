# 🚀 User Management Application

Uma aplicação Java moderna para gerenciamento de usuários construída com Spring Boot, Maven e H2 Database.

## 📋 Funcionalidades

- ✅ **CRUD completo de usuários** (Create, Read, Update, Delete)
- 🔍 **Busca avançada** por nome, email e faixa etária
- 🔄 **Ativação/Desativação** de usuários (soft delete)
- 📊 **Estatísticas** de usuários (ativos, inativos, total)
- 🛡️ **Validação de dados** com Bean Validation
- 🗄️ **Banco de dados H2** em memória
- 🧪 **Testes unitários e de integração** completos
- 📈 **Cobertura de código** com JaCoCo

## 🛠️ Tecnologias Utilizadas

- **Java 11**
- **Spring Boot 2.7.0**
- **Spring Data JPA**
- **H2 Database**
- **Maven**
- **JUnit 4**
- **Mockito**
- **JaCoCo** (cobertura de código)

## 🚀 Como Executar

### Pré-requisitos
- Java 11 ou superior
- Maven 3.6 ou superior

### Executando a aplicação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd example-java-maven
```

2. **Compile e execute:**
```bash
mvn clean install
mvn spring-boot:run
```

3. **Acesse a aplicação:**
- **API REST:** http://localhost:8080/api/users
- **Console H2:** http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: `password`

## 📚 Endpoints da API

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/users` | Criar novo usuário |
| `GET` | `/api/users` | Listar todos os usuários |
| `GET` | `/api/users/{id}` | Buscar usuário por ID |
| `GET` | `/api/users/email/{email}` | Buscar usuário por email |
| `PUT` | `/api/users/{id}` | Atualizar usuário |
| `PATCH` | `/api/users/{id}/activate` | Ativar usuário |
| `PATCH` | `/api/users/{id}/deactivate` | Desativar usuário |
| `DELETE` | `/api/users/{id}` | Deletar usuário permanentemente |

### Busca e Filtros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/users/active` | Listar usuários ativos |
| `GET` | `/api/users/search?name={name}` | Buscar usuários por nome |
| `GET` | `/api/users/age-range?minAge={min}&maxAge={max}` | Buscar por faixa etária |
| `GET` | `/api/users/stats` | Estatísticas dos usuários |

## 📝 Exemplos de Uso

### Criar um usuário
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

### Buscar todos os usuários
```bash
curl http://localhost:8080/api/users
```

### Buscar usuário por ID
```bash
curl http://localhost:8080/api/users/1
```

### Atualizar usuário
```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Santos",
    "email": "joao@email.com",
    "phone": "11888888888",
    "age": 31
  }'
```

## 🧪 Executando os Testes

```bash
# Executar todos os testes
mvn test

# Executar testes com relatório de cobertura
mvn clean test jacoco:report

# Ver relatório de cobertura
open target/site/jacoco/index.html
```

## 📊 Estrutura do Projeto

```
src/
├── main/
│   ├── java/com/example/usermanagement/
│   │   ├── UserManagementApplication.java    # Classe principal
│   │   ├── controller/
│   │   │   └── UserController.java           # Controller REST
│   │   ├── service/
│   │   │   └── UserService.java              # Lógica de negócio
│   │   ├── repository/
│   │   │   └── UserRepository.java           # Acesso a dados
│   │   └── model/
│   │       └── User.java                     # Entidade JPA
│   └── resources/
│       └── application.properties            # Configurações
└── test/
    └── java/com/example/usermanagement/
        ├── UserManagementApplicationTest.java # Testes de integração
        ├── service/
        │   └── UserServiceTest.java          # Testes unitários do service
        └── controller/
            └── UserControllerTest.java       # Testes unitários do controller
```

## 🔧 Configurações

As configurações da aplicação estão no arquivo `application.properties`:

- **Porta:** 8080
- **Banco de dados:** H2 em memória
- **Console H2:** Habilitado em `/h2-console`
- **Logs:** Configurados para DEBUG

## 📈 Cobertura de Código

O projeto utiliza JaCoCo para análise de cobertura de código:

```bash
mvn clean test jacoco:report
```

O relatório será gerado em `target/site/jacoco/index.html`

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando Spring Boot e Java.