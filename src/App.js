import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonImage from './components/PokemonImage';
import GuessForm from './components/GuessForm';
import './App.css';
import Loader from './components/loader'; 

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    setLoading(true);
    const correctId = Math.floor(Math.random() * 151) + 1;
    const wrongIds = new Set();
    while (wrongIds.size < 2) {
      const randomId = Math.floor(Math.random() * 151) + 1;
      if (randomId !== correctId) {
        wrongIds.add(randomId);
      }
    }
    const promises = [axios.get(`https://pokeapi.co/api/v2/pokemon/${correctId}`),
      ...Array.from(wrongIds).map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))];

    Promise.all(promises).then(responses => {
      const shuffledOptions = responses.map(response => ({
        name: response.data.name,
        id: response.data.id
      })).sort(() => Math.random() - 0.5);
      setPokemon(responses.find(response => response.data.id === correctId).data);
      setOptions(shuffledOptions);
      setReveal(false);
      setLoading(false);
    });
  };

  const handleGuess = (userGuess) => {
    setLoading(true);
    setReveal(true);
    if (userGuess === pokemon.name) {
      setLastCorrect(true);
      setTotalCorrect(prev => prev + 1);
      setCorrectStreak(prev => prev + 1);
    } else {
      setLastCorrect(false);
      setCorrectStreak(0);
    }
    setTimeout(() => fetchPokemon(), 1000);
  };

  return (
    <div className="App">
      <h1>Adivina el Pokémon</h1>
      {loading && <Loader />}
      {pokemon && <PokemonImage id={pokemon.id} reveal={reveal} />}
      <GuessForm options={options} onGuess={handleGuess} />
      <div className='Conteo'>
        <p>Total Aciertos: {totalCorrect}</p>
        <p>Aciertos Seguidos: {correctStreak}</p>
        {lastCorrect !== null && (
          <p>{lastCorrect ? '¡Correcto!' : 'Incorrecto, intenta nuevamente'}</p>
        )}
      </div>
    </div>
  );
}

export default App;
