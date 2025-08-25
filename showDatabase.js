const showDatabase = async () => {
  try {
    const response = await fetch("https://back-es-yjar.onrender.com/showDatabase", {
      method: "GET",
      credentials: "include" // Esto envía las cookies
    });
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
