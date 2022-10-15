import React, {useState, useEffect} from "react";
import {Modal, Form, Select, Input, message} from "antd";
import {
    examinationAreaInstructorStudentCarMerge,
    getExaminationAreaInstructorCars, instructorStudentCarStartExam
} from "../../../../../services/api_services/instructor_student_api";
import {useHistory} from "react-router";

const StudentCarMargeModal = ({isModalVisible, setIsModalVisible, selectedStudent, reload, setReload , examinationArea}) => {
    const {Option} = Select;
    const [formMerge] = Form.useForm();
    const [cars, setCars] = useState([]);
    const history = useHistory();
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        formMerge.submit();
        // setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // const onFinish = (values) => {
    //     const data = new FormData();
    //     for (const key in values) {
    //         data.append(key, values[key] ? values[key] : '');
    //     }
    //     data.append('final_access_student_id', selectedStudent?.id);
    //     (async () => {
    //         const response = await examinationAreaInstructorStudentCarMerge(data);
    //         if (response?.data?.status == 1){
    //             message.success(response?.data?.message);
    //             setReload(!reload);
    //             setIsModalVisible(false);
    //             history.push(`/examination-instructor/exam-ended-students/${selectedStudent?.id}`)
    //         }
    //         if (response?.data?.status == 0){
    //             message.error(response?.data?.message);
    //         }
    //     })()
    // };

    console.log('popopo' , examinationArea)

    const onFinish = (values) => {
        const data = new FormData();
        for (const key in values) {
            data.append(key, values[key] ? values[key] : '');
        }
        data.append('final_access_student_id', selectedStudent?.id);

        (async () => {
            const iii = {
                student_id: selectedStudent?.id,
                key: examinationArea?.key,
                car_id: values['examination_area_car_id'],
                token: "",
            }
            const response = await instructorStudentCarStartExam(iii);
            if (response?.data?.status == 1) {
                message.success(response?.data?.message);
                setReload(!reload);
                setIsModalVisible(false);
                let selectedCar = cars?.filter(carElement=>{
                    return carElement?.gps_id === parseInt(values['examination_area_car_id']);
                });
                history.push({
                    pathname:`/examination-instructor/exam-ended-students/${selectedStudent?.id}`,
                    state:{
                        edu_type_id:selectedStudent?.edu_type_id,
                        student_fio:selectedStudent?.student_fio,
                        car_edu_type_id: selectedCar[0]?.edu_type_id
                    }
                })
            }
            if (response?.data?.status == 0) {
                message.error(response?.data?.message);
            }
        })()
    };

    const onFinishFailed = (errorInfo) => {
    };
    useEffect(() => {
        (async () => {
            const params = {
                status: 'unUsed'
            }
            const response = await getExaminationAreaInstructorCars(params);
            if (response?.data?.status == 1) {
                setCars(response?.data?.data);
            }
        })()
    }, []);

    return (
        <>
            <Modal title="Avtomobilga biriktirish"
                   visible={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   zIndex={1005}
            >
                <Form
                    form={formMerge}
                    name="basic"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Avtomobil"
                        name="examination_area_car_id"
                        rules={[{required: true, message: 'Avtomobilni tanlang!'}]}
                    >
                        <Select
                            showSearch
                            placeholder="Avtomobilni tanlang"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                cars &&
                                cars?.map((element, index) => {
                                    return (
                                        <Option key={index} value={element?.gps_id}>{element?.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}
export default (StudentCarMargeModal);