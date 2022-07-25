import React, { } from 'react';
// import PlanetContext from '../context/PlanetContext';

function Order() {
  const columns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  // const [column, setColumn] = useState('');
  // const [sort, setSort] = useState('');

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
        // onClick={ () => handleSortFilter({ column, sort }) }
      >
        Order
      </button>
    </div>
  );
}

export default Order;
