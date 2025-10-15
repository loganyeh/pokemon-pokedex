
// DOM ELEMENTS
const inputSearchBar = document.getElementById("input-search-bar")
const searchButton = document.getElementById("search-button");

// VARIABLES
const pokemonAPI = "https://pokeapi.co/";

// EVENT LISTENERS
inputSearchBar.addEventListener("click", () => {
    console.log("input search bar clicked");
});

searchButton.addEventListener("click", () => {
    console.log("search button clicked");
});

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

async function getPokemon(){
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/squirtle");
        const data = await response.json();
        console.log(data.name);
    }     
    catch (error) {
        console.error("Error:", error);
    }    
}    

getPokemon();
