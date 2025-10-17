
// DOM ELEMENTS
const searchButton = document.getElementById("search-button");
const inputSearchBar = document.getElementById("input-search-bar");
const pokemonNameTitle = document.getElementById("pokemon-name");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonImage1 = document.getElementById("pokemon-image-1");
const pokemonImage2 = document.getElementById("pokemon-image-2");
const pokemonImgElement = document.getElementById("pokemon-image-element");
const currentStatsContainer = document.getElementById("current-stats-container");
const rats1 = document.getElementById("rats-1");
const rats2 = document.getElementById("rats-2");

// VARIABLES
const pokemonAPI = "https://pokeapi.co/";

// EVENT LISTENERS
inputSearchBar.addEventListener("click", () => {
    //console.log("input search bar clicked");
});

searchButton.addEventListener("click", async () => {
    
    try { 
        const inputValue = document.getElementById("input-search-bar").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
        
        if(!response.ok){
            console.error(`Could not fetch resource. "${inputValue}" is not a Pokemon.`);
            pokemonNameTitle.innerHTML = `
                <h1 class="boldPokemonName">ERROR</h1>
            `;
            pokemonImage.innerHTML = `
                <img src="wrong.webp"/>
            `
            pokemonImage1.innerHTML = `
                <img src="wrong.webp"/>
            `
            pokemonImage2.innerHTML = `
                <img src="wrong.webp"/>
            `
            setTimeout(() => {
                pokemonNameTitle.innerHTML = `
                <h1>ERROR</h1>
                `;
            }, 3000);
            clearInputBar();
        };
        
        // FIX WHEN THERE IS AN ERROR SEARCH THAT I CANNOT SEARCH AGAIN
        // I HAVE TO REFRESH AGAIN BEFORE SEARCHING
        if(inputValue == ""){
            pokemonNameTitle.innerHTML = `
                <h1>Enter a Pokemon Name!</h1>
            `;            
            pokemonImage.innerHTML = `
                <img src="sad.jpg"/>
            `
            pokemonImage1.innerHTML = `
                <img src="sad.jpg"/>
            `
            pokemonImage2.innerHTML = `
                <img src="sad.jpg"/>
            `
            return;
        };
        
        // CURRENT SEARCH POKEMON
        const data = await response.json();
        const capitalizePokemonName = capitalize(data.name);
        console.log(`Searching for ${capitalizePokemonName}...`);

        // POKEMON ID VARIABLE
        const pokemonID = data.id;
        const pokemonMove = capitalize(data.moves[0].move.name);
        const pokemonType = capitalize(data.types[0].type.name);
        const pokemonHeight = data.height;
        const pokemonWeight = data.weight;

        // I THINK BOTH STRING AND NUMBER WORKS ???
        const prevPokemonID = String(pokemonID - 1);
        const nextPokemonID = pokemonID + 1;
        
        // PREVIOUS 
        const getPrevPokemonID = await fetch(`https://pokeapi.co/api/v2/pokemon/${prevPokemonID}`);
        const prevData = await getPrevPokemonID.json();
        console.log(`getPrevPokemonID: ${prevData.name}`);

        // GET PREV POKEMON SPRITES
        const pokemonSprite1 = prevData.sprites.front_default;
        const rats1Move = capitalize(prevData.moves[0].move.name);
        const rats1Type = capitalize(prevData.types[0].type.name);
        const rats1Height = prevData.height;
        const rats1Weight = prevData.weight;
        
        // NEXT
        const getNextPokemonID = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextPokemonID}`);
        const nextData = await getNextPokemonID.json();
        console.log(`getNextPokemonID: ${nextData.name}`);

        // GET NEXT POKEMON SPRITES
        const pokemonSprite2 = nextData.sprites.front_default;
        const rats2Move = capitalize(nextData.moves[0].move.name);
        const rats2Type = capitalize(nextData.types[0].type.name);
        const rats2Height = nextData.height;
        const rats2Weight = nextData.weight;
 
        // LOADING POKEMON NAME FEATURE
        pokemonNameTitle.innerHTML = `
            <h1>Searching</h1>
        `;
        pokemonImage.innerHTML = `
            <img src="loading.png"/>
            <h3 id="current-pokemon-id">ID: </h3>
        `;
        pokemonImage1.innerHTML = `
            <h3 id="previous-pokemon-title">.</h3>
            <img src="loading.png"/>
            <h4 id="previous-pokemon-id">.</h4>
        `;
        pokemonImage2.innerHTML = `
            <h3 id="next-pokemon-title">.</h3>
            <img src="loading.png"/>
            <h4 id="next-pokemon-id">.</h4>
        `;
        currentStatsContainer.innerHTML = `
            <ul>
                <li><span class="bolded-stats">Move:</span> ${pokemonMove}</li>
                <li><span class="bolded-stats">Type:</span> ${pokemonType}</li>
                <li><span class="bolded-stats">Height:</span> ${pokemonHeight}</li>
                <li><span class="bolded-stats">Weight:</span> ${pokemonWeight}</li>
            </ul>
        `;
        rats1.innerHTML = `
            <ul>
                <li><span class="bolded-stats">Move:</span> ${rats1Move}</li>
                <li><span class="bolded-stats">Type:</span> ${rats1Type}</li>
                <li><span class="bolded-stats">Heigh</span>t: ${rats1Height}</li>
                <li><span class="bolded-stats">Weight</span>: ${rats1Weight}</li>
            </ul>
        `;
        rats2.innerHTML = `
            <ul>
                <li><span class="bolded-stats">Move:</span> ${rats2Move}</li>
                <li><span class="bolded-stats">Type:</span> ${rats2Type}</li>
                <li><span class="bolded-stats">Heigh</span>t: ${rats2Height}</li>
                <li><span class="bolded-stats">Weight</span>: ${rats2Weight}</li>
            </ul>
        `;

        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
                <h1>Searching .</h1>
            `;
            pokemonImage.innerHTML = `
                <img src="loading.png"/>
                <h3 id="current-pokemon-id">ID: .</h3>
            `;
            pokemonImage1.innerHTML = `
                <h3 id="previous-pokemon-title">.</h3>
                <img src="loading.png"/>
                <h4 id="previous-pokemon-id">.</h4>
            `;
            pokemonImage2.innerHTML = `
                <h3 id="next-pokemon-title">.</h3>
                <img src="loading.png"/>
                <h4 id="next-pokemon-id">.</h4>
            `;
        }, 250);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
                <h1>Searching ..</h1>
            `;
            pokemonImage.innerHTML = `
                <img src="loading.png"/>
                <h3 id="current-pokemon-id">ID: ..</h3>
            `;
            pokemonImage1.innerHTML = `
                <h3 id="previous-pokemon-title">..</h3>
                <img src="loading.png"/>
                <h4 id="previous-pokemon-id">..</h4>
            `;
            pokemonImage2.innerHTML = `
                <h3 id="next-pokemon-title">..</h3>
                <img src="loading.png"/>
                <h4 id="next-pokemon-id">..</h4>
            `;
        }, 500);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
                <h1>Searching ...</h1>
            `;
            pokemonImage.innerHTML = `
                <img src="loading.png"/>
                <h3 id="current-pokemon-id">ID: ...</h3>
            `;
            pokemonImage1.innerHTML = `
                <h3 id="previous-pokemon-title">...</h3>
                <img src="loading.png"/>
                <h4 id="previous-pokemon-id">...</h4>
            `;
            pokemonImage2.innerHTML = `
                <h3 id="next-pokemon-title">...</h3>
                <img src="loading.png"/>
                <h4 id="next-pokemon-id">...</h4>
            `;
        }, 750);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
                <h1 class="bold-pokemon-name">${capitalizePokemonName}</h1>
            `;
            pokemonImage.innerHTML = `
                <img src="${data.sprites.front_default}"/>
                <h3 id="current-pokemon-id" class="bold-pokemon-name">ID: ${data.id}</h3>
            `;
            pokemonImage1.innerHTML = `
                <h3 id="previous-pokemon-title" class="bold-pokemon-name">${capitalize(prevData.name)}</h3>
                <img src="${pokemonSprite1}"/>
                <h4 id="previous-pokemon-id" class="bold-pokemon-name">ID: ${prevData.id}</h4>
            `;
            pokemonImage2.innerHTML = `
                <h3 id="next-pokemon-title" class="bold-pokemon-name">${capitalize(nextData.name)}</h3>
                <img src="${pokemonSprite2}"/>
                <h4 id="next-pokemon-id" class="bold-pokemon-name">ID: ${nextData.id}</h4>
            `;
        }, 1000);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
                <h1>${capitalizePokemonName}</h1>
            `;
            pokemonImage.innerHTML = `
                <img src="${data.sprites.front_default}"/>
                <h3 id="current-pokemon-id">ID: ${data.id}</h3>
            `;
            pokemonImage1.innerHTML = `
                <h3 id="previous-pokemon-title">${capitalize(prevData.name)}</h3>
                <img src="${pokemonSprite1}"/>
                <h4 id="previous-pokemon-id">ID: ${prevData.id}</h4>
            `;
            pokemonImage2.innerHTML = `
                <h3 id="next-pokemon-title">${capitalize(nextData.name)}</h3>
                <img src="${pokemonSprite2}"/>
                <h4 id="next-pokemon-id">ID: ${nextData.id}</h4>
            `;

        }, 2000);
    
    }
    catch (error) {
        //console.error(`${inputValue} is not a Pokemon`);
        //console.error(`${error} is not a Pokemon`);
    } 
    
    //console.log("search button clicked");
    clearInputBar();
    // clearPokemonNameTitle();
});

function clearInputBar(){
    //console.log("cleared input bar");
    document.getElementById("input-search-bar").value = "";
};

function clearPokemonNameTitle(){
    pokemonNameTitle.innerHTML = `
        <h1>Pokemon Pokedex</h1>
    `;
};

// CAPITALIZE FIRST LETTER FUNCTION
function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// API FETCH FUNCTION REQUEST
// VERSION 1 to FETCH AN API
// fetch("https://pokeapi.co/")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.content);
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });

