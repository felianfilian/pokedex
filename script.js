function loadPokemon() {
  loadPokedex();
}

async function loadPokedex() {
  let url = "https://pokeapi.co/api/v2/pokemon/charmander";
  let response = await fetch(url);
  let responseJson = response.json();
  console.log(responseJson);
}
