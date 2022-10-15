import React, {useContext, useState, useEffect, useRef} from "react";
import {Card, CardBody, Container, Badge} from "reactstrap";
import {useDispatch} from "react-redux";
import {withTranslation, useTranslation} from "react-i18next";
import MainContext from "Context/MainContext";
import {Row, Col, Select, Input, Table, Tag, Space} from "antd";
import axios from "axios";
import {
    PATH_PREFIX,
    PATH_PREFIX_FILE,
    PATH_PREFIX_INTALIM_TEST_FILES,
    PATH_PREFIX_TEST_FILE
} from "../../../Utils/AppVariables";
import {DataLoader} from "../../Loaders/Loaders";
import {useHistory, useLocation, useRouteMatch} from "react-router";
import isEmpty from "lodash"
import "./style.scss"
import ReactToPrint, {useReactToPrint} from 'react-to-print';
import PrintReportByStudent from "./print/PrintReportByStudent";

const ExamResultStudentShow = props => {
    const history = useHistory();
    const {setAuth} = useContext(MainContext);
    const {t} = useTranslation();
    const [data, setData] = useState([]);
    const [corrects, setCorrects] = useState('');
    const [incorrects, setInCorrects] = useState('');
    const [nocheckeds, setnocheckeds] = useState('');
    const [isloading, setIsloading] = useState(false);
    const [student, setStudent] = useState(undefined);
    const match_params = useRouteMatch('/examination/result-groups/:id')
    const stateMy = useLocation()?.state;
    console.log('match', match_params)

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsloading(true)
        axios({
            url: PATH_PREFIX + '/examination-user/results-by-student/' + match_params?.params?.id,
            method: 'GET',
            params: {
                token,
            }
        }).then(res => {
            if (res?.data?.status == 1) {
                setData(res?.data?.data);
                setStudent(res?.data?.student);
                setCorrects(res?.data?.corrects);
                setInCorrects(res?.data?.incorrects);
                setnocheckeds(res?.data?.no_checkeds);
                setIsloading(false);
            }
        })

    }, []);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    let printReportRef = useRef();
    return (
        <>

            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations">
                                <div className="top_links_page_title">
                                  <span className="mr-3" onClick={() => history.goBack()}>
                                    <i className="bx bx-arrow-back"> </i>
                                  </span>
                                    <h5 className="text-dark">
                                        Imtihon natijalari
                                    </h5>
                                </div>
                                <div className={'d-flex '}>
                                    <button className="btn btn-light mx-1" onClick={handlePrint}>Natijalarni chop
                                        qilish <i
                                            className="fa fa-print"></i></button>
                                    <ReactToPrint
                                        trigger={() => {
                                            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                            // to the root node of the returned component as it will be overwritten.
                                            return <button className="btn btn-light" onClick={handlePrint}>Bayonnoma
                                                chop qilish <i
                                                    className="fa fa-print"></i></button>;
                                        }}
                                        content={() => printReportRef}
                                    />

                                </div>

                            </div>
                            <div className="crypto-buy-sell-nav mt-3 p-3" ref={componentRef}>
                                {
                                    isloading ? <DataLoader/>
                                        :
                                        <>
                                            <Row className={' w-100 justify-content-center'}>
                                                <h4>
                                                    {stateMy?.student_fio}
                                                </h4>
                                            </Row>
                                            <Row className="d-flex justify-content-between">
                                                <Col xl={6}>
                                                    Savollar soni: <b>{data?.length}</b>
                                                </Col>
                                                <Col xl={6}>
                                                    To'g'ri javoblar soni: <b>{corrects}</b>
                                                </Col>
                                                <Col xl={6}>
                                                    Noto'g'ri javoblar soni: <b>{incorrects}</b>
                                                </Col>
                                                <Col xl={6}>
                                                    Belgilanmagan javoblar soni: <b>{nocheckeds}</b>
                                                </Col>
                                            </Row>
                                            <Row className="mt-3">
                                                {
                                                    data &&
                                                    data?.map((element, index) => {
                                                        return (
                                                            <Col xl={24} className="border p-3 mt-2 mb-2 hover-shadow"
                                                                 key={index}>
                                                                <div>
                                                                    <Badge
                                                                        color={
                                                                            element.result == "1" ? "success" : element?.result == '0' ? "danger" : "secondary"
                                                                        }
                                                                        className="py-1 px-2 badge badge-pill"
                                                                    >
                                                                        {element.result == "1" ? " To`g`ri " : element?.result == '0' ? "Noto`g`ri" : "Belgilanmagan"}
                                                                    </Badge>
                                                                </div>
                                                                <div>
                                                                    {index + 1})
                                                                    {
                                                                        element?.question?.body &&
                                                                        Object.entries(element?.question?.body)?.map(([key, question_b]) => {
                                                                            return (
                                                                                <>
                                                                                    {
                                                                                        question_b?.type == 1 ?
                                                                                            <span>{question_b?.value}</span> : question_b?.type == 2 ?
                                                                                            <> <br/> <img style={{
                                                                                                width: '200px',
                                                                                                height: 'auto'
                                                                                            }}
                                                                                                          src={`${PATH_PREFIX_INTALIM_TEST_FILES}` + question_b?.value}
                                                                                                          alt=""/> </> : ''
                                                                                    }
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                                <div className="w-100 mt-2 ">
                                                                    <p>Javoblar:</p>
                                                                    {
                                                                        Object.entries(element?.answers)?.map(([key_answer, value_answer]) => {
                                                                            return (
                                                                                <div className="p-3 border"
                                                                                     style={{backgroundColor: value_answer?.bg_color}}>

                                                                                    {
                                                                                        Object.entries(value_answer?.body)?.map(([key_body_answer, value_body_answer]) => {
                                                                                            return (
                                                                                                <>
                                                                                                    {value_body_answer?.value}
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>


                                                            </Col>
                                                        )
                                                    })
                                                }

                                            </Row>
                                        </>

                                }

                            </div>
                        </CardBody>
                    </Card>
                </Container>
                <div className={'print-box'} ref={(elem) => printReportRef = elem}>
                    <PrintReportByStudent selectedStudent={student}/>
                </div>
            </div>
        </>
    );
};

export default withTranslation()(ExamResultStudentShow);
