let currentPokemon;

function loadPokemon() {
  loadPokedex();
  changeStatTab(0);
}

async function loadPokedex() {
  let url = "https://pokeapi.co/api/v2/pokemon/charmander";
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log(currentPokemon);
  renderPokemonInfo();
}

function renderPokemonInfo() {
  document.getElementById("pokeName").innerHTML = capitalize(
    currentPokemon["name"]
  );
  console.log(currentPokemon["sprites"]["other"]["official_artwork"]);
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
    <ul class="stat-list">
      <li class="stat-element">Species: Seed</li>
      <li class="stat-element">Height: 2'3.6" (0.70 cm)</li>
      <li class="stat-element">Weight: 15.2 lbs (6.9 kg)</li>
      <li class="stat-element">Abilities: Overgrow, Chlorophyl</li>
      <h2>Breeding</h2>
      <li class="stat-element">Gender: male 87.5% female 12.5%</li>
      <li class="stat-element">Egg Groups: Monster</li>
      <li class="stat-element">Egg Cycle: Grass</li>
    </ul>
    `;
  }
  if (index == 1) {
    content = `
    <ul class="stat-list">
    <li class="stat-element">HP: 45</li>
      <li class="stat-element">Strength: 60</li>
      <li class="stat-element">Defense: 48</li>
      <li class="stat-element">Sp. Attack: 65</li>
      <li class="stat-element">Sp. Speed: 65</li>
      <li class="stat-element">Speed: 45</li>
      <li class="stat-element">Total: 317</li>
      <h2>Type defenses</h2>
      <li class="stat-element">the effectiveness of each type on charmander</li>
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
