#!/bin/bash

# Script para build e execução da aplicação User Management com Docker

echo "🐳 Iniciando build e execução da aplicação User Management com Docker..."

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down

# Build da aplicação Maven
echo "🔨 Fazendo build da aplicação Maven..."
mvn clean package -DskipTests

# Verificar se o build foi bem-sucedido
if [ $? -ne 0 ]; then
    echo "❌ Erro no build Maven. Abortando..."
    exit 1
fi

# Build da imagem Docker
echo "🏗️  Fazendo build da imagem Docker..."
docker-compose build

# Verificar se o build Docker foi bem-sucedido
if [ $? -ne 0 ]; then
    echo "❌ Erro no build Docker. Abortando..."
    exit 1
fi

# Executar a aplicação
echo "🚀 Iniciando a aplicação..."
docker-compose up -d

# Aguardar a aplicação inicializar
echo "⏳ Aguardando a aplicação inicializar..."
sleep 10

# Verificar se a aplicação está rodando
echo "🔍 Verificando status da aplicação..."
docker-compose ps

# Testar endpoint
echo "🧪 Testando endpoint da aplicação..."
curl -f http://localhost:8080/api/users

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Aplicação iniciada com sucesso!"
    echo "📱 API disponível em: http://localhost:8080/api/users"
    echo "🗄️  Console H2 disponível em: http://localhost:8080/h2-console"
    echo "📊 Estatísticas disponíveis em: http://localhost:8080/api/users/stats"
    echo ""
    echo "Para parar a aplicação, execute: docker-compose down"
else
    echo "❌ Erro ao testar a aplicação. Verifique os logs com: docker-compose logs"
fi

