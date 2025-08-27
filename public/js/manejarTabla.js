// manejarTabla.js
import cargarProductos from "./cargarProductos.js";
import logicaModal from "./logicaModal.js";

const formulario = document.getElementById('formularioRegistro');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const submitBtn = document.getElementById('submit-btn');

const manejarEventosDeTabla = () => {
    const tableBody = document.getElementById('product-table-body');

    tableBody.addEventListener('click', async (e) => {
        const target = e.target;
        const row = target.closest('tr');
        if (!row) return; // Salir si el clic no fue en una fila

        const productoId = row.dataset.id;
        
        // 1. Lógica de ELIMINAR (DELETE)
        if (target.classList.contains('btn-delete')) {
            if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
                try {
                    const response = await fetch(`/api/productos/${productoId}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error('Error al eliminar el producto.');
                    alert("Producto eliminado con éxito.");
                    cargarProductos();
                } catch (error) {
                    console.error("Hubo un problema al eliminar el producto:", error);
                }
            }
        }
        
        // 2. Lógica de ACTUALIZAR (UPDATE)
        if (target.classList.contains('btn-update')) {
            const celdas = row.querySelectorAll('td');
            const nombre = celdas[1].textContent;
            const precio = celdas[2].textContent;
            const stock = celdas[3].textContent;

            modal.style.display = 'block';
            modalTitle.textContent = 'Actualizar Producto';
            submitBtn.textContent = 'Actualizar';
            
            formulario.dataset.mode = 'update';
            formulario.dataset.id = productoId;
            document.getElementById('nombre').value = nombre;
            document.getElementById('precio').value = precio;
            document.getElementById('stock').value = stock;
        }
    });
};

export default manejarEventosDeTabla;