import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ProductCard from './Produit';


export default function View_article({ auth, produits }) { 
    console.log(produits);
    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            
            <Head title="Articles" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='flex'
            >

                {/* Main Content Area */}
                <div className='flex-1 items-center mt-5 mx-auto'>
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
                        className='flex justify-end gap-2 mb-5'
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href={route('Produit.create')}
                                className='text-gray-600 rounded-xl  bg-white mt-5 p-2 transition-all duration-300 transform hover:shadow-xl border'
                            >
                                ajout rubrique
                            </Link>
                        </motion.div>

                       
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-5"
                    >
                        {produits.map((produit, index) => (
                            <motion.div
                                key={produit.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ProductCard produit={produit} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </AuthenticatedLayout>
    );
}