import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/items`;

export interface Item {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  value: number;
  container_id: string;
}

export type ItemInput = Omit<Item, "id">;

export async function getItems(): Promise<Item[]> {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function createItem(item: ItemInput): Promise<Item> {
  const res = await axios.post(API_URL, item);
  return res.data;
}

export async function updateItem(id: string, item: ItemInput): Promise<Item> {
  const res = await axios.put(`${API_URL}/${id}`, item);
  return res.data;
}

export async function deleteItem(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
