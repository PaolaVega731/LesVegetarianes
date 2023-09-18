const itemsInCart = document.getElementById("items");
const templateCardCarrito = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("template-footer").content;


document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));

    const carritos = Object.values(carrito);

    agregarCards(carritos);
    agregarFooter();
  }
});

items.addEventListener("click", (e) => {
  btnAccion(e);
});

const agregarCards = (data) => {
  if (!Array.isArray(data)) {
   
    return;
  }
  data.map((producto) => {
    templateCardCarrito.querySelector("h5").textContent = producto.titulo;
    templateCardCarrito.querySelector("h6").textContent = producto.cantidad;
    const precioSinSimboloDolar = producto.precio.replace("$", "");
    const precio = parseFloat(precioSinSimboloDolar);
    const subtotal = producto.cantidad * precio;
    templateCardCarrito.querySelector("p").textContent = `$${subtotal}`;
    templateCardCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCardCarrito.querySelector(".btn-danger").dataset.id = producto.id;
    templateCardCarrito
      .querySelector(".btn-info")
      .addEventListener("click", btnAccion);
    templateCardCarrito
      .querySelector(".btn-danger")
      .addEventListener("click", btnAccion);

    const clone = templateCardCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  itemsInCart.appendChild(fragment);
};

const agregarFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `
    <th scope="row" colspan="5">Carrito vacío - Comience su compra 👉🏼 <a class="text-danger" href="productos.html">aquí</a> 👈🏼</th>
        `;
    return;
  }

  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );

  const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => {
    const precioSinSimboloDolar = precio.replace("$", "");
    const precioComoNumero = parseFloat(precioSinSimboloDolar);
    return acc + cantidad * precioComoNumero;
  }, 0);

  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnVaciar = document.getElementById("vaciar-carrito");

  btnVaciar.addEventListener("click", () => {
    carrito = {};
  });
};
const btnAccion = (e) => {
 
  if (e.target.classList.contains("btn-info")) {
    // carrito[e.target.dataset.id]
    const producto = carrito[e.target.dataset.id];
    console.log(producto);
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    const precioSinSimboloDolar = producto.precio.replace("$", "");
    console.log(parseFloat(precioSinSimboloDolar));
    producto.subtotal = producto.cantidad * parseFloat(precioSinSimboloDolar);
  }
  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    } else {
      const precioSinSimboloDolar = producto.precio.replace("$", "");
      producto.subtotal = producto.cantidad * parseFloat(precioSinSimboloDolar);
    }
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));

  itemsInCart.innerHTML = ""; // Limpiar el contenido actual
  agregarFooter();
  agregarCards(Object.values(carrito)); // Agregar las nuevas tarjetas
  e.stopPropagation();
  // Abre el modal al hacer clic en el botón "Comprar"
  if (e.target.classList.contains("btn-dark")) {
    $("#modalPago").modal("show");
  }
};

const GraciasCompra = () => {
  Swal.fire({
    position: "top-center",
    imageUrl: "../Fotos/Logo.png", 
    imageWidth: 300, 
    imageHeight: 300, 
    title: "Gracias por su compra 😁",
    showConfirmButton: false,
    timer: 2000,
  });

  localStorage.removeItem("carrito");
  items.innerHTML = "";
  footer.innerHTML = "";
  agregarFooter()
  $("#modalPago").modal("hide");
};