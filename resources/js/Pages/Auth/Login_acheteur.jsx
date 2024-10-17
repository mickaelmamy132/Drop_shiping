import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';


export default function Login_acheteur({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login_acheteur'), {
            onFinish: () => reset('password'),
        });
    };

    return (

        <GuestLayout className='rounded-xl bg-gradient-to-r from-blue-100 to-purple-100'>
            <Head title="Log in" />

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
            >
                <img src="/path/to/your/logo.png" alt="Logo" className="mx-auto h-20 w-auto" />
            </motion.div>

            {status && <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 font-medium text-sm text-green-600"
            >
                {status}
            </motion.div>}

            <motion.form 
                onSubmit={submit} 
                className="bg-white px-8 pt-6 pb-8 mb-4 shadow-lg rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="mb-4"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <InputLabel htmlFor="email" value="Email" className="text-blue-600" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}

                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-300"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2 text-red-500" />

                </motion.div>

                <motion.div 
                    className="mb-6"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
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
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
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
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <PrimaryButton 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300" 
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>
                </motion.div>
            </motion.form>
        </GuestLayout>
    );
}