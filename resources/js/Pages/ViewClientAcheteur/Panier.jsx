import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Panier({ auth, panies }) {
    console.log(panies);
    const { data } = panies;

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <div className="container mx-auto mt-12 px-4">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 animate-fade-in">Votre Panier</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((panie, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
                                <img
                                    src={`/storage/${panie.produit.image_rubrique}`}
                                    alt={panie.produit.nom}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">Vendeur: {panie.vendeur.user.name}</h2>
                                <h2 className="text-lg font-medium mb-3 text-gray-700">Produit: {panie.produit.nom}</h2>
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-gray-600">Prix unitaire:</p>
                                    <p className="font-semibold text-indigo-600">{panie.produit.prix} €</p>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-gray-600">Quantité:</p>
                                    <p className="font-semibold">{panie.quantite}</p>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-gray-600">Status:</p>
                                    <p className="font-semibold text-green-600">{panie.status}</p>
                                </div>
                                <div className="border-t pt-4">
                                    <p className="font-bold text-xl text-gray-800">Total: <span className="text-indigo-600">{panie.prix_totale} €</span></p>
                                </div>
                                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">Détails de l'article:</h3>
                                    <pre className="whitespace-pre-wrap text-sm">
                                        {JSON.stringify(panie, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-xl text-gray-600 animate-pulse">Aucun article dans le panier.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
