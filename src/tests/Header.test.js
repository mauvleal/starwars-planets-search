import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import planetsMock from './Mock';



describe('Testando filtros e retiradas de filtro', ()=> {
  beforeEach(() => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue({ json: async () => planetsMock });
    render(<App />);
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });
 
    test("adicionando filtros", async () => {
     
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

      
      expect(await screen.findAllByTestId('filter')).toHaveLength(3)
      expect(await screen.findAllByRole('row')).toHaveLength(2);
      expect(await screen.findAllByTestId('column-filter')).toHaveLength(1)
   
      fireEvent.click(await screen.findByTestId('remove-single2'));
      expect(await screen.findAllByRole('row')).toHaveLength(6);
      expect(await screen.findAllByTestId('column-filter')).toHaveLength(1)

      fireEvent.click(await screen.findByTestId('remove-single1'));
      expect(await screen.findAllByRole('row')).toHaveLength(9);
      expect(await screen.findAllByRole('row')).toHaveLength(9);
      expect(await screen.findAllByTestId('column-filter')).toHaveLength(1)
    })
    test("adicionando filtros", async () => {
    
      fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'population' }});
      fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que' }});
      fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '0' }});
      fireEvent.click(await screen.findByTestId('button-filter'));

      fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'surface_water' }});
      fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'menor que' }});
      fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '40' }});
      fireEvent.click(await screen.findByTestId('button-filter'));

      fireEvent.click(await screen.findByTestId('button-remove-filters'));
      expect(await screen.findAllByTestId('planet-name')).toHaveLength(5);

  
      
    })
    test('Testa se é renderizada a tabela corretamente ', async () => {
      
      const table = await screen.findByTestId("table");
  
      expect(table).toBeInTheDocument();
      expect(table.firstChild.tagName).toBe('THEAD');
      expect(table.firstChild.firstChild.children.length).toBe(13);
      
    })

    test('Verifica se a ordenação funciona corretamente', () => {
     
      const columnSort = screen.getByTestId('column-sort');
      const ascRatio = screen.getByTestId('column-sort-input-asc');
      const descRatio = screen.getByTestId('column-sort-input-desc');
      const btnOrdenar = screen.getByTestId('column-sort-button');
  
      userEvent.selectOptions(columnSort, ['population']);
      userEvent.click(ascRatio);
      userEvent.click(btnOrdenar);
      userEvent.click(descRatio)
      userEvent.click(btnOrdenar);
  
  
    })

    test('testa quantidade de filtros', async () => {
     
      fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'population' }});
      fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que' }});
      fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '0' }});
      fireEvent.click(await screen.findByTestId('button-filter'));
  
      fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'surface_water' }});
      fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'menor que' }});
      fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '40' }});
      fireEvent.click(await screen.findByTestId('button-filter'));


      const filter1 = screen.getByText(/population maior que 0/i);
      const filter2 = screen.getByText(/surface_water menor que 40/i);
      expect(filter1).toBeInTheDocument();
      expect(filter2).toBeInTheDocument();

      fireEvent.click(await screen.findByTestId('button-remove-filters'));
      const table = await screen.findByTestId("table");
  
      expect(table).toBeInTheDocument();
      expect(table.firstChild.tagName).toBe('THEAD');
      expect(table.firstChild.firstChild.children.length).toBe(13);
    })

    test('testa quantidade de filtros', async () => {
      const head = screen.getByText(/Star Wars/i);
      const intputText = screen.getByTestId('name-filter')
      const columnLabel = screen.getByText(/Coluna/i)
      const operLabel = screen.getByText(/Operador/i)

      const columnFilter = screen.getByTestId('column-filter')
      const operFilter = screen.getByTestId('comparison-filter')
      const numberFilter = screen.getByTestId('value-filter')

      expect(head).toBeInTheDocument();
      expect(intputText).toBeInTheDocument();
      expect(columnLabel).toBeInTheDocument();
      expect(operLabel).toBeInTheDocument();

      expect(columnFilter).toHaveValue('population');
      expect(operFilter).toHaveValue('maior que');
      expect(numberFilter).toHaveValue(0);

    
    })

    test('testando ordenar os planetas.', async () => {
    
      const columnSort = screen.getByTestId('column-sort');
      const ASCButon = screen.getByTestId('column-sort-input-asc');
      const DESCButon = screen.getByTestId('column-sort-input-desc');
      const sortButon = screen.getByTestId('column-sort-button');
  
      userEvent.selectOptions(columnSort, 'population');
      userEvent.click(ASCButon);
      userEvent.click(sortButon);
      const pop = screen.getByTestId('body');
      expect(await pop.lastChild.children.length).toBe(13);
  
      userEvent.selectOptions(columnSort, 'orbital_period');
      userEvent.click(ASCButon);
      userEvent.click(sortButon);
      const pop2 = screen.getByTestId('body');
      expect(await pop2.lastChild.children.length).toBe(13);
  
      userEvent.selectOptions(columnSort, 'diameter');
      userEvent.click(DESCButon);
      userEvent.click(sortButon);
      const pop3 = screen.getByTestId('body');
      expect(await pop3.lastChild.children.length).toBe(13);
      
    });

    test('testa quantidade de filtros', async () => {
     
      fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'population' }});
      fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que' }});
      fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '0' }});
      fireEvent.click(await screen.findByTestId('button-filter'));
  
    
      const filter1 = screen.getByText(/population maior que 0/i);
      expect(filter1).toBeInTheDocument();
     

      fireEvent.click(await screen.findByTestId(/remove-single0/i));
      expect(filter1).not.toBeInTheDocument();
    
    })
  })