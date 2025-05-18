import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Button = ({ children, onClick, disabled, ...props }) => {
    return (
        <StyledButton onClick={onClick} disabled={disabled} {...props}>
            {children}
        </StyledButton>
    );
};

export default Button;