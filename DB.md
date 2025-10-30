# Configuración de Bases de Datos con Docker

Esta configuración permite el uso de **PostgreSQL** y **MongoDB** en un entorno de desarrollo controlado y de fácil uso.

> ⚠️ No está pensado para entorno de producción.
> ❗ **NO MODIFICAR docker-compose.yaml** directamente.

---

## 1. Requisitos

- Docker
- Docker Compose
- Archivo `.env` con las variables de entorno definidas

---

## 2. Archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# PostgreSQL (Prisma)
POSTGRES_USER=quackly_app
POSTGRES_PASSWORD=supersecret
POSTGRES_DB=quackly_core
POSTGRES_PORT=55432

# PgAdmin
PGADMIN_EMAIL=admin@quackly.com
PGADMIN_PASSWORD=adminpass
PGADMIN_PORT=5550

# MongoDB (Mongoose)
MONGO_INITDB_ROOT_USERNAME=quackly_posts_user
MONGO_INITDB_ROOT_PASSWORD=supersecret
MONGO_INITDB_DATABASE=quackly_posts
MONGO_PORT=57017

# Mongo Express
MONGOEXPRESS_PORT=5555

# URL de conexión para Prisma / PostgreSQL
DATABASE_URL="postgresql://quackly_app:supersecret@localhost:55432/quackly_core?schema=public"

# URL de conexión para Mongoose / MongoDB
MONGO_URI="mongodb://quackly_posts_user:supersecret@localhost:57017/quackly_posts?authSource=admin"

# URL de conexión para Mongo Express
MONGO_URL="mongodb://quackly_posts_user:supersecret@mongo_posts:27017/quackly_posts?authSource=admin"
```

> 🔹 Asegúrate de que los puertos no estén en uso en tu sistema.
> 🔹 Guarda el archivo en la **CARPETA RAÍZ** del proyecto.

---

## 3. Levantar los contenedores

```bash
docker-compose up -d
```

Se levantarán los siguientes contenedores:

- PostgreSQL (`postgres_clients`)
- PgAdmin (`pgadmin_clients`)
- MongoDB (`mongo_posts`)
- Mongo Express (`mongo_express_posts`)

---

## 4. Conexión a interfaces web

### 4.1 PostgreSQL / PgAdmin

- URL: `http://localhost:5550`
- Usuario: `PGADMIN_EMAIL`
- Contraseña: `PGADMIN_PASSWORD`
- Servidor en PgAdmin: `postgres_clients`
  - Hostname/address: `postgres_clients`
  - Port: `POSTGRES_PORT`
  - Username: `POSTGRES_USER`
  - Password: `POSTGRES_PASSWORD`
  - Database: `POSTGRES_DB`

### 4.2 MongoDB / Mongo Express

- URL: `http://localhost:5555`
- Usuario: `admin`
- Contraseña: `pass` (para Mongo Express)
- Base de datos: `admin` (para autenticar el usuario root)
- Server: `mongo_posts`
- Puerto: `MONGO_PORT`

> 🔹 Para crear nuevas bases de datos, puedes hacerlo desde Mongo Express o desde tu código usando Mongoose.

---

## 5. Uso rápido

1. **Prisma / PostgreSQL**: usar `DATABASE_URL` en tu `prisma.schema`.
2. **Mongoose / MongoDB**: usar `MONGO_URI` en tu proyecto Node.js.
3. **Mongo Express**: gestionar MongoDB vía web con usuario root y contraseña `adminpass`.
4. **Detener contenedores**:

   ```bash
   docker-compose down
   ```

5. **Eliminar volúmenes (reset completo)**:

   ```bash
   docker-compose down -v
   ```

---

## 6. Notas importantes

- Mongo Express requiere que `ME_CONFIG_MONGODB_AUTH_DATABASE` apunte a `admin`.
- Verifica que los puertos no estén en uso antes de levantar los contenedores.
- Los datos de PostgreSQL y MongoDB se guardan en volúmenes Docker (`pgdata` y `mongodata`) para persistencia.

---

## 7. Modificar URLs de conexión

### PostgreSQL

Formato:

```text
postgresql://<usuario>:<contraseña>@<host>:<puerto>/<database>
```

Ejemplo:

```env
DATABASE_URL="postgresql://quackly_app:supersecret@localhost:55432/quackly_core"
```

> 🔹 Actualiza este URL si cambias `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` o `POSTGRES_PORT`.

### MongoDB

Formato:

```text
mongodb://<usuario>:<contraseña>@<host>:<puerto>/<database>?authSource=admin
```

Ejemplo:

```env
MONGO_URI="mongodb://quackly_posts_user:supersecret@localhost:57017/quackly_posts?authSource=admin"
```

> 🔹 Actualiza este URL si cambias `MONGO_INITDB_DATABASE`, `MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD` o `MONGO_PORT`.

---

## 8. Resumen visual de uso

- **PostgreSQL** → Prisma → `DATABASE_URL`
- **PgAdmin** → Interfaz web → gestionar PostgreSQL
- **MongoDB** → Mongoose → `MONGO_URI`
- **Mongo Express** → Interfaz web → usuario `admin` / contraseña `pass`

Esta sección sirve como guía rápida para saber qué usar según el contexto.

---
