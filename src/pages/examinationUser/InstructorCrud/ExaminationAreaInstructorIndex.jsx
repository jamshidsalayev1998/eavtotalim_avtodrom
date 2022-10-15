import React, {useState, useEffect, useContext} from "react";
import {Card, CardBody, Container, Badge} from "reactstrap";
import {useHistory} from "react-router-dom";
import {withTranslation, useTranslation} from "react-i18next";
import {Select, Tabs, Table, Popconfirm, message, Form} from "antd";
import styleAction from "./style.module.css"
import {
    deleteExaminationAreaInstructor,
    getExaminationAreaInstructor
} from "../../../services/api_services/examination_area_instructor";
import AddExaminationAreaInstructorModal from "./AddExaminationAreaInstructorModal";
import EditExaminationAreaInstructorModal from "./EditExaminationAreaInstructorModal";
import ShowExaminationAreaInstructorModal from "./ShowExaminationAreaInstructorModal";

const ExaminationAreaInstructorIndex = props => {
    const {TabPane} = Tabs;
    const {Option} = Select;
    const [editForm] = Form.useForm();

    const history = useHistory();
    const [data, setData] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [reload, setReload] = useState(false);
    const [selectedElement, setSelectedElement] = useState();
    const [isShowModalVisible, setIsShowModalVisible] = useState();
    const [selectedShowElement, setSelectedShowElement] = useState();
    const {t} = useTranslation();
    useEffect(() => {
        (
            async () => {
                const response = await getExaminationAreaInstructor()
                setData(response?.data?.data)
            }
        )()
    }, [reload])

    function edit_payment(element) {
        editForm.setFieldsValue(element)
        setIsEditModalVisible(true)
    }

    function delete_payment(element) {
        (
            async () => {
                const response = await deleteExaminationAreaInstructor(element);
                if (response?.data?.status == 1) {
                    setReload(!reload)
                    message.success(response?.data?.message);
                }
            }
        )()

    }

    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    function getFio(element) {
        return element?.last_name + ' ' + element?.first_name + ' ' + element?.middle_name;
    }

    const showInstructor = (element) => {
        setSelectedShowElement(element);
        setIsShowModalVisible(true)
    }
    const columns = [
        {
            title: 'F.I.O',
            render: (index, element) => <>{getFio(element)}</>
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Amallar',
            render: (index, element) => <div className="d-flex" style={{fontSize: '20px'}}>
                <span className={styleAction?.action_buttons} style={{color: '#fa8c16'}}
                      onClick={() => showInstructor(element)}><i className="bx bx-show"></i></span>
                <span className={styleAction?.action_buttons} style={{color: '#1890ff'}}
                      onClick={() => edit_payment(element)}><i className="bx bx-edit"></i></span>
                <Popconfirm title={'Ma`lumotni o`chirasizmi'} placement="topLeft"
                            onConfirm={() => delete_payment(element?.id)} okText={'O`chirish'}
                            cancelText={'Bekor qilish'}>
                    <span className={styleAction?.action_buttons} style={{color: '#f5222d'}}> <i
                        className="bx bxs-trash"></i></span>
                </Popconfirm>
            </div>,
        },
    ];
    return (
        <>
            <AddExaminationAreaInstructorModal setIsAddModalVisible={setIsAddModalVisible}
                                               isAddModalVisible={isAddModalVisible} setReload={setReload}
                                               reload={reload}/>
            <EditExaminationAreaInstructorModal setIsEditModalVisible={setIsEditModalVisible}
                                                isEditModalVisible={isEditModalVisible} setReload={setReload}
                                                reload={reload} selectedElement={selectedElement}
                                                setSelectedElement={setSelectedElement} editForm={editForm}/>
            <ShowExaminationAreaInstructorModal setIsShowModalVisible={setIsShowModalVisible}
                                                isShowModalVisible={isShowModalVisible} setReload={setReload}
                                                reload={reload} selectedShowElement={selectedShowElement}
                                                setSelectedShowElement={setSelectedShowElement}/>
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations d-flex justify-content-between">
                                <h5 className="text-dark">{t("Instruktorlar")}</h5>
                                <div className={'d-flex'}>
                                    <button className={'btn btn-outline-success'} onClick={showAddModal}><i
                                        className={'fa fa-plus'}></i> Qo`shish
                                    </button>
                                </div>
                            </div>
                            <div className="crypto-buy-sell-nav mt-3">
                                <Table dataSource={data} columns={columns}/>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default withTranslation()(ExaminationAreaInstructorIndex);
