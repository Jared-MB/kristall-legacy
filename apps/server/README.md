<div align="center">
  <a href="http://kristall.app/" target="blank"><img src="https://www.kristall.app/favicon.ico" style='border-radius: 9999px; margin: 4rem 0' width="200" alt="Nest Logo" /></a>
  <h1 style='font-size:48px;'>Kristall Server</h1>
<br>
</div>

## Acerca de Kristall

Kristall es servicio para ayudar a los emprendedores a llevar un control centralizado de sus productos, ventas, clientes, ordenes.

### Misión

Facilitar la administración de los emprendedores y pequeñas empresas a través de una plataforma intuitiva y fácil de usar. Priorizando la experiencia del usuario y la calidad del servicio, para que puedan enfocarse en lo que realmente importa: **hacer crecer su negocio**.

### Visión

Ser el servicio preferido por los emprendedores y pequeñas empresas para llevar un control centralizado en su administración. Siendo reconocidos por la calidad de nuestro servicio y la satisfacción de nuestros usuarios.

### Valores

- **Transparencia**: Nos comprometemos a ser transparentes en nuestras acciones y decisiones con nuestros usuarios y nuestro equipo.

- **Responsabilidad**: Somos responsables de nuestras acciones y decisiones, buscando siempre el beneficio común.

- **Calidad**: Nos esforzamos por ofrecer un servicio de calidad, superando las expectativas de nuestros usuarios.

- **Innovación**: Buscamos constantemente nuevas formas de mejorar nuestro servicio y la experiencia de nuestros usuarios.

## Stack

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Stripe](https://stripe.com/)

## Pre requisitos

Tener instalado en el sistema:

- [Git](https://git-scm.com/downloads)
- Node.js 20.x [(nvm)](https://github.com/coreybutler/nvm-windows/releases)
- [pnpm](https://pnpm.io/installation)
- [PostgreSQL](https://www.postgresql.org/download/)

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias con `pnpm install`
3. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```
POSTGRES_HOST=
POSTGRES_USERNAME=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
DASHBOARD_URL=
CLIENT_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CRYPTO_SECRET=
CRYPTO_SALT=
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
JWT_SECRET=
```

---

> **NOTA:** Las variables serán proporcionadas por el equipo de desarrollo.

4. Ejecutar el comando `pnpm dev` para iniciar el servidor en modo desarrollo.

## Comandos para desarrollo

- `pnpm dev`: Inicia el servidor en modo desarrollo.
- `pnpm build`: Compila el proyecto.
- `pnpm doc:code`: Genera la documentación del código.

## Extensiones recomendadas

- Pretty Typescript Errors
- Error Lens
- Code Spell Checker

### Opcionales

- Thunder Client

## Estructura de carpetas

Proceso de migración a la siguiente estructura de carpetas:

    src
    ├── modules
    |    ├── [module].module.ts
    |    |    |-- controllers
    |    |    |-- dto
    |    |    |-- interfaces
    |    |    |-- services
    |    |-- [module].module.ts
    |    |    |-- controllers
    |    |    |-- dto
    |    |    |-- interfaces
    |    |    |-- services
    ├── services
    |-- decorators
    |-- entities
    |-- app.module.ts
    |-- main.ts
    tests
    .env
    (...config files)

## Propuestas

- Migrar de TypeORM a Prisma

## Kanban

- [Kanban.app](https://kanban.kristall.app)
- [Github](https://github.com/Jared-MB/Kanban)

> Para propósitos de desarrollo (no es necesario usarlo)

---

El código fuente de Kristall es privado y no está disponible para su uso, modificación o distribución fuera del equipo de desarrollo. Todo el código fuente y la propiedad intelectual del mismo pertenecen a Kristall.

Copyright © 2024 [Kristall](http://kristall.app)
