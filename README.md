# StatApp - Farcaster Statistics App

Минималистичное приложение для просмотра статистики пользователей Farcaster.

## Возможности

- Подключение через Farcaster Wallet
- Просмотр статистики:
  - Общее количество постов
  - Общее количество лайков
  - Общее количество репостов
  - Статус спама
- Минималистичный дизайн в фирменных фиолетовых тонах Farcaster

## Технологии

- Next.js 16
- React 19
- TypeScript 5.8.3
- Farcaster Frame SDK
- Wagmi для подключения кошелька
- Tailwind CSS v4
- shadcn/ui компоненты

## Быстрый старт

### 1. Клонируйте репозиторий

\`\`\`bash
git clone <your-repo-url>
cd statapp
\`\`\`

### 2. Установите зависимости

\`\`\`bash
npm install
\`\`\`

### 3. Запустите в режиме разработки

\`\`\`bash
npm run dev
\`\`\`

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Деплой в Vercel

### Способ 1: Через GitHub (Рекомендуется)

1. Создайте новый репозиторий на GitHub
2. Загрузите код:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   \`\`\`
3. Зайдите на [vercel.com](https://vercel.com)
4. Нажмите "New Project"
5. Импортируйте ваш GitHub репозиторий
6. Нажмите "Deploy"

### Способ 2: Через Vercel CLI

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

## Настройка Farcaster Manifest

После деплоя нужно подписать манифест для ассоциации с вашим Farcaster аккаунтом:

1. Откройте [base.dev](https://base.dev)
2. Войдите через Base Account
3. Перейдите в раздел Preview → Account Association
4. Введите URL вашего приложения (например, `statapp-nine.vercel.app`)
5. Нажмите Submit → Verify → Sign
6. Подпишите транзакцию в кошельке
7. Скопируйте значения `header`, `payload` и `signature`
8. Добавьте их как переменные окружения в Vercel:
   - `FARCASTER_HEADER`
   - `FARCASTER_PAYLOAD`
   - `FARCASTER_SIGNATURE`

### Добавление переменных окружения в Vercel:

1. Откройте ваш проект в Vercel
2. Перейдите в Settings → Environment Variables
3. Добавьте три переменные:
   - Name: `FARCASTER_HEADER`, Value: (значение header)
   - Name: `FARCASTER_PAYLOAD`, Value: (значение payload)
   - Name: `FARCASTER_SIGNATURE`, Value: (значение signature)
4. Нажмите "Save"
5. Выполните редеплой: Deployments → последний деплой → три точки → Redeploy

## Структура проекта

\`\`\`
├── app/
│   ├── .well-known/
│   │   └── farcaster.json/
│   │       └── route.ts          # Farcaster manifest endpoint
│   ├── api/
│   │   └── stats/
│   │       └── [fid]/
│   │           └── route.ts      # API для получения статистики
│   ├── layout.tsx                # Root layout с мета-тегами
│   ├── page.tsx                  # Главная страница
│   └── globals.css               # Глобальные стили
├── components/
│   ├── connect-button.tsx        # Кнопка подключения кошелька
│   ├── stats-display.tsx         # Отображение статистики
│   └── stats-card.tsx            # Карточка статистики
├── hooks/
│   ├── use-farcaster-context.ts  # Хук для Farcaster SDK
│   └── use-user-stats.ts         # Хук для загрузки статистики
├── lib/
│   ├── farcaster-sdk.ts          # Инициализация Farcaster SDK
│   ├── wagmi-config.ts           # Конфигурация Wagmi
│   └── providers.tsx             # React провайдеры
└── public/
    └── icon.svg                  # Иконка приложения
\`\`\`

## Интеграция с Farcaster Hub

По умолчанию приложение использует моковые данные. Для получения реальной статистики нужно интегрировать Farcaster Hub API в файле `app/api/stats/[fid]/route.ts`.

## Лицензия

MIT
\`\`\`

```ts file="" isHidden
