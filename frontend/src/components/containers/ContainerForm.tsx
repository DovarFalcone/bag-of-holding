import React, { useState, useEffect } from "react";
import { Box, Button, MenuItem, TextField, Stack } from "@mui/material";
import { Character } from "../../types";

interface ContainerFormProps {
  addContainer: (container: { name: string; description?: string; character_id: string }) => void;
  characters: Character[];
}

const ContainerForm: React.FC<ContainerFormProps> = ({ addContainer, characters }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [characterId, setCharacterId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !characterId) return;
    addContainer({ name, description, character_id: characterId });
    setName("");
    setDescription("");
    setCharacterId("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Container Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          sx={{ input: { color: '#ebdbb2' }, label: { color: '#a89984' } }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          sx={{ input: { color: '#ebdbb2' }, label: { color: '#a89984' } }}
        />
        <TextField
          select
          label="Character"
          value={characterId}
          onChange={e => setCharacterId(e.target.value)}
          required
          sx={{ minWidth: 220, color: '#ebdbb2', '& .MuiInputBase-input': { color: '#ebdbb2' }, '& .MuiInputLabel-root': { color: '#a89984' } }}
        >
          {characters.map((char) => (
            <MenuItem key={char.id} value={char.id}>{char.name}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ bgcolor: '#b8bb26', color: '#282828' }}>Add Container</Button>
      </Stack>
    </Box>
  );
};

export default ContainerForm;
