import React from 'react';
import { render, screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Pokemon from '../components/Pokemon';

function renderWithRouter(component) {
  const saveRouter = createMemoryHistory();

  return ({
    ...render(<Router history={ saveRouter }>{component}</Router>), saveRouter,
  });
}

const mockPokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
};

describe('Teste se é renderizado card com as informações de determinado pokémon', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      isFavorite={ false }
    />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      isFavorite={ false }
    />);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/Electric/i);
  });

  it('O peso médio do pokémon deve ser exibido com um texto', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      isFavorite={ false }
    />);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(/6.0/i);
  });

  it('A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      isFavorite={ false }
    />);

    const pokemonImage = screen.getByRole('img', { name: /sprite/i });
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se na Pokédex contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      isFavorite={ false }
    />);

    const pokemonLink = screen.getByRole('link', { name: /More details/i });
    expect(pokemonLink).toHaveAttribute('href', '/pokemons/25');
  });

  /*   it('Teste o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      isFavorite={ false }
    />);

    const linkForPokemom = screen.getByRole('link', { name: /More details/i });
    expect(linkForPokemom).toBeInTheDocument();
    userEvent.click(linkForPokemom);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
 */
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      isFavorite
    />);

    const starIcon = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toBeDefined();
  });
});

// https://react-test.dev/#tohaveattribute
