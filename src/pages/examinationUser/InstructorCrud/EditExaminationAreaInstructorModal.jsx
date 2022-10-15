import React from "react";
import {Modal, Form, Input, Row, Col, message} from "antd";
import {updateExaminationAreaInstructor} from "../../../services/api_services/examination_area_instructor";


const EditExaminationAreaInstructorModal = ({setIsEditModalVisible, isEditModalVisible, reload, setReload, selectedElement, setSelectedElement, editForm}) => {
    const handleOk = () => {
        editForm.submit()
    };

    const handleCancel = () => {
        setSelectedElement()
        setIsEditModalVisible(false);
        editForm.resetFields()
    };

    const onFinishEdit = (values) => {
        (
            async () => {
                const response = await updateExaminationAreaInstructor(values, editForm.getFieldValue('id'));
                if (response?.data?.status == 1) {
                    setReload(!reload)
                    setIsEditModalVisible(false)
                    editForm.resetFields();
                    message.success(response?.data?.message);
                }
            }
        )()

    }
    const onFinishFailedEdit = () => {

    }

    return (
        <>
            <Modal title="Instruktorni o`zgartirish"
                   visible={isEditModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   okText={'Saqlash'}
                   cancelText={'Bekor qilish'}
                   zIndex={1005}
            >
                <Row>
                    <Col xl={24}>
                        <Form
                            form={editForm}
                            name="editPaymentTypeForm"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinishEdit}
                            onFinishFailed={onFinishFailedEdit}
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
                            <Form.Item
                                label="Id"
                                name="id"
                                hidden={true}
                                rules={[
                                    {
                                        required: true,
                                        message: '',
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
export default (EditExaminationAreaInstructorModal);