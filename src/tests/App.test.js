import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

function renderWithRouter(component) {
  const saveRouter = createMemoryHistory();

  return ({
    ...render(<Router history={ saveRouter }>{component}</Router>), saveRouter,
  });
}

describe('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('Testa se a aplicação vai para a página inicial clicando no Home', () => {
    const { saveRouter } = renderWithRouter(<App />);
    const inittialPage = screen.getByRole('link', { name: /home/i });
    userEvent.click(inittialPage);
    expect(saveRouter.location.pathname).toBe('/');
  });

  it('Testa se a aplicação é redirecionada para a página About clicando no About', () => {
    const { saveRouter } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    expect(saveRouter.location.pathname).toBe('/about');
  });

  it('Testa se a aplicação é redirecionada para Pokémons Favoritos clicando em Favorite',
    () => {
      const { saveRouter } = renderWithRouter(<App />);
      const favorites = screen.getByRole('link', { name: /favorite/i });
      userEvent.click(favorites);
      expect(saveRouter.location.pathname).toBe('/favorites');
    });

  it('Testa se rediciona para Not Found ao entrar em uma URL desconhecida', () => {
    const { saveRouter } = renderWithRouter(<App />);
    saveRouter.push('/NotFound');
    const notFound = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});

// https://testing-library.com/docs/example-react-router/#reducing-boilerplate
