import React from 'react';
import { getAllByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../components/Input';
import App from '../App';

describe('Teste Input', () => {
    it('Testando elementos da pagina Input', async () => {
      render(<App />);
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
        render(<App/>)
        const input = screen.getByTestId('name-filter');
        expect(input).toBeInTheDocument()
        expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)
        userEvent.type(input, 'oo')
        expect(screen.getAllByTestId('planet-name')).toHaveLength(2)
      })
      
    });
  

  