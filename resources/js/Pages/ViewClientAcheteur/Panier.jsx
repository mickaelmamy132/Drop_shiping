import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage, useForm, Head } from '@inertiajs/react';
import { Form, Button, notification } from 'antd';
import Modal from '../../Components/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

export default function Panier({ auth, panies }) {
    // console.log(panies);
    const { data } = panies;
    const { csrf_token } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenLot, setIsModalOpenLot] = useState(false);
    const [selectedPanieId, setSelectedPanieId] = useState(null);
    const [selectedPanieIdLot, setSelectedPanieIdLot] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const { post, processing } = useForm({
        acheteur_id: auth.user.id,
        produits: data.map(item => ({
            produit_id: item.produit ? item.produit.id : null,
            produit_lot_id: item.produit_lot_id ? item.produit_lot_id : null,
            quantite: item.quantite,
            prix_totale: item.prix_totale,
            vendeur_id: item.produit ? item.vendeur.user_id : (item.produit_lot_id ? item.vendeur.user_id : null)
        }))
    });



    const {
        data: formData,
        delete: destroy,
        processing: deleteProcessing,
    } = useForm();

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const totalPanier = data.reduce((total, panie) => total + parseFloat(panie.prix_totale), 0);

    const onFinish = (values) => {
        if (!navigator.onLine) {
            notification.error({
                message: 'Erreur de connexion',
                description: 'Veuillez vérifier votre connexion internet et réessayer.'
            });
            return;
        }

        post('/checkout', { data }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                if (page.url) {
                    window.location.href = page.url;
                }
            },
            onError: (error) => {
                console.error('Erreur lors de la création de la session de paiement:', error);
            },
        });
    };

    const handleDelete = (panieId) => {
        setSelectedPanieId(panieId);
        setIsModalOpen(true);
    };

    const handleDeleteLot = (panieId) => {
        setSelectedPanieIdLot(panieId);
        setIsModalOpenLot(true);
    };

    const confirmDelete = () => {
        if (selectedPanieId !== null) {
            destroy(route('Panie.destroy', selectedPanieId), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setSelectedPanieId(null);
                    notification.success({
                        message: 'Succès',
                        description: 'Produit retiré du panier avec succès',
                        placement: 'topRight',
                    });
                },
                onError: (error) => {
                    notification.error({
                        message: 'Erreur',
                        description: 'Erreur lors du retirement du panier, veuillez réessayer.',
                        placement: 'topRight',
                    });
                    console.error('Error deleting panie:', error);
                },
            });
        } else {
            setIsModalOpen(false);
            setSelectedPanieId(null);
        }
    };

    const confirmDeleteLot = () => {
        if (selectedPanieIdLot !== null) {
            destroy(route('panieLot.destroy', selectedPanieIdLot), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpenLot(false);
                    setSelectedPanieIdLot(null);
                    notification.success({
                        message: 'Succès',
                        description: 'Produit retiré du panier avec succès',
                        placement: 'topRight',
                    });
                },
                onError: (error) => {
                    notification.error({
                        message: 'Erreur',
                        description: 'Erreur lors du retirement du panier, veuillez réessayer.',
                        placement: 'topRight',
                    });
                    console.error('Error deleting panie:', error);
                },
            });
        } else {
            setIsModalOpenLot(false);
            setSelectedPanieIdLot(null);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <Head title="Panier" />
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto mt-12 px-4 text-center"
            >
                <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8 rounded-xl mb-8">
                    <div className="container mx-auto">
                        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Mon Panier d'Achats</h2>
                        <p className="text-gray-600">Gérez vos articles et finalisez votre commande</p>
                    </div>
                </section>


                {Array.isArray(data) && data.length > 0 ? (
                    <>
                        <AnimatePresence>
                            {isLoaded && (
                                <motion.h1
                                    key="total-articles"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5 }}
                                    className='mb-5 text-3xl font-bold text-center text-gray-800 flex justify-center'
                                >
                                    total des articles: {data.length}
                                </motion.h1>
                            )}
                        </AnimatePresence>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                        >                            {data.map((panie, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 w-full max-w-xl"
                            >
                                {panie.produit_lot_id ? (
                                    <img
                                        src={`/storage/${panie.produit_lot_id?.image_lot || 'default-image.jpg'}`}
                                        alt={panie.produit_lot?.nom || panie.nom || 'Image du produit'}
                                        className="w-full h-56 object-cover rounded-lg mb-4"
                                    />
                                ) : (
                                    <img
                                        src={`/storage/${panie.produit?.image_rubrique || 'default-image.jpg'}`}
                                        alt={panie.produit?.nom || panie.nom || 'Image du produit'}
                                        className="w-full h-56 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{panie.vendeur.nom_de_l_entreprise}</h2>
                                <div className='flex justify-between items-center mb-4'>
                                    <p className='text-gray-600'>Produit:</p>
                                    <p className="font-semibold text-indigo-600">{panie.produit?.nom || panie.nom}</p>
                                </div>
                                {panie.produit_lot_id ? (
                                    <>
                                        <div className='flex justify-between items-center mb-4'>
                                            <p className='text-gray-600'>Type:</p>
                                            <p className="font-semibold text-green-600">Lot</p>
                                        </div>
                                        <div className='flex justify-between items-center mb-4'>
                                            <p className='text-gray-600'>Description du lot:</p>
                                            <p className="font-semibold text-green-600">{panie.description}</p>
                                        </div>
                                        <div className='flex justify-between items-center mb-4'>
                                            <p className='text-gray-600'>Quantité du lot:</p>
                                            <p className="font-semibold text-green-600">{panie.quantite}</p>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="text-gray-600">Prix unitaire du lot:</p>
                                            <p className="font-semibold text-indigo-600">{panie.prix_totale} €</p>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="text-gray-600">Quantité commandée:</p>
                                            <p className="font-semibold">{panie.quantite}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="text-gray-600">Prix unitaire:</p>
                                            <p className="font-semibold text-indigo-600">{panie.produit.prix} €</p>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="text-gray-600">Quantité commandée:</p>
                                            <p className="font-semibold">{panie.quantite}</p>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="text-gray-600">Prix totale:</p>
                                            <p className="font-semibold">{panie.produit.prix * panie.quantite}</p>
                                        </div>
                                    </>
                                )}
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-gray-600">Status:</p>
                                    <p className="font-semibold text-green-600">{panie.status}</p>
                                </div>

                                <div className="border-t pt-4 mb-6">
                                    <p className="font-bold text-2xl text-gray-800">Total: <span className="text-indigo-600">{panie.prix_totale} €</span></p>
                                </div>
                                <div className='flex justify-between space-x-4'>
                                    <form className="w-full flex space-x-4">
                                        {panie.produit_lot_id ? (
                                            <div className="flex justify-center space-x-4">
                                                <Button
                                                    htmlType="submit"
                                                    className="bg-amber-400 hover:bg-amber-500 text-white  shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                                    disabled={processing}
                                                    loading={processing}
                                                    icon={<EditOutlined />}
                                                >
                                                </Button>
                                                <Button
                                                    type="button"
                                                    className=" bg-rose-500 hover:bg-rose-600 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                                    onClick={() => handleDeleteLot(panie.id)}
                                                    icon={<DeleteOutlined />}
                                                >
                                                </Button>
                                            </div>
                                        ) : (
                                            <motion.div
                                                className='justify-between flex'
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.9, duration: 0.5 }}
                                            >
                                                <div className="flex justify-center space-x-4 items-center">
                                                    <Link
                                                        href={route('Panie.edit', panie.id)}
                                                        className="bg-green-400 p-2 hover:bg-green-500 flex items-center text-white font-semibold text-lg px-3 py-1 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                                    >

                                                        <span className="text-white font-medium flex items-center">
                                                            <ArrowPathIcon className="w-6 h-6 mr-2 text-white" />
                                                        </span>
                                                    </Link>
                                                    <Button
                                                        type="button"
                                                        className=" bg-red-500 hover:bg-red-600 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                                        onClick={() => handleDelete(panie.id)}
                                                    >
                                                        <span className="text-white font-medium items-center justify-center" >
                                                            <DeleteOutlined className="w-6 h-6 mr-2 text-white" />
                                                        </span>
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </form>
                                </div>
                            </motion.div>
                        ))}

                        </motion.div>
                        <div className="mt-8 mx-auto">
                            <motion.div
                                className="text-xl font-bold text-gray-800 text-right pr-4"
                            >
                                <p>Total du panier : {totalPanier.toFixed(2)} €</p>
                            </motion.div>

                            <Form
                                onFinish={onFinish}
                                className="mt-4 text-right"
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={processing}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg"
                                >
                                    Procéder au paiement
                                </Button>
                            </Form>
                        </div>

                    </>
                ) : (
                    <motion.div initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="col-span-3 text-center"
                    >
                        <p className="text-xl text-gray-600 animate-pulse mb-4">Le panier est vide.</p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href='/Acheteur' className='inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300'>
                                Continuer vos achats
                            </Link>
                        </motion.div>
                    </motion.div>
                )}


            </motion.div>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6"
                >
                    <h3 className="text-lg font-medium text-gray-900">Confirmer la suppression</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Êtes-vous sûr de vouloir supprimer cet article du panier ?
                    </p>
                    <div className="mt-4 flex justify-end space-x-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            onClick={confirmDelete}
                        >
                            Supprimer
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Annuler
                        </motion.button>
                    </div>
                </motion.div>
            </Modal>
            <Modal show={isModalOpenLot} onClose={() => setIsModalOpenLot(false)}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6"
                >
                    <h3 className="text-lg font-medium text-gray-900">Confirmer la suppression</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Êtes-vous sûr de vouloir supprimer cet lot du panier ?
                    </p>
                    <div className="mt-4 flex justify-end space-x-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            onClick={confirmDeleteLot}
                        >
                            Supprimer
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                            onClick={() => setIsModalOpenLot(false)}
                        >
                            Annuler
                        </motion.button>
                    </div>
                </motion.div>
            </Modal>
        </AuthenticatedLayout>
    );
}
