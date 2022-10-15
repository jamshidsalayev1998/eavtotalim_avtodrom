import React, {useState, useEffect} from "react";
import {Modal, Form, Input, Row, Col, message, Upload, Select} from "antd";
import {storeExaminationAreaSensorPenalty} from "../../../../services/api_services/examination_area_sensors";

const AddExaminationAreaSensorPenaltiesModal = ({setIsAddModalVisible, isAddModalVisible, reload, setReload,sensorId}) => {
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
        formData.append('examination_area_sensor_id' , sensorId);
        (
            async () => {
                const response = await storeExaminationAreaSensorPenalty(formData);
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
            <Modal title="Sensor Jarimasini qo`shish"
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
                            name="addPenaltyForm"
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
export default (AddExaminationAreaSensorPenaltiesModal);