const container = document.querySelector('.m-container');
const button = document.querySelector('.header__button');
const closeButton = document.querySelector('.modal__close__button');

button.addEventListener('click', () => {
    container.classList.toggle('openModal');
})
closeButton.addEventListener('click', () => {
    container.classList.toggle('openModal');
})