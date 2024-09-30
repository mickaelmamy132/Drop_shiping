import React, { useState } from 'react';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Card, Typography, Button, Select, Option } from '@material-tailwind/react';
import { Link } from '@inertiajs/react';

export default function ProductCard({ produit }) {
  const [quantity, setQuantity] = useState(1);

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
        </Select>

        <Button color="blue" className="font-medium flex items-center rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-500 hover:bg-blue-600">
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          Ajouter au panier
        </Button>

        <Link
          href={route('Produit.show', produit.id)}
          className='bg-green-500 text-white px-8 py-3.5 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-green-600 transition-all duration-300'
        >
          Consulter
        </Link>
      </div>
    </div>

  );
}
