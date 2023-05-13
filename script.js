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
    </ul>
    `;
  }
  if (index == 1) {
    content = `
    <ul class="stat-list">
      <li class="stat-element">Strength: 12</li>
      <li class="stat-element">health: 60</li>
    </ul>
    `;
  }
  document.getElementById("stats-content").innerHTML = content;
}
