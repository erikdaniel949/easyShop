// Obtener carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedor = document.getElementById('carrito-productos');
const totalEl = document.getElementById('total');
const vaciarBtn = document.getElementById('vaciar-carrito');
const carritoVacio = document.getElementById('carrito-vacio');

function renderCarrito() {
  contenedor.innerHTML = '';
  if(carrito.length === 0) {
    carritoVacio.style.display = 'block';
    totalEl.textContent = '0';
    return;
  } else {
    carritoVacio.style.display = 'none';
  }

  let total = 0;
  carrito.forEach((producto, index) => {
    total += Number(producto.price);

    const div = document.createElement('div');
    div.className = 'producto-carrito';

    const img = document.createElement('img');
    img.src = producto.img;
    img.alt = producto.name;

    const info = document.createElement('div');
    info.className = 'producto-info';
    const h3 = document.createElement('h3');
    h3.textContent = producto.name;
    const p = document.createElement('p');
    p.textContent = '$' + producto.price;

    info.appendChild(h3);
    info.appendChild(p);

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => {
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderCarrito();
    });

    div.appendChild(img);
    div.appendChild(info);
    div.appendChild(btnEliminar);
    contenedor.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
}

// Vaciar carrito
vaciarBtn.addEventListener('click', () => {
  carrito = [];
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderCarrito();
});

// Ejecutar render inicial
renderCarrito();
