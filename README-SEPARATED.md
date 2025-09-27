# User Management Application - Arquitetura Separada

Esta aplicação foi refatorada para usar uma arquitetura de microserviços com frontend e backend separados em containers Docker independentes.

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │
│   (React)       │◄──►│   (Spring Boot) │
│   Port: 3000    │    │   Port: 8080    │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┘
                   │
            ┌─────────────┐
            │   Docker    │
            │   Network   │
            └─────────────┘
```

## 📁 Estrutura do Projeto

```
user-management/
├── user-management-backend/          # Backend Spring Boot
│   ├── src/                         # Código fonte Java
│   ├── target/                      # Build Maven
│   ├── pom.xml                      # Dependências Maven
│   ├── Dockerfile                   # Container do backend
│   └── .dockerignore               # Arquivos ignorados no Docker
├── user-management-frontend/         # Frontend React
│   ├── src/                         # Código fonte React/TypeScript
│   ├── public/                      # Arquivos públicos
│   ├── package.json                 # Dependências Node.js
│   ├── Dockerfile                   # Container do frontend
│   ├── nginx.conf                   # Configuração do Nginx
│   └── .dockerignore               # Arquivos ignorados no Docker
├── docker-compose.yml               # Orquestração dos serviços
├── run-separated.sh                 # Script de execução
└── README-SEPARATED.md              # Esta documentação
```

## 🚀 Como Executar

### Opção 1: Script Automatizado (Recomendado)

```bash
# Executar tudo (build + run)
./run-separated.sh

# Apenas build
./run-separated.sh build

# Ver logs
./run-separated.sh logs

# Parar serviços
./run-separated.sh stop

# Reiniciar
./run-separated.sh restart
```

### Opção 2: Docker Compose Manual

```bash
# Build e executar
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

### Opção 3: Desenvolvimento Individual

#### Backend apenas:
```bash
cd user-management-backend
mvn spring-boot:run
```

#### Frontend apenas:
```bash
cd user-management-frontend
npm start
```

## 🌐 URLs Disponíveis

Após executar a aplicação:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Health Check**: http://localhost:8080/api/health
- **H2 Console**: http://localhost:8080/h2-console

## 🔧 Configuração

### Variáveis de Ambiente

#### Backend (Spring Boot)
```properties
SPRING_PROFILES_ACTIVE=docker
SPRING_DATASOURCE_URL=jdbc:h2:mem:testdb
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.h2.Driver
SPRING_DATASOURCE_USERNAME=sa
SPRING_DATASOURCE_PASSWORD=
SPRING_H2_CONSOLE_ENABLED=true
SPRING_JPA_HIBERNATE_DDL_AUTO=create-drop
```

#### Frontend (React)
```bash
REACT_APP_API_URL=/api  # Usa proxy do Nginx
```

## 🐳 Docker

### Containers

- **user-management-backend**: Spring Boot + H2 Database
- **user-management-frontend**: React + Nginx

### Network

Os containers se comunicam através da rede `user-management-network`.

### Health Checks

Ambos os containers possuem health checks configurados:
- Backend: `/api/health/simple`
- Frontend: `/` (página principal)

## 🔄 Comunicação Frontend ↔ Backend

O frontend se comunica com o backend através do proxy do Nginx:

1. Frontend faz requisição para `/api/*`
2. Nginx redireciona para `backend:8080/api/*`
3. Backend processa e retorna resposta
4. Nginx retorna resposta para o frontend

## 📊 Monitoramento

### Logs
```bash
# Todos os serviços
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend
```

### Status dos Serviços
```bash
docker-compose ps
```

### Health Checks
```bash
# Backend
curl http://localhost:8080/api/health/simple

# Frontend
curl http://localhost:3000/
```

## 🛠️ Desenvolvimento

### Adicionando Novas Funcionalidades

#### Backend:
1. Modifique o código em `user-management-backend/src/`
2. Execute `mvn clean package` para rebuild
3. Restart o container: `docker-compose restart backend`

#### Frontend:
1. Modifique o código em `user-management-frontend/src/`
2. Execute `npm run build` para rebuild
3. Restart o container: `docker-compose restart frontend`

### Debug

#### Backend:
```bash
# Acessar container
docker exec -it user-management-backend bash

# Ver logs em tempo real
docker logs -f user-management-backend
```

#### Frontend:
```bash
# Acessar container
docker exec -it user-management-frontend sh

# Ver logs em tempo real
docker logs -f user-management-frontend
```

## 🔒 Segurança

### Headers de Segurança
O Nginx está configurado com headers de segurança:
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### CORS
CORS configurado para permitir comunicação entre frontend e backend.

## 📈 Performance

### Otimizações
- Gzip compression habilitado
- Cache de assets estáticos (1 ano)
- Health checks para monitoramento
- Restart automático de containers

### Escalabilidade
Para escalar horizontalmente:
```bash
# Escalar frontend
docker-compose up --scale frontend=3

# Escalar backend
docker-compose up --scale backend=2
```

## 🐛 Troubleshooting

### Problemas Comuns

#### Container não inicia:
```bash
# Ver logs
docker-compose logs [service-name]

# Verificar status
docker-compose ps
```

#### Frontend não carrega:
```bash
# Verificar se backend está rodando
curl http://localhost:8080/api/health/simple

# Verificar logs do nginx
docker-compose logs frontend
```

#### API não responde:
```bash
# Verificar conectividade entre containers
docker exec -it user-management-frontend ping backend

# Verificar logs do backend
docker-compose logs backend
```

### Limpeza Completa
```bash
# Parar e remover tudo
docker-compose down --volumes --remove-orphans

# Limpar imagens
docker system prune -a
```

## 📚 Próximos Passos

1. **Banco de Dados Externo**: Migrar de H2 para PostgreSQL/MySQL
2. **Autenticação**: Implementar JWT ou OAuth2
3. **Cache**: Adicionar Redis para cache
4. **Logs**: Implementar ELK Stack
5. **CI/CD**: Configurar pipeline de deploy
6. **Monitoramento**: Adicionar Prometheus + Grafana
7. **Load Balancer**: Implementar HAProxy ou Nginx Plus

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
