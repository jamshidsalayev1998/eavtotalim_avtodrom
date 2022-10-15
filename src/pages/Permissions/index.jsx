import React, { useState, useEffect } from "react"
import {
    Card,
    CardBody,
    Container,
    Row,
    Modal
} from "reactstrap"
import axios from "axios"
import { isEmpty } from "lodash"
import { withTranslation, useTranslation } from "react-i18next"
import { PATH_PREFIX } from "Utils/AppVariables"
import Swal from "sweetalert2"
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table"
import { preventDefault } from "leaflet/src/dom/DomEvent";
import { deleteData } from '../../services/deleteData';
import NoAgreement from "pages/NoAgreement"


const Permissions = props => {
    const [data, setData] = useState([]);
    const [isAddModal, setAddModal] = useState(false);

    const [groups, setGroups] = useState('');
    const [group_id, setGroupid] = useState('');
    const [date, setDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [mark, setMark] = useState(true);
    const [monitoring, setMonitoring] = useState(true);
    const [masalan, setMasalan] = useState(true);
    const [changeDel, setChangeDel] = useState(false);
    const [no_agreement, setNoAgreement] = useState(false);
    const [validator_errors, setvalidator_errors] = useState({});

    const { t } = useTranslation()


    // sort with values by database
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios({
            url: PATH_PREFIX + '/permission-index',
            method: 'GET',
            params: {
                token
            }
        }).then(response => {
            setGroups(response?.data?.groups);
            setData(response?.data?.data);
            if (response?.data?.status === 4) {
                setNoAgreement(true)
            }

        })
    }, [masalan])
    const save_permission = () => {
        const token = localStorage.getItem('token');
        const form_data = new FormData();
        form_data.append('group_id', group_id ? group_id : groups[0].id);
        form_data.append('start_date', date);
        form_data.append('end_date', enddate);
        form_data.append('mark', mark ? '1' : '0');
        form_data.append('monitoring', monitoring ? '1' : '0');

        axios({
            url: PATH_PREFIX + '/permission-store',
            method: 'POST',
            params: {
                token
            },
            data: form_data

        }).then(response => {
            if (response?.data?.status == '1') {
                setMasalan(!masalan)
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setAddModal(false)
                    setDate('')
                    setGroupid('')
                })
            }
            if (response?.data?.status == '2') {
                setvalidator_errors(response?.data?.validator_errors)
            }

        })
    }
    const onCrud = (e, value) => {
        setAddModal(true);
        setEndDate("")
        setDate("")
        setGroupid("")
    }
    const removeData = (id) => {
        const formdata = new FormData();
        formdata.append("permission_id", id)
        deleteData(formdata, "/permission-delete").then(() => {
            setChangeDel(!changeDel)
            Swal.fire({
                icon: 'success',
                title: `${t("Data deleted")}`,
                showConfirmButton: false,
                timer: 1500
            })
            setMasalan(!masalan)
        })
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    {
                        no_agreement ? <NoAgreement /> :
                        <>
                            <Modal
                                isOpen={isAddModal}
                                toggle={() => setAddModal(!isAddModal)}
                                size="md"
                                centered
                            >
                                <Card className="mb-0">
                                    <form onSubmit={e => preventDefault(e)}>
                                        <div className="modal-header">
                                            <h5 className="modal-title mt-0" id="myModalLabel">{t("Add information")}</h5>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setAddModal(false)
                                                }}
                                                className="close text-secondary"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>

                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label htmlFor="name">{t("Group")}</label>
                                                <select
                                                    className="region"
                                                    className="custom-select"
                                                    value={group_id}
                                                    onChange={(e) => setGroupid(e.target.value)}
                                                >
                                                    {
                                                        !isEmpty(groups) && groups.map((e, i) => {
                                                            return <option key={e.id} value={e.id}>
                                                                {e.name_uz || e.name_ru || e.name_kiril || e.name_en || e.name_qq}
                                                            </option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group mb-0">
                                                <label htmlFor="name">{t("Start date")}</label>
                                                <input type="date" value={date} className="form-control"
                                                    onChange={e => setDate(e.target?.value)} />
                                            </div>
                                            <div className="text-danger mt-0 pt-0 mb-2">{validator_errors?.start_date}</div>
                                            <div className="form-group mb-0">
                                                <label htmlFor="name">{t("Date of completion")}</label>
                                                <input type="date" value={enddate} className="form-control"
                                                    onChange={e => setEndDate(e.target?.value)} />
                                            </div>
                                            <div className="text-danger mt-0 pt-0 mb-2">{validator_errors?.end_date}</div>
                                            <div className="mt-2 d-flex " style={{ justifyContent: 'space-around' }}>
                                                <div>
                                                    <label htmlFor="" className="mr-2">{t("Evaluation")}</label>
                                                    <input type="checkbox" className="" value={mark} checked={mark}
                                                        onChange={() => setMark(!mark)} />
                                                </div>

                                                <div>
                                                    <label htmlFor="" className="mr-2 ml-4">{t("Attendance")}</label>
                                                    <input type="checkbox" className="" value={monitoring} checked={monitoring}
                                                        onChange={() => setMonitoring(!monitoring)} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="modal-footer mb-0">
                                            <button className="btn btn-light" type="reset" onClick={() => setAddModal(false)}>
                                                {t("Cancel")}
                                            </button>
                                            <button
                                                className="btn btn-success"
                                                type="submit"
                                                onClick={save_permission}
                                            >
                                                {t("Save")}
                                            </button>
                                        </div>
                                    </form>
                                </Card>
                            </Modal>
                            <Card>
                                <CardBody>
                                    <div className="top-organizations">
                                        <h5 className="text-dark">{t("Evaluate or Allow Attendance")}</h5>
                                        <button
                                            type="button"
                                            className="btn btn-success w-lg waves-effect waves-light"
                                            onClick={() => onCrud("add", null)}
                                        >
                                            <i className="bx bx-plus mr-2"></i>{t("Add")}
                                        </button>
                                    </div>
                                    <Row className="mt-5">
                                        <Table id="tech-companies-1"
                                            className="table table-striped table-bordered">
                                            <Thead className="font-size-14">
                                                <Tr>
                                                    <Th data-priority="3">№</Th>
                                                    <Th data-priority="3">{t("Group")}</Th>
                                                    <Th data-priority="3">{t("Date")}</Th>
                                                    <Th data-priority="3">{t("Evaluation")}</Th>
                                                    <Th data-priority="3">{t("Attendance")}</Th>
                                                    <Th data-priority="3"></Th>

                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {
                                                    data?.length > 0 && data?.map((element, index) => {
                                                        return (
                                                            <Tr key={element.id}>
                                                                <Th className="">{index + 1}</Th>
                                                                <Th className="table_body link_show_by_name">{element?.group?.name_uz}</Th>
                                                                <Th className="table_body link_show_by_name text-center">
                                                                    {element?.start_date} -&#8919; {element?.end_date}
                                                                </Th>
                                                                <Th className="table_body link_show_by_name text-center ">
                                                                    {element?.mark == '1' ?
                                                                        <i style={{ color: '#34C38F' }}
                                                                            className="fa fa-check"></i> :
                                                                        <i style={{ color: 'red' }} className="fa fa-times"
                                                                            aria-hidden="true"></i>
                                                                    }
                                                                </Th>
                                                                <Th className="table_body link_show_by_name text-center">
                                                                    {element?.monitoring == '1' ?
                                                                        <i style={{ color: '#34C38F' }}
                                                                            className="fa fa-check"></i> :
                                                                        <i style={{ color: 'red' }} className="fa fa-times"
                                                                            aria-hidden="true"></i>
                                                                    }
                                                                </Th>
                                                                <Th style={{ width: '1px' }}>
                                                                    <span style={{ cursor: 'pointer' }}
                                                                        onClick={() => removeData(element.id)}><i
                                                                            className="bx bx-trash  font-size-18 mr-3 text-danger"></i></span>
                                                                </Th>
                                                            </Tr>
                                                        )
                                                    })
                                                }
                                            </Tbody>

                                        </Table>
                                    </Row>
                                </CardBody>
                            </Card>
                        </>
                    }
                </Container>
            </div>
        </>
    )
}


export default (withTranslation()(Permissions))
