# Configuración de Bases de Datos con Docker

Esta configuración permite el uso de **PostgreSQL** y **MongoDB** en un entorno de desarrollo controlado y de fácil uso.

> ⚠️ No está pensado para entorno de producción.
> ❗ **NO MODIFICAR docker-compose.yaml** directamente.

---

## 1. Requisitos

* Docker
* Docker Compose
* Archivo `.env` con las variables de entorno definidas

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
```

> 🔹 Asegúrate de que los puertos no estén en uso en tu sistema.
> 🔹 Guarda el archivo en la **CARPETA RAÍZ** del proyecto.

---

## 3. Levantar los contenedores

Ejecuta:

```bash
docker-compose up -d
```

Esto levantará:

* PostgreSQL (`postgres_clients`)
* PgAdmin (`pgadmin_clients`)
* MongoDB (`mongo_posts`)
* Mongo Express (`mongo_express_posts`)

---

## 4. Conexión a interfaces web

### PostgreSQL / PgAdmin

* URL: `http://localhost:5550`
* Usuario: definido en `PGADMIN_EMAIL`
* Contraseña: definida en `PGADMIN_PASSWORD`
* Servidor en PgAdmin: `postgres_clients`

  * Hostname/address: `postgres_clients`
  * Port: `POSTGRES_PORT`
  * Username: `POSTGRES_USER`
  * Password: `POSTGRES_PASSWORD`
  * Database: `POSTGRES_DB`

---

### MongoDB / Mongo Express

* URL: `http://localhost:5555`
* Usuario: `MONGO_INITDB_ROOT_USERNAME`
* Contraseña: `MONGO_INITDB_ROOT_PASSWORD`
* Base de datos: `admin` (para autenticar el usuario root)
* Server: `mongo_posts`
* Puerto: `MONGO_PORT`

> 🔹 Para crear nuevas bases de datos, puedes hacerlo desde Mongo Express o desde tu código usando Mongoose.

---

## 5. Notas importantes

* Mongo Express requiere que `ME_CONFIG_MONGODB_AUTH_DATABASE` apunte a `admin`.
* Siempre verifica que los puertos no estén en uso.
* Los datos de PostgreSQL y MongoDB se guardan en volúmenes Docker (`pgdata` y `mongodata`) para persistencia.

---

## 6. Detener los contenedores

```bash
docker-compose down
```

Eliminar volúmenes también:

```bash
docker-compose down -v
```

---

## 7. Uso con Prisma y Mongoose

* **PostgreSQL:** usa `DATABASE_URL` en tu `prisma.schema`.
* **MongoDB:** usa `MONGO_URI` en tu proyecto con Mongoose:

```env
DATABASE_URL="postgresql://quackly_app:supersecret@localhost:55432/quackly_core"
MONGO_URI="mongodb://quackly_posts_user:supersecret@localhost:57017/quackly_posts?authSource=admin"
```

> 🔹 Actualiza estos URLs si cambias las variables de entorno.

---

### Modificar el URL de conexión de cada DB

#### PostgreSQL

Formato:

```text
postgresql://<usuario>:<contraseña>@<host>:<puerto>/<database>
```

Ejemplo:

```env
DATABASE_URL="postgresql://quackly_app:supersecret@localhost:55432/quackly_core"
```

Si cambias:

* `POSTGRES_DB`
* `POSTGRES_USER`
* `POSTGRES_PASSWORD`
* `POSTGRES_PORT`

…debes actualizar también este URL en `prisma.schema` o cualquier proyecto que se conecte a PostgreSQL.

---

#### MongoDB

Formato:

```text
mongodb://<usuario>:<contraseña>@<host>:<puerto>/<database>?authSource=admin
```

Ejemplo:

```env
MONGO_URI="mongodb://quackly_posts_user:supersecret@localhost:57017/quackly_posts?authSource=admin"
```

Si cambias:

* `MONGO_INITDB_DATABASE`
* `MONGO_INITDB_ROOT_USERNAME`
* `MONGO_INITDB_ROOT_PASSWORD`
* `MONGO_PORT`

…debes actualizar también este URL en tu proyecto Node.js con Mongoose.
---
