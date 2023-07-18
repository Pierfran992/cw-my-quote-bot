// VARIABILI
const characters = [
    {
        "nome": "Ash Ketchum",
        "img": "./images/ash-ketchum.png"
    },
    {
        "nome": "Batman",
        "img": "./images/batman.png"
    },
    {
        "nome": "Homer Simpson",
        "img": "./images/homer-simpson.png"
    },
    {
        "nome": "Hermione Granger",
        "img": "./images/hermione-granger.png"
    },
    {
        "nome": "Gandalf",
        "img": "./images/gandalf.png"
    },
    {
        "nome": "Harley Quinn",
        "img": "./images/harley-quinn.png"
    },
    {
        "nome": "Shrek",
        "img": "./images/shrek.png"
    },
    {
        "nome": "Barbie",
        "img": "./images/barbie.png"
    },
    {
        "nome": "Minion",
        "img": "./images/minion.png"
    },
];

const ctnCharacters = document.querySelector(".characters");

// -------------------------------------------

// cicli

// creo un ciclo forEach per stampare i personaggi contenuti nell'array nel DOM
characters.forEach(elem => {
    let character = `<div class="character" data-character="${elem.nome}">
                        <img src=${elem.img} />
                    </div>`;

    ctnCharacters.innerHTML += character;
});
// -------------------------------------------