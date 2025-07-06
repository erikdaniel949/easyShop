const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Desactivar el botón
  const registerBtn = document.getElementById('registerBtn')
  registerBtn.disabled = true;
  registerBtn.textContent = "Registrando...";

  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();
  const password = form.elements["password"].value;
  const confirmPassword = form.elements["confirm_password"].value;

  const errors = [];
  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    errors.push("Las contraseñas no coinciden");
  }
  // Validar que la contraseña tenga 8 o más carácteres
  if (password.length < 8) {
    errors.push("Debe tener almenos 8 carácteres");
  }
  // Validar que la contraseña tenga una mayúscula
  if (!/[A-Z]/.test(password)) {
    errors.push("Debe tener 1 mayúscula");
  }
  // Validar que la contraseña tenga un número
  if (!/\d/.test(password)) {
    errors.push("Debe tener 1 número");
  }
  // Validar que la contraseña tenga un símbolo
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Debe tener 1 símbolo");
  }

  // Mostrar errores al usuario
  if (errors.length !== 0) {
    alert("Error en la contraseña: " + errors.join('. '));
    registerBtn.disabled = false;
    registerBtn.textContent = "Registrarse";
    return;
  }

  // Empaquetar datos
  const data = { name, email, password };

  // Intentar hacer la consulta de registro a la api
  try {
    const response = await fetch("https://backend-production-4cbf.up.railway.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Si la consulta fue bien redirigir al usuario al login. Si no mostrarle el error al usuario
    if (response.ok) {
      const result = await response.json();
      window.location.href = "login.html";
    } else {
      const error = await response.json();
      alert("Error al registrar: " + (error.error || "Intente nuevamente."));
    }
  } catch (err) {
    console.error("Error al enviar la solicitud:", err);
    alert("Ocurrió un error. Intente más tarde.");
  } finally {
    registerBtn.disabled = false;
    registerBtn.textContent = "Registrarse";
  }
});


// Validaciones dinamicas de las contraseñas

const passwordsMatch = () => {
  if (pwConfirmInput.value !== pwInput.value) {
    pwConfirmWarning.style.display = 'block';
  } else {
    pwConfirmWarning.style.display = 'none';
  }
}

const pwInput = document.getElementById('passwordInput');
const pwLength = document.getElementById('passwordLength');
const pwMayus = document.getElementById('passwordMayus');
const pwNums = document.getElementById('passwordNums');
const pwSymbol = document.getElementById('passwordSymbol');
const pwRules = document.querySelector('.password-rules');

// Evento que escucha cada cambio en el input
pwInput.addEventListener('input', () => {
  // Valores de las validaciones
  const value = pwInput.value;
  const validLength = value.length >= 8;
  const hasMayus = /[A-Z]/.test(value);
  const hasNum = /\d/.test(value);
  const hasSymbol = /[^A-Za-z0-9]/.test(value);

  // Validaciones
  passwordsMatch();
  pwLength.hidden = validLength;
  pwMayus.hidden = hasMayus;
  pwNums.hidden = hasNum;
  pwSymbol.hidden = hasSymbol;

  // Si las validaciones se cumplen ocultar el contenedor. Si no mostrarlo
  if (validLength && hasMayus && hasNum && hasSymbol) {
    pwRules.hidden = true;
  } else {
    pwRules.hidden = false;
  }
});

// Validar si confirmar contraseña es igual a la contraseña
const pwConfirmInput = document.getElementById('passwordConfirmInput');
const pwConfirmWarning = document.querySelector('.confirm-password-warning');

// Evento que escucha cada cambio en el input
pwConfirmInput.addEventListener('input', passwordsMatch);

