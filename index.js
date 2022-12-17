// require('dotenv').config()

// console.log(process.env.API_KEY)

var pokeInput;
var spritesEle = document.getElementById('sprites');
var entry = document.getElementById("entry");

function retrieveData() {
    pokeInput = document.getElementById("PokeName").value.toLowerCase()
    // console.log(pokeInput)
    fetchPokeData(pokeInput)
}

function fetchPokeData(pokeInput) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInput}`)
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
}

function loadImage(data) {
    spritesEle.innerHTML = `<spam id="Reg">Regular</span> <span id="Shiny">Shiny</span>
    <br>
    <img src=${data.sprites.front_default}> <img src=${data.sprites.front_shiny}>
    <br>
    <img src=${data.sprites.back_default}> <img src=${data.sprites.back_shiny}>`
}