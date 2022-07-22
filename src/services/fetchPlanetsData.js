const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchPlanetsData = async () => {
  const result = await fetch(URL);
  const data = await result.json();
  return data.results;
};

export default fetchPlanetsData;
