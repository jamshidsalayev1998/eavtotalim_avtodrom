import React, {useState} from "react";
import {Modal, Form, Input, Row, Col, message} from "antd";
import {storeExaminationAreaInstructor} from "../../../services/api_services/examination_area_instructor";

const AddExaminationAreaInstructorModal = ({setIsAddModalVisible, isAddModalVisible, reload, setReload}) => {
    const [addForm] = Form.useForm();
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
                const response = await storeExaminationAreaInstructor(formData);
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
            <Modal title="Instruktor qo`shish"
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
                                label="Familiya"
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Familiyani kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Ism"
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Ismni kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Otasining ismi"
                                name="middle_name"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Otasining ismini kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Telefon"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Telefon raqamini kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                        </Form>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}
export default (AddExaminationAreaInstructorModal);