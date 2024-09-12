import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function Article_infos({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
            profil={auth.profil}
        >
            <main className='flex'>
                <div className='flex-1 items-center mt-5'>
                    <div>
                        <h3 className='text-center font-semibold text-xl text-gray-600'>
                            les information du rubrique
                        </h3>
                    </div>
                    <div className='flex'>
                        <div className=' shadow-lg flex'>
                            <p>jhgjhg</p>
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    )
}
