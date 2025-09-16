
import React, { useEffect } from "react";
import ItemList from "./ItemList";
import ItemForm from "./ItemForm";
import useItems from "./useItems";
import useContainers from "../containers/useContainers";
import useCharacters from "../characters/useCharacters";
import { Box, Typography, Paper } from "@mui/material";

const ItemPage: React.FC = () => {
  const {
    items,
    fetchItems,
    addItem,
    removeItem,
    editItem
  } = useItems();
  const { containers, fetchContainers } = useContainers();
  const { characters, fetchCharacters } = useCharacters();

  useEffect(() => {
    fetchItems();
    fetchContainers();
    fetchCharacters();
  }, [fetchItems, fetchContainers, fetchCharacters]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fabd2f' }}>Items</Typography>
      <Paper sx={{ p: 2, mb: 2, background: '#282828' }}>
        <ItemForm addItem={addItem} containers={containers} characters={characters} />
      </Paper>
      <ItemList
        items={items}
        deleteItem={removeItem}
        editItem={editItem}
        containers={containers}
        characters={characters}
      />
    </Box>
  );
};

export default ItemPage;
