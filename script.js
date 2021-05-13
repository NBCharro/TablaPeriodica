'use strict';

const parent = document.querySelector('.elementos');
const chemistry = document.querySelectorAll('.elemento');
const btn = document.querySelector('.probandoCosas');

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

// Spinner
const renderSpinner = function () {
    const markup = `
    <div class="spinner">
        <img src="images/loading.png" alt="loading" />
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', markup);
    console.log('Spinner');
};

// Event listener for each element
chemistry.forEach(box =>
    box.addEventListener('click', function () {
        AJAX(box);
    })
);

// Close modal
parent.addEventListener('click', function (e) {
    const deleting = function () {
        document.querySelector('.modal').remove();
        document.querySelector('.overlay').remove();
    };
    if (e.target.className === 'close-modal') {
        deleting();
    }
    if (e.target.className === 'overlay') {
        deleting();
    }
});

// API call
const AJAX = async function (element) {
    try {
        console.log(element.dataset.nombre);
        const url = `https://periodic-table-api.herokuapp.com/atomicName/${element.dataset.name}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        createModal(data, element);
    } catch (err) {
        console.error(err);
    }
};

btn.addEventListener('click', function () {
    renderSpinner();
});
