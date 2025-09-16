import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CoinEditDialog from "./CoinEditDialog";
import { Character } from "../../types";
import { coinToGp, formatGpValue } from "./coinUtils";

interface CoinListProps {
  coins: { id: string; character_id: string; coin_type: string; amount: number; gp_value: number; source?: string | null }[];
  deleteCoin: (id: string) => void;
  editCoin: (id: string, coin: { character_id: string; coin_type: string; amount: number }) => void;
  characters: Character[];
}

const CoinList: React.FC<CoinListProps> = ({ coins, deleteCoin, editCoin, characters }) => {
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const getCharacterName = (characterId: string) => {
    const char = characters.find((c: { id: string; name: string }) => c.id === characterId);
    return char ? char.name : "Unknown";
  };

  const handleSave = (characterId: string, coinType: string, amount: number) => {
    if (editIdx !== null) {
      const coin = coins[editIdx];
      editCoin(coin.id, { character_id: characterId, coin_type: coinType, amount });
    }
    setEditIdx(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ background: '#282828', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fabd2f' }}>Character</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Coin Type</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Amount</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Source</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>GP Value</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Created</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Edited</TableCell>
              <TableCell align="right" sx={{ color: '#fabd2f' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...coins]
              .sort((a, b) => {
                if (
                  typeof (a as any).created_at === 'string' &&
                  typeof (b as any).created_at === 'string'
                ) {
                  return new Date((b as any).created_at).getTime() - new Date((a as any).created_at).getTime();
                }
                return 1; // fallback: reverse order
              })
              .map((coin, idx) => (
              <TableRow key={coin.id}>
                <TableCell sx={{ color: '#ebdbb2' }}>{getCharacterName(coin.character_id)}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{coin.coin_type}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{coin.amount}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{coin.source || ''}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{formatGpValue(coinToGp(coin.coin_type, coin.amount))}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{(coin as any).created_at ? new Date((coin as any).created_at).toLocaleString(undefined, { hour12: false }) : ''}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{(coin as any).updated_at ? new Date((coin as any).updated_at).toLocaleString(undefined, { hour12: false }) : ''}</TableCell>
                <TableCell align="right">
                  <IconButton sx={{ color: '#fabd2f' }} size="small" onClick={() => setEditIdx(idx)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: '#fb4934' }} size="small" onClick={() => deleteCoin(coin.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CoinEditDialog
        open={editIdx !== null}
        initialCharacterId={editIdx !== null ? coins[editIdx].character_id : ''}
        initialCoinType={editIdx !== null ? coins[editIdx].coin_type : 'Gp'}
        initialAmount={editIdx !== null ? coins[editIdx].amount : 0}
        characters={characters}
        onClose={() => setEditIdx(null)}
        onSave={handleSave}
      />
    </>
  );
};

export default CoinList;
