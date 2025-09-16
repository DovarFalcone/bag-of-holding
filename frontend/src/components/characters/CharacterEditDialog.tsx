import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { Player } from "../../types";

interface CharacterEditDialogProps {
  open: boolean;
  initialName: string;
  initialPlayerId: string;
  players: Player[];
  onClose: () => void;
  onSave: (name: string, playerId: string) => void;
}

const CharacterEditDialog: React.FC<CharacterEditDialogProps> = ({ open, initialName, initialPlayerId, players, onClose, onSave }) => {
  const [name, setName] = useState(initialName);
  const [playerId, setPlayerId] = useState(initialPlayerId);
  useEffect(() => {
    setName(initialName);
    setPlayerId(initialPlayerId);
  }, [initialName, initialPlayerId, open]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit/Transfer Character</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Character Name"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          select
          label="Player"
          fullWidth
          value={playerId}
          onChange={e => setPlayerId(e.target.value)}
          sx={{ minWidth: 220, mt: 2, color: '#ebdbb2', '& .MuiInputBase-input': { color: '#ebdbb2' }, '& .MuiInputLabel-root': { color: '#a89984' } }}
        >
          {players.map((player) => (
            <MenuItem key={player.id} value={player.id}>{player.name}</MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={() => { onSave(name, playerId); onClose(); }} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CharacterEditDialog;
