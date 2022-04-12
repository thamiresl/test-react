import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import data from '../data';
import Pokedex from '../components/Pokedex';

function renderWithRouter(component) {
  const saveRouter = createMemoryHistory();

  return ({
    ...render(<Router history={ saveRouter }>{component}</Router>), saveRouter,
  });
}
const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Teste as informações da Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const textH2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(textH2).toBeDefined();
  });

  it('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeDefined();
  });

  it('Deve ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextPokemon).toBeDefined();
    userEvent.click(nextPokemon);
    const nextPokemonText = screen.getByText(/Charmander/i);
    expect(nextPokemonText).toBeInTheDocument();
  });

  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão...', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextPokemon).toBeDefined();
    data.forEach(() => userEvent.click(nextPokemon));
    const nextPokemonText = screen.getByText(/Pikachu/i);
    expect(nextPokemonText).toBeDefined();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const oncePokemon = screen.getAllByTestId('pokemon-name');
    expect(oncePokemon).toHaveLength(1);
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon sem repetição', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const typesPokemon = [...new Set(data.map((element) => element.type))];
    const getPokemon = screen.getAllByTestId('pokemon-type-button');
    expect(getPokemon).toHaveLength(typesPokemon.length);
    getPokemon.forEach((element, index) => {
      expect(element).toHaveTextContent(typesPokemon[index]);
    });
  });

  it('Botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const getPokemon = screen.getByTestId('pokemon-type');
    const getButtonType = screen.getByRole('button', {
      name: /fire/i,
    });
    expect(getButtonType).toBeDefined();
    userEvent.click(getButtonType);
    expect(getPokemon).toHaveTextContent('Fire');
    expect(getPokemon).not.toHaveTextContent('Dragon');
  });

  it('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const getAllButton = screen.getByRole('button', {
      name: /All/i,
    });
    expect(getAllButton).toBeDefined();
  });

  it('O texto do botão deve ser All', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const getAllButton = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(getAllButton);
    const getPokemonName = screen.getByTestId('pokemon-name');
    expect(getPokemonName).toHaveTextContent('Pikachu');
  });

  it('A Pokedéx deverá mostrar os Pokémons normalmente ', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const getAllButton = screen.getByRole('button', {
      name: /All/i,
    });
    expect(getAllButton).toBeDefined();
    const getPokemonType = screen.getByTestId('pokemon-type');
    expect(getPokemonType).toHaveTextContent('Electric');
  });
});
