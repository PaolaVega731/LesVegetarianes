let productosArray; 

fetch("../Json/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productosArray = data; //Datos a la variable productosArray
    console.log(productosArray);
    // Mostrar los productos
    cargarProductos(productosArray);
  })
  .catch((error) => {
    console.error("Error al cargar los datos:", error);
  });

function cargarProductos(productosArray) {
  const contenedorProductos = document.getElementById("contenedor-productos");

  productosArray.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
            <div class="cajita">
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            </div>            
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
    contenedorProductos.appendChild(div);
  });
  actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
  let botonesAgregar = document.querySelectorAll(".producto-agregar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      
      agregarAlCarrito(e); 
    });
  });
}

// Inicializar el carrito desde el almacenamiento local o crear un carrito vacío
let productosEnCarrito = obtenerCarritoDesdeLocalStorage();

function obtenerCarritoDesdeLocalStorage() {
  const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
  return productosEnCarritoLS ? JSON.parse(productosEnCarritoLS) : [];
}

function guardarCarritoEnLocalStorage(carrito) {
  localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;

  const productoAgregado = productosArray.find((producto) => producto.id == idBoton);

  if (productoAgregado) {
    const productoExistente = productosEnCarrito.find((producto) => producto.id === idBoton);

    if (productoExistente) {
      // Si el producto ya existe en el carrito, incrementa la cantidad
      productoExistente.cantidad++;
    } else {
      // Si el producto no existe en el carrito, agrégalo al carrito
      productoAgregado.cantidad = 1;
      productosEnCarrito.push(productoAgregado);
    }

    // Guardar el carrito actualizado en el almacenamiento local
    guardarCarritoEnLocalStorage(productosEnCarrito);
  } else {
    console.error("Producto no encontrado en productosArray.");
  }
}
function vaciarCarrito() {
  productosEnCarrito = []; 
  guardarCarritoEnLocalStorage(productosEnCarrito); 
}

const botonVaciarCarrito = document.getElementById("vaciar-carrito");
botonVaciarCarrito.addEventListener("click", () => {
  vaciarCarrito();
 console.log (botonVaciarCarrito)
});
