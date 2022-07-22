import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Header() {
  const { filters, setFilters } = useContext(PlanetContext);

  const removeFilter = ({ target }) => {
    const deleteFilter = target.value;
    setFilters(filters.filter((filter) => filter.column !== deleteFilter));
  };

  return (
    <div>

      {filters.map((filter, i) => (
        <div id={ filter.column } key={ i }>
          {`${filter.column} ${filter.comparison} ${filter.number}`}
          <button
            type="button"
            value={ filter.column }
            onClick={ removeFilter }
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}

export default Header;
