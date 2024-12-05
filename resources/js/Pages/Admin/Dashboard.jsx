import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AdminLayout from './Layout/AdminLayout'
import { BarChart } from '@mui/x-charts'
import DashboardCard from '../../Components/DashboardCard'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Donate from '../../Components/Donate'

export default function Dashboard({
  auth, produit, produit_lot,
  VendeurCount, AcheteurCount,
  CommandeParMois, produitCount,
  produit_lotCount
}) {
  const chartData = [
    { value: 10, label: 'Jan' },
    { value: 20, label: 'Feb' },
    { value: 15, label: 'Mar' },
  ]

  return (
    <AdminLayout
      auth={auth}
    >
      <Head title="Dashboard" />
      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-row flex-wrap justify-center p-2 dark:bg-gray-900"      >
        <motion.div className="mb-4 scale-90" whileHover={{ scale: 0.95, x: 5, y: -5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <DashboardCard
            title="Acheteur"
            value={AcheteurCount}
            icon={CurrencyDollarIcon}
            footer="Increased by 10% since last month"
            additionalInfo="Order #1,234"
            className="dark:bg-gray-800 dark:text-white"
          />
        </motion.div>
        <motion.div className="mb-4 mx-2 scale-90" whileHover={{ scale: 0.95, x: 5, y: -5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <DashboardCard
            title="Vendeur"
            value={VendeurCount}
            icon={CurrencyDollarIcon}
            footer="Increased by 10% since last month"
            additionalInfo="Order #1,234"
            className="dark:bg-gray-800 dark:text-white"
          />
        </motion.div>
        <motion.div className="mb-4 mx-2 scale-90" whileHover={{ scale: 0.95, x: 5, y: -5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <DashboardCard
            title="Articles"
            value={produitCount}
            icon={CurrencyDollarIcon}
            footer="Increased by 10% since last month"
            additionalInfo="Order #1,234"
            className="dark:bg-gray-800 dark:text-white"
          />
        </motion.div>
        <motion.div className="mb-4 mx-2 scale-90" whileHover={{ scale: 0.95, x: 5, y: -5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <DashboardCard
            title="Lots"
            value={produit_lotCount}
            icon={CurrencyDollarIcon}
            footer="Increased by 10% since last month"
            additionalInfo="Order #1,234"
            className="dark:bg-gray-800 dark:text-white"
          />
        </motion.div>
      </motion.div>      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Transactions</h2>
                <h3 class="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">1,234</h3>
                <p class="text-sm text-green-500 dark:text-green-400 mt-1">▲ +15% ce mois</p>
              </div>
              <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm">Dernière transaction: il y a 5 min</p>
          </div>

          <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Revenus</h2>
                <h3 class="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">5*67,890 €</h3>
                <p class="text-sm text-green-500 dark:text-green-400 mt-1">▲ +8% ce mois</p>
              </div>
              <div class="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Objectif mensuel</span>
                <span>75%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div class="bg-green-600 dark:bg-green-400 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-row gap-4"
        >
          <BarChart
            xAxis={[{ scaleType: 'band', data: chartData.map(item => item.label) }]}
            series={[{ data: chartData.map(item => item.value) }]}
            width={500}
            height={300}
          />
          <Donate />
        </motion.div>      </motion.div>

    </AdminLayout>
  )
}