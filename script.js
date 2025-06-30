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
        const error = await response.json();
        alert("Error al iniciar sesión: " + (error.error || "Intente nuevamente."));
      }
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      alert("Ocurrió un error. Intente más tarde.");
    }
  });
});