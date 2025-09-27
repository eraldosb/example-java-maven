# 🔄 Padrões de Git e Fluxo de Trabalho

## 📋 Visão Geral

Este documento define os padrões de Git, convenções de commit e fluxo de trabalho para o projeto **User Management Application**.

## 🌿 Estratégia de Branching

### Branches Principais

- **`main`**: Branch principal com código estável e pronto para produção
- **`develop`**: Branch de desenvolvimento onde features são integradas
- **`feature/*`**: Branches para desenvolvimento de novas funcionalidades
- **`hotfix/*`**: Branches para correções urgentes em produção
- **`release/*`**: Branches para preparação de releases

### Fluxo de Trabalho (Git Flow)

```
main     ●────●────●────●────●────●────●────●
          \    \    \    \    \    \    \    \
develop    ●────●────●────●────●────●────●────●
            \    \    \    \    \    \    \    \
feature/     ●────●────●────●────●────●────●────●
              \    \    \    \    \    \    \    \
hotfix/        ●────●────●────●────●────●────●────●
```

## 📝 Convenções de Commit

### Formato de Commit Message

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat(user): adicionar validação de email` |
| `fix` | Correção de bug | `fix(api): corrigir erro 500 na busca de usuários` |
| `docs` | Documentação | `docs(readme): atualizar instruções de instalação` |
| `style` | Formatação, espaços, etc. | `style(controller): corrigir indentação` |
| `refactor` | Refatoração de código | `refactor(service): simplificar lógica de validação` |
| `test` | Adição ou correção de testes | `test(service): adicionar testes para UserService` |
| `chore` | Tarefas de build, dependências | `chore(deps): atualizar Spring Boot para 2.7.1` |
| `perf` | Melhoria de performance | `perf(repository): otimizar query de busca` |
| `ci` | Configurações de CI/CD | `ci(travis): adicionar build para Java 11` |

### Escopos

- `user`: Funcionalidades relacionadas a usuários
- `api`: Endpoints e controllers
- `service`: Lógica de negócio
- `repository`: Acesso a dados
- `config`: Configurações da aplicação
- `test`: Testes
- `docs`: Documentação
- `deps`: Dependências

### Exemplos de Commits

```bash
# Funcionalidade
feat(user): adicionar endpoint para ativar/desativar usuário

# Correção
fix(api): corrigir validação de idade mínima

# Documentação
docs(readme): adicionar seção de troubleshooting

# Teste
test(service): adicionar testes para UserService.createUser

# Refatoração
refactor(controller): extrair validação para método privado

# Performance
perf(repository): adicionar índice na coluna email

# Build
chore(deps): atualizar Maven para versão 3.8.6
```

## 🔄 Fluxo de Desenvolvimento

### 1. Criando uma Feature

```bash
# 1. Atualizar develop
git checkout develop
git pull origin develop

# 2. Criar branch da feature
git checkout -b feature/user-activation

# 3. Desenvolver e commitar
git add .
git commit -m "feat(user): implementar ativação de usuários"

# 4. Push da feature
git push origin feature/user-activation

# 5. Criar Pull Request para develop
```

### 2. Criando um Hotfix

```bash
# 1. Criar branch do hotfix a partir de main
git checkout main
git pull origin main
git checkout -b hotfix/fix-critical-bug

# 2. Implementar correção
git add .
git commit -m "fix(api): corrigir vazamento de memória"

# 3. Push do hotfix
git push origin hotfix/fix-critical-bug

# 4. Criar Pull Request para main e develop
```

### 3. Preparando um Release

```bash
# 1. Criar branch de release
git checkout develop
git checkout -b release/v1.1.0

# 2. Atualizar versão no pom.xml
# 3. Atualizar CHANGELOG.md
# 4. Commitar mudanças
git add .
git commit -m "chore(release): preparar versão 1.1.0"

# 5. Merge para main
git checkout main
git merge release/v1.1.0
git tag v1.1.0

# 6. Merge para develop
git checkout develop
git merge release/v1.1.0

# 7. Deletar branch de release
git branch -d release/v1.1.0
```

## 🔍 Code Review

### Checklist de Code Review

#### Funcionalidade
- [ ] O código implementa corretamente a funcionalidade solicitada?
- [ ] Todos os casos de uso foram considerados?
- [ ] A lógica de negócio está correta?

#### Qualidade de Código
- [ ] O código segue os padrões definidos no `DEVELOPMENT_STANDARDS.md`?
- [ ] Nomenclatura está consistente?
- [ ] Código está limpo e legível?
- [ ] Não há código duplicado?

#### Testes
- [ ] Testes unitários foram adicionados?
- [ ] Testes de integração foram adicionados?
- [ ] Cobertura de testes foi mantida?
- [ ] Todos os testes passam?

#### Performance e Segurança
- [ ] Performance foi considerada?
- [ ] Validações de entrada foram implementadas?
- [ ] Dados sensíveis não estão expostos?

#### Documentação
- [ ] Comentários foram adicionados onde necessário?
- [ ] README foi atualizado se necessário?
- [ ] Documentação da API foi atualizada?

### Processo de Review

1. **Criar Pull Request** com descrição clara
2. **Atribuir reviewers** apropriados
3. **Aguardar aprovação** de pelo menos 1 reviewer
4. **Corrigir feedback** se necessário
5. **Merge** após aprovação

### Template de Pull Request

```markdown
## 📋 Descrição
Breve descrição das mudanças implementadas.

## 🔄 Tipo de Mudança
- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova funcionalidade (mudança que adiciona funcionalidade)
- [ ] Breaking change (mudança que quebra compatibilidade)
- [ ] Documentação (mudança apenas na documentação)

## 🧪 Como Testar
1. Passo 1
2. Passo 2
3. Passo 3

## 📸 Screenshots (se aplicável)
Adicionar screenshots se a mudança afeta a UI.

## ✅ Checklist
- [ ] Meu código segue os padrões do projeto
- [ ] Realizei uma auto-review do meu código
- [ ] Comentei código complexo
- [ ] Minhas mudanças não geram warnings
- [ ] Adicionei testes que provam que minha correção é eficaz
- [ ] Testes novos e existentes passam localmente
- [ ] Qualquer mudança dependente foi documentada
```

## 🏷️ Versionamento

### Semantic Versioning (SemVer)

Formato: `MAJOR.MINOR.PATCH`

- **MAJOR**: Mudanças incompatíveis na API
- **MINOR**: Funcionalidades adicionadas de forma compatível
- **PATCH**: Correções de bugs compatíveis

### Exemplos

- `1.0.0`: Primeira versão estável
- `1.0.1`: Correção de bug
- `1.1.0`: Nova funcionalidade
- `2.0.0`: Breaking change

### Changelog

Manter arquivo `CHANGELOG.md` atualizado:

```markdown
# Changelog

## [1.1.0] - 2024-01-15

### Added
- Endpoint para ativar/desativar usuários
- Validação de formato de telefone
- Cache para consultas frequentes

### Changed
- Melhorada performance da busca de usuários
- Atualizada documentação da API

### Fixed
- Corrigido erro 500 na busca por email
- Corrigido problema de encoding em nomes com acentos

## [1.0.1] - 2024-01-10

### Fixed
- Corrigido vazamento de memória no UserService
```

## 🔧 Configurações do Git

### .gitignore

```gitignore
# Compiled class file
*.class

# Log file
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# Virtual machine crash logs
hs_err_pid*
replay_pid*

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup
pom.xml.next
release.properties
dependency-reduced-pom.xml
buildNumber.properties
.mvn/timing.properties
.mvn/wrapper/maven-wrapper.jar

# IDE
.idea/
*.iws
*.iml
*.ipr
.vscode/
.settings/
.project
.classpath

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Application specific
application-local.properties
application-dev.properties
application-prod.properties
```

### Git Hooks

#### pre-commit
```bash
#!/bin/sh
# Executar testes antes do commit
mvn test
if [ $? -ne 0 ]; then
    echo "Testes falharam. Commit cancelado."
    exit 1
fi
```

#### commit-msg
```bash
#!/bin/sh
# Validar formato da mensagem de commit
commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "Formato de commit inválido!"
    echo "Formato esperado: tipo(escopo): descrição"
    echo "Exemplo: feat(user): adicionar validação de email"
    exit 1
fi
```

## 📊 Métricas e Relatórios

### Comandos Úteis

```bash
# Estatísticas de commits por autor
git shortlog -sn

# Commits por dia da semana
git log --pretty=format:"%ad" --date=format:"%A" | sort | uniq -c

# Arquivos mais modificados
git log --pretty=format: --name-only | sort | uniq -c | sort -rg | head -10

# Commits por mês
git log --pretty=format:"%ad" --date=format:"%Y-%m" | sort | uniq -c

# Branch mais ativa
git for-each-ref --format='%(refname:short) %(committerdate)' refs/heads | sort -k2
```

## 🚀 Integração Contínua

### GitHub Actions / Travis CI

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK 11
      uses: actions/setup-java@v2
      with:
        java-version: '11'
        distribution: 'adopt'
    
    - name: Cache Maven dependencies
      uses: actions/cache@v2
      with:
        path: ~/.m2
        key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
    
    - name: Run tests
      run: mvn clean test
    
    - name: Generate coverage report
      run: mvn jacoco:report
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v1
```

## 📚 Recursos Adicionais

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

**⚠️ IMPORTANTE**: Todos os desenvolvedores devem seguir rigorosamente estes padrões de Git e fluxo de trabalho para manter a consistência e qualidade do projeto.

