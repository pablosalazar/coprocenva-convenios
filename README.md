# Convenios Coprocenva

Plataforma para la gestión de convenios, beneficios, aliados, asociados y bonos.

Incluye un **portal público** para que los asociados consulten beneficios y generen bonos, y un **panel administrativo** para que el equipo interno gestione la operación del sistema.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- tRPC + TanStack Query
- [Drizzle ORM](https://orm.drizzle.team) + MySQL
- [shadcn/ui](https://ui.shadcn.com) + Lucide React
- [Tailwind CSS](https://tailwindcss.com) 4
- TypeScript

## Getting started

```bash
pnpm install
cp .env.example .env   # configure DATABASE_URL
pnpm dev
```

### Database (Drizzle + MySQL)

```bash
pnpm db:generate   # generate SQL migrations from schema changes
pnpm db:migrate    # apply migrations
pnpm db:push       # push schema directly (dev only)
pnpm db:studio     # open Drizzle Studio
```

Open [http://localhost:3000](http://localhost:3000).

## Documentación

- [Contexto general del proyecto](docs/product/contexto-general.md) — objetivos, módulos, entidades, fases y criterios técnicos.
- [Estructura de carpetas](docs/architecture/folder-structure.md) — arquitectura, capas, convenciones y anti-patrones.

## Desarrollo por fases

El sistema se construye incrementalmente. La **Fase 1 (MVP)** cubre autenticación, portal público básico, CRUD de convenios/aliados/categorías, generación de bonos en PDF y permisos mínimos del panel admin. Ver detalle en la documentación de producto.
