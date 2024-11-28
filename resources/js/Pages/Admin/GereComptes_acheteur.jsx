import React from 'react'
import AdminLayout from './Layout/AdminLayout'


export default function GereComptes_acheteur({ auth, allAcheteur }) {
  return (
    <AdminLayout
      auth={auth}
    >

      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Nom</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allAcheteur.map((acheteur) => (
              <tr key={acheteur.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{acheteur.name}</td>
                <td className="py-2 px-4 border-b">{acheteur.email}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded ${acheteur.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {acheteur.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                    View
                  </button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                    Status
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Supprimer
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
