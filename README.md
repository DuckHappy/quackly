# Quackly - Scripts del Proyecto

Este documento explica los scripts disponibles en el proyecto `Quackly` y cómo utilizarlos con `pnpm`.

---

## Scripts de NestJS

| Comando            | Descripción                                                   |
| ------------------ | ------------------------------------------------------------- |
| `pnpm build`       | Compila el proyecto NestJS y genera la carpeta `dist`.        |
| `pnpm start`       | Inicia la aplicación en modo producción.                      |
| `pnpm start:dev`   | Inicia la aplicación en modo desarrollo con hot reload.       |
| `pnpm start:debug` | Inicia la aplicación en modo debug con hot reload.            |
| `pnpm start:prod`  | Inicia la aplicación desde los archivos compilados en `dist`. |

---

## Formato y Linter

| Comando       | Descripción                                                         |
| ------------- | ------------------------------------------------------------------- |
| `pnpm format` | Formatea el código según las reglas de Prettier.                    |
| `pnpm lint`   | Ejecuta ESLint y corrige automáticamente los problemas encontrados. |

---

## Testing

| Comando           | Descripción                                                           |
| ----------------- | --------------------------------------------------------------------- |
| `pnpm test`       | Ejecuta todos los tests unitarios.                                    |
| `pnpm test:watch` | Ejecuta los tests en modo watch (re-ejecuta al guardar cambios).      |
| `pnpm test:cov`   | Ejecuta los tests y genera el reporte de cobertura de código.         |
| `pnpm test:debug` | Ejecuta los tests en modo debug para depuración.                      |
| `pnpm test:e2e`   | Ejecuta los tests end-to-end usando la configuración `jest-e2e.json`. |

---

## Prisma (Postgres)

| Comando                | Descripción                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `pnpm prisma:generate` | Genera el cliente de Prisma según el esquema.                       |
| `pnpm prisma:migrate`  | Aplica migraciones y crea la base de datos inicial si es necesario. |
| `pnpm prisma:studio`   | Abre Prisma Studio para explorar la base de datos visualmente.      |
| `pnpm prisma:reset`    | Resetea la base de datos y aplica migraciones desde cero.           |

> Todos los comandos de Prisma usan el esquema definido en `src/database/postgres/prisma/schema.prisma`.

---

## Docker

| Comando                  | Descripción                                                                       |
| ------------------------ | --------------------------------------------------------------------------------- |
| `pnpm docker:up`         | Inicia todos los contenedores definidos en `docker-compose.yml` en segundo plano. |
| `pnpm docker:down`       | Detiene todos los contenedores.                                                   |
| `pnpm docker:logs`       | Muestra los logs en tiempo real de todos los contenedores.                        |
| `pnpm docker:volumes:rm` | Elimina todos los contenedores y volúmenes definidos en `docker-compose.yml`.     |

---

> Todos los scripts se ejecutan usando `pnpm <script>`, por ejemplo:
>
> ```bash
>  pnpm start:dev
>  pnpm prisma:generate
>  pnpm docker:up
> ```
