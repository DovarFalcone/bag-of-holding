import { useState, useCallback } from 'react';
import { Character } from '../../types';
import * as characterApi from '../../services/characterApi';

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const fetchCharacters = useCallback(async () => {
    const data = await characterApi.getCharacters();
    setCharacters(data);
  }, []);

  const addCharacter = async (character: Omit<Character, 'id'>) => {
    const newChar = await characterApi.createCharacter(character);
    setCharacters(prev => [...prev, newChar]);
  };

  const deleteCharacter = async (id: string) => {
    await characterApi.deleteCharacter(id);
    setCharacters(prev => prev.filter(c => c.id !== id));
  };

  const editCharacter = async (id: string, character: Omit<Character, 'id'>) => {
    const updated = await characterApi.updateCharacter(id, character);
    setCharacters(prev => prev.map(c => c.id === id ? updated : c));
  };

  return { characters, fetchCharacters, addCharacter, deleteCharacter, editCharacter };
};

export default useCharacters;
