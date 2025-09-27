#!/bin/bash

# Função para aguardar o backend estar pronto
wait_for_backend() {
    echo "Aguardando o backend Spring Boot estar pronto..."
    local max_attempts=30
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -f http://localhost:8080/api/health/simple >/dev/null 2>&1; then
            echo "Backend está pronto!"
            return 0
        fi
        echo "Backend ainda não está pronto, aguardando... (tentativa $((attempt + 1))/$max_attempts)"
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "Timeout: Backend não ficou pronto em $((max_attempts * 2)) segundos"
    return 1
}

# Função para iniciar o nginx
start_nginx() {
    echo "Iniciando nginx..."
    nginx -g "daemon off;" &
    NGINX_PID=$!
    echo "Nginx iniciado com PID: $NGINX_PID"
}

# Função para iniciar o backend Spring Boot
start_backend() {
    echo "Iniciando backend Spring Boot..."
    java -jar app.jar &
    BACKEND_PID=$!
    echo "Backend iniciado com PID: $BACKEND_PID"
}

# Função para cleanup ao sair
cleanup() {
    echo "Recebido sinal de parada, finalizando processos..."
    if [ ! -z "$NGINX_PID" ]; then
        kill $NGINX_PID
    fi
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID
    fi
    exit 0
}

# Configurar trap para cleanup
trap cleanup SIGTERM SIGINT

# Iniciar backend primeiro
start_backend

# Aguardar backend estar pronto
if wait_for_backend; then
    # Iniciar nginx
    start_nginx
    
    echo "Aplicação totalmente iniciada!"
    echo "Frontend disponível em: http://localhost"
    echo "Backend API disponível em: http://localhost/api"
    echo "Status da aplicação: http://localhost/api/health"
    
    # Manter o container rodando
    wait
else
    echo "Falha ao iniciar a aplicação"
    exit 1
fi
