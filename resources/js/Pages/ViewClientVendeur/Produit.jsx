import React, { useState } from 'react';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Card, Typography, Button, Select, Option } from '@material-tailwind/react';
import { Link } from '@inertiajs/react';

// Exemple de données de produit
const product = {
  name: "Nom du produit",
  price: "$99.99",
  status: "premier main",
  description: "Description détaillée du produit. Cette section peut contenir des spécifications et autres informations pertinentes.",
  images: [
    "@images/imm.png')",
  ],
  availability: "En stock",
};

export default function ProductCard() {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card className="max-w-lg mx-auto p-6 shadow-lg">
      <div className="flex gap-6">
        <img
          src={product.images}
          
          className="w-48 h-48 object-cover rounded-lg"
        />
        <div className="flex-1">
          <Typography variant="h5" color="blue-gray" className="font-bold mb-2">
            {product.name}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="font-medium mb-2">
            {product.price}
          </Typography>
          <Typography variant="small" color="gray" className="font-medium mb-2">
            {product.availability}
          </Typography>
          <Typography variant="small" color="gray" className="font-medium mb-2">
            {product.status}
          </Typography>
          <Typography variant="small" color="gray" className="mb-4 font-medium">
            {product.description}
          </Typography>
          <div className="flex items-center justify-between gap-1">
            <Select
              label="Quantité"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 font-medium"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <Option key={num} value={num}>
                  {num}
                </Option>
              ))}
            </Select>
            <Button color="blue" className="font-medium flex items-center rounded">
              <ShoppingCartIcon className="h-4 w-5 mr-2" />
              Ajouter au panier
            </Button>
            <Link
              href={route('consulter_article')} className='bg-green-400 px-1 rounded py-1'
            >
              consulter
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
