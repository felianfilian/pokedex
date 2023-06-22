// loadPokeMon() - onload function
// loadPokeAPI(index) - get pokemon data froom API

let currentPokemon;
let germanStats = [
  "HP",
  "Attacke",
  "Verteidigung",
  "Spezial Attacke",
  "Spezial-Verteidigung",
  "Tempo",
];
let pokeLikes = [];
let pokeListCount = 100;

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
  renderPokelist(pokeListCount);
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

function loadOnScroll() {
  renderPokelist(200);
}

// Poke Card

function openOverlay() {
  document.getElementById("overlay-container").classList.remove("d-none");
}

function closeOverlay() {
  document.getElementById("overlay-container").classList.add("d-none");
}

// Heart Favi

function switchHeart() {
  let index = currentPokemon["game_indices"][3]["game_index"];
  if (pokeLikes[index] == undefined || pokeLikes[index] == 1) {
    pokeLikes[index] = 0;
  } else {
    pokeLikes[index] = 1;
  }
  showHeart();
}

function showHeart() {
  let index = currentPokemon["game_indices"][3]["game_index"];
  if (pokeLikes[index] == undefined || pokeLikes[index] == 1) {
    document.getElementById("poke-like").src = "./icon/heart.png";
  } else {
    document.getElementById("poke-like").src = "./icon/heart-full.png";
  }
}

function renderPokemonInfo(mainElement) {
  showHeart();

  document.getElementById("pokedex").style.backgroundColor =
    changeBGColor(mainElement);
  document.querySelector(
    ".info-container"
  ).style.border = `2px solid ${changeBGColor(mainElement)}`;
  document.getElementById("pokeName").innerHTML = capitalize(
    currentPokemon["name"]
  );
  document.querySelector(
    ".poke-stats"
  ).style.borderBottom = `1px solid ${changeBGColor(mainElement)}`;
  document.getElementById("pokeName").innerHTML = capitalize(
    currentPokemon["name"]
  );
  document.getElementById("poke-elements").innerHTML =
    renderElements(currentPokemon);
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
    content = showStatTab01();
  }
  if (index == 1) {
    content = showStatTab02();
  }
  document.getElementById("stats-content").innerHTML = content;
}

function showStatTab01() {
  return `
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

function showStatTab02() {
  let content = `<table class="stat-list">`;
  for (let i = 0; i < currentPokemon["stats"].length; i++) {
    content += `
       <tr class="stat-element">
        <td class="pr-16">${
          germanStats[i]
          // capitalize(currentPokemon["stats"][i]["stat"]["name"])
        }:</td>
        <td class="stat-value">${currentPokemon["stats"][i]["base_stat"]}</td>
        <td class="stat-bar" style="width: ${
          (currentPokemon["stats"][i]["base_stat"] / 120) * 200
        }px;"></td>
      </tr>
      `;
  }
  content += "</table>";
  return content;
}

// POKEDEX

async function renderPokelist(count) {
  for (let i = 1; i < count; i++) {
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
