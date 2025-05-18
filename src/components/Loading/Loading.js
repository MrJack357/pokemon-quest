import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid ${({ theme }) => theme.border};
  border-top: 5px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
`;

const Loading = ({ message = 'Carregando...' }) => {
    return (
        <LoadingContainer>
            <Spinner />
            <LoadingText>{message}</LoadingText>
        </LoadingContainer>
    );
};

export default Loading;