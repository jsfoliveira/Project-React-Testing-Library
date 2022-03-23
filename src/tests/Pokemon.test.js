import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('É renderizado um card com as informações de determinado pokémon', () => {
  const { image, name } = pokemons[0];
  test('O nome correto do Pokémon deve ser mostrado', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
  });

  test('O tipo correto do pokémon deve ser mostrado', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
  });

  test('O peso médio do pokémon deve ser exibido', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<App />);
    const pokemonImage = screen.getByAltText(`${name} sprite`);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe(image);
  });
});

describe('Verificar se o card contém um link de navegação', () => {
  test('O link para redirecionar para outra página', () => {
    const { history } = renderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);
    history.push('/pokemons/4');
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/4');
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  test('Deve ser uma imagem com o atributo src e o alt especificados', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByText(/More Details/i);
    expect(btnDetails).toBeInTheDocument();
    userEvent.click(btnDetails);

    const checkBox = screen.getByText(/Pokémon favoritado?/i);
    userEvent.click(checkBox);
    const icone = screen.getByAltText('Pikachu is marked as favorite');
    expect(icone).toBeInTheDocument();
    expect(icone.src).toContain('/star-icon.svg');
    expect(icone.alt).toContain('Pikachu is marked as favorite');
  });
});
