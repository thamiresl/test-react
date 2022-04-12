import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

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

    it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockPokemon }
        onUpdateFavoritePokemons={ false }
      />);
      const paragraphDetail = screen.queryByText(/This intelligent Pokémon roasts hard/i);
      expect(paragraphDetail).toBeInTheDocument();
    });

    it('Deverá existir um heading h2 com o texto Game Locations of <name>', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockPokemon }
        onUpdateFavoritePokemons={ false }
      />);
      const nameLocation = screen.queryByRole('heading',
        { name: /Game Locations of Pikachu/i });
      expect(nameLocation).toBeInTheDocument();
    });

    it('As localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockPokemon }
        onUpdateFavoritePokemons={ false }
      />);
      const location1 = screen.queryByText(/Kanto Viridian Forest/i);
      expect(location1).toBeInTheDocument();

      const location2 = screen.queryByText(/Kanto Power Plant/i);
      expect(location2).toBeInTheDocument();
    });

    it('Exibir o nome da localização e uma imagem do mapa ', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockPokemon }
        onUpdateFavoritePokemons={ false }
      />);
      const mapName = screen.queryByText(/Kanto Viridian Forest/i);
      expect(mapName).toBeInTheDocument();

      const mapImage = screen.getAllByRole('img', {
        name: /Pikachu Location/i });

      expect(mapImage).toHaveLength(2);

      expect(mapImage[0]).toBeDefined();

      expect(mapImage[1]).toBeDefined();
    });

    it('A imag da localização deve ter um atributo src com a URL da localização', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockPokemon }
        onUpdateFavoritePokemons={ false }
      />);
      const mapImg = screen.getAllByRole('img', {
        name: /Pikachu Location/i });

      expect(mapImg).toHaveLength(2);

      expect(mapImg[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

      expect(mapImg[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    });

    it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockPokemon }
        onUpdateFavoritePokemons={ false }
      />);
      const checkboxVerify = screen.getByRole('checkbox');
      expect(checkboxVerify).toBeDefined();
    });

    it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
      renderWithRouter(<App />);
      const linkDetails = screen.getByRole('link', {
        name: /more Details/i });
      userEvent.click(linkDetails);
      const checkboxClick = screen.getByRole('checkbox');
      expect(checkboxClick).toBeDefined();
      userEvent.click(checkboxClick);
      expect(checkboxClick).toBeChecked();
      userEvent.click(checkboxClick);
      expect(checkboxClick).not.toBeChecked();
    });
    it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockPokemon }
        onUpdateFavoritePokemons={ false }
      />);
      const checkboxDetails = screen.getByText(/Pokémon favoritado?/i);
      expect(checkboxDetails).toBeDefined();
    });
  });

// https://testing-library.com/docs/queries/about/#types-of-queries
