import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/containers`;

export interface Container {
  id: string;
  name: string;
  description?: string;
  character_id: string;
}

export type ContainerInput = Omit<Container, "id">;

export async function getContainers(): Promise<Container[]> {
  const res = await axios.get(`${API_URL}/`);
  return res.data;
}

export async function createContainer(container: ContainerInput): Promise<Container> {
  const res = await axios.post(`${API_URL}/`, container);
  return res.data;
}

export async function updateContainer(id: string, container: ContainerInput): Promise<Container> {
  const res = await axios.put(`${API_URL}/${id}`, container);
  return res.data;
}

export async function deleteContainer(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
