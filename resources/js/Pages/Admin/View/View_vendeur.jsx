import React from 'react'
import { motion } from 'framer-motion'
import PresentLayout from '../Layout/PresentLayout'
import { Link } from '@inertiajs/react'
export default function View_vendeur({ auth, vendeur, produit, produit_lot }) {
  // console.log(vendeur, produit, produit_lot)
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <PresentLayout auth={auth}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 space-y-8 bg-gray-100"
      >
        <Link
          href={route('admin.gereCompte.vendeur')}
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300 mb-6"
        >
          Gérer le compte
        </Link>


        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-2xl p-8 hover:shadow-2xl transition-all duration-300"
        >
          <h2 className="text-3xl font-bold mb-6 text-indigo-800 border-b pb-3">Profil Vendeur</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-800"><span className="font-bold text-indigo-600">Entreprise:</span> {vendeur.nom_de_l_entreprise}</p>
              <p className="text-gray-800"><span className="font-bold text-indigo-600">Activité:</span> {JSON.parse(vendeur.activite).join(", ")}</p>
              <p className="text-gray-800"><span className="font-bold text-indigo-600">Industries:</span> {JSON.parse(vendeur.industrie).flat().join(", ")}</p>
              <p className="text-gray-800"><span className="font-bold text-indigo-600">Numéro:</span> {vendeur.numero}</p>
              <p className="text-gray-800"><span className="font-bold text-indigo-600">Ville:</span> {vendeur.ville}</p>
              <p className="text-gray-800"><span className="font-bold text-indigo-600">Code postal:</span> {vendeur.code_postal}</p>
              <p className="text-gray-800"><span className="font-bold text-indigo-600">Description:</span> {vendeur.description}</p>
              <p className="text-gray-800"><span className="font-bold text-indigo-600">Facturation:</span> {vendeur.facturation}</p>
              <p className="text-gray-800"><span className="font-bold text-indigo-600">Documentation:</span> {vendeur.documentation}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-2xl p-8 hover:shadow-2xl transition-all duration-300"
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-800 border-b pb-3">Catalogue Produits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produit.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, rotate: 1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-100"
              >
                <img src={`/storage/${item.image_rubrique}`} alt={item.nom} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold mb-3 text-purple-700">{item.nom}</h3>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Prix:</span> {item.prix}€</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Stock:</span> {item.quantite} unités</p>
                <p className="text-gray-700"><span className="font-semibold">Détails:</span> {item.description}</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <Link
                    // href={route('admin.produit.pause', item.id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Mettre en pause
                  </Link>
                  <Link
                    // href={route('admin.produit.delete', item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    method="delete"
                  >
                    Supprimer
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-2xl p-8 hover:shadow-2xl transition-all duration-300"
        >
          <h2 className="text-3xl font-bold mb-6 text-teal-800 border-b pb-3">Offres en Lot</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produit_lot.map((lot, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, rotate: -1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-teal-100"
              >


                <div className="flex flex-col">
                  <div className="w-full mb-4">
                    <img src={`/storage/${lot.image_lot}`} alt={lot.nom} className="w-full h-48 object-cover rounded-lg" />
                  </div>

                  <div className="w-full">
                    <h3 className="text-xl font-bold mb-3 text-teal-700">{lot.nom}</h3>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Nom du lot:</span> {lot.nom}€</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Prix lot:</span> {lot.prix}€</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Quantité:</span> {lot.quantite}</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Description:</span> {lot.description}</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Etat:</span> {lot.etat}</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Categorie:</span> {lot.categorie_id}</p>
                    <p className="text-gray-700"><span className="font-semibold">Détails:</span> {lot.description}</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Link
                    // href={route('admin.lot                           .pause', lot.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Mettre en pause
                  </Link>
                  <Link
                    // href={route('admin.lot.delete', lot.id)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    method="delete"
                  >
                    Supprimer
                  </Link>
                </div>
              </motion.div>
            ))}

          </div>        </motion.div>
      </motion.div>
    </PresentLayout>




  )
}