// VARIABILI
const ArrayCharacters = [
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

const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4";
const API_KEY = "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";

const loader = document.querySelector('.loading');
const modal = document.querySelector(".modal");
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const ctnCharacters = document.querySelector(".characters");

// -------------------------------------------

// cicli
// creo un ciclo forEach per stampare i personaggi contenuti nell'array nel DOM
ArrayCharacters.forEach(elem => {
    let character = `<div class="character" data-character="${elem.nome}">
                        <img src=${elem.img} />
                    </div>`;

    ctnCharacters.innerHTML += character;
});
// -------------------------------------------

/*-----------
    FUNCTIONS 
------------*/
async function playCharacter(nameCharacter) {
    // 1. Mostrare il loader
    loader.classList.remove("loading-hidden");
    // 2. Chiamare le Api di Open AI
    // const action = "Saluta nel tuo modo più iconico";
    const action = getRandomAction();
    const temperature = 0.7;
    // 3. Recuperare la risposta
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: `Sei ${nameCharacter} e ${action} con un massimo di 100 caratteri senza mai uscire dal tuo personaggio`
                }
            ],
            temperature: temperature
        })
    })
    // 4. Interpretare la risposta in JSON
    const data = await response.json();
    // 5. Compilare la modale con i dati ricevuti
    const message = data.choices[0].message.content;
    modalContent.innerHTML = `
        <h2>${nameCharacter}</h2>
        <p>${message}</p>
        <code>Character: ${nameCharacter}, action: ${action}, temperature: ${temperature}</code>
    `;
    // 6. Nascondere il loader e mostrare la modale
    loader.classList.add("loading-hidden");
    modal.classList.remove("modal-hidden");
}

function getRandomAction() {
    const actions = [
        'salutare nel tuo modo più iconico',
        'dare un consiglio di stile in base ai tuoi gusti',
        'raccontare la tua ultima avventura',
        'svelarmi i tuoi sogni',
        'dirmi chi è il tuo migliore amico',
        'scrivere la tua bio di linkedin'
    ];

    const indexRandom = Math.floor(Math.random() * actions.length); // da 0 a 5

    return actions[indexRandom];
}

/*-----------
    INIT & EVENTS
------------*/
const characters = document.querySelectorAll(".character");

characters.forEach(function (element) {
    element.addEventListener("click", function () {
        playCharacter(element.dataset.character);
    })
})

modalClose.addEventListener("click", function () {
    modal.classList.add("modal-hidden");
});