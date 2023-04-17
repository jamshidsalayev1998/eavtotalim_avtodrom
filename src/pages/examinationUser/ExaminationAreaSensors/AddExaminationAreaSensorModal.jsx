import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  message,
  Upload,
  Select,
  Checkbox,
} from "antd";
import { storeExaminationAreaSensor } from "../../../services/api_services/examination_area_sensors";
import { getEduTypesForAll } from "../../../services/api_services/edu_types_api";

const AddExaminationAreaSensorModal = ({
  setIsAddModalVisible,
  isAddModalVisible,
  reload,
  setReload,
  dummyRequest,
}) => {
  const [addForm] = Form.useForm();
  const { Option } = Select;
  const [validatorErrors, setValidatorErrors] = useState();
  const [eduTypes, setEduTypes] = useState([]);
  const handleOk = () => {
    addForm.submit();
  };
  useEffect(() => {
    (async () => {
      let params = {};
      const res = await getEduTypesForAll(params);
      if (res?.status == 1) {
        setEduTypes(res?.data?.data);
      }
    })();
  }, []);

  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
  };
  const onFinishAdd = values => {
    console.log("values", values);
    const formData = new FormData();
    for (const key in values) {
      if (key == "image") {
        formData.append(
          key,
          values[key] ? values[key]?.file?.originFileObj : ""
        );
      } else {
        formData.append(key, values[key] ? values[key] : "");
      }
    }
    (async () => {
      const response = await storeExaminationAreaSensor(formData);
      if (response?.data?.status == 1) {
        setReload(!reload);
        setIsAddModalVisible(false);
        addForm.resetFields();
        message.success(response?.data?.message);
      }
      if (response?.data?.status == 2) {
        setValidatorErrors(response?.data?.validator_errors);
        getValError(response?.data?.validator_errors);
      }
    })();
  };
  const onFinishFailedAdd = () => {};

  const getValError = errors => {
    let string = "";

    Object.entries(errors)?.map(([key, value]) => {
      addForm.setFields([
        {
          name: [`${key}`],
          errors: [value],
          validating: false,
        },
      ]);
    });
    return string;
  };

  return (
    <>
      <Modal
        title="Sensor qo`shish"
        visible={isAddModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Saqlash"}
        cancelText={"Bekor qilish"}
        width={1200}
        centered
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
              <Row>
                <Col
                  sm={24}
                  md={12}
                  lg={6}
                  xl={6}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Form.Item
                    label="Sensor belgi rasmi"
                    name="image"
                    rules={[
                      {
                        required: true,
                        message: "Rasmni tanlang!",
                      },
                    ]}
                    className="text-center"
                  >
                    <Upload
                      customRequest={dummyRequest}
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                      locale={true}
                      accept={".jpg,.png,.jpeg"}
                    >
                      {fileList.length < 1 && "+ Upload"}
                    </Upload>
                    {/*<Input type={"file"} />*/}
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6} xl={18}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Form.Item
                        label="Sensor nomi"
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
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Jarima bali"
                        name="penalty_ball"
                        rules={[
                          {
                            required: true,
                            message: "Jarima balini kiriting!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Ta`lim turi"
                        name="edu_type_id"
                        rules={[
                          {
                            required: true,
                            message: "Ta`lim turini tanlang!",
                          },
                        ]}
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
                          {eduTypes &&
                            eduTypes.map((element, index) => {
                              return (
                                <Option value={element?.id} key={index}>
                                  {element?.short_name_uz}
                                </Option>
                              );
                            })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="SENSOR ID"
                        name="sensor_id"
                        rules={[
                          {
                            required: true,
                            message: "Sensor id raqamini kiriting!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {/* check boxs */}
              <Row>
                <Form.Item name="left" valuePropName={"checked"}>
                  <Checkbox>Chapga ogohlantirish chirog'i</Checkbox>
                </Form.Item>
                <Form.Item name="right" valuePropName={"checked"}>
                  <Checkbox>O'nga ogohlantirish chirog'i</Checkbox>
                </Form.Item>
                <Form.Item name="arg1" valuePropName={"checked"}>
                  <Checkbox>Halokat chirog'i</Checkbox>
                </Form.Item>
                <Form.Item name="light" valuePropName={"checked"}>
                  <Checkbox>Chiroqlar</Checkbox>
                </Form.Item>
                <Form.Item name="remen" valuePropName={"checked"}>
                  <Checkbox>Remen</Checkbox>
                </Form.Item>
                <Form.Item name="engine" valuePropName={"checked"}>
                  <Checkbox>Dvigatel</Checkbox>
                </Form.Item>
                <Form.Item name="back" valuePropName={"checked"}>
                  <Checkbox>Orqaga</Checkbox>
                </Form.Item>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default AddExaminationAreaSensorModal;
