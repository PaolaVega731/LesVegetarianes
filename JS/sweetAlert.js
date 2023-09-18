//lo vemos en index page web inicio , en el envio de la receta 

const btnReceta = document.getElementById("btnReceta")


 btnReceta.addEventListener("click", (e) => {
     e.preventDefault()

Swal.fire({
    position: 'center',
    toast:true,
    icon: 'success',
    title: 'Gracias por compartir tu receta ❤️ ',
    showConfirmButton: false,
    timer: 2500
    
  });
});