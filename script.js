document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const pass = form.password.value;
      const confirm = form.confirm_password.value;
      if (pass !== confirm) {
        e.preventDefault();
        alert('Las contraseñas no coinciden.');
      }
    });
  }
});
