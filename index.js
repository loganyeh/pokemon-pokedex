
// DOM ELEMENTS
const searchButton = document.getElementById("search-button");
const inputSearchBar = document.getElementById("input-search-bar");

// VARIABLES
const pokemonAPI = "https://pokeapi.co/";

// EVENT LISTENERS
inputSearchBar.addEventListener("click", () => {
    console.log("input search bar clicked");
});

searchButton.addEventListener("click", async () => {
    
    // GRABS VALUE FROM THE INPUT BAR
    try { 
        const inputValue = document.getElementById("input-search-bar").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
        const capitalizePokemonName = capitalize(inputValue);

        if(!response.ok){
            console.error(`Could not fetch resource. ${inputValue} is not a Pokemon.`);
            clearInputBar();
        }


        // RESPONSE IS CONVERTED TO A JSON FILE FOR READABLE FOR THE IDE
        const data = await response.json();
        console.log(`Searching for ${capitalizePokemonName}...`);
        const pokemonName = data.name;

    }
    catch (error) {
        console.error(`${inputValue} is not a Pokemon`);
    } 

    //console.log("search button clicked");

    clearInputBar();

});

function clearInputBar(){
    //console.log("cleared input bar");
    document.getElementById("input-search-bar").value = "";
};

// CAPITALIZE FIRST LETTER FUNCTION
function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// WORKING capitalize() function ✅
// let word = "bijan"; 
// let capitalWord = capitalize(word);
// console.log(capitalWord);

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

