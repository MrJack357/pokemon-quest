import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const api = axios.create({
    baseURL: BASE_URL,
});

export const getPokemonList = async (offset = 0, limit = 10) => {
    try {
        const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokemon list:', error);
        throw error;
    }
};

export const getPokemonDetails = async (nameOrId) => {
    try {
        const response = await api.get(`/pokemon/${nameOrId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Pokemon ${nameOrId}:`, error);
        throw error;
    }
};

export const getPokemonAbilityDetails = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching ability details:', error);
        throw error;
    }
};