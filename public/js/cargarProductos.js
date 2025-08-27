const cargarProductos = async (page = 1) => {
    const tableBody = document.getElementById('product-table-body');
    const pageNumbersContainer = document.getElementById('page-numbers');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const limit = 15; 

    try {
        tableBody.innerHTML = '';
        pageNumbersContainer.innerHTML = '';
        
        // Cargamos los productos desde la API con paginación
        const response = await fetch(`/api/productos?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los productos: ${response.statusText}`);
        }
        
        const data = await response.json();
        const productos = data.productos;

        // Renderizamos los productos
        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.dataset.id = producto.id;
            row.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>
                    <button class="btn btn-update">⟳</button>
                    <button class="btn btn-delete">🗑️</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Habilitamos/deshabilitamos los botones de paginación
        prevPageBtn.disabled = page === 1;
        nextPageBtn.disabled = page === data.totalPaginas;

        // Limpiamos y renderizamos los números de página
        for (let i = 1; i <= data.totalPaginas; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = `btn page-btn ${i === page ? 'active' : ''}`;
            pageBtn.addEventListener('click', () => cargarProductos(i));
            pageNumbersContainer.appendChild(pageBtn);
        }

    } catch (error) {
        console.error("Hubo un problema con la carga de los datos:", error);
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:red;">No se pudo cargar el inventario.</td></tr>`;
    }
};

// Event listeners para los botones de Anterior y Siguiente
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');

prevPageBtn.addEventListener('click', () => {
    const currentPage = parseInt(document.querySelector('.page-btn.active').textContent);
    cargarProductos(currentPage - 1);
});

nextPageBtn.addEventListener('click', () => {
    const currentPage = parseInt(document.querySelector('.page-btn.active').textContent);
    cargarProductos(currentPage + 1);
});

export default cargarProductos;