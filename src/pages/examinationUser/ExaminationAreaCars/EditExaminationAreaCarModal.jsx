import React from "react";
import {Modal, Form, Input, Row, Col,message,Select} from "antd";
import {updateExaminationAreaCars} from "../../../services/api_services/examination_area_cars";


const EditExaminationAreaCarModal = ({setIsEditModalVisible, isEditModalVisible,reload,setReload,selectedElement,setSelectedElement,editForm,allEduTypes}) => {
    const handleOk = () => {
        editForm.submit()
    };
    const { Option } = Select;
    const handleCancel = () => {
        setSelectedElement()
        setIsEditModalVisible(false);
        editForm.resetFields()
    };

    const onFinishEdit = (values) => {
        (
            async () => {
                const response = await updateExaminationAreaCars(values , editForm.getFieldValue('id'));
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
            <Modal title="Avtomobilni o`zgartirish"
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
                                <Input />
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
export default (EditExaminationAreaCarModal);