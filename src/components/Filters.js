import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import fetchPlanetsData from '../services/fetchPlanetsData';
// import fetchPlanetsData from '../services/fetchPlanetsData';

function Filters() {
  const { column, setColumn, comparison, setComparison,
    number, setNumber, setFilters, data, setData, allColumn,
    setAllColumn } = useContext(PlanetContext);

  const removeColumn = () => {
    const newColumnsArray = allColumn.filter((item) => item !== column);
    setAllColumn(newColumnsArray);
    setColumn(allColumn[0]);
  };

  const handleClick = () => {
    setFilters((prev) => [...prev, { column, comparison, number }]);
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
    removeColumn();
  };

  const removeFilters = async () => {
    setFilters([]);
    setAllColumn(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
    setNumber(0);
    const newData = await fetchPlanetsData();
    setData(newData);
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
          {
            allColumn.map((col) => (
              <option key={ col } value={ col }>{col}</option>
            ))
          }
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Operador
        <select
          data-testid="comparison-filter"
          name="comparison-filter"
          onChange={ ({ target: { value } }) => setComparison(value) }
        //   value={ comparison }
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

      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => removeFilters() }
      >
        Remover Filtros
      </button>
    </div>
  );
}

export default Filters;
