import React, { useState } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";

const PlayerForm = ({ onAdd }: { onAdd: (name: string) => void }) => {
  const [name, setName] = useState("");
  return (
  <Paper sx={{ p: 2, mb: 2, background: '#282828', color: '#ebdbb2' }}>
  <Typography variant="h6" sx={{ color: '#fabd2f' }}>Add Player</Typography>
      <Box
        component="form"
        onSubmit={e => { e.preventDefault(); onAdd(name); setName(""); }}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mt: 1,
          width: '100%'
        }}
      >
        <TextField
          label="Player Name"
          value={name}
          onChange={e => setName(e.target.value)}
          size="small"
          fullWidth
          sx={{ input: { color: '#ebdbb2' }, label: { color: '#a89984' } }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ bgcolor: '#b8bb26', color: '#282828', minWidth: { sm: 120 } }}
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
};

export default PlayerForm;
