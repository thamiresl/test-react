import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';

function renderWithRouter(component) {
  const saveRouter = createMemoryHistory();

  return ({
    ...render(<Router history={ saveRouter }>{component}</Router>), saveRouter,
  });
}

const mockFavoritePokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',

  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',

  }];

describe('Teste o componente Favorite Pokemons', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const paragraphNotFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(paragraphNotFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ mockFavoritePokemons } />);
    const cards = screen.getAllByTestId('pokemon-name');
    expect(cards).toHaveLength(2);
  });
});
