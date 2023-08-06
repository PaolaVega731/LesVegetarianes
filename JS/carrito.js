let productos = [
  { nombre: "Aceite de coco", precio: $250 },
  { nombre: "MAnteca de coco", precio: $440 },
  { nombre: "Crema de caju", precio: $410 },
  { nombre: "Leche de almendras", precio: $55},
  { nombre: "Yogurt griego", precio: $330},
];

const mostrarProductos = () => {
  console.log("PRODUCTOS DISPONIBLES:");
  for (let i = 0; i < productos.length; i++) {
    console.log(`${i + 1}. ${productos[i].nombre} - $${productos[i].precio}`);
  }
};

const agregarProducto = (carrito, opcion) => {
  let producto = productos[opcion - 1];
  carrito.push(producto);
  console.log(`El producto '${producto.nombre}' ha sido agregado al carrito.`);
};

const calcularTotal = carrito => {
  let total = 0;
  carrito.forEach(producto => {
    total += producto.precio;
  });
  return total;
};

const imprimirCarrito = carrito => {
  console.log("CARRITO DE COMPRAS:");
  carrito.forEach((producto, index) => {
    console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
  });
  console.log(`TOTAL: $${calcularTotal(carrito)}`);
};

let carrito = [];

console.log("BIENVENIDO A LES VEGETARIANES");

while (true) {
  console.log("\nMENU:");
  console.log("1. Mostrar productos");
  console.log("2. Agregar producto al carrito");
  console.log("3. Ver carrito");
  console.log("4. Salir");

  const opcion = parseInt(prompt("Seleccione una opción:"));

  switch (opcion) {
    case 1:
      mostrarProductos();
      break;
    case 2:
      mostrarProductos();
      const productoSeleccionado = parseInt(prompt("Seleccione un producto:"));
      
      // Verificar si el producto ya está en el carrito
        if (carrito.find(producto => producto.nombre === productos[productoSeleccionado - 1].nombre)) {
        console.log(`El producto '${productos[productoSeleccionado - 1].nombre}' ya está en el carrito.`);
      } else {
        agregarProducto(carrito, productoSeleccionado);
      }
        break;
     case 3:
      imprimirCarrito(carrito);
      break;
    case 4:
      console.log("Gracias por su compra. ¡Vuelva pronto!");
      process.exit(0);
      break;
    default:
      console.log("Opción inválida. Por favor seleccione una opción válida.");
      break;
  }
}