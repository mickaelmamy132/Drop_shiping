import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import ProductCard from '../ViewClientAcheteur/produit';
import { motion } from 'framer-motion';
import Chartjx from '../../Components/Chart';

export default function Acheteur({ auth, produits }) {

    const { post } = useForm();

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        > 
            <motion.main 
                className='flex'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className='flex-1 items-center mt-5'>
                    <motion.div 
                        className='flex justify-between items-center mt-5 bg-gray-300 py-4 px-5 rounded-xl'
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <h3 className='font-bold text-2xl ml-3'>Les rubriques en vente</h3>
                        <div className='flex gap-2'>
                            <form className="flex items-center" onSubmit={(e) => {
                                e.preventDefault();
                                const newRole = auth.user.role === 'vendeur' ? 'acheteur' : 'vendeur';
                                post(`/switch/${newRole}`, {
                                    onError: (errors) => {
                                        console.error(errors);
                                    }
                                });
                            }}>
                                <motion.button 
                                    type="submit" 
                                    className='bg-blue-400 py-2 px-2 rounded-xl mx-auto text-center text-black hover:bg-red-300'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Se connecter en tant que vendeur
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, staggerChildren: 0.1 }}
                    >
                        <Chartjx />
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, staggerChildren: 0.1 }}
                    >
                        {produits.map((produit) => (
                            <motion.div
                                key={produit.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProductCard produit={produit} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.main>
        </AuthenticatedLayout>
    );
}
