import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import ItemHistoryDialog from "./ItemHistoryDialog";
import ItemEditDialog from "./ItemEditDialog";




import type { Container, Character, Item } from "../../types";

interface ItemListProps {
  items: Item[];
  deleteItem: (id: string) => void;
  editItem: (id: string, item: Omit<Item, 'id'>) => void;
  containers: Container[];
  characters: Character[];
}

const ItemList: React.FC<ItemListProps> = ({ items, deleteItem, editItem, containers, characters }) => {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);

  const getContainerName = (containerId: string) => {
    const cont = containers.find((c: { id: string; name: string }) => c.id === containerId);
    return cont ? cont.name : "Unknown";
  };

  const handleSave = (name: string, description: string, quantity: number, value: number, containerId: string) => {
    if (editIdx !== null) {
      const item = items[editIdx];
      editItem(item.id, { name, description, quantity, value, container_id: containerId });
    }
    setEditIdx(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ background: '#282828', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fabd2f' }}>Name</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Description</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Quantity</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Value (gp)</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Container</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Created</TableCell>
              <TableCell sx={{ color: '#fabd2f' }}>Edited</TableCell>
              <TableCell align="right" sx={{ color: '#fabd2f' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...items]
              .sort((a, b) => {
                if (a.created_at && b.created_at) {
                  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                }
                return 0;
              })
              .map((item: Item, idx: number) => (
              <TableRow key={item.id}>
                <TableCell sx={{ color: '#ebdbb2' }}>{item.name}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{item.description}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{item.quantity}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{item.value}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{getContainerName(item.container_id)}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{item.created_at ? new Date(item.created_at).toLocaleString(undefined, { hour12: false }) : ''}</TableCell>
                <TableCell sx={{ color: '#ebdbb2' }}>{item.updated_at ? new Date(item.updated_at).toLocaleString(undefined, { hour12: false }) : ''}</TableCell>
                <TableCell align="right">
                  <IconButton sx={{ color: '#b8bb26' }} size="small" onClick={() => setHistoryIdx(idx)} title="View History">
                    <HistoryIcon />
                  </IconButton>
                  <IconButton sx={{ color: '#fabd2f' }} size="small" onClick={() => setEditIdx(idx)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: '#fb4934' }} size="small" onClick={() => deleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ItemEditDialog
        open={editIdx !== null}
        initialName={editIdx !== null ? items[editIdx].name : ''}
        initialDescription={editIdx !== null ? items[editIdx].description || '' : ''}
        initialQuantity={editIdx !== null ? items[editIdx].quantity : 1}
        initialValue={editIdx !== null ? items[editIdx].value : 0}
        initialContainerId={editIdx !== null ? items[editIdx].container_id : ''}
        containers={containers}
        characters={characters}
        onClose={() => setEditIdx(null)}
        onSave={handleSave}
      />
      <ItemHistoryDialog
        open={historyIdx !== null}
        onClose={() => setHistoryIdx(null)}
        itemId={historyIdx !== null ? items[historyIdx].id : ''}
      />
    </>
  );
};

export default ItemList;
