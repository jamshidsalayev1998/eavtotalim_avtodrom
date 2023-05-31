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
} from "antd";
import axios from "axios";
import { PATH_PREFIX } from "../../../../../Utils/AppVariables";
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
  showFinalAccessStudent,
  updateFinalAccessStudent,
} from "../../../../../services/api_services/final_access_student/final_accesss_student_api";
import moment from "moment";

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
  const match = useRouteMatch("/examination-administrator/edit-students/:id");

  function onFinishAddFailed() {}

  useEffect(() => {
    (async () => {
      let params = {};
      const res = await getEduTypesForAll(params);
      getOrganizationsFunction();
      setEduTypes(res?.data?.data);
      const response = await showFinalAccessStudent(match?.params?.id);
      console.log("popo", response);
      if (parseInt(response?.status) === 1) {
        const yy = response?.data?.student;
        console.log("lll", yy);
        Object.assign(yy, { birthday: moment(yy?.birthday) });
        Object.assign(yy, {
          organization_id: JSON.parse(yy?.info)?.organization_id,
        });
        Object.assign(yy, { group: JSON.parse(yy?.info)?.group });
        addForm.setFieldsValue(yy);
        setData(yy);
        setAttempt(response?.data?.attempt);
      }
    })();
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
    (async () => {
      const res = await updateFinalAccessStudent(data?.id, formData);
      if (res?.status === 1) {
        message.success(res?.message);
        history.push("/examination-administrator/all-students");
      }
      if (res?.status === 2) {
        message.error("xato");
        setValidatorErrors(res?.data?.validator_errors);
        if (res?.data_has) {
          setDataHas(res?.data_has);
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
                        <Input allowClear={true} style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col xl={6}>
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
                        {/*<MaskedInput mask="(11) 1111111"/>*/}
                        <InputMask
                          {...maskInputNumber}
                          className={"ant-input"}
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
                        initialValue={"first"}
                      >
                        <Select className={"w-100"}>
                          <Option value={"first"}>Birinchi marta</Option>
                          <Option value={"resubmit"}>Qayta topshirish</Option>
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
                        <Input allowClear={true} style={{ width: "100%" }} />
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
                        {/*<MaskedInput mask="(11) 1111111"/>*/}
                        <DatePicker className={"w-100"} />
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

                <Row className={"mt-3"}>
                  <Timeline>
                    <Timeline.Item color="green">
                      <p>O`quvchi qo`shildi</p>
                      <p>{moment(data?.created_at).format("YYYY-MM-DD")}</p>
                    </Timeline.Item>
                    {parseInt(data?.exam_result) === 1 ? (
                      <Timeline.Item color="green">
                        <p>Testdan o`tgan</p>
                        <p>
                          {moment(attempt?.created_at).format("YYYY-MM-DD")}
                        </p>
                      </Timeline.Item>
                    ) : parseInt(data?.exam_result) === 0 ? (
                      <Timeline.Item color="red">
                        <p>Testdan yiqildi</p>
                        <p>
                          {moment(attempt?.created_at).format("YYYY-MM-DD")}
                        </p>
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
                        <p>
                          {moment(attempt?.created_at).format("YYYY-MM-DD")}
                        </p>
                      </Timeline.Item>
                    ) : parseInt(data?.practical_exam_result) === 0 ? (
                      <Timeline.Item color="red">
                        <p>Amaliydan yiqildi</p>
                        <p>
                          {moment(attempt?.created_at).format("YYYY-MM-DD")}
                        </p>
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
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(EditStudents);
