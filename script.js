'use strict';
import 'regenerator-runtime';

const parent = document.querySelector('.elementos');
const chemistry = document.querySelectorAll('.elemento');
const btn = document.querySelector('.probandoCosas');

// Spinner
const renderSpinner = function () {
    const markup = `
    <div class="modal">
        <button class="close-modal">&times;</button>
        <div class="spinner">
            <img src="/images/Loading.png" alt="loading" />
        </div>
    </div>
    <div class="overlay"></div>`;
    parent.insertAdjacentHTML('afterbegin', markup);
};

// Modal
const createModal = function (data, element) {
    const vacio = (valor, unidades = '') =>
        valor === '' ? 'Desconocido' : valor + ' ' + unidades;
    const imagen = element.dataset.nombre.toLowerCase();
    const markup = `
    <div class="modal">
    <button class="close-modal">&times;</button>
    <h1 class="titulo-modal">${element.dataset.nombre}</h1>
    <img
        src="/images/elementos/${imagen}.png"
        alt="${element.dataset.nombre}"
        class="imagen-modal"
    />
    <p class="texto-modal">Número atómico <h5 class="valor">${vacio(
        data.atomicNumber
    )}</h5></p>
    <p class="texto-modal">Número másico <h5 class="valor">${vacio(
        data.atomicMass
    )}</h5></p>
    <p class="texto-modal">Temperatura de fusión <h5 class="valor">${vacio(
        data.meltingPoint,
        'K'
    )}</h5></p>
    <p class="texto-modal">Temperatura de ebullición <h5 class="valor">${vacio(
        data.boilingPoint,
        'K'
    )}</h5></p>
    <p class="texto-modal">Estado a temperatura ambiente <h5 class="valor">${vacio(
        data.standardState
    )}</h5></p>
    <p class="texto-modal">Radio atómico <h5 class="valor">${vacio(
        data.atomicRadius,
        'pm'
    )}</h5></p>
    <p class="texto-modal">Color CPK <h5 class="valor">#${vacio(
        data.cpkHexColor
    )}</h5></p>
    <p class="texto-modal">Densidad <h5 class="valor">${vacio(
        data.density,
        'Kg/m3'
    )}</h5></p>
    <p class="texto-modal">Configuracion electronica <h5 class="valor">${vacio(
        data.electronicConfiguration
    )}</h5></p>
    <p class="texto-modal">Estados de oxidación <h5 class="valor">${vacio(
        data.oxidationStates
    )}</h5></p>
    <p class="texto-modal">Año descubierto <h5 class="valor">${vacio(
        data.yearDiscovered
    )}</h5></p>
    <p class="texto-modal">Radio de Van der Waals <h5 class="valor">${vacio(
        data.vanDelWaalsRadius,
        'pm'
    )}</h5></p>
    </div>
    <div class="overlay"></div>`;
    parent.insertAdjacentHTML('afterbegin', markup);
};

const deleteModal = function () {
    document.querySelector('.modal').remove();
    document.querySelector('.overlay').remove();
};

// Event listener for each element
chemistry.forEach(box =>
    box.addEventListener('click', function () {
        AJAX(box);
    })
);

// Close modal
parent.addEventListener('click', function (e) {
    if (e.target.className === 'close-modal') {
        deleteModal();
    }
    if (e.target.className === 'overlay') {
        deleteModal();
    }
});

// API call
const AJAX = async function (element) {
    try {
        renderSpinner();
        const url = `https://periodic-table-api.herokuapp.com/atomicName/${element.dataset.name}`;
        const res = await fetch(url);
        const data = await res.json();
        deleteModal();
        createModal(data, element);
    } catch (err) {
        console.error(err);
    }
};

// Pruebas con imagen
const boton = document.querySelector('.boton-imagen');
const prueba = function () {
    const img = new Image();
    img.src = 'images/loading.png';
    parent.appendChild(img);
    console.log(img);
    var img2 = document.createElement('img');
    img2.src = 'images/loading.png';
    parent.appendChild(img2);
    console.log(img2);
};
console.log('Fixing show images');
