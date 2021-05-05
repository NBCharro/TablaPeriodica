'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.nometal');

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', openModal);
}

//btnCloseModal.addEventListener('click', closeModal);
//overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
// PRUEBAS
const btnLi = document.querySelectorAll('li');
let variable;
for (let i = 0; i < btnLi.length; i++) {
    if (!btnLi[i].classList.contains('vacio')) {
        btnLi[i].addEventListener('click', function () {
            variable = btnLi[i].textContent;
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
            const clase = document.querySelectorAll(`.${btnLi[i].textContent}`);
            for (let i = 0; i < clase.length; i++) {
                clase[i].classList.remove('hidden');
            }
        });
    }
}
const cierreFuncion = function () {
    const cierre = document.querySelectorAll(`.${variable}`);
    for (let i = 0; i < cierre.length; i++) {
        cierre[i].classList.add('hidden');
    }
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

overlay.addEventListener('click', cierreFuncion);
btnCloseModal.addEventListener('click', cierreFuncion);

//For the images
diceElement.src = `dice-${dice}.png`;
