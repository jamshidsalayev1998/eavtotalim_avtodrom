import React from "react";
import {
  Card,
  Col,
  Row,
  Button,
  Checkbox,
  Form,
  Input,
  Divider,
  Select,
  DatePicker,
  Space,
  message,
} from "antd";
import { NavLink, useHistory } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import InputMask from "react-input-mask";
import {
  getRegionsOnline,
  getDistrictsOnline,
} from "services/api_services/region_district";
import { useEffect } from "react";
import { useState } from "react";
import {
  getExaminationAreas,
  getOrganizationByArea,
  getTypeByOrganisation,
} from "services/api_services/organization";
import moment from "moment";
import axios from "axios";
import { PATH_PREFIX } from "Utils/AppVariables";

const { Option } = Select;
const ageCategoryA = moment().diff(moment("01/01/2006", "MM/DD/YYYY"), "years");
console.log(ageCategoryA);

const thirdApplication = () => {
  const [form] = Form.useForm();
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [type, setType] = useState([]);
  const [examinationAreas, setExaminationAreas] = useState([]);
  const history = useHistory();

  const onFinish = async values => {
    try {
      let data = new FormData();
      Object.entries(values)?.forEach(([key, value]) => {
        if (key == "birth_date") {
          data.append(key, moment(value).format("mm-DD-YYYY"));
        } else {
          data.append(key, value);
        }
      });
      const resp = await axios({
        url: PATH_PREFIX + "/application-examination-area/application",
        method: "post",
        data: data,
      });
      if (resp?.data?.status == 1) {
        message.success("Ariza qabul qilindi");
        history.push("/login");
      }
    } catch (error) {}
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  // get datas
  useEffect(() => {
    (async () => {
      const resp = await getRegionsOnline();
      if (resp) setRegions(resp);
    })();
  }, []);

  const setDistrictById = async (event, type) => {
    const resp = await getDistrictsOnline(event);
    setDistricts(resp);
    if (!type) {
      form.setFieldsValue({
        area_id: null,
      });
    }
  };

  const setAutoSchoolById = async (event, type) => {
    const resp = await getOrganizationByArea(event);
    setOrganisations(resp);
    if (!type) {
      form.setFieldsValue({
        organization_id: null,
      });
    }
  };

  const setTypeByOrganisationId = async (event, type) => {
    const resp = await getTypeByOrganisation(event);
    setType(resp);
    if (!type) {
      form.setFieldsValue({
        edu_type: null,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const resp = await getExaminationAreas();
      if (resp) setExaminationAreas(resp);
    })();
  }, []);

  // regex input mask
  const maskInput = {
    mask: "aa9999999",
    maskChar: "_",
    alwaysShowMask: false,
    formatChars: {
      9: "[0-9]",
      a: "[A-Za-z]",
    },

    permanents: [2, 5], // permanents is an array of indexes of the non-editable characters in the mask
  };

  const onPassportHandle = e => {
    form.setFieldsValue({
      student_passport: e?.target?.value?.toUpperCase(),
    });
  };

  

  const maskInputNumber = {
    mask: "(99) 9999999",
    maskChar: "_",
    alwaysShowMask: false,
    formatChars: {
      9: "[0-9]",
      a: "[A-Za-z]",
    },

    permanents: [2, 5], // permanents is an array of indexes of the non-editable characters in the mask
  };

  return (
    <div
      className="site-card-wrapper d-flex justify-content-center align-items-center "
      style={{ height: "100vh" }}
    >
      <Row gutter={16}>
        <Col span={24} className={""}>
          <Card
            bordered={true}
            style={{
              borderRadius: "15px",
              border: "0.5px solid #d9d9d9",
              minHeight: "80vh",
            }}
          >
            {/* go back */}
            <div>
              <NavLink to={"/login"} className={"text-dark font-size-16"}>
                <IoMdArrowRoundBack /> Orqaga
              </NavLink>
            </div>

            <Form
              form={form}
              layout="vertical"
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              {/* Ta'lim ma'lumotlar */}
              <Row gutter={16}>
                <Divider className="text-warning" orientation="left">
                  Ta'lim ma'lumotlar (Majburiy)
                </Divider>
                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="Viloyat"
                    name="region"
                    rules={[
                      {
                        required: true,
                        message: "Please input your region!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Viloyatni tanlang"
                      onChange={e => setDistrictById(e)}
                    >
                      {regions?.map((item, i) => (
                        <Option key={i} value={item?.id}>
                          {item?.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="Tuman"
                    name="area_id"
                    rules={[
                      {
                        required: true,
                        message: "Please input your district!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Tumanni tanlang"
                      disabled={!form.getFieldValue("region")}
                      onChange={e => setAutoSchoolById(e)}
                    >
                      {districts?.map((item, i) => (
                        <Option key={i} value={"" + item?.id}>
                          {item?.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="Avtomaktab"
                    name="organization_id"
                    rules={[
                      {
                        required: true,
                        message: "Please input your avtoschool!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Avtomaktabni tanlang"
                      disabled={!form.getFieldValue("area_id")}
                      onChange={e => setTypeByOrganisationId(e)}
                    >
                      {organisations?.map((item, i) => (
                        <Option key={i} value={item?.id}>
                          {item?.name_uz}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="Toifa"
                    name="edu_type_id"
                    rules={[
                      {
                        required: true,
                        message: "Please input your education type!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Toifani tanlang"
                      disabled={!form.getFieldValue("organization_id")}
                    >
                      {type?.map((item, i) => (
                        <Option key={i} value={item?.id}>
                          {item?.name_uz}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="Imtihon markazi"
                    name="examination_area_id"
                    rules={[
                      {
                        required: true,
                        message: "Please input your examination center!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Imtihon markazini tanlang"
                    >
                      {examinationAreas?.map((item, i) => (
                        <Option key={i} value={item?.id}>
                          {item?.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* shaxsiy ma'lumotlar */}
              <Row gutter={16}>
                <Divider className="text-warning" orientation="left">
                  Shaxsiy ma'lumotlar
                </Divider>
                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="FIO"
                    name="student_fio"
                    rules={[
                      {
                        required: true,
                        message: "Please input your fio!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="Pasport seria va raqami"
                    name="student_passport"
                    rules={[
                      {
                        required: true,
                        message: "Please input your passport info!",
                      },
                    ]}
                  >
                    <InputMask
                      placeholder="AA1234567"
                      {...maskInput}
                      className={"ant-input"}
                      onChange={e => onPassportHandle(e)}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="Telefon"
                    name="student_phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your telefon!",
                      },
                    ]}
                  >
                    <InputMask
                      placeholder="Telefon raqamni kiriting"
                      {...maskInputNumber}
                      className={"ant-input"}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="Imtihon topshirish holati"
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: "Please input your education exam status!",
                      },
                    ]}
                    initialValue={"first"}
                  >
                    <Select
                      style={{
                        width: "100%",
                      }}
                      allowClear
                    >
                      <Option value={"first"}>Birinchi marta</Option>
                      <Option value={"resubmit"}>Qayta topshirish</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="Guruh"
                    name="group"
                    rules={[
                      {
                        required: true,
                        message: "Please input your group!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="Tug'ilgan sanasi"
                    name="birthday"
                    rules={[
                      {
                        required: true,
                        message: "Please input your birth date!",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* save and deny */}
              <Row>
                <Col
                  span={24}
                  className={"d-flex justify-content-end align-items-center"}
                >
                  <NavLink to={"/login"}>
                    <Button type="primary" danger className="mr-3">
                      Bekor qilish
                    </Button>
                  </NavLink>

                  <Button
                    className="mr-3 text-danger"
                    htmlType="reset"
                    type="dashed"
                    danger
                  >
                    <GrPowerReset className="mr-1 text-danger" /> Tozalash
                  </Button>

                  <Button htmlType="submit" type="primary">
                    <FaSave className="mr-1" /> Saqlash
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default thirdApplication;
