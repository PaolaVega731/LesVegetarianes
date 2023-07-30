const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-producto");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");

if(productosEnCarrito) {

contenedorCarritoVacio.classList.add("disabled");
contenedorCarritoProductos.classList.remove("disabled");
contenedorCarritoAcciones.classList.remove("disabled");
contenedorCarritoComprado.classList.add("disabled");

contenedorCarritoProductos.innerHTML = "";

productosEnCarrito.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("carrito-producto");
    div.innerHTML = `
    <img class="carrito-producto-imagen" src="${producto.imagen}alt="${producto.titulo}">
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
        <button class="carrito-producto-eliminar"> id="${producto.id}<i class="bi bi-trash"></i></button>
    </div>
    `; 

   contenedorCarritoProductos.append(div);
})

}else {

}