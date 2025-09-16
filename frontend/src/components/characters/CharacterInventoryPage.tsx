import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Item, Character } from "../../types";
import useContainers from "../containers/useContainers";
import useItems from "../inventory/useItems";
import useCharacters from "../characters/useCharacters";
import ContainerList from "../containers/ContainerList";
import ItemList from "../inventory/ItemList";
import { Paper, Typography, Select, MenuItem, Box } from "@mui/material";

const CharacterInventoryPage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const { containers, fetchContainers } = useContainers();
  const { items, fetchItems } = useItems();
  const { characters, fetchCharacters } = useCharacters();
  useEffect(() => {
    fetchCharacters();
    fetchContainers();
    fetchItems();
  }, [fetchCharacters, fetchContainers, fetchItems]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>(characterId || "");

  const characterList = characters || [];
  const containerList = containers.filter(c => c.character_id === selectedCharacter);
  const itemList = items.filter(i => containerList.some(c => c.id === i.container_id));

  return (
    <Box>
      <Typography variant="h4" sx={{ color: '#fabd2f', mb: 2 }}>Character Inventory</Typography>
      <Select
        value={selectedCharacter}
        onChange={e => setSelectedCharacter(e.target.value)}
        displayEmpty
        sx={{
          mb: 3,
          minWidth: 220,
          bgcolor: '#3c2f23',
          color: '#ebdbb2',
          '& .MuiSelect-select': { color: '#ebdbb2', bgcolor: '#3c2f23' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#a89984' },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: '#3c2f23',
              color: '#ebdbb2',
            },
          },
        }}
      >
        <MenuItem value="" disabled sx={{ color: '#a89984', bgcolor: '#3c2f23' }}>Select Character</MenuItem>
        {characterList.map((char: Character) => (
          <MenuItem key={char.id} value={char.id} sx={{ color: '#ebdbb2', bgcolor: '#3c2f23' }}>{char.name}</MenuItem>
        ))}
      </Select>
      {selectedCharacter && (
        <>
          {containerList.length === 0 ? (
            <Typography sx={{ color: '#a89984', mt: 2 }}>No containers for this character.</Typography>
          ) : (
            containerList.map(container => {
              const itemsInContainer = items.filter(i => i.container_id === container.id);
              return (
                <Box key={container.id} sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ color: '#b8bb26', mb: 1 }}>{container.name}</Typography>
                  {itemsInContainer.length === 0 ? (
                    <Typography sx={{ color: '#a89984', ml: 2 }}>No items in this container.</Typography>
                  ) : (
                    <Box sx={{ ml: 2 }}>
                      {itemsInContainer.map(item => (
                        <Box key={item.id} sx={{ borderBottom: '1px solid #504945', py: 1 }}>
                          <Typography sx={{ color: '#ebdbb2', fontWeight: 500 }}>{item.name}</Typography>
                          <Typography sx={{ color: '#a89984', fontSize: 14 }}>{item.description}</Typography>
                          <Typography sx={{ color: '#b8bb26', fontSize: 13 }}>Qty: {item.quantity} | Value: {item.value} gp</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              );
            })
          )}
        </>
      )}
    </Box>
  );
};

export default CharacterInventoryPage;
