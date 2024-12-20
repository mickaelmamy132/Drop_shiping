import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Chartjx from '../../Components/Chart';
import Donate from '../../Components/Donate';
import DashboardCard from '../../Components/DashboardCard';
import { CubeTransparentIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Acheteur({ auth, panie, commande, produit, produit_lot , encheres}) {
    const { post } = useForm();

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <Head title="Tableau de bord" />

            <motion.main
                className='flex'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className='flex-1 items-center mt-5'>
                    <motion.div
                        className='flex justify-between items-center mt-5 bg-white py-4 px-5 rounded-xl'
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <h3 className='font-bold text-2xl ml-3'>Bienvenu sur votre dashboard acheteur</h3>
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
                                    className='bg-gray-100 py-2 px-2 rounded-xl mx-auto text-center text-black hover:bg-gray-150'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Se connecter en tant que vendeur
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='flex flex-row flex-wrap justify-between gap-2 p-2 dark:bg-gray-900'
                    >

                        <DashboardCard
                            title="Enchere en cours"
                            value={encheres}
                            icon={ShoppingCartIcon}
                            footer="Increased by 10% since last month"
                            additionalInfo="Order #1,234"
                        />
                        <DashboardCard
                            title="Commandes"
                            value={commande}
                            icon={CubeTransparentIcon}
                            footer="23 new products added this week"
                            additionalInfo="Inactive: 32"
                        />
                        <DashboardCard
                            title="Produits dans le panier"
                            value={`Produit = ${produit} | Produit lot = ${produit_lot}`}
                            icon={CubeTransparentIcon}
                            footer="Total des produits"
                            additionalInfo={`Produit unitaire = ${produit} | Produit lot = ${produit_lot}`}
                        />
                    </motion.div>
                    {/* <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 w-full mt-5 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, staggerChildren: 0.1 }}
                    >
                        <Chartjx />
                        <Donate />

                    </motion.div> */}
                </div>

            </motion.main>

        </AuthenticatedLayout>
    );
}
