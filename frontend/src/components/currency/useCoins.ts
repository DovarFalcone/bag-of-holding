import { useState, useCallback } from "react";
import { Coin, CoinInput, getCoins, createCoin, updateCoin, deleteCoin } from "../../services/coinApi";

const useCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  const fetchCoins = useCallback(async () => {
    const data = await getCoins();
    setCoins(data);
  }, []);

  const addCoin = async (coin: CoinInput) => {
    const newCoin = await createCoin(coin);
    setCoins(prev => [...prev, newCoin]);
    // Re-fetch to ensure backend is source of truth (handles sorting, etc)
    await fetchCoins();
  };

  const editCoin = async (id: string, coin: CoinInput) => {
    const updated = await updateCoin(id, coin);
    setCoins(prev => prev.map(c => c.id === id ? updated : c));
  };

  const removeCoin = async (id: string) => {
    await deleteCoin(id);
    setCoins(prev => prev.filter(c => c.id !== id));
  };

  return { coins, fetchCoins, addCoin, editCoin, removeCoin };
};

export default useCoins;
