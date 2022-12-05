import React, {useEffect, useState} from "react";
import {Badge, Card, CardBody, Container,} from "reactstrap";
import {Row, Col, Table, Popconfirm, Form, message, Tooltip, Button} from "antd"
import AcceptApplicationModal from "./AcceptApplicationModal";
import {
    acceptOnlineApplicationsApi,
    indexOnlineApplicationsApi,
    rejectOnlineApplicationsApi
} from "../../services/api_services/online_applications/online_application_api";
import moment from "moment";
import RejectApplicationModal from "./RejectApplicationModal";


const ExaminationAreaComputersIndex = () => {
    const [acceptForm] = Form.useForm();
    const [rejectForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [applications, setApplications] = useState([]);
    const [isVisibleAcceptModal, setIsVisibleAcceptModal] = useState(false);
    const [isVisibleRejectModal, setIsVisibleRejectModal] = useState(false);
    const [isVisibleEditModal, setIsVisibleEditModal] = useState(false);
    const [reload, setReload] = useState(false);
    const [selectedElement, setSelectedElement] = useState(undefined);
    const [actionType, setActionType] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState("");

    useEffect(() => {
        (async () => {
            const filters = [
                {
                    fieldOperator: '=',
                    fieldKey: 'status',
                    fieldValue: 0
                }
            ]
            const params = {
                filters: JSON.stringify(filters)
            }
            const response = await indexOnlineApplicationsApi(params);
            if (response?.data) {
                console.log('resp d', response?.data?.data)
                // console.log('resp d' , response?.data)
                setApplications(response?.data?.data);
            }
        })()
    }, [reload]);


    const showAcceptModal = () => {
        setIsVisibleAcceptModal(true);
    }
    const cancelAcceptModal = () => {
        setIsVisibleAcceptModal(false)
        setTextAreaValue("")
        acceptForm.resetFields()
    }
    const okAcceptModal = () => {
        acceptForm.submit();
    }
    const showRejectModal = () => {
        setIsVisibleRejectModal(true);
    }
    const cancelRejectModal = () => {
        setIsVisibleRejectModal(false)
        rejectForm.resetFields()
    }
    const okRejectModal = () => {
        rejectForm.submit();
    }
    const onFinishAcceptForm = (values) => {

        (async () => {
            const response = await acceptOnlineApplicationsApi(selectedElement?.id,values?.message, {});
            if (parseInt(response?.data?.status)) {
                message.success('Ariza tasdiqlandi')
                cancelAcceptModal()
                setReload(!reload)
            }
        })()
    }
    const onFinishRejectForm = (values) => {
        (async () => {
            const response = await rejectOnlineApplicationsApi(selectedElement?.id,values?.message, {});
            if (response?.data?.status) {
                message.success('Ariza qaytarildi')
                cancelRejectModal()
                setReload(!reload)
            }
        })()
    }
    const columns = [
        {
            title: 'F.I.O',
            dataIndex: 'student_fio'
        },
        {
            title: 'Pasport',
            dataIndex: 'student_passport'
        },
        {
            title: 'Talim turi',
            render: (index, row) => <>{row?.edu_type?.short_name_uz}</>
        },
        {
            title: 'Avtomaktab | guruh',
            render: (index, row) => <>{row?.organization?.name_uz} | {row?.group}</>
        },
        {
            title: 'Tugilgan sana',
            render: (index, row) => <>{row?.birthday}</>
        },
        {
            title: 'Telefon',
            dataIndex: 'student_phone'
        },
        {
            title: 'Amallar',
            render: (index, row) => <div className={'d-flex'}>
                <Button onClick={() => selectElement(row, 'reject')}><i
                    className={'fa fa-times text-danger'}></i></Button>
                <Button onClick={() => selectElement(row, 'accept')}><i
                    className={'fa fa-check text-success'}></i></Button>
            </div>
        }
    ];
    const selectElement = (online_application, type) => {
        // alert(type)
        setSelectedElement(online_application);
        setActionType(type);
        if (type === 'accept') {
            showAcceptModal()

        } else {
            showRejectModal()
        }
    }

    return (
        <div className="page-content">
            <AcceptApplicationModal
                isVisibleAcceptModal={isVisibleAcceptModal}
                cancelAcceptModal={cancelAcceptModal}
                onFinishAcceptForm={onFinishAcceptForm}
                acceptForm={acceptForm}
                okAcceptModal={okAcceptModal}
                actionType={actionType}
                selectedElement={selectedElement}
            />
            <RejectApplicationModal
                isVisibleAcceptModal={isVisibleRejectModal}
                cancelAcceptModal={cancelRejectModal}
                onFinishAcceptForm={onFinishRejectForm}
                acceptForm={rejectForm}
                okAcceptModal={okRejectModal}
                actionType={actionType}
                selectedElement={selectedElement}
            />
            <Container fluid>
                <Card>
                    <CardBody>
                        <div className="top-organizations">
                            <h5>Arizalar </h5>
                            {/*<button className="btn btn-outline-success" onClick={showAcceptModal}> + Qo'shish</button>*/}
                        </div>
                        <div className="crypto-buy-sell-nav mt-3">
                            <Row>
                                <Col xl={24}>
                                    <Table dataSource={applications} columns={columns} pagination={true}/>
                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default ExaminationAreaComputersIndex;