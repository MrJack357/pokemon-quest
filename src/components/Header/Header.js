import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.headerBg};
  color: ${({ theme }) => theme.headerText};
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.headerText};
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Logo to="/">
                <LogoImage src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokéAPI" />
                Pokéquest Desafio React
            </Logo>
            <ThemeToggler />
        </HeaderContainer>
    );
};

export default Header;