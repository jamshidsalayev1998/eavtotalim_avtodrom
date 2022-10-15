import React, {useState, useEffect, useContext} from "react";
import {Card, CardBody, Container, Badge} from "reactstrap";
import axios from "axios";
import {NavLink, useHistory} from "react-router-dom";
import {withTranslation, useTranslation} from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import {Modal, Button, Select, Tabs, Row, Col, Table, Popconfirm, message,Form} from "antd";
import {
    deleteExaminationPaymentType,
    getExaminationPaymentType
} from "../../../services/api_services/examination_payment_types";
import styleAction from "../AdministratorCrud/style.module.css"
import AddExaminationPaymentTypeModal from "./AddExaminationPaymentTypeModal";
import EditExaminationPaymentTypeModal from "./EditExaminationPaymentTypeModal";

const ExaminationPaymentTypesIndex = props => {
    const {TabPane} = Tabs;
    const {Option} = Select;
        const [editForm] = Form.useForm();

    const history = useHistory();
    const [data, setData] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [reload, setReload] = useState(false);
    const [selectedElement, setSelectedElement] = useState();
    const {t} = useTranslation();
    useEffect(() => {
        (
            async () => {
                const response = await getExaminationPaymentType()
                setData(response?.data?.data)
                console.log('ppp', response?.data?.data);
            }
        )()
    }, [reload])

    function edit_payment(element) {
        // setSelectedElement(element);
        editForm.setFieldsValue(element)
        setIsEditModalVisible(true)
    }

    console.log('selecte',selectedElement)
    function delete_payment(element) {
        (
            async () => {
                const response = await deleteExaminationPaymentType(element);
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
    const columns = [
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Summasi',
            dataIndex: 'amount',
            key: 'amount'
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
            <AddExaminationPaymentTypeModal setIsAddModalVisible={setIsAddModalVisible}
                                            isAddModalVisible={isAddModalVisible} setReload={setReload}
                                            reload={reload}/>
            <EditExaminationPaymentTypeModal setIsEditModalVisible={setIsEditModalVisible}
                                            isEditModalVisible={isEditModalVisible} setReload={setReload}
                                            reload={reload} selectedElement={selectedElement} setSelectedElement={setSelectedElement} editForm={editForm}/>
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations d-flex justify-content-between">
                                <h5 className="text-dark">{t("To`lovlar turlari")}</h5>
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

export default withTranslation()(ExaminationPaymentTypesIndex);
