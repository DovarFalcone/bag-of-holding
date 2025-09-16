import React, { useEffect } from "react";
import { usePlayers } from "../players/usePlayers";
import useCharacters from "../characters/useCharacters";
import useContainers from "../containers/useContainers";
import useItems from "../inventory/useItems";
import useCoins from "../currency/useCoins";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";

const AdminPanel: React.FC = () => {
  const { players, remove: removePlayer } = usePlayers();
  const { characters, fetchCharacters, deleteCharacter } = useCharacters();
  const { containers, fetchContainers, removeContainer } = useContainers();
  const { items, fetchItems, removeItem } = useItems();
  const { coins, fetchCoins, removeCoin } = useCoins();

  useEffect(() => {
    fetchCharacters();
    fetchContainers();
    fetchItems();
    fetchCoins();
  }, [fetchCharacters, fetchContainers, fetchItems, fetchCoins]);

  return (
    <Box>
      <Typography variant="h4" sx={{ color: '#fabd2f', mb: 3 }}>Admin Panel</Typography>
      <Stack spacing={4}>
        <Paper sx={{ p: 2, background: '#282828' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ color: '#b8bb26' }}>Players</Typography>
            {players.length > 0 && (
              <Button variant="contained" color="error" size="small" onClick={() => players.forEach((player: any) => removePlayer(player.id))}>
                Delete All
              </Button>
            )}
          </Stack>
          {players.length === 0 ? <Typography sx={{ color: '#a89984' }}>No players</Typography> : (
            players.map((player: any) => (
              <Stack key={player.id} direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                <Typography sx={{ color: '#ebdbb2' }}>{player.name}</Typography>
                <Button variant="contained" color="error" size="small" onClick={() => removePlayer(player.id)}>Delete</Button>
              </Stack>
            ))
          )}
        </Paper>
        <Paper sx={{ p: 2, background: '#282828' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ color: '#b8bb26' }}>Characters</Typography>
            {characters.length > 0 && (
              <Button variant="contained" color="error" size="small" onClick={() => characters.forEach((char: any) => deleteCharacter(char.id))}>
                Delete All
              </Button>
            )}
          </Stack>
          {characters.length === 0 ? <Typography sx={{ color: '#a89984' }}>No characters</Typography> : (
            characters.map((char: any) => (
              <Stack key={char.id} direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                <Typography sx={{ color: '#ebdbb2' }}>{char.name}</Typography>
                <Button variant="contained" color="error" size="small" onClick={() => deleteCharacter(char.id)}>Delete</Button>
              </Stack>
            ))
          )}
        </Paper>
        <Paper sx={{ p: 2, background: '#282828' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ color: '#b8bb26' }}>Containers</Typography>
            {containers.length > 0 && (
              <Button variant="contained" color="error" size="small" onClick={() => containers.forEach((cont: any) => removeContainer(cont.id))}>
                Delete All
              </Button>
            )}
          </Stack>
          {containers.length === 0 ? <Typography sx={{ color: '#a89984' }}>No containers</Typography> : (
            containers.map((cont: any) => (
              <Stack key={cont.id} direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                <Typography sx={{ color: '#ebdbb2' }}>{cont.name}</Typography>
                <Button variant="contained" color="error" size="small" onClick={() => removeContainer(cont.id)}>Delete</Button>
              </Stack>
            ))
          )}
        </Paper>
        <Paper sx={{ p: 2, background: '#282828' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ color: '#b8bb26' }}>Items</Typography>
            {items.length > 0 && (
              <Button variant="contained" color="error" size="small" onClick={() => items.forEach((item: any) => removeItem(item.id))}>
                Delete All
              </Button>
            )}
          </Stack>
          {items.length === 0 ? <Typography sx={{ color: '#a89984' }}>No items</Typography> : (
            items.map((item: any) => (
              <Stack key={item.id} direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                <Typography sx={{ color: '#ebdbb2' }}>{item.name}</Typography>
                <Button variant="contained" color="error" size="small" onClick={() => removeItem(item.id)}>Delete</Button>
              </Stack>
            ))
          )}
        </Paper>
        <Paper sx={{ p: 2, background: '#282828' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ color: '#b8bb26' }}>Coins</Typography>
            {coins.length > 0 && (
              <Button variant="contained" color="error" size="small" onClick={() => coins.forEach((coin: any) => removeCoin(coin.id))}>
                Delete All
              </Button>
            )}
          </Stack>
          {coins.length === 0 ? <Typography sx={{ color: '#a89984' }}>No coins</Typography> : (
            coins.map((coin: any) => (
              <Stack key={coin.id} direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                <Typography sx={{ color: '#ebdbb2' }}>{coin.coin_type} ({coin.amount})</Typography>
                <Button variant="contained" color="error" size="small" onClick={() => removeCoin(coin.id)}>Delete</Button>
              </Stack>
            ))
          )}
        </Paper>
      </Stack>
    </Box>
  );
};

export default AdminPanel;
