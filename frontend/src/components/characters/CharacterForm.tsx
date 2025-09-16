import React, { useState, useEffect } from 'react';
import { Box, Button, MenuItem, TextField, Stack } from '@mui/material';
import { usePlayers } from '../players/usePlayers';
import useCharacters from './useCharacters';


interface CharacterFormProps {
  addCharacter: (character: { name: string; player_id: string }) => void;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ addCharacter }) => {
  const { players, loading } = usePlayers();
  const [name, setName] = useState('');
  const [playerId, setPlayerId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !playerId) return;
    addCharacter({ name, player_id: playerId });
    setName('');
    setPlayerId('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Character Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          InputLabelProps={{ style: { color: '#ebdbb2' } }}
          sx={{
            input: { color: '#ebdbb2' },
            label: { color: '#ebdbb2' },
            '& .MuiInputBase-root, & .MuiOutlinedInput-root': {
              bgcolor: '#3c2f23',
              color: '#ebdbb2',
            },
            '& .MuiInputLabel-root': { color: '#ebdbb2' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#a89984' },
          }}
        />
        <TextField
          select
          label="Player"
          value={playerId}
          onChange={e => setPlayerId(e.target.value)}
          required
          InputLabelProps={{ style: { color: '#ebdbb2' } }}
          sx={{
            minWidth: 220,
            '& .MuiInputBase-root, & .MuiOutlinedInput-root, & .MuiSelect-root': {
              bgcolor: '#3c2f23',
              color: '#ebdbb2',
            },
            '& .MuiSelect-select, & .MuiInputBase-input': {
              color: '#ebdbb2',
              bgcolor: '#3c2f23',
            },
            '& .MuiInputLabel-root': { color: '#ebdbb2' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#a89984' },
            '& .MuiMenuItem-root': { color: '#ebdbb2', bgcolor: '#3c2f23' },
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  bgcolor: '#3c2f23',
                  color: '#ebdbb2',
                },
              },
            },
          }}
        >
          {players.map((player: { id: string; name: string }) => (
            <MenuItem key={player.id} value={player.id} sx={{ color: '#ebdbb2', bgcolor: '#3c2f23' }}>{player.name}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ bgcolor: '#b8bb26', color: '#282828' }}>Add Character</Button>
      </Stack>
    </Box>
  );
};

export default CharacterForm;
