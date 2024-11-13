import React, { useState } from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { EyeIcon } from '@heroicons/react/24/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

import Modal from '../../Components/Modal';

export default function ProductCard({ produit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduit, setselectedProduit] = useState(null);

  const {
    data: formData,
    delete: destroy,
    processing: deleteProcessing,
  } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    get(route('Produit.edit', { id: produit.id }))
  };

  const showModal = (produitId) => {
    setselectedProduit(produitId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedProduit !== null) {
      destroy(route('Produit.destroy', selectedProduit), {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          setIsModalOpen(false);
          setselectedProduit(null);
          notification.success({
            message: 'Succès',
            description: 'Produit retiré du panier avec succès',
            placement: 'topRight',
          });
        },
        onError: (error) => {
          notification.error({
            message: 'Erreur',
            description: 'Erreur lors du retirement du panier, veuillez réessayer.',
            placement: 'topRight',
          });
          console.error('Error deleting panie:', error);
        },
      });
    } else {
      setIsModalOpen(false);
      setselectedProduit(null);
    }
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
        Description du produit
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
          <EyeIcon className="h-5 w-5 mr-2 stroke-2 animate-pulse" />
        </Link>
        <Button
          onClick={() => showModal(produit.id)}
          className="flex items-center text-red-500 py-2 px-4 rounded-full font-medium shadow-lg hover:text-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-white"
        >
          <TrashIcon className="h-5 w-5 mr-2 stroke-2 animate-bounce" />
        </Button>

        <form onSubmit={handleSubmit}>
          <button type="submit" className="flex items-center text-yellow-500 py-2 px-4 rounded-full font-medium shadow-lg hover:text-yellow-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <PencilIcon className="h-5 w-5 mr-2 stroke-2" />
          </button>
        </form>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="p-6"
        >
          <h3 className="text-lg font-medium text-gray-900">Confirmer la suppression</h3>
          <p className="mt-2 text-sm text-gray-500">
            Êtes-vous sûr de vouloir supprimer cet article?
          </p>
          <div className="mt-4 flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              onClick={confirmDelete}
            >
              Supprimer
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
              onClick={() => closeModal()}
            >
              Annuler
            </motion.button>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
}