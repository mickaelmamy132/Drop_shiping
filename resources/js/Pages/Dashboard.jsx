import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Chartjx from '../Components/Chart';
import ProductCard from './ViewClientVendeur/Produit';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Chart_vendeur from '../Components/Chart_vendeur';
import Diagramme from '../Components/Diagramme';

export default function Dashboard({ auth, produits }) {
    const { data, setData, post, processing, errors, reset } = useForm();
    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <Head title="Dashboard" />
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='flex'
            >
                {/* Main Content Area */}
                <div className='w-full  mx-auto px-4 sm:px-6 lg:px-8 mt-20 overflow-y-auto'>
                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className='flex justify-between items-center p-5 bg-white rounded-lg shadow-md mb-4'
                    >
                        <h2 className='text-2xl font-bold'>
                            Liste des rubrique en cours
                        </h2>
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
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                            >
                                {auth.user.role === 'vendeur' ? 'Se connecter en tant qu\'acheteur' : 'Se connecter en tant que vendeur'}
                            </motion.button>
                        </form>
                    </motion.div>
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='flex justify-end gap-2'
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href={route('Produit.create')}
                                className='text-gray-600 rounded-xl  bg-white mt-5 p-2 transition-all duration-300 transform hover:shadow-xl border'
                            >
                                ajout rubrique
                            </Link>
                        </motion.div>

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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className=' overflow-hidden p-4 mt-5'
                    >
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mb-5'>
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                <Chartjx />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                <Chart_vendeur />
                            </motion.div>

                            <Diagramme/>
                        </div>

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
                    </motion.div>
                </div>
            </motion.div>
        </AuthenticatedLayout>
    );
}
