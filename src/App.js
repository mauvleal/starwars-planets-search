import React from 'react';
import './App.css';
import Table from './components/Table';
import Input from './components/Input';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Input />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
