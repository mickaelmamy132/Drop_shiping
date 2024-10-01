import { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { message } from 'antd';

export default function Produit_lot({ lots, auth, endDate }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLot, setSelectedLot] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        montant: '',
        acheteur_id: auth.user.id,
        lot_id: null,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft() {
        const now = new Date();
        const end = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
        const difference = end - now;
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
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
                setTimeLeft(calculateTimeLeft());
                if (response.message) {
                    message.success(response.message);
                }
            },
            onError: (errors) => {
                console.log(errors);
                if (errors.message) {
                    message.error(errors.message);
                } else {
                    message.error('Une erreur est survenue lors de l\'enchère.');
                }
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <div className="py-12">
                <Link href={route('dashboard')} className="rounded-xl bg-red-600 text-white p-3 px-5 mr-5">
                    retour
                </Link>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-5">
                    <div className="p-6 text-gray-900">
                        <h2 className="font-bold text-xl mb-4">Lot d'Electroménager</h2>

                        {lots === null ? (
                            <p>Il n'y a pas de lots disponibles</p>
                        ) : lots && lots.length > 0 ? (
                            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 text-center">
                                {lots.map((lot) => (
                                    <div key={lot.id} className="border border-gray-200 rounded-lg p-6">
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
                                                    <p className="font-bold text-lg">{lot.prix} €</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">Nombre d'enchères</p>
                                                    <p className="font-bold text-lg">{lot.enchere_count} 🔥</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">Fin de l'enchère</p>
                                                    <p className="font-bold text-red-500 text-lg">
                                                        {timeLeft.hours || 0}h {timeLeft.minutes || 0}m {timeLeft.seconds || 0}s
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
                                        <button onClick={() => openModal(lot)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Enchérir
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No lot details available</p>
                        )}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg">
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
                                <button type="submit" disabled={processing} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                    Confirmer
                                </button>
                                <button type="button" onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    )
}