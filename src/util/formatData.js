function formatPokemonDetails(_pokemonInfo) {
    if(Object.keys(_pokemonInfo).length > 0) {
        return {
            base_experience: _pokemonInfo.base_experience,
            height: _pokemonInfo.height,
            id: _pokemonInfo.id,
            species_name: _pokemonInfo.hasOwnProperty('species') ? _pokemonInfo.species.name : 'unknown',
            weight: _pokemonInfo.weight,
            generations: _pokemonInfo.hasOwnProperty('game_indices') ? _pokemonInfo.game_indices.map((e) => e.version.name) : 'none',
            forms: _pokemonInfo.hasOwnProperty('forms') ? _pokemonInfo.forms.map((e) => e.name) : 'NA',
            stats: Object.assign(
              {},
              ..._pokemonInfo.stats.map((e) => ({
                [e.stat.name]: { base_state: e.base_stat, effort: e.effort },
              }))
            ),
            types: _pokemonInfo.types.map(e => e.type.name)
        };
    } return {
        base_experience: 'unknown???',
        height: 'unknown???',
        id: null,
        species_name: 'unknown???',
        weight: 'unknown???',
        generations: 'NA',
        forms: ['unknown???'],
        stats: {},
        types: ['unknown???']
    };
}

function formatPokemonInfo(_pokemonInfo) {
    if(Object.keys(_pokemonInfo).length > 0) {
        const generation = _pokemonInfo.generation.name;
        return {
            base_happiness: _pokemonInfo.base_happiness,
            capture_rate: _pokemonInfo.capture_rate,
            color: _pokemonInfo.color.name,
            generation: generation.split('-')[1].toUpperCase(),
            habitat: _pokemonInfo.habitat ? _pokemonInfo.habitat.name : 'unknown',
            name: _pokemonInfo.name
        }
    } return {};
}

function formatName(_name){
    return _name[0].toUpperCase() + _name.slice(1);
}

export { formatPokemonDetails, formatPokemonInfo, formatName };