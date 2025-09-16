import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { Character } from "../../types";

interface ContainerEditDialogProps {
  open: boolean;
  initialName: string;
  initialDescription: string;
  initialCharacterId: string;
  characters: Character[];
  onClose: () => void;
  onSave: (name: string, description: string, characterId: string) => void;
}

const ContainerEditDialog: React.FC<ContainerEditDialogProps> = ({ open, initialName, initialDescription, initialCharacterId, characters, onClose, onSave }) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [characterId, setCharacterId] = useState(initialCharacterId);
  React.useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
    setCharacterId(initialCharacterId);
  }, [initialName, initialDescription, initialCharacterId, open]);
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { bgcolor: '#4e3d2c' } }}>
      <DialogTitle sx={{ color: '#ebdbb2' }}>Edit/Transfer Container</DialogTitle>
      <DialogContent sx={{ bgcolor: '#4e3d2c' }}>
        <TextField
          autoFocus
          margin="dense"
          label="Container Name"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
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
          margin="dense"
          label="Description"
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
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
          label="Character"
          fullWidth
          value={characterId}
          onChange={e => setCharacterId(e.target.value)}
          InputLabelProps={{ style: { color: '#ebdbb2' } }}
          sx={{
            minWidth: 220, mt: 2,
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
          {characters.map((char) => (
            <MenuItem key={char.id} value={char.id} sx={{ color: '#ebdbb2', bgcolor: '#3c2f23' }}>{char.name}</MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={() => { onSave(name, description, characterId); onClose(); }} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContainerEditDialog;
