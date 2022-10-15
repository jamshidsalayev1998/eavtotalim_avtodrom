import React, {useState,useEffect} from "react";
import {Modal, Form, Input, Row, Col, message, Upload,Select,Checkbox} from "antd";
import {PATH_PREFIX, PATH_PREFIX_FILE} from "../../../Utils/AppVariables";
import {updateExaminationAreaSensor} from "../../../services/api_services/examination_area_sensors";
import {getEduTypesForAll} from "../../../services/api_services/edu_types_api";


const EditExaminationAreaSensorModal = ({setIsEditModalVisible, isEditModalVisible, reload, setReload, selectedElement, setSelectedElement, editForm, setFileEditList, fileEditList, dummyRequest}) => {
    const {Option} = Select;
    const [eduTypes, setEduTypes] = useState([]);
    const handleOk = () => {
        editForm.submit()
    };
    useEffect(() => {
        (async () => {
            let params = {};
            const res = await getEduTypesForAll(params);
            if (res?.status == 1) {
                setEduTypes(res?.data?.data);
            }
        })()
    }, []);

    const handleCancel = () => {
        setSelectedElement()
        setIsEditModalVisible(false);
        editForm.resetFields()
    };

    const onFinishEdit = (values) => {
        (
            async () => {
                const formData = new FormData();
                    console.log('lala1' , values)
                for (const key in values) {
                    if (key == 'image') {
                        formData.append(key, values[key] ? values[key]?.file?.originFileObj : '');
                    } else {
                        formData.append(key, values[key] ? values[key] : '');

                    }
                }
                    console.log('lala' , values);
                const response = await updateExaminationAreaSensor(formData, editForm.getFieldValue('id'));
                if (response?.data?.status == 1) {
                    setReload(!reload)
                    setIsEditModalVisible(false)
                    editForm.resetFields();
                    message.success(response?.data?.message);
                }
            }
        )()

    }
    const onFinishFailedEdit = () => {

    }

    const onChange = ({fileList: newFileList}) => {
        setFileEditList(newFileList);
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

    return (
        <>
            <Modal title="Sensorni o`zgartirish"
                   visible={isEditModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   okText={'Saqlash'}
                   cancelText={'Bekor qilish'}
                   zIndex={1005}
            >
                <Row>
                    <Col xl={24}>
                        <Form
                            form={editForm}
                            name="editPaymentTypeForm"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinishEdit}
                            onFinishFailed={onFinishFailedEdit}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Avtomobil nomi"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nomini kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Sensor belgi rasmi"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Rasmni tanlang!',
                                    },
                                ]}
                            >
                                <Upload
                                    customRequest={dummyRequest}
                                    listType="picture-card"
                                    fileList={fileEditList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    locale={true}
                                    accept={'.jpg,.png,.jpeg'}
                                >
                                    {fileEditList && fileEditList.length < 1 && '+ Upload'}
                                </Upload>
                                {/*<Input type={"file"} />*/}
                            </Form.Item>
                             <Form.Item
                                label="Jarima bali"
                                name="penalty_ball"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Jarima balini kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                             <Form.Item
                                label="Ta`lim turi"
                                name="edu_type_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Ta`lim turini tanlang!',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {
                                        eduTypes &&
                                        eduTypes.map((element, index) => {
                                            return (
                                                <Option value={element?.id} key={index}>{element?.short_name_uz}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="SENSOR ID"
                                name="sensor_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Sensor id raqamini kiriting!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="left"
                                valuePropName={'checked'}
                            >
                                <Checkbox >Chapga ogohlantirish chirog'i</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="right"
                                 valuePropName={'checked'}
                            >
                                <Checkbox>O'nga ogohlantirish chirog'i</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="arg1"
                                 valuePropName={'checked'}
                            >
                                <Checkbox >Halokat chirog'i</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="light"
                                 valuePropName={'checked'}
                            >
                                <Checkbox >Chiroqlar</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="remen"
                                 valuePropName={'checked'}
                            >
                                <Checkbox >Remen</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="engine"
                                 valuePropName={'checked'}
                            >
                                <Checkbox >Dvigatel</Checkbox>
                            </Form.Item>

                            <Form.Item
                                label="Id"
                                name="id"
                                hidden={true}
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}

                            >
                                <Input/>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}
export default (EditExaminationAreaSensorModal);