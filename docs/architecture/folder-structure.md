# Estructura de carpetas

Convención de organización del proyecto. Seguir esta estructura al crear archivos nuevos, salvo que haya una razón explícita para desviarse.

## Stack

- Next.js 16 (App Router)
- tRPC + TanStack Query
- Drizzle ORM + MySQL
- shadcn/ui + Lucide React
- TypeScript

## Principio rector

```text
app/          → rutas, layouts, páginas delgadas
server/       → API (tRPC), reglas de negocio, DB, auth, integraciones
components/   → UI reutilizable (shadcn + composiciones por dominio)
lib/          → utilidades client-side (tRPC client, cn(), helpers)
```

## Flujo de datos

```text
Page / Component
  → tRPC router (validación + permisos)
    → Service / use-case (reglas de negocio)
      → Drizzle + MySQL
      → Integraciones (PDF, email, storage...)
```

TanStack Query consume tRPC vía el provider en `app/providers.tsx`. No duplicar fetching fuera de tRPC salvo casos excepcionales (SSR inicial, assets estáticos).

## Árbol de carpetas

```text
coprocenva-convenios/
├── app/
│   ├── (portal)/                    # Portal público (asociados)
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Home convenios
│   │   ├── convenios/
│   │   │   ├── page.tsx             # Listado / búsqueda
│   │   │   └── [slug]/page.tsx      # Detalle beneficio
│   │   ├── categorias/[slug]/
│   │   ├── aliados/[slug]/
│   │   ├── bonos/
│   │   └── auth/
│   │       ├── login/page.tsx
│   │       └── ...
│   │
│   ├── (admin)/                     # Panel administrativo
│   │   ├── layout.tsx               # Shell admin + nav
│   │   └── admin/
│   │       ├── page.tsx             # Dashboard
│   │       ├── convenios/
│   │       ├── aliados/
│   │       ├── categorias/
│   │       ├── bonos/
│   │       └── usuarios/
│   │
│   ├── api/
│   │   └── trpc/[trpc]/route.ts     # Handler HTTP de tRPC
│   │
│   ├── layout.tsx                   # Root layout + providers
│   ├── providers.tsx                # TRPCProvider + QueryClientProvider
│   └── globals.css
│
├── components/
│   ├── ui/                          # shadcn (Button, Dialog, Table...)
│   ├── shared/                      # Header, Footer, SearchBar, DataTable...
│   ├── portal/                      # UI solo del portal
│   │   ├── convenio-card.tsx
│   │   └── bono-download-button.tsx
│   └── admin/                       # UI solo del admin
│       ├── admin-sidebar.tsx
│       └── convenio-form.tsx
│
├── lib/
│   ├── utils.ts                     # cn() de shadcn
│   └── trpc/
│       ├── client.ts                # createTRPCReact / links
│       └── query-client.ts          # QueryClient config (staleTime, etc.)
│
├── server/
│   ├── api/
│   │   ├── trpc.ts                  # initTRPC, context, procedures base
│   │   ├── root.ts                  # appRouter = merge de routers
│   │   └── routers/
│   │       ├── convenios.ts
│   │       ├── aliados.ts
│   │       ├── categorias.ts
│   │       ├── bonos.ts
│   │       └── auth/
│   │           ├── asociado.ts
│   │           └── admin.ts
│   │
│   ├── db/
│   │   ├── index.ts                 # drizzle(mysql2 pool)
│   │   └── schema/
│   │       ├── index.ts             # re-export de tablas
│   │       ├── convenios.ts
│   │       ├── aliados.ts
│   │       ├── bonos.ts
│   │       ├── auth.ts              # users, roles, permissions
│   │       └── relations.ts         # relaciones Drizzle
│   │
│   ├── services/                    # Lógica de negocio
│   │   ├── convenios/
│   │   │   ├── list-convenios.ts
│   │   │   ├── create-convenio.ts
│   │   │   └── get-convenio-by-slug.ts
│   │   ├── bonos/
│   │   │   ├── generate-bono.ts
│   │   │   └── validate-bono.ts
│   │   └── auth/
│   │
│   ├── validators/                  # Schemas Zod (input tRPC + forms)
│   │   ├── convenio.schema.ts
│   │   └── bono.schema.ts
│   │
│   ├── auth/
│   │   ├── session.ts
│   │   ├── asociado-session.ts
│   │   └── admin-session.ts
│   │
│   └── integrations/                # Desacoplado del dominio
│       ├── pdf/
│       ├── email/
│       ├── excel/
│       └── storage/
│
├── drizzle/
│   └── migrations/
├── drizzle.config.ts
├── docs/
└── types/                           # Tipos globales que no vienen de Drizzle/Zod
```

## Responsabilidad de cada capa

### `app/` — routing y composición

Las páginas deben ser **delgadas**: fetch vía hooks de tRPC, renderizan componentes.

Usar **route groups** `(portal)` y `(admin)` para separar layouts, auth y navegación sin afectar la URL pública.

### `server/api/routers/` — tRPC delgado

Los routers no contienen reglas de negocio complejas. Solo:

1. Validar input (Zod)
2. Verificar permisos (procedure middleware)
3. Llamar al service
4. Mapear errores

### `server/services/` — reglas de negocio

Aquí vive la lógica de dominio: vigencia de bonos, estado del asociado, permisos a nivel negocio, efectos secundarios (PDF, email).

Los services usan Drizzle directamente al inicio. Si las queries crecen, extraer `server/repositories/`.

### `server/db/schema/` — persistencia

Un archivo por agregado/entidad. Relaciones en `relations.ts` o junto a cada tabla.

### `server/integrations/` — proveedores externos

Implementaciones desacopladas (PDF, email, Excel, storage). Los services llaman integraciones; cambiar proveedor solo afecta esta carpeta.

### `components/ui/` — shadcn

Componentes primitivos generados con la CLI de shadcn. Sin lógica de negocio.

### `components/portal/` y `components/admin/`

Composiciones de UI por superficie. Comparten `components/ui/` y `components/shared/`.

### `lib/trpc/` — cliente

Configuración del cliente tRPC y TanStack Query. El provider vive en `app/providers.tsx`.

## tRPC procedures

Definir en `server/api/trpc.ts`:

| Procedure | Uso |
|---|---|
| `publicProcedure` | Portal: listar convenios, detalle público |
| `asociadoProcedure` | Acciones de asociado autenticado: generar bono, calificar |
| `adminProcedure` | CRUD admin base |
| `adminProcedure` + permiso | RBAC fino (`convenios:write`, etc.) |

## Organización por dominio vs por tipo

Enfoque **híbrido**:

| Capa | Organización |
|---|---|
| Routers, services, validators, schema DB | Por dominio (`convenios/`, `bonos/`) |
| UI compartida, infra, auth, integraciones | Por tipo técnico |
| Rutas | Por superficie (`(portal)`, `(admin)`) |

Preferir `server/services/convenios/create-convenio.ts` sobre un monolito `convenios.ts` de cientos de líneas.

## Schemas Zod

Un schema en `server/validators/`, reutilizado en tRPC y en formularios del admin (react-hook-form). No duplicar validaciones.

## MVP — carpetas mínimas

Crear al inicio de Fase 1; el resto se agrega cuando se necesite.

```text
app/(portal)/...
app/(admin)/admin/...
app/api/trpc/[trpc]/route.ts
components/ui/
components/portal/
components/admin/
server/api/trpc.ts, root.ts, routers/{convenios,aliados,categorias,bonos,auth}
server/db/schema/
server/services/{convenios,bonos,auth}
server/validators/
server/auth/
lib/trpc/
drizzle/
```

Integraciones (`pdf`, `email`), módulos de Fase 2 y `repositories/` se agregan cuando corresponda.

## Anti-patrones

1. **Lógica de negocio en `components/`** — solo presentación y estado local de UI.
2. **Queries Drizzle complejas en routers tRPC** — delegar al service.
3. **Portal y admin en un solo layout** — layouts y auth distintos desde el inicio.
4. **Duplicar schemas** — un Zod schema, múltiples consumidores.
5. **Dependencia directa de proveedores** en services — usar `server/integrations/`.
