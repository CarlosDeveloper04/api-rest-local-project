### Inventario API REST
Una API REST simple y robusta para gestionar un inventario de productos. Esta aplicación permite realizar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de productos almacenada en un archivo JSON.

### Tecnologías Utilizadas
Node.js: Entorno de ejecución del servidor.

Express.js: Framework minimalista para crear la API.

File System (fs): Módulo nativo de Node.js para la persistencia de datos en un archivo JSON.

JavaScript ES6: Lógica del lado del cliente para interactuar con la API.

### Instalación
Sigue estos pasos para obtener una copia local del proyecto y ponerlo en marcha.

Clona el repositorio:
git clone https://github.com/CarlosDeveloper04/api-rest-local-project.git

Navega a la carpeta del proyecto:
cd api-rest-local-project

Instala las dependencias:
npm install

Ejecución de la Aplicación
Para arrancar el servidor de tu API, ejecuta el siguiente comando en tu terminal:
npm start

El servidor se ejecutará en http://localhost:3000.

### Endpoints de la API
La API expone los siguientes puntos de acceso para gestionar los productos.

Método HTTP	Endpoint	Descripción

GET	/api/productos	Obtiene una lista paginada de todos los productos.

POST	/api/productos	Crea un nuevo producto.

GET	/api/productos/:id	Obtiene un producto específico por su ID.

PUT	/api/productos/:id	Actualiza un producto existente por su ID.

DELETE	/api/productos/:id	Elimina un producto por su ID.

### Detalle de los Endpoints

- **GET /api/productos:**

Descripción: Devuelve una lista de todos los productos. Este endpoint soporta paginación usando los parámetros de consulta page y limit.

Parámetros de consulta (opcionales):

page: Número de página a obtener (por defecto, 1).

limit: Cantidad de productos por página (por defecto, 15).

Ejemplo de respuesta (con paginación):

{
    "productos": [
        { "id": 1, "nombre": "Martillo de carpintero", "precio": 114.65, "stock": 11 },
        { "id": 2, "nombre": "Destornillador Phillips", "precio": 19.67, "stock": 20 }
    ],
    "totalProductos": 100,
    "totalPaginas": 7,
    "paginaActual": 1
}

- **POST /api/productos:**

Descripción: Crea un nuevo producto con un ID autoincremental.

Cuerpo de la petición:

{
  "nombre": "Producto Nuevo",
  "precio": 99.99,
  "stock": 50
}

- **PUT /api/productos/:id:**

Descripción: Actualiza completamente un producto existente.

Parámetros de ruta:

id: ID del producto a actualizar.

Cuerpo de la petición:

{
  "nombre": "Producto Actualizado",
  "precio": 125.50,
  "stock": 25
}

- **DELETE /api/productos/:id:**

Descripción: Elimina un producto específico del inventario.

Parámetros de ruta:

id: ID del producto a eliminar.

Ejemplo de respuesta:

{
  "message": "Producto eliminado con éxito."
}



