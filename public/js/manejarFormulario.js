import cargarProductos from "./cargarProductos.js"; 
import logicaModal from "./logicaModal.js";


const formularioRegistro = document.getElementById('formularioRegistro');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const submitBtn = document.getElementById('submit-btn');

// Lógica para manejar el envío del formulario (agregar y actualizar)

const manejarEventosDeFormulario = () => {

    formularioRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const stock = document.getElementById('stock').value;
        
        const producto = {
            nombre: nombre,
            precio: parseFloat(precio), 
            stock: parseInt(stock)      
        };

        const mode = formularioRegistro.dataset.mode;
        const productoId = formularioRegistro.dataset.id;

        try {
            let response;
            if (mode === 'add') {
                response = await fetch('/api/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
                });

                if (!response.ok) {
                throw new Error(`Error al agregar el producto: ${response.statusText}`);
                }
                alert('Producto agregado con exito')

            } else if (mode === 'update') {
                response = await fetch(`/api/productos/${productoId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(producto)
                });

                if (!response.ok) throw new Error('Error al actualizar el producto.');
                alert('Producto actualizado con éxito.');
            }
            
            formularioRegistro.reset();
            modal.style.display = 'none';
            formularioRegistro.dataset.mode = 'add';
            modalTitle.textContent = 'Registrar Nuevo Elemento';
            submitBtn.textContent = 'Guardar';
            cargarProductos();
            
      
        } catch (error) {
             console.error('Hubo un problema con la operación fetch:', error);
        }
    });

};

export default manejarEventosDeFormulario;
