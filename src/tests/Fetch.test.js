import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import planetsMock from './Mock';
import fetchPlanetsData from '../services/fetchPlanetsData';

jest.useFakeTimers();

describe("testa a tabela", () => {
  beforeEach(() => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue({ json: async () => planetsMock });
    render(<App />);
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test("Verifica se os planetas são renderizados", async () => {
    await waitFor(() => {
      const { results } = planetsMock;
      const planetsName = results.map(({ name }) => name);

      planetsName.forEach(
        (name) => {
          const planet = screen.getByText(name);
          expect(planet).toBeInTheDocument();
        },
        { timeout: 20000 }
      );
    });
  });

  test('Testa  API é chamada', () => {
             
     expect(global.fetch).toHaveBeenCalledTimes(1);
     expect(global.fetch).toBeCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
     
   });

   test('Test fetch service', () => {
    const data = fetchPlanetsData();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toBeCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
    
  });

});