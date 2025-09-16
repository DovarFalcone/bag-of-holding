import React, { useEffect, useState } from "react";
import { getActionLogs, ActionLog } from "../../services/actionLogApi";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

interface ActionLogProps {
  entityType: string;
  entityId: string;
  containerId?: string;
  characterId?: string;
}

const ActionLogTimeline: React.FC<ActionLogProps> = ({ entityType, entityId, containerId, characterId }) => {
  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getActionLogs(entityType, entityId).then(data => {
      setLogs(data);
      setLoading(false);
    });
  }, [entityType, entityId]);

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h6" sx={{ color: '#fabd2f', mb: 1 }}>Changelog</Typography>
      {loading ? (
        <Typography sx={{ color: '#a89984' }}>Loading...</Typography>
      ) : logs.length === 0 ? (
        <Typography sx={{ color: '#a89984' }}>No history yet.</Typography>
      ) : (
        <List sx={{ borderLeft: '3px solid #fabd2f', pl: 2 }}>
          {logs.map((log, idx) => (
            <React.Fragment key={log.id}>
              <ListItem alignItems="flex-start" sx={{ position: 'relative', pl: 0 }}>
                <Box sx={{
                  position: 'absolute',
                  left: -32,
                  top: 18,
                  width: 16,
                  height: 16,
                  bgcolor: '#fabd2f',
                  borderRadius: '50%',
                  border: '2px solid #282828',
                  zIndex: 1
                }} />
                <ListItemText
                  primary={<span style={{ color: '#b8bb26', fontWeight: 500 }}>{log.action_type.replace(/_/g, ' ')}</span>}
                  secondary={<>
                    <span style={{ color: '#ebdbb2' }}>{log.description}</span><br />
                    <span style={{ color: '#a89984', fontSize: 12 }}>{new Date(log.timestamp).toLocaleString()}</span>
                  </>}
                />
              </ListItem>
              {idx < logs.length - 1 && <Divider component="li" sx={{ ml: 0, borderColor: '#fabd2f', opacity: 0.3 }} />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ActionLogTimeline;
