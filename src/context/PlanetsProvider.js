import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [backup, setBackup] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [filters, setFilters] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [allColumn, setAllColumn] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const handleFilterByName = (value) => {
    if (value !== '') {
      const planetsFiltered = data.filter((item) => item.name
        .toLowerCase().includes(value));
      return setFilterByName(planetsFiltered);
    }
    setFilterByName(data);
  };

  useEffect(() => {
    const fetchPlanetsData = async () => {
      const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then((response) => response.json());
      const toSave = await result.results;
      toSave.forEach((plan) => delete plan.residents);

      const newOrder = toSave?.sort((x, y) => {
        const a = x.name.toUpperCase();
        const b = y.name.toUpperCase();
        const num = -1;
        if (a === b) return 0;
        return a > b ? 1 : num;
      });

      setBackup(newOrder);
      setData(newOrder);
    };
    fetchPlanetsData();
  }, []);

  const contextVal = {
    data,
    setData,
    filterByName,
    handleFilterByName,
    column,
    setColumn,
    comparison,
    setComparison,
    number,
    setNumber,
    filters,
    setFilters,
    allColumn,
    setAllColumn,
    backup,
    setBackup,

  };

  return <PlanetContext.Provider value={ contextVal }>{children}</PlanetContext.Provider>;
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
