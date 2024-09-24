import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  notification,
  Typography,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';

const { Option } = Select;
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

export default function Edit_rubrique({ auth, produit }) {
  console.log(produit);
  const { data, setData, put, processing, errors } = useForm({
    nom: produit.nom || '',
    categorie_id: produit.categorie.id || '',
    quantite: produit.quantite || 1,
    prix: produit.prix || 0,
    description: produit.description || '',
    etat: produit.etat || '',
    image_rubrique: '',
    vendeur_id: auth.user.id,
  });

  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);

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

  useEffect(() => {
    form.setFieldsValue({
      nom: produit.nom,
      categorie_id: produit.categorie.id,
      quantite: produit.quantite,
      prix: produit.prix,
      description: produit.description,
      etat: produit.etat,
    });

    if (produit.image_rubrique) {
      setFileList([
        {
          uid: '-1',
          name: 'image',
          status: 'done',
          url: `/storage/${produit.image_rubrique}`,
        },
      ]);
    }
  }, [produit, form]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      setData('image_rubrique', newFileList[0].originFileObj);
    } else {
      setData('image_rubrique', null);
    }
  };

  const onFinish = () => {
    console.log(data);  // Vérifie quelles données sont envoyées
    put(route('Produit.update', produit.id), {
      onSuccess: () => {
        notification.success({
          message: 'Succès',
          description: 'Produit mis à jour avec succès.',
          placement: 'topRight',
        });
      },
      onError: (errors) => {
        notification.error({
          message: 'Erreur',
          description: 'Erreur lors de la mise à jour du produit.',
          placement: 'topRight',
        });
      }
    });
  };


  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="Euro">€</Option>
      </Select>
    </Form.Item>
  );

  return (
    <AuthenticatedLayout user={auth.user} role={auth.role} profil={auth.profil}>
      <div className="w-full py-10 px-5 mt-10 shadow-lg bg-white rounded-lg">
        <Title level={2} className="text-center mb-8">Modifier un produit</Title>
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          initialValues={produit}
          style={{
            maxWidth: 800,
            margin: '0 auto',
          }}
          scrollToFirstError
        >
          {/* Nom du produit */}
          <Form.Item
            name="nom"
            label="Nom du produit"
            rules={[
              {
                required: true,
                message: 'Veuillez saisir le nom du produit!',
              },
            ]}
            validateStatus={errors.nom && 'error'}
            help={errors.nom}
          >
            <Input className="rounded-md" onChange={(e) => setData('nom', e.target.value)} />
          </Form.Item>

          {/* Catégorie */}
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
            <Select
              placeholder="Sélectionnez une catégorie"
              className="rounded-md"
              onChange={(value) => setData('categorie_id', value)}
            >
              {categories.map((category) => (
                <Option
                  key={category.id}
                  value={category.id}
                >
                  {category.nom}
                </Option>
              ))}
            </Select>
          </Form.Item>


          {/* Quantité */}
          <Form.Item
            name="quantite"
            label="Quantité"
            rules={[
              {
                required: true,
                message: 'Veuillez saisir la quantité!',
              },
            ]}
            validateStatus={errors.quantite && 'error'}
            help={errors.quantite}
          >
            <InputNumber min={1} style={{ width: '100%' }} className="rounded-md" onChange={(value) => setData('quantite', value)} />
          </Form.Item>

          {/* Prix */}
          <Form.Item
            name="prix"
            label="Prix unitaire"
            rules={[
              {
                required: true,
                message: 'Veuillez saisir le prix unitaire!',
              },
            ]}
            validateStatus={errors.prix && 'error'}
            help={errors.prix}
          >
            <InputNumber
              addonAfter={suffixSelector}
              style={{ width: '100%' }}
              min={0}
              className="rounded-md"
              onChange={(value) => setData('prix', value)}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'Veuillez saisir une description',
              },
            ]}
            validateStatus={errors.description && 'error'}
            help={errors.description}
          >
            <Input.TextArea showCount maxLength={100} className="rounded-md" onChange={(e) => setData('description', e.target.value)} />
          </Form.Item>

          {/* État */}
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
            <Select placeholder="Sélectionnez l'état du produit" className="rounded-md" onChange={(value) => setData('etat', value)}>
              <Option value="Bon état">Bon état</Option>
              <Option value="Neuf avec emballage d'origine">Neuf avec emballage d'origine</Option>
              <Option value="Premier main">Premier main</Option>
              <Option value="Dommage dus au transport">Dommage dus au transport</Option>
              <Option value="reconditionne">Reconditionné</Option>
              <Option value="Occasion fonctionnel">Occasion fonctionnel</Option>
              <Option value="Non fonctionnel">Non fonctionnel</Option>
              <Option value="Non testé">Non testé</Option>
            </Select>
          </Form.Item>

          {/* Image */}
          <Form.Item
            name="image_rubrique"
            label="Image"
            validateStatus={errors.image_rubrique && 'error'}
            help={errors.image_rubrique}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleUploadChange}
              maxCount={1}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Télécharger ou Capturer</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <div className='p-3 items-center'>
            <Form.Item {...tailFormItemLayout}>
              <Link href={route('dashboard')} className="rounded-xl bg-red-600 text-white p-3 px-5 mr-5">
                Annuler
              </Link>
              <Button type="primary" htmlType="submit" size="large" className="rounded-xl" disabled={processing}>
                {processing ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </AuthenticatedLayout>
  );
}