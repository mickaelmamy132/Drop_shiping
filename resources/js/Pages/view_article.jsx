import React from 'react'
import { Link, Head } from '@inertiajs/react';
import NavLink from '../Components/NavLink';
import { Card, Typography, Button, Select, Option } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';


export default function view_article({ auth, produits }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAcheteurOpen, setIsAcheteurOpen] = useState(false);
    const [isVendeurOpen, setIsVendeurOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false); // Initialiser à false
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isQualiteOpen, setIsQualiteOpen] = useState(false);
    const [selectedQualites, setSelectedQualites] = useState([]);
    const [quantity, setQuantity] = useState('1');


    const toggleQualite = () => setIsQualiteOpen(!isQualiteOpen);
    const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);

    

    useEffect(() => {
        // Fetch categories from API
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categorieses');
                setCategories(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        // Set initial screen size and add event listener for resize
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1068);
        };

        fetchCategories();
        handleResize(); // Initialize on mount
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter((id) => id !== categoryId)
                : [...prevSelected, categoryId]
        );
    };

    const handleQualiteChange = (qualite) => {
        setSelectedQualites((prevSelected) =>
            prevSelected.includes(qualite)
                ? prevSelected.filter((q) => q !== qualite)
                : [...prevSelected, qualite]
        );
    };

    // Filter products based on selected categories and qualities
    const filteredProduits = produits.filter((produit) => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(produit.categorie_id);
        const matchesQualite = selectedQualites.length === 0 || selectedQualites.includes(produit.etat);
        return matchesCategory && matchesQualite;
    });

    const fadeInVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    return (

        // <header className="bg-white">
        //     <nav className="flex justify-between items-center w-[92%] mx-auto bg-white">
        //         <div>
        //             <img className="w-20 h-25" src="/icons/Fuji-Dark.png" alt="Logo" />
        //         </div>
        //         <div className="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-0 md:w-auto w-full flex items-left px-5">
        //             <div className="relative">
        //                 <button
        //                     className="flex md:hidden items-center rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
        //                     onClick={() => setIsOpen(!isOpen)}
        //                 >
        //                     Menu
        //                     <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        //                     </svg>
        //                 </button>
        //                 <ul
        //                     className={`absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg md:static md:flex md:w-auto md:shadow-none ${isOpen ? 'block' : 'hidden md:block'}`}
        //                 >
        //                     {auth.user ? (
        //                         <li>
        //                             <NavLink
        //                                 href={route('dashboard')}
        //                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        //                             >
        //                                 Dashboard
        //                             </NavLink>
        //                         </li>
        //                     ) : (
        //                         <>
        //                             <li className="relative">
        //                                 <button
        //                                     onClick={() => setIsAcheteurOpen(!isAcheteurOpen)}
        //                                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        //                                 >
        //                                     Acheteur
        //                                     <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        //                                     </svg>
        //                                 </button>
        //                                 {isAcheteurOpen && (
        //                                     <ul className="absolute left-full top-0 w-48 rounded-md bg-white shadow-lg md:static md:flex md:w-auto md:shadow-none">
        //                                         <li>
        //                                             <NavLink
        //                                                 href={route('register_acheteur')}
        //                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        //                                             >
        //                                                 Register
        //                                             </NavLink>
        //                                         </li>
        //                                         <li>
        //                                             <NavLink
        //                                                 href={route('login_acheteur')}
        //                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        //                                             >
        //                                                 Login
        //                                             </NavLink>
        //                                         </li>
        //                                     </ul>
        //                                 )}
        //                             </li>
        //                             <li className="relative">
        //                                 <button
        //                                     onClick={() => setIsVendeurOpen(!isVendeurOpen)}
        //                                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        //                                 >
        //                                     Vendeur
        //                                     <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        //                                     </svg>
        //                                 </button>
        //                                 {isVendeurOpen && (
        //                                     <ul className="absolute left-full top-0 w-48 rounded-md bg-white shadow-lg md:static md:flex md:w-auto md:shadow-none">
        //                                         <li>
        //                                             <NavLink
        //                                                 href={route('register_vendeur')}
        //                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        //                                             >
        //                                                 Register
        //                                             </NavLink>
        //                                         </li>
        //                                         <li>
        //                                             <NavLink
        //                                                 href={route('login')}
        //                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        //                                             >
        //                                                 Login
        //                                             </NavLink>
        //                                         </li>
        //                                     </ul>
        //                                 )}
        //                             </li>
        //                         </>
        //                     )}
        //                 </ul>
        //             </div>
        //         </div>
        //         <div className="flex items-center gap-6">
        //             <button className="text-white px-5 py-2 bg-[#a6c1ee] rounded-full hover:bg-[#87a8e7] transition-colors duration-300">Connecter!</button>
        //             <i className="fas fa-bars text-3xl cursor-pointer md:hidden" onClick={() => setIsOpen(!isOpen)} data-menu="fas fa-bars"></i>
        //         </div>
        //     </nav>
        // </header>

        <div className="p-12 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='mb-5'
            >
                <Link href={route('Acheteur')} className="rounded-xl bg-red-600 text-white p-3 px-5 mr-5 items-center justify-center">
                    retour
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
            >
                <h1 className="text-2xl font-semibold mb-4">Article revendeur : acheter des articles déstockage en toute confiance</h1>
                <p className='text-gray-500 font-semibold'>Découvrez des articles revendeur, palettes solderie & grossiste déstockage, invendus et faillites en direct des plus grandes marques et retailers.</p>

            </motion.div>
            <motion.main
                className="mb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex-1 items-center mt-5">
                    <motion.div
                        className="flex justify-center items-center mt-5 bg-gray-200 py-4 px-5 rounded-xl mb-5"
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        <h3 className="font-bold text-2xl ml-3">Les articles en vente</h3>
                    </motion.div>
                    <div className='flex flex-row mx-auto'>
                        <div>
                            {!isSmallScreen ? (
                                <>
                                    <h3 className='font-semibold text-xl underline text-gray-400'>Filtrage</h3>
                                    <div className="flex justify-between items-center cursor-pointer" onClick={toggleCategories}>
                                        <h3 className="text-lg font-semibold">Catégories</h3>
                                        <span>{isCategoriesOpen ? '>' : '<'}</span>
                                    </div>

                                    {isCategoriesOpen && (
                                        <div className="mt-2">
                                            {categories.map((category, idx) => (
                                                <div key={idx} className="flex items-center mt-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox"
                                                        value={category.id}
                                                        onChange={() => handleCategoryChange(category.id)} // Ajoutez cette ligne
                                                        checked={selectedCategories.includes(category.id)} // Assurez-vous que la case à cocher soit marquée si elle est sélectionnée
                                                    />
                                                    <label className="ml-2">{category.nom}</label>
                                                </div>
                                            ))}

                                        </div>
                                    )}

                                    <div className="flex justify-between items-center cursor-pointer" onClick={toggleQualite}>
                                        <h3 className="text-lg font-semibold">Qualité</h3>
                                        <span>{isQualiteOpen ? '>' : '<'}</span>
                                    </div>

                                    {isQualiteOpen && (
                                        <div className="flex flex-col mt-2 space-y-2">
                                            {[
                                                "Bon état",
                                                "Retour client fonctionnel",
                                                "Neuf avec emballage d'origine",
                                                "Neuf sans emballage d'origine",
                                                "Premier main",
                                                "Dommage dus au transport",
                                                "Reconditionné",
                                                "Occasion fonctionnel",
                                                "Non fonctionnel",
                                                "Non testé"
                                            ].map((option, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox"
                                                        value={option}
                                                        onChange={() => handleQualiteChange(option)} // Gérer la sélection
                                                        checked={selectedQualites.includes(option)} // Assurez-vous que la case à cocher soit marquée si sélectionnée
                                                    />
                                                    <label className="ml-2">{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                </>
                            ) : null}

                            {isSmallScreen && isCategoriesOpen && (
                                <>
                                    {/* Filtres des catégories */}
                                    <div className="mt-2">
                                        <h3 className="text-lg font-semibold">Catégories</h3>
                                        {categories.map((category, idx) => (
                                            <div key={idx} className="flex items-center mt-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox"
                                                    value={category.id}
                                                    onChange={() => handleCategoryChange(category.id)}
                                                    checked={selectedCategories.includes(category.id)}
                                                />
                                                <label className="ml-2">{category.nom}</label>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Filtres de la qualité */}
                                    <h3 className="text-lg font-semibold mt-4">Qualité</h3>
                                    <div className="flex flex-col mt-2 space-y-2">
                                        {[
                                            "Bon état",
                                            "Retour client fonctionnel",
                                            "Neuf avec emballage d'origine",
                                            "Neuf sans emballage d'origine",
                                            "Premier main",
                                            "Dommage dus au transport",
                                            "Reconditionné",
                                            "Occasion fonctionnel",
                                            "Non fonctionnel",
                                            "Non testé",
                                        ].map((option, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox"
                                                    value={option}
                                                    onChange={() => handleQualiteChange(option)}
                                                    checked={selectedQualites.includes(option)}
                                                />
                                                <label className="ml-2">{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Produits */}
                        <motion.div
                            className="bg-white gap-5 mt-5 p-4 w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, staggerChildren: 0.1 }}
                        >
                            <div className='flex flex-row gap-5 w-full justify-between mb-5'>
                                <h2 className="font-bold text-xl mb-2 sm:mb-0">Liste des Articles</h2>
                                {isSmallScreen && (
                                    <div className="flex items-center cursor-pointer mt-4" onClick={toggleCategories}>
                                        <h3 className="text-lg font-semibold">Filtrer</h3>
                                        <span className="ml-2">🔽</span>
                                    </div>
                                )}
                                <div className="w-full sm:w-auto mt-2 sm:mt-0">
                                    <select
                                        id="sorting-options"
                                        className="block w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out text-gray-700 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <option value="" selected>...</option>
                                        <option value="date">Date d'ajout</option>
                                        <option value="units">Unités</option>
                                        <option value="auction-end">Fin de l'enchère</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full flex">
                                <div className="w-full text-gray-900 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                                    {filteredProduits.length === 0 ? (
                                        <p>Aucun produit disponible</p>
                                    ) : (
                                        filteredProduits.map((produit) => (
                                            <motion.div
                                                key={produit.id}
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="border border-gray-100 rounded-lg p-6 "

                                            >
                                                <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 max-w-2/4">
                                                    <div className="relative group overflow-hidden rounded-2xl mb-4">
                                                        {produit.image_rubrique && (
                                                            <img
                                                                src={`/storage/${produit.image_rubrique}`}
                                                                alt={produit.nom || 'Product image'}
                                                                className="w-full h-48 object-cover rounded-lg"
                                                            />
                                                        )}
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                                                    </div>
                                                    <Typography variant="h3" color="blue-gray" className="font-medium text-lg text-black mb-3">
                                                        <span className="text-black">Vendeur:</span> {produit.vendeur && produit.vendeur.nom_de_l_entreprise
                                                        }
                                                    </Typography>

                                                    <Typography variant="h3" color="blue-gray" className="font-bold text-xl mb-2 text-gray-800 transition-colors duration-300 hover:text-blue-500">
                                                        {produit.nom}
                                                    </Typography>

                                                    <div className="flex justify-between items-center mb-3">
                                                        <p nom_de_l_entreprise
                                                            className="text-gray-600">Prix unitaire:</p>
                                                        <p className="font-semibold text-indigo-600">{produit.prix} €</p>
                                                    </div>

                                                    <div className="flex justify-between items-center mb-3">
                                                        <p className="text-gray-600">Quantité:</p>
                                                        <p className="font-semibold">{produit.quantite}</p>
                                                    </div>

                                                    <div className="flex justify-between items-center mb-4">
                                                        <p className="text-gray-600">État:</p>
                                                        <p className="font-semibold text-green-600">{produit.etat}</p>
                                                    </div>

                                                    <div className='flex sm:flex-col lg:flex-col md:flex-col xl:flex-row sm:items-center sm:justify-between'>
                                                        <p>Quantité:</p>
                                                        <Select
                                                            value={quantity}
                                                            onChange={(e) => setQuantity(e)}
                                                            className="w-full sm:w-32 font-medium mb-4 sm:ml-12 xl:ml-0"
                                                        >
                                                            {[...Array(produit.quantite)].map((_, index) => (
                                                                <Option key={index + 1} value={(index + 1).toString()}>
                                                                    {index + 1}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                        <div className="flex gap-2 justify-center items-center sm:justify-end sm:flex-col lg:flex-col md:flex-col xl:flex-row">
                                                            <Button color="blue" className="font-medium flex items-center justify-center w-9 h-9 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-500 hover:bg-blue-600">
                                                                <ShoppingCartIcon className="h-5 w-5" />
                                                            </Button>
                                                            <Link
                                                                href={route('login_acheteur')}
                                                                className='text-green-400 flex items-center justify-center w-12 h-12 rounded-full font-medium shadow-lg hover:shadow-xl hover:text-green-500 transition-all duration-300'
                                                            >
                                                                <EyeIcon className="h-5 w-5" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white overflow-hidden shadow-sm sm:rounded-xl mt-5"
                >

                    <div className="container mx-auto p-4">
                        {/* Qu'est-ce qu'un lot revendeur ? */}
                        <motion.div
                            className="mb-6"
                            variants={fadeInVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Qu'est-ce qu'un lot revendeur ?</h2>
                            <p>On parle de lot revendeur car il s’agit de lot qui sont destinés à la revente auprès de consommateurs finaux. Il peut exister des contraintes de distributions. Cependant, elles sont toujours spécifiées dans le descriptif des lots. Certains lots trouveront comme preneurs des revendeurs marchés.</p>
                        </motion.div>

                        {/* Provenance des lots */}
                        <motion.div
                            className="mb-6"
                            variants={fadeInVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Provenance des lots</h2>
                            <p>Les lots proviennent d’opérations de déstockages de marques, faillites, etc. Ils sont proposés à la vente directement par les marques et les distributeurs.</p>
                        </motion.div>

                        {/* Déstockage de grandes enseignes */}
                        <motion.div
                            className="mb-6"
                            variants={fadeInVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Déstockage de grandes enseignes</h2>
                            <p>Il s’agit de lot de déstockage provenant de marques ou de distributeurs. Il s’agit généralement de collections n-1, n-2. Il peut s’agir également de références pour lesquelles le packaging a évolué ou qui ne sont plus produites.</p>
                        </motion.div>

                        {/* Invendus et faillites */}
                        <motion.div
                            className="mb-6"
                            variants={fadeInVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Invendus et faillites</h2>
                            <p>Certains lots peuvent provenir de faillites, auquel cas c’est indiqué très clairement dans la description. De plus, la qualité est toujours indiquée, vous permettant de savoir si les produits sont fonctionnels ou non. Plus d’infos dans notre FAQ acheteur.</p>
                        </motion.div>

                        {/* Retours SAV */}
                        <motion.div
                            className="mb-6"
                            variants={fadeInVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Retours SAV</h2>
                            <p>Nous proposons également des lots retours sav (ou lots retours clients). Les retailers proposent à la vente des retours clients de toutes les familles de produit. Il sera toujours précisé dans la description de l’offre si ces lots sont fonctionnels ou non-fonctionnels.</p>
                        </motion.div>

                        {/* Conditionnement lot revendeur */}
                        <motion.div
                            className="mb-6"
                            variants={fadeInVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Conditionnement lot revendeur</h2>
                            <p>Les lots sont conditionnés sous forme de palette de déstockage (ou palette de solderie). Vous retrouverez dans la description des lots :
                                <ul className="list-disc ml-6 mt-2">
                                    <li>le nombre de palette et les dimensions,</li>
                                    <li>la localisation des lots,</li>
                                    <li>Vous aurez la possibilité de télécharger le listing reprenant toutes les informations utiles liées à ces lots.</li>
                                </ul>
                                La grande majorité des lots de solderie sont conditionnés sur des palettes perdues (il peut arriver qu’ils soient sur des palettes Europe - auquel cas, cela est mentionné très clairement dans la description).</p>
                        </motion.div>

                        {/* Qui peut participer aux enchères ? */}
                        <motion.div
                            className="mb-6"
                            variants={fadeInVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 1.2 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Qui peut participer aux enchères ?</h2>
                            <p>Tous les professionnels de l'achat-vente de produits de déstockage, acheteurs en gros, revendeurs solderies, friperies qui revendent en gros soit au détail via leur magasin ou leur réseau d'enseignes. Pour cela, vous devez posséder un numéro d'entreprise, en fonction de votre pays cela peut être un numéro SIRET, SIREN ou de TVA.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.main>
        </div>

    )
}
