import { Link, Head } from '@inertiajs/react';
import NavLink from '../Components/NavLink';
import { Card, Col, Row } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Accueil from '../Layouts/Accueil';

export default function Welcome({ auth }) {
    return (
        <Accueil
            auth={auth}
        >
            <>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-lg px-4 md:px-8 py-8 md:py-12 lg:py-20 text-center block-cta bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl no-prose font-bold mb-4">
                        Bienvenue sur notre plateforme de drop shipping
                    </h2>
                    <div className="text-center md:text-lg max-w-[64ch] mx-auto">
                        <p>
                            Découvrez une nouvelle façon de faire du commerce en ligne avec notre plateforme innovante de drop shipping. Gérez votre inventaire, trouvez des fournisseurs fiables et développez votre entreprise sans tracas.
                        </p>
                    </div>
                    <ul className="gap-6 flex flex-col sm:flex-row mt-8 sm:justify-center list-none">
                        <li>
                            <a className="inline-block text-blue-600 font-display font-extrabold text-1xl rounded-lg bg-white px-6 py-4 hover:bg-blue-100 transition-colors duration-300" href="">
                                À propos
                            </a>
                        </li>
                        <li>
                            <a className="inline-block text-blue-600 font-display font-extrabold text-1xl rounded-lg bg-white px-6 py-4 hover:bg-blue-100 transition-colors duration-300" href="">
                                Guide
                            </a>
                        </li>
                        <li>
                            <a
                                href={route('assistance')}
                                className="inline-block text-blue-600 font-display font-extrabold text-1xl rounded-lg bg-white px-6 py-4 hover:bg-blue-100 transition-colors duration-300" >
                                Assistance
                            </a>
                        </li>
                    </ul>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-row justify-center gap-5 items-center rounded-lg px-4 md:px-8 py-8 md:py-12 lg:py-20 text-center block-cta bg-gradient-to-r "
                >
                    <Link href='/voir-rubriques' className='bg-blue-400 p-3 rounded-xl hover:animate-pulse hover:bg-green-500'>voir les article</Link>
                    <Link href='/voir-lots' className='bg-blue-400 p-3 rounded-xl hover:animate-pulse hover:bg-green-500'>voir les lots</Link>
                </motion.div>


                <div className="mb-10 overflow-hidden">
                    <div className="mb-6 ml-8">
                        <p className="text-2xl font-bold">Section Catégories</p>
                        <p className="text-gray-500">Découvrez nos principales catégories</p>
                    </div>
                    <div style={{ overflow: 'hidden', position: 'relative', whiteSpace: 'nowrap' }}>
                        <motion.div
                            initial={{ x: 0 }}
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: 'linear',
                                repeatType: "reverse"
                            }}
                            style={{ display: 'flex', gap: '24px', padding: '16px' }}
                        >                            {Array(2)
                            .fill([
                                {
                                    title: "Vêtements",
                                    description: "Découvrez les meilleures offres de vêtements de stock à prix réduits.",
                                    linkText: "Voir les offres",
                                    linkHref: "#vetements",
                                    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                },
                                {
                                    title: "Bricolage",
                                    description: "Trouvez des outils et du matériel de bricolage à prix cassés.",
                                    linkText: "Voir les offres",
                                    linkHref: "#bricolage",
                                    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                },
                                {
                                    title: "Sport",
                                    description: "Des équipements sportifs pour tous les niveaux à prix réduits.",
                                    linkText: "Voir les offres",
                                    linkHref: "#sport",
                                    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                },
                                {
                                    title: "Cuisine",
                                    description: "Des ustensiles et équipements de cuisine à prix imbattables.",
                                    linkText: "Voir les offres",
                                    linkHref: "#cuisine",
                                    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                },
                                {
                                    title: "Entretien Ménager",
                                    description: "Équipements et produits d'entretien ménager à prix réduits.",
                                    linkText: "Voir les offres",
                                    linkHref: "#menager",
                                    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                },
                                {
                                    title: "Électronique",
                                    description: "Trouvez une large gamme de matériel électronique à des prix intéressants.",
                                    linkText: "Voir les offres",
                                    linkHref: "#electronique",
                                    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                }])
                            .flat()
                            .map((item, index) => (
                                <div key={index} style={{ minWidth: '250px', flexShrink: 0 }}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ width: '250px', height: '100%' }}
                                    >
                                        <Card
                                            title={item.title}
                                            bordered={false}
                                            cover={<img src={item.image} alt={item.title} style={{ height: '150px', objectFit: 'cover' }} />}
                                            style={{ height: '100%', width: '100%', overflow: 'hidden' }}
                                        >
                                            <div style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.description}
                                            </div>
                                            <Link href={item.linkHref} className="text-blue-500 hover:text-blue-700 mt-2 inline-block">
                                                {item.linkText}
                                            </Link>
                                        </Card>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>


                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="items-center gap-4"
                >
                    <div className="items-center md:w-auto mx-auto px-5 py-8 justify-center text-center md:mb-12">
                        <h3 className="max-w-[40ch] text-2xl md:text-3xl font-semibold lg:text-4xl mx-auto text-center mb-8 md:mb-12">
                            Drop shipping, le milieu professionnel dédié au déstockage
                        </h3>
                    </div>

                    <div className="flex flex-col md:flex-row items-center">
                        <img className="transition duration-150 ease-in max-w-xl h-64 rounded-lg mb-8 md:mb-12 opacity-120"
                            src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" alt="Logistique en entrepôt" />
                        <div className="mx-auto text-center mb-0 text-lg md:text-xl md:ml-8">
                            <p className="font-bold">Optimisez votre chaîne d'approvisionnement et réduisez vos coûts grâce à notre plateforme de drop shipping innovante. Connectez-vous à un réseau mondial de fournisseurs fiables et gérez vos commandes en toute simplicité.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="py-12 bg-gradient-to-b from-white to-gray-50"
                >
                    <ul className="px-8 gap-8 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center max-w-7xl mx-auto">
                        <li className="transform hover:scale-105 transition-transform duration-300">
                            <p className="text-center md:text-lg text-gray-800 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <span className="inline-block text-blue-500 font-display font-extrabold text-5xl px-8 py-3 rounded-lg bg-indigo-50 shadow-inner mb-4">+12 500</span>
                                <br />
                                <span className="leading-tight text-xl font-semibold inline-block max-w-[24ch] mt-4">
                                    acheteurs professionnels qualifiés
                                </span>
                            </p>
                        </li>
                        <li className="transform hover:scale-105 transition-transform duration-300">
                            <p className="text-center md:text-lg text-gray-800 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <span className="inline-block text-blue-500 font-display font-extrabold text-5xl px-8 py-3 rounded-lg bg-indigo-50 shadow-inner mb-4">+50 000</span>
                                <br />
                                <span className="leading-tight text-xl font-semibold inline-block max-w-[24ch] mt-4">
                                    produits vendus
                                </span>
                            </p>
                        </li>
                        <li className="transform hover:scale-105 transition-transform duration-300">
                            <p className="text-center md:text-lg text-gray-800 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <span className="inline-block text-blue-500 font-display font-extrabold text-5xl px-8 py-3 rounded-lg bg-indigo-50 shadow-inner mb-4">+8 000</span>
                                <br />
                                <span className="leading-tight text-xl font-semibold inline-block max-w-[24ch] mt-4">
                                    produits recyclés
                                </span>
                            </p>
                        </li>
                    </ul>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mb-8 max-w-9xl mx-auto px-6"
                >
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
                        <li className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 transform hover:-translate-y-2">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Marketplace
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Trouvez des lots et du déstockage à prix avantageux
                            </p>
                            <a
                                href='/voir-rubriques'
                                className="inline-block w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold">
                                Explorer
                            </a>
                        </li>
                        <li className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 transform hover:-translate-y-2">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Espace Vendeur
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Vendez vos surplus et stocks dormants
                            </p>
                            <a
                                href=""
                                className="inline-block w-full text-center bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold">
                                Commencer
                            </a>
                        </li>
                        <li className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500 transform hover:-translate-y-2">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Gestion Stocks
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Pilotez vos stocks efficacement
                            </p>
                            <a
                                href=""
                                className="inline-block w-full text-center bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 font-semibold">
                                Gérer
                            </a>
                        </li>
                        <li className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 transform hover:-translate-y-2">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Assistance
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Besoin d'aide ? Contactez-nous
                            </p>
                            <a
                                href=""
                                className="inline-block w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold">
                                Contact
                            </a>
                        </li>
                    </ul>
                </motion.section>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col text-center bottom-smaller mt-16 mb-16"
                >
                    <h2 className="mx-auto mb-6 max-w-[26ch] order-2 text-primary-900 !text-3xl md:!text-4xl lg:!text-5xl font-bold">
                        Espace pour tous vos besoins commerciaux
                    </h2>
                    <p className="order-1 mb-3 uppercase text-blue-500 font-bold tracking-wider">
                        Des affaires pour tous
                    </p>
                    <div className="order-3 prose text-center max-w-[64ch] mx-auto md:text-xl text-gray-600 leading-relaxed">
                        <p>
                            Vous trouverez ici l'ensemble des infos utiles relatives au déstockage, aux invendus, aux palettes,
                            à la supply chain des overstock, ainsi que des opportunités uniques pour développer votre activité.
                        </p>
                    </div>
                </motion.div>

                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl py-10 px-8 md:px-12 lg:flex lg:flex-col bg-gradient-to-br from-blue-50 to-white shadow-xl"
                    >
                        <h2 className="text-3xl font-bold mb-10 text-blue-800">
                            Vendeur
                        </h2>
                        <figure className="relative w-full aspect-video rounded-xl overflow-hidden border-4 mb-10 border-blue-200 shadow-lg">
                            <picture className="absolute inset-0">
                                <img className="transition duration-300 ease-in min-w-full min-h-full object-cover w-full hover:scale-105"
                                    src="https://ik.imagekit.io/uwzsb7j5w/wp-content/uploads/sites/2/2022/12/stocklear-fr-dashboard-vendeurs.jpg"
                                    alt="Dashboard vendeurs" />
                            </picture>
                        </figure>
                        <div className="text-gray-700 mb-12 prose prose-lg">
                            <p>
                                Notre marketplace permet aux retailers majeurs (marques et distributeurs) d'écouler de manière
                                contrôlée leurs stocks, invendus et retours clients.
                            </p>
                            <p>
                                Contrôlez la distribution de vos surstocks et choisissez de les vendre via des ventes aux
                                enchères de déstockage.
                            </p>
                            <p>
                                Le réseau d'acheteur est constitué de grandes enseignes du discount, de grossistes en
                                déstockage, de soldeurs,…
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Link href={route('register_vendeur')}>Devenir vendeur</Link>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl py-10 px-8 md:px-12 lg:flex lg:flex-col bg-gradient-to-br from-blue-50 to-white shadow-xl"
                    >
                        <h2 className="text-3xl font-bold mb-10 text-blue-800">
                            Acheteur
                        </h2>
                        <figure className="relative w-full aspect-video rounded-xl overflow-hidden border-4 mb-10 border-blue-200 shadow-lg">
                            <picture className="absolute inset-0">
                                <img className="transition duration-300 ease-in min-w-full min-h-full object-cover w-full hover:scale-105"
                                    src="https://ik.imagekit.io/uwzsb7j5w/wp-content/uploads/sites/2/2022/12/stocklear-fr-dashboard-acheteurs.jpg"
                                    alt="Dashboard acheteurs" />
                            </picture>
                        </figure>
                        <div className="text-gray-700 mb-12 prose prose-lg">
                            <p>
                                Notre marketplace offre aux acheteurs une opportunité unique d'accéder à des stocks de grandes marques à des prix compétitifs.
                            </p>
                            <p>
                                Participez à des ventes aux enchères exclusives et trouvez les meilleures affaires pour votre entreprise.
                            </p>
                            <p>
                                Bénéficiez d'une large gamme de produits provenant de retailers majeurs et développez votre activité.
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Link href={route('register_acheteur')}>Devenir acheteur</Link>
                        </motion.button>
                    </motion.div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <motion.div whileHover={{ scale: 1.03 }} className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl">
                        <h3 className="text-2xl font-bold mb-6 text-blue-800">Gestion des stocks</h3>
                        <p className="text-gray-700 mb-8 text-lg">Optimisez votre inventaire avec nos outils de gestion avancés.</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            En savoir plus
                        </motion.button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl">
                        <h3 className="text-2xl font-bold mb-6 text-blue-800">Analyses et rapports</h3>
                        <p className="text-gray-700 mb-8 text-lg">Accédez à des insights détaillés pour prendre des décisions éclairées.</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Voir les rapports
                        </motion.button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl">
                        <h3 className="text-2xl font-bold mb-6 text-blue-800">Support client</h3>
                        <p className="text-gray-700 mb-8 text-lg">Notre équipe est là pour vous aider à chaque étape de votre parcours.</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Contacter le support
                        </motion.button>
                    </motion.div>
                </motion.section>

            </>
        </Accueil>
    )
}
