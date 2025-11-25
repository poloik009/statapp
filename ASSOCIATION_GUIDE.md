# Руководство по ассоциации аккаунта Farcaster

## Проблема
Приложение требует подписи манифеста вашим Farcaster кошельком для работы. Это нельзя обойти - это требование безопасности Farcaster.

## Решение 1: Использование Base Build (РЕКОМЕНДУЕТСЯ)

Это самый простой способ без использования телефона:

### Шаг 1: Перейдите на Base Build
1. Откройте [base.build](https://base.build)
2. Нажмите "Login" в правом верхнем углу
3. Выберите "Continue with Farcaster"
4. Войдите через браузер (НЕ через QR код)

### Шаг 2: Создайте Account Association
1. После входа, перейдите в раздел **Preview**
2. Нажмите на вкладку **Account Association** слева
3. В поле "App URL" введите: `statapp-nine.vercel.app`
4. Нажмите кнопку **Submit**
5. Нажмите **Verify** (проверит ваш манифест)
6. Нажмите **Sign** и подтвердите в MetaMask/кошельке

### Шаг 3: Скопируйте значения
После подписи вы увидите три значения:
\`\`\`json
{
  "header": "eyJmaWQ...",
  "payload": "eyJkb21h...",
  "signature": "MHgxMGQ..."
}
\`\`\`

### Шаг 4: Добавьте в Vercel
1. Откройте [vercel.com/dashboard](https://vercel.com/dashboard)
2. Выберите проект **statapp-nine**
3. Перейдите в **Settings** → **Environment Variables**
4. Добавьте три переменные:
   - `FARCASTER_HEADER` = (значение header)
   - `FARCASTER_PAYLOAD` = (значение payload)
   - `FARCASTER_SIGNATURE` = (значение signature)
5. Нажмите **Save**
6. Перейдите в **Deployments** и нажмите **Redeploy**

### Шаг 5: Проверка
1. Подождите 1-2 минуты пока деплой завершится
2. Откройте https://statapp-nine.vercel.app/.well-known/farcaster.json
3. Убедитесь что `header`, `payload`, `signature` заполнены
4. Вернитесь в Farcaster и нажмите **Refresh** в Manifests

✅ **Готово!** Ассоциация будет работать автоматически.

---

## Решение 2: Использование Farcaster CLI (альтернатива)

Если Base Build не работает, используйте CLI:

### Установка и запуск
\`\`\`bash
# В корне проекта выполните:
npx create-onchain --manifest
\`\`\`

### Что произойдет:
1. CLI откроет браузер с интерфейсом
2. Войдите через Farcaster
3. Введите `statapp-nine.vercel.app`
4. Подпишите через кошелек
5. CLI создаст файл `.env.local` с переменными

### Скопируйте в Vercel
После создания `.env.local`, скопируйте значения в Environment Variables в Vercel (как в Шаге 4 выше).

---

## Решение 3: Ручная генерация (для продвинутых)

Если у вас есть приватный ключ вашего Farcaster custody wallet:

\`\`\`bash
npm install -g @farcaster/auth
farcaster-auth sign-manifest --domain statapp-nine.vercel.app
\`\`\`

---

## Важные замечания

1. **Это одноразовая процедура** - после подписи ассоциация работает постоянно
2. **Безопасность** - подпись нужна чтобы доказать что вы владелец домена
3. **Без подписи** - приложение не будет работать в Farcaster клиентах
4. **Обновление** - при смене домена нужна новая подпись

---

## Проверка статуса

После настройки проверьте:
- ✅ https://statapp-nine.vercel.app/.well-known/farcaster.json возвращает заполненные значения
- ✅ В Farcaster Manifests показывает "Valid account association"
- ✅ Mini App Preview работает

## Помощь

Если возникли проблемы:
1. Убедитесь что вы вошли в Base Build с тем же Farcaster аккаунтом
2. Проверьте что домен в манифесте совпадает: `statapp-nine.vercel.app`
3. Убедитесь что environment variables добавлены в Vercel
4. Попробуйте Redeploy проекта в Vercel
