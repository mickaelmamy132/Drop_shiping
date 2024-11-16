import React from 'react'
import FAQs from '../Components/FAQs'
import Accueil from '../Layouts/Accueil'
import { motion } from 'framer-motion'

function Assistance({ auth }) {
    return (
        <Accueil
            auth={auth}
        >
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