import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { CubeIcon, HomeIcon, ShoppingCartIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline'

export default function Dashboard({ children, auth }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
                                <HomeIcon className="w-5 h-5" />
                                <span className="ml-3">Tableau de bord</span>
                            </Link>
                        </motion.div>
                        <div className="relative">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    <UserGroupIcon className="w-5 h-5" />
                                    <span className="ml-3">Tous les Comptes</span>
                                    <svg
                                        className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </motion.div>
                            {isDropdownOpen && (
                                <div className="pl-6 mt-2 space-y-2">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Link
                                            href={route('admin.gereCompte.acheteurs')}
                                            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                        >
                                            <UserIcon className="w-5 h-5" />
                                            <span className="ml-3">Acheteurs</span>
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Link
                                            href={route('admin.gereCompte.vendeur')}
                                            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                        >
                                            <UserIcon className="w-5 h-5" />
                                            <span className="ml-3">Vendeurs</span>
                                        </Link>
                                    </motion.div>
                                </div>
                            )}
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                // href=
                                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                <ShoppingCartIcon className="w-5 h-5" />                                <span className="ml-3">Gestion des Commandes</span>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/admin/sellers"
                                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                <CubeIcon className="w-5 h-5" />
                                <span className="ml-3">Gestion des Produits</span>
                            </Link>
                        </motion.div>
                    </div>
                </nav>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col  overflow-y-auto h-full">
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