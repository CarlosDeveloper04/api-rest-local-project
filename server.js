import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));

// Ruta para LEER productos con paginación (GET /api/productos)

app.get('/api/productos', async (req, res) => {
    const filePath = path.join(__dirname, 'inventario.json');
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const inventario = JSON.parse(data);

        // Definimos los parámetros de paginación, Límite por defecto: 15, Página por defecto: 1
        const limit = parseInt(req.query.limit) || 15; 
        const page = parseInt(req.query.page) || 1;    

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const productosPaginados = inventario.slice(startIndex, endIndex);

        // Información de paginación para el frontend
        const totalProductos = inventario.length;
        const totalPaginas = Math.ceil(totalProductos / limit);

        res.json({
            productos: productosPaginados,
            totalProductos,
            totalPaginas,
            paginaActual: page,
        });
        
    } catch (error) {
        console.error('Error al leer el inventario:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Ruta para CREAR un producto (POST /api/productos/


app.post('/api/productos', async (req, res) => {
    const nuevoProducto = req.body;
    const filePath = path.join(__dirname, 'inventario.json');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const inventario = JSON.parse(data);

        const nuevoId = inventario.length > 0 ? inventario[inventario.length - 1].id + 1 : 1;
        nuevoProducto.id = nuevoId;

        inventario.push(nuevoProducto);

        await fs.writeFile(filePath, JSON.stringify(inventario, null, 2));

        res.status(201).json({ message: 'Producto agregado con éxito', producto: nuevoProducto });
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Ruta para ACTUALIZAR un producto (PUT /api/productos/:id)

app.put('/api/productos/:id', async (req, res) => {
    const filePath = path.join(__dirname, 'inventario.json');
    const productoId = parseInt(req.params.id);
    const productoActualizado = req.body;

    try {
        const data = await fs.readFile(filePath, 'utf8');
        let inventario = JSON.parse(data);

        // Buscamos el índice del producto a actualizar
        const index = inventario.findIndex(p => p.id === productoId);

        if (index !== -1) {
            // Actualizamos el producto en el array
            inventario[index] = { ...inventario[index], ...productoActualizado };
            await fs.writeFile(filePath, JSON.stringify(inventario, null, 2));
            res.status(200).json({ message: 'Producto actualizado con éxito.' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado.' });
        }

    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});


// Ruta para ELIMINAR un producto (DELETE /api/productos/:id)

app.delete('/api/productos/:id' , async (req, res) => {
    const filePath = path.join(__dirname, 'inventario.json');
    const productoId = parseInt(req.params.id); // Convierte el ID a número

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const inventario = JSON.parse(data);

        // Filtramos el array para excluir el producto con el ID especificado
        const inventarioActualizado = inventario.filter(producto => producto.id !== productoId);
        // Comprobamos si el inventario actualizado tiene menos elementos, significa que se encontró y eliminó el producto
        if (inventarioActualizado.length < inventario.length) {
            await fs.writeFile(filePath, JSON.stringify(inventarioActualizado, null, 2));
            res.status(200).json({ message: 'Producto eliminado con éxito.' });
        } else {
            // Si el ID no fue encontrado, enviar una respuesta 404
            res.status(404).json({ error: 'Producto no encontrado.' });
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }

})




// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

