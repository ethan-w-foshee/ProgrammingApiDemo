import { API_KEY } from "./api.js";
console.log(API_KEY)

var pokeInput = document.getElementById("PokeName");
var spritesEle = document.getElementById("sprites");
var entryEle = document.getElementById("wordEntry");
var evoChains = document.getElementById("evoChain");

pokeInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        retrieveData()
    }
})

function retrieveData() {
    pokeInput = document.getElementById("PokeName").value.toLowerCase()
    // console.log(pokeInput)
    fetchPokeData(pokeInput)
}

function fetchPokeData(pokeInput) {
    fetch(`${API_KEY}pokemon/${pokeInput}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Invalid Pokemon: ${pokeInput}`);
            }
            else {
                return res.json();
            }
        })
        .then(data => {
            console.log(data)
            loadImage(data)
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        })

    fetch(`${API_KEY}pokemon-species/${pokeInput}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Invalid Pokemon: ${pokeInput}`);
            }
            else {
                return res.json();
            }
        })
        .then(data => {
            console.log(data)
            loadText(data)
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        })
}

function loadImage(data) {
    spritesEle.innerHTML = `<span id="Reg" class="left-img">Regular</span> <span id="Shiny" class="right-img">Shiny</span>
    <br>
    <img src=${data.sprites.front_default} class="left-img"> <img src=${data.sprites.front_shiny} class="right-img">
    <br>
    <img src=${data.sprites.back_default} class="left-img"> <img src=${data.sprites.back_shiny} class="right-img">`
}

function loadText(data) {
    entryEle.innerHTML = ""
    let pokeEntries = data.flavor_text_entries.filter(lang => lang.language.name == "en");
    console.log(pokeEntries)
    pokeEntries.map((results) => {
        results.flavor_text = results.flavor_text.replaceAll("" , " ")
        entryEle.innerHTML += `<span>${results.flavor_text}</span> <span class="gameVersion">${results.version.name}</span><br><br>`
    })
}

function evoChain(data) {

}