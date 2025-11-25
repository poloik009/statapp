#!/bin/bash

# Скрипт для проверки манифеста Farcaster

DOMAIN="statapp-nine.vercel.app"
MANIFEST_URL="https://$DOMAIN/.well-known/farcaster.json"

echo "🔍 Проверка манифеста Farcaster..."
echo "Domain: $DOMAIN"
echo "URL: $MANIFEST_URL"
echo ""

# Проверка доступности
echo "📡 Проверка доступности манифеста..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $MANIFEST_URL)

if [ $STATUS -eq 200 ]; then
  echo "✅ Манифест доступен (HTTP $STATUS)"
else
  echo "❌ Манифест недоступен (HTTP $STATUS)"
  exit 1
fi

echo ""

# Получение и проверка содержимого
echo "📄 Содержимое манифеста:"
MANIFEST=$(curl -s $MANIFEST_URL)
echo "$MANIFEST" | jq '.'

echo ""

# Проверка accountAssociation
HEADER=$(echo "$MANIFEST" | jq -r '.accountAssociation.header')
PAYLOAD=$(echo "$MANIFEST" | jq -r '.accountAssociation.payload')
SIGNATURE=$(echo "$MANIFEST" | jq -r '.accountAssociation.signature')

echo "🔐 Проверка Account Association:"
if [ "$HEADER" != "" ] && [ "$HEADER" != "null" ]; then
  echo "✅ Header заполнен"
else
  echo "❌ Header пустой"
fi

if [ "$PAYLOAD" != "" ] && [ "$PAYLOAD" != "null" ]; then
  echo "✅ Payload заполнен"
else
  echo "❌ Payload пустой"
fi

if [ "$SIGNATURE" != "" ] && [ "$SIGNATURE" != "null" ]; then
  echo "✅ Signature заполнена"
else
  echo "❌ Signature пустая"
fi

echo ""

# Проверка miniapp конфигурации
NAME=$(echo "$MANIFEST" | jq -r '.miniapp.name')
echo "📱 Mini App конфигурация:"
echo "Name: $NAME"

if [ "$HEADER" != "" ] && [ "$PAYLOAD" != "" ] && [ "$SIGNATURE" != "" ]; then
  echo ""
  echo "✅ Манифест полностью настроен!"
  echo "🎉 Ваше приложение готово к работе в Farcaster"
else
  echo ""
  echo "⚠️  Требуется подпись манифеста"
  echo "📖 Читайте ASSOCIATION_GUIDE.md для инструкций"
fi
