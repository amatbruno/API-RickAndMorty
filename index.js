
//GET RICK & MORTY API FUNCT
function getCharacters(done) {
	const results = fetch("https://rickandmortyapi.com/api/character/");

	results
		.then(response => response.json())
		.then(data => {
			done(data.results);
		});
}

//JSONPLACEHOLDER API FUNCT
async function getColors() {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	const data = await response.json();

	// Array of colors for variety
	const colors = ['lightblue', 'lightgreen', 'lightcoral', 'lightgoldenrodyellow', 'lightpink', 'lightcyan', 'lightgray', 'lightsalmon', 'lightseagreen'];

	// Use modulus to cycle through the colors
	return data.map((post, index) => colors[index % colors.length]);
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
				<button type="submit">Character Voice</button>
				
            </article>
        `);

		main.append(article);
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