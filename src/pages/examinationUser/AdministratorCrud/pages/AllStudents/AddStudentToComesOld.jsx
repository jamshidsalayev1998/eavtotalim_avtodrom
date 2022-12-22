import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { withTranslation } from "react-i18next";
import {
  Row,
  Col,
  Select,
  Input,
  Form,
  message,
  Popconfirm,
  Alert,
  DatePicker,
  Collapse,
  Divider,
  Upload,
  Button,
} from "antd";
import axios from "axios";
import { PATH_PREFIX } from "../../../../../Utils/AppVariables";
import MaskedInput from "antd-mask-input";
import { useHistory, useLocation } from "react-router";
import {
  sendStudentToResubmit,
  sendStudentToResubmitAllResponse,
} from "../../../../../services/api_services/send_student_to_resubmit";
import { getEduTypesForAll } from "../../../../../services/api_services/edu_types_api";
import {
  addStudentToComes,
  getOrganizations,
} from "../../../../../services/api_services/administrator_students_api";
import InputMask from "react-input-mask";
import EnterOutlined from "@ant-design/icons/lib/icons/EnterOutlined";
import { FcInfo } from "react-icons/fc";
import { BsBoxArrowUpRight } from "react-icons/bs";

import moment from "moment";

const { Panel } = Collapse;
const ageCategoryA = moment().diff(moment("01/01/2006", "MM/DD/YYYY"), "years");

const AddStudentToComesOld = props => {
  const history = useHistory();
  const [addForm] = Form.useForm();
  const { Option } = Select;
  const [validatorErrors, setValidatorErrors] = useState([]);
  const [dataHas, setDataHas] = useState(null);
  const [eduTypes, setEduTypes] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [currentAge, setCurrentAge] = useState(16);
  const [requiredDocsFirst, setRequiredDocsFirst] = useState(false);
  const [requiredDocsSecond, setRequiredDocsSecond] = useState(false);
  const location = useLocation();
  function onFinishAddFailed() {}
  useEffect(() => {
    (async () => {
      let params = {};
      const res = await getEduTypesForAll(params);
      getOrganizationsFunction();
      console.log(res?.data?.data);
      setEduTypes(res?.data?.data);
    })();
    window.addEventListener("keypress", event => {
      if (event?.code === "Enter") {
        if (
          location?.pathname === "/examination-administrator/all-students/add"
        ) {
          saveStudent();
        }
      }
    });
  }, []);

  const getOrganizationsFunction = () => {
    (async () => {
      const orgResp = await getOrganizations({ show_count: "all" });
      if (orgResp) {
        setOrganizations(orgResp?.data);
        addForm.setFieldsValue({
          organization_id: orgResp?.data[0]?.id,
        });
      }
    })();
  };

  function onFinishAdd(values) {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key] ? values[key] : "");
    }
    let params = {
      token: token,
    };
    (async () => {
      const res = await addStudentToComes(params, formData);
      if (res?.data?.status === 1) {
        message.success(res?.data?.message);
        history.push("/examination-administrator/all-students");
      }
      if (res?.data?.status == 2) {
        message.error("xato");
        setValidatorErrors(res?.data?.validator_errors);
        if (res?.data?.data_has) {
          setDataHas(res?.data?.data_has);
        }
      }
    })();
  }

  function saveStudent() {
    addForm.submit();
  }

  const onPassportHandle = e => {
    // console.log('pi' , e)
    addForm.setFieldsValue({
      student_passport: e?.target?.value?.toUpperCase(),
    });
  };
  const maskInput = {
    mask: "aa9999999",
    maskChar: "_",
    alwaysShowMask: false,
    formatChars: {
      9: "[0-9]",
      a: "[A-Za-z]",
    },

    permanents: [2, 5],
  };
  const maskInputNumber = {
    mask: "(99) 9999999",
    maskChar: "_",
    alwaysShowMask: false,
    formatChars: {
      9: "[0-9]",
      a: "[A-Za-z]",
    },

    permanents: [2, 5],
  };

  const onChange = key => {
    console.log(key);
  };
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <div className="top_links_page_title">
                  <span className="mr-3" onClick={() => history.goBack()}>
                    <i className="bx bx-arrow-back"> </i>
                  </span>
                  <h5>O'quvchi qo'shish </h5>
                </div>
                <div className={"d-flex"}>
                  <button className={"btn btn-success"} onClick={saveStudent}>
                    <i className={"fa fa-save"} /> Saqlash
                  </button>
                  <span className={"keyboard-style"}>
                    {" "}
                    <EnterOutlined />{" "}
                  </span>
                </div>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                <Form
                  name="basic"
                  form={addForm}
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 23,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinishAdd}
                  onFinishFailed={onFinishAddFailed}
                  autoComplete="off"
                >
                  <Row>
                    <Col xl={6}>
                      <Form.Item
                        label="F.I.O"
                        name="student_fio"
                        rules={[
                          {
                            required: true,
                            message:
                              "O`quvchi ism familiya otasining ismini kiriting!",
                          },
                        ]}
                      >
                        <Input
                          allowClear={true}
                          style={{ width: "100%" }}
                          placeholder="F.I.O"
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={6}>
                      <Form.Item
                        name="student_passport"
                        label="Pasport seria va raqami"
                        rules={[
                          {
                            required: true,
                            message: "Pasport seria va raqamini kiriting",
                          },
                        ]}
                      >
                        <InputMask
                          {...maskInput}
                          className={"ant-input"}
                          onChange={e => onPassportHandle(e)}
                          placeholder="AA1234567"
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={6}>
                      <Form.Item
                        label="Telefon"
                        name="student_phone"
                        rules={[
                          {
                            required: true,
                            message: "O`quvchi telefon raqamini kiriting!",
                          },
                        ]}
                      >
                        <InputMask
                          {...maskInputNumber}
                          className={"ant-input"}
                          placeholder="(99) 1234567"
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={6}>
                      <Form.Item
                        label="Imtihon topshirish holati"
                        name="type"
                        rules={[
                          {
                            required: true,
                            message: "Holatini tanlang!",
                          },
                        ]}
                      >
                        <Select
                          className={"w-100"}
                          placeholder="Topshirish holati"
                        >
                          <Option value={"first"}>Birinchi marta</Option>
                          <Option value={"resubmit"}>Qayta topshirish</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xl={6}>
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
                          className={"w-100"}
                          placeholder="Toifani tanlang"
                          onChange={e => {
                            if (e == 1) {
                              setCurrentAge(18);
                              setRequiredDocsFirst(true);
                              setRequiredDocsSecond(false);
                            } else if (e == 2) {
                              setCurrentAge(16);
                              setRequiredDocsFirst(true);
                              setRequiredDocsSecond(false);
                            } else if (e == 3) {
                              setCurrentAge(18);
                              setRequiredDocsFirst(true);
                              setRequiredDocsSecond(false);
                            } else if (e == 4) {
                              setCurrentAge(18);
                              setRequiredDocsFirst(true);
                              setRequiredDocsSecond(false);
                            } else if (e == 5) {
                              setCurrentAge(18);
                              setRequiredDocsFirst(true);
                              setRequiredDocsSecond(false);
                            } else if (e == 8) {
                              setCurrentAge(18);
                              setRequiredDocsFirst(true);
                              setRequiredDocsSecond(false);
                            } else if (e == 7) {
                              setCurrentAge(28);
                              setRequiredDocsSecond(true);
                              setRequiredDocsFirst(false);
                            } else {
                              setUploadFile(false);
                              setRequiredDocsFirst(false);
                              setRequiredDocsSecond(false);
                            }
                          }}
                        >
                          {eduTypes.map((element, i) => {
                            return (
                              <Option key={i} value={element?.id}>
                                {element?.short_name_uz}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xl={12}>
                      <Form.Item
                        label="Ta`lim tashkiloti"
                        name="organization_id"
                        rules={[
                          {
                            required: true,
                            message: "Ta`lim tashkilotini tanlang!",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Ta'lim tashkilotini tanlang"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option?.children
                              ?.toLowerCase()
                              ?.includes(input?.toLowerCase())
                          }
                        >
                          {organizations.map((element, index) => {
                            return (
                              <Option value={element?.id}>
                                {element?.name_uz ||
                                  element?.name_ru ||
                                  element?.name_kiril ||
                                  element?.name_qq ||
                                  element?.name_en}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xl={6}>
                      <Form.Item
                        label="Guruh"
                        name="group"
                        rules={[
                          {
                            required: true,
                            message: "Guruhni kiriting!",
                          },
                        ]}
                      >
                        {/*<MaskedInput mask="(11) 1111111"/>*/}
                        <Input
                          placeholder="Guruhni kiriting"
                          allowClear={true}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={6}>
                      <Form.Item
                        label="Tug'ilgan sanasi"
                        name="birthday"
                        rules={[
                          {
                            required: true,
                            message: "Tug'ilgan sanasini kiriting!",
                          },
                        ]}
                        className={"w-100"}
                      >
                        <DatePicker
                          placeholder="Tug'ilgan sanani tanlang"
                          disabled={!addForm.getFieldValue("edu_type_id")}
                          disabledDate={current => {
                            console.log(current.diff(new Date(), "years"));
                            return (
                              -current.diff(new Date(), "years") < currentAge
                            );
                          }}
                          defaultPickerValue={moment(
                            new Date().getTime() -
                              86400 * 1000 * 365 * currentAge
                          )}
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <Row>
                  {validatorErrors &&
                    Object.entries(validatorErrors).map(([key, subject], i) => (
                      <Alert
                        className={"w-100"}
                        message={subject}
                        type={"error"}
                      />
                    ))}
                </Row>
                {dataHas && (
                  <Row className={"border mt-3"}>
                    <Col xl={6} className={" p-2"}>
                      {dataHas?.student_fio}
                    </Col>
                    <Col xl={6} className={" p-2"}>
                      {dataHas?.student_passport}
                    </Col>
                    <Col xl={6} className={" p-2"}>
                      {dataHas?.student_phone}
                    </Col>
                    <Col xl={6} className={" p-2"}>
                      <Popconfirm
                        placement={"top"}
                        title={"Qayta topshirishga rasmiylashtirilsinmi"}
                        onConfirm={() =>
                          sendStudentToResubmitAllResponse(dataHas?.id).then(
                            response => {
                              if (response) {
                                history.push(
                                  "/examination-administrator/all-students"
                                );
                              }
                            }
                          )
                        }
                      >
                        <button className={"btn btn-outline-warning"}>
                          Qayta topshirishga rasmiylashtirish
                        </button>
                      </Popconfirm>
                    </Col>
                  </Row>
                )}
              </div>

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
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(AddStudentToComesOld);
