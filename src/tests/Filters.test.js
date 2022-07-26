import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import planetsMock from './Mock';

describe('Teste Input', () => {
  beforeEach(() => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue({ json: async () => planetsMock });
    render(<App />);
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

    it('Testando elementos da pagina Input', async () => {
    
      const input = screen.getByTestId('name-filter');
      const columnFilter = screen.getByTestId('column-filter')
      const button = screen.getByTestId('button-filter');
      const buttonRemove = screen.getByTestId('button-remove-filters');
      expect(input).toBeInTheDocument();
      expect(input.value).toBe('');
      expect(columnFilter).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(buttonRemove).toBeInTheDocument();
      expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)
 
      })

      it('Testando input digitando oo', async ()=> {
       
        const input = screen.getByTestId('name-filter');
        expect(input).toBeInTheDocument()
        expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)
        userEvent.type(input, 'oo')
        const planetNaboo = screen.getByRole('cell', { name: /naboo/i });
        const planetTatooine = screen.getByRole('cell', { name: /tatooine/i });
        expect(screen.getAllByTestId('planet-name')).toHaveLength(2)
        expect(planetNaboo).toBeInTheDocument;
        expect(planetTatooine).toBeInTheDocument;
      })

      it('faz os filtros e testa a remoção do filtro por texto', async() => {
        
        const input = screen.getByTestId('name-filter');
        expect(input).toBeInTheDocument()
        expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)
        userEvent.type(input, 'oo')
        const planetNaboo = screen.getByRole('cell', { name: /naboo/i });
        const planetTatooine = screen.getByRole('cell', { name: /tatooine/i });
    
        expect(planetNaboo).toBeInTheDocument;
        expect(planetTatooine).toBeInTheDocument;
    
        userEvent.type(input, '{backspace}');
        userEvent.type(input, '{backspace}');
    
        const tab = screen.getByRole('table');
    
        expect(tab.lastChild.tagName).toBe('TBODY');
        expect(tab.lastChild.children.length).toBe(10);
      });
      
    });
  

  