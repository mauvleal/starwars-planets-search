import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import fetchPlanetsData from '../services/fetchPlanetsData';

function Header() {
  const { filters, setFilters, data, setData, setAllColumn,
    setNumber, backup } = useContext(PlanetContext);

  const removeFilters = async () => {
    const newData = await fetchPlanetsData();
    setFilters([]);
    setAllColumn(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
    setNumber(0);
    setData(newData);
  };

  const setNewData = (array) => {
    let listaFiltrada = backup;
    console.log(listaFiltrada);
    console.log(array);
    array.forEach((filtro) => {
      const { column, comparison, number } = filtro;
      if (comparison === 'igual a') {
        listaFiltrada = listaFiltrada
          .filter((cada) => Number(cada[column]) === Number(number));
      }
      if (comparison === 'maior que') {
        listaFiltrada = listaFiltrada
          .filter((cada) => Number(cada[column]) > Number(number));
      }

      if (comparison === 'menor que') {
        listaFiltrada = listaFiltrada
          .filter((cada) => Number(cada[column]) < Number(number));
      }
    });
    setData(listaFiltrada);
    console.log(data);
  };

  const removeFilter = ({ target }) => {
    const deleteFilter = target.value;
    const newArray = filters.filter((filter) => filter.column !== deleteFilter);
    setFilters(newArray);
    console.log();
    if (newArray.length === 0) {
      removeFilters();
    } else {
      setNewData(newArray);
    }
  };

  return (
    <div>

      {filters.map((filter, i) => (
        <div id={ filter.column } key={ i } data-testid="filter">
          {`${filter.column} ${filter.comparison} ${filter.number}`}
          <button
            data-testid={ `remove-single${i}` }
            type="button"
            value={ filter.column }
            onClick={ removeFilter }
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default Header;
