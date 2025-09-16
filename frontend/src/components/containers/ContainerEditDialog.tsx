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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit/Transfer Container</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Container Name"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <TextField
          select
          label="Character"
          fullWidth
          value={characterId}
          onChange={e => setCharacterId(e.target.value)}
          sx={{ minWidth: 220, mt: 2, color: '#ebdbb2', '& .MuiInputBase-input': { color: '#ebdbb2' }, '& .MuiInputLabel-root': { color: '#a89984' } }}
        >
          {characters.map((char) => (
            <MenuItem key={char.id} value={char.id}>{char.name}</MenuItem>
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
