
import React, { useEffect } from "react";
import CoinList from "./CoinList";
import CoinForm from "./CoinForm";
import useCoins from "./useCoins";
import useCharacters from "../characters/useCharacters";
import { Box, Typography, Paper } from "@mui/material";

const CoinsPage: React.FC = () => {
  const {
    coins,
    fetchCoins,
    addCoin,
    removeCoin,
    editCoin
  } = useCoins();
  const { characters, fetchCharacters } = useCharacters();

  useEffect(() => {
    fetchCoins();
    fetchCharacters();
  }, [fetchCoins, fetchCharacters]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fabd2f' }}>Coins</Typography>
      <Paper sx={{ p: 2, mb: 2, background: '#282828' }}>
        <CoinForm addCoin={addCoin} characters={characters} />
      </Paper>
      <CoinList
        coins={coins}
        deleteCoin={removeCoin}
        editCoin={editCoin}
        characters={characters}
      />
    </Box>
  );
};

export default CoinsPage;
