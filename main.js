
const btnReceta = document.getElementById("btnReceta")


btnReceta.addEventListener("click", (e) => {
    e.preventDefault()

    alert("Gracias por compartir tu receta ❤️ "  )
})

const productosArray = [
    {
        id: "aceite de coco",
        titulo:" Aceite de coco",
        imagen:"../Fotos/Aceite de coco.png",
        precio: 250
},
{
    id: "crema de caju",
    titulo:" Crema de cajú",
    imagen:"../Fotos/Crema de Cajú.png",
    precio: 410
},
{
    id: "manteca de coco",
    titulo:" Manteca de coco",
    imagen:"../Fotos/Manteca de coco.png",
    precio: 440
},
{
    id: "leche de almendras",
    titulo:" Leche de almendras",
    imagen:"../Fotos/Leche de almendras.png",
    precio: 55
},
{
    id: "yogurt griego",
    titulo:" Yogurt griego",
    imagen:"../Fotos/Yogurt griego.png",
    precio: 330
},
{
    id: "tofu",
    titulo:" Tofú",
    imagen:"../Fotos/Tofu.png",
    precio: 310
},
{
    id: "vegan pizza",
    titulo:" Vegan pizza",
    imagen:"../Fotos/Vegan pizza.png",
    precio: 380
},
{
    id: "arrolladitos primavera",
    titulo:" Arrolladitos primavera",
    imagen:"../Fotos/Arrolladitos primavera.png",
    precio: 330
},
{
    id: "croquetas de brocoli",
    titulo:" Croquetas de brócoli",
    imagen:"../Fotos/Croquetas de brócoli.png",
    precio: 280
},
{
    id: "croquetas de papas",
    titulo:" Croquetas de papas",
    imagen:"../Fotos/Croquetas de papas.png",
    precio: 300
},
{
    id: "filete sabor ahumado",
    titulo:" Filete sabor ahumado",
    imagen:"../Fotos/Filete sabor ahumado.jpg",
    precio: 250
},
{
    id: "filete sabor morron",
    titulo:" Filete sabor morrón",
    imagen:"../Fotos/Filete sabor morrón.jpg",
    precio: 250
},
{
    id: "hamburguesas congeladas",
    titulo:" Hamburguesas congeladas",
    imagen:"../Fotos/Hamburguesas congeladas.png",
    precio: 250
},
{
    id: "milanesas multicereal",
    titulo:"Milanesas multicereal",
    imagen:"../Fotos/Milanesas multicereal.png",
    precio: 230
},
{
    id: "nuggets vegetales",
    titulo:"Nuggets vegetales",
    imagen:"../Fotos/Nuggets vegetales.png",
    precio: 245
},
{
    id: "proteina vegetal",
    titulo:" Proteína vegetal",
    imagen:"../Fotos/Proteína vegetal.png",
    precio: 200
},
{
    id: "muzzarella en bloque",
    titulo:" Muzzarella en bloque",
    imagen:"../Fotos/Muzzarella en bloque.png",
    precio: 430
},
{
    id: "kombucha",
    titulo:" Kombucha",
    imagen:"../Fotos/Kombucha.png",
    precio: 150
},

]

const contenedorProductos = document.querySelector("#contendedor-productos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
function cargarProductos(){
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen"  src="${producto.imagen} " alt="${producto.titulo}">
                <div class="producto-detalles">
                  <h3 class="producto-titulo"> ${producto.titulo} </h3>
                  <p class="producto-precio">$${producto.precio}</p>
                  <button class="producto-agregar" id="{producto.id}">Agregar</button>
                </div>               
      `;
      contenedorProductos.append(div);
       
    });
    actualizarBotonesAgregar();
    
}
 cargarProductos();
 
 function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);

    });
 }
 let productosEnCarrito;

 let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
 
 if(productosEnCarritoLS) {
   productosEnCarrito = JSON.parse(productosEnCarritoLS);
 } else{
    productosEnCarrito = [];

 }

 function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;

    }else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
 }


     