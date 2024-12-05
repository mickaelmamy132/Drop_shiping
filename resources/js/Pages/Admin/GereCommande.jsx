import { CommandLineIcon, EyeIcon, PrinterIcon } from '@heroicons/react/24/outline'
import React from 'react'
import AdminLayout from './Layout/AdminLayout'
import { Head } from '@inertiajs/react'

export default function GereCommande({ auth, commandes }) {
    return (
        <AdminLayout
            auth={auth}
        >
            <Head title="List-commande" />
            <div className="p-4">
                <div className="flex items-center gap-4 mb-6">
                    <CommandLineIcon className="h-8 w-8 text-gray-600" />
                    <h1 className="text-2xl font-bold">Gestion des Commandes</h1>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid gap-4">
                        <div className="border rounded p-4">
                            <h2 className="font-semibold mb-2">Liste des commandes</h2>
                            {commandes.length === 0 ? (
                                <div className="text-center py-4 text-gray-600">
                                    Il n'y a pas de commandes disponibles
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <div className="inline-block min-w-full align-middle">
                                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">Acheteur</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Produit</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">Description</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell">État</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantité</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell">Prix unitaire</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Statut</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">Vendeur</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">Contact acheteur</th>
                                                        <th scope="col" className="relative py-3.5 pl-3 pr-4">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                    {commandes.map((commande, index) => (
                                                        <tr key={index}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">{new Date(commande.created_at).toLocaleDateString()}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:table-cell">{commande.user.email}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{commande.produit ? commande.produit.nom : (commande.produit_lot ? commande.produit_lot.nom : '-')}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell">{commande.produit ? commande.produit.description : '-'}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden xl:table-cell">{commande.produit ? commande.produit.etat : (commande.produit_lot ? commande.produit_lot.etat : '-')}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{commande.quantite}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{commande.prix_unitaire} €</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{commande.total} €</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                                    commande.status === 'livres' ? 'bg-green-100 text-green-800' :
                                                                    commande.status === 'en cours' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                    {commande.status}
                                                                </span>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell">{commande.vendeur.nom_de_l_entreprise}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:table-cell">{commande.telephone}</td>
                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                                                <div className="flex justify-end space-x-2">
                                                                    <button
                                                                        onClick={() => setShowPrintModal(commande)}
                                                                        className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                    >
                                                                        <EyeIcon className="h-4 w-4 mr-1" />
                                                                        Voir
                                                                    </button>
                                                                    <button
                                                                        onClick={() => generatePDF(commande)}
                                                                        className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                    >
                                                                        <PrinterIcon className="h-4 w-4 mr-1" />
                                                                        Imprimer
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}