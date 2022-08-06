import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../../components/Layout/layout';
import PokemonCard from '../../components/PokemonCard';
import SelectSearch from '../../components/SelectSearch';
import { Pokemon } from '../../contexts/pokemon';
import { getPokemonInfo, searchPokemon } from '../../services/pokemonAPI';
import { formatPokemonDetails, formatPokemonInfo } from '../../util/formatData';
import "./compare.scss";

function Compare(){
    const { getAllPokemon, addPokemonToList } = useContext(Pokemon);
    const [pokemon, setPokemon] = useState(getAllPokemon());

    const [pokemon1, setPokemon1] = useState(pokemon[Object.keys(pokemon)[0]]);
    const [pokemon2, setPokemon2] = useState(pokemon[Object.keys(pokemon)[1]]);

    // could do with more validation
    const onSelectNewPokemon1 = (newPokemon) => {
        if(pokemon[newPokemon]) setPokemon1(pokemon[newPokemon])
    };
    const onSelectNewPokemon2 = (newPokemon) => {
        if(pokemon[newPokemon]) setPokemon2(pokemon[newPokemon]);
    }

    const onInputChange = (newPokemon) => {
        searchPokemon(newPokemon).then(_newPokemonInfo => {
            const formattedDetailsData = formatPokemonDetails(_newPokemonInfo);
            if(_newPokemonInfo.species !== undefined) {
                getPokemonInfo(_newPokemonInfo.species.url).then((_pokemonInfo) => {
                    const formattedInfoData = formatPokemonInfo(_pokemonInfo);
                    console.log("formatted Info data:", formattedInfoData);
                    const all = Object.assign(formattedDetailsData, formattedInfoData);
                    setPokemon(prevState => {
                        const newState = {
                            ...prevState,
                            [newPokemon]: all
                        };
                        addPokemonToList(newPokemon, all);
                        return newState;
                    })
                })
            }
        })
    }

    return (
        <Layout>
            <Container fluid className="h-100">
                <Row className="h-100">
                    <Col className="col-5 d-flex">
                        <div className="w-100 search-parent">
                            <SelectSearch data={pokemon} onSelect={onSelectNewPokemon1} onInputChange={onInputChange}/>
                            <PokemonCard pokemon={pokemon1}/>
                        </div>
                    </Col>
                    <Col className="col-2 fw-bold fs-3 text-center vs">VS</Col>
                    <Col className="col-5 d-flex">
                        <div className="w-100 search-parent">
                            <SelectSearch data={pokemon} onSelect={onSelectNewPokemon2} onInputChange={onInputChange}/>
                            <PokemonCard pokemon={pokemon2}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
};

export default Compare;