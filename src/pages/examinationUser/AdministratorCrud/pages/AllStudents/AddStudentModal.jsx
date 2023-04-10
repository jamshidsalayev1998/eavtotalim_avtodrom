import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Button,
  Select,
  Modal,
  Input,
  Row,
  Col,
  DatePicker,
  Popconfirm,
  message,
  Alert,
  Upload,
  Spin,
} from "antd";
import InputMask from "react-input-mask";
import moment from "moment";
import { sendStudentToResubmitAllResponse } from "../../../../../services/api_services/send_student_to_resubmit";
import {
  addStudentToComes,
  checkVisitorData,
} from "../../../../../services/api_services/administrator_students_api";
import { FilePdfOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Option } = Select;

const AddStudentModal = props => {
  useEffect(() => {
    window.addEventListener("keyup", event => {
      if (event?.code === "F7") {
        clearForm();
      }
      if (event?.code === "F8") {
        saveStudent();
      }
      if (event?.code === "F9") {
        saveStudentAndClear();
      }
    });
  }, []);
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

  const [studentStoreForm] = Form.useForm();
  const [checkStudentForm] = Form.useForm();
  const {
    addModalVisible,
    setAddModalVisible,
    visitorTypes,
    organizations,
    reload,
    setReload,
    inputTagRef,
    focusRefElement,
  } = props;
  const [dataHas, setDataHas] = useState(null);
  const [validatorErrors, setValidatorErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [schoolLicenseList, setSchoolLicenseList] = useState([]);
  const [licenseList, setLicenseList] = useState([]);
  const [schoolDiplomaList, setSchoolDiplomaList] = useState([]);
  const [roadSafetyFileLetterList, setRoadSafetyFileLetterList] = useState([]);
  const [selectedVisitorTypeId, setSelectedVisitorTypeId] = useState(null);
  const [selectedEduTypeId, setSelectedEduTypeId] = useState(null);
  const [filetypes, setFiletypes] = useState([]);
  const [eduTypeDescription, setEduTypeDescription] = useState(null);
  const [fileMonthLimit, setFileMonthLimit] = useState(null);
  const [age, setAge] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [resultStatus, setResultStatus] = useState(null);

  const dateFormat = "DD-MM-YYYY";

  //   age and type validation function
  const handleSelectChange = value => {
    setSelectedOption(value);
    setSelectedEduTypeId(value);

    // filter file types
    let visitorType = visitorTypes
      ?.find(v => v?.id === selectedVisitorTypeId)
      ?.edu_type_visitor_types?.find(v => v?.edu_type_id === value)
      ?.file_types?.map(f => f?.file_key);
    setFiletypes(visitorType);

    // filter edu type description
    let visitorEduType = visitorTypes
      ?.find(v => v?.id === selectedVisitorTypeId)
      ?.edu_type_visitor_types?.find(
        v => v?.edu_type_id === value
      )?.description;
    setEduTypeDescription(visitorEduType);

    // reset form
    studentStoreForm.setFieldsValue({
      birthday: null,
    });

    // set age
    switch (value) {
      case 1:
        setAge(18);
        break;
      case 2:
        setAge(16);
        break;
      case 3:
        setAge(18);
        break;
      case 4:
        setAge(18);
        break;
      case 5:
        setAge(18);
        break;
      case 6:
        setAge(18);
        break;
      case 7:
        setAge(28);
        break;
      case 8:
        setAge(18);
        break;
      default:
        setAge(null);
    }
  };

  console.log("visitor type id", selectedVisitorTypeId);
  console.log("edu type id", selectedEduTypeId);
  console.log("descriptionnn", eduTypeDescription);
  console.log("filetypesssssssssssssssss", filetypes);
  console.log("file month limitytttttttttttttttttt", fileMonthLimit);

  //   edu type description modal
  const info = () => {
    Modal.info({
      title: "Ta'lim turi haqida ma'lumot",
      content: (
        <div>
          <p>{eduTypeDescription}</p>
        </div>
      ),
      zIndex: 1006,
      width: 800,
      onOk() {},
    });
  };

  const checkStudentClick = async () => {
    try {
      setLoading(true);
      const values = await studentStoreForm.validateFields([
        "edu_type_id",
        "student_passport",
      ]);
      const formData = new FormData();
      formData.append("edu_type_id", values?.edu_type_id);
      formData.append("student_passport", values?.student_passport);
      let params = {};
      const res = await checkVisitorData(params, formData);
      if (res?.data?.message === "Success") {
        message.success("Tekshirildi");
        setResultStatus(res?.data?.data?.status);
        setLoading(false);
      }
      if (res?.data?.data?.status === 0) {
        Swal.fire({
          title: res?.data?.data?.message,
          icon: "error",
        });
      } else if (res?.data?.data?.status === 1) {
        Swal.fire({
          title: res?.data?.data?.message,
          icon: "success",
        });
      } else if (res?.data?.data?.status === 2) {
        Swal.fire({
          title: res?.data?.data?.message,
          icon: "warning",
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      message.error("Ma'lumotlarni yuborishda xatolik!");
    }
  };

  console.log("check status", resultStatus);

  const onPassportHandle = e => {
    studentStoreForm.setFieldsValue({
      student_passport: e?.target?.value?.toUpperCase(),
    });
  };

  const simpleSaveStudent = async values => {
    const formData = new FormData();
    for (let key in values) {
      if (
        key === "med_file" ||
        key === "school_license" ||
        key === "license" ||
        key === "school_diploma" ||
        key === "road_safety_file_letter"
      ) {
        formData.append(
          key,
          values[key] ? values[key].file?.originFileObj : ""
        );
      } else {
        formData.append(key, values[key] ? values[key] : "");
      }
    }
    let params = {};
    setLoading(true);
    try {
      const res = await addStudentToComes(params, formData);
      if (res?.data?.message === "Success") {
        message.success(res?.data?.message);
        setReload(!reload);
        clearForm();
        if (values?.typeSave === "simple") {
          cancelAddModal();
        }
        setLoading(false);
        window.location.reload(); // reload the page after success message is displayed
      } else if (parseInt(res?.data?.status) === 2) {
        message.error("Ma'lumotlarni yuborishda xatolik!");
        setValidatorErrors(res?.data?.validator_errors);
        if (res?.data?.data_has) {
          setDataHas(res?.data?.data_has);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      message.error("Ma'lumotlar to'g'ri kiritilmadi");
      setLoading(false);
    }
  };

  const saveStudent = () => {
    mergeFio();
    studentStoreForm.setFieldValue("typeSave", "simple");
    studentStoreForm.submit();
  };
  const saveStudentAndClear = () => {
    mergeFio();
    studentStoreForm.setFieldValue("typeSave", "clear");
    studentStoreForm.submit();
    focusRefElement();
  };
  const cancelAddModal = () => {
    setValidatorErrors(null);
    setDataHas(null);
    setAddModalVisible(false);
  };
  const mergeFio = () => {
    let fio =
      studentStoreForm.getFieldValue("last_name") +
      " " +
      studentStoreForm.getFieldValue("first_name") +
      " " +
      studentStoreForm.getFieldValue("middle_name");
    studentStoreForm.setFieldValue("student_fio", fio);
  };
  const clearForm = () => {
    studentStoreForm.resetFields();
    setValidatorErrors(null);
    setDataHas(null);
    setFileList([]);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const onChangeMedFile = ({ fileList: newFileList }) => {
    setFileList([]);
    setFileList(newFileList);
  };
  const onChangeSchoolLicenseFile = ({
    schoolLicenseList: newSchoolLicenseList,
  }) => {
    setSchoolLicenseList([]);
    setSchoolLicenseList(newSchoolLicenseList);
  };
  const onChangeLicenseFile = ({ licenseList: newLicenseList }) => {
    setLicenseList([]);
    setLicenseList(newLicenseList);
  };
  const onChangeSchoolDiplomaFile = ({
    schoolDiplomaList: newSchoolDiplomaList,
  }) => {
    setSchoolDiplomaList([]);
    setSchoolDiplomaList(newSchoolDiplomaList);
  };
  const onChangeRoadSafetyLetterFile = ({
    roadSafetyFileLetterList: newRoadSafetyFileLetterList,
  }) => {
    setRoadSafetyFileLetterList([]);
    setRoadSafetyFileLetterList(newRoadSafetyFileLetterList);
  };

  return (
    <Modal
      zIndex={1005}
      width={1600}
      centered
      open={addModalVisible}
      onCancel={cancelAddModal}
      title={
        <div className="text-dark font-size-18 text-bold">
          Yangi o'quvchi qo'shish
        </div>
      }
      footer={[
        <Button
          onClick={info}
          style={
            eduTypeDescription === null
              ? { color: "#1890FF", display: "none" }
              : { color: "#1890FF" }
          }
        >
          <i class="bx bx-error bx-flashing text-warning font-size-18"></i>
        </Button>,
        <Button type="dashed" key="back">
          Bekor qilish <span className={"small-keyboard-style"}>ESC</span>
        </Button>,
        <Button type="dashed" onClick={clearForm} loading={loading}>
          Tozalash
          <span className={"small-keyboard-style"}>F7</span>
        </Button>,
        <Button
          type="primary"
          disabled={
            resultStatus === 1 ? true : resultStatus === 2 ? true : false
          }
          onClick={checkStudentClick}
          loading={loading}
        >
          Tekshirish
        </Button>,
        <Button
          disabled={
            resultStatus === 1 ? false : resultStatus === 2 ? false : true
          }
          type="primary"
          onClick={saveStudent}
          loading={loading}
        >
          Saqlash
          <span className={"small-keyboard-style"}>F8</span>
        </Button>,
        <Button
          disabled={
            resultStatus === 1 ? false : resultStatus === 2 ? false : true
          }
          onClick={saveStudentAndClear}
          loading={loading}
          type="primary"
        >
          Saqlash va tozalash <span className={"small-keyboard-style"}>F9</span>
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Form
          form={studentStoreForm}
          name={"studentadd"}
          onFinish={simpleSaveStudent}
          autoComplete={false}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 23,
          }}
        >
          <Row>
            {/* visitor type */}
            <Col xl={8}>
              <Form.Item
                label="Topshiruvchi turi"
                name="visitor_type_id"
                rules={[
                  {
                    required: true,
                    message: "Topshiruvchi turini tanlang!",
                  },
                ]}
              >
                <Select
                  className={"w-100"}
                  placeholder="Turini tanlang"
                  onChange={value => setSelectedVisitorTypeId(value)}
                >
                  {visitorTypes.map((element, i) => {
                    return (
                      <Option key={i} value={element?.id}>
                        {element?.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            {/* talim turi */}
            <Col xl={8}>
              <Form.Item
                label="Ta`lim turi"
                tooltip={{
                  title: "Ta'lim turi tasnifi",
                  icon: (
                    <InfoCircleOutlined
                      onClick={info}
                      style={
                        eduTypeDescription === null
                          ? { color: "gold", display: "none" }
                          : { color: "gold" }
                      }
                    />
                  ),
                }}
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
                  disabled={selectedVisitorTypeId === null}
                  value={null}
                  onChange={handleSelectChange}
                >
                  {visitorTypes
                    ?.find(value => value.id === selectedVisitorTypeId)
                    ?.edu_type_visitor_types?.map((value, i) => {
                      return (
                        <Option key={i} value={value?.edu_type?.id}>
                          {value?.edu_type?.short_name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>

            {/* passport */}
            <Col xl={4}>
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
                  disabled={selectedVisitorTypeId === null}
                  placeholder="AA1234567"
                />
              </Form.Item>
            </Col>

            {/* birth date */}
            <Col xl={4}>
              <Form.Item
                label="Tug'ilgan sanasi"
                name="birthday"
                rules={[
                  {
                    required:
                      resultStatus === 1
                        ? true
                        : resultStatus === 2
                        ? false
                        : false,
                    message: "Tug'ilgan sanasini kiriting!",
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  placeholder="Tug'ilgan sanani tanlang"
                  disabled={
                    resultStatus === 1
                      ? false
                      : resultStatus === 2
                      ? false
                      : true
                  }
                  disabledDate={current =>
                    current && current.year() > new Date().getFullYear() - age
                  }
                  className={"w-100"}
                  defaultPickerValue={moment(
                    new Date().getTime() - 86400 * 1000 * 365 * age
                  )}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>

            {/* familyasi */}
            <Col xl={6}>
              <Form.Item
                label="Familiya"
                name="last_name"
                rules={[
                  {
                    required:
                      resultStatus === 1
                        ? true
                        : resultStatus === 2
                        ? false
                        : false,
                    message: "O`quvchi familiyasini kiriting!",
                  },
                ]}
              >
                <Input
                  ref={inputTagRef}
                  allowClear={true}
                  style={{ width: "100%" }}
                  placeholder="Familiya"
                  disabled={
                    resultStatus === 1
                      ? false
                      : resultStatus === 2
                      ? false
                      : true
                  }
                />
              </Form.Item>
            </Col>

            {/* ismi */}
            <Col xl={6}>
              <Form.Item
                label="Ism"
                name="first_name"
                rules={[
                  {
                    required:
                      resultStatus === 1
                        ? true
                        : resultStatus === 2
                        ? false
                        : false,
                    message: "O`quvchi ismini kiriting!",
                  },
                ]}
              >
                <Input
                  allowClear={true}
                  style={{ width: "100%" }}
                  disabled={
                    resultStatus === 1
                      ? false
                      : resultStatus === 2
                      ? false
                      : true
                  }
                  placeholder="Ism"
                />
              </Form.Item>
            </Col>

            {/* otasining ismi */}
            <Col xl={6}>
              <Form.Item
                label="Otasining ismi"
                name="middle_name"
                rules={[
                  {
                    required:
                      resultStatus === 1
                        ? true
                        : resultStatus === 2
                        ? false
                        : false,
                    message: "Otasining ismini kiriting!",
                  },
                ]}
              >
                <Input
                  allowClear={true}
                  style={{ width: "100%" }}
                  placeholder="Otasining ismi"
                  disabled={
                    resultStatus === 1
                      ? false
                      : resultStatus === 2
                      ? false
                      : true
                  }
                />
              </Form.Item>
            </Col>

            {/* telefon */}
            <Col xl={6}>
              <Form.Item
                label="Telefon"
                name="student_phone"
                rules={[
                  {
                    required:
                      resultStatus === 1
                        ? true
                        : resultStatus === 2
                        ? false
                        : false,
                    message: "O`quvchi telefon raqamini kiriting!",
                  },
                ]}
              >
                <InputMask
                  {...maskInputNumber}
                  className={"ant-input"}
                  placeholder="(99) 1234567"
                  disabled={
                    resultStatus === 1
                      ? false
                      : resultStatus === 2
                      ? false
                      : true
                  }
                />
              </Form.Item>
            </Col>

            {/* imtihon topshirish holati */}
            <Col xl={6}>
              <Form.Item
                label="Imtihon topshirish holati"
                name="type"
                rules={[
                  {
                    required:
                      resultStatus === 1
                        ? true
                        : resultStatus === 2
                        ? false
                        : false,
                    message: "Holatini tanlang!",
                  },
                ]}
              >
                <Select
                  className={"w-100"}
                  placeholder="Topshirish holati"
                  disabled={
                    resultStatus === 1
                      ? false
                      : resultStatus === 2
                      ? false
                      : true
                  }
                >
                  <Option value={"first"}>Birinchi marta</Option>
                  <Option value={"resubmit"}>Qayta topshirish</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Guruh */}
            <Col xl={6}>
              <Form.Item
                label="Guruh"
                name="group"
                rules={[
                  {
                    required:
                      resultStatus === 1
                        ? true
                        : resultStatus === 2
                        ? false
                        : false,
                    message: "Guruhni kiriting!",
                  },
                ]}
              >
                <Input
                  placeholder="Guruhni kiriting"
                  allowClear={true}
                  style={{ width: "100%" }}
                  disabled={
                    resultStatus === 1
                      ? false
                      : resultStatus === 2
                      ? false
                      : true
                  }
                />
              </Form.Item>
            </Col>

            {/* talim tashkiloti */}
            <Col xl={6}>
              <Form.Item
                label="Ta`lim tashkiloti"
                name="organization_id"
                rules={[
                  {
                    required:
                      resultStatus === 1
                        ? true
                        : resultStatus === 2
                        ? false
                        : false,
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
                  disabled={
                    resultStatus === 1
                      ? false
                      : resultStatus === 2
                      ? false
                      : true
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

            {/* Tibbiy ma`lumotnoma nusxasi va tibbiy ma'lumotnoma raqami */}
            {filetypes?.includes("med_file") && (
              <>
                {/* number */}
                <Col xl={6}>
                  <Form.Item
                    label="Tibbiy ma`lumotnoma raqami"
                    name="med_file_number"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Tibbiy ma`lumotnoma raqamini kiriting!",
                      },
                    ]}
                    className={"w-100"}
                  >
                    <Input
                      placeholder="Tibbiy ma`lumotnoma raqamini kiriting"
                      allowClear={true}
                      style={{ width: "100%" }}
                      disabled={
                        resultStatus === 1
                          ? false
                          : resultStatus === 2
                          ? false
                          : true
                      }
                    />
                  </Form.Item>
                </Col>
                {/* date */}
                <Col xl={6}>
                  <Form.Item
                    label="Tibbiy ma'lumotnoma sanasi"
                    name="med_file_date"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Tibbiy ma'lumotnoma sanasini kiriting!",
                      },
                    ]}
                  >
                    <DatePicker
                      format={dateFormat}
                      placeholder="Sanani tanlang"
                      disabled={
                        resultStatus === 1
                          ? false
                          : resultStatus === 2
                          ? false
                          : true
                      }
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
                {/* file */}
                <Col xl={6}>
                  <Form.Item
                    label="Tibbiy ma`lumotnoma nusxasi"
                    name="med_file"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Tibbiy ma`lumotnoma nusxasini kiriting!",
                      },
                    ]}
                  >
                    <Upload
                      customRequest={dummyRequest}
                      multiple={false}
                      maxCount={1}
                      fileList={fileList}
                      onChange={onChangeMedFile}
                      locale={true}
                      accept=".pdf"
                    >
                      <Button icon={<FilePdfOutlined />}>
                        {" "}
                        PDF fayl tanlang
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </>
            )}

            {/* Avtomaktab tomonidan berilgan guvohnoma */}
            {filetypes?.includes("school_license") && (
              <>
                {/* number */}
                <Col xl={6}>
                  <Form.Item
                    label="Avtomaktab tomonidan berilgan guvohnoma raqami"
                    name="school_license_number"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Guvohnoma raqamini kiriting!",
                      },
                    ]}
                    className={"w-100"}
                  >
                    <Input
                      placeholder="Avtomaktab tomonidan berilgan guvohnoma raqamini kiriting"
                      allowClear={true}
                      style={{ width: "100%" }}
                      disabled={
                        resultStatus === 1
                          ? false
                          : resultStatus === 2
                          ? false
                          : true
                      }
                    />
                  </Form.Item>
                </Col>
                {/* date */}
                <Col xl={6}>
                  <Form.Item
                    label="Avtomaktab tomonidan berilgan guvohnoma sanasi"
                    name="school_license_date"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Guvohnoma sanasini kiriting!",
                      },
                    ]}
                  >
                    <DatePicker
                      format={dateFormat}
                      placeholder="Sanani tanlang"
                      disabled={
                        resultStatus === 1
                          ? false
                          : resultStatus === 2
                          ? false
                          : true
                      }
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
                {/* file */}
                <Col xl={6}>
                  <Form.Item
                    label="Avtomaktab tomonidan berilgan guvohnoma"
                    name="school_license"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Avtomaktab tomonidan berilgan guvohnoma!",
                      },
                    ]}
                  >
                    <Upload
                      customRequest={dummyRequest}
                      multiple={false}
                      maxCount={1}
                      schoolLicenseList={schoolLicenseList}
                      onChange={onChangeSchoolLicenseFile}
                      locale={true}
                      accept=".pdf"
                    >
                      <Button icon={<FilePdfOutlined />}>
                        {" "}
                        PDF fayl tanlang
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </>
            )}

            {/* Mavjud guvohnoma nusxasi */}
            {filetypes?.includes("license") && (
              <>
                {/* number */}
                <Col xl={6}>
                  <Form.Item
                    label="Mavjud guvohnoma raqami"
                    name="license_number"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Mavjud guvohnoma raqamini kiriting!",
                      },
                    ]}
                    className={"w-100"}
                  >
                    <Input
                      placeholder="Mavjud guvohnoma raqamini kiriting"
                      allowClear={true}
                      style={{ width: "100%" }}
                      disabled={
                        resultStatus === 1
                          ? false
                          : resultStatus === 2
                          ? false
                          : true
                      }
                    />
                  </Form.Item>
                </Col>
                {/* date */}
                <Col xl={6}>
                  <Form.Item
                    label="Mavjud guvohnoma sanasi"
                    name="license_date"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Mavjud guvohnoma sanasini kiriting!",
                      },
                    ]}
                  >
                    <DatePicker
                      format={dateFormat}
                      placeholder="Sanani tanlang"
                      disabled={
                        resultStatus === 1
                          ? false
                          : resultStatus === 2
                          ? false
                          : true
                      }
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
                {/* file */}
                <Col xl={6}>
                  <Form.Item
                    label="Mavjud guvohnoma nusxasi"
                    name="license"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Mavjud guvohnoma nusxasi!",
                      },
                    ]}
                  >
                    <Upload
                      customRequest={dummyRequest}
                      // listType="picture-card"
                      multiple={false}
                      maxCount={1}
                      licenseList={licenseList}
                      onChange={onChangeLicenseFile}
                      locale={true}
                      accept=".pdf"
                    >
                      <Button icon={<FilePdfOutlined />}>
                        {" "}
                        PDF fayl tanlang
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </>
            )}

            {/* Muassasa tomonidan berilgan diplom */}
            {filetypes?.includes("school_diploma") && (
              <>
                {/* number */}
                <Col xl={6}>
                  <Form.Item
                    label="Muassasa tomonidan berilgan diplom raqami"
                    name="school_diploma_number"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Diplom raqamini kiriting!",
                      },
                    ]}
                    className={"w-100"}
                  >
                    <Input
                      placeholder="Muassasa tomonidan berilgan diplom raqamini kiriting"
                      allowClear={true}
                      style={{ width: "100%" }}
                      disabled={
                        resultStatus === 1
                          ? false
                          : resultStatus === 2
                          ? false
                          : true
                      }
                    />
                  </Form.Item>
                </Col>
                {/* date */}
                <Col xl={6}>
                  <Form.Item
                    label="Muassasa tomonidan berilgan diplom sanasi"
                    name="school_diploma_date"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Diplom sanasini kiriting!",
                      },
                    ]}
                  >
                    <DatePicker
                      format={dateFormat}
                      placeholder="Sanani tanlang"
                      disabled={
                        resultStatus === 1
                          ? false
                          : resultStatus === 2
                          ? false
                          : true
                      }
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
                {/* file */}
                <Col xl={6}>
                  <Form.Item
                    label="Muassasa tomonidan berilgan diplom"
                    name="school_diploma"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Muassasa tomonidan berilgan diplom!",
                      },
                    ]}
                  >
                    <Upload
                      customRequest={dummyRequest}
                      multiple={false}
                      maxCount={1}
                      schoolDiplomaList={schoolDiplomaList}
                      onChange={onChangeSchoolDiplomaFile}
                      disabled={
                        resultStatus === 1
                          ? false
                          : resultStatus === 2
                          ? false
                          : true
                      }
                      locale={true}
                      accept=".pdf"
                    >
                      <Button icon={<FilePdfOutlined />}>
                        {" "}
                        PDF fayl tanlang
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </>
            )}

            {/* DYHXX tomonidan berilgan xat */}
            {filetypes?.includes("road_safety_letter") && (
              <>
                {/* number */}
                <Col xl={6}>
                  <Form.Item
                    label="DYHXX tomonidan berilgan xat raqami"
                    name="road_safety_letter_number"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Diplom raqamini kiriting!",
                      },
                    ]}
                    className={"w-100"}
                  >
                    <Input
                      placeholder="DYHXX tomonidan berilgan xat raqamini kiriting"
                      allowClear={true}
                      style={{ width: "100%" }}
                      disabled={
                        resultStatus === 1
                          ? false
                          : resultStatus === 2
                          ? false
                          : true
                      }
                    />
                  </Form.Item>
                </Col>
                {/* date */}
                <Col xl={6}>
                  <Form.Item
                    label="Muassasa tomonidan berilgan diplom sanasi"
                    name="road_safety_letter_date"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "Diplom sanasini kiriting!",
                      },
                    ]}
                  >
                    <DatePicker
                      format={dateFormat}
                      placeholder="Sanani tanlang"
                      disabled={
                        resultStatus === 1
                          ? false
                          : resultStatus === 2
                          ? false
                          : true
                      }
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
                {/* file */}
                <Col xl={6}>
                  <Form.Item
                    label="DYHXX tomonidan berilgan xat"
                    name="road_safety_letter"
                    rules={[
                      {
                        required:
                          resultStatus === 1
                            ? true
                            : resultStatus === 2
                            ? false
                            : false,
                        message: "DYHXX tomonidan berilgan xat!",
                      },
                    ]}
                  >
                    <Upload
                      customRequest={dummyRequest}
                      multiple={false}
                      maxCount={1}
                      roadSafetyFileLetterList={roadSafetyFileLetterList}
                      onChange={onChangeRoadSafetyLetterFile}
                      locale={true}
                      accept=".pdf"
                    >
                      <Button icon={<FilePdfOutlined />}>
                        {" "}
                        PDF fayl tanlang
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </>
            )}

            {/* other condition */}
            <Form.Item
              name="typeSave"
              hidden={true}
              initialValue={"simple"}
            ></Form.Item>
            <Form.Item
              label="F.I.O"
              name="student_fio"
              hidden={true}
              rules={[
                {
                  required: true,
                  message: "O`quvchi ism familiya otasining ismini kiriting!",
                },
              ]}
            >
              <Input
                allowClear={true}
                style={{ width: "100%" }}
                placeholder="F.I.O"
              />
            </Form.Item>
          </Row>
          <Row>
            {validatorErrors
              ? Object.entries(validatorErrors).map(([key, subject], i) => (
                  <Alert className={"w-100"} message={subject} type={"error"} />
                ))
              : ""}
          </Row>
          {dataHas ? (
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
          ) : (
            ""
          )}
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddStudentModal;
