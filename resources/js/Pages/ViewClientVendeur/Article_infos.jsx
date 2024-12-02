import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Article_infos({ auth, produit }) {
    console.log(produit);
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
            <main className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='mb-8'>
                        <Link href={route('Mes_rubrique/show')} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                            ← Retour
                        </Link>
                    </div>

                    <div className='bg-white shadow-xl rounded-lg overflow-hidden'>
                        <div className='p-6 sm:p-10'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                                <div className='space-y-6'>
                                    <div className='aspect-w-1 aspect-h-1'>
                                        <img
                                            src={`/storage/${produit.image_rubrique}`}
                                            alt={produit.name}
                                            className='w-full h-full object-cover rounded-lg shadow-md'
                                        />
                                    </div>
                                </div>

                                <div className='space-y-6'>
                                    <h1 className='text-3xl font-bold text-gray-900'>{produit.nom}</h1>
                                    
                                    <div className='border-t border-b border-gray-200 py-4'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-2xl font-semibold text-gray-900'>Prix</span>
                                            <span className='text-3xl font-bold text-green-600'>${produit.prix}</span>
                                        </div>
                                        <div className='flex justify-between items-center mt-4'>
                                            <span className='text-2xl font-semibold text-gray-900'>Quantité</span>
                                            <span className='text-3xl font-bold text-green-600'>{produit.quantite}</span>
                                        </div>
                                    </div>

                                    <div className='bg-gray-50 rounded-lg p-6'>
                                        <h3 className='text-xl font-semibold text-gray-900 mb-4'>Description</h3>
                                        <p className='text-gray-700'>{produit.description}</p>
                                    </div>

                                    <div className='bg-gray-50 rounded-lg p-6'>
                                        <h3 className='text-xl font-semibold text-gray-900 mb-2'>Vendeur</h3>
                                        <p className='text-gray-700'>{produit.vendeur.user.name}</p>
                                    </div>

                                    <div className='flex space-x-4 mt-8'>
                                        <form onSubmit={handleSubmit} className='flex-1'>
                                            <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                                                Modifier
                                            </button>
                                        </form>
                                        <Link className='flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-center transition duration-200'>
                                            Supprimer
                                        </Link>
                                    </div>
                                </div>
                            </div>
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