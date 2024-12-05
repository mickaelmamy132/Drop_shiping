import React, { useState } from 'react'
import AdminLayout from './Layout/AdminLayout'
import { motion } from 'framer-motion'
import DashboardCard from '../../Components/DashboardCard'
import { CurrencyDollarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Head, Link } from '@inertiajs/react'

export default function GereComptes_acheteur({ auth, allAcheteur, produit, produit_lot }) {
  console.log(allAcheteur)
  const [acheteurs, setAcheteurs] = useState()

  const handleDelete = (id) => {
    setAcheteurs(acheteurs.filter(acheteur => acheteur.id !== id))
  }

  const handleStatus = (id) => {
    setAcheteurs(acheteurs.map(acheteur => {
      if (acheteur.id === id) {
        return {
          ...acheteur,
          status: acheteur.status === 'Actif' ? 'Inactif' : 'Actif'
        }
      }
      return acheteur
    }))
  }

  return (
    <AdminLayout
      auth={auth}
    >
      <Head title="List-acheteurs" />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8 bg-gradient-to-r from-blue-100 to-purple-100"
      >
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-2"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Gestion des Comptes Acheteurs
        </motion.h1>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Gérez facilement les comptes et les accès des acheteurs
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 sm: 2xl:grid-cols-4 gap-12 p-2  justify-center items-center mx-auto max-w-4xl"
      >
        <motion.div className="mb-6 mx-4" whileHover={{ scale: 1.05, x: 5, y: -5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <DashboardCard
            title="Articles"
            value={produit}
            icon={ShoppingBagIcon}
            footer="Increased by 10% since last month"
            additionalInfo="Order #1,234"
          />
        </motion.div>
        <motion.div className="mb-6 mx-4" whileHover={{ scale: 1.05, x: 5, y: -5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <DashboardCard
            title="Lots"
            value={produit_lot}
            icon={ShoppingBagIcon}
            footer="Increased by 10% since last month"
            additionalInfo="Order #1,234"
          />
        </motion.div>
      </motion.div>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Gestion des Comptes Acheteurs</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Nom</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allAcheteur.map((acheteur) => (
              <tr key={acheteur.id}>
                <td className="py-2 px-4 border">{acheteur.user.name}</td>
                <td className="py-2 px-4 border">{acheteur.user.email}</td>
                <td className="py-2 px-4 border">
                  <span className={`px-2 py-1 rounded ${acheteur.status === 'Actif' ? 'bg-green-200' : 'bg-red-200'}`}>
                    {acheteur.status}
                  </span>
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(acheteur.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Supprimer
                  </button>
                  <Link
                  // href={route('admin.infos_acheteur', acheteur.user_id)}
                  >
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleStatus(acheteur.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}