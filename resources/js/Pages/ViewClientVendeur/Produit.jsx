import React, { useState } from 'react';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Card, CardBody, CardHeader, Typography, Button, Select, Option } from '@material-tailwind/react';

// Exemple de données de produit
const product = {
  name: "Nom du produit",
  price: "$99.99",
  description: "Description détaillée du produit. Cette section peut contenir des spécifications et autres informations pertinentes.",
  images: [
    "/path/to/image1.jpg",
    "/path/to/image2.jpg",
  ],
  availability: "En stock",
  ratings: 4.5, // Note sur 5
  reviews: [
    { user: "Alice", comment: "Produit excellent!", rating: 5 },
    { user: "Bob", comment: "Bon rapport qualité-prix.", rating: 4 },
  ],
};

export default function ProductCard() {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card className="max-w-lg mx-auto p-6 shadow-lg">
      <div className="flex gap-6">
        <img
          src={product.images[0]}
          alt={product.name}
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
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon
                key={index}
                className={`h-5 w-5 ${index < product.ratings ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <Typography variant="small" color="gray" className="ml-2 font-medium">
              ({product.reviews.length} avis)
            </Typography>
          </div>
          <Typography variant="small" color="gray" className="mb-4 font-medium">
            {product.description}
          </Typography>
          <div className="flex items-center justify-between">
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
            <Button color="blue" className="font-medium flex items-center">
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Ajouter au panier
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
