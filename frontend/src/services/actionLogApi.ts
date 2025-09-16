import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/action-logs`;

export interface ActionLog {
  id: string;
  entity_type: string;
  entity_id: string;
  action_type: string;
  description: string;
  timestamp: string;
  user?: string | null;
}

export async function getActionLogs(entity_type: string, entity_id: string): Promise<ActionLog[]> {
  const res = await axios.get(`${API_URL}/`, { params: { entity_type, entity_id } });
  return res.data;
}
