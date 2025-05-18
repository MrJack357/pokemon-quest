import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.headerText};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;

const ToggleIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

const ThemeToggler = () => {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <ToggleButton onClick={toggleTheme}>
            <ToggleIcon>{isDarkTheme ? '🌙' : '☀️'}</ToggleIcon>
            {isDarkTheme ? 'Modo Claro' : 'Modo Escuro'}
        </ToggleButton>
    );
};

export default ThemeToggler;