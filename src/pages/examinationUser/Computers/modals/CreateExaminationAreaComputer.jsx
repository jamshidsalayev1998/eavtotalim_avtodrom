import React from "react";
import {Modal, Row, Col,Form,Input,InputNumber } from "antd"

const CreateExaminationAreaComputer = (props) => {
    const {setIsVisibleAddModal, isVisibleAddModal, cancelAddModal, showAddModal,onFinishAddForm,addForm,okAddModal} = props;
    return (
        <Modal zIndex={1005}
               title="Kompyuter qo'shish"
               visible={isVisibleAddModal}
               onOk={okAddModal}
               onCancel={cancelAddModal}
               okText={'Saqlash'}
               cancelText={'Bekor qilish'}
        >
            <Row>
                <Col xl={24}>
                    <Form
                        name="basic"
                        form={addForm}
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishAddForm}
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
export default CreateExaminationAreaComputer