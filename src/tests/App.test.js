import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import planetsMock from './Mock';

describe("Teste filtro numerico", () => {
  beforeEach(() => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue({ json: async () => planetsMock });
    render(<App />);
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

   
  test("teste se o nome Star Wars é exibido na tela", () => {
    
    const titleElement = screen.getByRole("heading", { name: /star wars/i });
    expect(titleElement).toBeInTheDocument();
  });

  test("escrever no input", () => {
     
    const input = screen.getByRole("textbox");
    userEvent.type(input, "oo");
    expect(input).toHaveValue("oo");
  });

  test("exibe o planeta digitado", async () => {
   
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /filtrar/i });

    userEvent.type(input, "naboo");
    userEvent.click(button);

    const planet = await screen.findByRole("cell", {
      name: /naboo/i,
    });

    expect(planet).toBeInTheDocument();
  });

  test("testando filtro igual a", async () => {
    

    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'population' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'igual a' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '200000' }});
    fireEvent.click(await screen.findByTestId('button-filter'));

    expect(await screen.findAllByRole('row')).toHaveLength(2);
  });

  test("testando filtro  menor que", async () => {
    
    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'surface_water' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'menor que' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '40' }});
    fireEvent.click(await screen.findByTestId('button-filter'));

    expect(await screen.findAllByRole('row')).toHaveLength(7);
  })

    test("testando filtro maior que", async () => {
      
      fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'diameter' }});
      fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que' }});
      fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '8900' }})
      fireEvent.click(await screen.findByTestId('button-filter'));
      expect(await screen.findAllByRole('row')).toHaveLength(8);
    
  });

 test('Testando filtro asc e desc', async () => {
 
    const planets = await screen.findAllByTestId('planet-name')
    const dagoba = screen.getByRole('cell', {  name: /dagobah/i})
    expect(dagoba).toBeInTheDocument()
    expect(planets).toHaveLength(10)
    userEvent.selectOptions(screen.getByTestId('column-sort'), 'population')
    fireEvent.click(screen.getByTestId('column-sort-input-asc'))
    fireEvent.click(screen.getByTestId('column-sort-button'))
    expect(screen.getAllByTestId('planet-name')).toHaveLength(8)
    // expect(dagoba).not.toBeInTheDocument()
    // userEvent.click(screen.getByTestId('column-sort-input-desc'))
    // userEvent.click(screen.getByTestId('column-sort-button'))
    // expect(dagoba).not.toBeInTheDocument()

  })
  test('Testando filtro asc e desc', async () => {
      const planets = await screen.findAllByTestId('planet-name')
      expect(planets).toHaveLength(10)
      userEvent.selectOptions(screen.getByTestId('column-sort'), 'population')
      fireEvent.click(screen.getByTestId('column-sort-input-desc'))
      fireEvent.click(screen.getByTestId('column-sort-button'))
      expect(screen.getAllByTestId('planet-name')).toHaveLength(8)
  
    })

    test('Testa  API é chamada', () => {
      const mockFetch = () => {
         jest.spyOn(global, 'fetch')
           .mockImplementation(() => Promise.resolve({
             json: () => Promise.resolve(starWarsMock),
           }));
       }
       mockFetch()
       
       expect(global.fetch).toHaveBeenCalledTimes(1);
       expect(global.fetch).toBeCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
       
     });
   
    });