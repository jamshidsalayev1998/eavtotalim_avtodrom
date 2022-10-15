import React from "react";
import {Modal, Form, Input, Button, Select} from "antd";

const FinalAccessAdminAddModal = (props) => {
    const {
        isAddModalVisible,
        handleOkAddModal,
        handleCancelAddModal,
        add_form,
        onFinishAdd,
        onFinishFailedAdd
    } = props;
    const weekDays = [
        {
            id: 1,
            name: 'Dushanba'
        },
        {
            id: 2,
            name: 'Seshanba'
        },
        {
            id: 3,
            name: 'Chorshanba'
        },
        {
            id: 4,
            name: 'Payshanba'
        },
        {
            id: 5,
            name: 'Juma'
        },
        {
            id: 6,
            name: 'Shanba'
        },
    ];
    const children = [];

    const {Option} = Select;
    return (
        <>
            <Modal
                title="Admin qo`shish"
                visible={isAddModalVisible}
                onOk={handleOkAddModal}
                onCancel={handleCancelAddModal}
                zIndex={1005}
                okText={'Saqlash'}
                cancelText={'Yopish'}
            >
                <Form
                    form={add_form}
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
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
                    <Form.Item
                         label="Ish kunlari"
                        name="access_week_days"
                        rules={[
                            {
                                required: true,
                                message: 'Hafta kunlarini tanlang!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                        >
                            {
                                weekDays?.map((element, index) => {
                                    return (
                                        <Option key={element?.id}>{element?.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default FinalAccessAdminAddModal;