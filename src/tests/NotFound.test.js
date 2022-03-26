import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

function renderWithRouter(component) {
  const saveRouter = createMemoryHistory();

  return ({
    ...render(<Router history={ saveRouter }>{component}</Router>), saveRouter,
  });
}

describe('Testar o componente Not Found', () => {
  it('Teste se página contém um h2 com o texto Page requested not found ', () => {
    renderWithRouter(<NotFound />);
    const headingNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(headingNotFound).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const giphyImage = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(giphyImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
// https://testing-library.com/docs/queries/byalttext/
