import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pokedex from "./views/Pokedex";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
