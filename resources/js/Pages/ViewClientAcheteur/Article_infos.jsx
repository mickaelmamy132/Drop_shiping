import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, Card } from 'antd';

export default function Article_infos({ auth, produit }) {
    console.log(produit);
    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <main className='flex items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100'>
                <div className='bg-white rounded-2xl shadow-2xl p-10 w-full max-w-7xl mx-auto'>
                    <h3 className='text-center font-bold text-5xl text-gray-800 mb-12'>
                        Informations du produit
                    </h3>
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="w-full md:w-1/2">
                            <img
                                src={`/storage/${produit.image_rubrique}`}
                                alt={produit.name}
                                className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        <div className="flex flex-col space-y-8 flex-1">
                            <h1 className="text-4xl font-bold text-gray-800">{produit.nom}</h1>

                            <div className="flex items-center">
                                <span className="text-4xl font-bold text-green-600">${produit.prix}</span>
                            </div>

                            <div className='mt-10'>
                                <InfoItem label="Description" value={produit.description} />
                            </div>

                            <div className='flex items-center'>
                                <p className="font-semibold mb-2 text-xl">vendeur: <span> {produit.vendeur.user.name}</span></p>
                            </div>


                            <Button className="w-full md:w-2/3 bg-blue-600 hover:bg-blue-700 text-white text-xl py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                                Ajouter au panier
                            </Button>
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
)