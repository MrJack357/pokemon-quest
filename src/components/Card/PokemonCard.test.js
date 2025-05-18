import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import PokemonCard from '../../components/Card/PokemonCard';

const mockTheme = {
    card: '#ffffff',
    shadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    text: '#333333'
};

const mockPokemon = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/'
};

const renderWithTheme = (component) => {
    return render(
        <ThemeProvider theme={mockTheme}>
            <MemoryRouter>
                {component}
            </MemoryRouter>
        </ThemeProvider>
    );
};

describe('PokemonCard Component', () => {
    test('renders pokemon name correctly', () => {
        renderWithTheme(<PokemonCard pokemon={mockPokemon} />);

        const nameElement = screen.getByText('bulbasaur');
        expect(nameElement).toBeInTheDocument();
    });

    test('renders pokemon image with correct alt text', () => {
        renderWithTheme(<PokemonCard pokemon={mockPokemon} />);

        const imageElement = screen.getByAltText('bulbasaur');
        expect(imageElement).toBeInTheDocument();
    });

    test('has correct link to pokemon details', () => {
        renderWithTheme(<PokemonCard pokemon={mockPokemon} />);

        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', '/pokemon/bulbasaur');
    });

    test('renders custom image when provided', () => {
        const customImageUrl = 'https://example.com/custom-image.png';
        renderWithTheme(
            <PokemonCard pokemon={mockPokemon} imageUrl={customImageUrl} />
        );

        const imageElement = screen.getByAltText('bulbasaur');
        expect(imageElement).toHaveAttribute('src', customImageUrl);
    });
});