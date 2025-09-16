import React, { useEffect, useMemo } from "react";
import useCoins from "./useCoins";
import useCharacters from "../characters/useCharacters";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { coinToGp, formatGpValue } from "./coinUtils";

const CoinPursePage: React.FC = () => {
  const { coins, fetchCoins } = useCoins();
  const { characters, fetchCharacters } = useCharacters();

  useEffect(() => {
    fetchCoins();
    fetchCharacters();
  }, [fetchCoins, fetchCharacters]);

  // Group coins by character
  const coinsByCharacter = useMemo(() => {
    const map: Record<string, { name: string; coins: { coin_type: string; amount: number; gp_value: number }[] }> = {};
    characters.forEach(char => {
      map[char.id] = { name: char.name, coins: [] };
    });
    coins.forEach(coin => {
      if (map[coin.character_id]) {
        // Find or create the group for this coin type
        let group = map[coin.character_id].coins.find(c => c.coin_type === coin.coin_type);
        if (!group) {
          group = { coin_type: coin.coin_type, amount: 0, gp_value: 0 };
          map[coin.character_id].coins.push(group);
        }
        group.amount += coin.amount;
        group.gp_value += coinToGp(coin.coin_type, coin.amount);
      }
    });
    return map;
  }, [coins, characters]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fabd2f' }}>Coin Purse</Typography>
      {Object.entries(coinsByCharacter).map(([charId, { name, coins }]) => (
        <Paper key={charId} sx={{ p: 2, mb: 4, background: '#282828' }}>
          <Typography variant="h6" sx={{ color: '#b8bb26' }}>{name}</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#fabd2f' }}>Coin Type</TableCell>
                  <TableCell sx={{ color: '#fabd2f' }}>Amount</TableCell>
                  <TableCell sx={{ color: '#fabd2f' }}>GP Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ color: '#a89984' }}>No coins</TableCell>
                  </TableRow>
                ) : (
                  <>
                    {coins.map((coin, idx) => (
                      <TableRow key={idx}>
                        <TableCell sx={{ color: '#ebdbb2' }}>{coin.coin_type}</TableCell>
                        <TableCell sx={{ color: '#ebdbb2' }}>{coin.amount}</TableCell>
                        <TableCell sx={{ color: '#ebdbb2' }}>{formatGpValue(coin.gp_value)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell sx={{ color: '#fabd2f', fontWeight: 'bold' }}>Total</TableCell>
                      <TableCell />
                      <TableCell sx={{ color: '#fabd2f', fontWeight: 'bold' }}>
                        {formatGpValue(coins.reduce((sum, c) => sum + (typeof c.gp_value === 'number' ? c.gp_value : 0), 0))}
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ))}
    </Box>
  );
};

export default CoinPursePage;
