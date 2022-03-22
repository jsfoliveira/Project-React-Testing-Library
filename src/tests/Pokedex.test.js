import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste do componente Pokedex', () => {
  // Ok
  test('Se contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const texto = screen.getByRole('heading',
      { name: /Encountered pokémons/i,
        level: 2 });
    expect(texto).toBeInTheDocument();
  });
});

describe('Teste se é exibido opróximo Pokémon da lista', () => {
  // Ok
  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const btn = screen.getByText('Próximo pokémon');
    expect(btn).toBeInTheDocument();
  });

  // test('Mostrar próximos Pokémons ao clicar no botão', () => {
  //   renderWithRouter(<App />);
  // });

  // test('Mostrar primeiro pokemon ao clicar no botao es estiver no último', () => {
  //   renderWithRouter(<App />);
  // });
});

describe('Teste se é mostrado apenas um Pokémon por vez', () => {
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon1 = screen.getAllByTestId('pokemon-name');
    expect(pokemon1).toHaveLength(1);
  });
});
