import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

interface PlayerDeleteDialogProps {
  open: boolean;
  name: string;
  onClose: () => void;
  onDelete: () => void;
}

const PlayerDeleteDialog: React.FC<PlayerDeleteDialogProps> = ({ open, name, onClose, onDelete }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete Player</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to delete <b>{name}</b>?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="inherit">Cancel</Button>
      <Button onClick={() => { onDelete(); onClose(); }} color="error" variant="contained">Delete</Button>
    </DialogActions>
  </Dialog>
);

export default PlayerDeleteDialog;
