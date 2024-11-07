import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { PrinterIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/outline';
import Modal from '../../Components/Modal';
export default function Commande({ auth, message, success, commandes }) {
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
                            {(message || success) && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-sm"
                                >
                                    {message || success}
                                </motion.div>
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
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acheteur</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix unitaire</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendeur</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Vendeur</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {commandes.map((commande, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(commande.created_at).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {commande.produit ? commande.produit.nom : commande.acheteur.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {commande.produit ? commande.produit.nom : commande.produit_lot.nom}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {commande.produit ? commande.produit.description : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {commande.produit ? commande.produit.etat : commande.produit_lot.etat}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{commande.quantite}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{commande.prix_unitaire} €</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{commande.total} €</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${commande.status === 'livres' ? 'bg-green-100 text-green-800' :
                                                            commande.status === 'en cours' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {commande.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{commande.vendeur.nom_de_l_entreprise}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{commande.vendeur.numero}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex flex-row space-x-2">
                                                            <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                                                                <EyeIcon className="mr-1 w-5 h-5" />
                                                                Voir
                                                            </button>
                                                            <button
                                                                onClick={() => setShowPrintModal(commande)}
                                                                className="text-green-500 hover:text-green-700 flex items-center"
                                                            >
                                                                <PrinterIcon className="mr-1 w-5 h-5" />
                                                                Imprimer
                                                            </button>
                                                        </div>
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

            <Modal
                show={showPrintModal !== null}
                onClose={() => setShowPrintModal(null)}
            >
                {showPrintModal && (
                    <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105">
                        <h2 className="text-2xl font-bold text-indigo-600 mb-4 animate-fade-in text-center">Détails de la commande à imprimer</h2>
                        <div className="space-y-3 text-center">
                            <p><strong>Date:</strong> {new Date(showPrintModal.created_at).toLocaleDateString()}</p>
                            <p><strong>Produit:</strong> {showPrintModal.produit ? showPrintModal.produit.nom : showPrintModal.produit_lot.nom}</p>
                            <p><strong>Quantité:</strong> {showPrintModal.quantite}</p>
                            <p><strong>Prix unitaire:</strong> {showPrintModal.prix_unitaire} €</p>
                            <p><strong>Total:</strong> {showPrintModal.total} €</p>
                            <p><strong>Statut:</strong> {showPrintModal.status}</p>
                            <p><strong>Vendeur:</strong> {showPrintModal.vendeur.nom_de_l_entreprise}</p>
                            <p><strong>Contact:</strong> {showPrintModal.vendeur.numero}</p>
                            <div className="flex space-x-4 mt-4 justify-center">
                                <button
                                    onClick={() => setShowPrintModal(null)}
                                    className="flex items-center justify-center w-1/3 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200"
                                >
                                    Fermer
                                </button>
                                <button className="flex items-center justify-center w-1/3 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-200">
                                    <PrinterIcon className="w-5 h-5 mr-2" />
                                    Imprimer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    )
}