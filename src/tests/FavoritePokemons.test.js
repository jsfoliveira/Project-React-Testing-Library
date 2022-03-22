import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('teste do componente FavoritePokemons', () => {
  test('É exibido No favorite pokemon found, se não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    // RESOLUÇÃO: quando eu clicar no More details do card, deve me direcionar para '/pokemons/4', o pathname deve ser esse. Quando preencher o checkbox, deve ser redirecionado para /favorites. No final, deve aparecer o charmander, pois ele que está no '/pokemons/4'.
    const { history } = renderWithRouter(<App />);
    const btndetails = screen.getByText(/More details/i);
    userEvent.click(btndetails);
    history.push('/pokemons/4');
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/4');

    const checked = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(checked);
    history.push('/favorites');
    const pokemon = screen.getByText(/Charmander/i);
    expect(pokemon).toBeDefined();
  });
});
