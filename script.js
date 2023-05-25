let currentPokemon;

function loadPokemon() {
  loadPokedex();
}

async function loadPokedex() {
  let url = "https://pokeapi.co/api/v2/pokemon/charmander";
  let response = await fetch(url);
  currentPokemon = await response.json();
  renderPokemonInfo();
  changeStatTab(0);
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
  for (let i = 1; i < 10; i++) {
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
  if (type == "grass") {
    return "#4fa34d";
  } else if (type == "fire") {
    return "#fb6c6c";
  } else if (type == "water") {
    return "#617bff";
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
