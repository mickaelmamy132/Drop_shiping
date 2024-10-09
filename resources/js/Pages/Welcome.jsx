import { Link, Head } from '@inertiajs/react';
import NavLink from '../Components/NavLink';
import { CarouselCustomArrows } from '../Components/Carousel';
import { motion } from 'framer-motion';

export default function Welcome({ auth }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <header className="bg-white">
                <nav className="flex justify-between items-center w-[92%] mx-auto bg-white">
                    <div>
                        <img className="w-20 h-25" src="/icons/Fuji-Dark.png" alt="Logo" />
                    </div>
                    <div className="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-0 md:w-auto w-full flex items-left px-5">
                        <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] items-center gap-[4vw]">
                            {auth.user ? (
                                <NavLink
                                    href={route('dashboard')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Dashboard
                                </NavLink>
                            ) : (
                                <>
                                    <NavLink
                                        href={route('register_acheteur')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Acheteur
                                    </NavLink>

                                    <NavLink
                                        href={route('register_vendeur')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Vendeur
                                    </NavLink>


                                    <NavLink
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </NavLink>
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="text-white px-5 py-2 bg-[#a6c1ee] rounded-full hover:bg-[#87a8e7] transition-colors duration-300">Connecter!</button>
                        <i className="fas fa-bars text-3xl cursor-pointer md:hidden" onClick={() => onToggleMenu()} data-menu="fas fa-bars"></i>
                    </div>
                </nav>
            </header>

            <main className="mt-6">
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

                <div className='mb-10'>
                    <CarouselCustomArrows />
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

            </main>
        </>
    )
}