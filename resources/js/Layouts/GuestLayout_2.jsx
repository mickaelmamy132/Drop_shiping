import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import BackgroundImage from '../images/freepik__modern.jpeg';

export default function Guest({ children, showBuyerInfoMessage = false }) {
    return (
        <div className="flex min-h-screen flex-col md:flex-col xl:flex-row lg:flex-row justify-center items-center bg-gray-100">
            <div className="md:w-1/2 flex justify-center items-center p-6">
                <img src={BackgroundImage} alt="freepik__modern" className="max-w-full h-auto md:h-[500px] object-cover rounded-xl" />
            </div>

            <div className="md:w-1/2 w-full max-w-2xl mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
                {/* Message d'information si les informations d'acheteur sont manquantes */}
                {showBuyerInfoMessage && (
                    <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                        <p>
                            Il semble que votre compte n'inclut pas encore d'informations d'acheteur. Pour bénéficier d'une expérience optimale, veuillez compléter votre profil.
                        </p>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
