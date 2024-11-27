import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const role = usePage().props.role;
    const additionalData = usePage().props.additionalData;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        ...(role === 'vendeur' ? {
            user_id: additionalData?.user_id,
            genre: additionalData?.genre,
            pays: additionalData?.pays,
            tva: additionalData?.tva,
            nif: additionalData?.nif,
            nom_de_l_entreprise: additionalData?.nom_de_l_entreprise,
            industrie: additionalData?.industrie,
            description: additionalData?.description,
            ville: additionalData?.ville,
            code_postal: additionalData?.code_postal,
            activite: additionalData?.activite,
            facturation: additionalData?.facturation,
            adresse_livraison: additionalData?.adresse_livraison,
            ville_livraison: additionalData?.ville_livraison,
            code_postal_livraison: additionalData?.code_postal_livraison,
            documentation: additionalData?.documentation,
        } : {}),
        ...(role === 'acheteur' ? {
            user_id: additionalData?.id,
            genre: additionalData?.genre,
            nif: additionalData?.nif,
            numero: additionalData?.numero,
            pays: additionalData?.pays,
            tva: additionalData?.tva,
            user_id: additionalData?.user_id,
        } : {})
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`${className} p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto`}
        >
            <motion.header variants={itemVariants} className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </motion.header>

            <form onSubmit={submit} className="mt-8 space-y-8">
                <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants} className="space-y-2">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full transition duration-150 ease-in-out"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full transition duration-150 ease-in-out"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </motion.div>

                    {role === 'vendeur' && (
                        <>
                            {Object.entries({
                               
                                // pays: "Pays",
                                // tva: "tva",
                                // nif: "nif",
                                nom_de_l_entreprise: "Nom de l'entreprise",
                                industrie: "Industrie",
                                description: "Description",
                                ville: "Ville",
                                code_postal: "Code Postal",
                                activite: "Activité",
                                facturation: "Facturation",
                                adresse_livraison: "Adresse de livraison",
                                ville_livraison: "Ville de livraison",
                                code_postal_livraison: "Code postal de livraison"
                            }).map(([key, label]) => (
                                <motion.div key={key} variants={itemVariants} className="space-y-2">
                                    <InputLabel htmlFor={key} value={label} />
                                    <TextInput
                                        id={key}
                                        className="mt-1 block w-full transition duration-150 ease-in-out"
                                        value={data[key]}
                                        onChange={(e) => setData(key, e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors[key]} />
                                </motion.div>
                            ))}
                        </>
                    )}

                    {role === 'acheteur' && (
                        <>
                            {Object.entries({
                                genre: "Genre",
                                nif: "NIF",
                                numero: "Numéro",
                                pays: "Pays",
                                tva: "TVA"
                            }).map(([key, label]) => (
                                <motion.div key={key} variants={itemVariants} className="space-y-2">
                                    <InputLabel htmlFor={key} value={label} />
                                    <TextInput
                                        id={key}
                                        className="mt-1 block w-full transition duration-150 ease-in-out"
                                        value={data[key]}
                                        onChange={(e) => setData(key, e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors[key]} />
                                </motion.div>
                            ))}
                        </>
                    )}
                </motion.div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <motion.div variants={itemVariants} className="bg-yellow-50 p-4 rounded-md">
                        <p className="text-sm text-yellow-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 underline text-yellow-600 hover:text-yellow-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </motion.div>
                )}

                <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200"
                >
                    <PrimaryButton
                        disabled={processing}
                        className="transition-all duration-150 ease-in-out transform hover:scale-105"
                    >
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600">Saved.</p>
                    </Transition>
                </motion.div>
            </form>
        </motion.section>
    );
}