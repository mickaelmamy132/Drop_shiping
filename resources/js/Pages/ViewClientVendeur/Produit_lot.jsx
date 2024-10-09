import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Produit_lot({ lots, auth }) {
    console.log(lots);
    console.log(lots && lots.length > 0 ? lots[0].nom : 'No lots available');

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <Link href={route('dashboard')} className="rounded-xl bg-red-600 text-white p-3 px-5 mr-5 hover:bg-red-700 transition-colors duration-300">
                            retour
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                    >
                        <div className="p-6 text-gray-900">
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="font-bold text-xl mb-4"
                            >
                                Lot d'Electroménager
                            </motion.h2>

                            {lots === null ? (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    Il n'y a pas de lots disponibles
                                </motion.p>
                            ) : lots && lots.length > 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 text-center"
                                >
                                    {lots.map((lot, index) => (
                                        <motion.div
                                            key={lot.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 * index }}
                                            whileHover={{ scale: 1.05 }}
                                            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <div>
                                                <h1 className='font-bold text-xl'>{lot.vendeur.user.name}</h1>
                                            </div>

                                            {/* Images of Products in the Lot */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 * index + 0.2 }}
                                                className="mb-4 h-48 overflow-hidden"
                                            >
                                                <img src={`/storage/${lot.image_lot}`} alt={lot.nom} className="w-full h-full object-cover" />
                                            </motion.div>

                                            {/* Lot Details */}
                                            <p className="font-semibold text-lg">{lot.nom} - {lot.description}</p>
                                            <p className="text-sm text-gray-500">Enchère #{lot.id}</p>

                                            {/* Auction Information */}
                                            <div className="mt-4">
                                                <motion.span
                                                    whileHover={{ scale: 1.1 }}
                                                    className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold inline-block"
                                                >
                                                    {lot.categorie.nom}
                                                </motion.span>
                                                <div className="mt-4 flex justify-between">
                                                    <div>
                                                        <p className="text-gray-600">Dernière enchère</p>
                                                        <p className="font-bold text-lg">{lot.montant ? `${lot.montant} €` : 'Aucune enchère'}</p>
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
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 * index + 0.4 }}
                                                className="border-t border-gray-200 mt-4 pt-4"
                                            >
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
                                                        <p className="font-bold">{lot.prix} €</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    No lot details available
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
