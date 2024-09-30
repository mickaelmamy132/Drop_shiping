import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Produit_lot({ lots, auth }) {
    console.log(lots);
    console.log(lots && lots.length > 0 ? lots[0].nom : 'No lots available');

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lot Details</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="font-bold text-xl mb-4">Lot d'Electroménager</h2>

                            {lots === null ? (
                                <p>Il n'y a pas de lots disponibles</p>
                            ) : lots && lots.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                                    {lots.map((lot) => (
                                        <div key={lot.id} className="border border-gray-200 rounded-lg p-6">
                                            {/* Lot Header with Images and Logo */}
                                            <div className="flex justify-between items-center mb-4">
                                                <img src="/path/to/logo.png" alt="Boulanger logo" className="h-10" />
                                            </div>

                                            {/* Images of Products in the Lot */}
                                            <div className="grid grid-cols-3 gap-4 mb-4">
                                                <img src={`/storage/${lot.image_lot}`} alt={lot.nom} className="h-24" />
                                            </div>

                                            {/* Lot Details */}
                                            <p className="font-semibold text-lg">{lot.nom} - {lot.description}</p>
                                            <p className="text-sm text-gray-500">Enchère #{lot.id}</p>

                                            {/* Auction Information */}
                                            <div className="mt-4">
                                                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                    Dommages dus au transport
                                                </span>
                                                <div className="mt-4 flex justify-between">
                                                    <div>
                                                        <p className="text-gray-600">Dernière enchère</p>
                                                        <p className="font-bold text-lg">{lot.prix} €</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600">Nombre d'enchères</p>
                                                        <p className="font-bold text-lg">{lot.enchere_count} 🔥</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600">Fin de l'enchère</p>
                                                        <p className="font-bold text-red-500 text-lg">{lot.time_left}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Pricing Information */}
                                            <div className="border-t border-gray-200 mt-4 pt-4">
                                                <div className="flex justify-between text-gray-700">
                                                    <div>
                                                        <p className="text-sm">Prix public</p>
                                                        <p className="font-bold">{lot.prix_public} €</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm">Unités</p>
                                                        <p className="font-bold">{lot.quantite}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm">Coût / unité</p>
                                                        <p className="font-bold">{lot.cout_unite} €</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    ))}
                                </div>
                            ) : (
                                <p>No lot details available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
