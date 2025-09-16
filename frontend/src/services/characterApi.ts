export const updateCharacter = async (id: string, character: Omit<Character, 'id'>): Promise<Character> => {
  const res = await axios.put(`${API_URL}/${id}`, character);
  return res.data;
};
import axios from 'axios';
import { Character } from '../types';

const API_URL = 'http://localhost:8000/characters';

export const getCharacters = async (): Promise<Character[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createCharacter = async (character: Omit<Character, 'id'>): Promise<Character> => {
  const res = await axios.post(API_URL, character);
  return res.data;
};

export const deleteCharacter = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
