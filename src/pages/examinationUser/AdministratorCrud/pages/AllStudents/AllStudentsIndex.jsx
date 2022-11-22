import React, {useState, useEffect, useRef} from "react";
import {Badge, Card, CardBody, Container,} from "reactstrap";
import {withTranslation} from "react-i18next";
import {Row, Col, Select, Input, Pagination, Table, Modal, Form, message, Popconfirm, Tooltip} from "antd";
import axios from "axios";
import {PATH_PREFIX} from "../../../../../Utils/AppVariables";
import useDebounce from "../../../../../components/CustomHooks/useDebounce";
import QRCode from "qrcode";
import QrCodeToPrint from "./QrCodeToPrint";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import "./key_styles.css"
import {socketParam} from "../../../../../App";


const AllStudentsIndex = props => {
    const [data, setData] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [reload, setreload] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [showCount, setShowCount] = useState(10);
    const [word, setWord] = useState('');
    const waitWord = useDebounce(word, 1000)
    const [selectedStudent, setSelectedStudent] = useState();
    const [src, setSrc] = useState('');
    const [editStudent, setEditStudent] = useState();
    const urlStudentAdd = '/examination-administrator/all-students/add';
    const inputEl = useRef();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsloading(true)
         socketParam.on('practical_socket_ex_21_car_1' , (data) => {
            alert('anaa muhammadjon ishladiku')
        });
        axios({
            url: PATH_PREFIX + '/examination-administrator/all-students',
            method: 'GET',
            params: {
                token,
                page: page ? page : '1',
                show_count: showCount,
                word
            }
        }).then(response => {
            if (response?.data?.status == 1) {
                setData(response?.data?.data?.data);
                setTotal(response?.data?.data?.total)
                setPage(response?.data?.data?.current_page)
                setIsloading(false)
            }
        })
        window.addEventListener("keyup", (event) => {
            if (event?.code === 'F2'){
                if (location?.pathname === '/examination-administrator/all-students'){
                    history.push(urlStudentAdd)
                }
            }
        })
    }, [reload, waitWord]);

    const columns = [
        {
            title: '#',
            render: (index, element, counter) => <>{showCount * (page - 1) + counter + 1}</>
        },

        {
            title: 'F.I.O',
            render: (index, element) => <>{element?.student_fio}</>
        },
        {
            title: 'Holati',
            render: (index, element) => <>{element?.type == 'resubmit' ?
                <Badge color={'warning'}>Qayta topshirish</Badge> : <Badge color={'primary'}>Birinchi marta</Badge>}</>
        },
        {
            title: 'To`lov',
            children: [
                {
                    title: 'Nazariy',
                    render: (index, element) => <>
                        {
                            parseInt(element?.payment_status) ?
                                <Badge color={'success'}>To'lov qilingan</Badge> :
                                <Badge color={'danger'}>To'lov qilinmagan</Badge>
                        }
                    </>
                },
                {
                    title: 'Amaliy',
                    render: (index, element) => <>
                        {
                            parseInt(element?.practical_payment_status) ?
                                <Badge color={'success'}>To'lov qilingan</Badge> :
                                <Badge color={'danger'}>To'lov qilinmagan</Badge>
                        }
                    </>
                }
            ]

        },
        {
            title: 'Natija',
            children: [
                {
                    title: 'Nazariy',
                    render: (index, element) => <>
                        {
                            element?.exam_result == 1 ?
                                <Badge color={'success'}>O`tgan</Badge> :
                                element?.exam_result == 0 ?
                                    <Badge color={'danger'}>Yiqilgan</Badge> :
                                    <Badge color={'warning'}>Topshirmagan</Badge>

                        }
                    </>
                },
                {
                    title: 'Amaliy',
                    render: (index, element) => <>{
                        element?.practical_exam_result == 1 ?
                            <Badge color={'success'}>O`tgan</Badge> :
                            element?.practical_exam_result == 0 ?
                                <Badge color={'danger'}>Yiqilgan</Badge> :
                                <Badge color={'warning'}>Topshirmagan</Badge>

                    }
                    </>
                }
            ]

        },
        {
            title: 'Amallar',
            render: (index, element) => <>
                <Tooltip title={'O\'zgartirish'}>
                    <NavLink to={'/examination-administrator/edit-students/' + element?.id}><i
                        className={'bx bx-edit'}></i></NavLink>
                </Tooltip>
            </>
        }
    ];

    const selectStudentForEdit = (element) => {
        setEditStudent(element);
    };

    const onShowSizeChange = (current, pageSize) => {
        setShowCount(pageSize);
        setPage(0);
        setTimeout(() => {
            setreload(!reload);
        }, 1000)
    };

    function changePage(e) {
        setPage(e);
        setreload(!reload)
    }

    function changeWord(word) {
        setWord(word);
        setPage(1);
    }

    function select_student(selected) {
        setSelectedStudent(selected);
        QRCode.toDataURL(selected?.student_passport).then(res => {
            setSrc(res)
        });
    }


    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations">
                                <h5>Barcha keluvchilar </h5>
                                <NavLink to={urlStudentAdd}>
                                    <button className="btn btn-outline-success"> + Qo'shish </button><span
                                        className={'keyboard-style'}>F2</span>
                                </NavLink>
                            </div>
                            <div className="crypto-buy-sell-nav mt-3">
                                <Row>
                                    <Col xl={18}>
                                        <Col xl={24} className={'d-flex justify-content-end'}>
                                            <Col xl={6}><Input allowClear={true} autoFocus={true}
                                                               onChange={e => changeWord(e?.target?.value)}/></Col>
                                        </Col>
                                        <Col xl={24}>
                                            <Table bordered={true} columns={columns} dataSource={data}
                                                   loading={isloading}
                                                   pagination={false} onRow={(record, rowIndex) => {
                                                return {
                                                    onClick: event => {
                                                        select_student(record)
                                                    }
                                                }
                                            }}/>
                                        </Col>
                                        <Col xl={24} className={'d-flex justify-content-end'}><Pagination
                                            onShowSizeChange={onShowSizeChange} onChange={changePage}
                                            defaultCurrent={page} current={page} total={total} showSizeChanger/></Col>
                                    </Col>
                                    <Col xl={6}>
                                        {
                                            selectedStudent &&
                                            <>

                                                <QrCodeToPrint src={src} selectedStudent={selectedStudent}/>
                                            </>
                                        }

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

export default withTranslation()(AllStudentsIndex);
