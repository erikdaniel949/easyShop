const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.elements["email"].value.trim();
  const password = form.elements["password"].value;

  const data = { email, password };

  try {
    const response = await fetch("https://back-es-yjar.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include" // Incluir cookies en la solicitud
    });
    if (response.ok) {
      const result = await response.json();
      alert("Inicio de sesión exitoso. Redirigiendo al usuario a la página principal.");
      //window.location.href = "index.html";
      alert("Bienvenido " + result);
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
