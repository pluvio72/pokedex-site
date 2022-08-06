import React, { useEffect, useState } from "react";
import { getFavourites, removePokemonFromFavourites } from "../../services/favourites";
import Layout from "../../components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import "./favourites.scss";

function Favourites() {
  const [favourites, setFavourites] = useState({});

  useEffect(() => {
    setFavourites(getFavourites());
  }, []);

  const removeFavourite = (name) => {
      removePokemonFromFavourites(name);
      setFavourites(prevState => {
          const newFavourites = {...prevState};
          delete newFavourites[name];
          return newFavourites;
      })
  }

  return (
    <Layout>
      <Container className="p-3">
        <h3 className="fs-3 fw-bold text-center mb-4 bg-dark text-light py-2">FAVOURITES</h3>
        <Row>
          {Object.keys(favourites).length > 0 ? (
            Object.keys(favourites).map((favourite) => (
              <Col className="col-3">
                <div className="favourites-item">
                  <span>{favourite}</span>
                  <img
                    width={16}
                    height={16}
                    className="align-self-center ms-auto remove-favourite"
                    src="/images/cross.png"
                    alt="remove favourite"
                    onClick={() => removeFavourite(favourite)}
                  />
                </div>
              </Col>
            ))
          ) : (
            <span className="fw-bold text-center fs-5">No Favourites</span>
          )}
        </Row>
      </Container>
    </Layout>
  );
}

export default Favourites;
