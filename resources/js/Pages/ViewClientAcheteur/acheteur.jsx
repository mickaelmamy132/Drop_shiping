import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import ProductCard from '../ViewClientVendeur/Produit';

export default function Acheteur({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <main className='flex'>
                <div className='flex-1 items-center mt-5'>
                    {/* Header Section */}
                    <div className='flex justify-between items-center mt-5 bg-gray-300 py-4 px-5 rounded-xl'>
                        <h3 className='font-bold text-2xl ml-3'>Les rubriques en vente</h3>
                        <Link
                            href={route('dashboard')}
                            className='bg-white p-2 px-5 rounded-2xl text-black font-medium hover:text-red-300 transition-colors duration-200'
                        >
                            switch
                        </Link>
                    </div>

                    {/* Scrollable Section */}
                    <div className='w-full mt-5 p-2 h-auto overflow-y-scroll'>
                        <div className='grid grid-cols-3 gap-1 px-10'>
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
