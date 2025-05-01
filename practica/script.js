function fetchdata() {
    fetch("http://127.0.0.1:5500/users.json.json")
        .then(Response => {
            return Response.json();
        })
        .then(data => {
            localStorage.setItem("usuarios", JSON.stringify(data));
        })
        .catch(error => {
            console.error(error);
        })

}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const userTableBody = document.getElementById('userTableBody');
    let userData = [];
    let allUsersData = [];

    async function fetchUserData() {
        try {
            const response = await fetch('users.json.json');
            const data = await response.json();
            userData = data.usuarios;
            allUsersData = [...userData];
            renderTable(userData);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            userTableBody.innerHTML = '<tr><td colspan="9">Error al cargar los datos.</td></tr>';
        }
    }

    function renderTable(users) {
        userTableBody.innerHTML = '';
        users.forEach(usuario => {
            userTableBody.innerHTML += `
                <tr>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.direccion.numero}</td>
                    <td>${usuario.telefono}</td>
                    <td>${usuario.direccion.calle}</td>
                    <td>${usuario.direccion.ciudad}</td>
                </tr>
            `;
        });
    }

    function filterUsers() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredUsers = allUsersData.filter(user =>
            user.nombre.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredUsers);
    }

    searchInput.addEventListener('keyup', filterUsers);

    fetchUserData();
});