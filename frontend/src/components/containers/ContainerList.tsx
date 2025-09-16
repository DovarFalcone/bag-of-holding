import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContainerEditDialog from "./ContainerEditDialog";
import { Character } from "../../types";


interface ContainerListProps {
  containers: { id: string; name: string; description?: string; character_id: string }[];
  deleteContainer: (id: string) => void;
  editContainer: (id: string, container: { name: string; description?: string; character_id: string }) => void;
  characters: Character[];
  onShowChangelog?: (id: string) => void;
  changelogId?: string | null;
}

const ContainerList: React.FC<ContainerListProps> = ({ containers, deleteContainer, editContainer, characters, onShowChangelog, changelogId }) => {
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const getCharacterName = (characterId: string) => {
    const char = characters.find((c: { id: string; name: string }) => c.id === characterId);
    return char ? char.name : "Unknown";
  };

  const handleSave = (name: string, description: string, characterId: string) => {
    if (editIdx !== null) {
      const cont = containers[editIdx];
      editContainer(cont.id, { name, description, character_id: characterId });
    }
    setEditIdx(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ background: '#282828' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fabd2f' }}>Name</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Description</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Character</TableCell>
              <TableCell align="right" sx={{ color: '#fabd2f' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...containers]
              .sort((a, b) => {
                if (
                  typeof (a as any).created_at === 'string' &&
                  typeof (b as any).created_at === 'string'
                ) {
                  return new Date((b as any).created_at).getTime() - new Date((a as any).created_at).getTime();
                }
                return 1; // fallback: reverse order
              })
              .map((container, idx) => (
              <TableRow key={container.id}>
                <TableCell sx={{ color: '#ebdbb2' }}>{container.name}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{container.description}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{getCharacterName(container.character_id)}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1}>
                    <IconButton edge="end" aria-label="history" onClick={() => onShowChangelog && onShowChangelog(container.id)}>
                      <HistoryIcon sx={{ color: changelogId === container.id ? '#40c4c4' : '#40c4c4', opacity: changelogId === container.id ? 1 : 0.7 }} />
                    </IconButton>
                    <IconButton sx={{ color: '#fabd2f' }} size="small" onClick={() => setEditIdx(idx)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fb4934' }} size="small" onClick={() => deleteContainer(container.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ContainerEditDialog
        open={editIdx !== null}
        initialName={editIdx !== null ? containers[editIdx].name : ''}
        initialDescription={editIdx !== null ? containers[editIdx].description || '' : ''}
        initialCharacterId={editIdx !== null ? containers[editIdx].character_id : ''}
        characters={characters}
        onClose={() => setEditIdx(null)}
        onSave={handleSave}
      />
    </>
  );
};

export default ContainerList;
