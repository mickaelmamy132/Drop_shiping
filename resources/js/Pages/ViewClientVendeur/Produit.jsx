import React, { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Card, Typography, Button } from '@material-tailwind/react';
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';


export default function ProductCard({ produit }) {
  const [quantity, setQuantity] = useState(1);

  const { data, get, setData, processing, errors } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    get(route('Produit.edit', { id: produit.id }))
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

      <div className="flex flex-wrap items-center gap-4 pt-6">
        {/* 
        <Select
          label="Quantité"
          value={quantity}
          onChange={(e) => setQuantity(string(e.target.value))}
          className="w-32 font-medium"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <Option key={num} value={num}>
              {num}
            </Option>
          ))}
        </Select> */}
        <Link
          href={route('Produit.show_vendeur', produit.id)}
          className="bg-green-500 text-white py-2 px-4 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
        >
          Consulter
        </Link>
        <form onSubmit={handleSubmit} className='flex gap-2'>
          <button type="submit" className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-yellow-500 hover:bg-yellow-600  text-white font-bold py-2 px-4 rounded-full">
            modifier
          </button>
        </form>
      </div>

    </div>
  );
}
