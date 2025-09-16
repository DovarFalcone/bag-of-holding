import React from "react";
import { List, ListItem, ListItemText, IconButton, Paper, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";

interface PlayerListProps {
  players: string[];
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
  onShowChangelog?: (idx: number) => void;
  changelogIdx?: number | null;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onEdit, onDelete, onShowChangelog, changelogIdx }) => (
  <Paper sx={{ p: 2, background: '#282828', color: '#ebdbb2' }}>
    <List>
      {players.map((name, idx) => (
        <ListItem key={idx} divider
          secondaryAction={
            <Stack direction="row" spacing={1}>
              <IconButton edge="end" aria-label="history" onClick={() => onShowChangelog && onShowChangelog(idx)}>
                <HistoryIcon sx={{ color: changelogIdx === idx ? '#40c4c4' : '#40c4c4', opacity: changelogIdx === idx ? 1 : 0.7 }} />
              </IconButton>
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(idx)}>
                <EditIcon sx={{ color: '#fabd2f' }} />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(idx)}>
                <DeleteIcon sx={{ color: '#fb4934' }} />
              </IconButton>
            </Stack>
          }
        >
          <ListItemText primary={name} primaryTypographyProps={{ sx: { color: '#ebdbb2' } }} />
        </ListItem>
      ))}
    </List>
  </Paper>
);
export default PlayerList;
