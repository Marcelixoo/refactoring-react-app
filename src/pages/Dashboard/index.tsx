import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { toast } from 'react-toastify';

interface Food {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
};

export default function Dashboard() {
  const [foods, setDishes] = useState([] as Food[]);
  const [editingFood, setEditingFood] = useState({} as Food);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    loadDishes();

    async function loadDishes() {
      const response = await api.get<Food[]>('/foods');

      setDishes(response.data);
    }
  }, []);

  const handleAddFood = async (food: Food) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setDishes([...foods, response.data]);
      toast.success(`Prato adicionado com sucesso!`);
    } catch (err) {
      toast.error(JSON.stringify(err));
    }
  }

  const handleUpdateFood = async (food: Food) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setDishes(foodsUpdated);
      toast.success(`Prato atualizado com sucesso!`);
    } catch (err) {
      toast.error(JSON.stringify(err));
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    setDishes(foods.filter(food => food.id !== id));
  }

  const toggleModal = () => setModalOpen(!modalOpen);

  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  const handleEditFood = (food: Food) => {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods && foods.map(food => (
          <Food
            key={food.id}
            food={food}
            handleDelete={handleDeleteFood}
            handleEditFood={handleEditFood}
          />
        ))}
      </FoodsContainer>
    </>
  );
}
