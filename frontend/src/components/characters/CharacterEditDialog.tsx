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
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { bgcolor: '#4e3d2c' } }}>
      <DialogTitle sx={{ color: '#ebdbb2' }}>Edit/Transfer Character</DialogTitle>
      <DialogContent sx={{ bgcolor: '#4e3d2c' }}>
        <TextField
          autoFocus
          margin="dense"
          label="Character Name"
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
          select
          label="Player"
          fullWidth
          value={playerId}
          onChange={e => setPlayerId(e.target.value)}
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
          {players.map((player) => (
            <MenuItem key={player.id} value={player.id} sx={{ color: '#ebdbb2', bgcolor: '#3c2f23' }}>{player.name}</MenuItem>
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
