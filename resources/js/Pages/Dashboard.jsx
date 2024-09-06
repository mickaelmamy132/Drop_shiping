import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Chartjx from '../Components/Chart';
import ProductCard from './ViewClientVendeur/Produit';
import Checkbox from '../Components/Checkbox';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            Role={auth.role}
        >
            <Head title="Dashboard tay" />
            <div className='flex'>
                {/* Main Content Area */}
                <div className='w-full  mx-auto px-4 sm:px-6 lg:px-8 mt-20 overflow-y-auto'>
                    <div className='flex justify-between items-center p-5 bg-white rounded-lg shadow-md'>
                        <h2 className='text-2xl font-bold'>
                            Liste des achats en cours
                        </h2>
                        <Link
                            href={route('Acheteur')}
                            className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'
                        >
                            Voir plus
                        </Link>
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
