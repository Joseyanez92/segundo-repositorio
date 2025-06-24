
import { Videojuego, VideojuegoFisico, VideojuegoDigital, EdicionEspecial } from './classes.js';

const INVENTORY_STORAGE_KEY = 'videojuegoInventario';

function getInventory() {
    const storedInventory = localStorage.getItem(INVENTORY_STORAGE_KEY);
    
    if (storedInventory) {
        return JSON.parse(storedInventory).map(itemData => {
            if (itemData.hasOwnProperty('contenidoExtra')) {
                return new EdicionEspecial(
                    itemData.titulo,
                    itemData.desarrollador,
                    itemData.genero,
                    itemData.sku,
                    itemData.stock,
                    itemData.precioUnitario,
                    itemData.plataforma,
                    itemData.tipoDeEmbalaje,
                    itemData.contenidoExtra,
                    itemData.edicionLimitada
                );
            } else if (itemData.hasOwnProperty('plataforma')) {
                return new VideojuegoFisico(
                    itemData.titulo,
                    itemData.desarrollador,
                    itemData.genero,
                    itemData.sku,
                    itemData.stock,
                    itemData.precioUnitario,
                    itemData.plataforma,
                    itemData.tipoDeEmbalaje
                );
            } else if (itemData.hasOwnProperty('tamanoDescarga')) {
                return new VideojuegoDigital(
                    itemData.titulo,
                    itemData.desarrollador,
                    itemData.genero,
                    itemData.sku,
                    itemData.stock,
                    itemData.precioUnitario,
                    itemData.tamanoDescarga,
                    itemData.plataformasSoportadas
                );
            } else {
                return new Videojuego(
                    itemData.titulo,
                    itemData.desarrollador,
                    itemData.genero,
                    itemData.sku,
                    itemData.stock,
                    itemData.precioUnitario
                );
            }
        });
    }
    return [];
}

function saveInventory(inventory) {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inventory));
}

export function registrarVideojuego(tipo, datos) {
    let nuevoVideojuego;
    switch (tipo) {
        case 'fisico':
            nuevoVideojuego = new VideojuegoFisico(
                datos.titulo, datos.desarrollador, datos.genero, datos.sku, datos.stock, datos.precioUnitario,
                datos.plataforma, datos.tipoDeEmbalaje
            );
            break;
        case 'digital':
            nuevoVideojuego = new VideojuegoDigital(
                datos.titulo, datos.desarrollador, datos.genero, datos.sku, datos.stock, datos.precioUnitario,
                datos.tamanoDescarga, datos.plataformasSoportadas
            );
            break;
        case 'edicionEspecial':
            nuevoVideojuego = new EdicionEspecial(
                datos.titulo, datos.desarrollador, datos.genero, datos.sku, datos.stock, datos.precioUnitario,
                datos.plataforma, datos.tipoDeEmbalaje, datos.contenidoExtra, datos.edicionLimitada
            );
            break;
        default:
            nuevoVideojuego = new Videojuego(
                datos.titulo, datos.desarrollador, datos.genero, datos.sku, datos.stock, datos.precioUnitario
            );
    }

    const inventario = getInventory();
    inventario.push(nuevoVideojuego);
    saveInventory(inventario);
}

export function mostrarRegistros(filtro = '') {
    const tablaInventarioBody = document.getElementById('tablaInventarioBody');
    const inventario = getInventory();
    tablaInventarioBody.innerHTML = ''; 

    const filteredInventory = inventario.filter(vj => {
        const details = vj.getDetails();
        const searchString = `${details.titulo} ${details.desarrollador} ${details.genero} ${details.sku}`.toLowerCase();
        return searchString.includes(filtro.toLowerCase());
    });

    if (filteredInventory.length === 0) {
        tablaInventarioBody.innerHTML = '<tr><td colspan="13" style="text-align: center;">No hay videojuegos en el inventario o no coinciden con el filtro.</td></tr>';
        return;
    }

    filteredInventory.forEach(videojuego => {
        const details = videojuego.getDetails();
        const row = tablaInventarioBody.insertRow();

        
        row.insertCell().setAttribute('data-label', 'Título:');
        row.cells[0].textContent = details.titulo;
        row.insertCell().setAttribute('data-label', 'Desarrollador:');
        row.cells[1].textContent = details.desarrollador;
        row.insertCell().setAttribute('data-label', 'Género:');
        row.cells[2].textContent = details.genero;
        row.insertCell().setAttribute('data-label', 'SKU:');
        row.cells[3].textContent = details.sku;
        row.insertCell().setAttribute('data-label', 'Stock:');
        row.cells[4].textContent = details.stock;
        row.insertCell().setAttribute('data-label', 'Precio Unitario:');
        row.cells[5].textContent = `$${details.precioUnitario}`;
        row.insertCell().setAttribute('data-label', 'Valor Total:');
        row.cells[6].textContent = `$${details.valorTotal}`;
        row.insertCell().setAttribute('data-label', 'Plataforma (Físico):');
        row.cells[7].textContent = details.plataforma || '-';
        row.insertCell().setAttribute('data-label', 'Tipo de Embalaje (Físico):');
        row.cells[8].textContent = details.tipoDeEmbalaje || '-';
        row.insertCell().setAttribute('data-label', 'Contenido Extra (E.E.):');
        row.cells[9].textContent = details.contenidoExtra || '-';
        row.insertCell().setAttribute('data-label', 'Edición Limitada (E.E.):');
        row.cells[10].textContent = details.edicionLimitada !== null ? details.edicionLimitada : '-';
        row.insertCell().setAttribute('data-label', 'Tamaño Descarga (Digital):');
        row.cells[11].textContent = details.tamanoDescarga || '-';
        row.insertCell().setAttribute('data-label', 'Plataformas Soportadas (Digital):');
        row.cells[12].textContent = details.plataformasSoportadas || '-';
    });
}