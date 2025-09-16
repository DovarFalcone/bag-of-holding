
interface ItemFormProps {
  addItem: (item: { name: string; description?: string; quantity: number; value: number; container_id: string }) => void;
  containers: Container[];
  characters: Character[];
}
import React, { useState } from "react";
import { Box, Button, MenuItem, TextField, Stack } from "@mui/material";
import type { Container, Character } from "../../types";





const ItemForm: React.FC<ItemFormProps> = ({ addItem, containers, characters }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [characterId, setCharacterId] = useState("");
  const [containerId, setContainerId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !containerId) return;
  addItem({ name, description, quantity: Number(quantity) || 0, value: Number(value) || 0, container_id: containerId });
  setName("");
  setDescription("");
  setQuantity("");
  setValue("");
  setContainerId("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ width: '100%' }}
      >
        <TextField
          label="Item Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          fullWidth
          sx={{ input: { color: '#ebdbb2' }, label: { color: '#a89984' }, minWidth: { sm: 180 } }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          fullWidth
          sx={{ input: { color: '#ebdbb2' }, label: { color: '#a89984' }, minWidth: { sm: 180 } }}
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={e => {
            const val = e.target.value;
            if (/^-?$|^-?\d*$/.test(val)) setQuantity(val);
          }}
          onBlur={() => { if (quantity === "" || quantity === "-") setQuantity("0"); }}
          required
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9\\-]*" }}
          sx={{ input: { color: '#ebdbb2' }, label: { color: '#a89984' }, minWidth: { sm: 120 } }}
        />
        <TextField
          label="Value (gp)"
          type="number"
          value={value}
          onChange={e => {
            const val = e.target.value;
            if (/^-?$|^-?\d*$/.test(val)) setValue(val);
          }}
          onBlur={() => { if (value === "" || value === "-") setValue("0"); }}
          required
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9\\-]*" }}
          sx={{ input: { color: '#ebdbb2' }, label: { color: '#a89984' }, minWidth: { sm: 120 } }}
        />
        <TextField
          select
          label="Character"
          value={characterId}
          onChange={e => {
            setCharacterId(e.target.value);
            setContainerId("");
          }}
          required
          fullWidth
          sx={{ minWidth: { sm: 180 }, color: '#ebdbb2' }}
        >
          {characters.map((char: Character) => (
            <MenuItem key={char.id} value={char.id}>{char.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Container"
          value={containerId}
          onChange={e => setContainerId(e.target.value)}
          required
          fullWidth
          sx={{ minWidth: { sm: 260 }, color: '#ebdbb2' }}
        >
          {containers.filter((c: Container) => c.character_id === characterId).map((container: Container) => (
            <MenuItem key={container.id} value={container.id}>
              {container.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ bgcolor: '#b8bb26', color: '#282828', minWidth: { sm: 120 } }}
        >
          Add Item
        </Button>
      </Stack>
    </Box>
  );
};

export default ItemForm;
