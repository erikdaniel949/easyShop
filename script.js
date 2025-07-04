// Register

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  // Validar que el formulario exista
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const password = form.elements["password"].value;
    const confirmPassword = form.elements["confirm_password"].value;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const data = { name, email, password };

    try {
      const response = await fetch("https://node-production-d05b.up.railway.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Registro exitoso. Redirigiendo al usuario al Login.");
        window.location.href = "login.html";
      } else {
        const error = await response.json();
        alert("Error al registrar: " + (error.message || "Intente nuevamente."));
      }
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      alert("Ocurrió un error. Intente más tarde.");
    }
  });
});


// Login

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  // Validar que el formulario exista
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.elements["email"].value.trim();
    const password = form.elements["password"].value;

    const data = { email, password };

    try {
      const response = await fetch("https://node-production-d05b.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        alert("Inicio de sesión exitoso. Redirigiendo al usuario a la página principal.");
        window.location.href = "index.html";
      } else {
        // Leer el mensaje de error del backend
        const result = await response.json();
        alert("Error al iniciar sesión: " + (result.error || "Intente nuevamente."));
      }
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      alert("Ocurrió un error. Intente más tarde.");
    }
  });
});


const showDatabase = async () => {
  try {
    const response = await fetch("http://localhost:3000/showDatabase");
    if (response.ok) {
      const data = await response.json();
      const fragment = document.createDocumentFragment();
      // Buscar el tbody de la tabla por id o selector correcto
      const tableBody = document.querySelector(".table-body");
      tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.password}</td>
        `;
        fragment.appendChild(row);
      });
      tableBody.appendChild(fragment);
    } else {
      console.error("Error al obtener los datos de la base de datos.");
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
  }
}

// Ejecutar showDatabase automáticamente si existe el div de la base de datos
if (document.getElementById("databaseContent")) {
  showDatabase();
}