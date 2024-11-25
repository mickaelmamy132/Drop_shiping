import { Link, Head } from '@inertiajs/react';
import NavLink from '../Components/NavLink';
import { Form, Input, Checkbox, Button, Select, Spin, Card, Col, Row } from 'antd';
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
                            <a className="inline-block text-blue-600 font-display font-extrabold text-1xl rounded-lg bg-white px-6 py-4 hover:bg-blue-100 transition-colors duration-300" href="">
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
                    <div className="mb-6">
                        <p className="text-2xl font-bold">Section Catégories</p>
                        <p className="text-gray-500">Découvrez nos principales catégories</p>
                    </div>
                    <div style={{ overflow: 'hidden', position: 'relative', whiteSpace: 'nowrap' }}>
                        <motion.div
                            initial={{ x: 0 }}
                            animate={{ x: ['0%', '-100%'] }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            style={{ display: 'flex', gap: '16px' }}
                        >
                            {Array(2)
                                .fill([
                                    {
                                        title: "Nourriture",
                                        description: "Découvrez les meilleures offres de produits alimentaires à prix réduits.",
                                        linkText: "Voir les offres",
                                        linkHref: "#nourriture",
                                        image: "https://images.unsplash.com/photo-1506807803488-8eafc15316c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                    },
                                    {
                                        title: "Maison",
                                        description: "Trouvez des meubles et des articles pour la maison à prix cassés.",
                                        linkText: "Voir les offres",
                                        linkHref: "#maison",
                                        image: "https://images.unsplash.com/photo-1589216532372-d07603a0f9f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                    },
                                    {
                                        title: "Vêtements",
                                        description: "Des vêtements pour tous les styles et toutes les tailles à prix réduits.",
                                        linkText: "Voir les offres",
                                        linkHref: "#vetements",
                                        image: "https://images.unsplash.com/photo-1533251100970-0a2deb6d2624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                    },
                                    {
                                        title: "Électronique",
                                        description: "Des appareils électroniques à prix imbattables.",
                                        linkText: "Voir les offres",
                                        linkHref: "#electronique",
                                        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                    },
                                    {
                                        title: "Sport",
                                        description: "Équipements sportifs de qualité à prix réduits.",
                                        linkText: "Voir les offres",
                                        linkHref: "#sport",
                                        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                    },
                                    {
                                        title: "Accessoires",
                                        description: "Trouvez une large gamme d'accessoires à des prix intéressants.",
                                        linkText: "Voir les offres",
                                        linkHref: "#accessoires",
                                        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                                    }
                                ])
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
                        <img className="transition duration-150 ease-in max-w-lg h-auto rounded-lg mb-8 md:mb-12 opacity-120"
                            src="{{ asset('images/medium-shot-man-logistic-warehouses.jpg') }}" alt="Logistique en entrepôt" />
                        <div className="mx-auto text-center mb-0 text-lg md:text-xl md:ml-8">
                            <p className="font-bold">Optimisez votre chaîne d'approvisionnement et réduisez vos coûts grâce à notre plateforme de drop shipping innovante. Connectez-vous à un réseau mondial de fournisseurs fiables et gérez vos commandes en toute simplicité.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <ul className="px-8 gap-4 gap-y-8 mb-12 sm:grid-cols-2 items-center lg:flex sm:justify-center lg:justify-evenly">
                        <li className="md:w-auto flex items-lg justify-center">
                            <p className="text-center md:text-lg text-gary-800">
                                <span className="inline-block text-blue-500 font-display font-extrabold text-4xl px-6 py-2 rounded-lg bg-indigo-50">+12 500</span>
                                <br />
                                <span className="leading-tight text-lg inline-block max-w[24ch] mt-2">
                                    acheteurs professionnels qualifiés
                                </span>
                            </p>
                        </li>
                        <li className="md:w-auto flex items-lg justify-center">
                            <p className="text-center md:text-lg text-gary-800">
                                <span className="inline-block text-blue-500 font-display font-extrabold text-4xl px-6 py-2 rounded-lg bg-indigo-50">+50 000</span>
                                <br />
                                <span className="leading-tight text-lg inline-block max-w[24ch] mt-2">
                                    produits vendus
                                </span>
                            </p>
                        </li>
                        <li className="md:w-auto flex items-lg justify-center">
                            <p className="text-center md:text-lg text-gary-800">
                                <span className="inline-block text-blue-500 font-display font-extrabold text-4xl px-6 py-2 rounded-lg bg-indigo-50">+8 000</span>
                                <br />
                                <span className="leading-tight text-lg inline-block max-w[24ch] mt-2">
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
                    className="mb-5"
                >
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <li className="rounded py-20 md:py-4 max-w-[420px] mx-auto flex flex-col items-center justify-center px-4 xl:px-6 relative text-center bg-gradient-to-br from-blue-50 to-gray-100 shadow-lg border border-blue-200 overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                            <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-bold text-blue-900">
                                Visitez notre marketplace dès maintenant
                            </h3>
                            <p className="mb-6 md:text-lg text-gray-700">
                                Découvrez une large gamme de produits à des prix compétitifs
                            </p>
                            <a className="outline-focus rounded-full border-none font-semibold transition duration-300 ease-in-out text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-8 w-full shadow-md hover:shadow-lg" href="">Voir les rubriques</a>
                        </li>
                        <li className="rounded py-20 md:py-4 max-w-[420px] flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 shadow-lg border border-green-200 overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-bold text-green-900">
                                Devenez vendeur
                            </h3>
                            <p className="mb-6 md:text-lg text-gray-700">
                                Rejoignez notre communauté de vendeurs et développez votre activité
                            </p>
                            <a className="outline-focus rounded-full border-none font-semibold transition duration-300 ease-in-out text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-8 w-full shadow-md hover:shadow-lg" href="">S'inscrire comme vendeur</a>
                        </li>
                        <li className="rounded py-20 md:py-4 max-w-[420px] flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-gray-100 shadow-lg border border-purple-200 overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                            <div className="absolute top-0 left-0 w-full h-2 bg-purple-500"></div>
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-bold text-purple-900">
                                Gérez vos stocks
                            </h3>
                            <p className="mb-6 md:text-lg text-gray-700">
                                Utilisez nos outils pour optimiser votre gestion des stocks
                            </p>
                            <a className="outline-focus rounded-full border-none font-semibold transition duration-300 ease-in-out text-center bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 px-8 w-full shadow-md hover:shadow-lg" href="">Accéder à la gestion des stocks</a>
                        </li>
                        <li className="rounded py-20 md:py-4 max-w-[420px] flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 shadow-lg border border-orange-200 overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                            <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-bold text-orange-900">
                                Support client
                            </h3>
                            <p className="mb-6 md:text-lg text-gray-700">
                                Notre équipe est là pour vous aider à chaque étape
                            </p>
                            <a className="outline-focus rounded-full border-none font-semibold transition duration-300 ease-in-out text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-8 w-full shadow-md hover:shadow-lg" href="">Contacter le support</a>
                        </li>
                    </ul>
                </motion.section>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col text-center bottom-smaller mt-10 mb-12"
                >
                    <h2 className="mx-auto mb-5 max-w-[26ch] order-2 text-primary-900 !text-2xl md:!text-3xl lg:!text-4xl">
                        Espace pour tous vos besoins commerciaux
                    </h2>
                    <p className="order-1 mb-2 uppercase text-blue-300 font-semibold">
                        Des affaires pour tous
                    </p>
                    <div className="order-3 prose text-center max-w-[64ch] mx-auto md:text-lg">
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
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="rounded-lg py-8 px-5 md:px-10 lg:flex lg:flex-col bg-[#EFF6FF]"
                    >
                        <h2 className="!text-[26px] !leading-[0.9] font-bold mb-8 text-blue-800">
                            Vendeur
                        </h2>
                        <figure className="relative w-full aspect-video rounded-lg overflow-hidden border-[3px] mb-8 border-[#60A5FA]/[.35]">
                            <picture className="absolute inset-0">
                                <img className="transition duration-150 ease-in min-w-full min-h-full object-cover w-full opacity-100 loaded"
                                    src="https://ik.imagekit.io/uwzsb7j5w/wp-content/uploads/sites/2/2022/12/stocklear-fr-dashboard-vendeurs.jpg"
                                    alt="Dashboard vendeurs" />
                            </picture>
                        </figure>
                        <div className="text-gray-600 mb-12 prose">
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
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-blue-500 text-white px-6 py-2 rounded-full"
                        >
                            Devenir vendeur
                        </motion.button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="rounded-lg py-8 px-5 md:px-10 lg:flex lg:flex-col bg-[#EFF6FF]"
                    >
                        <h2 className="!text-[26px] !leading-[0.9] font-bold mb-8 text-blue-800">
                            Acheteur
                        </h2>
                        <figure className="relative w-full aspect-video rounded-lg overflow-hidden border-[3px] mb-8 border-[#60A5FA]/[.35]">
                            <picture className="absolute inset-0">
                                <img className="transition duration-150 ease-in min-w-full min-h-full object-cover w-full opacity-100 loaded"
                                    src="https://ik.imagekit.io/uwzsb7j5w/wp-content/uploads/sites/2/2022/12/stocklear-fr-dashboard-acheteurs.jpg"
                                    alt="Dashboard acheteurs" />
                            </picture>
                        </figure>
                        <div className="text-gray-600 mb-12 prose">
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
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-blue-500 text-white px-6 py-2 rounded-full"
                        >
                            Devenir acheteur
                        </motion.button>
                    </motion.div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-blue-800">Gestion des stocks</h3>
                        <p className="text-gray-600 mb-4">Optimisez votre inventaire avec nos outils de gestion avancés.</p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            En savoir plus
                        </motion.button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-blue-800">Analyses et rapports</h3>
                        <p className="text-gray-600 mb-4">Accédez à des insights détaillés pour prendre des décisions éclairées.</p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Voir les rapports
                        </motion.button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-blue-800">Support client</h3>
                        <p className="text-gray-600 mb-4">Notre équipe est là pour vous aider à chaque étape de votre parcours.</p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Contacter le support
                        </motion.button>
                    </motion.div>
                </motion.section>

            </>
        </Accueil>
    )
}
