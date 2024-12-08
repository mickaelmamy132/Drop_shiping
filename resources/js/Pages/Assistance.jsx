import React from 'react'
import FAQs from '../Components/FAQs'
import Accueil from '../Layouts/Accueil'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'

function Assistance({ auth }) {
    return (
        <Accueil
            auth={auth}
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="ml-4"
            >
                <Link 
                    href="/" 
                    className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-all duration-300 transform hover:-translate-x-1"
                >
                    <svg 
                        className="w-4 h-4 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Retour à l'accueil
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="assistance-header text-center">
                    <h3 className="assistance-subtitle">
                        obtenez de l'aide
                    </h3>
                    <h1 className="assistance-title">
                        Assistance
                    </h1>
                    <p className="assistance-description">
                        Notre équipe est là pour répondre à toutes vos questions, résoudre les problèmes rencontrés sur notre plateforme et vous conseiller.
                    </p>
                </div>
                <div className="assistance-content">
                    
                </div>
                <div className="assistance-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <FAQs />
                    </motion.div>
                </div>
            </motion.div>
        </Accueil>
    )}

export default Assistance