import React from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  notification,
  Typography,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
  console.log(auth.user)
  const [form] = Form.useForm();

  const onFinish = (data) => {
    console.log('Form submitted:', data);
    post(route('Produit.store'), {
      onSuccess: () => {
        reset('password', 'password_confirmation');
        notification.success({
          message: 'Succès',
          description: 'Produit créé avec succès!',
          placement: 'topRight',
        });
      },
      onError: (errors) => {
        notification.error({
          message: 'Erreur',
          description: 'Une erreur est survenue lors de la création du produit.',
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
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          style={{
            maxWidth: 800,
            margin: '0 auto',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="nom_produit"
            label="Nom du produit"
            rules={[
              {
                required: true,
                message: 'Veuillez saisir le nom du produit!',
              },
            ]}
          >
            <Input className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="qunatite"
            label="Quantité"
            rules={[
              {
                required: true,
                message: 'Veuillez saisir la quantité!',
              },
            ]}
          >
            <InputNumber min={1} style={{ width: '100%' }} className="rounded-md" />
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
          >
            <InputNumber
              addonAfter={suffixSelector}
              style={{
                width: '100%',
              }}
              min={0}
              className="rounded-md"
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
          >
            <Input.TextArea showCount maxLength={100} className="rounded-md" />
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
          >
            <Select placeholder="Sélectionnez l'état du produit" className="rounded-md">
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
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              beforeUpload={() => false}
              capture="environment"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Télécharger ou Capturer</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large" className="rounded-md">
              Enregistrer
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthenticatedLayout>
  );
};