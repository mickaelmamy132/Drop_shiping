import { Link, Head } from '@inertiajs/react';
import NavLink from '../Components/NavLink';
import { CarouselCustomArrows } from '../Components/Carousel';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
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
                    <div className="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-left px-5">
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
                                        acheteur
                                    </NavLink>

                                    {/* <NavLink
                                        href={route('register_vendeur')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        vendeur
                                    </NavLink> */}
                                    
                                    <NavLink
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </NavLink>
                                    {/* <NavLink
                                        href={route('register')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </NavLink> */}
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="text-white px-5 py-2 bg-[#a6c1ee] rounded-full">Connecter!</button>
                        <i className="fas fa-bars text-3xl cursor-pointer md:hidden" onClick={() => onToggleMenu()} data-menu="fas fa-bars"></i>
                    </div>
                </nav>
            </header>

            <main className="mt-6">
                <div className="rounded-lg px-4 md:px-8 py-8 md:py-12 lg:py-20 text-center block-cta">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl no-prose text-gray-900">
                        Nouveau sur drop shipping
                    </h2>
                    <div className="text-center md:text-lg max-w-[64ch] mx-auto">
                        <p>
                            expication dendvhjkdhkjhfdjkdhfjkdvh
                        </p>
                    </div>
                    <ul className="gap-6 flex flex-col sm:flex-row mt-8 sm:justify-center list-none">
                        <li>
                            <a className="inline-block text-white font-display font-extrabold text-1xl rounded-lg bg-blue-500 px-4 py-4" href="">
                                A propos
                            </a>
                        </li>
                        <li>
                            <a className="inline-block text-white font-display font-extrabold text-1xl rounded-lg bg-blue-500 px-4 py-4" href="">
                                Guide
                            </a>
                        </li>
                        <li>
                            <a className="inline-block text-white font-display font-extrabold text-1xl rounded-lg bg-blue-500 px-4 py-4" href="">
                                Assistance
                            </a>
                        </li>
                    </ul>
                </div>

                <div className='mb-10'>
                    <CarouselCustomArrows />
                </div>

                <div className="items-center gap-4">
                    <div className="items-center md:w-auto mx-auto px-5 py-8 justify-center text-center md:mb-12">

                        <h3 className="max-w-[40ch] text-2xl md:text-3xl font-semibold lg:text-4xl mx-auto text-center mb-8 md:mb-12">
                            drop shiping, le milieu professionnelle dediee au destockage
                        </h3>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <img className="transition duration-150 ease-in max-w-lg h-auto rounded-lg mb-8 md:mb-12 opacity-120"
                            src="{{ asset('images/medium-shot-man-logistic-warehouses.jpg') }}" alt="" />
                        <div className="mx-auto text-center mb-0 placeholder-rose-200 text-lg md:text-xl">
                            <p className="font-bold">jhjghjghjghjgchjghjfghwjfghjefghj</p>
                        </div>
                    </div>
                </div>

                <section>
                    <ul className="px-8 gap-4 gap-y-8 mb-12 sm:grid-cols-2 items-center lg:flex sm:justify-center lg:justify-evenly">
                        <li className="md:w-auto flex items-lg justify-center">
                            <p className="text-center md:text-lg text-gary-800">
                                <span className="inline-block text-blue-500 font-display font-extrabold text-4xl px-6 py-2 rounded-lg bg-indigo-50">+12 500</span>
                                <br />
                                <span className="leading-tight text-lg inline-block max-w[24ch] mt-2">
                                    acheteur professionnele qualifier
                                </span>
                            </p>
                        </li>
                        <li className="md:w-auto flex items-lg justify-center">
                            <p className="text-center md:text-lg text-gary-800">
                                <span className="inline-block text-blue-500 font-display font-extrabold text-4xl px-6 py-2 rounded-lg bg-indigo-50">+12 500</span>
                                <br />
                                <span className="leading-tight text-lg inline-block max-w[24ch] mt-2">
                                    des rubique vendu
                                </span>
                            </p>
                        </li>
                        <li className="md:w-auto flex items-lg justify-center">
                            <p className="text-center md:text-lg text-gary-800">
                                <span className="inline-block text-blue-500 font-display font-extrabold text-4xl px-6 py-2 rounded-lg bg-indigo-50">+12 500</span>
                                <br />
                                <span className="leading-tight text-lg inline-block max-w[24ch] mt-2">
                                    rubique a ete recycler
                                </span>
                            </p>
                        </li>
                    </ul>
                </section>

                <section className="mb-5">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <li className="rounded py-20 md:py-4 max-w-[420px] mx-auto flex flex-col items-center justify-center px-4 xl:px-6 relative text-center bg-gray-200 shadow-2xl border-2 overflow-hidden">
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-semibold text-gray-900">
                                Visiter notre marketplace des maintenant
                            </h3>
                            <p className="mb-6 md:text-lg">
                                vhjsgdfhjdgdhsgjgfsddhgsf
                            </p>
                            <a className="outline-focus rounded border-[1.5px] font-medium transition duration-150 ease-in text-center bg-blue-500 hover:border-blue-600 text-white py-2.5 px-[16px] w-full" href="">voir les rubrique</a>
                        </li>
                        <li className="rounded py-20 md:py-4 max-w-[420px] flex flex-col items-center justify-center bg-gray-200 shadow-2xl border-2 overflow-hidden">
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-semibold text-gray-900">
                                Visiter notre marketplace des maintenant
                            </h3>
                            <p>
                                vhjsgdfhjdgdhsgjgfsddhgsf
                            </p>
                            <a href="">voir les rubrique</a>
                        </li>
                        <li className="rounded py-20 md:py-4 max-w-[420px] flex flex-col items-center justify-center bg-gray-200 shadow-2xl border-2 overflow-hidden">
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-semibold text-gray-900">
                                Visiter notre marketplace des maintenant
                            </h3>
                            <p>
                                vhjsgdfhjdgdhsgjgfsddhgsf
                            </p>
                            <a href="">voir les rubrique</a>
                        </li>
                        <li className="rounded py-20 md:py-4 max-w-[420px] flex flex-col items-center justify-center bg-gray-200 shadow-2xl border-2 overflow-hidden">
                            <h3 className="mb-6 text-lg text-center md:text-xl lg:text-2xl leading-tight font-semibold text-gray-900">
                                Visiter notre marketplace des maintenant
                            </h3>
                            <p>
                                vhjsgdfhjdgdhsgjgfsddhgsf
                            </p>
                            <a href="">voir les rubrique</a>
                        </li>
                    </ul>
                </section>

                <div className="flex flex-col text-center bottom-smaller mt-10 mb-12">
                    <h2 className="mx-auto mb-5 max-w-[26ch] order-2 text-primary-900 !text-2xl md:!text-3xl lg:!text-4xl">
                        Espace pout toute
                    </h2>
                    <p className="order-1 mb-2 uppercase text-blue-300 font-semibold">
                        des affaire pour toute
                    </p>
                    <div className="order-3 prose text-center max-w-[64ch] mx-auto md:text-lg">
                        <p>
                            Vous trouverez ici l'ensemble des infos utiles relatives au déstockage, aux invendus, aux palettes,
                            à la supply chain des overstock.
                        </p>
                    </div>
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="rounded-lg py-8 px-5 md:px-10 lg:flex lg:flex-col bg-[#EFF6FF]">

                        <h2 className="!text-[26px] !leading-[0.9] font-bold mb-8 text-blue-800">
                            vendeur
                        </h2>
                        <figure className="relative w-full aspect-video rounded-lg overflow-hidden border-[3px] mb-8 border-[#60A5FA]/[.35]">
                            <picture className="absolute inset-0">
                                <img className="transition duration-150 ease-in min-w-full min-h-full object-cover w-full opacity-100 loaded"
                                    src="https://ik.imagekit.io/uwzsb7j5w/wp-content/uploads/sites/2/2022/12/stocklear-fr-dashboard-vendeurs.jpg"
                                    alt="" />
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
                    </div>

                    <div className="rounded-lg py-8 px-5 md:px-10 lg:flex lg:flex-col bg-[#EFF6FF]">

                        <h2 className="!text-[26px] !leading-[0.9] font-bold mb-8 text-blue-800">
                            vendeur
                        </h2>
                        <figure className="relative w-full aspect-video rounded-lg overflow-hidden border-[3px] mb-8 border-[#60A5FA]/[.35]">
                            <picture className="absolute inset-0">
                                <img className="transition duration-150 ease-in min-w-full min-h-full object-cover w-full opacity-100 loaded"
                                    src="https://ik.imagekit.io/uwzsb7j5w/wp-content/uploads/sites/2/2022/12/stocklear-fr-dashboard-vendeurs.jpg"
                                    alt="" />
                            </picture>
                        </figure>
                        <div className="text-gray-600 mb-12 prose">
                            <p>
                                Notre marketplace permet
                            </p>
                        </div>
                    </div>
                </section>


            </main>
        </>
    )
}