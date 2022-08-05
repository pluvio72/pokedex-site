const ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

export async function getAllPokemon(){
    return fetch(ENDPOINT+"?offset=20&limit=20")
        .then(results => results.json())
        .then(data => data);
}

export async function getPokemon(id){
    return fetch(ENDPOINT+id)
        .then(results => results.json())
        .then(data => data);
}