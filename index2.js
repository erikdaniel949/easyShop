// -----------------------------
// Verificar sesión
// -----------------------------
const checkSession = async () => {
  try {
    const response = await fetch('https://back-es-yjar.onrender.com/isLogged', {
      method: 'GET',
      credentials: 'include'
    });
    if (response.ok) {
      const data = await response.json();
      const sessionBtn = document.getElementById('sessionBtn');
      if (sessionBtn) {
        sessionBtn.textContent = 'Mi cuenta';
        sessionBtn.href = 'profile.html';
      }
    }
  } catch (err) {
    console.error('Error al verificar la sesión:', err);
  }
};

// -----------------------------
// Mostrar detalle del producto
// -----------------------------
function mostrarDetalle(nombre, precio, descripcion) {
  document.getElementById("detalle-nombre").textContent = nombre;
  document.getElementById("detalle-precio").textContent = "Precio: $" + precio;
  document.getElementById("detalle-descripcion").textContent = descripcion;
  document.getElementById("detalle-producto").style.display = "block";
}

function cerrarDetalle() {
  document.getElementById("detalle-producto").style.display = "none";
}

// -----------------------------
// Cargar productos desde el backend y renderizarlos
// -----------------------------
async function fetchAndRenderProducts() {
  const container = document.getElementById('productos');
  if (!container) return;

  try {
    const res = await fetch('https://back-es-yjar.onrender.com/getProducts', {
      method: 'GET',
      credentials: 'include'
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const products = await res.json();

    container.innerHTML = ''; // limpiar contenedor

    if (!Array.isArray(products) || products.length === 0) {
      container.innerHTML = '<p>No hay productos disponibles.</p>';
      return;
    }

    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'producto';

      const img = document.createElement('img');
      img.src = product.image_url || product.img || '';
      img.alt = product.name || product.title || 'Producto';

      const h3 = document.createElement('h3');
      h3.textContent = product.name || product.title || 'Sin nombre';

      const p = document.createElement('p');
      p.textContent = '$' + (product.price ?? product.precio ?? '0');

      // Botón ver detalle
      const btnDetalle = document.createElement('button');
      btnDetalle.className = 'btn-comprar';
      btnDetalle.textContent = 'Ver detalle';
      btnDetalle.addEventListener('click', () => {
        /*
        mostrarDetalle(
          product.name || '',
          product.price ?? product.precio ?? '',
          product.description || product.desc || ''
        );
        */
        window.location.href = `product.html?id=${product.id}`;
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

  } catch (error) {
    console.error('Error al cargar productos:', error);
    container.innerHTML = '<p>❌ No se pudieron cargar los productos. Intente más tarde.</p>';
  }
}

async function loadBalance() {
    try {
        const res = await fetch("https://back-es-yjar.onrender.com/getBalance", {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) {
            document.getElementById("balanceBox").textContent = "Balance: Error";
            return;
        }

        const data = await res.json();
        document.getElementById("balanceBox").textContent = "Balance: $" + data.balance;
    } catch (err) {
        document.getElementById("balanceBox").textContent = "Balance: Error";
    }
}

// -----------------------------
// Ejecutar todo al cargar la página
// -----------------------------
window.addEventListener('DOMContentLoaded', () => {
  checkSession();
  fetchAndRenderProducts();
  loadBalance();
});
