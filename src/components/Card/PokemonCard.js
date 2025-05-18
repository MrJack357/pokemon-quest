import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
`;

const PokemonName = styled.h3`
  font-size: 1.2rem;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const PokemonId = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
`;

const PokemonCard = ({ pokemon, imageUrl }) => {
    return (
        <CardContainer to={`/pokemon/${pokemon.name}`}>
            <PokemonId>#{pokemon.url.split('/')[6]}</PokemonId>
            <PokemonImage
                src={imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
                alt={pokemon.name}
            />
            <PokemonName>{pokemon.name}</PokemonName>
        </CardContainer>
    );
};

export default PokemonCard;