// funcion para verificar si el usuario está logueado
    const checkSession = async () => {
      const response = await fetch('https://back-es-yjar.onrender.com/isLogged', {
        method: 'GET',
        credentials: 'include' // Asegura que se envíen las cookies
      })
      if(response.ok) {
        const data = await response.json();
        const sessionBtn = document.getElementById('sessionBtn');
        sessionBtn.textContent = 'Mi cuenta';
        sessionBtn.href = 'profile.html';
        
        
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
