let productos = [
  { nombre: "Aceite de coco", precio: 250 },
  { nombre: "Manteca de coco", precio: 440 },
  { nombre: "Crema de caju", precio: 410 },
  { nombre: "Leche de almendras", precio: 55},
  { nombre: "Yogurt griego", precio: 330},
];

const mostrarProductos = () => {
  alert("PRODUCTOS DISPONIBLES:");
  for (let i = 0; i < productos.length; i++) {
    alert(`${i + 1}. ${productos[i].nombre} - $${productos[i].precio}`);
  }
};

const agregarProducto = (carrito, opcion) => {
  let producto = productos[opcion - 1];
  carrito.push(producto);
  alert(`El producto '${producto.nombre}' ha sido agregado al carrito.`);
};

const calcularTotal = carrito => {
  let total = 0;
  carrito.forEach(producto => {
    total += producto.precio;
  });
  return total;
};

function mostrarCarrito(){
  if(carrito.length !==0){
    alert("CARRITO DE COMPRAS:");
    carrito.forEach((producto, index) => {
    alert(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
    alert(`TOTAL:$${calcularTotal(carrito)}`);
  } else{
    alert('Usted no tiene productos en su carrito')
  }
}
    

let carrito = [];

alert("BIENVENIDO A LES VEGETARIANES");

while (true) {
 
 const opcion = parseInt(prompt("\nMENU: 1. Mostrar productos 2. Agregar producto al carrito 3. Ver carrito  4. Comprar  Seleccione una opción:"));

  switch (opcion) {
    case 1:
      mostrarProductos();
      break;
    case 2:
      mostrarProductos();
      const productoSeleccionado = parseInt(prompt("Seleccione un producto:"));

      // Verificar si el producto ya está en el carrito
        if (carrito.find(producto => producto.nombre === productos[productoSeleccionado - 1].nombre)) {
        alert(`El producto '${productos[productoSeleccionado - 1].nombre}' ya está en el carrito.`);
      } else {
        agregarProducto(carrito, productoSeleccionado);
      }
        break;
     case 3:
      mostrarCarrito(carrito);
      break;
    case 4:
      alert("Gracias por su compra. ¡Vuelva pronto!");
      process.exit(0);
      break;
    default:
      alert("Opción inválida. Por favor seleccione una opción válida.");
      break;
  }
}