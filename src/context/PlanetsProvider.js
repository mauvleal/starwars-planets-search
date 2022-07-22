import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
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
      const toSave = result.results;
      toSave.forEach((plan) => delete plan.residents);
      setData(toSave);
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

  };

  return <PlanetContext.Provider value={ contextVal }>{children}</PlanetContext.Provider>;
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
