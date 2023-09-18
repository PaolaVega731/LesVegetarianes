//lo vemos en index page web inicio , en el envio de la receta

const btnReceta = document.getElementById("btnReceta");
const textArea = document.getElementById("textAreaReceta")
btnReceta.addEventListener("click", (e) => {
  e.preventDefault();
  if(textArea.value !== ""){
    Swal.fire({
      position: "center",
      toast: true,
      icon: "success",
      title: "Gracias por compartir tu receta ❤️ ",
      showConfirmButton: false,
      timer: 2000,
    });
    textArea.value = ""
  }else{
    Swal.fire({
      position: "center",
      toast: true,
      icon: "warning",
      title: "Compartí tu receta antes de enviar!",
      showConfirmButton: false,
      timer: 2000,
    });
  }
});