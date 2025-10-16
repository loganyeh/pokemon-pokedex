
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
    // console.log(inputValue);
    try { 
        const inputValue = document.getElementById("input-search-bar").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
        const data = await response.json();

        console.log(data);
    }
    catch (error) {
        console.error(`Pokemon not found`);
    } 

    console.log("search button clicked");
    // console.log(inputSearchBar.value);
    // console.log(document.getElementById("input-search-bar").value);
    // This is returning the value of whatever is in the search bar at the time
    // BOTH WORK ^^

    clearInputBar();

});

function clearInputBar(){
    //console.log("cleared input bar");
    document.getElementById("input-search-bar").value = "";
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

