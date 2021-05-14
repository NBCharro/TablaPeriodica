'use strict';

const parent = document.querySelector('.elementos');
const chemistry = document.querySelectorAll('.elemento');
const btn = document.querySelector('.probandoCosas');

// Spinner
const renderSpinner = function () {
    const markup = `
    <div class="modal">
        <button class="close-modal">&times;</button>
        <div class="spinner">
            <img src="images/loading.png" alt="loading" />
        </div>
    </div>
    <div class="overlay"></div>`;
    parent.insertAdjacentHTML('afterbegin', markup);
    console.log('Spinner');
};

// Modal
const createModal = function (data, element) {
    const vacio = (valor, unidades = '') =>
        valor === '' ? 'Desconocido' : valor + ' ' + unidades;
    const markup = `
    <div class="modal">
    <button class="close-modal">&times;</button>
    <h1>${element.dataset.nombre}</h1>
    <img
        src="images/grandes/hidrogenoGrande.jpg"
        alt="${data.name}"
    />
    <p>Numero atomico ${vacio(data.atomicNumber)}</p>
    <p>Numero masico ${vacio(data.atomicMass)}</p>
    <p>Temperatura de fusión ${vacio(data.meltingPoint, 'K')}</p>
    <p>Temperatura de ebullición ${vacio(data.boilingPoint, 'K')}</p>
    <p>Estado a temperatura ambiente ${vacio(data.standardState)}</p>
    <p>Radio atomico ${vacio(data.atomicRadius, 'pm')}</p>
    <p>Color CPK #${vacio(data.cpkHexColor)}</p>
    <p>Densidad ${vacio(data.density, 'Kg/m3')}</p>
    <p>Configuracion electronica ${vacio(data.electronicConfiguration)}</p>
    <p>Estados de oxidacion ${vacio(data.oxidationStates)}</p>
    <p>Año descubierto ${vacio(data.yearDiscovered)}</p>
    <p>Radio de Van der Waals ${vacio(data.vanDelWaalsRadius, 'pm')}</p>
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
        console.log(element.dataset.nombre);
        const url = `https://periodic-table-api.herokuapp.com/atomicName/${element.dataset.name}`;
        const res = await fetch(url);
        const data = await res.json();
        deleteModal();
        console.log(data);
        createModal(data, element);
    } catch (err) {
        console.error(err);
    }
};

// Pruebas

btn.addEventListener('click', function () {
    renderSpinner();
});
