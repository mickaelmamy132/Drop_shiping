import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Chartjx from '../Components/Chart';
import ProductCard from './ViewClientVendeur/Produit';
import Checkbox from '../Components/Checkbox';
import { useForm } from '@inertiajs/react';



export default function Dashboard({ auth }) {

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
                    <div className='flex justify-between items-center p-5 bg-white rounded-lg shadow-md'>
                        <h2 className='text-2xl font-bold'>
                            Liste des achats en cours
                        </h2>
                        <form className="flex items-center" onSubmit={(e) => {
                            e.preventDefault();
                            const newRole = auth.user.role === 'vendeur' ? 'acheteur' : 'vendeur';
                            post(`/switch/${newRole}`, {
                                onSuccess: () => {
                                    window.location.reload();
                                },
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

                    <div className=' overflow-hidden p-4 mt-5'>
                        {/* Grid of products */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                        </div>

                        {/* Grid of charts */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
                            <Chartjx />
                            <Chartjx />
                            <Chartjx />
                            <Chartjx />
                            <Chartjx />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
