import React from 'react'
import { Link } from '@inertiajs/react'
import AdminLayout from './Layout/AdminLayout'
import { BarChart } from '@mui/x-charts'
import DashboardCard from '../../Components/DashboardCard'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function Dashboard({ auth, produit, produit_lot, allUser }) {
  const chartData = [
    { value: 10, label: 'Jan' },
    { value: 20, label: 'Feb' },
    { value: 15, label: 'Mar' },
  ]

  return (
    <AdminLayout
      auth={auth}
    >
      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 sm: 2xl:grid-cols-4 gap-4 p-4"
      >
        <motion.div whileHover={{ scale: 1.05, x: 5, y: -5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <DashboardCard
            title="Acheteur"
            value={allUser.length}
            icon={CurrencyDollarIcon}
            footer="Increased by 10% since last month"
            additionalInfo="Order #1,234"
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05, x: 5, y: -5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <DashboardCard
            title="Vendeur"
            value={allUser.length}
            icon={CurrencyDollarIcon}
            footer="Increased by 10% since last month"
            additionalInfo="Order #1,234"
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05, x: 5, y: -5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <DashboardCard
            title="Articles"
            value={allUser.length}
            icon={CurrencyDollarIcon}
            footer="Increased by 10% since last month"
            additionalInfo="Order #1,234"
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05, x: 5, y: -5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <DashboardCard
            title="Lots"
            value={allUser.length}
            icon={CurrencyDollarIcon}
            footer="Increased by 10% since last month"
            additionalInfo="Order #1,234"
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
  <div class="bg-white shadow rounded-lg p-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-800">160</h2>
        <p class="text-sm text-red-500 mt-1">▼ 12 420 €</p>
      </div>
      <div>
        <h2 class="text-3xl font-bold text-green-600">403 k€</h2>
        <canvas id="goalChart" class="h-20 w-20"></canvas>
      </div>
    </div>
    <p class="mt-4 text-gray-500 text-sm">Objectif : 275 000 €</p>
  </div>

  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-lg font-bold text-gray-800 mb-4">Qualité des produits</h2>
    <ul class="space-y-2">
      <li class="flex justify-between items-center">
        <span class="text-sm font-medium text-green-600">Retour client fonctionnel</span>
        <span class="w-2/3 h-2 bg-green-600 rounded-full"></span>
      </li>
      <li class="flex justify-between items-center">
        <span class="text-sm font-medium text-yellow-500">Non testé</span>
        <span class="w-1/3 h-2 bg-yellow-500 rounded-full"></span>
      </li>
      <li class="flex justify-between items-center">
        <span class="text-sm font-medium text-red-600">Dommages dus au transport</span>
        <span class="w-1/5 h-2 bg-red-600 rounded-full"></span>
      </li>
    </ul>
    <p class="mt-4 text-gray-500 text-sm">Mise à jour : 5h</p>
  </div>
</div>

        <BarChart
          xAxis={[{ scaleType: 'band', data: chartData.map(item => item.label) }]}
          series={[{ data: chartData.map(item => item.value) }]}
          width={500}
          height={300}
        />
      </motion.div>

    </AdminLayout>
  )
}