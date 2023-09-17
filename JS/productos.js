const cards = document.getElementById('card');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

const fetchData = async () => {
    try {
        const res = await fetch('../Json/productos.json');
        const data = await res.json();
        mostrarProductos(data);
    } catch (error) {
        console.error(error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

const mostrarProductos = (data) => {
    cards.innerHTML = '';
    data.forEach((producto) => {
        templateCard.querySelector('img').src = producto.imagen;
        templateCard.querySelector('h5').textContent = producto.titulo;
        templateCard.querySelector('p').textContent = `$${producto.precio.toFixed(2)}`;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
};
