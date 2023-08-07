import React, { useState, useEffect } from "react";
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
  Timeline,
  Spin,
  Upload,
  Button,
} from "antd";
import axios from "axios";
import MaskedInput from "antd-mask-input";
import { useHistory, useRouteMatch } from "react-router";
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
import {
  editFinalAccessStudent,
  showFinalAccessStudent,
  updateFinalAccessStudent,
} from "../../../../../services/api_services/final_access_student/final_accesss_student_api";
import moment from "moment";
import { FilePdfOutlined } from "@ant-design/icons";
import userInfo from "../../../../../assets/icons/online-application/applicant-infos.png";
import attachment from "../../../../../assets/icons/online-application/attachment.png";

const EditStudents = props => {
  const history = useHistory();
  const [addForm] = Form.useForm();
  const { Option } = Select;
  const [validatorErrors, setValidatorErrors] = useState([]);
  const [dataHas, setDataHas] = useState(null);
  const [eduTypes, setEduTypes] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [data, setData] = useState();
  const [attempt, setAttempt] = useState();
  const [loading, setLoading] = useState(false);
  const match = useRouteMatch("/examination-administrator/edit-students/:id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = {};
        const res = await getEduTypesForAll(params);
        const formatDate = date => moment(date).format("YYYY-MM-DD");
        setEduTypes(res?.data?.data);
        getOrganizationsFunction();

        const response = await showFinalAccessStudent(match?.params?.id);
        console.log("response", response);
        if (response?.message === "Success") {
          const studentData = response?.data;
          const studentFiles = studentData?.files?.map(v => ({
            [`${v.file_key}_number`]: v.number,
            [`${v.file_key}given_date`]: v.given_date,
          }));
          setData(studentData?.files);
          console.log("use effect", studentData);
          const formattedData = {
            ...studentFiles,
            ...studentData,
            birthday: formatDate(studentData?.birthday),
          };
          console.log("formattedData", formattedData);
          console.log(
            "formatDate(studentData?.birthday)",
            formatDate(studentData?.birthday)
          );

          addForm.setFieldsValue(formattedData);
          setLoading(false);
        }
      } catch (error) {
        message.error("Ma'lumotlarni ochishda xatolik!");
      }
    };

    fetchData();
  }, [addForm, match?.params?.id]);

  const formOnChange = value => {
    console.log("valuess", value);
  };

  const onFinishAdd = async values => {
    try {
      setLoading(true);
      const data = new FormData();
      console.log("on finish data", values);

      const formatDate = date => moment(date).format("YYYY-MM-DD");

      if (values.med_file) {
        data.append("med_file", values.med_file.file.originFileObj);
      }
      if (values.med_file_number) {
        data.append("med_file_number", values.med_file_number);
      }
      if (values.med_file_date) {
        data.append("med_file_date", formatDate(values.med_file_date));
      }

      if (values.school_license) {
        data.append("school_license", values.school_license.file.originFileObj);
      }
      if (values.school_license_number) {
        data.append("school_license_number", values.school_license_number);
      }
      if (values.school_license_date) {
        data.append(
          "school_license_date",
          formatDate(values.school_license_date)
        );
      }

      if (values.license) {
        data.append("license", values.license.file.originFileObj);
      }
      if (values.license_number) {
        data.append("license_number", values.license_number);
      }
      if (values.license_date) {
        data.append("license_date", formatDate(values.license_date));
      }

      if (values.school_diploma) {
        data.append("school_diploma", values.school_diploma.file.originFileObj);
      }
      if (values.school_diploma_number) {
        data.append("school_diploma_number", values.school_diploma_number);
      }
      if (values.school_diploma_date) {
        data.append(
          "school_diploma_date",
          formatDate(values.school_diploma_date)
        );
      }

      if (values.road_safety_letter) {
        data.append(
          "road_safety_letter",
          values.road_safety_letter.file.originFileObj
        );
      }
      if (values.road_safety_letter_number) {
        data.append(
          "road_safety_letter_number",
          values.road_safety_letter_number
        );
      }
      if (values.road_safety_letter_date) {
        data.append(
          "road_safety_letter_date",
          formatDate(values.road_safety_letter_date)
        );
      }

      data.append("student_fio", values.student_fio);
      data.append("student_passport", values.student_passport);
      data.append("student_phone", values.student_phone);
      data.append("type", values.type);
      data.append("organization_id", values.organization_id);
      data.append("group", values.info.group);
      data.append("birthday", formatDate(values.birthday));
      data.append("edu_type_id", values.edu_type_id);

      const res = await updateFinalAccessStudent(match.params.id, data);

      if (res.message === "Success") {
        message.success(res.message);
        message.info("O'quvchi ma'lumotlari o'zgardi");
        history.push("/examination-administrator/all-students");
      } else if (res.status === 2) {
        message.error("Error");
        setValidatorErrors(res.data.validator_errors);
        if (res.data_has) {
          setDataHas(res.data_has);
        }
      }
    } catch (error) {
      message.error("Ma'lumotlarni o'zgartirishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

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

  function saveStudent() {
    addForm.submit();
  }

  const onPassportHandle = e => {
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

    permanents: [2, 5], // permanents is an array of indexes of the non-editable characters in the mask
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

  const maskInputDate = {
    mask: "9999-99-99",
    maskChar: "_",
    alwaysShowMask: false,
    formatChars: {
      9: "[0-9]",
    },
    permanents: [4, 7], // permanents is an array of indexes of the non-editable characters in the mask
  };

  return (
    <Spin spinning={loading}>
      <div className="page-content">
        <Container fluid>
          <Card>
            <div className="top-organizations">
              <div className="top_links_page_title">
                <span className="mr-3" onClick={() => history.goBack()}>
                  <i className="bx bx-arrow-back"> </i>
                </span>
                <h4>O'quvchi ma'lumotlarini o'zgartirish </h4>
              </div>
              <button className={"btn btn-success"} onClick={saveStudent}>
                <i className={"fa fa-save"}></i> Saqlash
              </button>
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
                onFinish={onFinishAdd}
                onChange={formOnChange}
                autoComplete="off"
                initialValues={data}
              >
                <Row>
                  <Col
                    style={{
                      fontSize: "18px",
                      color: "#2c60f4",
                      marginBottom: "15px",
                    }}
                    span={24}
                    className=""
                  >
                    <img className="mr-3" src={userInfo} alt="" />
                    Topshiruvchi ma'lumotlari
                  </Col>

                  <Col xs={24} sm={24} md={8} lg={8} xl={6}>
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
                      <Input allowClear={true} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                    <Form.Item
                      name="student_passport"
                      label="Pasport seria va raqami"
                      // hasFeedback={passport ? true : false}
                      // validateStatus={
                      //     isValidPassport === null
                      //         ? success
                      //         : isValidPassport === false
                      //         ? "error"
                      //         : "success"
                      // }
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
                      />
                      {/*<Input onChange={(e) => onPassportHandle(e)}/>*/}
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                    <Form.Item
                      label="Tug'ilgan sanasi"
                      name={["birthday"]}
                      rules={[
                        {
                          required: true,
                          message: "Tug'ilgan sanasini kiriting!",
                        },
                      ]}
                      className={"w-100"}
                    >
                      <InputMask
                        className={"ant-input"}
                        {...maskInputDate}
                        placeholder="YYYY-OO-KK"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={8} lg={8} xl={6}>
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
                      {/*<MaskedInput mask="(11) 1111111"/>*/}
                      <InputMask {...maskInputNumber} className={"ant-input"} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                    <Form.Item
                      label="Imtihon topshirish holati"
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "Holatini tanlang!",
                        },
                      ]}
                      initialValue={"first"}
                    >
                      <Select className={"w-100"}>
                        <Option value={"first"}>Birinchi marta</Option>
                        <Option value={"resubmit"}>Qayta topshirish</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                    <Form.Item
                      label="Ta`lim tashkiloti"
                      name="organization_id"
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
                  <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                    <Form.Item
                      label="Guruh"
                      name={["info", "group"]}
                      rules={[
                        {
                          required: true,
                          message: "Guruhni kiriting!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={6} className="d-none">
                    <Form.Item
                      label="Ta`lim turi"
                      name="edu_type_id"
                      rules={[
                        {
                          required: true,
                          message: "Ta`lim turini tanlang!",
                        },
                      ]}
                      initialValue={1}
                    >
                      <Select className={"w-100"}>
                        {eduTypes.map((element, index) => {
                          return (
                            <Option value={element?.id}>
                              {element?.short_name_uz}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col
                    style={{
                      fontSize: "18px",
                      color: "#2c60f4",
                      marginBottom: "15px",
                      marginTop: "15px",
                    }}
                    span={24}
                    className=""
                  >
                    <img className="mr-3" src={attachment} alt="" />
                    Talab etiladigan hujjatlar to'plami
                  </Col>
                  <Col span={24}>
                    {data?.map((v, i) => {
                      return (
                        <Row>
                          <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                            <Form.Item
                              label={
                                v.file_key === "med_file"
                                  ? "Tibbiy ma`lumotnoma raqami"
                                  : v.file_key === "school_license"
                                  ? "Avtomaktab tomonidan berilgan guvohnoma raqami"
                                  : v.file_key === "license"
                                  ? "Mavjud guvohnoma raqami"
                                  : v.file_key === "school_diploma"
                                  ? "Muassasa tomonidan berilgan diplom raqami"
                                  : v.file_key === "road_safety_letter"
                                  ? "DYHXX tomonidan berilgan xat raqami"
                                  : ""
                              }
                              name={`${v.file_key}_number`}
                            >
                              <Input defaultValue={v.number} />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                            <Form.Item
                              label={
                                v.file_key === "med_file"
                                  ? "Tibbiy ma'lumotnoma sanasi"
                                  : v.file_key === "school_license"
                                  ? "Avtomaktab tomonidan berilgan guvohnoma sanasi"
                                  : v.file_key === "license"
                                  ? "Mavjud guvohnoma sanasi"
                                  : v.file_key === "school_diploma"
                                  ? "Muassasa tomonidan berilgan diplom sanasi"
                                  : v.file_key === "road_safety_letter"
                                  ? "DYHXX tomonidan berilgan xat sanasi"
                                  : ""
                              }
                              name={`${v.file_key}_date`}
                            >
                              {/* <DatePicker
                                style={{ width: "100%" }}
                                defaultValue={v?.given_date}
                                format={"YYYY-MM-DD"}
                              /> */}
                              <InputMask
                                className={"ant-input"}
                                {...maskInputDate}
                                placeholder="YYYY-OO-KK"
                                defaultValue={v?.given_date}
                                format={"YYYY-MM-DD"}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                            <Form.Item
                              name={`${v.file_key}`}
                              label={
                                v.file_key === "med_file"
                                  ? "Tibbiy ma`lumotnoma nusxasi"
                                  : v.file_key === "school_license"
                                  ? "Avtomaktab tomonidan berilgan guvohnoma"
                                  : v.file_key === "license"
                                  ? "Mavjud guvohnoma nusxasi"
                                  : v.file_key === "school_diploma"
                                  ? "Muassasa tomonidan berilgan diplom"
                                  : v.file_key === "road_safety_letter"
                                  ? "DYHXX tomonidan berilgan xat"
                                  : ""
                              }
                            >
                              <Upload
                                fileList={[
                                  {
                                    uid: "-1",
                                    name: "file",
                                    url: v.file,
                                    status: "success",
                                  },
                                ]}
                                accept=".pdf"
                              >
                                <Button icon={<FilePdfOutlined />}>
                                  {" "}
                                  PDF fayl tanlang
                                </Button>
                              </Upload>
                            </Form.Item>
                          </Col>
                        </Row>
                      );
                    })}
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

              {/* o'quvchi statuslari */}
              <Row className={"mt-3"}>
                <Timeline>
                  <Timeline.Item color="green">
                    <p>O`quvchi qo`shildi</p>
                    <p>{moment(data?.created_at).format("YYYY-MM-DD")}</p>
                  </Timeline.Item>
                  {parseInt(data?.exam_result) === 1 ? (
                    <Timeline.Item color="green">
                      <p>Testdan o`tgan</p>
                      <p>{moment(attempt?.created_at).format("YYYY-MM-DD")}</p>
                    </Timeline.Item>
                  ) : parseInt(data?.exam_result) === 0 ? (
                    <Timeline.Item color="red">
                      <p>Testdan yiqildi</p>
                      <p>{moment(attempt?.created_at).format("YYYY-MM-DD")}</p>
                      <p>
                        to'g'ri: {attempt?.correct_answers} / noto'g'ri{" "}
                        {attempt?.incorrect_answers}
                      </p>
                    </Timeline.Item>
                  ) : (
                    <Timeline.Item color="yellow">
                      <p>Test topshirmadi</p>
                    </Timeline.Item>
                  )}
                  {parseInt(data?.practical_exam_result) === 1 ? (
                    <Timeline.Item color="green">
                      <p>Amaliydan o`tgan</p>
                      <p>{moment(attempt?.created_at).format("YYYY-MM-DD")}</p>
                    </Timeline.Item>
                  ) : parseInt(data?.practical_exam_result) === 0 ? (
                    <Timeline.Item color="red">
                      <p>Amaliydan yiqildi</p>
                      <p>{moment(attempt?.created_at).format("YYYY-MM-DD")}</p>
                      <p>
                        to'g'ri: {attempt?.correct_answers} / noto'g'ri{" "}
                        {attempt?.incorrect_answers}
                      </p>
                    </Timeline.Item>
                  ) : (
                    <Timeline.Item color="yellow">
                      <p>Amaliydan topshirmadi</p>
                    </Timeline.Item>
                  )}
                </Timeline>
              </Row>
            </div>
          </Card>
        </Container>
      </div>
    </Spin>
  );
};

export default withTranslation()(EditStudents);
