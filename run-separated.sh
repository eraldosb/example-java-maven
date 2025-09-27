#!/bin/bash

# Script para executar a aplicação com frontend e backend separados

set -e

echo "🚀 Iniciando aplicação User Management v2.1 (Frontend + Backend separados com JWT)"
echo "================================================================"

# Função para limpar containers anteriores
cleanup() {
    echo "🧹 Limpando containers anteriores..."
    docker-compose down --remove-orphans 2>/dev/null || true
}

# Função para build do backend
build_backend() {
    echo "🔨 Construindo backend..."
    cd user-management-backend
    
    # Build Maven
    echo "📦 Executando Maven build..."
    mvn clean package -DskipTests
    
    cd ..
    echo "✅ Backend build concluído"
}

# Função para build do frontend
build_frontend() {
    echo "🔨 Construindo frontend..."
    cd user-management-frontend
    
    # Install dependencies
    echo "📦 Instalando dependências..."
    npm ci
    
    # Build
    echo "🏗️ Executando build..."
    npm run build
    
    cd ..
    echo "✅ Frontend build concluído"
}

# Função para executar com Docker Compose
run_docker() {
    echo "🐳 Executando com Docker Compose..."
    docker-compose up --build -d
    
    echo "⏳ Aguardando serviços ficarem prontos..."
    sleep 10
    
    # Verificar status dos serviços
    echo "📊 Status dos serviços:"
    docker-compose ps
    
    echo ""
    echo "🎉 Aplicação iniciada com sucesso!"
    echo ""
    echo "📍 URLs disponíveis:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8080/api"
    echo "   Backend Health: http://localhost:8080/api/health"
    echo "   H2 Console: http://localhost:8080/h2-console"
    echo ""
    echo "🔧 Comandos úteis:"
    echo "   Ver logs: docker-compose logs -f"
    echo "   Parar: docker-compose down"
    echo "   Restart: docker-compose restart"
}

# Função para mostrar logs
show_logs() {
    echo "📋 Mostrando logs dos serviços..."
    docker-compose logs -f
}

# Função para parar serviços
stop_services() {
    echo "🛑 Parando serviços..."
    docker-compose down
    echo "✅ Serviços parados"
}

# Menu principal
case "${1:-run}" in
    "clean")
        cleanup
        ;;
    "build")
        build_backend
        build_frontend
        ;;
    "run")
        cleanup
        build_backend
        build_frontend
        run_docker
        ;;
    "logs")
        show_logs
        ;;
    "stop")
        stop_services
        ;;
    "restart")
        stop_services
        run_docker
        ;;
    *)
        echo "Uso: $0 {clean|build|run|logs|stop|restart}"
        echo ""
        echo "Comandos:"
        echo "  clean   - Limpar containers anteriores"
        echo "  build   - Build frontend e backend"
        echo "  run     - Build e executar (padrão)"
        echo "  logs    - Mostrar logs dos serviços"
        echo "  stop    - Parar serviços"
        echo "  restart - Reiniciar serviços"
        exit 1
        ;;
esac
