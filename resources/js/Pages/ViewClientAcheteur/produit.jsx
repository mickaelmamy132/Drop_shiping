import React, { useState } from 'react';
import { StarIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/solid';
import { Card, Typography, Button, Select, Option } from '@material-tailwind/react';
import { Link } from '@inertiajs/react';

export default function ProductCard({ produit }) {
  const [quantity, setQuantity] = useState('1');

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
 
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <Select
          label="Quantité"
          value={quantity}
          onChange={(e) => setQuantity(e)}
          className="w-full sm:w-32 font-medium mb-4 sm:mb-0"
        >
          {[...Array(produit.quantite)].map((_, index) => (
            <Option key={index + 1} value={(index + 1).toString()}>
              {index + 1}
            </Option>
          ))}
        </Select>
        <div className="flex gap-4 justify-center sm:justify-end">
          <Button color="blue" className="font-medium flex items-center justify-center w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-500 hover:bg-blue-600">
            <ShoppingCartIcon className="h-5 w-5" />
          </Button>
          <Link
            href={route('Produit.show', produit.id)}
            className='bg-green-500 text-white flex items-center justify-center w-12 h-12 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-green-600 transition-all duration-300'
          >
            <EyeIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}