import axios from 'axios';

export const getCharacters = (queryString = '') => {
  return axios.get('https://rickandmortyapi.com/api/character/?' + queryString);
};
