import React from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default function Add_rubrique({ auth }) {
  const [form] = Form.useForm();
  const onFinish = (data) => {
    console.log('Form submitted:', data);
    console.log('Form submitted:', data);
    // post(route('register_acheteur'), {
    //   onSuccess: () => reset('password', 'password_confirmation'),
    // });
  };
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="Euro">€</Option>
      </Select>
    </Form.Item>
  );
  return (
    <AuthenticatedLayout
      user={auth.user}
      role={auth.role}
    >
      <div className='w-full py-5 h-auto mt-10 shadow bg-white items-center justify-center flex'>
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
            maxWidth: 600,
            marginTop: 10,
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
            <Input />
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
            <InputNumber min={1} style={{ width: '100%' }} />
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
            <Input.TextArea showCount maxLength={100} />
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
            <Select placeholder="Sélectionnez l'état du produit">
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
            <Button type="primary" htmlType="submit">
              Enregistrer
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthenticatedLayout>
  );
};