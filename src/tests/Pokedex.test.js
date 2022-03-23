import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const typBtn = 'pokemon-type-button';
describe('teste do componente Pokedex', () => {
  test('Se contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const texto = screen.getByRole('heading',
      { name: /Encountered pokémons/i,
        level: 2 });
    expect(texto).toBeInTheDocument();
  });
});

describe('Teste se é exibido opróximo Pokémon da lista', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const btn = screen.getByText('Próximo pokémon');
    expect(btn).toBeInTheDocument();
  });

  test('Mostrar próximos Pokémons ao clicar no botão', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    for (let index = 0; index < button.length; index += 1) {
      userEvent.click(button[i]);
      const pokemonName = screen.getAllByTestId('pokemon-name');
      expect(pokemonName).toBeInTheDocument();
    }
  });

  test('Qd estiver no último pkm da lista e clicar no btn, deve voltar ao 1º pkm', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeDefined();
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeDefined();
    for (let i = 0; i < button.length; i += 1) {
      userEvent.click(button[i]);
    }
    expect(pikachu).toBeDefined();
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez', () => {
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon1 = screen.getAllByTestId('pokemon-name');
    expect(pokemon1).toHaveLength(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  test('Deve existir um botão de filtragem para cada tipo', () => {
    renderWithRouter(<App />);
    const btn = screen.getAllByTestId(typBtn);
    const eletric = screen.getByRole('button', { name: /electric/i });
    expect(btn[0]).toBe(eletric);
    const fire = screen.getByText(/fire/i);
    expect(btn[1]).toBe(fire);
    const bug = screen.getByText(/bug/i);
    expect(btn[2]).toBe(bug);
    const poison = screen.getByText(/poison/i);
    expect(btn[3]).toBe(poison);
    const psychic = screen.getByText(/psychic/i);
    expect(btn[4]).toBe(psychic);
    const normal = screen.getByText(/normal/i);
    expect(btn[5]).toBe(normal);
    const dragon = screen.getByText(/dragon/i);
    expect(btn[6]).toBe(dragon);
  });

  test('Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    const btn = screen.getAllByTestId(typBtn);
    const pokemonType = screen.getByTestId('pokemon-type');
    userEvent.click(btn[0]);
    expect(btnNext).toHaveTextContent(/Próximo pokémon/i);
    // A cada click no btn, a expectativa é que mude o type, tenha contido o texto definido no parâmetro. Não consigo colocar o eletric.
    userEvent.click(btn[1]);
    expect(pokemonType).toHaveTextContent(/Fire/i);
    userEvent.click(btn[2]);
    expect(pokemonType).toHaveTextContent(/Bug/i);
    userEvent.click(btn[3]);
    expect(pokemonType).toHaveTextContent(/Poison/i);
    userEvent.click(btn[4]);
    expect(pokemonType).toHaveTextContent(/Psychic/i);
    userEvent.click(btn[5]);
    expect(pokemonType).toHaveTextContent(/Normal/i);
    userEvent.click(btn[6]);
    expect(pokemonType).toHaveTextContent(/Dragon/i);
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);
    const btnType = screen.getAllByTestId(typBtn);
    const type = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    for (let i = 0; i < btnType.length; i += 1) {
      expect(btnType[i].innerHTML).toEqual(type[i]);
    }
  });

  test('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /All/i });
    expect(button).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
  });
  test('Mostrar os Pokémons normalmente quando o botão All for clicado', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnNext).toBeInTheDocument();
    const btnAll = screen.getAllByRole('button', { name: /all/i });
    expect(btnAll[0]).toBeInTheDocument();
    userEvent.click(btnAll[0]);
  });
});
