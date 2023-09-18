const itemsInCart = document.getElementById("items");
const templateCardCarrito = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('template-footer').content;
console.log(templateCardCarrito);
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));

    const carritos = Object.values(carrito);

  
    agregarCards(carritos);
  } 
});

items.addEventListener("click", (e) => {
  btnAccion(e);
});

const agregarCards = (data) => {
  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return;
  }
  data.map((producto) => {
    templateCardCarrito.querySelector("h5").textContent = producto.titulo;
    templateCardCarrito.querySelector("h6").textContent = producto.cantidad;
    templateCardCarrito.querySelector("p").textContent = producto.precio;
    templateCardCarrito.querySelector(".btn-info").addEventListener('click', btnAccion);
    templateCardCarrito.querySelector(".btn-danger").addEventListener('click', btnAccion);
    
    const clone = templateCardCarrito.cloneNode(true);
    fragment.appendChild(clone);
  
  });
  itemsInCart.appendChild(fragment);
};

const agregarFooter = () => {
    footer.innerHTML = '';
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - Comience su compra</th>
        `;
        return;
    }

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');

    btnVaciar.addEventListener('click', () => {
        carrito = {};
    });
};
const btnAccion = (e) => {
console.log(e)
  // console.log(e.target)
  //Aumentar cantidad
  if (e.target.classList.contains("btn-info")) {
    // carrito[e.target.dataset.id]
    const producto = carrito[e.target.dataset.id];
    console.log(producto)
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    agregarCarrito();
  }
  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    }
    agregarCarrito();
  }
  e.stopPropagation();
  const btnAccion1 = (e) => {
    if (e.target.classList.contains("btn-info")) {
      const producto = carrito[e.target.dataset.id];
      producto.cantidad++;
      carrito[e.target.dataset.id] = { ...producto };
      agregarCarrito();
    }
    if (e.target.classList.contains("btn-danger")) {
      const producto = carrito[e.target.dataset.id];
      producto.cantidad--;
      if (producto.cantidad === 0) {
        delete carrito[e.target.dataset.id];
      }
      agregarCarrito();
    }
    e.stopPropagation();
    // Abre el modal al hacer clic en el botón "Comprar"
    if (e.target.classList.contains("btn-dark")) {
      $("#modalPago").modal("show");
    }
  };
};