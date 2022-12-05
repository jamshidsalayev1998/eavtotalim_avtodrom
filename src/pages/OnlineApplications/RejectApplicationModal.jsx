import React, {useState} from "react";
import {Modal, Row, Col,Form,Input,InputNumber } from "antd"
import moment from "moment";

const RejectApplicationModal = (props) => {
    const {isVisibleAcceptModal, cancelAcceptModal,onFinishAcceptForm,acceptForm,okAcceptModal,actionType,selectedElement,textAreaValue,setTextAreaValue} = props;
    const { TextArea } = Input;
    return (
        <Modal zIndex={1005}
               title=""
               visible={isVisibleAcceptModal}
               onOk={okAcceptModal}
               onCancel={cancelAcceptModal}
               okText={'Qaytarish'}
               cancelText={'Bekor qilish'}
        >
            <Row>
                <Col xl={24}>
                    <Form
                        name="basic"
                        form={acceptForm}
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishAcceptForm}
                        autoComplete="off"
                    >
                        <Form.Item
                            label={`Sms habarnoma tekstini kiriting `+selectedElement?.student_fio}
                            name="message"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tartib raqamini kiriting!',
                                },
                            ]}
                            initialValue={'Arizangiz qaytarildi iltimos ma`lumotlarni to`g`ri kiriting va qayta ariza bering'}
                        >
                            <TextArea rows={4} value={textAreaValue} onChange={e => setTextAreaValue(e?.target?.value)} />
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
export default RejectApplicationModal