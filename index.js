// RICK & MORTY SECTION
function getCharacters(done) {
    const results = fetch("https://rickandmortyapi.com/api/character/");

    results
        .then(response => response.json())
        .then(data => {
            done(data.results);
        });
}

// JSONPlaceholder API to get color information
async function getColors() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Array of colors for variety
    const colors = ['lightblue', 'lightgreen', 'lightcoral', 'lightgoldenrodyellow', 'lightpink', 'lightcyan'];

    // Use modulus to cycle through the colors
    return data.map((post, index) => colors[index % colors.length]);
}

// Function to get a random typical phrase for a character
function getTypicalPhrase() {
    const phrases = [
        "Wubba Lubba Dub Dub!",
        "Lo importante de un robo es lo que robas, no el robo.",
        "Get schwifty!",
		"Esta noche tu aventura consistirá en… Mostrar tu virilidad.",
		"Las bodas son básicamente funerales con un pastel.",
		"Cuando te digo que te calles es realmente un buen consejo.",
		"Lo siento mucho, pero tu opinión no me podría importar menos.",
		"Eres joven, tienes toda una vida por delante y tu cavidad anal es aún firme pero maleable. Hazlo por tu abuelo, Morty. Tienes que poner estas semillas dentro de tu trasero."
        
    ];

    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

// Function to speak a given text using the Text-to-Speech API
function speakText(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

function displayCharacters(characters, colors) {
    const main = document.querySelector('main');
    main.innerHTML = ""; // Clear the existing content

    characters.forEach((personaje, index) => {
        const color = colors[index]; // Get the color for the current character

        const article = document.createRange().createContextualFragment(/*html*/`
            <article style="background-color: ${color}">
                <div class="image-container">
                    <img src="${personaje.image}" alt="Personaje">
                </div>

                <h2>Name: ${personaje.name}</h2>
                <h2>Id: ${personaje.id}</h2>
                <p>Status: ${personaje.status}</p>
                <p>Gender: ${personaje.gender}</p>
                <p>Specie: ${personaje.species}</p>
                <p>Type: ${personaje.type}</p>
                <button class="character-voice-btn">Character Voice</button>
            </article>
        `);

        main.append(article);

        // Add event listener to the "Character Voice" button
        const voiceBtn = article.querySelector('.character-voice-btn');
        voiceBtn?.addEventListener('click', () => {
            const typicalPhrase = getTypicalPhrase();
            speakText(typicalPhrase);
        });
    });
}

// Add an input event listener to capture real-time input changes
document.getElementById('character-name').addEventListener('input', function () {
    const characterName = this.value.trim().toLowerCase();

    getCharacters(async data => {
        const colors = await getColors();
        const filteredCharacters = data.filter(personaje => personaje.name.toLowerCase().includes(characterName));
        displayCharacters(filteredCharacters, colors);
    });
});

// Initial display of all characters
getCharacters(async data => {
    const colors = await getColors();
    displayCharacters(data, colors);
});