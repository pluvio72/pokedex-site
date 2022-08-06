import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Col,
  Container,
  FormControl,
  FormSelect,
  Row,
} from "react-bootstrap";
import Layout from "../../components/Layout/layout";
import { Pokemon } from "../../contexts/pokemon";
import Loading from "../../components/Loading";
import {
  getPokemon,
  getPokemonByGeneration,
  getPokemonDetailsFromList,
} from "../../services/pokemonAPI";
import { formatName } from "../../util/formatData";
import "./pokedex.scss";

function Pokedex() {
  const { addMultiplePokemonToList, getAllPokemon } = useContext(Pokemon);

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  // cache first 20 pokemon for index page
  useEffect(() => {
    if (Object.keys(getAllPokemon()).length === 0) {
      getPokemonByGeneration(1).then((_pokemonList) => {
        if (_pokemonList) {
          getPokemonDetailsFromList(_pokemonList).then((data) => {
            addMultiplePokemonToList(data);
            setPokemon(data);
          });
        }
      });
    } else setPokemon(getAllPokemon());
  }, []);

  const onSelectGeneration = (event) => {
    const newGenerationValue = event.target.value;

    getPokemonByGeneration(newGenerationValue).then((data) => {
        const allFetchedPokemon = getAllPokemon();
        const allFetchedPokemonNames = Object.keys(allFetchedPokemon);
        const newPokemonToFetch = [];

        for(let i = 0; i < data.length; i += 1){
            if(!(allFetchedPokemonNames.includes(data[i].name)))
                newPokemonToFetch.push(data[i]);
        }
        console.log("New pokemon to fetch:", newPokemonToFetch);

        // if new pokemon to fetch get info and details
        // else retrieve from cache
        if(newPokemonToFetch.length > 0){
            getPokemonDetailsFromList(data).then(_pokemonList => {
                addMultiplePokemonToList(_pokemonList);
                setPokemon(_pokemonList);
            });
        } else {
            const newPokemon = [];
            const selectedGenerationText = event.target[event.target.selectedIndex].text.toLowerCase();
            for(let i = 0; i < allFetchedPokemonNames.length; i += 1){
                if(allFetchedPokemon[allFetchedPokemonNames[i]].generation === selectedGenerationText)
                    newPokemon.push(allFetchedPokemon[allFetchedPokemonNames[i]]);
            }
            setPokemon(newPokemon);
        }
    });
  };

  return (
    <Layout>
      <Container className="py-3">
          <div>
            <div className="d-flex mb-3">
              <div className="flex-grow-1 me-2">
                <FormControl
                  type="text"
                  placeholder="Search by pokemon name..."
                  />
              </div>
              <div className="flex-shrink-1">
                <FormSelect onChange={onSelectGeneration}>
                  <option>Select Generation</option>
                  <option value="1">I</option>
                  <option value="2">II</option>
                  <option value="3">III</option>
                  <option value="4">IV</option>
                  <option value="5">V</option>
                  <option value="6">VI</option>
                  <option value="7">VII</option>
                  <option value="8">VIII</option>
                </FormSelect>
              </div>
            </div>
            {Object.keys(pokemon).length > 0 ? (
                <Row className="gx-2 gy-2">
                    {Object.keys(pokemon).map((_name) => (
                        <Col className="col-3">
                        <div className="pokemon-card py-2 px-3">
                            <span className="lead">{formatName(_name)}</span>
                            <div className="ms-auto">
                            {pokemon[_name].types.map((_type) => (
                                <Badge className={`${_type} ms-1`}>{_type}</Badge>
                            ))}
                            </div>
                        </div>
                        </Col>
                    ))}
                </Row>
            ) : (
            <Loading />
            )}
          </div>
      </Container>
    </Layout>
  );
}

export default Pokedex;
