import React, { useState } from 'react';
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { EyeIcon } from '@heroicons/react/24/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ArrowTurnUpRightIcon } from '@heroicons/react/16/solid';

export default function ProductCard({ produit }) {
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, get, setData, processing, errors } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    get(route('Produit.edit', { id: produit.id }))
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    closeModal();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
      <div className="relative group overflow-hidden rounded-2xl mb-4">
        {produit.image_rubrique && (
          <img
            src={`/storage/${produit.image_rubrique}`}
            alt={produit.nom || 'Product image'}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
      </div>

      <Typography variant="h3" color="blue-gray" className="font-bold text-xl mb-2 text-gray-800 transition-colors duration-300 hover:text-blue-500">
        {produit.nom}
      </Typography>

      <Typography variant="h4" color="blue-gray" className="font-medium text-lg text-gray-700 mb-3">
        <span className="text-gray-600">Vendeur:</span> {produit.vendeur && produit.vendeur.user.name}
      </Typography>

      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-600">Prix unitaire:</p>
        <p className="font-semibold text-indigo-600">{produit.prix} €</p>
      </div>

      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-600">Quantité:</p>
        <p className="font-semibold">{produit.quantite}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">État:</p>
        <p className="font-semibold text-green-600">{produit.etat}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between pt-4 space-x-4">
        <Link
          href={route('Produit.show_vendeur', produit.id)}
          className="flex items-center text-green-500 py-2 px-4 rounded-full font-medium shadow-lg hover:text-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <EyeIcon className="h-5 w-5 mr-2 stroke-2 animate-pulse"/>
        </Link>
        <Button
          onClick={showModal}
          className="flex items-center text-red-500 py-2 px-4 rounded-full font-medium shadow-lg hover:text-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-white"
        >
          <TrashIcon className="h-5 w-5 mr-2 stroke-2 animate-bounce"/>
        </Button>
        
        <form onSubmit={handleSubmit}>
          <button type="submit" className="flex items-center text-yellow-500 py-2 px-4 rounded-full font-medium shadow-lg hover:text-yellow-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <PencilIcon className="h-5 w-5 mr-2 stroke-2" />
          </button>
        </form>
      </div>

      <Dialog open={isModalOpen} handler={closeModal}>
        <DialogHeader>Confirmer la suppression</DialogHeader>
        <DialogBody>
          Êtes-vous sûr de vouloir supprimer ce produit ?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={closeModal} className="mr-1">
            <span>Annuler</span>
          </Button>
          <Button variant="filled" color="green" onClick={handleDelete}>
            <span>Confirmer</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
