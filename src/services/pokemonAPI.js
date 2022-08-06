import { formatPokemonDetails, formatPokemonInfo } from "../util/formatData";

const POKEMON_DETAILS_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";
const GENERATION_ENDPOINT = "https://pokeapi.co/api/v2/generation/";

async function getPokemonDetails(name) {
  return fetch(POKEMON_DETAILS_ENDPOINT + name)
    .then((results) => results.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Error getting pokemon details.", err);
      return {};
    //   throw new Error(err);
    });
}

async function getPokemonInfo(pokemonURL) {
  return fetch(pokemonURL)
    .then((results) => results.json())
    .then((data) => data)
    .catch((err) => {
      console.log("No Pokemon info available for this pokemon.", err);
      return {};
    //   throw new Error(err);
    });
}

async function getPokemonInfoAndDetails(name, url) {
  const info = formatPokemonInfo(await getPokemonInfo(url));
  const details = formatPokemonDetails(await getPokemonDetails(name));
  return Object.assign(info, details);
}

async function getPokemonByGeneration(generation) {
  return fetch(GENERATION_ENDPOINT + generation.toString())
    .then((results) => results.json())
    .then((data) => data.pokemon_species);
}

async function getPokemonDetailsFromList(pokemonList) {
  let data = {};
  for (let i = 0; i < pokemonList.length; i += 1) {
    const allInfo = await getPokemonInfoAndDetails(
      pokemonList[i].name,
      pokemonList[i].url
    );
    data[pokemonList[i].name] = allInfo;
  }
  return data;
}

export {
  getPokemonDetails,
  getPokemonByGeneration,
  getPokemonDetailsFromList,
  getPokemonInfoAndDetails,
};
