import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

interface PlayerEditDialogProps {
  open: boolean;
  initialName: string;
  onClose: () => void;
  onSave: (name: string) => void;
}

const PlayerEditDialog: React.FC<PlayerEditDialogProps> = ({ open, initialName, onClose, onSave }) => {
  const [name, setName] = useState(initialName);
  React.useEffect(() => { setName(initialName); }, [initialName, open]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Player</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Player Name"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={() => { onSave(name); onClose(); }} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerEditDialog;
