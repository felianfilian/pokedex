// loadPokeMon() - onload function
// loadPokeDex() - OLD function
// loadPokeAPI(index) - get pokemon data froom API

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
  loadPokedex(1, "grass");
  renderPokelist();
}

async function loadPokedex(index, mainElement) {
  currentPokemon = await loadPokeAPI(index);
  renderPokemonInfo(mainElement);
  changeStatTab(0);
}

async function loadPokeAPI(index) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + index;
  let response = await fetch(url);
  return response.json();
}

// Poke Card

function openOverlay() {
  document.getElementById("overlay-container").classList.remove("d-none");
}

function closeOverlay() {
  document.getElementById("overlay-container").classList.add("d-none");
}

// Heart Favi

let heart = 0;

function switchHeart() {
  if (heart == 1) {
    heart = 0;
    document.getElementById("poke-like").src = "./icon/heart.png";
  } else {
    heart = 1;
    document.getElementById("poke-like").src = "./icon/heart-full.png";
  }
}

function renderPokemonInfo(mainElement) {
  document.getElementById("pokedex").style.backgroundColor =
    changeBGColor(mainElement);
  document.getElementById("pokeName").innerHTML = capitalize(
    currentPokemon["name"]
  );
  document.getElementById("poke-elements").innerHTML =
    renderElements(currentPokemon);
  //currentPokemon["types"][0]["type"]["name"];
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

  if (index == 0) {
    content = `
    <table class="stat-list">
      <tr>
        <td class="pr-16">Gewicht</td>
        <td>${currentPokemon["weight"] / 10} kg</td>
      </tr>
      <tr>
        <td class="pr-16">Größe</td>
        <td>${currentPokemon["height"] / 10} m</td>
      </tr>
    </table>
    `;
  }
  if (index == 1) {
    content = `
    <table class="stat-list">
      <tr class="stat-element">
        <td class="pr-16">HP:</td>
        <td class="stat-value">
          <div>${currentPokemon["stats"][0]["base_stat"]}</div>
          <div class="stat-bar" style="width: 50px;"></div>
        </td>
      </tr>
      <tr>
        <td class="pr-16">Attacke:</td>
        <td>${currentPokemon["stats"][1]["base_stat"]}</td>
      </tr>
      <tr>
        <td class="pr-16">Verteidigung:</td>
        <td>${currentPokemon["stats"][2]["base_stat"]}</td>
      </tr>
      <tr>
        <td class="pr-16">Spezial Attacke:</td>
        <td>${currentPokemon["stats"][3]["base_stat"]}</td>
      </tr>
      <tr>
        <td class="pr-16">Spezial Verteidigung:</td>
        <td>${currentPokemon["stats"][4]["base_stat"]}</td>
      </tr>
      <tr>
        <td class="pr-16">Tempo:</td>
        <td>${currentPokemon["stats"][1]["base_stat"]}</td>
      </tr>
    </table>
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

async function renderPokelist() {
  for (let i = 1; i < 20; i++) {
    pokeData = await loadPokeAPI(i);

    let pokeName = pokeData["name"];
    let mainElement = pokeData["types"][0]["type"]["name"];
    let elements = renderElements(pokeData);

    showPokeListCard(i, mainElement, pokeName, elements, pokeData);
  }
}

function renderElements(pokeData) {
  let elements = "";
  for (let j = 0; j < pokeData["types"].length; j++) {
    elements += `
    <div id="poke-element" class="mb-8">
    ${pokeData["types"][j]["type"]["name"]}
    </div>
    `;
  }
  return elements;
}

function showPokeListCard(index, mainElement, pokeName, elements, pokeData) {
  document.getElementById("pd-poke-list").innerHTML += `
    <div class="pd-poke-item" style="background-color: ${changeBGColor(
      mainElement
    )}" onclick="loadPokedex(${index}, '${mainElement}'); openOverlay();">
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

function changeBGColor(type) {
  if (Object.keys(elementColours).includes(type)) {
    return elementColours[type];
  } else {
    return "#787878";
  }
}
