import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import Input from './components/Input';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Input />
      <Filters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
