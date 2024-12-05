import React, { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { CubeIcon, HomeIcon, ShoppingCartIcon, UserGroupIcon, UserIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function Dashboard({ children, auth }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem('darkMode')
        return savedDarkMode ? JSON.parse(savedDarkMode) : false
    })
    const { url } = usePage()
    const isActive = (path) => url.startsWith(path)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex h-screen bg-gray-100 dark:bg-gray-900"
        >
            {/* Sidebar */}
            <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-64 bg-white dark:bg-gray-800 shadow-lg"
            >
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Admin Dashboard</h2>
                </div>
                <nav className="mt-6">
                    <div className="px-4 space-y-2">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href={route('admin.dashboard')}
                                className={`flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${isActive('/admin/dashboard') ? 'text-blue-500 bg-blue-50 dark:bg-blue-900' : ''}`}
                            >
                                <HomeIcon className="w-5 h-5" />
                                <span className="ml-3">Tableau de bord</span>
                            </Link>
                        </motion.div>
                        <div className="relative">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`flex items-center w-full p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${(isActive('/admin/gereCompte/acheteurs') || isActive('/admin/gereCompte/vendeur')) ? 'text-blue-500 bg-blue-50 dark:bg-blue-900' : ''}`}
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
                                            className={`flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${isActive('/admin/gereCompte/acheteurs') ? 'text-blue-500 bg-blue-50 dark:bg-blue-900' : ''}`}
                                        >
                                            <UserIcon className="w-5 h-5" />
                                            <span className="ml-3">Acheteurs</span>
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Link
                                            href={route('admin.gereCompte.vendeur')}
                                            className={`flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${isActive('/admin/gereCompte/vendeur') ? 'text-blue-500 bg-blue-50 dark:bg-blue-900' : ''}`}
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
                                href={route('admin.gereCompte.commande')}
                                className={`flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${isActive('/admin/orders') ? 'text-blue-500 bg-blue-50 dark:bg-blue-900' : ''}`}
                            >
                                <ShoppingCartIcon className="w-5 h-5" />                                
                                <span className="ml-3">Gestion des Commandes</span>
                            </Link>
                        </motion.div>
                        {/* <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/admin/sellers"
                                className={`flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${isActive('/admin/sellers') ? 'text-blue-500 bg-blue-50 dark:bg-blue-900' : ''}`}
                            >
                                <CubeIcon className="w-5 h-5" />
                                <span className="ml-3">Gestion des Produits</span>
                            </Link>
                        </motion.div> */}
                    </div>
                </nav>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto h-full">
                <motion.header
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 shadow-md p-4"
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Tableau de bord administrateur</h1>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                            >
                                {darkMode ? (
                                    <SunIcon className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <MoonIcon className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                            <span className="text-gray-600 dark:text-gray-300">{auth?.user?.name}</span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
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
                    className="p-8 dark:bg-gray-900"
                >
                    {children}
                </motion.div>
            </div>
        </motion.div>
    )
}