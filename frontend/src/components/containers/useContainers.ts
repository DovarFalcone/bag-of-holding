import { useState, useCallback } from "react";
import { Container, ContainerInput, getContainers, createContainer, updateContainer, deleteContainer } from "../../services/containerApi";

const useContainers = () => {
  const [containers, setContainers] = useState<Container[]>([]);

  const fetchContainers = useCallback(async () => {
    const data = await getContainers();
    setContainers(data);
  }, []);

  const addContainer = async (container: ContainerInput) => {
    const newContainer = await createContainer(container);
    setContainers(prev => [...prev, newContainer]);
  };

  const editContainer = async (id: string, container: ContainerInput) => {
    const updated = await updateContainer(id, container);
    setContainers(prev => prev.map(c => c.id === id ? updated : c));
  };

  const removeContainer = async (id: string) => {
    await deleteContainer(id);
    setContainers(prev => prev.filter(c => c.id !== id));
  };

  return { containers, fetchContainers, addContainer, editContainer, removeContainer };
};

export default useContainers;
