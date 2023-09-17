
const btnReceta = document.getElementById("btnReceta")


btnReceta.addEventListener("click", (e) => {
    e.preventDefault()

    // Abre el modal al hacer clic en el botón "Enviar" 
    if (e.target.classList.contains('btnReceta')) {
        $('#btn-submit').modal('show');
    }
})

 
