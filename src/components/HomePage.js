import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonImage from './PokemonImage';
import './HomePage.css';

const HomePage = ({ setGameMode }) => {
  const navigate = useNavigate();
  const [pokemonId, setPokemonId] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPokemonId(Math.floor(Math.random() * 151) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayNow = (mode) => {
    setGameMode(mode);
    navigate('/play');
  };

  return (
    <div className="home-page">
      <h1 className="home-title">Pokemon Guess Name</h1>
      <div className="pokemon-animation">
        <PokemonImage id={pokemonId} reveal={true} />
      </div>
      <div className="play-buttons">
        <button className="play-button" onClick={() => handlePlayNow('select')}>
          JUGAR MODO SELECCIÓN
        </button>
        <button className="play-button" onClick={() => handlePlayNow('text')}>
          JUGAR MODO ESCRITURA
        </button>
      </div>
    </div>
  );
};

export default HomePage;