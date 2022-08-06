import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Compare from './views/Compare';
import Pokedex from "./views/Pokedex";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/compare" element={<Compare/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
