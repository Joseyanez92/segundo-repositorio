function fetchData(productName) {
    let url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=15`

    if(productName !== undefined) {
        url += `&title=${productName}`
    }

    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        showData(data)
    })
    .catch(error => {
        console.error(error);
    })
}

function showData (productos) {
    let tabla = document.getElementById("table");

    tabla.innerHTML = '';

    productos.forEach(producto => {
        tabla.innerHTML += `
            <tr>
                <td>${producto.title}</td>
                <td>${producto.price}</td>
                <td>
                    <img src=${producto.images[0]}/>
                </td>
                <td>${producto.category.name}</td>
            </tr>
        `
    })
}

function findData () {
    const input = document.getElementById("buscar");

    input.addEventListener("input", function (event) {
        fetchData(event.target.value);
    });
}

fetchData();
findData();