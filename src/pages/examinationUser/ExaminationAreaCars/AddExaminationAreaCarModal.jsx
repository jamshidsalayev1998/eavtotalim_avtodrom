import React, {useState} from "react";
import {Modal, Form, Input, Row, Col, message, Select} from "antd";
import {storeExaminationAreaCars} from "../../../services/api_services/examination_area_cars";

const AddExaminationAreaCarModal = ({setIsAddModalVisible, isAddModalVisible, reload, setReload, allEduTypes}) => {
    const [addForm] = Form.useForm();
    const {Option} = Select;
    const [validatorErrors, setValidatorErrors] = useState();
    const handleOk = () => {
        addForm.submit()
    };

    const handleCancel = () => {
        setIsAddModalVisible(false);
    };
    const onFinishAdd = (values) => {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key] ? values[key] : '');
        }
        (
            async () => {
                const response = await storeExaminationAreaCars(formData);
                if (response?.data?.status == 1) {
                    setReload(!reload)
                    setIsAddModalVisible(false)
                    addForm.resetFields();
                    message.success(response?.data?.message);
                }
                if (response?.data?.status == 2) {
                    setValidatorErrors(response?.data?.validator_errors);
                    getValError(response?.data?.validator_errors);
                }
            }
        )()

    }
    const onFinishFailedAdd = () => {

    }

    const getValError = (errors) => {
        let string = '';

        Object.entries(errors)?.map(([key, value]) => {
            addForm.setFields([
                {
                    'name': [`${key}`],
                    errors: [value],
                    validating: false
                }
            ])
        })
        return string;
    }

    return (
        <>
            <Modal title="Avtomobil qo`shish"
                   visible={isAddModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   okText={'Saqlash'}
                   cancelText={'Bekor qilish'}
                   zIndex={1005}
            >
                <Row>
                    <Col xl={24}>
                        <Form
                            form={addForm}
                            name="addPaymentTypeForm"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinishAdd}
                            onFinishFailed={onFinishFailedAdd}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Avtomobil nomi"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nomini kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Avtomobil davlat raqami"
                                name="number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'raqamini kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="GPS ID"
                                name="gps_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'gps id raqamini kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Ta`lim turi"
                                name="edu_type_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Ta`lim turini tanlang!',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder=""
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                    {
                                        allEduTypes?.map((element, index) => {
                                            return (
                                                <Option value={element?.id}>{element?.short_name_uz}</Option>

                                            )
                                        })
                                    }
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>
                            </Form.Item>

                        </Form>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}
export default (AddExaminationAreaCarModal);