import { API_KEY } from "./api.js";

var pokeInput = document.getElementById("PokeName");
var spritesEle = document.getElementById("sprites");
var entryEle = document.getElementById("wordEntry");
var evoChains = document.getElementById("evoChain");
var bodyEle = document.getElementById("body")

pokeInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        retrieveData()
    }
})

function retrieveData() {
    pokeInput = document.getElementById("PokeName").value.toLowerCase()
    fetchPokeData(pokeInput)
}

function fetchPokeData(pokeInput) {
    fetch(`${API_KEY}pokemon/${pokeInput}`)
        .then((res) => {
            if (!res.ok) {
                window.alert(`Invalid Pokémon: ${pokeInput}`)
            }
            else {
                return res.json();
            }
        })
        .then(data => {
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
            backgroundColor(data)
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

function backgroundColor(data) {
    bodyEle.style.backgroundColor = data.color.name
}

function loadText(data) {
    entryEle.innerHTML = ""
    let pokeEntries = data.flavor_text_entries.filter(lang => lang.language.name == "en");
    pokeEntries.map((results) => {
        results.flavor_text = results.flavor_text.replaceAll("", " ")
        entryEle.innerHTML += `<span>${results.flavor_text}</span> <span class="gameVersion">${results.version.name}</span><br><br>`
    })
    evoChain(data)
}

function evoChain(data) {
    fetch(`${data.evolution_chain.url}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Invalid Pokemon Chain: ${pokeInput}`);
            }
            else {
                return res.json();
            }
        })
        .then(data => {
            // console.log(data)
            evoDisplay(data)
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        })
}

function evoDisplay(evoData) {
    evoChains.innerHTML = `<span id="evoChainWords">Evolutionary Chain:</span>`
    // console.log(`${API_KEY}pokemon/${evoData.species.name}`)
    fetch(`${API_KEY}pokemon/${evoData.chain.species.name}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Invalid Pokemon Chain: ${pokeInput}`);
            }
            else {
                return res.json();
            }
        })
        .then(data => {
            evoChains.innerHTML += `<img src=${data.sprites.front_default} id="stage1" class="stages"></img>`
        })
        .then(evoData.chain.evolves_to.map((results) => {
            fetch(`${API_KEY}pokemon/${results.species.name}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Invalid Pokemon Chain: ${pokeInput}`);
                    }
                    else {
                        return res.json();
                    }
                })
                .then(data => {
                    evoChains.innerHTML += `<img src=${data.sprites.front_default} id="stage2" class="stages"></img>`
                })
                .then(results.evolves_to.map((results2) => {
                    fetch(`${API_KEY}pokemon/${results2.species.name}`)
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`Invalid Pokemon Chain: ${pokeInput}`);
                            }
                            else {
                                return res.json();
                            }
                        })
                        .then(data => {
                            evoChains.innerHTML += `<img src=${data.sprites.front_default} id="stage3" class="stages"></img>`
                        })
                })
                )
        })
        )
}