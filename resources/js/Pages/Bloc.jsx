import React from 'react'
import { Link } from '@inertiajs/react'
import Accueil from '../Layouts/Accueil';


export default function Bloc({ auth }) {
    const blogPosts = [
        {
            id: 1,
            title: "5 astuces pour choisir un produit reconditionné de qualité",
            category: "Conseils pratiques",
            excerpt: "Découvrez nos conseils d'experts pour faire les meilleurs choix en matière de produits reconditionnés...",
            date: "2024-01-15",
            image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3"
        },
        {
            id: 2,
            title: "Les tendances 2024 pour économiser sur les articles de maison",
            category: "Tendances",
            excerpt: "Explorez les dernières tendances et astuces pour réaliser des économies sur vos achats maison...",
            date: "2024-01-10",
            image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3"
        },
        {
            id: 3,
            title: "Comment le déstockage contribue à réduire le gaspillage",
            category: "Responsabilité environnementale",
            excerpt: "Découvrez l'impact positif du déstockage sur l'environnement et la réduction du gaspillage...",
            date: "2024-01-05",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3"
        }
    ]

    return (
        <Accueil
            auth={auth}
        >
            <Link href="/" className="block mb-6 text-blue-600 hover:text-blue-800 transition-colors">
                ← Retour à l'accueil
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ml-auto mr-8">
                {blogPosts.map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="relative aspect-square mb-4 overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute top-2 right-2">
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded animate-pulse">
                                    {post.category}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">{post.title}</h3>

                        <p className="text-gray-600 mb-4">{post.excerpt}</p>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                                {new Date(post.date).toLocaleDateString()}
                            </span>
                            <Link
                                href={`/blog/${post.id}`}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                            >
                                Lire la suite
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </Accueil>

    )
}