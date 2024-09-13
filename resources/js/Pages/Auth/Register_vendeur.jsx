import React, { useState } from 'react';
import { Upload, Button, message, Steps, theme, Divider, Form, Input, Cascader, Switch } from 'antd';
import { useForm } from '@inertiajs/react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { UploadOutlined } from '@ant-design/icons';
import { Description } from '@headlessui/react';

const { Dragger } = Upload;
const handleChange = (info) => {
    setData('documentation', info.file);
};
export default function RegisterVendeur() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const { data, setData, post, } = useForm({
        nom: '',
        prenom: '',
        email: '',
        numero: '',
        nom_de_l_entreprise: '',
        site_web: '',
        industrie: [],
        activite: [],
        description: '',
        adresse_facturation: '',
        code_postal: '',
        ville: '',
        adresse_livraison: '',
        documentation: null,
    });

    const next = () => {
        if (current === 0) {
            form.validateFields().then(() => {
                setCurrent(current + 1);
            }).catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
                message.error('Veuillez remplir tous les champs obligatoires avant de continuer.');
            });
        } else if (current === 1) {
            form2.validateFields().then(() => {
                setCurrent(current + 1);
            }).catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
                message.error('Veuillez remplir tous les champs obligatoires avant de continuer.');
            });
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = [
        { key: 'First', title: 'First' },
        { key: 'Second', title: 'Second' },
        { key: 'Last', title: 'Last' },
    ];

    const contentStyle = {
        padding: '30px',
        textAlign: 'center',
        backgroundColor: token.colorBgContainer,
        borderRadius: token.borderRadiusLG,
        border: `1px solid ${token.colorBorder}`,
        marginTop: 24,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '650px',
        marginLeft: 'auto',
        marginRight: 'auto',
    };

    const formItemStyle = {
        marginBottom: '24px',
    };

    const inputStyle = {
        borderRadius: '8px',
        padding: '5px',
        fontSize: '16px',
        border: `1px solid ${token.colorBorder}`,
        transition: 'all 0.3s',
    };

    const options = [
        {
            value: 'Marche',
            label: 'Marche',
        },
        {
            value: 'Grossiste',
            label: 'Grossiste',
        },
        {
            value: 'Reconditionneur',
            label: 'Reconditionneur',
        },
    ];
    const option_industrie = [
        {
            value: 'Informatiques',
            label: 'Informatiques',
        },
        {
            value: 'Vetements',
            label: 'Vetements',
        },
        {
            value: 'Meubles',
            label: 'Meubles',
        },
        {
            value: 'Chaussures',
            label: 'Chaussures',
        },
        {
            value: 'Electromenagers',
            label: 'Electromenagers',
        },
        {
            label: 'Sport',
            value: 'Sport',
        },
    ];

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedActivite, setselectedActivite] = useState([]);

    const onCascaderChange = (value, selectedOptions) => {
        setSelectedOptions(value);
        setData('industrie', value);
    };

    const onCascaderActivite = (value, selectedActivite) => {
        setselectedActivite(value);
        setData('activite', value);
    };

    const [showFields, setShowFields] = useState(true)

    const onChange = (checked) => {
        console.log(`switch to ${checked}`)
        setShowFields(checked)
    }

    return (
        <>
            <Steps current={current} items={items} style={{ marginBottom: 24, marginTop: 45 }} />
            <Divider />
            <div style={contentStyle}>
                <div style={{ color: token.colorTextPrimary, fontSize: 28, fontWeight: 'bold', marginBottom: 30 }}>
                    {['Information personnels', 'activite', 'finalisation'][current]}
                </div>

                {current === 0 && (
                    <Form
                        form={form}
                        name="register"
                        initialValues={{ prefix: '86' }}
                        scrollToFirstError
                        layout="vertical"
                    >
                        <Form.Item
                            name="nom"
                            label="Nom"
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                            style={formItemStyle}
                        >
                            <Input style={inputStyle} />
                        </Form.Item>

                        <Form.Item
                            name="nickname"
                            label="Prenom"
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                            style={formItemStyle}
                        >
                            <Input style={inputStyle} />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                            style={formItemStyle}
                        >
                            <Input style={inputStyle} />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                            style={formItemStyle}
                        >
                            <PhoneInput
                                international
                                defaultCountry="US"
                                value={data.numero}
                                onChange={(value) => setData('numero', value)}
                                style={{ ...inputStyle, width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="industrie"
                            label="industrie"
                            rules={[{ required: true, message: 'Veuillez sélectionner votre activité!' }]}
                            style={formItemStyle}
                        >
                            <Cascader
                                options={option_industrie}
                                multiple
                                onChange={onCascaderChange}
                                style={inputStyle}
                            />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Que souhaitez-vous vendre et en quelle quantité ?*"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez saisir une description',
                                },
                            ]}
                            style={formItemStyle}
                        >
                            <Input.TextArea showCount maxLength={100} style={{ ...inputStyle, minHeight: '100px' }} />
                        </Form.Item>
                    </Form>
                )}

                {current === 1 && (
                    <div>
                        <Form
                            form={form2}
                            layout="vertical"
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Form.Item
                                    name="ville"
                                    label="Ville"
                                    rules={[{ required: true, message: 'Veuillez remplir le champ' }]}
                                    style={{ ...formItemStyle, width: '48%' }}
                                >
                                    <Input style={inputStyle} />
                                </Form.Item>

                                <Form.Item
                                    name="code_postal"
                                    label="Code postal"
                                    rules={[{ required: true, message: 'Veuillez remplir le champ' }]}
                                    style={{ ...formItemStyle, width: '48%' }}
                                >
                                    <Input style={inputStyle} />
                                </Form.Item>
                            </div>
                            <Form.Item
                                name="adresse_livraison"
                                label="Adresse de livraison"
                                rules={[{ required: true, message: 'Veuillez remplir le champ' }]}
                                style={formItemStyle}
                            >
                                <Input style={inputStyle} />
                            </Form.Item>

                            <Form.Item
                                name="activite"
                                label="Activité"
                                rules={[{ required: true, message: 'Veuillez sélectionner votre activité!' }]}
                                style={formItemStyle}
                            >
                                <Cascader
                                    options={options}
                                    multiple
                                    onChange={onCascaderActivite}
                                    style={inputStyle}
                                />
                            </Form.Item>

                            <Form.Item
                                name="facturation"
                                label="Adresse de votre industrie"
                                rules={[
                                    {
                                        required: true, message: 'Veuillez indiquer votre adresse de facturation'
                                    }
                                ]}
                                style={formItemStyle}
                            >
                                <Input style={inputStyle} />
                            </Form.Item>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <Switch defaultChecked={false} onChange={onChange} />
                                <p style={{ marginLeft: '10px', marginBottom: 0 }}>Mon adresse de livraison est différente</p>
                            </div>

                            {showFields && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Form.Item
                                        name="ville_livraison"
                                        label="Ville de livraison"
                                        rules={[{ required: true, message: 'Veuillez remplir le champ' }]}
                                        style={{ ...formItemStyle, width: '48%' }}
                                    >
                                        <Input style={inputStyle} />
                                    </Form.Item>

                                    <Form.Item
                                        name="code_postal_livraison"
                                        label="Code postal de livraison"
                                        rules={[{ required: true, message: 'Veuillez remplir le champ' }]}
                                        style={{ ...formItemStyle, width: '48%' }}
                                    >
                                        <Input style={inputStyle} />
                                    </Form.Item>
                                </div>
                            )}

                            <Form.Item
                                name="file"
                                label="Télécharger un fichier"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => e.fileList}
                                extra="Téléchargez uniquement un document PDF ou Word."
                                rules={[{ required: true, message: 'Veuillez télécharger un fichier!' }]}
                                style={formItemStyle}
                            >
                                <Upload
                                    accept=".pdf,.doc,.docx"
                                    beforeUpload={(file) => {
                                        const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
                                        if (!isValidType) {
                                            message.error('Vous pouvez uniquement télécharger des fichiers PDF ou Word!');
                                        }
                                        return isValidType;
                                    }}
                                    onChange={handleChange}
                                    showUploadList={{ showRemoveIcon: true }}
                                >
                                    <Button icon={<UploadOutlined />} style={{ ...inputStyle, height: 'auto' }}>Charger un fichier</Button>
                                </Upload>
                            </Form.Item>
                        </Form>
                    </div>
                )}

                {current === 2 && (
                    <div>Last Step Content</div>
                )}
            </div>
            <Divider />
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                {current > 0 && (
                    <Button style={{ marginRight: 8 }} onClick={prev}>
                        Previous
                    </Button>
                )}
                {current < items.length - 1 && (
                    <Button type="primary" onClick={next}>
                        Next
                    </Button>
                )}
                {current === items.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
            </div>
        </>
    );
}