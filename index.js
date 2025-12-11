// funcion para verificar si el usuario está logueado
    const checkSession = async () => {
      const response = await fetch('https://back-es-yjar.onrender.com/isLogged', {
        method: 'GET',
        credentials: 'include' // Asegura que se envíen las cookies
      })
      if(response.ok) {
        const data = await response.json();
        const sessionBtn = document.getElementById('sessionBtn');
        sessionBtn.textContent = 'Mis productos';
        sessionBtn.href = 'myProducts.html';
        
        
      } else {
        console.error('Error al verificar la sesión');
      }
    }
    checkSession();
    


    function mostrarDetalle(nombre, precio, descripcion) {
  document.getElementById("detalle-nombre").textContent = nombre;
  document.getElementById("detalle-precio").textContent = "Precio: " + precio;
  document.getElementById("detalle-descripcion").textContent = descripcion;
  document.getElementById("detalle-producto").style.display = "block";
}

function cerrarDetalle() {
  document.getElementById("detalle-producto").style.display = "none";
}

// Cargar productos desde el backend y renderizarlos en la página
async function fetchAndRenderProducts() {
  const container = document.getElementById('productos');
  const loading = document.getElementById('productos-loading');
  try {
    const res = await fetch('https://back-es-yjar.onrender.com/getProducts', {
      method: 'GET',
      credentials: 'include'
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const products = await res.json();
    // limpiar contenedor
    container.innerHTML = '';

    if (!Array.isArray(products) || products.length === 0) {
      container.innerHTML = '<p>No hay productos disponibles.</p>';
      return;
    }

    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'producto';

      const img = document.createElement('img');
      img.src = product.image_url || product.img || '';
      img.alt = product.name || 'Producto';

      const h3 = document.createElement('h3');
      h3.textContent = product.name || product.title || 'Sin nombre';

      const p = document.createElement('p');
      p.textContent = '$' + (product.price ?? product.precio ?? '0');

      // Construir link a detalle usando query params
      const a = document.createElement('a');
      a.className = 'btn-comprar';
      const nombre = encodeURIComponent(product.name || '');
      const precio = encodeURIComponent(product.price ?? product.precio ?? '');
      const desc = encodeURIComponent(product.description || product.desc || '');
      const imgParam = encodeURIComponent(product.image_url || product.img || '');
      a.href = `producto.html?nombre=${nombre}&precio=${precio}&desc=${desc}&img=${imgParam}`;
      a.textContent = 'Ver producto';

      div.appendChild(img);
      div.appendChild(h3);
      div.appendChild(p);
      div.appendChild(a);
      container.appendChild(div);
    });

  } catch (error) {
    console.error('Error al cargar productos:', error);
    if (loading) loading.remove();
    container.innerHTML = '<p>❌ No se pudieron cargar los productos. Intente más tarde.</p>';
  }
}

// Ejecutar la carga de productos al cargar la página
fetchAndRenderProducts();
