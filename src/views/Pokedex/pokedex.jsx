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
  getPokemonByGeneration,
  getPokemonInfo,
  getPokemonInfoAndDetails,
  searchPokemon,
} from "../../services/pokemonAPI";
import { formatName, formatPokemonDetails, formatPokemonInfo } from "../../util/formatData";
import "./pokedex.scss";
import { getFavourites, savePokemonToFavourites } from "../../services/favourites";

function Pokedex() {
  const { addPokemonToList, getAllPokemon } = useContext(Pokemon);

  const [filter, setFilter] = useState('');
  const [pokemon, setPokemon] = useState({});

  const [favourites, setFavourites] = useState(getFavourites());

  // cache first 20 pokemon for index page
  useEffect(() => {
    if (Object.keys(getAllPokemon()).length === 0) {
      getPokemonByGeneration(1).then(async (_pokemonList) => {
        if (_pokemonList) {
            // fetch and set in list as soon as it is retrieved
            for(let i = 0; i < _pokemonList.length; i += 1){
                const current = await getPokemonInfoAndDetails(_pokemonList[i].name, _pokemonList[i].url);
                setPokemon(prevState => {
                    const newState = {
                        ...prevState,
                        [current.name]: current
                    };
                    addPokemonToList(current.name, current);
                    return newState
                });
            }
        }
      });
    } else setPokemon(getAllPokemon());
  }, []);

  const onChangeFilter = (event) => {
      const searchFilter = event.target.value.toLowerCase();
      // all data in lower case for case insensitive filtering
      setFilter(searchFilter);
      // also search API if pokemon hasn't been cached yet
      searchPokemon(searchFilter).then(data => {
          const formattedDetailsData = formatPokemonDetails(data);
          console.log("Formatted details data:", formattedDetailsData);
          if(data.species !== undefined) {
              getPokemonInfo(data.species.url).then((_pokemonInfo) => {
                  const formattedInfoData = formatPokemonInfo(_pokemonInfo);
                  console.log("formatted Info data:", formattedInfoData);
                  const all = Object.assign(formattedDetailsData, formattedInfoData);
                  setPokemon(prevState => {
                      const newState = {
                          ...prevState,
                          [searchFilter]: all
                      };
                      addPokemonToList(searchFilter, all);
                      return newState;
                  })
              })
          }
      })
  }

  const onSelectGeneration = (event) => {
    const newGenerationValue = event.target.value;
    
    setPokemon({});
    getPokemonByGeneration(newGenerationValue).then(async (data) => {
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
            for(let i = 0; i < newPokemonToFetch.length; i += 1) {
                const _pokemonData = await getPokemonInfoAndDetails(newPokemonToFetch[i].name, newPokemonToFetch[i].url)    
                setPokemon(prevState => {
                    const newState = {
                        ...prevState,
                        [_pokemonData.name]: _pokemonData
                    };
                    return newState;
                });
                addPokemonToList(_pokemonData.name, _pokemonData);
            }
        } else {
            const newPokemon = {};
            const selectedGenerationText = event.target[event.target.selectedIndex].text;

            for(let i = 0; i < allFetchedPokemonNames.length; i += 1){
                if(allFetchedPokemon[allFetchedPokemonNames[i]].generation === selectedGenerationText)
                    newPokemon[allFetchedPokemonNames[i]] = allFetchedPokemon[allFetchedPokemonNames[i]];
            }
            setPokemon(newPokemon);
        }
    });
  };

  const addFavourite = (name, data) => {
    savePokemonToFavourites(name, data);
    setFavourites(prevState => {
        return {
            ...prevState,
            [name]: data
        }
    })
  }

  return (
    <Layout>
      <Container className="py-3">
          <div>
            <div className="d-flex mb-3">
              <div className="flex-grow-1 me-2">
                <FormControl
                  type="text"
                  placeholder="Search by pokemon name..."
                  onChange={onChangeFilter}
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
                    {Object.keys(pokemon).filter(e => e.toLowerCase().indexOf(filter) > -1).map((_name) => (
                        <Col className="col-3" key={_name}>
                            <div className="pokemon-card py-2 px-3">
                                <div className="d-flex flex-row align-items-center">
                                    <span className="lead pokemon-card-name">{formatName(_name)}</span>
                                    <div className="ms-auto">
                                        {pokemon[_name].types.map((_type) => (
                                            <Badge key={_name+_type} className={`${_type} ms-1`}>{_type}</Badge>
                                        ))}
                                    </div>
                                </div>
                                {Object.keys(favourites).includes(_name) ?
                                    <span className="fw-light favourite-text remove">
                                        Remove Favourite
                                        <img className="favourite-icon" src="/images/cross.png" alt="remove favourite"/>
                                    </span>:
                                    <span className="fw-light favourite-text add" onClick={() => addFavourite(_name, pokemon[_name])}>
                                        Add Favourite
                                        <img className="favourite-icon" src="/images/tick.png" alt="add favourite"/>
                                    </span>
                                }
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
