import React,{useState} from "react";
import {Modal, Row, Col, message} from "antd";
import {
    getPasswordExaminationAreaInstructor,
    updateExaminationAreaInstructor
} from "../../../services/api_services/examination_area_instructor";
import moment from "moment";


const ShowExaminationAreaInstructorModal = ({setIsShowModalVisible, isShowModalVisible, reload, setReload, selectedShowElement, setSelectedShowElement, editForm}) => {
    const handleOk = () => {
        setIsShowModalVisible(false);
    };

    const handleCancel = () => {
        setIsShowModalVisible(false);
    };

    const [usernamePassword, setUsernamePassword] = useState();
    const onFinishEdit = (values) => {
        (
            async () => {
                const response = await updateExaminationAreaInstructor(values, editForm.getFieldValue('id'));
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
     function getFio(element) {
        return element?.last_name+' '+element?.first_name+' '+element?.middle_name;
    }

    const showUsernamePassword = (elementId) => {
        (
            async () => {
                const response = await getPasswordExaminationAreaInstructor(elementId);
                if (response?.data?.status == 1) {
                    setUsernamePassword(response?.data?.data);
                }
            }
        )()
    }
    return (
        <>
            <Modal title="Instruktorni ko'rish"
                   visible={isShowModalVisible}
                   onCancel={handleCancel}
                   footer={<><button className={'btn btn-light'} onClick={handleCancel}>Yopish</button></>}
                   zIndex={1005}
            >
                <Row>
                    <Col xl={12}>
                        <label htmlFor="" className="w-100">F.I.O</label>
                        <p>
                            {getFio(selectedShowElement)}
                        </p>
                    </Col>
                    <Col xl={12}>
                        <label htmlFor="" className="w-100">Yaratilgan vaqi</label>
                        <p>
                            {moment(selectedShowElement?.created_at).format('YYYY-MM-DD H:m:s')}
                        </p>
                    </Col>
                    <Col xl={12}>
                        <label htmlFor="" className="w-100">Parol loginni ko'rish</label>
                        <button className="btn btn-light" onClick={() => showUsernamePassword(selectedShowElement?.id)}><i
                            className="fa fa-eye"></i></button>
                    </Col>
                    <Col xl={12}>
                        <p>
                            Login: <b>{usernamePassword?.username ? usernamePassword?.username : '________'}</b>
                        </p>
                        <p>
                            Parol: <b>{usernamePassword?.password ? usernamePassword?.password : '________'}</b>
                        </p>
                    </Col>

                </Row>
            </Modal>
        </>
    )
}
export default (ShowExaminationAreaInstructorModal);