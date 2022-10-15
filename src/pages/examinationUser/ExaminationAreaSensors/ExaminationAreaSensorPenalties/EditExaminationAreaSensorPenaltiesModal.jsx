import React, {useState,useEffect} from "react";
import {Modal, Form, Input, Row, Col, message, Upload,Select} from "antd";
import {updateExaminationAreaSensorPenalty} from "../../../../services/api_services/examination_area_sensors";


const EditExaminationAreaSensorPenaltiesModal = ({setIsEditModalVisible, isEditModalVisible, reload, setReload, setSelectedElement, editForm,sensorId}) => {
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
                const formData = new FormData();
                    console.log('lala1' , values)
                for (const key in values) {
                    if (key == 'image') {
                        formData.append(key, values[key] ? values[key]?.file?.originFileObj : '');
                    } else {
                        formData.append(key, values[key] ? values[key] : '');

                    }
                }
                    console.log('lala' , values);
                const response = await updateExaminationAreaSensorPenalty(formData, editForm.getFieldValue('id'));
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
            <Modal title="Sensor jarimasini o`zgartirish"
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
                                label="Jarima nomi"
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
                                label="Jarima bali"
                                name="penalty_ball"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Jarima balini kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Kod"
                                name="result"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Kodni kiriting!',
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
export default (EditExaminationAreaSensorPenaltiesModal);