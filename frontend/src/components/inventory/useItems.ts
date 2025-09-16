import { useState, useCallback } from "react";
import { Item, ItemInput, getItems, createItem, updateItem, deleteItem } from "../../services/itemApi";

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = useCallback(async () => {
    const data = await getItems();
    setItems(data);
  }, []);

  const addItem = async (item: ItemInput) => {
    const newItem = await createItem(item);
    setItems(prev => [...prev, newItem]);
  };

  const editItem = async (id: string, item: ItemInput) => {
    const updated = await updateItem(id, item);
    setItems(prev => prev.map(i => i.id === id ? updated : i));
  };

  const removeItem = async (id: string) => {
    await deleteItem(id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return { items, fetchItems, addItem, editItem, removeItem };
};

export default useItems;
