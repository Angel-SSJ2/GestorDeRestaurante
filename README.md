# 🍽️ GestorDeRestaurante

## 🚀 Requerimientos del Sistema
### 🧾 API REST para la Gestión Administrativa de Restaurantes

---

## 🌐 1. Descripción General del Sistema

El presente sistema consiste en una **API REST** orientada a la administración integral de un restaurante, permitiendo gestionar usuarios, restaurantes, menús, inventario, pedidos, reservaciones, mesas, facturación y eventos dentro de una misma plataforma digital.

La aplicación fue desarrollada para facilitar el control de los procesos principales de operación de un restaurante, centralizando la información y permitiendo una mejor organización de los recursos del negocio.

El sistema se encuentra estructurado bajo una arquitectura basada en el patrón:

- **Modelo**
- **Vista**
- **Controlador (MVC)**

Esta arquitectura permite separar correctamente la lógica de negocio, la gestión de datos y el manejo de solicitudes HTTP, facilitando el mantenimiento, escalabilidad y organización del proyecto.

Además, el sistema incorpora el uso de:

- **MongoDB** como base de datos NoSQL
- **Mongoose** para modelado de datos
- **Express** para la construcción de la API
- **Cloudinary** para la gestión de imágenes
- **Multer** para la carga de archivos
- **Helmet, CORS y Rate Limit** para reforzar la seguridad del sistema

---

## 🎯 2. Alcance del Sistema

El sistema permite la administración de los diferentes módulos fundamentales de un restaurante, entre ellos:

- ✅ Gestión de usuarios
- ✅ Gestión de restaurantes
- ✅ Gestión de menús
- ✅ Gestión de inventario
- ✅ Gestión de pedidos
- ✅ Gestión de reservaciones
- ✅ Gestión de mesas
- ✅ Gestión de facturación
- ✅ Gestión de eventos
- ✅ Carga de imágenes para distintos registros
- ✅ Activación y desactivación lógica de registros
- ✅ Paginación en consultas

El objetivo del sistema es brindar una base administrativa robusta para controlar la operación interna de un restaurante por medio de servicios web.

---

## 👥 3. Actores del Sistema

| Actor | Descripción |
|-------|-------------|
| 👨‍💼 Administrador | Usuario encargado de gestionar la información del sistema: restaurantes, menús, inventario, pedidos, reservaciones, mesas, facturación, eventos y usuarios. |
| 👤 Usuario del sistema | Registro administrativo dentro de la plataforma que forma parte de la operación del restaurante. |

---

## ⚙️ 4. Requerimientos Funcionales

### 📝 RF-01 Gestión de Usuarios

El sistema deberá permitir registrar, consultar, actualizar y cambiar el estado de los usuarios del sistema.

Cada usuario podrá almacenar información como:

- Nombre
- Correo electrónico
- Contraseña
- Rol
- Fotografía
- Estado

---

### 🏪 RF-02 Gestión de Restaurantes

El sistema deberá permitir registrar y administrar restaurantes, incluyendo su información general y su estado dentro de la plataforma.

Cada restaurante podrá contener:

- Nombre
- Dirección
- Teléfono
- Descripción
- Fotografía
- Estado

---

### 🍔 RF-03 Gestión de Menús

El sistema deberá permitir registrar y administrar los productos o platillos del menú del restaurante.

Cada menú podrá contener:

- Nombre del platillo
- Precio
- Categoría
- Descripción
- Fotografía
- Estado

---

### 📦 RF-04 Gestión de Inventario

El sistema deberá permitir registrar y controlar los productos o insumos disponibles dentro del inventario del restaurante.

Cada registro de inventario podrá contener:

- Nombre del producto
- Cantidad disponible
- Unidad de medida
- Fotografía
- Estado

---

### 🧾 RF-05 Gestión de Pedidos

El sistema deberá permitir registrar pedidos realizados por clientes y actualizar su estado según el proceso de atención.

Cada pedido podrá contener:

- Nombre del cliente
- Total del pedido
- Estado del pedido
- Fotografía
- Estado lógico

---

### 📅 RF-06 Gestión de Reservaciones

El sistema deberá permitir registrar reservaciones realizadas por clientes para una fecha determinada.

Cada reservación podrá contener:

- Nombre del cliente
- Fecha
- Cantidad de personas
- Fotografía
- Estado

---

### 🪑 RF-07 Gestión de Mesas

El sistema deberá permitir administrar las mesas disponibles dentro del restaurante.

Cada mesa podrá contener:

- Número de mesa
- Capacidad
- Estado de la mesa
- Fotografía
- Estado lógico

---

### 💳 RF-08 Gestión de Facturación

El sistema deberá permitir registrar cobros o facturas generadas por los servicios del restaurante.

Cada factura podrá contener:

- Nombre del cliente
- Monto
- Método de pago
- Fotografía
- Estado

---

### 🎉 RF-09 Gestión de Eventos

El sistema deberá permitir registrar eventos programados dentro del restaurante.

Cada evento podrá contener:

- Nombre del evento
- Fecha del evento
- Ubicación
- Fotografía
- Estado

---

### 🖼️ RF-10 Carga de Imágenes

El sistema deberá permitir la carga de imágenes para los diferentes módulos mediante integración con Cloudinary.

---

### 🔄 RF-11 Activación y Desactivación de Registros

El sistema deberá permitir activar y desactivar registros de forma lógica, evitando la eliminación física inmediata de los datos.

---

### 📄 RF-12 Consulta con Paginación

El sistema deberá permitir consultar registros paginados para mejorar el rendimiento y la organización de la información mostrada.

---

## 📌 5. Requerimientos No Funcionales

### 🔒 RNF-01 Seguridad
El sistema deberá implementar mecanismos de seguridad mediante middlewares como **Helmet**, **CORS** y control de límite de peticiones.

---

### 🧱 RNF-02 Arquitectura
El sistema deberá mantener una estructura organizada basada en el patrón **MVC**.

---

### 📈 RNF-03 Escalabilidad
La API deberá estar estructurada en módulos independientes para facilitar su ampliación y mantenimiento.

---

### 🗃️ RNF-04 Persistencia de Datos
El sistema deberá almacenar la información en una base de datos **MongoDB** utilizando esquemas definidos con **Mongoose**.

---

### 🖼️ RNF-05 Gestión de Archivos
Las imágenes cargadas deberán ser almacenadas en un servicio externo, en este caso **Cloudinary**.

---

### ⚡ RNF-06 Rendimiento
El sistema deberá incorporar paginación en listados y control de peticiones para evitar sobrecarga del servidor.

---

### 🙈 RNF-07 Integridad de la Información
La API deberá validar los datos recibidos antes de almacenarlos para evitar registros inconsistentes.

---

## 🛠️ 6. Tecnologías Utilizadas

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **Cloudinary**
- **Multer**
- **Multer Storage Cloudinary**
- **Morgan**
- **Dotenv**
- **Helmet**
- **CORS**
- **Express Rate Limit**
- **UUID**

---

## 📁 7. Estructura General del Proyecto

```bash
GestorDeRestaurante/
│
├── configs/
│   ├── app.js
│   ├── db.js
│   ├── cors-configuration.js
│   └── helmet-configuration.js
│
├── src/
│   ├── billing/
│   ├── events/
│   ├── inventory/
│   ├── menus/
│   ├── middlewares/
│   ├── orders/
│   ├── reservations/
│   ├── restaurants/
│   ├── tables/
│   └── users/
│
├── index.js
├── package.json
└── README.md
