import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import Header from './components/Header';
import Input from './components/Input';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Input />
      <Filters />
      <Header />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
