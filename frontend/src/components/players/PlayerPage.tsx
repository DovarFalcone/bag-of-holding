import React, { useState } from "react";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import PlayerEditDialog from "./PlayerEditDialog";
import PlayerDeleteDialog from "./PlayerDeleteDialog";
import { Box, CircularProgress } from "@mui/material";
import ActionLogTimeline from "../common/ActionLogTimeline";
import { usePlayers } from "./usePlayers";

import { Alert } from "@mui/material";
const PlayerPage = () => {
  const { players, loading, error, add, update, remove } = usePlayers();
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [changelogIdx, setChangelogIdx] = useState<number | null>(null);
  const handleAdd = (name: string) => add(name);
  const handleEdit = (idx: number) => setEditIdx(idx);
  const handleDelete = (idx: number) => setDeleteIdx(idx);
  const handleShowChangelog = (idx: number) => setChangelogIdx(changelogIdx === idx ? null : idx);
  const handleSave = (name: string) => {
    if (editIdx !== null && name) {
      update(players[editIdx].id, name);
    }
    setEditIdx(null);
  };
  const handleConfirmDelete = () => {
    if (deleteIdx !== null) {
      remove(players[deleteIdx].id);
      setDeleteIdx(null);
    }
  };
  return (
    <Box>
      <PlayerForm onAdd={handleAdd} />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading ? <CircularProgress /> : (
        <PlayerList
          players={players.map(p => p.name)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShowChangelog={handleShowChangelog}
          changelogIdx={changelogIdx}
        />
      )}
      <PlayerEditDialog
        open={editIdx !== null}
        initialName={editIdx !== null ? players[editIdx].name : ""}
        onClose={() => setEditIdx(null)}
        onSave={handleSave}
      />
      <PlayerDeleteDialog
        open={deleteIdx !== null}
        name={deleteIdx !== null ? players[deleteIdx].name : ""}
        onClose={() => setDeleteIdx(null)}
        onDelete={handleConfirmDelete}
      />
      {/* Show changelog for selected player only when toggled */}
      {changelogIdx !== null && players[changelogIdx] && (
        <ActionLogTimeline entityType="player" entityId={players[changelogIdx].id} />
      )}
    </Box>
  );
};

export default PlayerPage;
