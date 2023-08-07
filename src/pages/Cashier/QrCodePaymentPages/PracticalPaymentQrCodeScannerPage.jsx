import React, { useState, useEffect, useContext, useRef } from "react";
import { Card, CardBody, Container, Badge } from "reactstrap";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import {
  Modal,
  Button,
  Select,
  Tabs,
  Row,
  Col,
  Input,
  message,
  Form,
} from "antd";
import { getFinalAccessStudentById } from "../../../services/api_services/getFinalAccessStudentById";
import { getExaminationPaymentType } from "../../../services/api_services/examination_payment_types";
import { getPaymentType } from "../../../services/api_services/payment_types_service";
import { PATH_PREFIX } from "Utils/AppVariables";

const PracticalPaymentQrCodeScannerPage = props => {
  const { TabPane } = Tabs;
  const { Option } = Select;
  const history = useHistory();
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState();
  const { t } = useTranslation();
  const [examinationAreaPaymentTypes, setExaminationAreaPaymentTypes] =
    useState([]);
  const [paymentTypes, setPaymentTypes] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [temporary, setTemporary] = useState("");
  const [confirm_form] = Form.useForm();
  // const inputEl =
  const inputEl = useRef();
  useEffect(() => {
    (async () => {
      const response = await getExaminationPaymentType();
      const response2 = await getPaymentType();
      if (response2) {
        setPaymentTypes(response2?.data);
      }
      if (response?.data?.status == 1) {
        setExaminationAreaPaymentTypes(response?.data?.data);
      }
    })();
  }, []);
  console.log("paytypes", paymentTypes);

  const focusInput = () => {
    if (inputEl?.current) {
      inputEl.current.focus();
    }
  };

  const key_up = keyCode => {
    if (keyCode?.keyCode == 13) {
      if (inputValue) {
        getData();
      }
    }
  };
  const getData = () => {
    (async () => {
      const response = await getFinalAccessStudentById(inputValue);
      if (response?.data?.status == 1) {
        setData(response?.data?.data);
        message.success("Ma`lumot topildi");
        setTemporary(inputValue);
      }
      if (response?.data?.status == 0) {
        setData(null);
        message.error(response?.data?.message);
      }
      setInputValue(null);
    })();
  };
  const handleOk = () => {
    confirm_form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = values => {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    for (const valuesKey in values) {
      form_data.append(valuesKey, values[valuesKey] ? values[valuesKey] : "");
    }
    form_data.append("final_access_student_id", data?.id);
    if (data?.id) {
      setIsLoading(true);
      axios({
        url: PATH_PREFIX + "/cashier/student-payment-confirm",
        method: "POST",
        params: {
          token,
        },
        data: form_data,
      }).then(res => {
        if (res?.data?.status == 1) {
          message.success(res?.data?.message);
          handleCancel();
          getData();
          setIsLoading(false);
          // setGeneralReload(!generalReload)
        } else if (res?.data?.status == 0) {
          message.error(res?.data?.message);
          setIsLoading(false);
        }
      });
    }
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  const confirm_payment = () => {
    setIsModalVisible(true);
  };
  const clearAllData = () => {
    setData(null);
    setInputValue("");
  };

  return (
    <>
      <Modal
        title={"To`lovni tasdiqlash"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        zIndex={1005}
        okText={"Saqlash"}
        cancelText={"Bekor qilish"}
        footer={[
          <Button key={"back"} onClick={handleCancel}>
            Bekor qilish
          </Button>,
          <Button
            key={"submit"}
            type="primary"
            loading={isLoading}
            onClick={handleOk}
          >
            Saqlash
          </Button>,
        ]}
      >
        <Row>
          <Col xl={12} className="text-center d-flex justify-content-center">
            <b style={{ fontSize: "20px" }}>{data?.student_fio}</b>
          </Col>
          <Col xl={12} className="text-center d-flex justify-content-center">
            <b>{data?.student_passport}</b>
          </Col>
          <Col xl={12} className="text-center d-flex justify-content-center">
            <b>
              {data?.final_access_group?.type == "first"
                ? data?.final_access_group?.group?.name_uz
                : data?.final_access_group?.name}{" "}
              ({data?.organization?.name_uz})
            </b>
          </Col>
        </Row>
        <Form
          form={confirm_form}
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="To`lov toifasi"
            name="examination_area_payment_type_id"
            rules={[
              {
                required: true,
                message: "To`lov toifasini tanlang!",
              },
            ]}
            initialValue={
              examinationAreaPaymentTypes.length > 0
                ? examinationAreaPaymentTypes[0]?.id
                : ""
            }
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="To`lov toifasi"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {examinationAreaPaymentTypes?.map((element, index) => {
                return (
                  <Option value={element?.id} key={index}>
                    {element?.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="To`lov turi"
            name="pay_type_id"
            rules={[
              {
                required: true,
                message: "To`lov turini tanlang!",
              },
            ]}
            initialValue={1}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="To`lov toifasi"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {paymentTypes &&
                paymentTypes?.map((element, index) => {
                  return (
                    <Option value={element?.id} key={index}>
                      {element?.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <h5 className="text-dark">
                  {t("O`quvchini to`lovini tasdiqlash (Amaliy)")}
                </h5>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                <Row className="justify-content-between">
                  <Col xl={6}>
                    <Input
                      style={{ opacity: 0 }}
                      ref={inputEl}
                      onChange={e => setInputValue(e?.target?.value)}
                      onBlur={focusInput}
                      autoFocus={true}
                      onKeyUp={key_up}
                      type={"number"}
                      value={inputValue}
                    />
                  </Col>
                  <Col xl={6} className={"d-flex justify-content-end"}>
                    <button
                      className={"btn btn-outline-danger"}
                      onClick={clearAllData}
                    >
                      <i className={"fa fa-times"}></i>
                    </button>
                  </Col>
                </Row>
                {data != null && (
                  <Row className={"pt-5"} style={{ fontSize: "25px" }}>
                    <Col xl={12}>
                      <p>
                        F.I.O:
                        <b>{data?.student_fio}</b>
                      </p>
                      <p>
                        Pasport:
                        <b>{data?.student_passport}</b>
                      </p>
                      <p>
                        Tel:
                        <b>{data?.student_phone}</b>
                      </p>
                      <p></p>
                    </Col>
                    <Col xl={12} className={" justify-content-end"}>
                      <div className={"w-100"}>
                        {data?.payment_status ? (
                          <Badge color={"success"}>
                            Nazariy imtihonga to`lov tasdiqlangan
                          </Badge>
                        ) : (
                          <Badge color={"danger"}>
                            Nazariy imtihonga to`lov tasdiqlanmagan
                          </Badge>
                        )}
                      </div>
                    </Col>
                    <Col xl={24} className={"text-center"}>
                      <Col xl={6} className={"ml-auto mr-auto"}>
                        {data?.payment_status ? (
                          <button
                            className={"btn btn-outline-danger p-3 w-100"}
                          >
                            Nazariy imtihon uchun to'lovni <b>Bekor qilish</b>
                          </button>
                        ) : (
                          <button
                            className={"btn btn-outline-success p-3 w-100"}
                            onClick={confirm_payment}
                          >
                            Nazariy imtihon uchun to'lovni <b>Tasdiqlash</b>
                          </button>
                        )}
                      </Col>
                    </Col>
                  </Row>
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(PracticalPaymentQrCodeScannerPage);
