import React from "react";
import { Modal, Form, Input, Row, Col, message, Select } from "antd";
import {
  storeExaminationPaymentType,
  updateExaminationPaymentType,
} from "../../../services/api_services/examination_payment_types";

const EditExaminationPaymentTypeModal = ({
  setIsEditModalVisible,
  isEditModalVisible,
  reload,
  setReload,
  selectedElement,
  setSelectedElement,
  editForm,
}) => {
  const { Option } = Select;
  const handleOk = () => {
    editForm.submit();
  };

  const handleCancel = () => {
    setSelectedElement();
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  const onFinishEdit = values => {
    (async () => {
      const response = await updateExaminationPaymentType(
        values,
        editForm.getFieldValue("id")
      );
      if (response?.data?.status == 1) {
        setReload(!reload);
        setIsEditModalVisible(false);
        editForm.resetFields();
        message.success(response?.data?.message);
      }
    })();
  };
  const onFinishFailedEdit = () => {};

  return (
    <>
      <Modal
        title="To`lov turini o`zgartirish"
        visible={isEditModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Saqlash"}
        cancelText={"Bekor qilish"}
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
                label="Nomi"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Nomini kiriting!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Summasi"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Summasini kiriting!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Id"
                name="id"
                hidden={true}
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Turi"
                name="exam_type"
                rules={[
                  {
                    required: true,
                    message: "Summasini kiriting!",
                  },
                ]}
                initialValue={"practical"}
              >
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="practical">Amaliy</Option>
                  <Option value="theoretical">Nazariy</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="To'lov maqsadi"
                name="exam_reason"
                rules={[
                  {
                    required: true,
                    message: "To'lov maqsadini kiriting",
                  },
                ]}
                initialValue={"first"}
              >
                <Select
                  showSearch
                  placeholder="To'lov maqsadi"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="first">Birinchi marta</Option>
                  <Option value="return">Qayta topshirish</Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default EditExaminationPaymentTypeModal;
