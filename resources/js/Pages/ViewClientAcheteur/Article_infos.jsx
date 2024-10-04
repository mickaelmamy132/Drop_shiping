import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, message, Select } from 'antd';
import { Link, useForm } from '@inertiajs/react';

const { Option } = Select;

export default function Article_infos({ auth, produit }) {

    const [quantite, setQuantity] = useState(1);

    const { data, post, setData, processing, errors } = useForm({
        acheteur_id: auth.user.id,
        produit_id: produit.id,
        vendeur_id: produit.vendeur.user_id,
        quantite: quantite,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('Panie.store'), {
            onSuccess: () => {
                message.success('Produit ajouté au panier avec succès!');
            },
            onError: (errors) => {
                // Afficher le message d'erreur spécifique s'il est présent
                if (errors.error) {
                    message.error(errors.error); // Affiche "Quantité insuffisante en stock"
                } else {
                    message.error('Une erreur est survenue lors de l\'ajout au panier.');
                }
            }
        });
    };
    useEffect(() => {
        setData('quantite', quantite); // Mettre à jour la clé `quantite` dans le formulaire
    }, [quantite]);

    return (
        <AuthenticatedLayout 
            user={auth.user}
            role={auth.role}
        >
            <main className='flex items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100'>
                <div className='bg-white rounded-2xl shadow-2xl p-10 w-full max-w-7xl mx-auto'>
                <Link href='/Acheteur' className='max-w-20 text-center flex bg-red-200 rounded-xl p-2 px-4 font-semibold transition-all duration-300 transform hover:-translate-y-2'>retour</Link>

                    <h3 className='text-center font-bold text-5xl text-gray-800 mb-12'>
                        Informations du produit
                    </h3>

                    <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row gap-16">
                        <div className="w-full md:w-1/2">
                            <img
                                src={`/storage/${produit.image_rubrique}`}
                                alt={produit.name}
                                className="w-full h-auto object-contain rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        <div className="flex flex-col space-y-8 flex-1">
                            <h1 className="text-4xl font-bold text-gray-800">{produit.nom}</h1>

                            <div className="flex items-center">
                                <span className="text-4xl font-bold text-green-600">${produit.prix}</span>
                            </div>

                            <div className="flex items-center">
                                <p className="text-4xl font-bold text-green-600">Quantite: {produit.quantite}</p>
                            </div>

                            <div className='mt-10'>
                                <InfoItem label="Description" value={produit.description} />
                            </div>

                            <div className='flex items-center'>
                                <p className="font-semibold mb-2 text-xl">Vendeur: <span>{produit.vendeur.user.name}</span></p>
                            </div>

                            <form onSubmit={handleSubmit} className='flex gap-2'>
                                <div className='items-center justify-center text-center'>
                                    <label htmlFor="">nombres: </label>
                                    <Select
                                        label="Quantité"
                                        value={quantite}
                                        onChange={(value) => setQuantity(String(value))}
                                        className="w-32 font-medium mb-4"
                                    >
                                        {[...Array(produit.quantite)].map((_, index) => (
                                            <Option key={index + 1} value={index + 1}>
                                                {index + 1}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full md:w-2/3 bg-blue-600 hover:bg-blue-700 text-white text-center text-xl py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                                    disabled={processing}
                                    loading={processing}
                                >
                                    {processing ? 'Ajout en cours...' : 'Ajouter au panier'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    )
}

const InfoItem = ({ label, value }) => (
    <div className='bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300'>
        <span className='font-semibold text-gray-700 text-2xl'>{label}: </span>
        <span className='text-gray-600 text-xl'>{value}</span>
    </div>
);