import React from "react";
import {Modal, Form, Input, Row, Col, message, Select} from "antd";
import {storeExaminationPaymentType} from "../../../services/api_services/examination_payment_types";

const AddExaminationPaymentTypeModal = ({setIsAddModalVisible, isAddModalVisible, reload, setReload}) => {
    const [addForm] = Form.useForm();
    const handleOk = () => {
        addForm.submit()
    };
    const {Option} = Select;

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
                const response = await storeExaminationPaymentType(formData);
                if (response?.data?.status == 1) {
                    setReload(!reload)
                    setIsAddModalVisible(false)
                    addForm.resetFields();
                    message.success(response?.data?.message);
                }
            }
        )()

    }
    const onFinishFailedAdd = () => {

    }

    return (
        <>
            <Modal title="To`lov turi qo`shish"
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
                                label="Nomi"
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
                                label="Summasi"
                                name="amount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Summasini kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Turi"
                                name="exam_type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Summasini kiriting!',
                                    },
                                ]}
                                initialValue={'practical'}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="practical">Amaliy</Option>
                                    <Option value="theoretical">Nazariy</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}
export default (AddExaminationPaymentTypeModal);