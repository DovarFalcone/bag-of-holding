
import React, { useEffect, useState } from "react";
import ContainerList from "./ContainerList";
import ContainerForm from "./ContainerForm";
import useContainers from "./useContainers";
import useCharacters from "../characters/useCharacters";
import { Box, Typography, Paper } from "@mui/material";
import ActionLogTimeline from "../common/ActionLogTimeline";

const ContainerPage: React.FC = () => {
  const {
    containers,
    fetchContainers,
    addContainer,
    removeContainer,
    editContainer
  } = useContainers();
  const [changelogIdx, setChangelogIdx] = useState<number | null>(null);
  const { characters, fetchCharacters } = useCharacters();

  useEffect(() => {
    fetchContainers();
    fetchCharacters();
  }, [fetchContainers, fetchCharacters]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fabd2f' }}>Containers</Typography>
      <Paper sx={{ p: 2, mb: 2, background: '#282828' }}>
        <ContainerForm addContainer={addContainer} characters={characters} />
      </Paper>
      <ContainerList
        containers={containers}
        deleteContainer={removeContainer}
        editContainer={editContainer}
        characters={characters}
        onShowChangelog={setChangelogIdx}
        changelogIdx={changelogIdx}
      />
      {/* Show changelog for selected container only when toggled */}
      {changelogIdx !== null && containers[changelogIdx] && (
        <ActionLogTimeline entityType="container" entityId={containers[changelogIdx].id} />
      )}
    </Box>
  );
};

export default ContainerPage;
