import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Commande({ auth, message, commandes }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}

        >
            <Head title="Commandes" />
            <div className="py-12">
                <div className="max-w-10xl mx-auto sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                    >
                        <div className="p-6 text-gray-900">
                            <motion.h1
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="text-2xl font-semibold mb-4"
                            >
                                Gestion des Commandes
                            </motion.h1>
                            {message && (
                                <div className="mb-4 p-4 bg-green-100 rounded-lg">
                                    <p className="text-green-700">{message}</p>
                                </div>
                            )}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Commande</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Addresse de livraison</th>
                                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode de paiement</th> */}
                                                
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {commandes.map((commande, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{commande.reference}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{commande.created_at}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{commande.produit_id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{commande.quantite}</td>
                                                     <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            commande.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                            commande.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {commande.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{commande.total} €</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{commande.adresse_livraison}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">Voir</button>
                                                        <button className="text-red-600 hover:text-red-900">Annuler</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}