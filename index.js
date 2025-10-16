
// DOM ELEMENTS
const searchButton = document.getElementById("search-button");
const inputSearchBar = document.getElementById("input-search-bar");
const pokemonNameTitle = document.getElementById("pokemon-name");
const pokemonImage = document.getElementById("pokemon-image");

// VARIABLES
const pokemonAPI = "https://pokeapi.co/";

// EVENT LISTENERS
inputSearchBar.addEventListener("click", () => {
    console.log("input search bar clicked");
});

searchButton.addEventListener("click", async () => {
    
    try { 
        const inputValue = document.getElementById("input-search-bar").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
        const capitalizePokemonName = capitalize(inputValue);

        if(!response.ok){
            console.error(`Could not fetch resource. ${inputValue} is not a Pokemon.`);
            pokemonNameTitle.innerHTML = `
                <h1 class="boldPokemonName">ERROR</h1>
            `;
            setTimeout(() => {
                pokemonNameTitle.innerHTML = `
                    <h1>ERROR</h1>
                `;
            }, 3000);
            clearInputBar();
        };

        if(inputValue == ""){
            pokemonNameTitle.innerHTML = `
                <h1>Enter a Pokemon</h1>
            `;            
            // THIS RETURN KEYWORD EXITS FUNCTION 
            // SO THE CODE FOLLOWING/AFTER WILL NOT RUN
            return;
        };

        // RESPONSE IS CONVERTED TO A JSON FILE FOR READABLE FOR THE IDE
        const data = await response.json();
        console.log(`Searching for ${capitalizePokemonName}...`);
        const pokemonName = data.name;
        
        // LOADING POKEMON NAME FEATURE
        pokemonNameTitle.innerHTML = `
            <h1>Searching</h1>
        `;
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
            <h1>Searching .</h1>
        `;
        }, 1000);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
            <h1>Searching ..</h1>
        `;
        }, 1500);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
            <h1>Searching ...</h1>
        `;
        }, 2000);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
            <h1 class="boldPokemonName">${capitalizePokemonName}</h1>
        `;
        }, 2500);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
            <h1>${capitalizePokemonName}</h1>
        `;
        }, 5500);

    }
    catch (error) {
        console.error(`${inputValue} is not a Pokemon`);
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

