
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CharacterEditDialog from './CharacterEditDialog';
import { Player } from '../../types';


interface CharacterListProps {
  characters: { id: string; name: string; player_id: string }[];
  deleteCharacter: (id: string) => void;
  editCharacter: (id: string, character: { name: string; player_id: string }) => void;
  players: Player[];
  onShowChangelog?: (id: string) => void;
  changelogId?: string | null;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, deleteCharacter, editCharacter, players, onShowChangelog, changelogId }) => {
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const getPlayerName = (playerId: string) => {
    const player = players.find((p: { id: string; name: string }) => p.id === playerId);
    return player ? player.name : 'Unknown';
  };

  const handleSave = (name: string, playerId: string) => {
    if (editIdx !== null) {
      const char = characters[editIdx];
      editCharacter(char.id, { name, player_id: playerId });
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
              <TableCell sx={{ color: '#fabd2f' }}>Player</TableCell>
              <TableCell align="right" sx={{ color: '#fabd2f' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...characters]
              .sort((a, b) => {
                if (
                  typeof (a as any).created_at === 'string' &&
                  typeof (b as any).created_at === 'string'
                ) {
                  return new Date((b as any).created_at).getTime() - new Date((a as any).created_at).getTime();
                }
                return 1; // fallback: reverse order
              })
              .map((character, idx) => (
              <TableRow key={character.id}>
                <TableCell sx={{ color: '#ebdbb2' }}>{character.name}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{getPlayerName(character.player_id)}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1}>
                    <IconButton edge="end" aria-label="history" onClick={() => onShowChangelog && onShowChangelog(character.id)}>
                      <HistoryIcon sx={{ color: changelogId === character.id ? '#40c4c4' : '#40c4c4', opacity: changelogId === character.id ? 1 : 0.7 }} />
                    </IconButton>
                    <IconButton sx={{ color: '#fabd2f' }} size="small" onClick={() => setEditIdx(idx)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fb4934' }} size="small" onClick={() => deleteCharacter(character.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CharacterEditDialog
        open={editIdx !== null}
        initialName={editIdx !== null ? characters[editIdx].name : ''}
        initialPlayerId={editIdx !== null ? characters[editIdx].player_id : ''}
        players={players}
        onClose={() => setEditIdx(null)}
        onSave={handleSave}
      />
    </>
  );
};

export default CharacterList;
