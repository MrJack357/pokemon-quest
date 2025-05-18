import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPokemonList, api } from '../../services/api';
import PokemonCard from '../../components/Card/PokemonCard';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import TypeFilter from '../../components/Filter/TypeFilter';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${({ theme }) => theme.card};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

const Home = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [loadingFilter, setLoadingFilter] = useState(false);

    const fetchPokemon = async (currentOffset) => {
        try {
            const data = await getPokemonList(currentOffset);
            return data.results;
        } catch (error) {
            console.error('Failed to fetch pokemon:', error);
            return [];
        }
    };

    useEffect(() => {
        const loadInitialPokemon = async () => {
            setLoading(true);
            const initialPokemon = await fetchPokemon(0);
            setPokemonList(initialPokemon);
            setFilteredPokemonList(initialPokemon);
            setLoading(false);
        };

        loadInitialPokemon();
    }, []);

    // Filter by type when selectedType changes
    useEffect(() => {
        const filterByType = async () => {
            if (!selectedType) {
                setFilteredPokemonList(pokemonList);
                return;
            }

            setLoadingFilter(true);

            try {
                // Get all Pokemon of the selected type
                const response = await api.get(`/type/${selectedType}`);
                const typePokemon = response.data.pokemon.map(p => p.pokemon);

                // Find pokemon that exist in both the current list and the type-filtered list
                setFilteredPokemonList(typePokemon);
            } catch (error) {
                console.error('Error filtering by type:', error);
                setFilteredPokemonList(pokemonList);
            } finally {
                setLoadingFilter(false);
            }
        };

        filterByType();
    }, [selectedType, pokemonList]);

    const handleFilterChange = (type) => {
        setSelectedType(type);
    };

    const handleLoadMore = async () => {
        setLoadingMore(true);
        const newOffset = offset + 10;
        const morePokemon = await fetchPokemon(newOffset);

        setPokemonList(prev => [...prev, ...morePokemon]);
        setOffset(newOffset);
        setLoadingMore(false);
    };

    if (loading) {
        return <Loading message="Carregando Pokémons..." />;
    }

    return (
        <HomeContainer>
            <Title>Explore o Mundo Pokémon</Title>

            <FilterSection>
                <TypeFilter onFilterChange={handleFilterChange} />
            </FilterSection>

            {loadingFilter ? (
                <Loading message="Filtrando Pokémons..." />
            ) : (
                <>
                    {filteredPokemonList.length > 0 ? (
                        <PokemonGrid>
                            {filteredPokemonList.map((pokemon) => (
                                <PokemonCard key={pokemon.name} pokemon={pokemon} />
                            ))}
                        </PokemonGrid>
                    ) : (
                        <EmptyState>
                            <EmptyStateText>
                                Nenhum Pokémon encontrado com o filtro selecionado.
                            </EmptyStateText>
                            <Button onClick={() => setSelectedType('')}>
                                Limpar Filtro
                            </Button>
                        </EmptyState>
                    )}

                    {!selectedType && (
                        <ButtonContainer>
                            <Button onClick={handleLoadMore} disabled={loadingMore}>
                                {loadingMore ? 'Carregando...' : 'Carregar Mais'}
                            </Button>
                        </ButtonContainer>
                    )}
                </>
            )}
        </HomeContainer>
    );
};

export default Home;