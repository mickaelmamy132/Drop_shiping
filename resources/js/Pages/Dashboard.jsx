import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Chartjx from '../Components/Chart';
import ProductCard from './ViewClientVendeur/Produit';
// import Checkbox from '../Components/Checkbox';
import { useForm } from '@inertiajs/react';

export default function Dashboard({ auth, produits }) {
    const { data, setData, post, processing, errors, reset } = useForm();
    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <Head title="Dashboard" />
            <div className='flex'>
                {/* Main Content Area */}
                <div className='w-full  mx-auto px-4 sm:px-6 lg:px-8 mt-20 overflow-y-auto'>
                    <div className='flex justify-between items-center p-5 bg-white rounded-lg shadow-md mb-4'>
                        <h2 className='text-2xl font-bold'>
                            Liste des rubrique en cours
                        </h2>
                        <form className="flex items-center" onSubmit={(e) => {
                            e.preventDefault();
                            const newRole = auth.user.role === 'vendeur' ? 'acheteur' : 'vendeur';
                            post(`/switch/${newRole}`, {
                                // onSuccess: () => {
                                //     window.location.reload();
                                // },
                                onError: (errors) => {
                                    console.error(errors);
                                }
                            });
                        }}>
                            <button type="submit">
                                {auth.user.role === 'vendeur' ? 'Se connecter en tant qu\'acheteur' : 'Se connecter en tant que vendeur'}
                            </button>
                        </form>

                    </div>
                    <div className='flex justify-end gap-2'>

                        <Link href={route('Produit.create')}
                            active={route().current('Produit.create')} className='text-gray-600 rounded-xl  bg-white mt-5 p-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border'
                        >
                            ajout rubrique
                        </Link>

                        <Link
                            href={route('Produit_Lot.create')}
                            active={route().current("Produit_Lot.create")}
                            className='text-gray-600 rounded-xl bg-white mt-5 p-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border'
                        >
                            Ajout Lot
                        </Link>



                    </div>

                    <div className=' overflow-hidden p-4 mt-5'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-5'>
                            <Chartjx />
                            <Chartjx />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                            {produits.map((produit) => (
                                <ProductCard key={produit.id} produit={produit} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
