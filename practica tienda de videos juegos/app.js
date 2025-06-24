import { registrarVideojuego, mostrarRegistros } from './utils/inventorymanager.js';

document.addEventListener('DOMContentLoaded', () => {

    const registroForm = document.getElementById('registroVideojuegoForm');
    const tipoVideojuegoSelect = document.getElementById('tipoVideojuego');
    const fisicoDigitalFields = document.getElementById('fisicoDigitalFields');
    const digitalFields = document.getElementById('digitalFields');
    const edicionEspecialFields = document.getElementById('edicionEspecialFields');
    const filtroInput = document.getElementById('filtroInput');
    const btnMostrarRegistros = document.getElementById('btnMostrarRegistros');
    const btnClearLocalStorage = document.getElementById('btnClearLocalStorage');

    function toggleSpecificFields() {
        const tipo = tipoVideojuegoSelect.value;

        fisicoDigitalFields.classList.add('hidden');
        digitalFields.classList.add('hidden');
        edicionEspecialFields.classList.add('hidden');

        if (tipo === 'fisico') {
            fisicoDigitalFields.classList.remove('hidden');
            edicionEspecialFields.classList.add('hidden');
        } else if (tipo === 'edicionEspecial') {
            fisicoDigitalFields.classList.remove('hidden');
            edicionEspecialFields.classList.remove('hidden');
        } else if (tipo === 'digital') {
            digitalFields.classList.remove('hidden');
        }
    }

    tipoVideojuegoSelect.addEventListener('change', toggleSpecificFields);

    registroForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const tipo = tipoVideojuegoSelect.value;
        const datos = {
            titulo: document.getElementById('titulo').value,
            desarrollador: document.getElementById('desarrollador').value,
            genero: document.getElementById('genero').value,
            sku: parseInt(document.getElementById('sku').value, 10),
            stock: parseInt(document.getElementById('stock').value, 10),
            precioUnitario: parseFloat(document.getElementById('precioUnitario').value)
        };

        if (tipo === 'fisico' || tipo === 'edicionEspecial') {
            datos.plataforma = document.getElementById('plataformaFisico').value;
            datos.tipoDeEmbalaje = document.getElementById('tipoDeEmbalaje').value;
        }
        if (tipo === 'digital') {
            datos.tamanoDescarga = document.getElementById('tamanoDescarga').value;

            datos.plataformasSoportadas = document.getElementById('plataformasSoportadas').value
                                            .split(',').map(item => item.trim()).filter(item => item !== '');
        }
        if (tipo === 'edicionEspecial') {
            datos.contenidoExtra = document.getElementById('contenidoExtra').value;
            datos.edicionLimitada = document.getElementById('edicionLimitada').checked;
        }

        registrarVideojuego(tipo, datos);
        registroForm.reset();
        toggleSpecificFields();
        mostrarRegistros();
    });

    filtroInput.addEventListener('keyup', (event) => {
        mostrarRegistros(event.target.value);
    });

    btnMostrarRegistros.addEventListener('click', () => mostrarRegistros());

    btnClearLocalStorage.addEventListener('click', () => {
        localStorage.clear();
        mostrarRegistros();
    });

    toggleSpecificFields();
    mostrarRegistros();
});