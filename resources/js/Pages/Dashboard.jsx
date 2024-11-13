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

export default function Dashboard({ auth }) {
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
                <div className='flex-1 items-center mt-5'>
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className='flex justify-between items-center p-5 bg-white rounded-lg shadow-md mb-4'
                    >
                        <h2 className='text-2xl font-bold'>
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
                                    className='bg-gray-100 py-2 px-2 rounded-xl mx-auto text-center text-black hover:bg-gray-150'
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
                        className=' overflow-hidden p-4 mt-5 space-y-8'
                    >
                        {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mb-5'>
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                <Chartjx />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                <Chart_vendeur />
                            </motion.div>

                            <Diagramme />
                        </div> */}

                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 items-center'>
                        <DashboardCard
                            title="Sales"
                            value="$24,560"
                            icon={CurrencyDollarIcon}
                            footer="Increased by 10% since last month"
                            additionalInfo="Order #1,234"
                        />
                        <DashboardCard
                            title="Customers"
                            value="1,234"
                            icon={UsersIcon}
                            footer="120 new customers this month"
                            additionalInfo="Avg. Value: $85"
                        />
                        <DashboardCard
                            title="Active Products"
                            value="456"
                            icon={CubeIcon}
                            footer="23 new products added this week"
                            additionalInfo="Inactive: 32"
                        />
                        </div>

                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            <LineChart/>
                            <LineChart/>
                            <BarChart/>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AuthenticatedLayout>
    );
}
