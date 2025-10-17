
// DOM ELEMENTS
const searchButton = document.getElementById("search-button");
const inputSearchBar = document.getElementById("input-search-bar");
const pokemonNameTitle = document.getElementById("pokemon-name");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonImage1 = document.getElementById("pokemon-image-1");
const pokemonImage2 = document.getElementById("pokemon-image-2");
const pokemonImgElement = document.getElementById("pokemon-image-element");

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
        
        const data = await response.json();
        const capitalizePokemonName = capitalize(data.name);
        console.log(`Searching for ${capitalizePokemonName}...`);

        // POKEMON ID VARIABLE
        const pokemonID = data.id;

        // I THINK BOTH STRING AND NUMBER WORKS ???
        const prevPokemonID = String(pokemonID - 1);
        const nextPokemonID = pokemonID + 1;
        
        // PREVIOUS 
        const getPrevPokemonID = await fetch(`https://pokeapi.co/api/v2/pokemon/${prevPokemonID}`);
        const prevData = await getPrevPokemonID.json();
        console.log(`getPrevPokemonID: ${prevData.name}`);

        // GET PREV POKEMON SPRITES
        pokemonSprite1 = prevData.sprites.front_default;
        
        // NEXT
        const getNextPokemonID = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextPokemonID}`);
        const nextData = await getNextPokemonID.json();
        console.log(`getNextPokemonID: ${nextData.name}`);

        // GET NEXT POKEMON SPRITES
        const pokemonSprite2 = nextData.sprites.front_default;
 
        // LOADING POKEMON NAME FEATURE
        pokemonNameTitle.innerHTML = `
                <h1>Searching</h1>
            `;
        pokemonImage.innerHTML = `
            <img src="loading.png"/>
        `
        pokemonImage1.innerHTML = `
            <img src="loading.png"/>
        `
        pokemonImage2.innerHTML = `
            <img src="loading.png"/>
        `

        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
                <h1>Searching .</h1>
            `;
        }, 250);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
                <h1>Searching ..</h1>
            `;
        }, 500);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
                <h1>Searching ...</h1>
            `;
        }, 750);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
                <h1 class="boldPokemonName">${capitalizePokemonName}</h1>
            `;
            pokemonImage.innerHTML = `
                <img src="${data.sprites.front_default}"/>
            `;
            pokemonImage1.innerHTML = `
                <img src="${pokemonSprite1}"/> 
            `;
            pokemonImage2.innerHTML = `
                <img src="${pokemonSprite2}"/>
            `;
        }, 1000);
        setTimeout(() => {
            pokemonNameTitle.innerHTML = `
                <h1>${capitalizePokemonName}</h1>
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

