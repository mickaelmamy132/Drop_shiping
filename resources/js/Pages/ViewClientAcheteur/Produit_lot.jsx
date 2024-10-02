import { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { message, notification } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

export default function Produit_lot({ lots, auth }) {
    const [endDates, setEndDates] = useState(() => {
        const savedEndDates = localStorage.getItem('endDates');
        return savedEndDates ? JSON.parse(savedEndDates) : {};
    });
    const [timesLeft, setTimesLeft] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLot, setSelectedLot] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        montant: '',
        acheteur_id: auth.user.id,
        lot_id: null,
    });

    useEffect(() => {
        const timers = {};
        
        Object.keys(endDates).forEach(lotId => {
            if (!endDates[lotId]) return;

            timers[lotId] = setInterval(() => {
                setTimesLeft(prevTimesLeft => ({
                    ...prevTimesLeft,
                    [lotId]: calculateTimeLeft(endDates[lotId])
                }));
            }, 1000);
        });

        return () => {
            Object.values(timers).forEach(timer => clearInterval(timer));
        };
    }, [endDates]);

    useEffect(() => {
        localStorage.setItem('endDates', JSON.stringify(endDates));
    }, [endDates]);

    function calculateTimeLeft(endTime) {
        const now = new Date();
        const end = new Date(endTime);
        const difference = end - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { hours: 0, minutes: 0, seconds: 0 };
        }

        return timeLeft;
    }

    const openModal = (lot) => {
        setSelectedLot(lot);
        setData('lot_id', lot.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLot(null);
        setData('montant', '');
        setData('lot_id', null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('enchere.store'), {
            preserveScroll: true,
            onSuccess: (response) => {
                closeModal();


                const currentEndDate = endDates[data.lot_id];
                const newEndDate = currentEndDate ? new Date(currentEndDate) : new Date();
                if (!currentEndDate || newEndDate < new Date()) {
                    newEndDate.setHours(newEndDate.getHours() + 2);
                }
                setEndDates(prevEndDates => ({
                    ...prevEndDates,
                    [data.lot_id]: newEndDate.toISOString()
                }));

                if (Object.keys(errors).length > 0) {
                    notification.error({
                        message: "Erreur lors de l'enchère",
                        description: "Veuillez vérifier les informations saisies",
                        placement: "topRight",
                        duration: 4,
                    });
                } else {
                    notification.success({
                        message: "Enchère placée avec succès",
                        description: "Enchère enregistrée dans votre historique",
                        placement: "topRight",
                        duration: 4,
                    });
                }
            },
            onError: (errors) => {
                notification.error({
                    message: "Échec de l'enchère",
                    description: errors.message || "Une erreur inconnue s'est produite.",
                    placement: "topRight",
                    duration: 4,
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <div className="py-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href={route('Acheteur')} className="rounded-xl bg-red-600 text-white p-3 px-5 mr-5">
                        retour
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-5"
                >
                    <div className="p-6 text-gray-900">
                        <h2 className="font-bold text-xl mb-4">Lot d'Electroménager</h2>

                        {lots === null || lots.length === 0 ? (
                            <p>Il n'y a pas de lots disponibles</p>
                        ) : (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 text-center"
                            >
                                {lots.map((lot) => (
                                    <motion.div
                                        key={lot.id}
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                        className="border border-gray-200 rounded-lg p-6"
                                    >
                                        <div>
                                            <h1>{auth.user.vendeur.nom_de_l_entreprise}</h1>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            <img src={`/storage/${lot.image_lot}`} alt={lot.nom} className="h-24" />
                                        </div>

                                        <p className="font-semibold text-lg">{lot.nom} - {lot.description}</p>
                                        <p className="text-sm text-gray-500">Enchère #{lot.id}</p>

                                        <div className="mt-4">
                                            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                {lot.etat}
                                            </span>
                                            <div className="mt-4 flex justify-between">
                                                <div>
                                                    <p className="text-gray-600">Dernière enchère</p>
                                                    <p className="font-bold text-lg">{lot.montant} €</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">Nombre d'enchères</p>
                                                    <p className="font-bold text-lg">{lot.enchere_count} 🔥</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">Fin de l'enchère</p>
                                                    <p className="font-bold text-red-500 text-lg">
                                                        {endDates[lot.id] ? `${timesLeft[lot.id]?.hours || 0}h ${timesLeft[lot.id]?.minutes || 0}m ${timesLeft[lot.id]?.seconds || 0}s` : 'Pas encore enchéri'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 mt-4 pt-4">
                                            <div className="flex justify-between text-gray-700">
                                                <div>
                                                    <p className="text-sm">Prix public</p>
                                                    <p className="font-bold">{lot.prix_public} €</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm">Unités</p>
                                                    <p className="font-bold">{lot.quantite}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm">Coût / unité</p>
                                                    <p className="font-bold">{lot.prix} €</p>
                                                </div>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => openModal(lot)}
                                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Enchérir
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white p-8 rounded-lg"
                        >
                            <h2 className="text-xl font-bold mb-4">Enchérir sur {selectedLot.nom}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="montant" className="block text-sm font-medium text-gray-700">Votre enchère</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">€</span>
                                        </div>
                                        <input
                                            type="number"
                                            id="montant"
                                            name="montant"
                                            value={data.montant}
                                            onChange={(e) => setData('montant', e.target.value)}
                                            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            placeholder="Entrez votre enchère"
                                        />
                                    </div>
                                    {errors.montant && <div className="text-red-500">{errors.montant}</div>}
                                </div>
                                <div className="flex justify-end">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Confirmer
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                                    >
                                        Annuler
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    )
}