import { useEffect, useState } from "react";
import { Player, getPlayers, addPlayer, updatePlayer, deletePlayer } from "../../services/playerApi";

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPlayers()
      .then(data => {
        setPlayers(data);
        setError(null);
      })
      .catch(e => {
        setError("Failed to load players");
      })
      .finally(() => setLoading(false));
  }, []);

  const add = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const newPlayer = await addPlayer(name);
      setPlayers(players => [...players, newPlayer]);
    } catch (e) {
      setError("Failed to add player");
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updatePlayer(id, name);
      setPlayers(players => players.map(p => (p.id === id ? updated : p)));
    } catch (e) {
      setError("Failed to update player");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deletePlayer(id);
      setPlayers(players => players.filter(p => p.id !== id));
    } catch (e) {
      setError("Failed to delete player");
    } finally {
      setLoading(false);
    }
  };

  return { players, loading, error, add, update, remove };
}
