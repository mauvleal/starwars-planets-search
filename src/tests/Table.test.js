import React from 'react';
import {  cleanup, render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando a Tabela', ()=> {
  test('Testando os componentes da tabela', async () => {
    render(<App/>)
    const name = screen.getByText(/name/i)
    const rotationPeriod = screen.getByText(/Rotation Period/i)
    const orbitalPeriod = screen.getByText(/Orbital Period/i)
    const diameter = screen.getByText(/Diameter/)
    const climate = screen.getByText(/Climate/i)
    const gravity = screen.getByText(/Gravity/i)
    const terrain = screen.getByText(/Terrain/i)
    const surfaceWater = screen.getByText(/Surface Water/i)
    const population = screen.getByText(/Population/)
    const films = screen.getByText(/Films/i)
    const created = screen.getByText(/Created/i)
    const edited = screen.getByText(/Edited/i)
    const URL = screen.getByText(/URL/i)
    expect(name).toBeInTheDocument()
    expect(rotationPeriod).toBeInTheDocument()
    expect(orbitalPeriod).toBeInTheDocument()
    expect(diameter).toBeInTheDocument()
    expect(climate).toBeInTheDocument()
    expect(gravity).toBeInTheDocument()
    expect(terrain).toBeInTheDocument()
    expect(surfaceWater).toBeInTheDocument()
    expect(population).toBeInTheDocument()
    expect(films).toBeInTheDocument()
    expect(created).toBeInTheDocument()
    expect(edited).toBeInTheDocument()
    expect(URL).toBeInTheDocument()

  })
})