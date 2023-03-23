import React, {useState, useEffect, useRef} from "react";
import {Form, Button, Select, Modal, Input, Row, Col, DatePicker, Popconfirm, message, Alert, Upload} from "antd";
import InputMask from "react-input-mask";
import moment from "moment";
import {sendStudentToResubmitAllResponse} from "../../../../../services/api_services/send_student_to_resubmit";
import {addStudentToComes} from "../../../../../services/api_services/administrator_students_api";


const AddStudentModal = props => {

    useEffect(() => {
        window.addEventListener("keyup", (event) => {
            if (event?.code === 'F7') {
                clearForm();
            }
            if (event?.code === 'F8') {
                saveStudent();
            }
            if (event?.code === 'F9') {
                saveStudentAndClear();
            }

        })
    }, [])
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
    const {
        addModalVisible,
        setAddModalVisible,
        eduTypes,
        organizations,
        reload,
        setReload,
        inputTagRef,
        focusRefElement
    } = props;
    const [dataHas, setDataHas] = useState(null);
    const [validatorErrors, setValidatorErrors] = useState([]);
    const [loading, setLoading] = useState(false);
        const [fileList, setFileList] = useState([]);

    const dateFormat = 'DD-MM-YYYY';

    const onPassportHandle = e => {
        // console.log('pi' , e)
        studentStoreForm.setFieldsValue({
            student_passport: e?.target?.value?.toUpperCase(),
        });
    };

    const [currentAge, setCurrentAge] = useState(16);
    const {Option} = Select;
    const simpleSaveStudent = (values) => {
        setLoading(true)
        console.log('ehe', values);
        const formData = new FormData();
        for (let key in values) {
            if (key === 'med_file') {
                formData.append(key, values[key] ? values[key].file?.originFileObj : "");
            } else {
                formData.append(key, values[key] ? values[key] : "");
            }
        }
        let params = {};
        (async () => {
            const res = await addStudentToComes(params, formData);
            if (res?.data?.status === 1) {
                message.success(res?.data?.message);
                setReload(!reload)
                clearForm();
                if (values?.typeSave === 'simple') {
                    cancelAddModal();
                } else {
                }
                return true;
            }
            if (parseInt(res?.data?.status) === 2) {
                message.error("xato");
                setValidatorErrors(res?.data?.validator_errors);
                if (res?.data?.data_has) {
                    setDataHas(res?.data?.data_has);
                }
                return false;
            }
        })();
        setLoading(false);
    };
    const saveStudent = () => {
        mergeFio();
        studentStoreForm.setFieldValue('typeSave', 'simple');
        studentStoreForm.submit();
    };
    const saveStudentAndClear = () => {
        mergeFio();
        studentStoreForm.setFieldValue('typeSave', 'clear');
        studentStoreForm.submit();
        focusRefElement();

    };
    const cancelAddModal = () => {
        setValidatorErrors(null);
        setDataHas(null);
        setAddModalVisible(false);
    };
    const mergeFio = () => {
        let fio = studentStoreForm.getFieldValue('last_name') + ' ' + studentStoreForm.getFieldValue('first_name') + ' ' + studentStoreForm.getFieldValue('middle_name');
        studentStoreForm.setFieldValue('student_fio', fio);
    };
    const clearForm = () => {
        studentStoreForm.resetFields();
        setValidatorErrors(null);
        setDataHas(null);
        setFileList([]);
    };
    const propsMedFile = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const dummyRequest = ({file, onSuccess}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    const onChangeMedFile = ({fileList: newFileList}) => {
        setFileList([]);
        setFileList(newFileList);
    };
    return (
        <Modal
            zIndex={1005}
            width={1600}
            open={addModalVisible}
            onCancel={cancelAddModal}
            title={"Yangi o'quvchi qo'shish"}
            footer={[
                <Button key="back">
                    Bekor qilish <span
                    className={'small-keyboard-style'}>ESC</span>
                </Button>,
                <Button onClick={clearForm} loading={loading}>
                    Tozalash
                    <span
                        className={'small-keyboard-style'}>F7</span>
                </Button>,
                <Button type="primary" onClick={saveStudent} loading={loading}>
                    Saqlash
                    <span
                        className={'small-keyboard-style'}>F8</span>
                </Button>,
                <Button onClick={saveStudentAndClear}
                        loading={loading}
                        type="primary"
                >
                    Saqlash va tozalash <span
                    className={'small-keyboard-style'}>F9</span>
                </Button>
            ]}
        >
            <Form
                form={studentStoreForm}
                name={'studentadd'}
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
                    <Col xl={6}>
                        <Form.Item
                            label="Familiya"
                            name="last_name"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "O`quvchi familiyasini kiriting!",
                                },
                            ]}

                        >
                            <Input
                                ref={inputTagRef}
                                allowClear={true}
                                style={{width: "100%"}}
                                placeholder="Familiya"
                            />
                        </Form.Item>
                    </Col>
                    <Col xl={6}>
                        <Form.Item
                            label="Ism"
                            name="first_name"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "O`quvchi ismini kiriting!",
                                },
                            ]}
                        >
                            <Input
                                allowClear={true}
                                style={{width: "100%"}}
                                placeholder="Ism"
                            />
                        </Form.Item>
                    </Col>
                    <Col xl={6}>
                        <Form.Item
                            label="Otasining ismi"
                            name="middle_name"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}
                        >
                            <Input
                                allowClear={true}
                                style={{width: "100%"}}
                                placeholder="Otasining ismi"
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
                                    if (e === 1) {
                                        setCurrentAge(18);
                                    } else if (e === 2) {
                                        setCurrentAge(16);
                                    } else if (e === 3) {
                                        setCurrentAge(18);
                                    } else if (e === 4) {
                                        setCurrentAge(18);
                                    } else if (e === 5) {
                                        setCurrentAge(18);
                                    } else if (e === 8) {
                                        setCurrentAge(18);
                                    } else if (e === 7) {
                                        setCurrentAge(28);
                                    } else {
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
                                style={{width: "100%"}}
                            />
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
                                format={dateFormat}
                                placeholder="Tug'ilgan sanani tanlang"
                                disabled={!studentStoreForm.getFieldValue("edu_type_id")}
                                disabledDate={current => {
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
                    <Col xl={6}>
                        <Form.Item
                            label="Tibbiy ma`lumotnoma raqami"
                            name="med_number"
                            rules={[
                                {
                                    required: true,
                                    message: "Tibbiy ma`lumotnoma raqamini kiriting!",
                                },
                            ]}
                            className={"w-100"}
                        >
                            <Input
                                placeholder="Tibbiy ma`lumotnoma raqamini kiriting"
                                allowClear={true}
                                style={{width: "100%"}}
                            />
                        </Form.Item>
                    </Col>
                    <Col xl={6}>
                        <Form.Item
                            label="Tibbiy ma`lumotnoma nusxasi"
                            name="med_file"
                            rules={[
                                {
                                    required: true,
                                    message: "Tibbiy nusxasini kiriting!",
                                },
                            ]}
                            className={"w-100"}
                        >
                            <Upload
                                customRequest={dummyRequest}
                                // listType="picture-card"
                                multiple={false}
                                maxCount={1}
                                fileList={fileList}
                                onChange={onChangeMedFile}
                                locale={true}
                            >
                                <Button>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Form.Item name='typeSave' hidden={true} initialValue={'simple'}>

                    </Form.Item>
                    <Form.Item
                        label="F.I.O"
                        name="student_fio"
                        hidden={true}
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
                            style={{width: "100%"}}
                            placeholder="F.I.O"
                        />
                    </Form.Item>
                </Row>
                <Row>
                    {validatorErrors ?
                        Object.entries(validatorErrors).map(([key, subject], i) => (
                            <Alert
                                className={"w-100"}
                                message={subject}
                                type={"error"}
                            />
                        )) : ''}
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
                ) : ''}
            </Form>
        </Modal>
    )
}

export default AddStudentModal;
