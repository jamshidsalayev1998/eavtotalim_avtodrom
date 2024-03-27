import { InfoCircleOutlined, FilePdfOutlined } from "@ant-design/icons";
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
  Divider,
} from "antd";
import { useState } from "react";
import InputMask from "react-input-mask";
import moment from "moment";
import apply from "../../../assets/icons/online-application/apply-docs_black.png";
import right from "../../../assets/icons/online-application/right.png";
import down from "../../../assets/icons/online-application/down.png";
import userInfo from "../../../assets/icons/online-application/applicant-infos.png";
import attachment from "../../../assets/icons/online-application/attachment.png";
import dateIcon from "../../../assets/icons/online-application/date.png";
import pdf from "../../../assets/icons/online-application/file-pdf.png";
import closeIcon from "../../../assets/icons/online-application/close.png";
import { storeOnlineApplicationNew } from "../../../services/api_services/online_applications/online_application_api";

const ApplyModal = ({
  open,
  onClose,
  visitorTypes,
  testCenters,
  organizations,
  reload,
  setReload,
}) => {
  // states
  const [loading, setLoading] = useState(false);
  const [selectedVisitorTypeId, setSelectedVisitorTypeId] = useState(null);
  const [eduTypeDescription, setEduTypeDescription] = useState(null);
  const [filetypes, setFiletypes] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [schoolLicenseList, setSchoolLicenseList] = useState([]);
  const [licenseList, setLicenseList] = useState([]);
  const [schoolDiplomaList, setSchoolDiplomaList] = useState([]);
  const [roadSafetyFileLetterList, setRoadSafetyFileLetterList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedEduTypeId, setSelectedEduTypeId] = useState(null);
  const [age, setAge] = useState(null);

  // console.log("testCenters", testCenters);
  // console.log("organizations", organizations);

  const dateFormat = "DD-MM-YYYY";
  //   form
  const [studentStoreForm] = Form.useForm();

  //   age and type validation function
  const handleSelectionVisitorType = value => {
    setSelectedVisitorTypeId(value);
  };

  // handle edu type id
  const handleSelectChange = value => {
    setSelectedOption(value);
    setSelectedEduTypeId(value);
    if (value !== null) {
      studentStoreForm.setFieldsValue({
        student_passport: "",
      });
    }

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

  const onPassportHandle = e => {
    studentStoreForm.setFieldsValue({
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
    alwaysShowMask: true,
    formatChars: {
      9: "[0-9]",
      a: "[A-Za-z]",
    },

    permanents: [2, 5],
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onChangeMedFile = ({ fileList: newFileList }) => {
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

  const saveStudent = () => {
    studentStoreForm.submit();
  };

  const onFinish = async values => {
    setLoading(true);
    try {
      const formData = new FormData();

      const fileKeys = [
        "med_file",
        "school_diploma",
        "school_license",
        "license",
        "road_safety_letter",
      ];

      for (const key of fileKeys) {
        if (fileKeys.includes(key)) {
          formData.append(key, values[key]?.file?.originFileObj || "");
        }
      }

      const otherKeys = [
        "student_passport",
        "edu_type_id",
        "visitor_type_id",
        "group",
        "organization_id",
        "examination_area_id",
        "student_phone",
        "med_file_number",
        "school_license_number",
        "school_diploma_number",
      ];

      for (const key of otherKeys) {
        formData.append(key, values[key]);
      }

      formData.append(
        "birthday",
        moment(values["birthday"], "YYYY-MM-DD").format("YYYY-MM-DD")
      );
      formData.append(
        "student_fio",
        values["last_name"] + " " + values["first_name"]
      );
      formData.append(
        "med_file_date",
        moment(values["med_file_date"], "YYYY-MM-DD").format("YYYY-MM-DD")
      );
      formData.append(
        "school_license_date",
        moment(values["school_license_date"], "YYYY-MM-DD").format("YYYY-MM-DD")
      );
      formData.append(
        "school_diploma_date",
        moment(values["school_diploma_date"], "YYYY-MM-DD").format("YYYY-MM-DD")
      );

      const res = await storeOnlineApplicationNew(formData, {});
      message.success(res?.message);
      onClose();
      setReload(!reload);

      if (res?.message === "Success") {
        // setReload(prevReload => !prevReload);

        if (values?.typeSave === "simple") {
          // cancelAddModal();
        }
      } else if (parseInt(res?.data?.status) === 2) {
        const { validator_errors, data_has } = res?.data;

        for (const field in validator_errors) {
          const errorMessages = validator_errors[field];
          errorMessages.forEach(errorMsg => {
            message.error(errorMsg);
          });
        }
      }
      formData.resetFields();
    } catch (error) {
      message.error("Ma'lumotlar to'g'ri kiritilmadi");
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-modal-student">
      <Modal
        wrapClassName="online-student-modal"
        title={
          <div className="modal-breadcrumb">
            <img src={apply} alt="Icon" />
            <span className="ml-3 mr-3">Ariza topshirish</span>
            <img src={right} alt="Icon" />
            <span style={{ color: "#A7A9B7", marginLeft: "12px" }}>
              Yangi o'quvchi qo'shish oynasi
            </span>
          </div>
        }
        centered
        open={open}
        onOk={false}
        onCancel={onClose}
        zIndex={1005}
        width={1328}
        footer={
          <div className="d-flex justify-content-between align-items-center">
            <button
              style={{ width: "100px", height: "40px" }}
              className="btn text-dark bg-white border font-weight-bold"
            >
              Bekor qilish
            </button>
            <button
              onClick={saveStudent}
              style={{
                width: "100px",
                backgroundColor: "#2C60F4",
                height: "40px",
              }}
              className="btn btn-info border"
            >
              Saqlash
            </button>
          </div>
        }
        closeIcon={<img src={closeIcon} />}
      >
        <Spin spinning={loading} tip="Tekshirilmoqda...">
          <Form
            form={studentStoreForm}
            name={"studentadd"}
            autoComplete={false}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 23,
            }}
            onFinish={onFinish}
          >
            <Row className="filled-data">
              <Row className="mb-4">
                <Col span={24} className="user-infos">
                  <img src={userInfo} alt="" />
                  Topshiruvchi ma'lumotlari
                </Col>

                {/* visitor type */}
                <Col xl={12}>
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
                      placeholder="Turini tanlang"
                      onChange={handleSelectionVisitorType}
                      suffixIcon={<img src={down} />}
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
                <Col xl={6}>
                  <Form.Item
                    label={
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Ta`lim turi</span>
                        <InfoCircleOutlined
                          onClick={info}
                          style={
                            eduTypeDescription === null
                              ? { display: "none" }
                              : { color: "gold", marginLeft: "218px" }
                          }
                        />
                      </div>
                    }
                    name="edu_type_id"
                    rules={[
                      {
                        required: true,
                        message: "Ta`lim turini tanlang!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Toifani tanlang"
                      disabled={selectedVisitorTypeId === null}
                      value={null}
                      onChange={handleSelectChange}
                      suffixIcon={<img src={down} />}
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
                      disabled={selectedVisitorTypeId === null}
                      placeholder="AA1234567"
                    />
                  </Form.Item>
                </Col>

                {/* birth date */}
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
                  >
                    <DatePicker
                      format={dateFormat}
                      placeholder="Tug'ilgan sanani tanlang"
                      disabledDate={current =>
                        current &&
                        current.year() > new Date().getFullYear() - age
                      }
                      className={"w-100"}
                      // defaultPickerValue={moment(
                      //   new Date().getTime() - 86400 * 1000 * 365 * age
                      // )}
                      style={{
                        width: "100%",
                      }}
                      suffixIcon={
                        <img
                          style={{ width: "20px", height: "20px" }}
                          src={dateIcon}
                        />
                      }
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
                        required: true,
                        message: "O`quvchi familiyasini kiriting!",
                      },
                    ]}
                  >
                    <Input allowClear={true} placeholder="Familiya" />
                  </Form.Item>
                </Col>

                {/* ismi */}
                <Col xl={6}>
                  <Form.Item
                    label="Ism"
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "O`quvchi ismini kiriting!",
                      },
                    ]}
                  >
                    <Input allowClear={true} placeholder="Ism" />
                  </Form.Item>
                </Col>

                {/* otasining ismi */}
                <Col xl={6}>
                  <Form.Item
                    label="Otasining ismi"
                    name="middle_name"
                    rules={[
                      {
                        required: true,
                        message: "Otasining ismini kiriting!",
                      },
                    ]}
                  >
                    <Input allowClear={true} placeholder="Otasining ismi" />
                  </Form.Item>
                </Col>

                {/* telefon */}
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

                {/* imtihon topshirish holati */}
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
                      suffixIcon={<img src={down} />}
                      placeholder="Topshirish holati"
                    >
                      <Option value={"first"}>Birinchi marta</Option>
                      <Option value={"resubmit"}>Qayta topshirish</Option>
                    </Select>
                  </Form.Item>
                </Col>

                {/* talim tashkiloti */}
                <Col xl={6}>
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
                      suffixIcon={<img src={down} />}
                    >
                      {organizations?.map((element, index) => {
                        return (
                          <Option value={element?.id}>{element?.name}</Option>
                        );
                      })}
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
                        required: true,
                        message: "Guruhni kiriting!",
                      },
                    ]}
                  >
                    <Input placeholder="Guruhni kiriting" allowClear={true} />
                  </Form.Item>
                </Col>

                {/* test markazi */}
                <Col xl={6}>
                  <Form.Item
                    label="Imtihon olish markazi"
                    name="examination_area_id"
                    rules={[
                      {
                        required: true,
                        message: "Imtihon olish markazini tanlang!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Imtihon olish markazini tanlang"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option?.children
                          ?.toLowerCase()
                          ?.includes(input?.toLowerCase())
                      }
                      suffixIcon={<img src={down} />}
                    >
                      {testCenters?.map((element, index) => {
                        return (
                          <Option value={element?.id}>{element?.name}</Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                {filetypes?.includes("med_file") && (
                  <Col span={24} className="user-infos">
                    <img src={attachment} alt="" />
                    Talab etiladigan hujjatlar to'plami
                  </Col>
                )}

                {/* Tibbiy ma`lumotnoma nusxasi va tibbiy ma'lumotnoma raqami */}
                {filetypes?.includes("med_file") && (
                  <>
                    {/* number */}
                    <Col xl={6}>
                      <Form.Item
                        label="Tibbiy ma`lumotnoma raqami"
                        name="med_file_number"
                        className={"w-100"}
                      >
                        <Input
                          placeholder="Tibbiy ma`lumotnoma raqamini kiriting"
                          allowClear={true}
                        />
                      </Form.Item>
                    </Col>

                    {/* date */}
                    <Col xl={6}>
                      <Form.Item
                        label="Tibbiy ma'lumotnoma sanasi"
                        name="med_file_date"
                      >
                        <DatePicker
                          format={dateFormat}
                          placeholder="Sanani tanlang"
                          style={{
                            width: "100%",
                          }}
                          suffixIcon={
                            <img
                              style={{ width: "20px", height: "20px" }}
                              src={dateIcon}
                            />
                          }
                        />
                      </Form.Item>
                    </Col>

                    {/* file */}
                    <Col xl={12}>
                      <Form.Item
                        label="Tibbiy ma`lumotnoma nusxasi"
                        name="med_file"
                      >
                        <Upload
                          name="med_file"
                          customRequest={dummyRequest}
                          multiple={false}
                          maxCount={1}
                          fileList={fileList}
                          onChange={onChangeMedFile}
                          locale={true}
                          accept=".pdf"
                          listType="pdf"
                        >
                          <Button
                            icon={
                              <img
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "5px",
                                }}
                                src={pdf}
                              />
                            }
                          >
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
                        className={"w-100"}
                      >
                        <Input
                          placeholder="Avtomaktab tomonidan berilgan guvohnoma raqamini kiriting"
                          allowClear={true}
                        />
                      </Form.Item>
                    </Col>

                    {/* date */}
                    <Col xl={6}>
                      <Form.Item
                        label="Avtomaktab tomonidan berilgan guvohnoma sanasi"
                        name="school_license_date"
                      >
                        <DatePicker
                          format={dateFormat}
                          placeholder="Sanani tanlang"
                          style={{
                            width: "100%",
                          }}
                          suffixIcon={
                            <img
                              style={{ width: "20px", height: "20px" }}
                              src={dateIcon}
                            />
                          }
                        />
                      </Form.Item>
                    </Col>

                    {/* file */}
                    <Col xl={12}>
                      <Form.Item
                        label="Avtomaktab tomonidan berilgan guvohnoma"
                        name="school_license"
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
                          <Button
                            icon={
                              <img
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "5px",
                                }}
                                src={pdf}
                              />
                            }
                          >
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
                        className={"w-100"}
                      >
                        <Input
                          placeholder="Mavjud guvohnoma raqamini kiriting"
                          allowClear={true}
                        />
                      </Form.Item>
                    </Col>
                    {/* date */}
                    <Col xl={6}>
                      <Form.Item
                        label="Mavjud guvohnoma sanasi"
                        name="license_date"
                      >
                        <DatePicker
                          format={dateFormat}
                          placeholder="Sanani tanlang"
                          style={{
                            width: "100%",
                          }}
                          suffixIcon={
                            <img
                              style={{ width: "20px", height: "20px" }}
                              src={dateIcon}
                            />
                          }
                        />
                      </Form.Item>
                    </Col>
                    {/* file */}
                    <Col xl={12}>
                      <Form.Item
                        label="Mavjud guvohnoma nusxasi"
                        name="license"
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
                          <Button
                            icon={
                              <img
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "5px",
                                }}
                                src={pdf}
                              />
                            }
                          >
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
                        className={"w-100"}
                      >
                        <Input
                          placeholder="Muassasa tomonidan berilgan diplom raqamini kiriting"
                          allowClear={true}
                        />
                      </Form.Item>
                    </Col>

                    {/* date */}
                    <Col xl={6}>
                      <Form.Item
                        label="Muassasa tomonidan berilgan diplom sanasi"
                        name="school_diploma_date"
                      >
                        <DatePicker
                          format={dateFormat}
                          placeholder="Sanani tanlang"
                          style={{
                            width: "100%",
                          }}
                          suffixIcon={
                            <img
                              style={{ width: "20px", height: "20px" }}
                              src={dateIcon}
                            />
                          }
                        />
                      </Form.Item>
                    </Col>

                    {/* file */}
                    <Col xl={12}>
                      <Form.Item
                        label="Muassasa tomonidan berilgan diplom"
                        name="school_diploma"
                      >
                        <Upload
                          name="school_diploma"
                          customRequest={dummyRequest}
                          multiple={false}
                          maxCount={1}
                          schoolDiplomaList={schoolDiplomaList}
                          onChange={onChangeSchoolDiplomaFile}
                          locale={true}
                          accept=".pdf"
                          listType="pdf"
                        >
                          <Button
                            icon={
                              <img
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "5px",
                                }}
                                src={pdf}
                              />
                            }
                          >
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
                        className={"w-100"}
                      >
                        <Input
                          placeholder="DYHXX tomonidan berilgan xat raqamini kiriting"
                          allowClear={true}
                        />
                      </Form.Item>
                    </Col>
                    {/* date */}
                    <Col xl={6}>
                      <Form.Item
                        label="DYHXX tomonidan berilgan xat sanasi"
                        name="road_safety_letter_date"
                      >
                        <DatePicker
                          format={dateFormat}
                          placeholder="Sanani tanlang"
                          style={{
                            width: "100%",
                          }}
                          suffixIcon={
                            <img
                              style={{ width: "20px", height: "20px" }}
                              src={dateIcon}
                            />
                          }
                        />
                      </Form.Item>
                    </Col>
                    {/* file */}
                    <Col xl={12}>
                      <Form.Item
                        label="DYHXX tomonidan berilgan xat"
                        name="road_safety_letter"
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
                          <Button
                            icon={
                              <img
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "5px",
                                }}
                                src={pdf}
                              />
                            }
                          >
                            {" "}
                            PDF fayl tanlang
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};
export default ApplyModal;
