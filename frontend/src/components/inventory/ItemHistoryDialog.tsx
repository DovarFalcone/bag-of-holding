import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ActionLogTimeline from "../common/ActionLogTimeline";


interface ItemHistoryDialogProps {
  open: boolean;
  onClose: () => void;
  itemId: string;
  containerId?: string;
  characterId?: string;
}

const ItemHistoryDialog: React.FC<ItemHistoryDialogProps> = ({ open, onClose, itemId, containerId, characterId }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>
      Item History
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8, color: '#a89984' }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <ActionLogTimeline entityType="item" entityId={itemId} containerId={containerId} characterId={characterId} />
    </DialogContent>
  </Dialog>
);

export default ItemHistoryDialog;
