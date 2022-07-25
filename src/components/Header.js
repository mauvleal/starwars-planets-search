import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import fetchPlanetsData from '../services/fetchPlanetsData';

function Header() {
  const { filters, setFilters, data, setData, setAllColumn,
    setNumber, backup } = useContext(PlanetContext);

  // const removeFilters = async () => {
  //   const newData = await fetchPlanetsData();
  //   setData(newData);
  // };

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

  // const handleClick = async () => {
  //   const filtered = [];
  //   setFilters((prev) => [...prev, { column, comparison, number }]);
  //   for (let i = 0; i < filters.length; i += 1) {
  //     const filt = data.filter((planet) => {
  //       const valueColumn = Number(planet[column]);
  //       const valueNumber = Number(filters[i].number);

  //       if (comparison === 'maior que') {
  //         return valueColumn > valueNumber;
  //       }
  //       if (comparison === 'menor que') {
  //         return valueColumn < valueNumber;
  //       }
  //       return valueColumn === valueNumber;
  //     });
  //     filtered.push(filt);
  //     console.log(filtered);
  //     console.log(filt);
  //   }
  //   setData(filtered);
  //   removeColumn();
  // };

  //   const newData = '';
  //   if (newArray.length === 0) {
  //     console.log(data);
  //   }
  //   for (let i = 0; i < newArray.length; i += 1) {
  //     console.log(newArray[i]);
  //     const filt = data.filter((planet) => {
  //       const valueColumn = Number(planet[column]);
  //       const valueNumber = Number(newArray[i].number);

  //       if (comparison === 'maior que') {
  //         return valueColumn > valueNumber;
  //       }
  //       if (comparison === 'menor que') {
  //         return valueColumn < valueNumber;
  //       }
  //       return valueColumn === valueNumber;
  //     });
  //     console.log(newData);
  //     newData.push(filt);
  //     console.log(filt);
  //   }
  //   setData(newData);
  // };

  return (
    <div>

      {filters.map((filter, i) => (
        <div id={ filter.column } key={ i } data-testid="filter">
          {`${filter.column} ${filter.comparison} ${filter.number}`}
          <button
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
