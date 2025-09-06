## 🎯 Objetivo

Construir una **API REST robusta y profesional** para la gestión de productos usando **NestJS**.
La API debe:

* Seguir una **arquitectura por capas**.
* Validar los datos de entrada.
* Implementar **reglas de negocio** estrictas.
* Permitir **búsqueda avanzada** con filtros, paginación y ordenamiento.
* Conectarse a una base de datos **PostgreSQL**.

---

## 🚀 Requisitos Técnicos

1. **Arquitectura por capas**

* Controlador → Servicio → Repositorio/Entidad.
* Entidad `Product`:

| Campo       | Tipo    | Restricciones       |
| ----------- | ------- | ------------------- |
| id          | Int     | Autoincremental, PK |
| nombre      | String  | No vacío            |
| descripcion | String  | Opcional            |
| precio      | Decimal | >= 0                |
| stock       | Int     | >= 0                |
| sku         | String  | Único               |

2. **DTOs y Validaciones**

* `CreateProductDto` y `UpdateProductDto`
* Validaciones con `class-validator`:

  * `@IsString`, `@IsNotEmpty`, `@IsNumber`, `@Min(0)`
* `ValidationPipe` global en `main.ts`

3. **Reglas de Negocio**

* **Creación:** `sku` único → `ConflictException` si existe
* **Actualización:** `stock >= 0`
* **Eliminación:** no se permite si `stock > 0`

4. **Endpoint de Búsqueda Avanzada**

* `POST /product/search`

**Request Example:**

```json
{
  "page": 1,
  "limit": 10,
  "sortBy": "precio",
  "order": "DESC",
  "filters": {
    "nombre": "guitarra"
  }
}
```

**Response Example:**

```json
{
  "data": [ /* array de productos */ ],
  "currentPage": 1,
  "totalPages": 10,
  "totalItems": 100
}
```

* Permite filtros opcionales: `id`, `nombre` (LIKE), `descripcion` (LIKE), `sku` (exacto)
* Paginación: `page` y `limit`
* Ordenamiento: `sortBy` y `order`

---

## ⚙️ Instalación y Configuración

1. Clonar repositorio:

```bash
git clone <REPO_URL>
cd nestjs-productos
```

2. Crear archivo `.env`:

```env
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@localhost:5432/productosdb?schema=public"
```

3. Levantar PostgreSQL con Docker:

```bash
docker-compose up -d
```

4. Instalar dependencias:

```bash
npm install
```

5. Generar Prisma Client:

```bash
npx prisma generate
```

6. Aplicar migraciones:

```bash
npx prisma migrate dev --name init
```

7. Levantar servidor:

```bash
npm run start:dev
```

Servidor listo en: `http://localhost:3000`

---

## 📝 Endpoints

| Método | Ruta              | Descripción                   |
| ------ | ----------------- | ----------------------------- |
| GET    | `/product`        | Listar todos los productos    |
| GET    | `/product/:id`    | Obtener producto por id       |
| POST   | `/product`        | Crear producto                |
| PATCH  | `/product/:id`    | Actualizar producto           |
| DELETE | `/product/:id`    | Eliminar producto             |
| POST   | `/product/search` | Búsqueda avanzada con filtros |

---

## 🔧 Tecnologías

* [NestJS](https://nestjs.com/)
* [Node.js](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Prisma ORM](https://www.prisma.io/)
* [class-validator](https://github.com/typestack/class-validator)

---

## ✅ Consideraciones

* Seguir buenas prácticas de NestJS y Prisma
* Validar todas las entradas con DTOs
* Endpoint `/product/search` debe ser flexible y eficiente
* La API está lista para consumo por frontend o aplicaciones externas

---

Si quieres, puedo también **hacerte un README con ejemplos de requests usando cURL y Postman**, para que quede completamente profesional y listo para entregar.

¿Quieres que haga eso también?
