const outputMsg = document.querySelector('#output-msg');
const nameInput = document.querySelector('#name-input');
const randomNumber = document.querySelector('#random-number');
const namesWrapper = document.querySelector('#names-wrapper');
const namesList = document.querySelector('#names-list');

const STORAGE_KEY = 'names';
const SESSION_KEY = 'name';

const updateStorage = names => localStorage.setItem(STORAGE_KEY, JSON.stringify(names));

const changeOutput = (el, msg) => el.innerText = msg;

const changeDisplay = (el, display) => el.style.display = display;

const changeListDisplay = () => {
    const names = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (names) changeDisplay(namesWrapper, 'block');
    else changeDisplay(namesWrapper, 'none');
};

const updateList = () => {
    const names = JSON.parse(localStorage.getItem(STORAGE_KEY));

    namesList.innerHTML = '';

    if (names) names.forEach(name => namesList.innerHTML += `<li>${name}</li>`);
};

const generateNumber = () => Math.round(Math.random() * 100);

const updateNumber = () => {
    const time = new Date();
    const seconds = time.getSeconds();

    if (seconds === 0) changeOutput(randomNumber, `${generateNumber()}`);
};

nameInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        const names = JSON.parse(localStorage.getItem(STORAGE_KEY));
        let name = sessionStorage.getItem(SESSION_KEY);

        if (names) {
            names.push(e.target.value);

            updateStorage(names);
        } else {
            const names = [];

            names.push(e.target.value);

            updateStorage(names);
        }

        sessionStorage.setItem(SESSION_KEY, e.target.value);

        name = sessionStorage.getItem(SESSION_KEY);

        changeOutput(outputMsg, `Velkommen, vi ønsker deg alt som er godt, ${name}!`);

        changeListDisplay();

        updateList();

        e.target.value = '';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const name = sessionStorage.getItem(SESSION_KEY);

    if (name) changeOutput(outputMsg, `Velkommen, vi ønsker deg alt som er godt, ${name}!`);

    changeOutput(randomNumber, `${generateNumber()}`);
    changeListDisplay();
    updateList();

    setInterval(updateNumber, 1000);
});