import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';
import { FoodType } from '../../types';

type ModalAddFoodProps = {
  isOpen: boolean;
  toggleModal: () => void;
  handleAddFood: (food: FoodType) => void;
}

const ModalAddFood = ({ isOpen, toggleModal, handleAddFood }: ModalAddFoodProps) => {
  const formRef = createRef<FormHandles>();

  const handleSubmit = async (food: FoodType) => {
    handleAddFood(food);
    toggleModal();
  };

  return (
    <Modal isOpen={isOpen} toggleModal={toggleModal}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
