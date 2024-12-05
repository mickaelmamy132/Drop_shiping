import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { admin } from '../../images';

export default function Admin({ auth, status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        // console.log(data);

        post(route('login_admin'), data, {
            onFinish: () => reset('password'),
        });
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <GuestLayout
            auth={auth}
            className='rounded-xl '>
            <Head title="Login adminpage" />

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-4 text-center mt-5"
            >
                <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl font-bold text-blue-600 mb-2"
                >
                    Espace Administration
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-gray-600"
                >
                    Connectez-vous à votre compte Administration
                </motion.div>
            </motion.div>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <motion.div
                className='flex flex-col md:flex-row mt-5'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="w-full md:w-1/2"
                    variants={itemVariants}
                >
                    <motion.img
                        src={admin}
                        alt="login"
                        className="w-full h-auto object-cover rounded-xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <motion.div
                        className="mt-4 text-center"
                        variants={itemVariants}
                    >
                        <motion.h2
                            className="text-xl font-semibold text-blue-600"
                            variants={itemVariants}
                        >
                            Section Vendeur
                        </motion.h2>
                        <motion.p
                            className="text-gray-600 mt-2"
                            variants={itemVariants}
                        >
                            Accédez à votre espace dédié pour gérer vos Articles et Lot
                        </motion.p>
                    </motion.div>
                </motion.div>

                <motion.form
                    onSubmit={submit}
                    className="bg-white px-8 pt-6 pb-8 mb-4 shadow-lg rounded-lg w-full md:w-1/2 max-w-md mx-auto h-fit"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.div
                        className="mb-4"
                        variants={itemVariants}
                    >
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2 text-red-500" />
                    </motion.div>

                    <motion.div
                        className="mb-6"
                        variants={itemVariants}
                    >
                        <InputLabel htmlFor="password" value="Password" className="text-blue-600" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-300"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2 text-red-500" />
                    </motion.div>

                    <motion.div
                        className="flex items-center justify-between"
                        variants={itemVariants}
                    >
                        <label className="block text-gray-500 font-bold">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="mr-2"
                            />
                            <span className="text-sm">Remember me</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition duration-300"
                            >
                                Forgot Password?
                            </Link>
                        )}
                    </motion.div>

                    <motion.div
                        className="flex items-center justify-end mt-4"
                        variants={itemVariants}
                    >
                        <PrimaryButton
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            disabled={processing}
                        >
                            S'econnecter
                        </PrimaryButton>
                    </motion.div>
                </motion.form>
            </motion.div>
        </GuestLayout>
    );
}
