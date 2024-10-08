import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useForm } from '@inertiajs/react';
import { message } from 'antd';
import { ArrowLeftEndOnRectangleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';

export default function Article_edit({ auth, panier }) {

    const [quantite, setQuantite] = useState(panier ? panier.quantite : 0);

    const { data, setData, put, processing, errors } = useForm({
        quantite: quantite,
        prix: panier.produit.prix,
        produit_id: panier.produit.id,
        prix_totale: panier.produit.prix * quantite,
        vendeur_id: panier.vendeur.user_id,
        acheteur_id: panier.acheteur_id,
    });

    const handleQuantiteChange = (e) => {
        const newQuantite = parseInt(e.target.value);
        setQuantite(newQuantite);
        setData(prevData => ({
            ...prevData,
            quantite: newQuantite,
            prix_totale: panier.produit.prix * newQuantite
        }));
    };

    useEffect(() => {
        setData(prevData => ({
            ...prevData,
            quantite: quantite,
            prix_totale: panier.produit.prix * quantite
        }));
    }, [quantite]);

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const slideIn = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    const scaleIn = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 }
    };

    const onfinish = (e) => {
        e.preventDefault();
        put(route('Panie.update', panier.id), {
            preserveScroll: true,
            onSuccess: () => {
                message.success('modification effectuée')
            },
            onError: (errors) => {
                message.error('Une erreur lors de la modification')
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <AnimatePresence>
                {panier ? (
                    <motion.div
                        key="panier"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fadeIn}
                        transition={{ duration: 0.5 }}
                        className="font-sans max-w-4xl mx-auto px-4 py-8"
                    >
                        <motion.div 
                            className="bg-white rounded-xl shadow-2xl overflow-hidden"
                            variants={scaleIn}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <div className="p-8">
                                <motion.h2 
                                    className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4"
                                    variants={slideIn}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    Détails du Panier
                                </motion.h2>

                                <section className="space-y-6">
                                    <motion.h3 
                                        className="text-2xl font-semibold text-gray-700"
                                        variants={slideIn}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                    >
                                        Informations de Commande
                                    </motion.h3>
                                    <div>
                                        {panier.produit.image_rubrique && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <img src={`/storage/${panier.produit.image_rubrique}`} alt="Image du lot" />
                                            </motion.div>
                                        )}
                                    </div>
                                    
                                    <motion.form 
                                        onSubmit={onfinish} 
                                        className="mt-6 space-y-6"
                                        variants={fadeIn}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                    >
                                        <motion.div 
                                            className="flex items-center justify-between"
                                            variants={slideIn}
                                            transition={{ delay: 0.6, duration: 0.5 }}
                                        >
                                            <label htmlFor="quantite" className="text-lg font-medium text-gray-600">Quantité:</label>
                                            <select
                                                id="quantite"
                                                value={data.quantite}
                                                onChange={handleQuantiteChange}
                                                className="w-full sm:w-20 mb-4 sm:mb-0 text-lg font-medium text-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                                            >
                                                {[...Array(panier.produit.quantite).keys()].map(i => (
                                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                ))}
                                            </select>
                                        </motion.div>
                                        <motion.div 
                                            className="flex items-center justify-between"
                                            variants={slideIn}
                                            transition={{ delay: 0.7, duration: 0.5 }}
                                        >
                                            <p className="text-lg font-medium text-gray-600">Prix unitaire:</p>
                                            <p className="text-lg font-bold text-green-600">{panier.produit.prix} €</p>
                                        </motion.div>
                                        <motion.div 
                                            className="flex items-center justify-between border-t pt-4"
                                            variants={slideIn}
                                            transition={{ delay: 0.8, duration: 0.5 }}
                                        >
                                            <p className="text-xl font-semibold text-gray-700">Prix Total:</p>
                                            <p className="text-xl font-bold text-green-600">{data.prix_totale} €</p>
                                        </motion.div>
                                        <motion.div 
                                            className='justify-between flex'
                                            variants={scaleIn}
                                            transition={{ delay: 0.9, duration: 0.5 }}
                                        >
                                            <Link 
                                                href={route('Panie.index')} 
                                                className="rounded bg-red-400 p-2 mt-4 hover:bg-red-500 transition-colors duration-200 flex items-center"
                                            >
                                                <ArrowLeftCircleIcon className="w-6 h-6 mr-2 text-white" />
                                                <span className="text-white font-medium">Retour</span>
                                            </Link>
                                            <motion.button 
                                                type='submit' 
                                                className='rounded bg-green-400 p-2 mt-4 hover:bg-green-500 transition-colors duration-200 flex items-center'
                                            >
                                                <ArrowPathIcon className="w-6 h-6 mr-2 text-white" />
                                                <span className="text-white font-medium">Mettre à jour</span>
                                            </motion.button>
                                        </motion.div>
                                    </motion.form>
                                </section>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.p
                        key="no-panier"
                        className="text-2xl text-gray-600 mt-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        Aucune information de panier disponible.
                    </motion.p>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}