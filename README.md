# QAZ LIVE

Адаптивный React-прототип социальной сети с лентой публикаций, профилем, XP, достижениями, персональным миром и QAZ LAB.

## Cloudflare Pages
- Build command: npm run build
- Build output directory: dist
- Framework preset: Vite

## Запуск
Node.js 18+: npm install && npm run dev

## Важно
Это frontend-демо: данные сохраняются в localStorage текущего браузера. Настоящая регистрация, общая база пользователей, серверные публикации/комментарии и реальная модерация заявок QAZ LAB пока не подключены. Перед публичным запуском подключить Cloudflare Workers + D1 и серверную проверку ролей. Не хранить секреты в клиентском коде.