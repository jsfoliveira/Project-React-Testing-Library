import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('teste do componente NotFound', () => {
  test('Se contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading',
      { name: /Page requested not found/i,
        level: 2 });
    expect(notFound).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem pedida', () => {
    renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const textAlt = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(textAlt);
    expect(img.src).toContain(url);
  });
});
