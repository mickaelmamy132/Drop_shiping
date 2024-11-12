import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Form, Input, InputNumber, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import axios from 'axios';

const { Option } = Select;

export default function produit_lot_edit({ auth, produit_lots }) {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const { data, setData, put, processing, errors } = useForm({
        nom: produit_lots.nom || '',
        description: produit_lots.description || '',
        quantite: produit_lots.quantite || '',
        prix: produit_lots.prix || '',
        etat: produit_lots.etat || '',
        image_lot: null,
        categorie_id: produit_lots.categorie_id || '',
        vendeur_id: auth.user.id,
    });

    useEffect(() => {
        form.setFieldsValue({
            ...produit_lots,
        });
    }, [produit_lots, form]);

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('nom', values.nom);
        formData.append('description', values.description);
        formData.append('quantite', values.quantite);
        formData.append('prix', values.prix);
        formData.append('etat', values.etat);
        formData.append('categorie_id', values.categorie_id);
        formData.append('vendeur_id', auth.user.id);
        
        if (values.image_lot && values.image_lot[0]) {
            formData.append('image_lot', values.image_lot[0].originFileObj);
        }

        try {
            await put(route('Produit_Lot.update', produit_lots.id), formData);
            message.success('Le lot a été modifié avec succès');
        } catch (error) {
            console.error(error);
            message.error('Une erreur est survenue lors de la modification du lot');
        }
    };

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const initialFileList = produit_lots.image_lot ? [{
        uid: '-1',
        name: 'Image actuelle',
        status: 'done',
        url: produit_lots.image_lot
    }] : [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.user.role}
        >
            <Head title="Modifier un lot" />
            <motion.div
                className="py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <motion.div
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-6 text-gray-900">
                            <motion.h1
                                className="text-2xl font-bold mb-4"
                                initial={{ x: -50 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Modifier un lot
                            </motion.h1>
                            <Form
                                form={form}
                                name="add_lot"
                                onFinish={onFinish}
                                layout="vertical"
                                className="animate__animated animate__fadeIn"
                                initialValues={data}
                                style={{
                                    maxWidth: 800,
                                    margin: '0 auto',
                                }}
                            >
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.div variants={itemVariants}>
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
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
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
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
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
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Form.Item
                                            name="quantite"
                                            label="Unités"
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
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Form.Item
                                            name="prix"
                                            label="Prix unitaire"
                                            rules={[{ required: true, message: 'Veuillez entrer le prix' }]}
                                            validateStatus={errors.prix && 'error'}
                                            help={errors.prix}
                                        >
                                            <InputNumber
                                                min={0}
                                                addonBefore="€"
                                                className="w-full hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
                                                value={data.prix}
                                                onChange={(value) => setData('prix', value)}
                                            />
                                        </Form.Item>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Form.Item
                                            name="etat"
                                            label="État"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Veuillez sélectionner l\'état du produit',
                                                },
                                            ]}
                                            validateStatus={errors.etat && 'error'}
                                            help={errors.etat}
                                        >
                                            <Select placeholder="Sélectionnez l'état du produit" className="rounded-md" value={data.etat} onChange={(value) => setData('etat', value)}>
                                                <Option value="Bon état">Bon état</Option>
                                                <Option value="Retour client fonctionnel">Retour client fonctionnel</Option>
                                                <Option value="Neuf avec emballage d'origine">Neuf avec emballage d'origine</Option>
                                                <Option value="Neuf sans emballage d'origine">Neuf sans emballage d'origine</Option>
                                                <Option value="Premier main">Premier main</Option>
                                                <Option value="Dommage dus au transport">Dommage dus au transport</Option>
                                                <Option value="reconditionne">Reconditionné</Option>
                                                <Option value="Occasion fonctionnel">Occasion fonctionnel</Option>
                                                <Option value="Non fonctionnel">Non fonctionnel</Option>
                                                <Option value="Non testé">Non testé</Option>
                                            </Select>
                                        </Form.Item>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Form.Item
                                            name="image_lot"
                                            label="Image du lot"
                                            validateStatus={errors.image_lot && 'error'}
                                            help={errors.image_lot}
                                        >
                                            <Upload
                                                name="image_lot"
                                                listType="picture"
                                                maxCount={1}
                                                beforeUpload={() => false}
                                                onChange={(info) => {
                                                    if (info.file) {
                                                        setData('image_lot', info.file.originFileObj || info.file)
                                                    }
                                                }}
                                                defaultFileList={initialFileList}
                                            >
                                                <Button icon={<UploadOutlined />} className="hover:bg-blue-500 hover:text-white transition-colors duration-300">Télécharger une image</Button>
                                            </Upload>
                                        </Form.Item>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <Form.Item>
                                            <Link href={route('Produit_Lot.index')} className="rounded-xl bg-red-600 text-white p-3 px-5 mr-5">
                                                Annuler
                                            </Link>
                                            <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300" disabled={processing}>
                                                Modifier le lot
                                            </Button>
                                        </Form.Item>
                                    </motion.div>
                                </motion.div>
                            </Form>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AuthenticatedLayout>
    );
}