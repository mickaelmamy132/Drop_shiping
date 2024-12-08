import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Chartjx from '../Components/Chart';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Chart_vendeur from '../Components/Chart_vendeur';
import Diagramme from '../Components/Diagramme';
import LineChart from '../Components/LineChart';
import BarChart from '../Components/BarChart';
import { CurrencyDollarIcon, UsersIcon, CubeIcon } from '@heroicons/react/24/solid';
import DashboardCard from '../Components/DashboardCard';
import { CubeTransparentIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { comma } from 'postcss/lib/list';
import Donate from '../Components/Donate';

export default function Dashboard({ auth, produit, produit_lot, totalRevenus, commande, produit2 }) {
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
                className='flex dark:bg-gray-800'
            >
                {/* Main Content Area */}
                <div className='flex-1 items-center mt-5'>
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className='flex justify-between items-center p-5 bg-white dark:bg-gray-700 rounded-lg shadow-md mb-4'
                    >
                        <h2 className='text-2xl font-bold dark:text-white'>
                            Bienvenu sur votre dashboard vendeur
                        </h2>
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
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className='bg-gray-100 dark:bg-gray-600 py-2 px-2 rounded-xl mx-auto text-center text-black dark:text-white hover:bg-gray-150 dark:hover:bg-gray-500'
                                >
                                    Se connecter en tant que acheteur
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='overflow-hidden p-4 mt-5 space-y-8 dark:bg-gray-800'
                    >
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 items-center'>
                            <DashboardCard
                                title="Articles"
                                value={produit}
                                icon={ShoppingCartIcon}
                                footer="Increased by 10% since last month"
                                additionalInfo="Order #1,234"
                            />
                            <DashboardCard
                                title="Lot"
                                value={produit_lot}
                                icon={CubeTransparentIcon}
                                footer="120 new customers this month"
                                additionalInfo="Avg. Value: $85"
                            />
                            <DashboardCard
                                title="Commandes"
                                value={commande}
                                icon={CubeTransparentIcon}
                                footer="23 new products added this week"
                                additionalInfo="Inactive: 32"
                            />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                            <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Transactions</h2>
                                        <h3 class="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">1,234</h3>
                                        <p class="text-sm text-green-500 dark:text-green-400 mt-1">▲ +15% ce mois</p>
                                    </div>
                                    <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                </div>
                                <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm">Dernière transaction: il y a 5 min</p>
                            </div>

                            <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Revenus</h2>
                                        <h3 class="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{totalRevenus} €</h3>
                                        <p class="text-sm text-green-500 dark:text-green-400 mt-1">▲ +8% ce mois</p>
                                    </div>
                                    <div class="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                                        <span>Objectif mensuel</span>
                                        <span>75%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                                        <div class="bg-green-600 dark:bg-green-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            <Donate produit2={produit2} />
                        </div> */}
                    </motion.div>
                </div>
            </motion.div>
        </AuthenticatedLayout>
    );
}