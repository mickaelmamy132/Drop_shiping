import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Article_infos({ auth, produit }) {
    const { data, get, setData, processing, errors } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route('Produit.edit', { id: produit.id }))
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <main className='flex items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100'>
                <div className='bg-white rounded-2xl shadow-2xl p-10 w-full max-w-7xl mx-auto'>
                    <Link href={route('Mes_rubrique/show')} className="rounded-xl bg-red-600 text-white p-3 px-5 mr-5">retour</Link>

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
                                <Link className='bg-red-500 p-2 text-center w-20'>
                                    supprimer
                                </Link>

                                <form onSubmit={handleSubmit} className='flex gap-2'>
                                    <button type="submit" className="bg-yellow-500 hover:bg-gray-400 hover:text-yellow-400 text-white font-bold py-2 px-4 rounded">
                                        modifier
                                    </button>
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
