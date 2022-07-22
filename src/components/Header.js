import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Header() {
  const { filters, setFilters } = useContext(PlanetContext);

  const removeFilterItem = (target) => {
    const newFilter = filters.filter((item) => item !== target);
    setFilters(newFilter);
  };

  return (
    <div>

      {filters.map((item) => (
        <div key={ item.column }>
          <span>{`${item.column} ${item.comparison} ${item.numeric}`}</span>
          <button
            type="button"
            onClick={ () => removeFilterItem() }
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}

export default Header;
