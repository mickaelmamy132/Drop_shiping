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