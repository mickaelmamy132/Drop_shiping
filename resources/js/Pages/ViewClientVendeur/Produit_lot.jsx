import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { message } from 'antd';
import { motion } from 'framer-motion';
import { TrashIcon } from '@heroicons/react/24/solid';
import { PencilIcon } from '@heroicons/react/24/solid';
import Modal from '../../Components/Modal';

export default function Produit_lot({ lots, auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLot, setselectedLot] = useState(null);

    const {
        delete: destroy,
        processing: deleteProcessing,
    } = useForm();

    const showModale = (lotID) => {
        setselectedLot(lotID);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmDelete = () => {
        if (selectedLot !== null) {
            destroy(route('Produit_Lot.destroy', selectedLot), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setselectedLot(null);
                    message.success('Le lot a été bien supprimer');
                },
                onError: (errors) => {
                    console.error(errors);
                    message.error('Une erreur est survenue lors du suppression du lot');
                },
            });
        } else {
            setIsModalOpen(false);
            setselectedLot(null);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.user.role}
        >
            <div className="py-12">
                <div className=" mx-auto sm:px-6 lg:px-2">
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
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <h1 className="text-2xl font-semibold mb-4">Lot revendeur : acheter des lots déstockage en toute confiance</h1>
                        <p className='text-gray-500 font-semibold'>Découvrez des lots revendeur, palettes solderie & grossiste déstockage, invendus et faillites en direct des plus grandes marques et retailers.</p>

                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='flex justify-end gap-2'
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href={route('Produit_Lot.create')}
                                className='text-gray-600 rounded-xl bg-white mt-5 p-2 transition-all duration-300 transform hover:shadow-xl border'
                            >
                                Ajout Lot
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-5 w-full"
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
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 text-center min-w-[300px]"
                                >
                                    {lots.map((lot, index) => (
                                        <motion.div
                                            key={lot.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 * index }}
                                            whileHover={{ scale: 1.05 }}
                                            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 min-w-[280px]"
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
                                                        <p className="font-bold text-red-500 text-lg">{lot.fin_enchere}</p>
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
                                                <div className="flex flex-col sm:flex-row justify-between text-gray-700 space-y-4 sm:space-y-0">
                                                    <div className="text-center sm:text-left">
                                                        <p className="text-sm">Prix public</p>
                                                        <p className="font-bold">{lot.prix_public} €</p>
                                                    </div>
                                                    <div className="text-center sm:text-left">
                                                        <p className="text-sm">Unités</p>
                                                        <p className="font-bold">{lot.quantite}</p>
                                                    </div>
                                                    <div className="text-center sm:text-left">
                                                        <p className="text-sm">Coût / unité</p>
                                                        <p className="font-bold">{lot.prix} €</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row justify-between mt-4 w-full space-y-2 sm:space-y-0 sm:space-x-2">
                                                    <Link href={route('Produit_Lot.edit', lot.id)} className="w-full sm:flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out flex items-center justify-center text-sm">
                                                        <PencilIcon className="h-5 w-5 mr-2 stroke-2" />
                                                        Modifier
                                                    </Link>
                                                    <button onClick={() => showModale(lot.id)} className="w-full sm:flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out flex items-center justify-center text-sm">
                                                        <TrashIcon className='w-5 h-5 mr-2' />
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </motion.div>))}
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
                <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="p-6"
                    >
                        <h3 className="text-lg font-medium text-gray-900">Confirmer la suppression</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Êtes-vous sûr de vouloir supprimer cet lot?
                        </p>
                        <div className="mt-4 flex justify-end space-x-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                onClick={confirmDelete}
                            >
                                Supprimer
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                onClick={() => closeModal()}
                            >
                                Annuler
                            </motion.button>
                        </div>
                    </motion.div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    )
}
