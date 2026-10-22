# Kristall

> [!WARNING]
> **Este proyecto está archivado y fuera de línea.** Kristall ya no está en producción ni recibe mantenimiento. El código se conserva únicamente como archivo para que cualquiera pueda consultarlo.

Kristall era un gestor de inventarios, pedidos y punto de venta para pequeños negocios y emprendedores. Este repositorio es el monorepo completo de la aplicación.

## Qué hacía

- **Pedidos:** crear pedidos para los clientes y compartirlos por el medio que prefirieran, con seguimiento del estado.
- **Punto de venta:** caja para negocios físicos.
- **Inventario y catálogo:** productos, categorías y ubicaciones.
- **Clientes, cuentas bancarias, gastos y reportes** con analíticas del negocio.
- **Roles y permisos:** control de a qué puede acceder cada empleado.
- **Tienda en línea y showroom virtual** para cada negocio, con pagos mediante Stripe.

## Estructura del monorepo

Gestionado con [pnpm](https://pnpm.io) workspaces y [Turborepo](https://turbo.build).

### `apps/`

| App | Descripción |
| --- | --- |
| `landing` | Página pública, tiendas y seguimiento de pedidos (Next.js) |
| `dashboard` | Panel de administración del negocio (Next.js) |
| `pos` | Punto de venta (Next.js) |
| `virtual-showroom` | Showroom virtual de cada tienda (Next.js) |
| `status` | Página de estado de los servicios (Next.js) |
| `server` | API REST (NestJS, TypeORM, PostgreSQL, Redis) |
| `docs` | Documentación para desarrolladores (Astro Starlight) |

### `packages/`

| Paquete | Descripción |
| --- | --- |
| `core` | Lógica de dominio compartida entre las apps |
| `client` | Cliente para consumir la API |
| `http` | Capa HTTP para Next.js (submódulo de git, [`Jared-MB/http-nextjs`](https://github.com/Jared-MB/http-nextjs)) |
| `ui` | Componentes de interfaz compartidos |
| `shared`, `utils`, `logger`, `try-catch` | Utilidades comunes |
| `typescript-config` | Configuración compartida de TypeScript |

## Probarlo en local

El proyecto no está pensado para volver a desplegarse tal cual, pero puedes levantarlo para explorarlo.

Requisitos: Node.js, pnpm 8 y, para el servidor, PostgreSQL y Redis.

```bash
# El paquete `http` es un submódulo, clona con él
git clone --recurse-submodules https://github.com/Jared-MB/kristall-legacy.git
cd kristall-legacy

pnpm install
```

Copia `apps/server/.env.example` a `apps/server/.env` y completa las variables (base de datos, Redis, Stripe, JWT, etc.). Después:

```bash
pnpm dev:landing     # landing
pnpm dev:dashboard   # dashboard
pnpm dev:pos         # punto de venta
pnpm dev:server      # API
pnpm dev:docs        # documentación
```

Pruebas: `pnpm test`.

## Estado del proyecto

Archivado y fuera de línea. Puedes leer el código y aprender de él y de mis errores.
