import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPokemonDetails, getPokemonAbilityDetails } from '../../services/api';
import Loading from '../../components/Loading/Loading';
import Button from '../../components/Button/Button';

const DetailsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PokemonHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const PokemonImageContainer = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 50%;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 2rem;
  }
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
`;

const PokemonInfo = styled.div`
  flex: 1;
`;

const PokemonName = styled.h1`
  font-size: 2.5rem;
  text-transform: capitalize;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const PokemonId = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const TypesContainer = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const TypeBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-right: 0.5rem;
  font-size: 0.9rem;
  text-transform: capitalize;
  color: white;
  background-color: ${({ type }) => {
        const typeColors = {
            normal: '#A8A77A',
            fire: '#EE8130',
            water: '#6390F0',
            electric: '#F7D02C',
            grass: '#7AC74C',
            ice: '#96D9D6',
            fighting: '#C22E28',
            poison: '#A33EA1',
            ground: '#E2BF65',
            flying: '#A98FF3',
            psychic: '#F95587',
            bug: '#A6B91A',
            rock: '#B6A136',
            ghost: '#735797',
            dragon: '#6F35FC',
            dark: '#705746',
            steel: '#B7B7CE',
            fairy: '#D685AD',
            default: '#777'
        };
        return typeColors[type] || typeColors.default;
    }};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

const StatItem = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const StatName = styled.p`
  font-size: 0.9rem;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const StatValue = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const MovesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

const MoveItem = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  text-transform: capitalize;
  color: ${({ theme }) => theme.text};
`;

const AbilitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

const AbilityItem = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const AbilityName = styled.h3`
  font-size: 1.2rem;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const AbilityDescription = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.5;
`;

const PokemonDetails = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [abilities, setAbilities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                setLoading(true);
                const pokemonData = await getPokemonDetails(name);
                setPokemon(pokemonData);

                // Fetch ability details
                const abilitiesPromises = pokemonData.abilities.map(async (ability) => {
                    const abilityData = await getPokemonAbilityDetails(ability.ability.url);

                    // Find English description
                    const englishEntry = abilityData.effect_entries.find(
                        entry => entry.language.name === 'en'
                    );

                    return {
                        name: ability.ability.name,
                        description: englishEntry ? englishEntry.effect : 'No description available'
                    };
                });

                const abilitiesData = await Promise.all(abilitiesPromises);
                setAbilities(abilitiesData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch pokemon details:', error);
                setLoading(false);
            }
        };

        fetchPokemonData();
    }, [name]);

    if (loading) {
        return <Loading message={`Carregando detalhes de ${name}...`} />;
    }

    if (!pokemon) {
        return (
            <DetailsContainer>
                <h2>Pokémon não encontrado</h2>
                <BackButton to="/">Voltar à página inicial</BackButton>
            </DetailsContainer>
        );
    }

    return (
        <DetailsContainer>
            <BackButton to="/">← Voltar à listagem</BackButton>

            <PokemonHeader>
                <PokemonImageContainer>
                    <PokemonImage
                        src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                        alt={pokemon.name}
                    />
                </PokemonImageContainer>

                <PokemonInfo>
                    <PokemonId>#{String(pokemon.id).padStart(3, '0')}</PokemonId>
                    <PokemonName>{pokemon.name}</PokemonName>

                    <TypesContainer>
                        {pokemon.types.map((type) => (
                            <TypeBadge key={type.type.name} type={type.type.name}>
                                {type.type.name}
                            </TypeBadge>
                        ))}
                    </TypesContainer>

                    <StatsContainer>
                        {pokemon.stats.map((stat) => (
                            <StatItem key={stat.stat.name}>
                                <StatName>{stat.stat.name.replace('-', ' ')}</StatName>
                                <StatValue>{stat.base_stat}</StatValue>
                            </StatItem>
                        ))}
                    </StatsContainer>
                </PokemonInfo>
            </PokemonHeader>

            <SectionTitle>Habilidades</SectionTitle>
            <AbilitiesContainer>
                {abilities.map((ability) => (
                    <AbilityItem key={ability.name}>
                        <AbilityName>{ability.name.replace('-', ' ')}</AbilityName>
                        <AbilityDescription>{ability.description}</AbilityDescription>
                    </AbilityItem>
                ))}
            </AbilitiesContainer>

            <SectionTitle>Movimentos</SectionTitle>
            <MovesContainer>
                {pokemon.moves.slice(0, 20).map((move) => (
                    <MoveItem key={move.move.name}>
                        {move.move.name.replace('-', ' ')}
                    </MoveItem>
                ))}
            </MovesContainer>
            {pokemon.moves.length > 20 && (
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Mostrando 20 de {pokemon.moves.length} movimentos
                </p>
            )}
        </DetailsContainer>
    );
};

export default PokemonDetails;