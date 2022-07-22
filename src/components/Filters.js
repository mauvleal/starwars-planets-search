import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
// import PlanetContext from '../context/PlanetContext';

function Input() {
  const { column, setColumn, comparison, setComparison,
    number, setNumber, setFilters, data, setData } = useContext(PlanetContext);

  const handleClick = () => {
    setFilters(() => [{ column, comparison, number }]);
    console.log(column, comparison, number);
    console.log(data);
    const setFilter = data.filter((planet) => {
      const valueColumn = Number(planet[column]);
      const valueNumber = Number(number);

      if (comparison === 'maior que') {
        return valueColumn > valueNumber;
      }
      if (comparison === 'menor que') {
        return valueColumn < valueNumber;
      }
      return valueColumn === valueNumber;
    });
    setData(setFilter);
  };

  return (
    <div>
      <label htmlFor="column-filter">
        Coluna
        <select
          data-testid="column-filter"
          name="column-filter"
          onChange={ ({ target: { value } }) => setColumn(value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Operador
        <select
          data-testid="comparison-filter"
          name="comparison-filter"
          onChange={ ({ target: { value } }) => setComparison(value) }

        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        data-testid="value-filter"
        type="number"
        name="value-filter"
        value={ number }
        onChange={ ({ target: { value } }) => setNumber(value) }

      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => handleClick() }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Input;
