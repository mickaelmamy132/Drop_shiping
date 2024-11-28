import React from 'react'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'

export default function Dashboard({ children, auth }) {

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex h-screen bg-gray-100"
        >
            {/* Sidebar */}
            <motion.div 
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-64 bg-white shadow-lg"
            >
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
                </div>
                <nav className="mt-6">
                    <div className="px-4 space-y-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href={route('admin.dashboard')}
                                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                <span className="ml-3">Tableau de bord</span>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/admin/accounts"
                                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                <span className="ml-3">Tous les Comptes</span>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/admin/buyers"
                                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                <span className="ml-3">Gestion des Articles</span>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/admin/sellers"
                                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                <span className="ml-3">Gestion des Lots</span>
                            </Link>
                        </motion.div>
                    </div>
                </nav>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <motion.header 
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-md p-4"
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-gray-800">Tableau de bord administrateur</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">{auth?.user?.name}</span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Déconnexion
                            </Link>
                        </div>
                    </div>
                </motion.header>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-8"
                >
                    {children}
                </motion.div>
            </div>
        </motion.div>
    )
}