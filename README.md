# Teslo Shop NextJS v14
@codewithleather

## Getting Started
1. Clonar repositorio.
2. Crear una copia del archivo `.env.templete`, renombrarlo a `.env` y cambiar las variables de entorno.
3. Instalar dependencias ```npm i```
4. Levantar la base de datos ```docker compose up -d``` (Se necesita tener Docker Desktop abierto)
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Correr el proyecto ```npm run dev```

Open [http://localhost:7777](http://localhost:7777) with your browser to see the result.

# Icons
- [React Icons](https://react-icons.github.io/react-icons/)

# clsx

- Es una dependencia que ayuda a aplicar clases de TailwindCSS condicionalmente.
- [clsx NPM link](https://www.npmjs.com/package/clsx)

# Prisma ORM

- Crear modelo a partir de la base de datos ya con tablas estructuradas: ```npx prisma db pull```