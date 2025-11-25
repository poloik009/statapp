# Быстрая настройка StatApp

## 1. Подпишите манифест (5 минут)

### Через браузер (без телефона):
1. Откройте [base.build](https://base.build)
2. Login → Continue with Farcaster (через браузер)
3. Preview → Account Association
4. Введите `statapp-nine.vercel.app`
5. Submit → Verify → Sign

Скопируйте три значения: `header`, `payload`, `signature`

## 2. Добавьте в Vercel (2 минуты)

1. [vercel.com/dashboard](https://vercel.com/dashboard) → ваш проект
2. Settings → Environment Variables
3. Добавьте:
   \`\`\`
   FARCASTER_HEADER=eyJmaWQ...
   FARCASTER_PAYLOAD=eyJkb21h...
   FARCASTER_SIGNATURE=MHgxMGQ...
   \`\`\`
4. Save → Deployments → Redeploy

## 3. Готово!

Проверьте:
- https://statapp-nine.vercel.app/.well-known/farcaster.json
- Farcaster Manifests → Refresh

✅ Приложение работает!

---

**Проблемы?** Читайте ASSOCIATION_GUIDE.md
