import React, { useState } from 'react';
import { Upload, Button, message, Steps, theme, Divider, Form, Input, Cascader } from 'antd';
import { useForm } from '@inertiajs/react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const handleChange = (info) => {
    setData('documentation', info.file);
};
export default function RegisterVendeur() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();

    const { data, setData, post, } = useForm({
        name: '',
        email: '',
        numero: '',
        nom_de_l_entreprise: '',
        site_web: '',
        industrie: [],
        adresse_facturation: '',
        code_postal: '',
        ville: '',
        adresse_livraison: '',
        documentation: null,
    });

    const next = () => {
        form.validateFields().then(() => {
            setCurrent(current + 1);
        }).catch((errorInfo) => {
            console.log('Validation Failed:', errorInfo);
        });
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
        // display: 'flex',
        textAlign: 'center',
        backgroundColor: token.colorBgContainer,
        borderRadius: token.borderRadiusLG,
        border: `1px solid ${token.colorBorder}`,
        marginTop: 24,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        maxWidth: '650px',
    };

    // const style_form = {
    //     marginRight: 'auto',
    //     boxShadow: ' 0 2px 8px rgba(0, 0, 0, 0.15)',
    //     padding : '20px 25px 35px 30px' ,
    //     width: 'auto',
    //     height: 'auto',
    // }

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

    const [selectedOptions, setSelectedOptions] = useState([]);

    const onCascaderChange = (value, selectedOptions) => {
        setSelectedOptions(value);
        setData('activite', value);
    };



    return (
        <>
            <Steps current={current} items={items} style={{ marginBottom: 24, marginTop: 45 }} />
            <Divider />
            <div style={contentStyle}>
                <div style={{ color: token.colorTextPrimary, fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                    {['First-content', 'Second-content', 'Last-content'][current]}
                </div>

                {current === 0 && (
                    <Form
                        form={form}
                        name="register"
                        initialValues={{ prefix: '86' }}
                        scrollToFirstError
                        // style={style_form}
                    >
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
                        >
                            <Input className='py-2 rounded-xl' />
                        </Form.Item>

                        <Form.Item
                            name="nickname"
                            label="Nickname"
                            tooltip="What do you want others to call you?"
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                        >
                            <Input className='py-2 rounded-xl' />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <PhoneInput
                                international
                                defaultCountry="US"
                                value={data.numero}
                                onChange={(value) => setData('numero', value)}
                                style={{ width: '100%', borderRadius: '12px' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="activite"
                            label="Activite"
                            rules={[{ required: true, message: 'Veuillez sélectionner votre activité!' }]}
                        >
                            <Cascader
                                options={options}
                                multiple
                                onChange={onCascaderChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name="file"
                            label="Upload your file"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e.fileList}
                            extra="Upload a PDF or Word document only."
                            rules={[{ required: true, message: 'Please upload a file!' }]}
                        >
                            <Upload
                                accept=".pdf,.doc,.docx"
                                beforeUpload={(file) => {
                                    const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
                                    if (!isValidType) {
                                        message.error('You can only upload PDF or Word files!');
                                    }
                                    return isValidType;
                                }}
                                onChange={handleChange}
                                showUploadList={{ showRemoveIcon: true }}
                            >
                                <Button icon={<UploadOutlined />}>charger une fichier</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                )}

                {current === 1 && (
                    <div>
                        <Form>
                            <div className='flex'>
                                <Form.Item
                                    name="ville"
                                    label="Ville"
                                    rules={[{ required: true, message: 'veilliez remplire le champ' }]}
                                >
                                    <Input className='py-1 rounded-xl' />

                                </Form.Item>

                                <Form.Item
                                    name="code_postal"
                                    label="code postal"
                                    rules={[{ required: true, message: 'veilliez remplire le champ' }]}
                                >
                                    <Input className='py-1 rounded-xl' />

                                </Form.Item>
                            </div>
                            <Form.Item
                                name="adresse_livraison"
                                label="adresse de livraison"
                                rules={[{ required: true, message: 'veilliez remplire le champ' }]}
                            >
                                <Input />

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
