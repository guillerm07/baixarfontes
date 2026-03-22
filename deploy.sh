#!/bin/bash
# =============================================================================
# BaixarFontes - Script de implantação de dados
# =============================================================================
# Este script envia os arquivos pesados (DB, TTFs, ZIPs) ao servidor.
# O código da app é implantado via Git → Coolify.
#
# Uso:
#   ./deploy.sh usuario@servidor
#
# Requisitos:
#   - rsync instalado localmente e no servidor
#   - Acesso SSH ao servidor
# =============================================================================

set -e

if [ -z "$1" ]; then
  echo "Uso: ./deploy.sh usuario@servidor"
  echo ""
  echo "Exemplo: ./deploy.sh root@45.67.89.123"
  exit 1
fi

SERVER="$1"
REMOTE_BASE="/srv/baixarfontes"

# Caminhos locais
LOCAL_DB="prisma/dev.db"
LOCAL_TTFS="public/fonts/"
LOCAL_ZIPS="c:/Users/guill/Documents/fuentes-scraper/output/fonts/"

echo "========================================"
echo "  BaixarFontes - Deploy de dados"
echo "========================================"
echo ""
echo "Servidor: $SERVER"
echo "Destino:  $REMOTE_BASE"
echo ""

# 1. Criar diretórios no servidor
echo "[1/4] Criando diretórios no servidor..."
ssh "$SERVER" "mkdir -p $REMOTE_BASE/data/fonts-zip $REMOTE_BASE/fonts-preview"

# 2. Enviar banco de dados SQLite
echo ""
echo "[2/4] Enviando banco de dados ($(du -sh $LOCAL_DB | cut -f1))..."
rsync -ahP "$LOCAL_DB" "$SERVER:$REMOTE_BASE/data/prod.db"

# 3. Enviar TTFs para pré-visualizações (~12 GB)
echo ""
echo "[3/4] Enviando TTFs para pré-visualizações (~12 GB)..."
echo "       Isso vai demorar um pouco. Você pode cancelar com Ctrl+C e retomar depois."
rsync -ahP --info=progress2 "$LOCAL_TTFS" "$SERVER:$REMOTE_BASE/fonts-preview/"

# 4. Enviar ZIPs para download (~25 GB)
echo ""
echo "[4/4] Enviando ZIPs para download (~25 GB)..."
echo "       Isso vai demorar bastante. Você pode cancelar com Ctrl+C e retomar depois."
rsync -ahP --info=progress2 "$LOCAL_ZIPS" "$SERVER:$REMOTE_BASE/data/fonts-zip/"

echo ""
echo "========================================"
echo "  Deploy concluído!"
echo "========================================"
echo ""
echo "Estrutura no servidor:"
echo "  $REMOTE_BASE/"
echo "  ├── data/"
echo "  │   ├── prod.db          (SQLite)"
echo "  │   └── fonts-zip/       (ZIPs ~25 GB)"
echo "  │       └── [a-z]/[slug]/[slug].zip"
echo "  └── fonts-preview/       (TTFs ~12 GB)"
echo "      └── [slug].ttf|.otf"
echo ""
echo "Agora configure no Coolify:"
echo "  - ADMIN_PASSWORD=sua-senha-segura"
echo "  - Volumes conforme docker-compose.yml"
