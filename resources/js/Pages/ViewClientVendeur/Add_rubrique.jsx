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
import { useForm } from '@inertiajs/react';

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

export default function Add_rubrique({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    nom: '',
    categorie_id: '',
    quantite: '',
    prix: '',
    description: '',
    etat: '',
    image_rubrique: null,
    vendeur_id: auth.user.id
  });

  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

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

  const onFinish = () => {
    post(route('Produit.store'), {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onSuccess: () => {
        notification.success({
          message: 'Succès',
          description: 'Communication avec le backend réussie!',
          placement: 'topRight',
        });
        console.log('Réponse du backend : Succès');
      },
      onError: (errors) => {
        notification.error({
          message: 'Erreur',
          description: 'Échec de la communication avec le backend.',
          placement: 'topRight',
        });
        console.error('Erreurs de communication :', errors);
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
    <AuthenticatedLayout
      user={auth.user}
      role={auth.role}
      profil={auth.profil}
    >
      <div className='w-full py-10 px-5 mt-10 shadow-lg bg-white rounded-lg'>
        <Title level={2} className="text-center mb-8">Ajouter un nouveau produit</Title>
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          initialValues={data}
          style={{
            maxWidth: 800,
            margin: '0 auto',
          }}
          scrollToFirstError
        >
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
            <Input className="rounded-md" value={data.nom} onChange={(e) => setData('nom', e.target.value)} />
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
            rules={[
              {
                required: true,
                message: 'Veuillez saisir la quantité!',
              },
            ]}
            validateStatus={errors.quantite && 'error'}
            help={errors.quantite}
          >
            <InputNumber min={1} style={{ width: '100%' }} className="rounded-md" value={data.quantite} onChange={(value) => setData('quantite', value)} />
          </Form.Item>

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
              style={{
                width: '100%',
              }}
              min={0}
              className="rounded-md"
              value={data.prix}
              onChange={(value) => setData('prix', value)}
            />
          </Form.Item>

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
            <Input.TextArea showCount maxLength={100} className="rounded-md" value={data.description} onChange={(e) => setData('description', e.target.value)} />
          </Form.Item>

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
              <Option value="bon_etat">Bon état</Option>
              <Option value="neuf_emballage">Neuf avec emballage d'origine</Option>
              <Option value="premier_main">Premier main</Option>
              <Option value="dommage_transport">Dommage dus au transport</Option>
              <Option value="reconditionne">Reconditionné</Option>
              <Option value="occasion_fonctionnel">Occasion fonctionnel</Option>
              <Option value="non_fonctionnel">Non fonctionnel</Option>
              <Option value="non_teste">Non testé</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="image_rubrique"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            validateStatus={errors.image_rubrique && 'error'}
            help={errors.image_rubrique}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              beforeUpload={(file) => {
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                  message.error('Vous ne pouvez télécharger que des fichiers image !');
                }
                return false;
              }}
              capture="environment"
              maxCount={3}
              fileList={data.image_rubrique ? [data.image_rubrique] : []}
              onChange={(info) => {
                const fileList = info.fileList.slice(-1);
                if (fileList.length > 0) {
                  const file = fileList[0].originFileObj;
                  if (file.type.startsWith('image/')) {
                    setData('image_rubrique', file);
                  } else {
                    setData('image_rubrique', null);
                  }
                } else {
                  setData('image_rubrique', null);
                }
              }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Télécharger ou Capturer</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large" className="rounded-md" disabled={processing}>
              {processing ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthenticatedLayout>
  );
}