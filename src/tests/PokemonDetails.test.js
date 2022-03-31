import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import PokemonDetails from '../components/PokemonDetails';

function renderWithRouter(component) {
  const saveRouter = createMemoryHistory();

  return ({
    ...render(<Router history={ saveRouter }>{component}</Router>), saveRouter,
  });
}

const mockPokemon = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: `This intelligent Pokémon roasts hard
  berries with electricity to make them tender enough to eat.`,
}];

const match = { params: { id: 25 } };
describe('Teste se as informações detalhadas do Pokémon selecionado aparecerem na tela',
  () => {
    it('A página deve conter um texto <name> Details', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockPokemon }
        onUpdateFavoritePokemons={ false }
      />);
      const detailsName = screen.getByRole('heading', { name: /Pikachu Details/i });
      expect(detailsName).toBeInTheDocument();
    });

    it('Não deve existir o link de navegação', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockPokemon }
        onUpdateFavoritePokemons={ false }
      />);
      const moreDetails = screen.queryByText(/More Details/i);
      expect(moreDetails).not.toBeInTheDocument();
    });

    it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockPokemon }
        onUpdateFavoritePokemons={ false }
      />);
      const summaryH2 = screen.queryByRole('heading',
        { name: /Summary/i,
          leve: 2 });
      expect(summaryH2).toBeInTheDocument();
    });
  });

// https://testing-library.com/docs/queries/about/#types-of-queries
