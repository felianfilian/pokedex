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
      <li class="stat-element">Element: Fire</li>
      <li class="stat-element">Species: Dragon</li>
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
