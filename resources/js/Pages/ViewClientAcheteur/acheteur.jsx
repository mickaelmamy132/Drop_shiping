import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import ProductCard from '../ViewClientAcheteur/produit';


export default function Acheteur({ auth, produits }) {

    const { post } = useForm();

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
        >
            <main className='flex'>
                <div className='flex-1 items-center mt-5'>
                    <div className='flex justify-between items-center mt-5 bg-gray-300 py-4 px-5 rounded-xl'>
                        <h3 className='font-bold text-2xl ml-3'>Les rubriques en vente</h3>
                        <div className='flex gap-2'>
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
                                <button type="submit" className='bg-blue-400 py-2 px-2 rounded-xl mx-auto text-center text-black hover:bg-red-300' >Se connecter en tant que vendeur</button>
                            </form>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                        {produits.map((produit) => (
                            <ProductCard key={produit.id} produit={produit} />
                        ))}
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
