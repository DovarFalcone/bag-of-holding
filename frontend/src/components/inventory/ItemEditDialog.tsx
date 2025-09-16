import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";





import type { Container, Character } from "../../types";

interface ItemEditDialogProps {
  open: boolean;
  initialName: string;
  initialDescription: string;
  initialQuantity: number;
  initialValue: number;
  initialContainerId: string;
  containers: Container[];
  characters: Character[];
  onClose: () => void;
  onSave: (name: string, description: string, quantity: number, value: number, containerId: string) => void;
}



const ItemEditDialog: React.FC<ItemEditDialogProps> = ({ open, initialName, initialDescription, initialQuantity, initialValue, initialContainerId, containers, characters, onClose, onSave }) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [quantity, setQuantity] = useState<string>(initialQuantity !== undefined ? String(initialQuantity) : "");
  const [value, setValue] = useState<string>(initialValue !== undefined ? String(initialValue) : "");
  const [containerId, setContainerId] = useState(initialContainerId);
  const [characterId, setCharacterId] = useState<string>("");
  React.useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
    setQuantity(initialQuantity !== undefined ? String(initialQuantity) : "");
    setValue(initialValue !== undefined ? String(initialValue) : "");
    setContainerId(initialContainerId);
  // Set characterId based on initialContainerId
  const cont = containers.find(c => c.id === initialContainerId);
  setCharacterId(cont ? cont.character_id : "");
  }, [initialName, initialDescription, initialQuantity, initialValue, initialContainerId, containers, open]);
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { bgcolor: '#4e3d2c' } }}>
      <DialogTitle sx={{ color: '#ebdbb2' }}>Edit Item</DialogTitle>
      <DialogContent sx={{ bgcolor: '#4e3d2c' }}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
          InputLabelProps={{ style: { color: '#ebdbb2' } }}
          sx={{
            mt: 2,
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
        <div style={{ marginTop: 16, marginBottom: 4 }}>
          <span style={{ color: '#fabd2f', fontWeight: 600, fontSize: 15 }}>Character</span>
        </div>
        <TextField
          select
          label="Character"
          fullWidth
          value={characterId}
          onChange={e => {
            setCharacterId(e.target.value);
            setContainerId("");
          }}
          InputLabelProps={{ style: { color: '#ebdbb2' } }}
          sx={{
            mt: 0,
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
          {characters.map((char: Character) => (
            <MenuItem key={char.id} value={char.id} sx={{ color: '#ebdbb2', bgcolor: '#3c2f23' }}>{char.name}</MenuItem>
          ))}
        </TextField>
        <div style={{ marginTop: 16, marginBottom: 4 }}>
          <span style={{ color: '#fabd2f', fontWeight: 600, fontSize: 15 }}>Container</span>
        </div>
        <TextField
          select
          label="Container"
          fullWidth
          value={containerId}
          onChange={e => setContainerId(e.target.value)}
          InputLabelProps={{ style: { color: '#ebdbb2' } }}
          sx={{
            mt: 0,
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
          disabled={!characterId}
        >
          {containers.filter((container: Container) => container.character_id === characterId).length === 0 ? (
            <MenuItem value="" disabled>No containers available</MenuItem>
          ) : (
            containers.filter((container: Container) => container.character_id === characterId).map((container: Container) => (
              <MenuItem key={container.id} value={container.id} sx={{ color: '#ebdbb2', bgcolor: '#3c2f23' }}>{container.name}</MenuItem>
            ))
          )}
        </TextField>
        <TextField
          label="Description"
          fullWidth
          multiline
          minRows={2}
          maxRows={6}
          value={description}
          onChange={e => setDescription(e.target.value)}
          InputLabelProps={{ style: { color: '#ebdbb2' } }}
          sx={{
            mt: 2,
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
          label="Quantity"
          type="number"
          fullWidth
          value={quantity}
          onChange={e => {
            const val = e.target.value;
            if (/^-?$|^-?\d*$/.test(val)) setQuantity(val);
          }}
          onBlur={() => { if (quantity === "" || quantity === "-") setQuantity("0"); }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9\\-]*" }}
          InputLabelProps={{ style: { color: '#ebdbb2' } }}
          sx={{
            mt: 2,
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
          label="Value (gp)"
          type="number"
          fullWidth
          value={value}
          onChange={e => {
            const val = e.target.value;
            if (/^-?$|^-?\d*$/.test(val)) setValue(val);
          }}
          onBlur={() => { if (value === "" || value === "-") setValue("0"); }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9\\-]*" }}
          InputLabelProps={{ style: { color: '#ebdbb2' } }}
          sx={{
            mt: 2,
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

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={() => { onSave(name, description, Number(quantity) || 0, Number(value) || 0, containerId); onClose(); }} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ItemEditDialog;
