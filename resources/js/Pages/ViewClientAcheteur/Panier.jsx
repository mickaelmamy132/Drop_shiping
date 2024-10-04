import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage, useForm } from '@inertiajs/react';
import { Form, Button } from 'antd';
import Modal from '../../Components/Modal';

export default function Panier({ auth, panies }) {
    const { data } = panies;
    const { csrf_token } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPanieId, setSelectedPanieId] = useState(null);

    const { post, processing } = useForm({
        acheteur_id: data[0]?.acheteur_id,
        produits: data.map(item => ({
            produit_id: item.produit?.id || item.produit_lot_id,
            quantite: item.quantite,
            prix_totale: item.prix_totale,
            vendeur_id: item.vendeur.user_id
        }))
    })

    const totalPanier = data.reduce((total, panie) => total + parseFloat(panie.prix_totale), 0);

    const onFinish = (values) => {
        console.log('Values:', data);
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

    const confirmDelete = () => {
        if (selectedPanieId !== null) {
            console.log('Deleting panie with id:', selectedPanieId);
            // Implement delete logic here
        }
        setIsModalOpen(false);
        setSelectedPanieId(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <div className="container mx-auto mt-12 px-4 text-center">
                <Link href='/Acheteur' className='max-w-20 text-center flex bg-red-200 rounded-xl p-2 px-4 font-semibold transition-all duration-300 transform hover:-translate-y-2'>retour</Link>
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 animate-fade-in">Votre Panier</h1>
                {Array.isArray(data) && data.length > 0 ? (
                    <>
                        <h1 className='mb-5 text-3xl font-bold text-center text-gray-800 animate-bounce flex'>total des articles: {data.length}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {data.map((panie, index) => (
                                <div key={index} className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
                                    {panie.produit_lot_id ? (
                                        <img
                                            src={`/storage/${panie.produit_lot?.image_lot || 'default-image.jpg'}`}
                                            alt={panie.produit_lot?.nom || panie.nom || 'Image du produit'}
                                            className="w-full h-48 object-cover rounded-lg mb-4"
                                        />
                                    ) : (
                                        <img
                                            src={`/storage/${panie.produit?.image_rubrique || 'default-image.jpg'}`}
                                            alt={panie.produit?.nom || panie.nom || 'Image du produit'}
                                            className="w-full h-48 object-cover rounded-lg mb-4"
                                        />
                                    )}
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Vendeur: {panie.vendeur.user.name}</h2>
                                    <div className='flex justify-between items-center mb-3'>
                                        <p className='text-gray-600'>Produit:</p>
                                        <p className="font-semibold text-indigo-600">{panie.produit?.nom || panie.nom}</p>
                                    </div>
                                    {panie.produit_lot_id ? (
                                        <>
                                            <div className='flex justify-between items-center mb-3'>
                                                <p className='text-gray-600'>Type:</p>
                                                <p className="font-semibold text-green-600">Lot</p>
                                            </div>
                                            <div className='flex justify-between items-center mb-3'>
                                                <p className='text-gray-600'>Description du lot:</p>
                                                <p className="font-semibold text-green-600">{panie.description}</p>
                                            </div>
                                            <div className='flex justify-between items-center mb-3'>
                                                <p className='text-gray-600'>Quantité du lot:</p>
                                                <p className="font-semibold text-green-600">{panie.quantite}</p>
                                            </div>
                                            <div className="flex justify-between items-center mb-3">
                                                <p className="text-gray-600">Prix unitaire du lot:</p>
                                                <p className="font-semibold text-indigo-600">{panie.prix_totale} €</p>
                                            </div>
                                            <div className="flex justify-between items-center mb-3">
                                                <p className="text-gray-600">Quantité commandée:</p>
                                                <p className="font-semibold">{panie.quantite}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-center mb-3">
                                                <p className="text-gray-600">Prix unitaire:</p>
                                                <p className="font-semibold text-indigo-600">{panie.produit.prix} €</p>
                                            </div>
                                            <div className="flex justify-between items-center mb-3">
                                                <p className="text-gray-600">Quantité commandée:</p>
                                                <p className="font-semibold">{panie.quantite}</p>
                                            </div>
                                        </>
                                    )}
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-gray-600">Status:</p>
                                        <p className="font-semibold text-green-600">{panie.status}</p>
                                    </div>

                                    <div className="border-t pt-4">
                                        <p className="font-bold text-xl text-gray-800">Total: <span className="text-indigo-600">{panie.prix_totale} €</span></p>
                                    </div>
                                    <div className='flex justify-between space-x-4'>
                                        <form className="w-full flex space-x-4">
                                            <Button
                                                htmlType="submit"
                                                className="flex-1 bg-amber-400 hover:bg-amber-500 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                                disabled={processing}
                                                loading={processing}
                                            >
                                                Modifier
                                            </Button>
                                            <Button
                                                type="button"
                                                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                                onClick={() => handleDelete(panie.id)}
                                            >
                                                Supprimer
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 bg-white shadow-lg rounded-xl p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Total du Panier</h2>
                            <p className="text-xl mb-6">Montant total: <span className="font-bold text-indigo-600">{totalPanier.toFixed(2)} €</span></p>
                            <Form
                                name="checkout"
                                onFinish={onFinish}
                                initialValues={{ _token: csrf_token }}
                            >
                                <Form.Item
                                    name="_token"
                                    hidden={true}
                                >
                                    <input type="hidden" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300">
                                        Procéder au paiement avec Stripe
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </>
                ) : (
                    <div className="col-span-3 text-center">
                        <p className="text-xl text-gray-600 animate-pulse mb-4">Le panier est vide.</p>
                        <Link href='/Acheteur' className='inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300'>
                            Continuer vos achats
                        </Link>
                    </div>
                )}
            </div>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">Confirmer la suppression</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Êtes-vous sûr de vouloir supprimer cet article du panier ?
                    </p>
                    <div className="mt-4 flex justify-end space-x-3">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            onClick={confirmDelete}
                        >
                            Supprimer
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}