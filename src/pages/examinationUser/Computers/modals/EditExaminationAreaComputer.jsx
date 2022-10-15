import React from "react";
import {Modal, Row, Col,Form,Input,InputNumber } from "antd"

const EditExaminationAreaComputer = (props) => {
    const {
        isVisibleEditModal,
        cancelEditModal,
        onFinishEditForm,
        editForm,
        okEditModal,
    } = props;
    return (
        <Modal zIndex={1005}
               title="Kompyuter o`zgartirish"
               visible={isVisibleEditModal}
               onOk={okEditModal}
               onCancel={cancelEditModal}
               okText={'Saqlash'}
               cancelText={'Bekor qilish'}
        >
            <Row>
                <Col xl={24}>
                    <Form
                        name="basic"
                        form={editForm}
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishEditForm}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tartib raqami"
                            name="order"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tartib raqamini kiriting!',
                                },
                            ]}
                        >
                            <InputNumber style={{width:'100%'}} placeholder={'Tartib raqamini kiriting'}  />
                        </Form.Item>
                        {/*<Form.Item*/}
                        {/*    label="Ip address"*/}
                        {/*    name="ip_address"*/}
                        {/*    rules={[*/}
                        {/*        {*/}
                        {/*            required: true,*/}
                        {/*            message: 'Ip addressni kiriting!',*/}
                        {/*        },*/}
                        {/*    ]}*/}
                        {/*>*/}
                        {/*    <Input placeholder={'Ip addressni kiriting'}   />*/}
                        {/*</Form.Item>*/}
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}
export default EditExaminationAreaComputer