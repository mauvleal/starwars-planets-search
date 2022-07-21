import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { data } = useContext(PlanetContext);
  console.log(useContext(PlanetContext));
  return (
    <table>

      <thead>
        <tr>
          { data.length && Object.keys(data[0])
            .map((item) => <th key={ item }>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.length && data
          .map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value, i) => <td key={ i }>{value}</td>)}
            </tr>))}
      </tbody>

    </table>
  );
}

export default Table;
