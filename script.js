let currentPokemon;

// elements colors
const elementColours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function loadPokemon() {
  loadPokedex();
}

async function loadPokedex() {
  let url = "https://pokeapi.co/api/v2/pokemon/charmander";
  let response = await fetch(url);
  currentPokemon = await response.json();
  renderPokemonInfo();
  changeStatTab(0);
  loadPokelist();
}

function renderPokemonInfo() {
  document.getElementById("pokeName").innerHTML = capitalize(
    currentPokemon["name"]
  );
  document.getElementById("poke-element").innerHTML =
    currentPokemon["types"][0]["type"]["name"];
  document.getElementById("poke-index").innerHTML =
    "#" +
    currentPokemon["game_indices"][3]["game_index"].toString().padStart(3, "0");
  document.getElementById("pokeImg").src =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function changeStatTab(index) {
  let content = "Page not found";
  console.log(currentPokemon["weight"]);
  if (index == 0) {
    content = `
    <ul class="stat-list">
      <li class="stat-element">Weight: ${currentPokemon["weight"]} kg</li>
    </ul>
    `;
  }
  if (index == 1) {
    content = `
    <ul class="stat-list">
      <li class="stat-element">HP: ${currentPokemon["stats"][0]["base_stat"]}</li>
      <li class="stat-element">Attack: ${currentPokemon["stats"][1]["base_stat"]}</li>
      
    </ul>
    `;
  }
  if (index == 2) {
    content = `
    <ul class="stat-list">
      <li class="stat-element">Evolution 1: Undef</li> 
    </ul>
    `;
  }
  if (index == 3) {
    content = `
    <ul class="stat-list">
      <li class="stat-element">Moves: Fireball</li>
    </ul>
    `;
  }
  document.getElementById("stats-content").innerHTML = content;
}

// POKEDEX

async function loadPokelist() {
  let url = "https://pokeapi.co/api/v2/pokemon";
  let response = await fetch(url);
  currentPokemon = await response.json();
  renderPokelist();
}

async function renderPokelist() {
  for (let i = 1; i < 20; i++) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + i;
    let response = await fetch(url);
    pokeData = await response.json();

    let pokeName = pokeData["name"];
    let mainElement = pokeData["types"][0]["type"]["name"];
    let elements = "";
    for (let j = 0; j < pokeData["types"].length; j++) {
      elements += `
      <div id="poke-element" class="mb-8">
      ${pokeData["types"][j]["type"]["name"]}
      </div>
      `;
    }

    document.getElementById("pd-poke-list").innerHTML += `
    <div class="pd-poke-item" style="background-color: ${changeBGColor(
      mainElement
    )}" onclick="openOverlay()">
        <div class="pd-poke-info">
          <div id="pd-poke-name" class="mb-8">${capitalize(pokeName)}</div>
          <div id="poke-elements">
            ${elements}
          </div>
        </div>
        <div id="pd-poke-img">
          <img src="${
            pokeData["sprites"]["other"]["official-artwork"]["front_default"]
          }" alt="" />
        </div>
      </div>
  `;
  }
}

function changeBGColor(type) {
  if (Object.keys(elementColours).includes(type)) {
    return elementColours[type];
  } else {
    return "#787878";
  }
}

function openOverlay() {
  document.getElementById("overlay-container").classList.remove("d-none");
}

function closeOverlay() {
  document.getElementById("overlay-container").classList.add("d-none");
}

function switchHeart() {
  document.getElementById("poke-like").src = "./icon/heart-full.png";
}
