import React from 'react';
import './GuessForm.css';

function GuessForm({ options, onGuess }) {
  return (
    <div className="guess-form-container">
      {options.map((option, index) => (
        <button
          key={index}
          className="guess-option-button"
          onClick={() => onGuess(option.name)}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}

export default GuessForm;
