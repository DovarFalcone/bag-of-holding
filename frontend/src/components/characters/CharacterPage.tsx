

import React, { useEffect, useState } from 'react';
import CharacterList from './CharacterList';
import CharacterForm from './CharacterForm';
import useCharacters from './useCharacters';
import { usePlayers } from '../players/usePlayers';
import { Box, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import ActionLogTimeline from '../common/ActionLogTimeline';


const CharacterPage: React.FC = () => {
  const {
    characters,
    fetchCharacters,
    addCharacter,
    deleteCharacter,
    editCharacter
  } = useCharacters();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { players } = usePlayers();
  const [changelogId, setChangelogId] = useState<string | null>(null);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fabd2f' }}>Characters</Typography>
      <Paper sx={{ p: 2, mb: 2, background: '#282828' }}>
        <CharacterForm addCharacter={addCharacter} />
      </Paper>
      <CharacterList
        characters={characters}
        deleteCharacter={(id) => setDeleteId(id)}
        editCharacter={editCharacter}
        players={players}
        onShowChangelog={setChangelogId}
        changelogId={changelogId}
      />
      {/* Show changelog for selected character only when toggled */}
      {changelogId !== null && (
        <ActionLogTimeline entityType="character" entityId={changelogId} />
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Character?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this character? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="primary">Cancel</Button>
          <Button
            onClick={() => {
              if (deleteId !== null) deleteCharacter(deleteId);
              setDeleteId(null);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CharacterPage;
