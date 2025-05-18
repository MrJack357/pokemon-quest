import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../../services/api';

const FilterContainer = styled.div`
  margin-bottom: 2rem;
`;

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const TypeFilter = ({ onFilterChange }) => {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await api.get('/type');
                setTypes(response.data.results);
            } catch (error) {
                console.error('Error fetching Pokemon types:', error);
            }
        };

        fetchTypes();
    }, []);

    const handleTypeChange = (e) => {
        const type = e.target.value;
        setSelectedType(type);
        onFilterChange(type);
    };

    return (
        <FilterContainer>
            <FilterLabel htmlFor="type-filter">Filtrar por tipo:</FilterLabel>
            <Select
                id="type-filter"
                value={selectedType}
                onChange={handleTypeChange}
            >
                <option value="">Todos os tipos</option>
                {types.map((type) => (
                    <option key={type.name} value={type.name}>
                        {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                    </option>
                ))}
            </Select>
        </FilterContainer>
    );
};

export default TypeFilter;