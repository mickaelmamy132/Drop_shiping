import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

import NavLink from '../Components/NavLink';
import { Khepri } from '../images';

export default function Guest({  auth, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-childrencontent')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const toggleMenu = (menu) => {
        if (activeMenu === menu) {
            setActiveMenu(null);
        } else {
            setActiveMenu(menu);
        }
    };
    return (

        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <header className="bg-white">
                <nav className="flex justify-between items-center w-[92%] mx-auto bg-white border-b pb-4 mb-4">
                    <div className="w-32 h-24">
                        <img className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 filter drop-shadow-md" src={Khepri} alt="Logo" onError={handleImageError} />
                    </div>
                    <div className="nav-links flex items-center md:static absolute bg-white md:min-h-fit min-h-[10vh] right-0 top-0 md:w-auto w-[30%]">
                        <div className="relative">
                            <button
                                className="flex md:hidden items-center rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                Menu
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <ul className={`absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg md:static md:flex md:items-center md:w-auto md:shadow-none ${isOpen ? 'block' : 'hidden md:flex'}`}>
                                {auth.user ? (
                                    <li>
                                        <NavLink href={route('dashboard')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
                                            Dashboard
                                        </NavLink>
                                    </li>
                                ) : (
                                    <>
                                        <li className="relative group md:flex md:items-center">
                                            <button onClick={() => toggleMenu('acheteur')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-md relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
                                                Acheteur
                                                <svg className="w-4 h-4 ml-2 inline transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </button>
                                            {activeMenu === 'acheteur' && (
                                                <ul className="absolute left-full top-0 w-48 rounded-md bg-white shadow-lg md:absolute md:top-full md:left-0">
                                                    <li>
                                                        <NavLink href={route('register_acheteur')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
                                                            S'inscrire
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink href={route('login_acheteur')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
                                                            Se connecter
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                        <li className="relative group md:flex md:items-center">
                                            <button onClick={() => toggleMenu('vendeur')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-md relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
                                                Vendeur
                                                <svg className="w-4 h-4 ml-2 inline transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </button>
                                            {activeMenu === 'vendeur' && (
                                                <ul className="absolute left-full top-0 w-48 rounded-md bg-white shadow-lg md:absolute md:top-full md:left-0">
                                                    <li>
                                                        <NavLink href={route('register_vendeur')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
                                                            S'inscrire
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink href={route('login')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
                                                            Se connecter
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                        <li className="md:flex md:items-center">
                                            <NavLink href={route('assistance')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
                                                Assistance
                                            </NavLink>
                                        </li>
                                        <li className="md:flex md:items-center">
                                            <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
                                                Blog
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="w-full sm:w-full md:max-w-8xl lg:w-full xl:w-full 2xl:w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-6">
                {children}
            </div>
            <footer className="bg-blue-950 border-t mt-8">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">À propos</h3>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink
                                        // href={route('about')} 
                                        className="text-gray-100 hover:text-blue-600">
                                        Qui sommes-nous
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        //  href={route('careers')} 
                                        className="text-gray-100 hover:text-blue-600">
                                        Carrières
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink
                                        //  href={route('contact')} 
                                        className="text-gray-100 hover:text-blue-600">
                                        Contact
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        //  href={route('faq')} 
                                        className="text-gray-100 hover:text-blue-600">
                                        FAQ
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">Légal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink
                                        //  href={route('privacy')} 
                                        className="text-gray-100 hover:text-blue-600">
                                        Confidentialité
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        // href={route('terms')}
                                        className="text-gray-100 hover:text-blue-600">
                                        Conditions d'utilisation
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">Suivez-nous</h3>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink href="#" className="text-gray-100 hover:text-blue-600">
                                        Facebook
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink href="#" className="text-gray-100 hover:text-blue-600">
                                        Twitter
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink href="#" className="text-gray-100 hover:text-blue-600">
                                        Instagram
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t pt-8 text-center text-gray-600">
                        <p>© {new Date().getFullYear()} Votre Entreprise. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>

    );
}