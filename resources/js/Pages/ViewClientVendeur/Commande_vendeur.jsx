import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { PrinterIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/outline';
import Modal from '../../Components/Modal';
import jsPDF from 'jspdf';
import { TrashIcon } from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

export default function Commande_vendeur({ auth, message, success, commandes }) {
    const generatePDF = (commande) => {
        const doc = new jsPDF();
        let yPos = 20;

        // Add header
        doc.setFontSize(24);
        doc.text("Reçu de commande", 105, yPos, { align: "center" });
        yPos += 20;

        // Add company info
        doc.setFontSize(14);
        doc.text(`Vendeur: ${commande.vendeur.nom_de_l_entreprise}`, 20, yPos);
        yPos += 10;

        // Add customer info
        doc.text(`Client: ${commande.user.name}`, 20, yPos);
        yPos += 7;
        doc.text(`Email: ${commande.user.email}`, 20, yPos);
        yPos += 7;
        doc.text(`Contact: ${commande.user.acheteur.numero}`, 20, yPos);
        yPos += 7;
        doc.text(`Date: ${new Date(commande.created_at).toLocaleDateString()}`, 20, yPos);
        yPos += 15;

        // Add products details
        const productsPerRow = 2;
        const productWidth = 85;
        const productSpacing = 20;

        for (let i = 0; i < commande.produits.length; i++) {
            const produit = commande.produits[i];
            const xPos = 20 + (i % productsPerRow) * (productWidth + productSpacing);

            if (i % productsPerRow === 0 && i !== 0) {
                yPos += 140; // Nouvelle ligne
                if (yPos > 250) {
                    doc.addPage();
                    yPos = 20;
                }
            }

            // Product box header
            doc.setFillColor(240, 240, 240);
            doc.rect(xPos, yPos, productWidth, 10, "F");
            doc.setFontSize(14);
            doc.text("Détails du produit", xPos + productWidth / 2, yPos + 7, { align: "center" });

            // Product info
            const nom = produit.produit ? produit.produit.nom : produit.produit_lot.nom;
            doc.addImage(`/storage/${produit.produit ? produit.produit.image_rubrique : produit.produit_lot.image_lot}`, 'JPEG', xPos + 7.5, yPos + 15, 70, 70);

            doc.setFontSize(12);
            doc.text(`Nom du produit: ${nom}`, xPos + productWidth / 2, yPos + 95, { align: "center" });
            doc.text(`Quantité: ${produit.quantite}`, xPos + productWidth / 2, yPos + 105, { align: "center" });
            doc.text(`Prix: ${produit.prix_unitaire} €`, xPos + productWidth / 2, yPos + 115, { align: "center" });
            doc.text(`Total: ${produit.total} €`, xPos + productWidth / 2, yPos + 125, { align: "center" });

            // Add separator line
            doc.setDrawColor(200, 200, 200);
            doc.line(xPos, yPos + 135, xPos + productWidth, yPos + 135);
        }

        // Move to next section after products
        yPos += 150;

        // Add total
        doc.setFillColor(240, 240, 240);
        doc.rect(20, yPos, 170, 12, "F");
        doc.setFontSize(16);
        const totalCommande = commande.produits.reduce((sum, produit) => sum + parseFloat(produit.total), 0).toFixed(2);
        doc.text(`Total de la commande: ${totalCommande} €`, 105, yPos + 8, { align: "center" });

        // Add footer
        yPos += 20;
        doc.setFontSize(12);
        doc.text("Merci de votre confiance!", 105, yPos, { align: "center" });

        // Save the PDF
        doc.save(`recu-commande-${new Date().getTime()}.pdf`);
    };

    const [showPrintModal, setShowPrintModal] = useState(null);


    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <Head title="Commandes" />

            Gestion des Commandes

            {commandes.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                    Il n'y a pas de commandes disponibles
                </div>
            ) : (
                <div className="overflow-x-auto divide-y divide-gray-200">
                    <table className="w-full divide-gray-200 table-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Acheteur</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Description</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">État</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Prix unitaire</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Vendeur</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact acheteur</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.values(commandes.reduce((acc, commande) => {
                                const key = `${commande.acheteur_id}_${commande.created_at}`
                                if (!acc[key]) {
                                    acc[key] = {
                                        ...commande,
                                        produits: [commande],
                                        total: commande.total
                                    }
                                } else {
                                    acc[key].produits.push(commande)
                                    acc[key].total += commande.total
                                }
                                return acc
                            }, {})).map((groupedCommande, index) => (

                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{new Date(groupedCommande.created_at).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm hidden md:table-cell">
                                        {groupedCommande.user.email}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                        {groupedCommande.produits.map(p => p.produit ? p.produit.nom : p.produit_lot.nom).join(', ')}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm hidden lg:table-cell">
                                        {groupedCommande.produits.map(p => p.produit ? p.produit.description : '-').join(', ')}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm hidden xl:table-cell">
                                        {groupedCommande.produits.map(p => p.produit ? p.produit.etat : p.produit_lot.etat).join(', ')}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                        {groupedCommande.produits.reduce((sum, p) => sum + p.quantite, 0)}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm hidden sm:table-cell">
                                        {groupedCommande.produits.map(p => `${p.prix_unitaire} €`).join(', ')}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{groupedCommande.total} €</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${groupedCommande.status === 'livres' ? 'bg-green-100 text-green-800' :
                                            groupedCommande.status === 'en cours' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {groupedCommande.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm hidden lg:table-cell">{groupedCommande.vendeur.nom_de_l_entreprise}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm hidden md:table-cell">{groupedCommande.user.acheteur.numero}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {
                                                    const dropdowns = document.querySelectorAll('.action-dropdown')
                                                    dropdowns.forEach(dropdown => {
                                                        if (dropdown !== e.currentTarget.nextElementSibling) {
                                                            dropdown.classList.add('hidden')
                                                        }
                                                    })
                                                    e.currentTarget.nextElementSibling.classList.toggle('hidden')
                                                }}
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                <EllipsisVerticalIcon className="w-5 h-5" />
                                            </button>
                                            <div className="action-dropdown hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => setShowPrintModal(groupedCommande)}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                                    >
                                                        <EyeIcon className="mr-3 w-5 h-5" />
                                                        Voir détails
                                                    </button>
                                                    <button
                                                        onClick={() => generatePDF(groupedCommande)}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                                    >
                                                        <PrinterIcon className="mr-3 w-5 h-5" />
                                                        Imprimer
                                                    </button>
                                                    <button
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                                    >
                                                        <TrashIcon className="mr-3 w-5 h-5" />
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <Modal
                show={showPrintModal !== null}
                onClose={() => setShowPrintModal(null)}
            >
                {showPrintModal && (
                    <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105">
                        <h2 className="text-2xl font-bold text-indigo-600 mb-4 animate-fade-in text-center">Détails des commandes à imprimer</h2>
                        <div className='flex flex-col space-y-4'>
                            {showPrintModal.produits.map((produit, index) => (
                                <div key={index} className='flex flex-row items-center justify-center border-b pb-4'>
                                    {produit.produit ? (
                                        <>
                                            <img src={`/storage/${produit.produit.image_rubrique}`} alt="produit" className="w-48 h-48 object-cover rounded-lg" />
                                            <div className="space-y-3 text-center ml-4">
                                                <p><strong>Date:</strong> {new Date(produit.created_at).toLocaleDateString()}</p>
                                                <p><strong>Client:</strong> {produit.user.name}</p>
                                                <p><strong>email:</strong> {produit.user.email}</p>
                                                <p><strong>Produit:</strong> {produit.produit.nom}</p>
                                                <p><strong>Quantité:</strong> {produit.quantite}</p>
                                                <p><strong>Prix unitaire:</strong> {produit.prix_unitaire} €</p>
                                                <p><strong>Total:</strong> {produit.total} €</p>
                                                <p><strong>Statut:</strong> {produit.status}</p>
                                                <p><strong>Contact:</strong> {produit.user.acheteur.numero}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <img src={`/storage/${produit.produit_lot.image_lot}`} alt="produit lot" className="w-48 h-48 object-cover rounded-lg" />
                                            <div className="space-y-3 text-center ml-4">
                                                <p><strong>Date:</strong> {new Date(produit.created_at).toLocaleDateString()}</p>
                                                <p><strong>Client:</strong> {produit.user.name}</p>
                                                <p><strong>email:</strong> {produit.user.email}</p>
                                                <p><strong>Lot:</strong> {produit.produit_lot.nom}</p>
                                                <p><strong>Description:</strong> {produit.produit_lot.description}</p>
                                                <p><strong>Poids Total:</strong> {produit.produit_lot.poids_total}</p>
                                                <p><strong>Prix unitaire:</strong> {produit.prix_unitaire} €</p>
                                                <p><strong>Total:</strong> {produit.total} €</p>
                                                <p><strong>Statut:</strong> {produit.status}</p>
                                                <p><strong>Contact:</strong> {produit.user.acheteur.numero}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                            <div className="flex space-x-4 mt-4 justify-center">
                                <button
                                    onClick={() => setShowPrintModal(null)}
                                    className="flex items-center justify-center w-1/3 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200"
                                >
                                    Fermer
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    )
}