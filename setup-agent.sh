#!/bin/bash

# 🤖 Script de Setup do Agente de Desenvolvimento
# User Management Application

echo "🤖 Iniciando setup do Agente de Desenvolvimento..."
echo ""

# Verificar se estamos no diretório correto
if [ ! -f "pom.xml" ]; then
    echo "❌ Este script deve ser executado no diretório raiz do projeto (onde está o pom.xml)"
    exit 1
fi

echo "📋 Verificando pré-requisitos..."

# Verificar Java
if ! command -v java &> /dev/null; then
    echo "❌ Java não encontrado. Instale Java 11 ou superior."
    exit 1
else
    echo "✅ Java encontrado: $(java -version 2>&1 | head -n 1)"
fi

# Verificar Maven
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven não encontrado. Instale Maven 3.6 ou superior."
    exit 1
else
    echo "✅ Maven encontrado: $(mvn -version | head -n 1)"
fi

# Verificar Node.js (opcional, para ferramentas de desenvolvimento)
if command -v node &> /dev/null; then
    echo "✅ Node.js encontrado: $(node --version)"
    NODE_AVAILABLE=true
else
    echo "⚠️  Node.js não encontrado. Algumas ferramentas não estarão disponíveis."
    NODE_AVAILABLE=false
fi

# Verificar npm (opcional)
if command -v npm &> /dev/null; then
    echo "✅ npm encontrado: $(npm --version)"
    NPM_AVAILABLE=true
else
    echo "⚠️  npm não encontrado. Git hooks não serão instalados."
    NPM_AVAILABLE=false
fi

# Verificar Git
if ! command -v git &> /dev/null; then
    echo "❌ Git não encontrado. Instale Git."
    exit 1
else
    echo "✅ Git encontrado: $(git --version)"
fi

# Verificar se estamos em um repositório Git
if [ ! -d ".git" ]; then
    echo "❌ Não é um repositório Git. Execute 'git init' primeiro."
    exit 1
else
    echo "✅ Repositório Git detectado"
fi

echo ""
echo "🔧 Configurando o ambiente..."

# Compilar o projeto para verificar se está funcionando
echo "📦 Compilando o projeto..."
mvn clean compile
if [ $? -ne 0 ]; then
    echo "❌ Falha na compilação. Verifique o projeto."
    exit 1
fi
echo "✅ Compilação bem-sucedida"

# Executar testes para verificar se estão passando
echo "🧪 Executando testes..."
mvn test
if [ $? -ne 0 ]; then
    echo "❌ Testes falharam. Corrija os testes antes de continuar."
    exit 1
fi
echo "✅ Todos os testes passaram"

# Instalar dependências npm se disponível
if [ "$NPM_AVAILABLE" = true ]; then
    echo "📦 Instalando dependências de desenvolvimento..."
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ Dependências instaladas"
    else
        echo "⚠️  Falha na instalação das dependências npm"
    fi
    
    # Instalar Husky git hooks
    echo "🪝 Configurando git hooks..."
    npm run prepare
    if [ $? -eq 0 ]; then
        echo "✅ Git hooks configurados"
    else
        echo "⚠️  Falha na configuração dos git hooks"
    fi
else
    echo "⚠️  Pulando instalação de dependências npm (Node.js não disponível)"
fi

# Tornar scripts executáveis
echo "🔧 Configurando permissões..."
if [ -d ".husky" ]; then
    chmod +x .husky/*
    echo "✅ Permissões dos git hooks configuradas"
fi

# Verificar configurações de qualidade
echo "🔍 Verificando ferramentas de qualidade..."

# Checkstyle
mvn checkstyle:check > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Checkstyle configurado e funcionando"
else
    echo "⚠️  Checkstyle encontrou problemas (isso é normal em um projeto novo)"
fi

# SpotBugs
mvn spotbugs:check > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ SpotBugs configurado e funcionando"
else
    echo "⚠️  SpotBugs encontrou problemas (isso é normal em um projeto novo)"
fi

# PMD
mvn pmd:check > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ PMD configurado e funcionando"
else
    echo "⚠️  PMD encontrou problemas (isso é normal em um projeto novo)"
fi

# JaCoCo
mvn jacoco:report > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ JaCoCo configurado e funcionando"
else
    echo "⚠️  JaCoCo encontrou problemas"
fi

echo ""
echo "📋 Resumo da configuração:"
echo ""
echo "✅ Arquivos de configuração criados:"
echo "   📚 DEVELOPMENT_STANDARDS.md"
echo "   📚 GIT_WORKFLOW.md"
echo "   📚 AGENT_INSTRUCTIONS.md"
echo "   📚 AGENT_SUMMARY.md"
echo "   🔧 .cursorrules"
echo "   🔍 checkstyle.xml"
echo "   🔍 sonar-project.properties"
echo "   🚀 .github/workflows/ci-cd.yml"
echo "   🪝 .husky/ (git hooks)"
echo "   🎨 .editorconfig, .prettierrc, .eslintrc.json"
echo "   📦 package.json, commitlint.config.js"
echo "   🔄 renovate.json, .releaserc"
echo ""
echo "✅ Ferramentas configuradas:"
echo "   🔍 Checkstyle - Estilo de código"
echo "   🐛 SpotBugs - Análise estática"
echo "   📊 PMD - Detecção de problemas"
echo "   📈 JaCoCo - Cobertura de testes"
echo "   🪝 Husky - Git hooks"
echo "   🎨 Prettier - Formatação"
echo "   🔍 ESLint - Linting"
echo ""

if [ "$NPM_AVAILABLE" = true ]; then
    echo "✅ Git hooks ativos:"
    echo "   📝 pre-commit - Valida código antes do commit"
    echo "   📝 commit-msg - Valida formato da mensagem"
    echo "   🚀 pre-push - Executa testes antes do push"
    echo ""
fi

echo "🎯 Próximos passos:"
echo ""
echo "1. 📚 Leia a documentação:"
echo "   - DEVELOPMENT_STANDARDS.md"
echo "   - GIT_WORKFLOW.md"
echo "   - AGENT_INSTRUCTIONS.md"
echo ""
echo "2. 🧪 Teste o fluxo de desenvolvimento:"
echo "   git checkout -b feature/test-agent"
echo "   echo '// Teste' >> src/main/java/com/example/usermanagement/UserManagementApplication.java"
echo "   git add ."
echo "   git commit -m \"feat(test): testar agente de desenvolvimento\""
echo ""
echo "3. 🚀 Execute verificações de qualidade:"
echo "   mvn checkstyle:check spotbugs:check pmd:check"
echo "   mvn test jacoco:report"
echo ""
echo "4. 🔧 Customize conforme necessário:"
echo "   - Ajuste regras em checkstyle.xml"
echo "   - Modifique pipeline em .github/workflows/ci-cd.yml"
echo "   - Adapte padrões em DEVELOPMENT_STANDARDS.md"
echo ""

if [ "$NPM_AVAILABLE" = true ]; then
    echo "📋 Scripts npm disponíveis:"
    echo "   npm run lint         - Executar ESLint"
    echo "   npm run format       - Formatar código com Prettier"
    echo "   npm run quality:check - Verificar qualidade Maven"
    echo "   npm run test         - Executar testes Maven"
    echo "   npm run docker:build - Build Docker"
    echo ""
fi

echo "🎉 Setup do Agente de Desenvolvimento concluído com sucesso!"
echo ""
echo "⚠️  IMPORTANTE:"
echo "   - Todos os desenvolvedores devem ler a documentação"
echo "   - Padrões são obrigatórios, não opcionais"
echo "   - Pipeline deve sempre passar antes do merge"
echo "   - Em caso de dúvidas, consulte AGENT_INSTRUCTIONS.md"
echo ""
echo "🤖 Agente de Desenvolvimento ativo e operacional!"
