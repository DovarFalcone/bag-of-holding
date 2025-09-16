import axios from "axios";

const API_URL = "http://localhost:8000/players";

export interface Player {
  id: string;
  name: string;
}

export async function getPlayers(): Promise<Player[]> {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function addPlayer(name: string): Promise<Player> {
  const res = await axios.post(API_URL, { name });
  return res.data;
}

export async function updatePlayer(id: string, name: string): Promise<Player> {
  const res = await axios.put(`${API_URL}/${id}`, { name });
  return res.data;
}

export async function deletePlayer(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
