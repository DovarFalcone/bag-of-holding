import React, { useState } from "react";
import { Box, Button, MenuItem, TextField, Stack } from "@mui/material";
import { Character } from "../../types";

const COIN_TYPES = ["Cp", "Sp", "Ep", "Gp", "Pp"];

interface CoinFormProps {
  addCoin: (coin: { character_id: string; coin_type: string; amount: number; source?: string | null }) => void;
  characters: Character[];
}

const CoinForm: React.FC<CoinFormProps> = ({ addCoin, characters }) => {
  const [characterId, setCharacterId] = useState("");
  const [coinType, setCoinType] = useState("Gp");
  const [amount, setAmount] = useState<string>("");
  const [source, setSource] = useState("");
  const [customSource, setCustomSource] = useState("");

  const SOURCE_OPTIONS = ["treasure", "loot", "theft", "gift", "custom"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!characterId || !coinType) return;
    let finalSource = source === "custom" ? customSource : source;
  addCoin({ character_id: characterId, coin_type: coinType, amount: Number(amount) || 0, source: finalSource });
  setCharacterId("");
  setCoinType("Gp");
  setAmount("");
  setSource("");
  setCustomSource("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          select
          label="Character"
          value={characterId}
          onChange={e => setCharacterId(e.target.value)}
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
          {characters.map((char) => (
            <MenuItem key={char.id} value={char.id} sx={{ color: '#ebdbb2', bgcolor: '#3c2f23' }}>{char.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Coin Type"
          value={coinType}
          onChange={e => setCoinType(e.target.value)}
          required
          InputLabelProps={{ style: { color: '#ebdbb2' } }}
          sx={{
            minWidth: 180,
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
          {COIN_TYPES.map(type => (
            <MenuItem key={type} value={type} sx={{ color: '#ebdbb2', bgcolor: '#3c2f23' }}>{type}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={e => {
            const val = e.target.value;
            if (/^-?$|^-?\d*$/.test(val)) setAmount(val);
          }}
          onBlur={() => { if (amount === "" || amount === "-") setAmount("0"); }}
          required
          helperText="Negative values allowed (e.g. -10 to subtract)"
          inputProps={{ inputMode: "numeric", pattern: "[0-9\\-]*" }}
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
          label="Source"
          value={source}
          onChange={e => setSource(e.target.value)}
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
          {SOURCE_OPTIONS.map(opt => (
            <MenuItem key={opt} value={opt} sx={{ color: '#ebdbb2', bgcolor: '#3c2f23' }}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</MenuItem>
          ))}
        </TextField>
        {source === "custom" && (
          <TextField
            label="Custom Source"
            value={customSource}
            onChange={e => setCustomSource(e.target.value)}
            required
            sx={{ input: { color: '#ebdbb2' }, label: { color: '#a89984' } }}
          />
        )}
        <Button type="submit" variant="contained" sx={{ bgcolor: '#b8bb26', color: '#282828' }}>Add Coin</Button>
      </Stack>
    </Box>
  );
};

export default CoinForm;
