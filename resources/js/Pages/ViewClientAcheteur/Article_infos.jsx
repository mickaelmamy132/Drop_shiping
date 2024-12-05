import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, message, Select } from 'antd';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

const { Option } = Select;

export default function Article_infos({ auth, produit }) {
    console.log(produit);

    const [quantite, setQuantity] = useState(1);

    const { data, post, setData, processing, errors } = useForm({
        acheteur_id: auth.user.id,
        produit_id: produit.id,
        vendeur_id: produit.vendeur.user_id,
        quantite: quantite,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('Panie.store'), {
            onSuccess: () => {
                message.success('Produit ajouté au panier avec succès!');
            },
            onError: (errors) => {
                if (errors.error) {
                    message.error(errors.error);
                } else {
                    message.error('Une erreur est survenue lors de l\'ajout au panier.');
                }
            }
        });
    };

    useEffect(() => {
        setData('quantite', quantite);
    }, [quantite]);

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const hoverAnimation = {
        scale: 1.05,
        transition: { duration: 0.3 }
    };

    return (
        <AuthenticatedLayout 
            user={auth.user}
            role={auth.role}
        >
            <Head title="Article-infos" />
            <main className='min-h-screen bg-gray-50 py-12'>
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='container mx-auto px-4'
                >
                    <Link href={route('Produit.index')} className='inline-flex items-center mb-8 px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition-all'>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour
                    </Link>

                    <div className='grid md:grid-cols-2 gap-12'>
                        <motion.div
                            variants={fadeIn}
                            whileHover={hoverAnimation}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img
                                src={`/storage/${produit.image_rubrique}`}
                                alt={produit.name}
                                className="w-full h-[400px] object-cover"
                            />
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-2xl p-8 shadow-lg"
                        >
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{produit.nom}</h1>
                            
                            <div className="flex items-center space-x-4 mb-6">
                                <span className="text-3xl font-bold text-emerald-600">{produit.prix} €</span>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                                    En stock: {produit.quantite}
                                </span>
                            </div>

                            <div className="border-t border-b border-gray-200 py-6 mb-6">
                                <h3 className="text-lg font-semibold mb-3">Description</h3>
                                <p className="text-gray-600">{produit.description}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-gray-600">Vendu par:</span>
                                    <span className="font-medium">{produit.vendeur.user_id}</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <label className="text-gray-700 font-medium">Quantité:</label>
                                    <Select
                                        value={quantite}
                                        onChange={(value) => setQuantity(String(value))}
                                        className="w-24"
                                        size="large"
                                    >
                                        {[...Array(produit.quantite)].map((_, index) => (
                                            <Option key={index + 1} value={index + 1}>
                                                {index + 1}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-medium rounded-xl"
                                    disabled={processing}
                                    loading={processing}
                                >
                                    {processing ? 'Ajout en cours...' : 'Ajouter au panier'}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </AuthenticatedLayout>
    )
}

const InfoItem = ({ label, value }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300'
    >
        <span className='font-semibold text-gray-700 text-2xl'>{label}: </span>
        <span className='text-gray-600 text-xl'>{value}</span>
    </motion.div>
);