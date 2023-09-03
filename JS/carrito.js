let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoProductos = document.querySelector("#carrito-producto");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector(".carrito-producto-comprar");
const total = document.querySelector("#total");

function cargarProductosCarrito() {
  contenedorCarritoProductos.innerHTML = ""; // Limpiamos el contenedor antes de volver a cargar los productos

  if (productosEnCarrito.length === 0) {
    // El carrito está vacío, mostrar mensaje
    const mensajeCarritoVacio = document.createElement("p");
    mensajeCarritoVacio.classList.add("carrito-vacio");
    mensajeCarritoVacio.textContent = "Tu carrito está vacío";
    contenedorCarritoProductos.appendChild(mensajeCarritoVacio);
  } else {
    // El carrito tiene productos, mostrarlos
    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${
        producto.titulo
      }">
        <div class="carrito-producto-titulo">
            <small>Título</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>$${producto.precio * producto.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${producto.id}"></button><i class="bi bi-trash"></i></button>
      `;

      contenedorCarritoProductos.appendChild(div);
    });
  }

  actualizarBotonesAgregar();
  actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesAgregar() {
  botonesEliminar = document.querySelectorAll("carrito-producto-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idBoton
  );
  productosEnCarrito.splice(index, 1);
  cargarProductosCarrito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
  cargarProductosCarrito();
}

function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );

  cargarProductosCarrito();
}
