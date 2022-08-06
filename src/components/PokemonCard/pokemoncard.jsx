import React from "react";
import { Badge, Col, Row } from "react-bootstrap";

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-info-parent mt-2">
      <span className="fw-bold text-light fs-4 mx-auto mb-2">
        {pokemon.name.toUpperCase()}{" "}
        <span className="text-muted">( Generation {pokemon.generation} )</span>
      </span>
      <Badge bg="light" className="fw-bold text-dark text-center mb-2">
        INFO
      </Badge>
      <span className="fw-bold text-muted mb-1">
        Height: <span className="text-light">{pokemon.height} decimetres</span>
      </span>
      <span className="fw-bold text-muted mb-1">
        Weight: <span className="text-light">{pokemon.weight} hectograms</span>
      </span>
      <span className="fw-bold text-muted mb-1">
        Species: <span className="text-light">{pokemon.species_name}</span>
      </span>
      <span className="fw-bold text-muted mb-1">
        Habitat: <span className="text-light">{pokemon.habitat}</span>
      </span>
      <span className="fw-bold text-muted mb-1">
        Color: <span className="text-light">{pokemon.color}</span>
      </span>
      <span className="fw-bold text-muted mb-1">
        Forms: <span className="text-light">{pokemon.forms.join(", ")}</span>
      </span>
      <br className="mb-4" />
      <Badge bg="light" className="fw-bold text-dark text-center mb-2">
        STATS
      </Badge>
      <Row className="gy-2">
        <Col className="col-6">
          <span className="text-success fw-bold fs-3">
            HP:{" "}
            <span className="text-light">{pokemon.stats.hp.base_stat}</span>
          </span>
        </Col>
        <Col className="col-6">
          <span className="text-info fw-bold fs-3">
            SPEED:{" "}
            <span className="text-light">
              {pokemon.stats.speed.base_stat}
            </span>
          </span>
        </Col>
        <Col className="col-6">
          <span className="text-primary fw-bold fs-3">
            DEF:{" "}
            <span className="text-light">
              {pokemon.stats.defense.base_stat}
            </span>
          </span>
        </Col>
        <Col className="col-6">
          <span className="text-danger fw-bold fs-3">
            ATK:{" "}
            <span className="text-light">
              {pokemon.stats.attack.base_stat}
            </span>
          </span>
        </Col>
        <Col className="col-6">
          <span className="text-warning fw-bold fs-3">
            SP. ATK:{" "}
            <span className="text-light">
              {pokemon.stats["special-attack"].base_stat}
            </span>
          </span>
        </Col>
        <Col className="col-6">
          <span className="text-warning fw-bold fs-3">
            SP. DEF:{" "}
            <span className="text-light">
              {pokemon.stats["special-defense"].base_stat}
            </span>
          </span>
        </Col>
      </Row>
      <div className="d-flex align-items-center pt-4 pb-3">
        <div className="mx-auto">
          {pokemon.types.map((_type) => (
            <Badge key={_type} className={_type + " mx-1"}>
              {_type}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
