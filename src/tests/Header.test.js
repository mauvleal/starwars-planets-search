import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';



describe('Testando filtros e retiradas de filtro', ()=> {
 
    test("adicionando filtro igual a", async () => {
      render(<App />);
      // const endor = await screen.getByRole('cell', {  name: /Endor/i})
      fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'population' }});
      fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que' }});
      fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '0' }});
      fireEvent.click(await screen.findByTestId('button-filter'));

      fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'surface_water' }});
      fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'menor que' }});
      fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '40' }});
      fireEvent.click(await screen.findByTestId('button-filter'));

      fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'diameter' }});
      fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'igual a' }});
      fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '4900' }})
      fireEvent.click(await screen.findByTestId('button-filter'));

      
      // expect(endor).toBeInTheDocument()
      expect(await screen.findAllByTestId('filter')).toHaveLength(3)
      expect(await screen.findAllByRole('row')).toHaveLength(1);
      expect(await screen.findAllByTestId('body')).toHaveLength(1)
   
      fireEvent.click(await screen.findByTestId('remove-single2'));
      expect(await screen.findAllByRole('row')).toHaveLength(1);

      fireEvent.click(await screen.findByTestId('remove-single1'));
      expect(await screen.findAllByRole('row')).toHaveLength(1);

      fireEvent.click(await screen.findByTestId('remove-single0'));
      expect(await screen.findAllByRole('row')).toHaveLength(1);
      
      
    })
    test("adicionando filtro igual a", async () => {
      render(<App />);
      // const endor = await screen.getByRole('cell', {  name: /Endor/i})
      fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'population' }});
      fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que' }});
      fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '0' }});
      fireEvent.click(await screen.findByTestId('button-filter'));

      fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'surface_water' }});
      fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'menor que' }});
      fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '40' }});
      fireEvent.click(await screen.findByTestId('button-filter'));

      fireEvent.click(await screen.findByTestId('button-remove-filters'));
      expect(await screen.findAllByTestId('planet-name')).toHaveLength(10);

  
      
    })
    test('Testa se é renderizada a tabela corretamente ', async () => {
      render(<App />);
      const table = await screen.findByTestId("table");
  
      expect(table).toBeInTheDocument();
      expect(table.firstChild.tagName).toBe('THEAD');
      expect(table.firstChild.firstChild.children.length).toBe(13);
      
    })

  
  })