# Teslo Shop NextJS v14

@codewithleather

TODO: [OpenGraph](https://www.opengraph.xyz/)
Ver la metadata para redes sociales cuando se despliegue en vercel

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
Show database ```npx prisma studio``` (alternativa a TablePlus o PGAdmin)

# Icons

- [React Icons](https://react-icons.github.io/react-icons/)

# clsx

- Es una dependencia que ayuda a aplicar clases de TailwindCSS condicionalmente.
- [clsx NPM link](https://www.npmjs.com/package/clsx)

# Prisma ORM

- Crear modelo a partir de la base de datos ya con tablas estructuradas: `npx prisma db pull`
- Crear cliente de Prisma `npx prisma generate` Pero para mejores practicas en NextJS se recomienda usar el de la documentacion: [Prisma Client NextJS](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution)

#  Mi Estructura de directorios y archivos en NextJS v14

public/                           # Activos estáticos como imágenes y favicon
prisma/                           # Prisma ORM
docker/                           # Directorio para volumenes de Dockers (DB)
src/                              # Directorio sources (src)
  ├── app/                        # Directorio principal para el App Router
  │   ├── layout.tsx              # Layout raíz que envuelve todas las páginas
  │   ├── page.tsx                # Página principal
  │   ├── globals.css             # Estilos globales y variables CSS
  │   └── dashboard/              # Ruta de la app
  │       ├── page.tsx            # Punto de entrada para la ruta del módulo
  │       └── layout.tsx          # Layout opcional específico del módulo
  ├── sections/                   # Módulos con componentes, hooks y utilidades del módulo
  │   └── dashboard/              # Nombre del Módulo
  │       ├── components/         # Componentes específicos del módulo
  │       ├── hooks/              # Hooks personalizados del módulo
  │       └── utils/              # Funciones de utilidad del módulo
  ├── config/                     # Configuraciones generales
  │   └── fonts.ts                # Fuentes
  ├── lib/                        # Cliente Prisma
  │   └── prisma.ts               # Cliente Prisma
  ├── store/                      # Zustand
  │   └── ui/                     # Directorio para storage de interfaz de usuario con Zustand
  │       └── ui-store.ts         # Zustand Storage
  ├── shared/                     # Componentes, hooks y utilidades compartidos
  │   ├── components/             # Componentes reutilizables
  │   ├── hooks/                  # Hooks comunes
  │   └── utils/                  # Funciones de utilidad compartidas
  └── ...                         # Otros módulos o características según sea necesario
