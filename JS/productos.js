const cards = document.getElementById("cards");
let carrito = {};
const items = document.getElementById('items');
const templateCard = document.getElementById("template-card").content;
 
const fragment = document.createDocumentFragment();

const fetchData = async () => {
  try {
    const res = await fetch("../Json/productos.json");
    const data = await res.json();
    mostrarProductos(data);
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

 
cards.addEventListener('click', (e) => {
    addCarrito(e);
});

const addCarrito = (e) => {
   
    if (e.target.classList.contains('btn-dark')) {
        console.log(e.target.parentElement)
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
};


const mostrarProductos = (data) => {
  cards.innerHTML = "";
  data.forEach((producto) => {
    templateCard.querySelector("img").src = producto.imagen;
    templateCard.querySelector("h5").textContent = producto.titulo;
    templateCard.querySelector("p").textContent = `$${producto.precio.toFixed(
      2
    )}`;
    templateCard.querySelector(".btn-dark").dataset.id = producto.id;
   
    // Agregar un evento de click al botón que llame a la función Anashe
   
    const clone = templateCard.cloneNode(true);
    
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};
const setCarrito = (objeto) => {
  
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        titulo: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
         
        cantidad: 1,
    };
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = { ...producto };
    agregarCarrito();
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    });
};

const agregarCarrito = () => {
    // Recupera el carrito existente de localStorage
    const carritoExistente = JSON.parse(localStorage.getItem('carrito')) || {};

    // Combina el carrito existente con el nuevo producto
    const nuevoCarrito = { ...carritoExistente, ...carrito };

    // Guarda el nuevo carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

  
};