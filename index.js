
//RICK & MORTY SECTION
function getCharacters(done) {
    const results = fetch("https://rickandmortyapi.com/api/character/");

    results
        .then(response => response.json())
        .then(data => {
            done(data.results);
        });
}

function displayCharacters(characters) {
    const main = document.querySelector('main');
    main.innerHTML = ""; // Clear the existing content

    characters.forEach(personaje => {
        const article = document.createRange().createContextualFragment(/*html*/`
            <article>
                <div class="image-container">
                    <img src="${personaje.image}" alt="Personaje">
                </div>

                <h2>Name: ${personaje.name}</h2>
                <h2>Id: ${personaje.id}</h2>
                <p>Status: ${personaje.status}</p>
                <p>Gender: ${personaje.gender}</p>
                <p>Specie: ${personaje.species}</p>
                <p>Type: ${personaje.type}</p>
            </article>
        `);

        main.append(article);
    });
}

// Add an input event listener to capture real-time input changes
document.getElementById('character-name').addEventListener('input', function () {
    const characterName = this.value.trim().toLowerCase();

    getCharacters(data => {
        const filteredCharacters = data.filter(personaje => personaje.name.toLowerCase().includes(characterName));
        displayCharacters(filteredCharacters);
    });
});

// Initial display of all characters
getCharacters(data => {
    displayCharacters(data);
});



//COLORS SECTION
let galNav   = document.querySelector('#galNav ul');
let gallery  = document.querySelector('#gallery');
let display  = document.querySelector('#display');
const API    = {
	albums : "https://jsonplaceholder.typicode.com/albums",
	photos : "https://jsonplaceholder.typicode.com/photos"
};

// CSS classes
let thumbCSS = [];
let albumCSS = [];

// templates
const albumTemplate = (album) =>{
	return `
		<li  class 		= "album ${ albumCSS.join(" ") }" 
				 onclick 	= "getGallery(${album.id})">
				 ${album.title}
		</li>`
};
const photoTemplate = (photo) =>{
	return `
	<div   class    = "thumbWrapper" 
				 onclick  = "getPhoto( ${photo.id} )"/>
		<img class    = "thumb ${ thumbCSS.join(" ") }" 
			   src      = "${photo.thumbnailUrl}" 
			   alt      = "${photo.title}" />
			   
		<h6>${photo.title}</h6>
	</div>`
};

// fetch functions
function getAlbums(){
	fetch(API.albums)
		.then((res) => res.json())
		.then((data) => {
			galNav.innerHTML = data.map(albumTemplate).join('');
			getGallery(data[0].id)
		});
}
function getGallery(id){
	fetch(`${API.photos}?albumId=${id}`)  //query Album;
		.then((res) => res.json())
		.then((data) => {
		getPhoto(data[0].id)
		gallery.innerHTML = data.map(photoTemplate).join("");
		
	})
}
function getPhoto(id){ 
	fetch(`${API.photos}?id=${id}`)
		.then((res) => res.json())
		.then((data) => {
			display.src = data[0].url;
			display.alt = data[0].title;
		})
}

// fetch album
getAlbums();