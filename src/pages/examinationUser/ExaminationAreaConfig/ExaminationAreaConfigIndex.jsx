import React, {useState, useEffect} from "react";
import {Card, CardBody, Container,} from "reactstrap";
import {Row, Col, Form, Input, Upload, Button, message} from "antd"
import {
    getExaminationAreaConfig,
    storeExaminationAreaConfig
} from "../../../services/api_services/examination_area_config_api";
import {PATH_PREFIX_FILE} from "../../../Utils/AppVariables";

const ExaminationAreaConfigIndex = () => {

    const [form] = Form.useForm();
    const [data, setData] = useState();
    const [fileList, setFileList] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        (async () => {
            const response = await getExaminationAreaConfig();
            if (response) {
                form.setFieldsValue(response)
                if (response?.logo) {
                    setFileList([{
                        uid: '-1',
                        name: response?.logo,
                        status: 'done',
                        url: PATH_PREFIX_FILE + response?.logo
                    }])
                }

            }
        })()
    }, [reload]);

    const saveConfig = (values) => {

        (async () => {
            const formData = new FormData();
            for (const key in values) {
                if (key == 'logo') {
                    formData.append(key, values[key] ? values[key]?.file?.originFileObj : '');

                } else {
                    formData.append(key, values[key] ? values[key] : '');

                }
            }
            const storeResponse = await storeExaminationAreaConfig(formData);
            if (storeResponse){
                message.success('Ma`lumotlar saqlandi');
                setReload(!reload)
            }
        })()
    }
    const dummyRequest = ({file, onSuccess}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }
    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const submitButton = () => {
        form.submit();
    }

    return (
        <div className="page-content">

            <Container fluid>
                <Card>
                    <CardBody>
                        <div className="top-organizations">
                            <h5>Sozlamalar </h5>
                        </div>
                        <div className="crypto-buy-sell-nav mt-3">
                            <Form
                                name="basic"
                                form={form}
                                labelCol={{span: 24}}
                                wrapperCol={{span: 23}}
                                initialValues={{remember: true}}
                                onFinish={saveConfig}
                                autoComplete="off"
                            >
                                <Row>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Nomi"
                                            name="name"
                                            rules={[{required: true, message: 'Nomini kiriting!'}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Qisqacha nomi"
                                            name="short_name"
                                            rules={[{required: true, message: 'Qisqacha nomini kiriting!'}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Manzil"
                                            name="address"
                                            rules={[{required: true, message: 'Manzilni kiriting!'}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Mo'ljal"
                                            name="destination"
                                            rules={[{required: true, message: 'Mo`ljalni kiriting!'}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Ish kunlari"
                                            name="work_days"
                                            rules={[{required: true, message: 'Ish kunlarini kiriting!'}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Ish vaqti"
                                            name="work_start_end_time"
                                            rules={[{required: true, message: 'Ish vaqtini kiriting!'}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Amaliy imtihonda chiqizni bosganlik uchun jarima bali"
                                            name="line_penalty_ball"
                                            rules={[{
                                                required: true,
                                                message: 'Amaliy imtihonda chiqizni bosganlik uchun jarima balini kiriting!'
                                            }]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Amaliy imtihonda o`tish bali"
                                            name="passing_score"
                                            rules={[{
                                                required: true,
                                                message: 'Amaliy imtihonda o`tish balini kiriting!'
                                            }]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Hisob raqam"
                                            name="hr"
                                            rules={[{
                                                required: true,
                                                message: 'Hisob raqamni kiriting!'
                                            }]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Inn"
                                            name="inn"
                                            rules={[{
                                                required: true,
                                                message: 'Inn kiriting!'
                                            }]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Bank kodi (mfo)"
                                            name="mfo"
                                            rules={[{
                                                required: true,
                                                message: 'Bank kodini kiriting!'
                                            }]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Item
                                            label="Logo"
                                            name="logo"
                                            rules={[{
                                                required: true,
                                                message: 'Logoni tanlang!'
                                            }]}
                                        >
                                            <Upload
                                                customRequest={dummyRequest}
                                                listType="picture-card"
                                                fileList={fileList}
                                                onChange={onChange}
                                                onPreview={onPreview}
                                                locale={true}
                                                accept={'.jpg,.png,.jpeg'}
                                            >
                                                {fileList.length < 1 && '+ Upload'}
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className={'d-flex justify-content-end'}> <Button onClick={submitButton}
                                                                                       className={'bg-success text-white'}> Saqlash </Button>
                                </Row>
                            </Form>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default ExaminationAreaConfigIndex