export interface Coin {
  id: string;
  character_id: string;
  coin_type: string;
  amount: number;
  gp_value: number;
  created_at: string;
  updated_at?: string;
}
export interface Container {
  id: string;
  name: string;
  description?: string;
  character_id: string;
}
export interface Player {
  id: string;
  name: string;
}

export interface Character {
  id: string;
  name: string;
  player_id: string;
}

export interface Item {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  value: number;
  container_id: string;
  created_at: string;
  updated_at?: string;
}
