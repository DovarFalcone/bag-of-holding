import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { Character } from "../../types";

const COIN_TYPES = ["Cp", "Sp", "Ep", "Gp", "Pp"];

interface CoinEditDialogProps {
  open: boolean;
  initialCharacterId: string;
  initialCoinType: string;
  initialAmount: number;
  characters: Character[];
  onClose: () => void;
  onSave: (characterId: string, coinType: string, amount: number) => void;
}

const CoinEditDialog: React.FC<CoinEditDialogProps> = ({ open, initialCharacterId, initialCoinType, initialAmount, characters, onClose, onSave }) => {
  const [characterId, setCharacterId] = useState(initialCharacterId);
  const [coinType, setCoinType] = useState(initialCoinType);
  const [amount, setAmount] = useState<string>("");
  React.useEffect(() => {
    setCharacterId(initialCharacterId);
    setCoinType(initialCoinType);
  setAmount("");
  }, [initialCharacterId, initialCoinType, initialAmount, open]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Coin</DialogTitle>
      <DialogContent>
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
        <TextField
          select
          label="Coin Type"
          fullWidth
          value={coinType}
          onChange={e => setCoinType(e.target.value)}
          sx={{ minWidth: 180, mt: 2, color: '#ebdbb2', '& .MuiInputBase-input': { color: '#ebdbb2' }, '& .MuiInputLabel-root': { color: '#a89984' } }}
        >
          {COIN_TYPES.map(type => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={e => {
            const val = e.target.value;
            if (/^-?$|^-?\d*$/.test(val)) setAmount(val);
          }}
          onBlur={() => { if (amount === "" || amount === "-") setAmount("0"); }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9\\-]*" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
  <Button onClick={() => { onSave(characterId, coinType, Number(amount) || 0); onClose(); }} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CoinEditDialog;
