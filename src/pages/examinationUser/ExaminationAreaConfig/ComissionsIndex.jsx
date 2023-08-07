import React, {useState, useEffect} from "react";
import {Card, Container} from "reactstrap";
import {Row, Col, Form, Input, Upload, Button, message} from "antd";
import {
    getExaminationAreaComissions, storeExaminationAreaComissions,
} from "../../../services/api_services/examination_area_config_api";

const ComissionsIndex = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState();
    const [fileList, setFileList] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        (async () => {
            const response = await getExaminationAreaComissions();
            if (response) {
                if (response?.super) {
                    const customresponse = {
                        "super": response?.super?.fio,
                        "simple1": response?.simples[0]?.fio,
                        "simple2": response?.simples[1]?.fio,
                        "simple3": response?.simples[2]?.fio,
                    }

                    form.setFieldsValue(customresponse);
                }


            }
        })();
    }, [reload]);

    const saveConfig = values => {
        (async () => {
            const subscribers = [
                {
                    "fio": values['super'],
                    "type": "super"
                },
                {
                    "fio": values['simple1'],
                    "type": "simple"
                },
                {
                    "fio": values['simple2'],
                    "type": "simple"
                },
                {
                    "fio": values['simple3'],
                    "type": "simple"
                }
            ];
            const storeResponse = await storeExaminationAreaComissions(subscribers);
            if (storeResponse) {
                message.success("Ma`lumotlar saqlandi");
                setReload(!reload);
            }
        })();
    };
    ;


    const submitButton = () => {
        form.submit();
    };

    return (
        <div className="page-content">
            <Container fluid>
                <Card>
                    <div className="top-organizations">
                        <h5>Komissiya </h5>
                    </div>
                    <div className="mt-3">
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

                                <Col xl={8}>
                                    <Form.Item
                                        label="Komissiya raisi"
                                        name="super"
                                        rules={[
                                            {required: true, message: "Nomini kiriting!"},
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col xl={8}>
                                    <Form.Item
                                        label="Komissiya azosi 1"
                                        name="simple1"
                                        rules={[
                                            {required: true, message: "Nomini kiriting!"},
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col xl={8}>
                                    <Form.Item
                                        label="Komissiya azosi 2"
                                        name="simple2"
                                        rules={[
                                            {required: true, message: "Nomini kiriting!"},
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col xl={8}>
                                    <Form.Item
                                        label="Komissiya azosi 3"
                                        name="simple3"
                                        rules={[
                                            {required: true, message: "Nomini kiriting!"},
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col xl={24} className="d-flex justify-content-end">
                                    <Button onClick={submitButton} type="primary">
                                        Saqlash{" "}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default ComissionsIndex;
