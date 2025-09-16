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
  const [quantity, setQuantity] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [containerId, setContainerId] = useState(initialContainerId);
  const [characterId, setCharacterId] = useState<string>("");
  React.useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
  setQuantity("");
  setValue("");
    setContainerId(initialContainerId);
    // Set characterId based on initialContainerId
    const cont = containers.find(c => c.id === initialContainerId);
    setCharacterId(cont ? cont.character_id : "");
  }, [initialName, initialDescription, initialQuantity, initialValue, initialContainerId, containers, open]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>

        <TextField
          select
          label="Character"
          fullWidth
          value={characterId}
          onChange={e => {
            setCharacterId(e.target.value);
            setContainerId("");
          }}
        >
          {characters.map((char: Character) => (
            <MenuItem key={char.id} value={char.id}>{char.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          minRows={2}
          maxRows={6}
          value={description}
          onChange={e => setDescription(e.target.value)}
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
          sx={{ mt: 2 }}
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
          sx={{ mt: 2 }}
        />

        <TextField
          select
          label="Container"
          fullWidth
          value={containerId}
          onChange={e => setContainerId(e.target.value)}
        >
          {containers.filter((c: Container) => c.character_id === characterId).map((container: Container) => (
            <MenuItem key={container.id} value={container.id}>{container.name}</MenuItem>
          ))}
  </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
  <Button onClick={() => { onSave(name, description, Number(quantity) || 0, Number(value) || 0, containerId); onClose(); }} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ItemEditDialog;
