import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Form, Input, InputNumber, Button, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function Add_lot({ auth }) {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        description: '',
        quantite: 1,
        prix: 0,
        etat: '',
        image_lot: null,
        categorie_id: '',
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        fetchCategories();
    }, []);

    const onFinish = (values) => {
        post(route('lots.store'), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ajouter un lot" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-4">Ajouter un lot</h1>
                            <Form
                                form={form}
                                name="add_lot"
                                onFinish={onFinish}
                                layout="vertical"
                                className="animate__animated animate__fadeIn"
                            >
                                <Form.Item
                                    name="nom"
                                    label="Nom du lot"
                                    rules={[{ required: true, message: 'Veuillez entrer le nom du lot' }]}
                                    validateStatus={errors.nom && 'error'}
                                    help={errors.nom}
                                >
                                    <Input
                                        className="hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
                                        value={data.nom}
                                        onChange={(e) => setData('nom', e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    validateStatus={errors.description && 'error'}
                                    help={errors.description}
                                >
                                    <Input.TextArea
                                        className="hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="categorie_id"
                                    label="Catégorie"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez sélectionner une catégorie!',
                                        },
                                    ]}
                                    validateStatus={errors.categorie_id && 'error'}
                                    help={errors.categorie_id}
                                >
                                    <Select placeholder="Sélectionnez une catégorie" className="rounded-md" value={data.categorie_id} onChange={(value) => setData('categorie_id', value)}>
                                        {categories.map(category => (
                                            <Option key={category.id} value={category.id}>{category.nom}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="quantite"
                                    label="Quantité"
                                    rules={[{ required: true, message: 'Veuillez entrer la quantité' }]}
                                    validateStatus={errors.quantite && 'error'}
                                    help={errors.quantite}
                                >
                                    <InputNumber
                                        min={1}
                                        className="w-full hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
                                        value={data.quantite}
                                        onChange={(value) => setData('quantite', value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                name="prix_public"
                                label="Prix public"
                                rules={[{ required: true, message: 'Veuillez entrer le prix public' }]}
                                validateStatus={errors.prix_public && 'error'}
                                help={errors.prix_public}
                                >
                                    <InputNumber 
                                        className="w-full hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
                                        value={data.prix_public}
                                        onChange={(value) => setData('prix_public', value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="prix"
                                    label="Prix unitaire"
                                    rules={[{ required: true, message: 'Veuillez entrer le prix' }]}
                                    validateStatus={errors.prix && 'error'}
                                    help={errors.prix}
                                >
                                    <InputNumber
                                        min={0}
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        className="w-full hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
                                        value={data.prix}
                                        onChange={(value) => setData('prix', value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="etat"
                                    label="État"
                                    rules={[{ required: true, message: 'Veuillez sélectionner l\'état' }]}
                                    validateStatus={errors.etat && 'error'}
                                    help={errors.etat}
                                >
                                    <Select
                                        className="hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
                                        value={data.etat}
                                        onChange={(value) => setData('etat', value)}
                                    >
                                        <Option value="neuf">Neuf</Option>
                                        <Option value="occasion">Occasion</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="image_lot"
                                    label="Image du lot"
                                    rules={[{ required: true, message: 'Veuillez télécharger une image' }]}
                                    validateStatus={errors.image_lot && 'error'}
                                    help={errors.image_lot}
                                >
                                    <Upload
                                        name="image_lot"
                                        listType="picture"
                                        maxCount={1}
                                        beforeUpload={() => false}
                                        onChange={(info) => setData('image_lot', info.file)}
                                    >
                                        <Button icon={<UploadOutlined />} className="hover:bg-blue-500 hover:text-white transition-colors duration-300">Télécharger une image</Button>
                                    </Upload>
                                </Form.Item>


                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300" disabled={processing}>
                                        Ajouter le lot
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}