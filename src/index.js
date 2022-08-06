import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PokemonProvider } from './contexts/pokemon';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Not a great practice but since this context provider is essentially
// serving as a caching layer so we don't have to refetch pokemon data
// it is being rendered on top in index
root.render(
  <React.StrictMode>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
