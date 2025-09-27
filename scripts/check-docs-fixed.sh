#!/bin/bash

# Script para verificar se a documentação está atualizada
# Uso: ./scripts/check-docs-fixed.sh [--fix]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
FIX_MODE=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --fix)
      FIX_MODE=true
      shift
      ;;
    -h|--help)
      echo "Usage: $0 [--fix]"
      echo "  --fix    Automatically fix common documentation issues"
      exit 0
      ;;
    *)
      echo "Unknown option $1"
      exit 1
      ;;
  esac
done

cd "$PROJECT_ROOT"

echo "🔍 Verificando documentação do projeto..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "INFO")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
        "SUCCESS")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "ERROR")
            echo -e "${RED}❌ $message${NC}"
            ;;
    esac
}

# Function to check if file exists and is not empty
check_file() {
    local file=$1
    local description=$2
    
    if [[ ! -f "$file" ]]; then
        print_status "ERROR" "$description não encontrado: $file"
        return 1
    elif [[ ! -s "$file" ]]; then
        print_status "ERROR" "$description está vazio: $file"
        return 1
    else
        print_status "SUCCESS" "$description encontrado e não vazio"
        return 0
    fi
}

# Function to check markdown structure
check_markdown_structure() {
    local file=$1
    local description=$2
    
    if [[ ! -f "$file" ]]; then
        return 1
    fi
    
    local issues=0
    
    # Check for title
    if ! grep -q "^# " "$file"; then
        print_status "WARNING" "$description: Falta título principal (H1)"
        issues=$((issues + 1))
    fi
    
    # Check for author and date
    if ! grep -q "\\*\\*Autor:\\*\\*" "$file"; then
        print_status "WARNING" "$description: Falta informação do autor"
        issues=$((issues + 1))
    fi
    
    if ! grep -q "\\*\\*Data:\\*\\*" "$file"; then
        print_status "WARNING" "$description: Falta informação da data"
        issues=$((issues + 1))
    fi
    
    # Check for table of contents (if more than 3 sections)
    local h2_count=$(grep -c "^## " "$file" || true)
    if [[ $h2_count -gt 3 ]] && ! grep -q "## Sumário\|## Table of Contents\|## Índice" "$file"; then
        print_status "WARNING" "$description: Documento longo sem sumário"
        issues=$((issues + 1))
    fi
    
    return $issues
}

# Function to auto-fix common issues
auto_fix() {
    print_status "INFO" "Aplicando correções automáticas..."
    
    # Update dates in documentation files
    local current_date=$(date +"%Y-%m-%d")
    local current_year=$(date +"%Y")
    
    for doc_file in ARCHITECTURE.md API_DOCUMENTATION.md FRONTEND_DOCUMENTATION.md DEPLOYMENT.md DEVELOPMENT_STANDARDS.md; do
        if [[ -f "$doc_file" ]]; then
            # Update date if it's not today
            if ! grep -q "\\*\\*Data:\\*\\* $current_date" "$doc_file"; then
                sed -i.bak "s/\\*\\*Data:\\*\\* [0-9-]*/\\*\\*Data:\\*\\* $current_date/" "$doc_file"
                rm -f "$doc_file.bak"
                print_status "SUCCESS" "Data atualizada em $doc_file"
            fi
            
            # Update version year if needed
            if ! grep -q "\\*\\*Versão:\\*\\* $current_year" "$doc_file"; then
                sed -i.bak "s/\\*\\*Versão:\\*\\* [0-9.]*/\\*\\*Versão:\\*\\* 1.0.0/" "$doc_file"
                rm -f "$doc_file.bak"
            fi
        fi
    done
}

# Main execution
main() {
    local total_issues=0
    
    print_status "INFO" "Iniciando verificação de documentação..."
    
    # Check if documentation files exist
    check_file "ARCHITECTURE.md" "Documentação de arquitetura" || total_issues=$((total_issues + 1))
    check_file "API_DOCUMENTATION.md" "Documentação da API" || total_issues=$((total_issues + 1))
    check_file "FRONTEND_DOCUMENTATION.md" "Documentação do frontend" || total_issues=$((total_issues + 1))
    check_file "DEPLOYMENT.md" "Documentação de deployment" || total_issues=$((total_issues + 1))
    check_file "DEVELOPMENT_STANDARDS.md" "Padrões de desenvolvimento" || total_issues=$((total_issues + 1))
    
    # Check markdown structure
    for doc_file in ARCHITECTURE.md API_DOCUMENTATION.md FRONTEND_DOCUMENTATION.md DEPLOYMENT.md DEVELOPMENT_STANDARDS.md; do
        if [[ -f "$doc_file" ]]; then
            check_markdown_structure "$doc_file" "$doc_file"
            total_issues=$((total_issues + $?))
        fi
    done
    
    # Auto-fix if requested
    if [[ "$FIX_MODE" == "true" ]]; then
        auto_fix
    fi
    
    # Summary
    echo ""
    if [[ $total_issues -eq 0 ]]; then
        print_status "SUCCESS" "Documentação está atualizada e correta! 🎉"
        exit 0
    else
        print_status "ERROR" "Encontrados $total_issues problemas na documentação"
        echo ""
        print_status "INFO" "Para corrigir automaticamente problemas comuns, execute:"
        echo "  $0 --fix"
        echo ""
        print_status "INFO" "Para mais informações, consulte DEVELOPMENT_STANDARDS.md"
        exit 1
    fi
}

# Run main function
main "$@"
