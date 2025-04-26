# task-management-app
- npm init -y
- git init

# Устанавливаем зависимости:
- npm install express cors body-parser dotenv uuid
- npm install --save-dev typescript ts-node @types/node @types/express @types/cors @types/uuid @types/jest jest ts-jest supertest @types/supertest 

# Task Manager API
Restful Api реализован на Typescript c использованием Express.js.

# Технологический стек
- Node.js
- Typescript
- Express.js
- Jest
- UUID

# Запуск
- npm run dev
- npm run build
- npm start
- npm test

# Получение всех задач 
- curl http://localhost:3000/tasks