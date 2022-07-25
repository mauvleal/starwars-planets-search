import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
// import PlanetContext from '../context/PlanetContext';

function Order() {
  const { data, setData } = useContext(PlanetContext);
  const columns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('ASC');

  const handleSortFilter = (colum, sorted) => {
    setSort({
      order: {
        colum,
        sort: sorted,
      },
    });
    const newData = data.filter((item) => item[column] !== 'unknown');
    if (sort === 'ASC') {
      return setData(newData.sort((a, b) => Number(a[column]) - Number(b[column])));
    }
    setData(newData.sort((a, b) => Number(b[column]) - Number(a[column])));
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        onChange={ ({ target: { value } }) => setColumn(value) }
      >
        {columns.map((item) => <option key={ item }>{item}</option>)}
      </select>
      <label htmlFor="ASC">
        <input
          type="radio"
          name="sort"
          value="ASC"
          id="ASC"
          data-testid="column-sort-input-asc"
          onClick={ (e) => setSort(e.target.value) }
        />
        Ascendente
      </label>
      <label htmlFor="DESC">
        <input
          type="radio"
          name="sort"
          value="DESC"
          id="DESC"
          data-testid="column-sort-input-desc"
          onClick={ (e) => setSort(e.target.value) }
        />
        Descendente
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleSortFilter({ column, sort }) }
      >
        Order
      </button>
    </div>
  );
}

export default Order;
