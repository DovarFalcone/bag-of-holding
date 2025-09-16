import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/coins`;

export interface Coin {
  id: string;
  character_id: string;
  coin_type: string;
  amount: number;
  gp_value: number;
  source?: string | null;
}

export type CoinInput = {
  character_id: string;
  coin_type: string;
  amount: number;
  source?: string | null;
};

export async function getCoins(): Promise<Coin[]> {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function createCoin(coin: CoinInput): Promise<Coin> {
  const res = await axios.post(API_URL, coin);
  return res.data;
}

export async function updateCoin(id: string, coin: CoinInput): Promise<Coin> {
  const res = await axios.put(`${API_URL}/${id}`, coin);
  return res.data;
}

export async function deleteCoin(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
