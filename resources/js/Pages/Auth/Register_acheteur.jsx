import React, { useState, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Form, Input, Checkbox, Button, Select, Spin, Card, Col, Row } from 'antd';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { CheckIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { BackgroundImage, check, entrepos, Equipe, Registre_login } from '../../images';


export default function register_acheteur({ auth }) {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        numero: '',
        password: '',
        password_confirmation: '',
        genre: '',
        accepte: false,
        agreement: false,
        tva: '',
        nif: '',
        pays: '',
    });

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const countryList = data.map(country => ({
                    name: country.name.common,
                    code: country.cca2,
                }));
                setCountries(countryList);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
                setLoading(false);
            });
    }, []);

    const handleCountryChange = (value) => {
        setSelectedCountry(value);
        setData('pays', value);
    };

    const onFinish = () => {
        post(route('register_acheteur'), {
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    const [form] = Form.useForm();

    return (
        <GuestLayout
            auth={auth}
        >
            <Head title="Register" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h3 className="text-3xl font-bold mb-4">
                    Créez votre compte acheteur
                </h3>
                <p className="text-gray-600">
                    Rejoignez notre plateforme de déstockage et accédez à des offres exclusives
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 mx-auto"
            >
                <div className="w-full md:w-1/2 space-y-4 mx-auto">
                    <h3 className="text-2xl font-bold">
                        Accédez en direct à des lots de marchandises des grandes marques et distributeurs
                    </h3>
                    <p className="text-gray-600">
                        Vous cherchez des bonnes affaires et vous trouvez qu'acheter des lots de déstockage est compliqué, opaque et chronophage ? Stocklear simplifie et digitalise les transactions du marché du déstockage.
                    </p>
                    <div className="flex space-x-4">
                        <Link
                            href='/voir-lots'
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                            Acceder a nos lots
                        </Link>
                        <Link
                            href='/voir-rubriques'
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                            Acceder a nos Articles
                        </Link>
                    </div>
                </div>                <div className="w-full md:w-1/3 mx-auto">
                    <img src={entrepos} alt="BackgroundImage" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className='flex flex-col md:flex-row items-center justify-between gap-8 mb-16'
            >
                <div className="w-full md:w-1/3 mx-auto">
                    <img src={check} alt="BackgroundImage" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                    <h3 className="text-2xl font-bold">
                        Inscription simple et sécurisée
                    </h3>
                    <p className="text-gray-600">
                        Rejoignez plus de 12 500 soldeurs, magasins de cash ou auto-entrepreneurs en achat revente. L'inscription s'effectue en deux étapes :
                    </p>
                    <ul className="list-none space-y-2">
                        <li className="flex items-center gap-2">
                            <CheckIcon className="text-green-500 w-5 h-5 flex-shrink-0" />
                            <span>Remplissez le formulaire d'inscription et renseignez les informations de votre entreprise : NIF, TVA, etc…</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckIcon className="text-green-500 w-5 h-5 flex-shrink-0" />
                            <span>Notre équipe se charge de valider votre compte.</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckIcon className="text-green-500 w-5 h-5 flex-shrink-0" />
                            <span>les acheteurs accrédités et valider peuvent accéder aux ventes aux enchères.</span>
                        </li>
                    </ul>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className='flex flex-col md:flex-row items-center justify-between gap-8 mb-16'
            >
                <div className="w-full md:w-1/2 space-y-4">
                    <h3 className="text-2xl font-bold">
                        Transparence et confiance
                    </h3>
                    <p className="text-gray-600">
                        Nous référençons des produits de qualité faciles à revendre qui proviennent de vendeurs de confiance, proches de chez vous. Avant d'enchérir vous avez accès à la fiche de lot et le listing clair, détaillé et complet du contenu. Vous ne payez qu'à la réception de la marchandise.
                    </p>
                    <ul className="list-none space-y-2">
                        <li className="flex items-center gap-2">
                            <CheckIcon className="text-green-500 w-5 h-5 flex-shrink-0" />
                            <span>Support irréprochable</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckIcon className="text-green-500 w-5 h-5 flex-shrink-0" />
                            <span>Niveaux de qualité transparents</span>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 mx-auto">
                    <img src={BackgroundImage} alt="BackgroundImage" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className='flex flex-col md:flex-row items-center justify-between gap-8 mb-16'
            >
                <div className="w-full md:w-1/3 mx-auto">
                    <img src={Equipe} alt="BackgroundImage" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                    <h3 className="text-2xl font-bold">
                        Approvisionnement facile et intelligent
                    </h3>
                    <p className="text-gray-600">
                        Stocklear vous donne la possibilité d'enchérir et d'emporter vos lots aussi facilement qu'un achat en ligne.
                        <br /><br />
                        Les achats se font à la palette, au demi-camion ou au camion. Vous pouvez trier les palettes par univers pour trouver le lot qui vous correspond.
                        <br /><br />
                        Service de transport à la demande.
                        <br />
                        Cotation de transport en un seul clic.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className='flex flex-row items-center gap-0 mt-5 bg-white  p-5'
            >
                <div className='w-1/2 p-5'>
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                        initialValues={data}
                        style={{ maxWidth: 600 }}
                        className="bg-white p-6 rounded-lg shadow-md"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input
                                value={data.name}
                                placeholder="Nom"
                                onChange={(e) => setData('name', e.target.value)}
                                className="border border-gray-300 rounded-md"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                type="email"
                                placeholder="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="border border-gray-300 rounded-md"
                            />
                        </Form.Item>

                        <div className='flex gap-3'>
                            <Form.Item
                                label="TVA"
                                name="tva"
                                rules={[{ required: true, message: 'Please input your TVA!' }]}
                            >
                                <Input
                                    value={data.tva}
                                    placeholder="tva"
                                    className='rounded-xl border border-gray-300'
                                    onChange={(e) => setData('tva', e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                label="NIF"
                                name="nif"
                                rules={[{ required: true, message: 'Please input your NIF!' }]}
                            >
                                <Input
                                    value={data.nif}
                                    className='rounded-xl border border-gray-300'
                                    onChange={(e) => setData('nif', e.target.value)}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Pays"
                            name="pays"
                            rules={[{ required: true, message: 'Veuillez sélectionner votre pays!' }]}
                        >
                            {loading ? (
                                <Spin />
                            ) : (
                                <Select
                                    showSearch
                                    placeholder="Sélectionnez votre pays"
                                    onChange={handleCountryChange}
                                    value={selectedCountry}
                                    style={{ width: '100%' }}
                                    optionFilterProp="children"
                                    className="border border-gray-300 rounded-md"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().includes(input.toLowerCase())
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {countries.map((country) => (
                                        <Select.Option key={country.code} value={country.code}>
                                            {country.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="numero"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <PhoneInput
                                international
                                defaultCountry="US"
                                value={data.numero}
                                onChange={(value) => setData('numero', value)}
                                style={{ width: '100%' }}
                                className="border border-gray-300 rounded-md"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="border border-gray-300 rounded-md"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Confirmer le mot de passe"
                            name="password_confirmation"
                            rules={[
                                { required: true, message: 'Veuillez confirmer votre mot de passe!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Les mots de passe ne correspondent pas!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="border border-gray-300 rounded-md"
                            />
                        </Form.Item>

                        <Form.Item
                            name="genre"
                            label="Genre"
                            rules={[{ required: true, message: 'Please select your gender!' }]}
                        >
                            <Select
                                placeholder="Select your gender"
                                value={data.genre}
                                onChange={(value) => setData('genre', value)}
                                className="border border-gray-300 rounded-md"
                            >
                                <Select.Option value="male">Homme</Select.Option>
                                <Select.Option value="female">Femme</Select.Option>
                                <Select.Option value="other">autre</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="accepte"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('You must accept the newsletter terms')),
                                },
                            ]}
                        >
                            <Checkbox
                                checked={data.accepte}
                                onChange={(e) => setData('accepte', e.target.checked)}
                            >
                                I agree to receive the newsletter with new offers
                            </Checkbox>
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('You must accept the agreement')),
                                },
                            ]}
                        >
                            <Checkbox
                                checked={data.agreement}
                                onChange={(e) => setData('agreement', e.target.checked)}
                            >
                                I have read the <a href="">agreement</a>
                            </Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <div className="flex items-center justify-end">
                                <Link
                                    href={route('login_acheteur')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Already registered?
                                </Link>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={processing}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Register
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
                <div className='w-1/2 h-full'>
                    <img src={Registre_login} alt="BackgroundImage" className="w-auto h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-5"
            >
                <div style={{ overflow: 'hidden', position: 'relative', whiteSpace: 'nowrap' }}>
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: ['0%', '-100%'] }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        style={{ display: 'flex', gap: '16px' }}
                    >
                        {Array(2)
                            .fill([
                                {
                                    title: 'Vêtements',
                                    icon: 'fas fa-tshirt text-purple-500',
                                    description: 'Vêtements professionnels et uniformes',
                                },
                                {
                                    title: 'Matériel de Cuisine',
                                    icon: 'fas fa-utensils text-red-500',
                                    description: 'Équipements et ustensiles de cuisine',
                                },
                                {
                                    title: 'Sport',
                                    icon: 'fas fa-running text-blue-500',
                                    description: 'Équipements et accessoires de sport',
                                },
                                {
                                    title: 'Bricolage',
                                    icon: 'fas fa-tools text-yellow-500',
                                    description: 'Outils et matériel de bricolage',
                                },
                                {
                                    title: 'Équipements Électroniques',
                                    icon: 'fas fa-laptop text-blue-500',
                                    description: 'Ordinateurs, smartphones, tablettes',
                                },
                            ])
                            .flat()
                            .map((item, index) => (
                                <div key={index} style={{ minWidth: '250px', flexShrink: 0 }}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ width: '250px', height: '100%' }}
                                    >
                                        <Card
                                            title={item.title}
                                            bordered={false}
                                            cover={<i className={`${item.icon} text-4xl p-4`}></i>}
                                            style={{ height: '100%', width: '100%', overflow: 'hidden' }}
                                        >
                                            <div style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.description}
                                            </div>
                                        </Card>
                                    </motion.div>
                                </div>
                            ))}
                    </motion.div>
                </div>
            </motion.div>


        </GuestLayout>
    );
}
