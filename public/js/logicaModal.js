const modal = document.getElementById('modal');
const btnCloseModal = document.getElementById('btn-close');
const btnAbrirModal = document.getElementById('btn-añadir');


const logicaModal = () => {
   if (btnAbrirModal) {
         btnAbrirModal.addEventListener('click', () => {
            modal.style.display = 'block';
      });
  }

   if (btnCloseModal) {
         btnCloseModal.addEventListener('click', () => {
            modal.style.display = 'none';
      });
  }

  window.addEventListener('click', (e) => {
      if (e.target == modal) {
         modal.style.display = "none";
      }
  })

  
}



export default logicaModal

