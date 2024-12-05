import React, { useState, useEffect } from 'react';
import { ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/solid';
import { Card, Typography, Button, Select, Option } from '@material-tailwind/react';
import { Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { message } from 'antd';

export default function ProductCard({ produit, onModalOpen }) {
  const [quantity, setQuantity] = useState('1');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, post, setData, processing, errors } = useForm({
    produit_id: produit.id,
    vendeur_id: produit.vendeur.user_id,
    quantite: quantity,
  });

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => {
    if (onModalOpen) onModalOpen();
    setIsModalOpen(true);
  };

  useEffect(() => {
    return () => {
      if (isModalOpen) {
        closeModal();
      }
    };
  }, [onModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('produit_id', data.produit_id);
    formData.append('vendeur_id', data.vendeur_id);
    formData.append('quantite', data.quantite);

    post(route('Panie.store'), formData, {
      onSuccess: () => {
        closeModal();
        message.success('Produit ajouté au panier avec succès!');
      },      onError: (errors) => {
        if (errors.error) {
          message.error(errors.error);
        } else {
          message.error('Une erreur est survenue lors de l\'ajout au panier.');
        }
      }
    });
  };  useEffect(() => {
    setData('quantite', quantity);
  }, [quantity]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
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
      <Typography variant="h3" color="blue-gray" className="font-medium text-lg text-black mb-3">
        <span className="text-black">Vendeur:</span> {produit.vendeur && produit.vendeur.nom_de_l_entreprise
        }
      </Typography>

      <Typography variant="h3" color="blue-gray" className="font-bold text-xl mb-2 text-gray-800 transition-colors duration-300 hover:text-blue-500">
        {produit.nom}
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

      <div className='flex flex-row items-center justify-between'>
        <div className="flex flex-row gap-4 justify-center items-center">
          <Button onClick={openModal} color="blue" className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-blue-500 hover:bg-blue-600">
            <ShoppingCartIcon className="h-5 w-5 text-white" />
            <span className="text-white">Ajouter</span>
          </Button>
          <Link
            href={route('Produit.show', produit.id)}
            className='flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white shadow-md hover:shadow-lg hover:bg-green-600 transition-all duration-300'
          >
            <EyeIcon className="h-5 w-5" />
            Consulter
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-lg"
            >
              <h2 className="text-xl font-bold mb-4">Ajouter {produit.nom}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="montant" className="block text-sm font-medium text-gray-700">Quantité</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      min="1"
                      max={produit.quantite}
                      onChange={(e) => setQuantity(Math.min(parseInt(e.target.value), produit.quantite))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="Entrez la quantité"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Confirmer
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                  >
                    Annuler
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}