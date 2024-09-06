import React, { useState, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Form, Input, Checkbox, Button, Select, Spin } from 'antd';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function register_acheteur() {
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
        console.log('Form submitted:', data);
        post(route('register_acheteur'), {
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    const [form] = Form.useForm();

    return (
        <GuestLayout>
            <Head title="Register" />

            <Form
                onFinish={onFinish}
                layout="vertical"
                initialValues={data}
                style={{ maxWidth: 600 }}
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
                            className='rounded-xl'
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
                            className='rounded-xl'
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
                    />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="password_confirmation"
                    rules={[{ required: true, message: 'Please confirm your password!' }]}
                >
                    <Input.Password
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
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
                    >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
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
                            href={route('login')}
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
        </GuestLayout>
    );
}
