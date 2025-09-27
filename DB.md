# Configuración de Bases de Datos con Docker

Esta configuracion permite el uso de base de datos mongo y postgres en un entorno controlado y de facil uso.

> tener en cuenta que no esta pensado para entorno de produccion, solo para el desarrollo

---

## 1. Requisitos

- Docker
- Docker Compose
- Archivo `.env` con las variables de entorno definidas

---

## 2. Archivo `.env`

Se debe crear un archivo `.env` con las siguientes variables:

```env
# PostgreSQL
POSTGRES_USER=client_user
POSTGRES_PASSWORD=client_pass
POSTGRES_DB=clients_db
POSTGRES_PORT=5433

# PgAdmin
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin_pass
PGADMIN_PORT=8080

# MongoDB
MONGO_INITDB_ROOT_USERNAME=posts_admin
MONGO_INITDB_ROOT_PASSWORD=posts_pass
MONGO_INITDB_DATABASE=posts_db
MONGO_PORT=27019

# Mongo Express
MONGOEXPRESS_PORT=8083
```

> Cambia los valores según tu preferencia.
> Los puertos deben ser distintos de los que ya estés usando en tu sistema.
> Se debe guardar en la **CARPETA RAIZ**

---

## 3. Levantar los contenedores

Ejecuta:

```bash
docker-compose up -d
```

Esto levantará:

- PostgreSQL (`postgres_clients`)
- PgAdmin (`pgadmin_clients`)
- MongoDB (`mongo_posts`)
- Mongo Express (`mongo_express_posts`)

---

## 4. Conexión a interfaces web

### PostgreSQL / PgAdmin

- URL: `http://localhost:8080`
- Usuario: el definido en `PGADMIN_EMAIL`
- Contraseña: la definida en `PGADMIN_PASSWORD`
- Servidor en PgAdmin: `postgres_clients`
  - Hostname/address: `postgres_clients`
  - Port: el definido en `POSTGRES_PORT`
  - Username: `POSTGRES_USER`
  - Password: `POSTGRES_PASSWORD`
  - Database: `POSTGRES_DB`

---

### MongoDB / Mongo Express

- URL: `http://localhost:8083`
- Usuario: `MONGO_INITDB_ROOT_USERNAME`
- Contraseña: `MONGO_INITDB_ROOT_PASSWORD`
- Base de datos: `admin` (para autenticar el usuario root)
- Server: `mongo_posts`
- Puerto: el definido en `MONGO_PORT`

> 🔹 Para crear nuevas bases de datos, puedes hacerlo desde Mongo Express o desde tu código usando Mongoose.

---

## 5. Notas importantes

- Mongo Express requiere que la variable `ME_CONFIG_MONGODB_AUTH_DATABASE` apunte a `admin`.
- Siempre verifica que los puertos no estén en uso.
- Los datos de PostgreSQL y MongoDB se guardan en volúmenes de Docker (`pgdata` y `mongodata`) para persistencia.

---

## 6. Detener los contenedores

```bash
docker-compose down
```

Si querés eliminar volúmenes también:

```bash
docker-compose down -v
```

---

## 7. Uso con Prisma y Mongoose

- **PostgreSQL:** usa el `DATABASE_URL` en tu `prisma.schema`.
- **MongoDB:** usa `MONGO_URI` en tu proyecto con Mongoose:

```env
DATABASE_URL="postgresql://client_user:client_pass@localhost:5433/clients_db"
MONGO_URI="mongodb://posts_admin:posts_pass@localhost:27019/posts_db?authSource=admin"
```

> [!important] Es necesario modificarlos dependiendo de que variables de entorno se cambiaron

### Modificar el URL de conexión de cada DB

#### PostgreSQL

El URL de conexión se construye así:

```text
postgresql://<usuario>:<contraseña>@<host>:<puerto>/<database>
```

Ejemplo usando las variables del `.env`:

```env
DATABASE_URL="postgresql://client_user:client_pass@localhost:5433/clients_db"
```

Si cambias:

- el nombre de la base de datos (`POSTGRES_DB`)
- el usuario (`POSTGRES_USER`)
- la contraseña (`POSTGRES_PASSWORD`)
- el puerto (`POSTGRES_PORT`)

…deberás actualizar también este URL en tu archivo de configuración de Prisma (`prisma.schema`) o en cualquier proyecto que se conecte a PostgreSQL.

---

#### MongoDB

El URL de conexión se construye así:

```text
mongodb://<usuario>:<contraseña>@<host>:<puerto>/<database>?authSource=admin
```

Ejemplo usando las variables del `.env`:

```env
MONGO_URI="mongodb://posts_admin:posts_pass@localhost:27019/posts_db?authSource=admin"
```

Si cambias:

- el nombre de la base de datos (`MONGO_INITDB_DATABASE`)
- el usuario (`MONGO_INITDB_ROOT_USERNAME`)
- la contraseña (`MONGO_INITDB_ROOT_PASSWORD`)
- el puerto (`MONGO_PORT`)

…deberás actualizar también este URL en tu proyecto Node.js con Mongoose.
