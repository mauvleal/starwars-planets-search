import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Input() {
  const { handleFilterByName } = useContext(PlanetContext);

  const handleChange = (e) => {
    const { value } = e.target;
    handleFilterByName(value);
  };

  return (
    <div>
      <h1>Star Wars</h1>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ handleChange }
      />
    </div>
  );
}

export default Input;
