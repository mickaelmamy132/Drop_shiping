import { useState, useEffect } from 'react'
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function view_lot({ lots }) {
    const [endDates, setEndDates] = useState({});
    const [timesLeft, setTimesLeft] = useState({});
    const [categories, setCategories] = useState([]);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1068);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isQualiteOpen, setIsQualiteOpen] = useState(false);
    const [sortingOption, setSortingOption] = useState('');
    const [selectedQualites, setSelectedQualites] = useState([]);
    const toggleQualite = () => setIsQualiteOpen(!isQualiteOpen);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Nombre de lots par page

    useEffect(() => {
        const timers = {};

        lots.forEach(lot => {
            if (lot.enchere && lot.enchere.length > 0) {
                const latestEnchere = lot.enchere[0];
                const endDate = new Date(latestEnchere.fin_enchere + 'Z');

                setEndDates(prevEndDates => ({
                    ...prevEndDates,
                    [lot.id]: endDate.toISOString(),
                }));

                const updateTimeLeft = () => {
                    const timeLeft = calculateTimeLeft(endDate);

                    setTimesLeft(prevTimesLeft => ({
                        ...prevTimesLeft,
                        [lot.id]: timeLeft
                    }));

                    if (!timeLeft.isFinished) {
                        timers[lot.id] = setTimeout(updateTimeLeft, 1000);
                    }
                };

                updateTimeLeft();
            }
        });

        return () => {
            Object.values(timers).forEach(timer => clearTimeout(timer));
        };
    }, [lots]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categorieses');
                setCategories(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        fetchCategories();
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1068);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function calculateTimeLeft(endDate) {
        const now = new Date().getTime(); // Heure actuelle de l'utilisateur
        const difference = endDate.getTime() - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor(difference / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
                isFinished: false
            };
        } else {
            timeLeft = { isFinished: true };
        }

        return timeLeft;
    }


    const toggleCategories = () => {
        setIsCategoriesOpen(!isCategoriesOpen);
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
                return prevSelected.filter((id) => id !== categoryId);
            } else {
                return [...prevSelected, categoryId];
            }
        });
    };

    const handleQualiteChange = (qualite) => {
        setSelectedQualites((prevSelected) => {
            if (prevSelected.includes(qualite)) {
                return prevSelected.filter((q) => q !== qualite);
            } else {
                return [...prevSelected, qualite];
            }
        });
    };

    const handleSortChange = (e) => {
        setSortingOption(e.target.value);
    };

    const filteredLots = lots.filter(lot => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(lot.categorie.id);
        const matchesQualite = selectedQualites.length === 0 || selectedQualites.includes(lot.etat);
        return matchesCategory && matchesQualite;
    });

    const sortedLots = filteredLots.sort((a, b) => {
        if (sortingOption === 'date') {
            return new Date(b.created_at) - new Date(a.created_at); // Tri par date d'ajout
        } else if (sortingOption === 'units') {
            return b.quantite - a.quantite; // Tri par unités
        } else if (sortingOption === 'auction-end' && a.updated_at && b.updated_at) {
            return new Date(a.updated_at) - new Date(b.updated_at); // Tri par fin d'enchère (peut être remplacé par un autre champ)
        }
        return 0; // Aucun tri si l'option n'est pas sélectionnée
    });

    const fadeInVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };



    const indexOfLastLot = currentPage * itemsPerPage;
    const indexOfFirstLot = indexOfLastLot - itemsPerPage;
    const currentLots = sortedLots.slice(indexOfFirstLot, indexOfLastLot);
    const totalPages = Math.ceil(sortedLots.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <motion.button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-2 mx-1 rounded-full transition-colors duration-200 ${currentPage === i
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                        }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {i}
                </motion.button>
            );
        }
        return (
            <motion.div
                className="flex justify-center items-center mt-6 space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    label="Previous Page"
                >
                    Page precedent
                    «
                </motion.button>
                {pages}
                <motion.button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    label="Next Page"
                >
                    Page suivante
                    »
                </motion.button>
            </motion.div>
        );
    };


    return (
        <div>
            <div className="p-5 m-5 py-12 min-h-screen">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='mb-5'
                >
                    <Link href="/" className="rounded-xl bg-red-600 text-white p-3 px-5 mr-5 items-center justify-center">
                        retour
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <h1 className="text-2xl font-semibold mb-4">Lot revendeur : acheter des lots déstockage en toute confiance</h1>
                    <p className='text-gray-500 font-semibold'>Découvrez des lots revendeur, palettes solderie & grossiste déstockage, invendus et faillites en direct des plus grandes marques et retailers.</p>

                </motion.div>

                <div className='flex flex-row mx-auto'>
                    <div className="">
                        {!isSmallScreen ? (
                            <>
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
                                <div className="mt-2">
                                    <h3 className="text-lg font-semibold">Catégories</h3>
                                    {categories.map((category, idx) => (
                                        <div key={idx} className="flex items-center mt-2">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                value={category.id} onChange={() => handleCategoryChange(category.id)} // Ajoutez cette ligne
                                                checked={selectedCategories.includes(category.id)}
                                            />
                                            <label className="ml-2">{category.nom}</label>
                                        </div>
                                    ))}
                                </div>
                                <h3 className="text-lg font-semibold">Qualite</h3>
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
                            </>
                        )}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white gap-5 mt-5 p-4"
                    >
                        <div className="flex flex-row gap-5 w-full justify-between">
                            <h2 className="font-bold text-xl mb-2 sm:mb-0">Liste des Lots</h2>
                            {isSmallScreen && (
                                <div className="flex items-center cursor-pointer" onClick={toggleCategories}>
                                    <h3 className="text-lg font-semibold">Filtrer</h3>
                                    <span className="ml-2">🔽</span> {/* Icône de filtrage */}
                                </div>
                            )}
                            <div className="w-full sm:w-auto mt-2 sm:mt-0">
                                <select
                                    id="sorting-options"
                                    className="block w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out text-gray-700 hover:bg-gray-50 cursor-pointer"
                                    value={sortingOption}
                                    onChange={handleSortChange} // Liaison avec la fonction de tri
                                >
                                    <option value="">Trier par...</option>
                                    <option value="date">Date d'ajout</option>
                                    <option value="units">Unités</option>
                                    <option value="auction-end">Fin de l'enchère</option>
                                </select>
                            </div>
                        </div>


                        {currentLots.length === 0 ? (
                            <p>Il n'y a pas de lots disponibles</p>
                        ) : (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                                className="p-1"
                            >
                                <div className="p-6 text-gray-900 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                                    {currentLots.map((lot) => (
                                        <motion.div
                                            key={lot.id}
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0 }
                                            }}
                                            className="border border-gray-200 bg-white shadow-lg rounded-xl p-5 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 text-center"
                                        >

                                            <div className="mb-4 h-48 overflow-hidden">
                                                <img src={`/storage/${lot.image_lot}`} alt={lot.nom} className="w-full h-full object-cover" />
                                            </div>

                                            {/* <div>
                                <h1>{auth.user.vendeur.nom_de_l_entreprise}</h1>
                            </div> */}

                                            <p className="font-semibold text-lg">{lot.nom} - {lot.description}</p>
                                            <p className="text-sm text-gray-500">Enchère #{lot.id}</p>

                                            <div className="mt-4">
                                                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                    {lot.etat}
                                                </span>
                                                <div className="mt-4 flex justify-center gap-8 items-center">
                                                    <div>
                                                        <p className="text-gray-600">Dernière enchère</p>
                                                        <p className="font-bold text-lg">{lot.montant} €</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600">Nombre d'enchères</p>
                                                        <p className="font-bold text-lg">{lot.enchere_count} 🔥</p>
                                                    </div>
                                                </div>
                                                <div className='border-t'>
                                                    <p className="text-gray-600">Fin de l'enchère</p>
                                                    <p className="font-bold text-red-500 text-lg">
                                                        {!lot.enchere || lot.enchere.length === 0 ? (
                                                            'Pas encore enchéri'
                                                        ) : (
                                                            endDates[lot.id] && timesLeft[lot.id]?.isFinished ? (
                                                                'Enchère terminée'
                                                            ) : (
                                                                `${timesLeft[lot.id]?.hours || 0}h ${timesLeft[lot.id]?.minutes || 0}m ${timesLeft[lot.id]?.seconds || 0}s`
                                                            )
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 mt-4 pt-4">
                                                <div className="flex justify-between text-gray-700">
                                                    <div>
                                                        <p className="text-sm">Prix public totale</p>
                                                        <p className="font-bold">{lot.prix_public} €</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm">Unités</p>
                                                        <p className="font-bold">{lot.quantite}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm">Coût / unité</p>
                                                        <p className="font-bold">{lot.prix} €</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 text-center items-center gap-2">
                                                <Link
                                                    href={route('login_acheteur')}
                                                    className="mt-2 inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                                                >
                                                    Encherir
                                                </Link>
                                            </div>

                                        </motion.div>
                                    ))}
                                </div>
                                {renderPagination()} {/* Afficher la pagination */}
                            </motion.div>
                        )}
                    </motion.div>
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
                            <p>Les lots sont conditionnés sous forme de palette de déstockage (ou palette de solderie). Vous retrouverez dans la description des lots :</p>
                            <ul className="list-disc ml-6 mt-2">
                                <li>le nombre de palette et les dimensions,</li>
                                <li>la localisation des lots,</li>
                                <li>Vous aurez la possibilité de télécharger le listing reprenant toutes les informations utiles liées à ces lots.</li>
                            </ul>
                            <p>La grande majorité des lots de solderie sont conditionnés sur des palettes perdues (il peut arriver qu’ils soient sur des palettes Europe - auquel cas, cela est mentionné très clairement dans la description).</p>
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
            </div>

        </div>
    )
}