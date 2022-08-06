import { formatPokemonDetails, formatPokemonInfo } from "../util/formatData";

const POKEMON_DETAILS_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";
const GENERATION_ENDPOINT = "https://pokeapi.co/api/v2/generation/";

async function getPokemon(limit = 20, offset = 0) {
  const URL = POKEMON_DETAILS_ENDPOINT + `?offset=${offset}&limit=${limit}`;
  return fetch(URL)
    .then((results) => results.json())
    .then((data) => data);
}

async function getPokemonDetails(name) {
  return fetch(POKEMON_DETAILS_ENDPOINT + name)
    .then((results) => results.json())
    .then((data) => data);
}

async function getPokemonInfo(pokemonURL) {
    return fetch(pokemonURL)
        .then((results) => results.json())
        .then((data) => data)
        .catch(err => {
            console.log("Error getting pokemon by url.", err);
            throw new Error(err);
        })
}

async function getPokemonByGeneration(generation) {
  return fetch(GENERATION_ENDPOINT + generation.toString())
    .then((results) => results.json())
    .then((data) => data.pokemon_species);
}

async function getPokemonDetailsFromList(pokemonList) {
  let data = {};
  for (let i = 0; i < pokemonList.length; i += 1) {
    const pokemonInfo = formatPokemonInfo(await getPokemonInfo(pokemonList[i].url));
    let pokemonDetails = {};

    try {
        pokemonDetails = formatPokemonDetails(await getPokemonDetails(pokemonList[i].name));
    }
    catch(err) {
        console.log(`${pokemonList[i].name} has no details page.`)
    }

    const allInfo = Object.assign(pokemonInfo, pokemonDetails);
    data[pokemonList[i].name] = allInfo;
  }
  return data;
}

export { getPokemon, getPokemonDetails, getPokemonByGeneration, getPokemonDetailsFromList };
