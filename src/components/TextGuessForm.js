import React, { useState } from 'react';
import './TextGuessForm.css';  // nuevo archivo CSS

const TextGuessForm = ({ onGuess }) => {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuess(guess.toLowerCase());
    setGuess('');
  };

  return (
    <form onSubmit={handleSubmit} className="text-guess-form">
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Escribe el nombre del Pokémon"
        className="text-input"
      />
      <button type="submit" className="submit-button">Adivinar</button>
    </form>
  );
};

export default TextGuessForm;
