import React, {useEffect, useState} from "react";
import {Badge, Card, CardBody, Container,} from "reactstrap";
import {getComputerConfig, setComputerConfig} from "../../../../services/api_services/computer_config/config";
import {Row, Form, Input, Upload, Button, Col, message} from "antd";
import {UploadOutlined} from '@ant-design/icons';

const ComputerConfig = () => {

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [data, setData] = useState();
    const [errorData, setErrorData] = useState();
    const [reload , setReload] = useState(false);
    useEffect(() => {
        (async () => {
            getConfig()
        })()
    }, [reload]);
    const getConfig = () => {
        (async () => {
            const res = await getComputerConfig();
            console.log('res' , res)
            setData(res?.data);
        })()
    };
    const onFinish = (values) => {
        console.log(values)
        let uploadedFile = values?.json_key?.fileList[0]?.originFileObj;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            try {
                let keyData = JSON.parse(fileReader.result);
                sendData(keyData?.key)
                setErrorData(null)
            } catch (e) {
                setErrorData("**Not valid JSON file!**");
            }
        };
        if (uploadedFile !== undefined)
            fileReader.readAsText(uploadedFile);
    };
    const sendData = (key) =>{
        (async () =>{
            const res = await setComputerConfig(key);
            if (parseInt(res?.status) === 1){
                message.success('Saqlandi');
                localStorage.setItem('computer_key' , res?.data?.computer_key)
                setReload(!reload)
            }
            else{
                message.error('Xatolik')
            }
        })()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([file]);
            return false;
        },
        fileList,
    };
    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations">
                                <h5>Kompyuter sozlamalari </h5>
                            </div>
                            <div className="crypto-buy-sell-nav mt-3">
                                <Row className={'justify-content-between'}>
                                    <Col xl={6}>
                                        <Form
                                            form={form}
                                            name="basic"
                                            className={'w-100'}
                                            labelCol={{
                                                span: 24,
                                            }}
                                            wrapperCol={{
                                                span: 24,
                                            }}
                                            initialValues={{
                                                remember: true,
                                            }}
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                        >
                                            <Form.Item
                                                label="Fayl"
                                                name="json_key"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Kalit faylini tanlang!',
                                                    },
                                                ]}
                                            >
                                                <Upload {...props} maxCount={1} accept={'.json'}
                                                >
                                                    <Button icon={<UploadOutlined/>}>Kalit faylini tanlash</Button>
                                                </Upload>
                                            </Form.Item>
                                            <button type={'submit'} className={'btn btn-outline-success w-100'}>Saqlash
                                            </button>
                                        </Form>
                                    </Col>
                                    <Col xl={6} className={' d-flex border align-items-center justify-content-center'}>
                                        <h1>{data?.order}</h1>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    )
};

export default ComputerConfig;