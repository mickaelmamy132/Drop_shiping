import { Link, Head } from '@inertiajs/react';
import NavLink from '../Components/NavLink';
import { CarouselCustomArrows } from '../Components/Carousel';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Accueil from '../Layouts/Accueil';

export default function Welcome({ auth }) {

    const categories = [
        {
            title: "Nourriture",
            description: "Découvrez les meilleures offres de produits alimentaires à prix réduits.",
            linkText: "Voir les offres",
            linkHref: "#nourriture", // Ajouter un lien vers la section Nourriture
            image: "https://images.unsplash.com/photo-1506807803488-8eafc15316c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Image pour la catégorie Nourriture
        },
        {
            title: "Maison",
            description: "Trouvez des meubles et des articles pour la maison à prix cassés.",
            linkText: "Voir les offres",
            linkHref: "#maison", // Ajouter un lien vers la section Maison
            image: "https://images.unsplash.com/photo-1589216532372-d07603a0f9f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Image pour la catégorie Maison
        },
        {
            title: "Vêtements",
            description: "Des vêtements pour tous les styles et toutes les tailles à prix réduits.",
            linkText: "Voir les offres",
            linkHref: "#vetements", // Ajouter un lien vers la section Vêtements
            image: "https://images.unsplash.com/photo-1533251100970-0a2deb6d2624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Image pour la catégorie Vêtements
        },
        {
            title: "Électronique",
            description: "Des appareils électroniques à prix imbattables.",
            linkText: "Voir les offres",
            linkHref: "#electronique", // Ajouter un lien vers la section Électronique
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Image pour la catégorie Électronique
        },
        {
            title: "Sport",
            description: "Équipements sportifs de qualité à prix réduits.",
            linkText: "Voir les offres",
            linkHref: "#sport", // Ajouter un lien vers la section Sport
            image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Image pour la catégorie Sport
        },
        {
            title: "Accessoires",
            description: "Trouvez une large gamme d'accessoires à des prix intéressants.",
            linkText: "Voir les offres",
            linkHref: "#accessoires", // Ajouter un lien vers la section Accessoires
            image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Image pour la catégorie Accessoires
        }
    ];

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


                {/* <div className='mb-10'>
                    <CarouselCustomArrows />
                    
                </div> */}
                {/* <div className="mb-10 overflow-hidden">
                    <div className="mb-6">
                        <p className="text-2xl font-bold">Section Catégories</p>
                        <p className="text-gray-500">Découvrez nos principales catégories</p>
                    </div>
                    <motion.div
                        className="flex space-x-4"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    >
                        {categories.map((category) => (
                            <motion.div
                                key={category.id}
                                className="border rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
                                style={{ width: "300px", height: "400px" }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: category.id * 0.2 }}
                            >
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="h-2/3 w-full object-cover rounded-tl-[16px] rounded-tr-[16px]" // Bordures pour les coins supérieurs seulement
                                />
                                <div className="pt-16 px-4">
                                    <h3 className="text-lg font-bold">{category.title}</h3>
                                    <p className="text-sm text-gray-500">Trouvez les meilleures offres</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div> */}
                <div className="mb-10 overflow-hidden">
                    <div className="mb-6">
                        <p className="text-2xl font-bold">Section Catégories</p>
                        <p className="text-gray-500">Découvrez nos principales catégories</p>
                    </div>
                    <motion.div
                        className="flex space-x-4 overflow-x-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    >
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                className="border rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
                                style={{ width: "300px", height: "400px" }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.3, // Augmente le délai pour chaque carte
                                }}
                            >
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="h-2/3 w-full object-cover rounded-tl-[16px] rounded-tr-[16px]"
                                />
                                <div className="pt-10 px-4">
                                    <h3 className="text-xl font-bold mb-4">{category.title}</h3> {/* Ajout d'une marge inférieure */}
                                    <a
                                        href={category.linkHref}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {category.linkText}
                                    </a>
                                </div>

                            </motion.div>
                        ))}
                    </motion.div>
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
                        <li className="rounded py-20 md:py-4 max-w-[420px] mx-auto flex flex-col items-center justify-center px-4 xl:px-6 relative text-center bg-gray-200 shadow-2xl border-2 overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-semibold text-gray-900">
                                Visitez notre marketplace dès maintenant
                            </h3>
                            <p className="mb-6 md:text-lg">
                                Découvrez une large gamme de produits à des prix compétitifs
                            </p>
                            <a className="outline-focus rounded border-[1.5px] font-medium transition duration-150 ease-in text-center bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-[16px] w-full" href="">Voir les rubriques</a>
                        </li>
                        <li className="rounded py-20 md:py-4 max-w-[420px] flex flex-col items-center justify-center bg-gray-200 shadow-2xl border-2 overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-semibold text-gray-900">
                                Devenez vendeur
                            </h3>
                            <p className="mb-6 md:text-lg">
                                Rejoignez notre communauté de vendeurs et développez votre activité
                            </p>
                            <a className="outline-focus rounded border-[1.5px] font-medium transition duration-150 ease-in text-center bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-[16px] w-full" href="">S'inscrire comme vendeur</a>
                        </li>
                        <li className="rounded py-20 md:py-4 max-w-[420px] flex flex-col items-center justify-center bg-gray-200 shadow-2xl border-2 overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-semibold text-gray-900">
                                Gérez vos stocks
                            </h3>
                            <p className="mb-6 md:text-lg">
                                Utilisez nos outils pour optimiser votre gestion des stocks
                            </p>
                            <a className="outline-focus rounded border-[1.5px] font-medium transition duration-150 ease-in text-center bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-[16px] w-full" href="">Accéder à la gestion des stocks</a>
                        </li>
                        <li className="rounded py-20 md:py-4 max-w-[420px] flex flex-col items-center justify-center bg-gray-200 shadow-2xl border-2 overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-semibold text-gray-900">
                                Support client
                            </h3>
                            <p className="mb-6 md:text-lg">
                                Notre équipe est là pour vous aider à chaque étape
                            </p>
                            <a className="outline-focus rounded border-[1.5px] font-medium transition duration-150 ease-in text-center bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-[16px] w-full" href="">Contacter le support</a>
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
