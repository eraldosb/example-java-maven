# Frontend - User Management Application

Este é o frontend da aplicação de gerenciamento de usuários, construído com React, TypeScript e Chakra UI.

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Chakra UI v2** - Biblioteca de componentes para React
- **React Hook Form** - Gerenciamento de formulários
- **React Query (TanStack Query)** - Gerenciamento de estado servidor
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **Recharts** - Biblioteca de gráficos
- **date-fns** - Manipulação de datas

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx      # Layout principal com navegação
│   ├── UserForm.tsx    # Formulário de criação/edição de usuários
│   ├── UserTable.tsx   # Tabela de listagem de usuários
│   └── UserFilters.tsx # Componente de filtros
├── hooks/              # Hooks customizados
│   └── useUsers.ts     # Hook para gerenciamento de usuários
├── pages/              # Páginas da aplicação
│   ├── DashboardPage.tsx # Dashboard com estatísticas
│   ├── UsersPage.tsx   # Página de gerenciamento de usuários
│   └── StatusPage.tsx  # Página de status do sistema
├── services/           # Serviços de API
│   └── api.ts          # Cliente HTTP e endpoints
├── theme/              # Configuração do tema
│   └── index.ts        # Tema personalizado do Chakra UI
├── types/              # Definições de tipos TypeScript
│   └── user.ts         # Tipos relacionados a usuários
└── App.tsx             # Componente principal
```

## 🎨 Características do Design

### Tema Personalizado
- **Cores**: Paleta de azuis personalizada (`brand`)
- **Tipografia**: Inter como fonte principal
- **Componentes**: Configurações padrão para botões, inputs e selects
- **Layout**: Design responsivo com sidebar e navegação mobile

### Componentes Principais

#### 🏠 Dashboard
- **Estatísticas em tempo real**: Total, ativos, inativos
- **Gráficos interativos**: Distribuição por status e faixa etária
- **Atividade recente**: Lista dos últimos usuários criados

#### 👥 Gerenciamento de Usuários
- **Tabela responsiva**: Listagem com paginação e ordenação
- **Filtros avançados**: Por nome, email, idade e status
- **Formulário modal**: Criação e edição com validações
- **Ações em lote**: Ativar/desativar e deletar usuários

#### 📊 Status do Sistema
- **Monitoramento em tempo real**: Status da aplicação e banco de dados
- **Métricas de sistema**: Memória, CPU e informações do Java
- **Auto-refresh**: Atualização automática a cada 30 segundos

## 🔧 Funcionalidades

### ✅ Validações de Formulário
- **Nome**: Obrigatório, 2-100 caracteres
- **Email**: Formato válido e obrigatório
- **Telefone**: Formato brasileiro opcional `(11) 99999-9999`
- **Idade**: Entre 0-120 anos, obrigatório
- **Status**: Checkbox para usuário ativo/inativo

### 🔍 Filtros e Busca
- **Busca por nome/email**: Campo de texto livre
- **Filtro por idade**: Faixa mínima e máxima
- **Filtro por status**: Todos, ativos ou inativos
- **Limpeza de filtros**: Botão para resetar todos os filtros

### 📱 Design Responsivo
- **Mobile-first**: Interface otimizada para dispositivos móveis
- **Sidebar colapsível**: Menu lateral que se adapta ao tamanho da tela
- **Tabelas responsivas**: Scroll horizontal em telas pequenas
- **Modais adaptáveis**: Formulários que se ajustam ao viewport

### 🔄 Gerenciamento de Estado
- **React Query**: Cache inteligente e sincronização automática
- **Otimistic Updates**: Atualizações otimistas para melhor UX
- **Error Handling**: Tratamento robusto de erros com notificações
- **Loading States**: Indicadores de carregamento em todas as operações

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Backend da aplicação rodando na porta 8080

### Instalação
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
```

### Scripts Disponíveis
```bash
npm start          # Inicia o servidor de desenvolvimento
npm run build      # Cria build de produção
npm test           # Executa os testes
npm run eject      # Ejecta a configuração (não recomendado)
```

## 🌐 URLs da Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Dashboard**: http://localhost:3000/
- **Usuários**: http://localhost:3000/users
- **Status**: http://localhost:3000/status

## 🔗 Integração com Backend

O frontend se conecta ao backend através de:

- **Base URL**: `http://localhost:8080/api`
- **Endpoints**: Todos os endpoints REST do backend
- **Autenticação**: Não implementada (pode ser adicionada)
- **CORS**: Configurado para aceitar requisições do frontend

### Endpoints Utilizados
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `PUT /users/{id}` - Atualizar usuário
- `DELETE /users/{id}` - Deletar usuário
- `PATCH /users/{id}/activate` - Ativar usuário
- `PATCH /users/{id}/deactivate` - Desativar usuário
- `GET /users/stats` - Estatísticas de usuários
- `GET /health` - Status do sistema

## 🎯 Próximos Passos

### Funcionalidades Futuras
- [ ] Autenticação e autorização
- [ ] Paginação avançada
- [ ] Exportação de dados (CSV, PDF)
- [ ] Upload de fotos de perfil
- [ ] Notificações push
- [ ] Modo escuro
- [ ] Internacionalização (i18n)
- [ ] Testes automatizados

### Melhorias Técnicas
- [ ] Implementar Service Worker para PWA
- [ ] Adicionar testes unitários e de integração
- [ ] Configurar CI/CD
- [ ] Implementar lazy loading
- [ ] Adicionar monitoramento de performance
- [ ] Configurar bundle analyzer

## 📝 Notas de Desenvolvimento

### Decisões Técnicas
- **Chakra UI v2**: Escolhido por sua simplicidade e componentes bem documentados
- **React Query**: Para gerenciamento eficiente de estado servidor
- **TypeScript**: Para type safety e melhor experiência de desenvolvimento
- **React Hook Form**: Para formulários performáticos e validações

### Padrões Utilizados
- **Component Composition**: Componentes pequenos e reutilizáveis
- **Custom Hooks**: Lógica de negócio encapsulada em hooks
- **Error Boundaries**: Tratamento de erros em componentes
- **Responsive Design**: Mobile-first approach

---

**🎉 Frontend criado com sucesso usando as melhores práticas do Chakra UI!**