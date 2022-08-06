import React from 'react';

const Pokemon = React.createContext({
    getAllPokemon: () => {},
    getPokemonByName: (_name) => {},
    addPokemonToList: (_name, _data) => {},
    // addMultiplePokemonToList: (_object) => {}
});

const PokemonProvider = ({ children }) => {
    const [pokemon, setPokemon] = React.useState(JSON.parse(localStorage.getItem('pokemon') || '{}'));
    console.log("Saved Pokemon Count:", Object.keys(pokemon).length);

    function getPokemonByName(_name) {
        if(pokemon[_name]) return pokemon[_name]
        else return null;
    }

    function addPokemonToList(_name, _data) {
        setPokemon(prevState => {
            const newState = {
                ...prevState,
                [_name]: _data
            };
            // console.log("New State Length:", Object.keys(newState).length);
            storePokemon(newState);
            return newState;
        });
    }

    // function addMultiplePokemonToList(_object) {
    //     // diff both array so we arent duplicating items
    //     const keysOld = Object.keys(pokemon);
    //     const keysNew = Object.keys(_object);
    //     if(!(keysNew.every(e => keysOld.includes(e))) || keysOld.length === 0) {
    //         console.log("Adding multiple new pokemon");
    //         const newPokemon = Object.assign(pokemon, _object);
    //         setPokemon(newPokemon);
    //         storePokemon(newPokemon);
    //     }
    // }

    function getAllPokemon(){
        return pokemon;
    }

    function storePokemon(_data){
        localStorage.setItem('pokemon', JSON.stringify(_data));
    }

    return (
        <Pokemon.Provider value={{
            addPokemonToList,
            getAllPokemon,
            getPokemonByName
        }}>
            {children}
        </Pokemon.Provider>
    )
}

export {
    PokemonProvider,
    Pokemon
};