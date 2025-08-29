async function fetchUsers() {
            try {
                const response = await fetch('https://back-es-yjar.onrender.com/getUsers', {
                    method: 'GET',
                    credentials: 'include' // asegura que las cookies se manden en cualquier caso
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
                }

                const users = await response.json();
                const tbody = document.querySelector('#usersTable tbody');
                tbody.innerHTML = '';

                users.forEach(user => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        <td>${user.money}</td>
                        <td>${user.role}</td>
                    `;
                    tbody.appendChild(tr);
                });

            } catch (error) {
                console.error('Error al obtener los usuarios:', error);

                // opcional: mostrar en la tabla un mensaje de error
                const tbody = document.querySelector('#usersTable tbody');
                tbody.innerHTML = `<tr><td colspan="6">❌ No se pudieron cargar los usuarios</td></tr>`;
            }
        }


        async function fetchProducts() {
            try {
                const response = await fetch('https://back-es-yjar.onrender.com/getProducts', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const products = await response.json();
                const tbody = document.querySelector('#productsTable tbody');
                tbody.innerHTML = '';
                products.forEach(product => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${product.stock}</td>
                        <td>${product.price}</td>
                        <td>${product.image_url}</td>
                        <td>${product.created_at}</td>
                        <td>${product.updated_at}</td>
                        <td>${product.publisher_id}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                const tbody = document.querySelector('#productsTable tbody');
                tbody.innerHTML = `<tr><td colspan="9">❌ No se pudieron cargar los productos</td></tr>`;
            }
        }

        async function fetchPurchases() {
            try {
                const response = await fetch('https://back-es-yjar.onrender.com/getPurchases', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const purchases = await response.json();
                const tbody = document.querySelector('#purchasesTable tbody');
                tbody.innerHTML = '';
                purchases.forEach(purchase => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${purchase.id}</td>
                        <td>${purchase.user_id}</td>
                        <td>${purchase.product_id}</td>
                        <td>${purchase.quantity}</td>
                        td>${purchase.total}</td>
                        <td>${purchase.created_at}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } catch (error) {
                console.error('Error al obtener las compras:', error);
                const tbody = document.querySelector('#purchasesTable tbody');
                tbody.innerHTML = `<tr><td colspan="6">❌ No se pudieron cargar las compras</td></tr>`;
            }
        }
