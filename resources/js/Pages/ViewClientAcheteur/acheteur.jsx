import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import ProductCard from '../ViewClientVendeur/Produit';

export default function Acheteur({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm();

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <main className='flex'>
                <div className='flex-1 items-center mt-5'>
                    {/* Header Section */}
                    <div className='flex justify-between items-center mt-5 bg-gray-300 py-4 px-5 rounded-xl'>
                        <h3 className='font-bold text-2xl ml-3'>Les rubriques en vente</h3>
                        <form className="flex items-center" onSubmit={(e) => {
                            e.preventDefault()
                            post(route('switch', 'vendeur'))
                        }}>
                            <button type="submit">Se connecter en tant que vendeur</button>
                        </form>
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
