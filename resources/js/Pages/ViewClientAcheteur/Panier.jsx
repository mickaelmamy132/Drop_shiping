import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage, useForm } from '@inertiajs/react';
import { Form, Button } from 'antd';

export default function Panier({ auth, panies }) {
    const { data } = panies;
    console.log(data);
    const { csrf_token } = usePage().props;
    if (data.Array!=null) {
        const { post, data: formData } = useForm({
            acheteur_id: data[0].acheteur_id,
            produits: data.map(item => ({
                produit_id: item.produit.id,
                quantite: item.quantite,
                prix_totale: item.prix_totale,
                vendeur_id: item.vendeur.user_id
            }))
        });
    }
    else {
        const { post, data: formData } = useForm({
            produits: data.map(item => ({
                produit_id: item.produit.id,
                quantite: item.quantite,
                prix_totale: item.prix_totale,
                vendeur_id: item.vendeur.user_id
            }))
        });
    }


    const { setData, processing, errors } = useForm({

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

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <div className="container mx-auto mt-12 px-4 text-center">
                <Link href='/Acheteur' className='max-w-20 text-center flex bg-red-200 rounded-xl p-2 px-4 font-semibold transition-all duration-300 transform hover:-translate-y-2'>retour</Link>
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 animate-fade-in">Votre Panier</h1>
                <h1 className='mb-5 text-3xl font-bold text-center text-gray-800 animate-bounce flex'>totale des articles:12</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((panie, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
                                <img
                                    src={`/storage/${panie.produit.image_rubrique}`}
                                    alt={panie.produit.nom}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">Vendeur: {panie.vendeur.user.name}</h2>
                                <div className='flex justify-between items-center mb-3'>
                                    <p className='text-gray-600'>Produit:</p>
                                    <p className="font-semibold text-indigo-600">{panie.produit.nom}</p>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-gray-600">Prix unitaire:</p>
                                    <p className="font-semibold text-indigo-600">{panie.produit.prix} €</p>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-gray-600">Quantité:</p>
                                    <p className="font-semibold">{panie.quantite}</p>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-gray-600">Status:</p>
                                    <p className="font-semibold text-green-600">{panie.status}</p>
                                </div>

                                <div className="border-t pt-4">
                                    <p className="font-bold text-xl text-gray-800">Total: <span className="text-indigo-600">{panie.prix_totale} €</span></p>
                                </div>
                                <div className='justify-between'>
                                    <form action="">
                                        <Button
                                            htmlType="submit"
                                            className="w-full md:w-2/3 bg-white hover:bg-yellow-500 text-yellow-400 text-center text-xl py-4 rounded-xl transition-all duration-300 transform hover:scale-105 mb-2"
                                            disabled={processing}
                                            loading={processing}
                                        >modifier</Button>
                                        <Button
                                            htmlType="submit"
                                            className="w-full md:w-2/3 bg-white hover:bg-red-500 text-red-500 text-center text-xl py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                                            disabled={processing}
                                            loading={processing}
                                        >supprimer</Button>
                                    </form>
                                </div>

                            </div>


                        ))
                    ) : (
                        <p className="col-span-3 text-center text-xl text-gray-600 animate-pulse">Aucun article dans le panier.</p>
                    )}
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
            </div>
        </AuthenticatedLayout>
    );
}