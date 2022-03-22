import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('teste do componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const info = screen.getByText(
      /digital encyclopedia containing all Pokémons/i,
    );
    expect(info).toBeInTheDocument();
  });

  test('Se contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const headPokedex = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(headPokedex).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos sobre a Pokédex', () => {
    render(<About />);
    // RESOLUÇÃO: estou conferindo se todos as const paragrafo tem no texto a palavra pokémons. A expectativa é que tenham dois parágrafos com essa característica.
    const paragrafos = screen.getAllByText(/pokémons/i);
    expect(paragrafos).toHaveLength(2);
  });

  test(' Se contém a seguinte imagem de uma Pokédex', () => {
    // RESOLUÇÃO: a expectativa é que o src da const img contenha a url abaixo.
    render(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const textAlt = 'Pokédex';
    const img = screen.getByAltText(textAlt);
    expect(img.src).toContain(url);
  });
});
