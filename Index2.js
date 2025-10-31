// Verificar sesión
const checkSession = async () => {
  try {
    const response = await fetch('https://back-es-yjar.onrender.com/isLogged', {
      method: 'GET',
      credentials: 'include'
    });
    if (response.ok) {
      const data = await response.json();
      const sessionBtn = document.getElementById('sessionBtn');
      sessionBtn.textContent = 'Mi cuenta';
      sessionBtn.href = 'profile.html';
    }
  } catch (err) {
    console.error('Error al verificar la sesión');
  }
};
checkSession();

// Detalle del producto
function mostrarDetalle(nombre, precio, descripcion) {
  document.getElementById("detalle-nombre").textContent = nombre;
  document.getElementById("detalle-precio").textContent = "Precio: $" + precio;
  document.getElementById("detalle-descripcion").textContent = descripcion;
  document.getElementById("detalle-producto").style.display = "block";
}

function cerrarDetalle() {
  document.getElementById("detalle-producto").style.display = "none";
}

// Productos de prueba (hardcodeados)
const products = [
  {
    name: "Notebook Gamer HP Victus 15.6",
    description: "Notebook ideal para gaming con pantalla FHD y procesador Ryzen 5",
    price: 120000,
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjDaXV8Tqn29kizMU4s7DmuQX5v14evUchvA&s"
  },
  {
    name: "Combo Teclado + Mouse Redragon",
    description: "Combo ideal para gaming con iluminación RGB y diseño ergonómico",
    price: 55000,
    image_url: "https://acdn-us.mitiendanube.com/stores/001/474/949/products/k552rgb-ba-w1-0b7a0e82d022094fbc16461111452329-1024-1024.png"
  },
  {
    name: "PC Gamer Intel i5 RX 6800",
    description: "PC gamer alta gama con procesador i5, 16GB RAM, placa RX 6800 y disco 1TB M.2",
    price: 1500000,
    image_url: "https://spacegamer.com.ar/img/Public/1058/87768-producto-proyecto-nuevo-2024-06-22t102330-707.jpg"
  }
];

// Renderizar productos y agregar funcionalidad de carrito
function renderProducts() {
  const container = document.getElementById('productos');
  container.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'producto';

    const img = document.createElement('img');
    img.src = product.image_url;
    img.alt = product.name;

    const h3 = document.createElement('h3');
    h3.textContent = product.name;

    const p = document.createElement('p');
    p.textContent = '$' + product.price;

    // Botón ver detalle
    const btnDetalle = document.createElement('button');
    btnDetalle.className = 'btn-comprar';
    btnDetalle.textContent = 'Ver detalle';
    btnDetalle.addEventListener('click', () => {
      mostrarDetalle(product.name, product.price, product.description);
    });

    // Botón agregar al carrito
    const btnCarrito = document.createElement('button');
    btnCarrito.className = 'btn-comprar';
    btnCarrito.textContent = 'Agregar al carrito';
    btnCarrito.addEventListener('click', () => {
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.push(product);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      alert(`"${product.name}" se agregó al carrito! 🛒`);
    });

    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(btnDetalle);
    div.appendChild(btnCarrito);
    container.appendChild(div);
  });
}

// Ejecutar render
renderProducts();
      
