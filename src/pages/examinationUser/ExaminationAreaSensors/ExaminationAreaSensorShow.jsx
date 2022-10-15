import React, {useState, useEffect, useContext} from "react";
import {Card, CardBody, Container, Badge} from "reactstrap";
import axios from "axios";
import {NavLink, useHistory, useRouteMatch} from "react-router-dom";
import {withTranslation, useTranslation} from "react-i18next";
import {PATH_PREFIX, PATH_PREFIX_FILE} from "Utils/AppVariables";
import {Modal, Button, Select, Tabs, Row, Col, Table, Popconfirm, message, Form} from "antd";

import styleAction from "../AdministratorCrud/style.module.css"
import AddExaminationAreaSensorModal from "./AddExaminationAreaSensorModal";
import EditExaminationAreaSensorModal from "./EditExaminationAreaSensorModal";
import {
    deleteExaminationAreaSensor, deleteExaminationAreaSensorPenalty,
    getExaminationAreaSensor, showExaminationAreaSensor
} from "../../../services/api_services/examination_area_sensors";
import {getEduTypesForAll} from "../../../services/api_services/edu_types_api";
import AddExaminationAreaSensorPenaltiesModal
    from "./ExaminationAreaSensorPenalties/AddExaminationAreaSensorPenaltiesModal";
import EditExaminationAreaSensorPenaltiesModal
    from "./ExaminationAreaSensorPenalties/EditExaminationAreaSensorPenaltiesModal";

const ExaminationAreaSensorShow = props => {
    const {TabPane} = Tabs;
    const [editForm] = Form.useForm();

    const history = useHistory();
    const [data, setData] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [reload, setReload] = useState(false);
    const [selectedElement, setSelectedElement] = useState();
    const [fileEditList, setFileEditList] = useState([]);
    const match = useRouteMatch('/examination-area/sensors/:id');
    const {t} = useTranslation();
    const dummyRequest = ({file, onSuccess}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    useEffect(() => {
        (
            async () => {
                let filters = [];
                let params = {
                    filters: JSON.stringify(filters)
                };
                const response = await showExaminationAreaSensor(match?.params?.id,{});
                if (parseInt(response?.status) === 1){
                    setData(response?.data?.sensor_penalties)
                }

            }
        )()
    }, [reload]);

    function edit_payment(element) {
        editForm.setFieldsValue(element);
        setIsEditModalVisible(true)
    }

    function delete_payment(element) {
        (
            async () => {
                const response = await deleteExaminationAreaSensorPenalty(element);
                if (response?.status == 1) {
                    setReload(!reload)
                    message.success(response?.message);
                }
            }
        )()

    }

    const showAddModal = () => {
        setIsAddModalVisible(true);
    };
    const columns = [
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Jarima bali',
            dataIndex: 'penalty_ball',
            key: 'penalty_ball'
        },
        {
            title: 'Kod',
            dataIndex: 'result',
            key: 'result'
        },
        {
            title: 'Amallar',
            render: (index, element) => <div className="d-flex" style={{fontSize: '20px'}}>
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
            <AddExaminationAreaSensorPenaltiesModal isAddModalVisible={isAddModalVisible} reload={reload} setIsAddModalVisible={setIsAddModalVisible} setReload={setReload} sensorId={match?.params?.id} />
            <EditExaminationAreaSensorPenaltiesModal setReload={setReload} reload={reload} editForm={editForm} isEditModalVisible={isEditModalVisible} setIsEditModalVisible={setIsEditModalVisible} setSelectedElement={setSelectedElement}  />
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations d-flex justify-content-between">
                                <h5 className="text-dark">{t("Sensorlar")}</h5>
                                <div className={'d-flex'}>
                                    <button className={'btn btn-outline-success'} onClick={showAddModal}><i
                                        className={'fa fa-plus'}></i> Qo`shish
                                    </button>
                                </div>
                            </div>
                            <div className="crypto-buy-sell-nav mt-3">

                                <Row>
                                    <Col xl={24}>
                                        <Table dataSource={data} columns={columns}/>

                                    </Col>

                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default withTranslation()(ExaminationAreaSensorShow);
