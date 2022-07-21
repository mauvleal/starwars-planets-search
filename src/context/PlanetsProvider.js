import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName] = useState({ name: '' });

  useEffect(() => {
    const fetchPlanetsData = async () => {
      const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then((response) => response.json());
      const toSave = result.results;
      toSave.forEach((planet) => delete planet.residents);
      setData(toSave);
    };
    fetchPlanetsData();
  }, []);

  const contextVal = {
    data,
    setData,
  };

  return <PlanetContext.Provider value={ contextVal }>{children}</PlanetContext.Provider>;
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
