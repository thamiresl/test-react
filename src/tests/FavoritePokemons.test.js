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

describe('Teste o componente Favorite Pokemons', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const paragraphNotFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(paragraphNotFavorite).toBeInTheDocument();
  });
});
