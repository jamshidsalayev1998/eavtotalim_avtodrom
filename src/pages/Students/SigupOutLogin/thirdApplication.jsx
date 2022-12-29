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
  Upload,
  Collapse,
  Steps,
} from "antd";
import { NavLink, useHistory } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import { GrPowerReset } from "react-icons/gr";
import InputMask from "react-input-mask";
import { BsBoxArrowUpRight } from "react-icons/bs";
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
import "./style.css";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { Panel } = Collapse;
const ageCategoryA = moment().diff(moment("01/01/2006", "MM/DD/YYYY"), "years");

const thirdApplication = () => {
  const [form] = Form.useForm();
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [type, setType] = useState([]);
  const [examinationAreas, setExaminationAreas] = useState([]);
  const [currentAge, setCurrentAge] = useState(16);
  const [medicalForm, setMedicalForm] = useState(false);
  const [workBookFile, setWorkBookFile] = useState(false);
  const [requiredDocsFirst, setRequiredDocsFirst] = useState(false);
  const [requiredDocsSecond, setRequiredDocsSecond] = useState(false);
  const history = useHistory();
  const { Step } = Steps;
  const { t } = useTranslation();

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

  const onChange = key => {
    console.log(key);
  };

  return (
    <div className="online-application d-flex justify-content-center align-items-center">
      <div className="wrap">
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
                <IoMdArrowRoundBack /> {t("Back")}
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
                  {t("Educational Information (Mandatory)")}
                </Divider>
                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label={t("Province")}
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
                      placeholder={t("SelectaRegion")}
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
                    label={t("District")}
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
                      placeholder={t("SelectaDistrict")}
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
                    label={t("Organization")}
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
                      placeholder={t("Select a  avtoschool")}
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
                    label={t("All categories")}
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
                      placeholder={t("Select a category")}
                      disabled={!form.getFieldValue("organization_id")}
                      onChange={e => {
                        if (e == 1) {
                          setCurrentAge(18);
                          setMedicalForm(true);
                          setRequiredDocsFirst(true);
                          setRequiredDocsSecond(false);
                        } else if (e == 2) {
                          setCurrentAge(16);
                          setMedicalForm(true);
                          setRequiredDocsFirst(true);
                          setRequiredDocsSecond(false);
                        } else if (e == 3) {
                          setCurrentAge(18);
                          setMedicalForm(true);
                          setRequiredDocsFirst(true);
                          setRequiredDocsSecond(false);
                        } else if (e == 4) {
                          setCurrentAge(18);
                          setMedicalForm(true);
                          setRequiredDocsFirst(true);
                          setRequiredDocsSecond(false);
                        } else if (e == 5) {
                          setCurrentAge(18);
                          setMedicalForm(true);
                          setRequiredDocsFirst(true);
                          setRequiredDocsSecond(false);
                        } else if (e == 8) {
                          setCurrentAge(18);
                          setMedicalForm(true);
                          setRequiredDocsFirst(true);
                          setRequiredDocsSecond(false);
                        } else if (e == 7) {
                          setCurrentAge(28);
                          setMedicalForm(true);
                          setWorkBookFile(true);
                          setRequiredDocsSecond(true);
                          setRequiredDocsFirst(false);
                        } else {
                          setUploadFile(false);
                          setRequiredDocsFirst(false);
                          setRequiredDocsSecond(false);
                        }
                      }}
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
                    label={t("Test center")}
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
                      placeholder={t("Select a test center")}
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

              {/* Tegishli toifa uchun kerakli hujjatlar */}
              <Row gutter={16}>
                <Col span={24}>
                  {requiredDocsFirst ? (
                    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                      <Panel
                        header={
                          <div className="d-flex justify-content-between align-items-center">
                            <span>
                              Tegishli toifa uchun taqdim etilishi kerak bo'lgan
                              hujjatlar to'plami
                            </span>
                            <FcInfo style={{ fontSize: "20px" }} />
                          </div>
                        }
                        key="1"
                      >
                        <p>1. Ariza (elektron)</p>
                        <p>
                          2. Pasport yoki uning o'rnini bosuvchi (shaxsini
                          tasdiqlovchi) boshqa rasmiy hujjat
                        </p>
                        <p>3. 083 tibbiy ma'lumotnoma</p>
                        <p>4. Yagona namunadagi guvohnoma</p>
                        <p>5. Milliy haydaovchilik guvohnomasi</p>

                        {/* Link to docs info */}
                        <Divider className="m-0 p-0" orientation="right">
                          <a
                            href="https://lex.uz/docs/-3765833"
                            style={{ fontSize: "15px" }}
                          >
                            <span> Asos </span> <BsBoxArrowUpRight />
                          </a>
                        </Divider>
                      </Panel>
                    </Collapse>
                  ) : (
                    ""
                  )}

                  {requiredDocsSecond ? (
                    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                      <Panel
                        header={
                          <div className="d-flex justify-content-between align-items-center">
                            <span>
                              Tegishli toifa uchun taqdim etilishi kerak bo'lgan
                              hujjatlar to'plami
                            </span>
                            <FcInfo style={{ fontSize: "20px" }} />
                          </div>
                        }
                        key="1"
                      >
                        <p>1. Ariza (elektron)</p>
                        <p>
                          2. Pasport yoki uning o'rnini bosuvchi (shaxsini
                          tasdiqlovchi) boshqa rasmiy hujjat
                        </p>
                        <p>3. 083 tibbiy ma'lumotnoma</p>
                        <p>
                          4. Yagona namunadagi guvohnoma yoki uzluksiz
                          haydovchilik mehnat faoliyati 10 yildan ortiq bo'lgan
                          "B" va "C" tpifali haydovchilik guvohnomasi bo'lgan
                          shaxslarning haydovchilik guvohnomasini "BE" va "CE"
                          toifaga almashtirish haydovchining mehnat
                          daftarchasidan ko'chirma asosida
                        </p>
                        <p>5. Milliy haydaovchilik guvohnomasi</p>

                        {/* Link to docs info */}
                        <Divider className="m-0 p-0" orientation="right">
                          <a
                            href="https://lex.uz/docs/-3765833"
                            style={{ fontSize: "15px" }}
                          >
                            <span> Asos </span> <BsBoxArrowUpRight />
                          </a>
                        </Divider>
                      </Panel>
                    </Collapse>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>

              {/* shaxsiy ma'lumotlar */}
              <Row gutter={16}>
                <Divider className="text-warning" orientation="left">
                  {t("Personal information")}
                </Divider>
                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label={t("Full name")}
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
                    label={t("Passport series and number")}
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
                    label={t("Phone")}
                    name="student_phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your telefon!",
                      },
                    ]}
                  >
                    <InputMask
                      placeholder={t("Enter the phone number")}
                      {...maskInputNumber}
                      className={"ant-input"}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label="Exam status"
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
                      <Option value={"first"}>{t("For the first time")}</Option>
                      <Option value={"resubmit"}>{t("Resubmission")}</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                  <Form.Item
                    label={t("Group")}
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
                    label={t("Birth date")}
                    name="birthday"
                    rules={[
                      {
                        required: true,
                        message: "Please input your birth date!",
                      },
                    ]}
                  >
                    <DatePicker
                      disabled={!form.getFieldValue("edu_type_id")}
                      disabledDate={current => {
                        console.log(current.diff(new Date(), "years"));
                        return -current.diff(new Date(), "years") < currentAge;
                      }}
                      defaultPickerValue={moment(
                        new Date().getTime() - 86400 * 1000 * 365 * currentAge
                      )}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>

                {medicalForm ? (
                  <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                    <Form.Item
                      label={
                        <div>
                          {t("083 Form")}
                          <span className="text-warning">
                            ({t("optional")})
                          </span>
                        </div>
                      }
                    >
                      <Upload accept=".pdf">
                        <Button>{t("Upload")}</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                ) : (
                  ""
                )}

                {workBookFile ? (
                  <Col xs={24} md={12} lg={8} xl={8} xxl={6}>
                    <Form.Item
                      label={
                        <div>
                          {t("Workbook")}
                          <span className="text-warning">
                            ({t("optional")})
                          </span>
                        </div>
                      }
                      name="file"
                    >
                      <Upload accept=".pdf">
                        <Button>{t("Upload")}</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                ) : (
                  ""
                )}
              </Row>

              {/* save and deny */}
              <Row>
                <Col
                  span={24}
                  className={"d-flex justify-content-end align-items-center"}
                >
                  <NavLink to={"/login"}>
                    <Button type="primary" danger className="mr-3">
                      {t("Cancel")}
                    </Button>
                  </NavLink>

                  <Button
                    className="mr-3 text-danger"
                    htmlType="reset"
                    type="dashed"
                    danger
                  >
                    <GrPowerReset className="mr-1 text-danger" /> {t("Clear")}
                  </Button>

                  <Button htmlType="submit" type="primary">
                    <FaSave className="mr-1" /> {t("Save")}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default thirdApplication;
