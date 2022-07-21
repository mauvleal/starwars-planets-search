import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({});

  const handleFilterByName = (value) => {
    console.log(value);
    if (value !== '') {
      const planetsFiltered = data.filter((item) => item.name
        .toLowerCase().includes(value));
      console.log(planetsFiltered);
      return setFilterByName(planetsFiltered);
    }
    setFilterByName(data);
  };

  useEffect(() => {
    const fetchPlanetsData = async () => {
      const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then((response) => response.json());
      const toSave = result.results;
      toSave.forEach((plan) => delete plan.residents);
      console.log(toSave);
      setData(toSave);
    };
    fetchPlanetsData();
  }, []);

  const contextVal = {
    data,
    setData,
    filterByName,
    handleFilterByName,

  };

  return <PlanetContext.Provider value={ contextVal }>{children}</PlanetContext.Provider>;
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
