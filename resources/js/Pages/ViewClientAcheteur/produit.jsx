import React, { useState } from 'react';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Card, Typography, Button, Select, Option } from '@material-tailwind/react';
import { Link } from '@inertiajs/react';

export default function ProductCard({ produit }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card className="max-w-lg mx-auto p-8 shadow-2xl rounded-3xl bg-gradient-to-br from-white to-gray-100">
      <div className="flex flex-col md:flex-row gap-8">
        {produit.image_rubrique && (
          <div className="relative group">
            <img
              src={`/storage/${produit.image_rubrique}`}
              alt={produit.nom || 'Product image'}
              className="w-full md:w-64 h-64 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-2xl"></div>
          </div>
        )}
        <div className="flex-1 space-y-4">
          <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">
            {produit.nom}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="font-medium text-xl">
            <span className="">le prix:</span>
            {produit.prix} €
          </Typography>
          <div className="space-y-2">
            <Typography variant="small" color="gray" className="font-medium text-xl">
              <span className="w-32">Quantité disponible:</span>
              <span className="font-bold">{produit.quantite}</span>
            </Typography>
            <Typography variant="small" color="gray" className="font-medium items-center text-xl">
              <span className="w-32 ">État:</span>
              <span className="font-bold">{produit.etat}</span>
            </Typography>
          </div>
          <Typography variant="paragraph" color="gray" className="font-medium text-justify">
            {produit.description}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-6 pt-1">
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
    </Card>
  );
}
