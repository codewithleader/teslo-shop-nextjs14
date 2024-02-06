# Teslo Shop NextJS v14

@codewithleather

TODO: [https://www.npmjs.com/package/sharp](https://www.npmjs.com/package/sharp)
Optimizar imagenes con sharp

# Description

## Getting Started

## Run Dev

1. Clone repository.
2. Copy `.env.template`, rename it to `.env` and change the environment variables.
3. Install dependencies `npm install`
4. Build database `docker compose up -d`
5. Run migrations `npx prisma migrate dev`
6. Run seed `npm run seed`
7. Run project `npm run dev`

Open [http://localhost:7777](http://localhost:7777) with your browser to see the result.

# Icons

- [React Icons](https://react-icons.github.io/react-icons/)

# clsx

- Es una dependencia que ayuda a aplicar clases de TailwindCSS condicionalmente.
- [clsx NPM link](https://www.npmjs.com/package/clsx)

# Prisma ORM

- Crear modelo a partir de la base de datos ya con tablas estructuradas: `npx prisma db pull`
- Crear cliente de Prisma `npx prisma generate` Pero para mejores practicas en NextJS se recomienda usar el de la documentacion: [Prisma Client NextJS](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution)
