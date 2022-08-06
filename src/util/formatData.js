function formatPokemonDetails(_pokemonInfo) {
    return {
        base_experience: _pokemonInfo.base_experience,
        height: _pokemonInfo.height,
        id: _pokemonInfo.id,
        order: _pokemonInfo.order,
        species_name: _pokemonInfo.species.name,
        weight: _pokemonInfo.weight,
        generations: _pokemonInfo.game_indices.map((e) => e.version.name),
        forms: _pokemonInfo.forms.map((e) => e.name),
        stats: Object.assign(
          {},
          ..._pokemonInfo.stats.map((e) => ({
            [e.stat.name]: { base_state: e.base_stat, effort: e.effort },
          }))
        ),
        types: _pokemonInfo.types.map(e => e.type.name)
    };
}

function formatPokemonInfo(_pokemonInfo) {
    const generation = _pokemonInfo.generation.name;
    return {
        base_happiness: _pokemonInfo.base_happiness,
        capture_rate: _pokemonInfo.capture_rate,
        color: _pokemonInfo.color.name,
        generation: generation.split('-')[1].toUpperCase(),
        habitat: _pokemonInfo.habitat.name,
        name: _pokemonInfo.name
    }
}

function formatName(_name){
    return _name[0].toUpperCase() + _name.slice(1);
}

export { formatPokemonDetails, formatPokemonInfo, formatName };