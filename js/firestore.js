import { addDoc, collection, onSnapshot, query, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js';
import db from './firebase.js';

const body = document.querySelector('body');
const outputMsg = document.querySelector('#output-msg');
const nameInput = document.querySelector('#name-input');
const randomNumber = document.querySelector('#random-number');
const guessNumber = document.querySelector('#guess-number');
const namesWrapper = document.querySelector('#names-wrapper');
const namesList = document.querySelector('#names-list');

const STORAGE_KEY = 'names';
const SESSION_KEY = 'name';

const colors = ['lightgreen', 'pink', 'lightblue', '#f7ccff', '#ffedc9'];

let names = [];
let isWhiteBackground = true;
let guessedNumber;

const getNames = async () => {
    const results = [];
    const q = query(collection(db, STORAGE_KEY));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => results.push(doc.data().name));

    names = results;

    updateList();
    changeListDisplay();
};

const getRandomItem = array => {
    const number = Math.round(Math.random() * (array.length - 1));

    return array[number];
};

const changeOutput = (el, msg) => el.innerText = msg;

const changeDisplay = (el, display) => el.style.display = display;

const changeListDisplay = () => {
    if (names.length) changeDisplay(namesWrapper, 'block');
    else changeDisplay(namesWrapper, 'none');
};

const updateList = () => {
    namesList.innerHTML = '';

    names.forEach(name => namesList.innerHTML += `<li>${name}</li>`);
};

const generateNumber = () => Math.round(Math.random() * 100);

const updateNumber = () => {
    const time = new Date();
    const seconds = time.getSeconds();

    if (seconds === 0) {
        const number = generateNumber();
        const audio = new Audio('../audio/audio.mp3');

        changeOutput(randomNumber, `${number}`);

        if (number === guessedNumber) {
            if (confirm('DETTE ER DIN LYKKEFARGE!')) {
                body.style.background = getRandomItem(colors);
                audio.play();
                isWhiteBackground = false;
            }
        }
        else {
            if (!isWhiteBackground) {
                audio.play();
                isWhiteBackground = true;
            }

            body.style.background = 'white'
        };

        guessedNumber = null;
    }
};

nameInput.addEventListener('keyup', async e => {
    if (e.key === 'Enter') {
        let name = sessionStorage.getItem(SESSION_KEY);

        await addDoc(collection(db, STORAGE_KEY), {
            name: e.target.value,
        });

        sessionStorage.setItem(SESSION_KEY, e.target.value);

        name = sessionStorage.getItem(SESSION_KEY);

        changeOutput(outputMsg, `Velkommen, vi ønsker deg alt som er godt, ${name}!`);

        changeListDisplay();

        e.target.value = '';
    }
});

guessNumber.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        guessedNumber = parseInt(e.target.value);
        e.target.value = '';
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    const name = sessionStorage.getItem(SESSION_KEY);

    if (name) changeOutput(outputMsg, `Velkommen, vi ønsker deg alt som er godt, ${name}!`);

    changeOutput(randomNumber, `${generateNumber()}`);
    changeListDisplay();
    updateList();

    setInterval(updateNumber, 1000);
});

onSnapshot(query(collection(db, STORAGE_KEY)), () => names = getNames());