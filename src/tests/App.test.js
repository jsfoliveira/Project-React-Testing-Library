import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste do componente App', () => {
  test('Testando se contém um link com o texto Home,  About e Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });

  test('Testando se ao clicar no Home, a página é rendrizada corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testando se ao clicar no About, a página é rendrizada corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Se ao clicar no Favorite Pokémons, a página é rendrizada corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Se for página desconhecida, deve rendrizar Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-encontrada');
    const notFoundLink = screen.getByRole('heading',
      { name: /Page requested not found/, level: 2 });
    expect(notFoundLink).toBeInTheDocument();
  });
});
