import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Compare from './views/Compare';
import Favourites from './views/Favourites/favourites';
import Pokedex from "./views/Pokedex";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/compare" element={<Compare/>} />
        <Route path="/favourites" element={<Favourites/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
