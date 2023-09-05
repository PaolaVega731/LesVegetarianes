const cards = document.getElementById('cards')
const items = document.getElementById ('items')
const footer = document.getElementById ('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito ={}


document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        agregarCarrito()
    }
})
cards.addEventListener('click', e => {
    addCarrito(e);
});

items.addEventListener('click', e => {
    btnAccion(e);
});

const fetchData = async () => {
    try {
        const res = await fetch('../Json/productos.json')
        const data = await res.json()
        // console.log(data)
        agregarCards(data)
    } catch (error) {
        console.log (error)
    }
}

const agregarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.titulo
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src",producto.imagen)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    // console.log(e.target)
    // console.log(e.target.classList.contains('btn-dark'))
    if(e.target.classList.contains('btn-dark')){
       setCarrito(e.target.parentElement)

    }
    e.stopPropagation()
}
const setCarrito = objeto => {
    // console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        titulo: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    agregarCarrito()
    
}

const agregarCarrito = ()=> {
    // console.log(carrito)
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id 
        templateCarrito.querySelectorAll('td')[0].textContent = producto.titulo
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    agregarFooter()

    localStorage.setItem('carrito' , JSON.stringify(carrito))

}

const agregarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0 ){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - Comience su compra</th>
        `  
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values (carrito).reduce((acc, {cantidad, precio})=> acc + cantidad * precio,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
     
    btnVaciar.addEventListener('click' , () => {
        carrito = {}
        alert("Gracias por su compra")
        agregarCarrito()
    })
}

const btnAccion = e => {
    // console.log(e.target)
    //Aumentar cantidad
    if(e.target.classList.contains('btn-info')) {
        // carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++ 
        carrito[e.target.dataset.id] = {...producto}
        agregarCarrito()
    }
    if(e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        agregarCarrito()
}
    e.stopPropagation()
}