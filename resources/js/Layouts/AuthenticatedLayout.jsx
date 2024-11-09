import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { MultiLevelSidebar_acheteur } from '../Components/SideBar_acheteur';
import { MultiLevelSidebar_vendeur } from '../Components/Sidebar_vendeur';

export default function Authenticated({ user, header, children, role }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="h-screen bg-gray-100 dark:bg-gray-900 w-screen flex">
            {role === 'acheteur' && <MultiLevelSidebar_acheteur darkMode={darkMode} />}
            {role === 'vendeur' && <MultiLevelSidebar_vendeur darkMode={darkMode} />}
            <div className="flex flex-col flex-1 overflow-hidden">
                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-20">
                                <div className="flex items-center">
                                    <div className="shrink-0 flex items-center">
                                        <Link href="/" className="transform transition-transform duration-300 hover:scale-110">
                                            <ApplicationLogo className="block h-12 w-auto fill-current text-gray-800 dark:text-white" />
                                        </Link>
                                    </div>

                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                        <NavLink href={route('dashboard')} active={route().current('dashboard')} className="text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                                            Dashboard
                                        </NavLink>
                                    </div>
                                </div>

                                <div className="hidden sm:flex sm:items-center sm:ms-6">
                                    <button
                                        onClick={toggleDarkMode}
                                        className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300 mr-4"
                                    >
                                        {darkMode ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                            </svg>
                                        )}
                                    </button>
                                    <div className="ms-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-full text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-300"
                                                    >
                                                        {user.name}

                                                        <svg
                                                            className="ms-2 -me-0.5 h-4 w-4 transition-transform duration-300 transform group-hover:rotate-180"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className="-me-2 flex items-center sm:hidden">
                                    <button
                                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700 focus:text-indigo-600 dark:focus:text-indigo-400 transition duration-300 ease-in-out"
                                    >
                                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path
                                                className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </ResponsiveNavLink>
                            </div>

                            <div className="pt-4 pb-1 border-t border-gray-300 dark:border-gray-700">
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800 dark:text-white">{user.name}</div>
                                    <div className="font-medium text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.edit')} className="text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">Profile</ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div className="py-6">
                        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
                <footer className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 body-font">
                    <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                        <Link href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 dark:text-white">
                            <ApplicationLogo className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" />
                            <span className="ml-3 text-xl">VotreSite</span>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 dark:sm:border-gray-700 sm:py-2 sm:mt-0 mt-4">
                            © 2024 VotreSite —
                            <a href="https://twitter.com/votresite" className="text-gray-600 dark:text-gray-300 ml-1" target="_blank" rel="noopener noreferrer">
                                @votresite
                            </a>
                        </p>
                        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                            <a href="https://facebook.com/votresite" className="text-gray-500 dark:text-gray-400 hover:text-indigo-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a href="https://twitter.com/votresite" className="ml-3 text-gray-500 dark:text-gray-400 hover:text-indigo-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.92 2a4.48 4.48 0 00-4.62 5.56A12.94 12.94 0 013 4.1a4.48 4.48 0 001.39 5.96A4.48 4.48 0 012.8 10v.05a4.48 4.48 0 003.56 4.39 4.48 4.48 0 01-2.2.08 4.48 4.48 0 004.17 3.11A9 9 0 013 18.29 12.94 12.94 0 008 21c7.69 0 11.89-6.36 11.89-11.89 0-.18 0-.35-.01-.53A8.5 8.5 0 0023 3z"></path>
                                </svg>
                            </a>
                            <a href="https://instagram.com/votresite" className="ml-3 text-gray-500 dark:text-gray-400 hover:text-indigo-500">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37a4 4 0 11-4.73-4.73 4 4 0 014.73 4.73z"></path>
                                    <path d="M17.5 6.5h.01"></path>
                                </svg>
                            </a>
                            <a href="https://linkedin.com/votresite" className="ml-3 text-gray-500 dark:text-gray-400 hover:text-indigo-500">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path stroke="none" d="M16 8a6 6 0 00-12 0v8a6 6 0 0012 0V8zm-7 6H8v-4h1v4zm1-4h1v4H9v-4z"></path>
                                </svg>
                            </a>
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
