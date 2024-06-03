import React from 'react';

function PokemonImage({ id, reveal }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

  return (
    <img
      src={imageUrl}
      alt="Mystery Pokemon"
      style={{
        width: '250px',
        height: '250px',
        filter: reveal ? 'none' : 'brightness(0) saturate(100%)'
      }}
    />
  );
}

export default PokemonImage;
