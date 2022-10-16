import React, {useContext, useEffect, useState} from "react";
import {Card, CardBody, Container, Badge} from "reactstrap";
import {Col, Row} from "antd";
import {NavLink} from "react-router-dom";
import MainContext from "../../../../../Context/MainContext";
import {getMonitoringData, getMonitoringResultData} from "../../../../../services/api_services/instructor_student_api";
import {PATH_PREFIX_FILE} from "../../../../../Utils/AppVariables";

const InstructorMonitoringPage = (props) => {

    const [reload, setReload] = useState(false);
    const [studentSensorData, setStudentSensorData] = useState([]);
    const [studentResultData, setStudentResultData] = useState([]);
    useEffect(() => {
        getStudentSensorData();
        let intervalId = setInterval(() => {
            getStudentResultData();
        }, 3000);
        return (() => {
            clearInterval(intervalId)
        })
    }, [reload]);
    const getStudentSensorData = () => {
        (async () => {
            const response = await getMonitoringData();
            setStudentSensorData(response);

        })()
    };
    const getStudentResultData = () => {
            (async () => {
                const responseResult = await getMonitoringResultData();
                setStudentResultData(responseResult);
            })()
    };
    const [data, setData] = useState();
    const {hasLayout, setHasLayout} = useContext(MainContext);
    console.log(studentResultData[431]?.results)
    const hasResult = (studentId, elementId) => {
        let fdata = studentResultData[studentId]?.results?.filter((data) => {
            return data?.sensor_id == elementId
        });
        if (fdata?.length > 0) {
            return 1;
        } else {
            return 0;
        }
    };
    const getResult = (studentId, elementId) => {
        let fdata = studentResultData[studentId]?.results?.filter((data) => {
            return data?.sensor_id == elementId
        });
        if (fdata[0]?.result) {
            return 1;
        } else {
            return 0;
        }
    };
    return (
        <>
            <div className="page-content" style={!hasLayout ? {padding: '1px'} : {}}>
                <Container fluid style={!hasLayout ? {padding: '1px'} : {}}>
                    <Card>
                        <CardBody>
                            <Row className="d-flex justify-content-end">
                                <button className="btn btn-outline-light" onClick={() => {
                                    setHasLayout(!hasLayout) , setReload(!reload)
                                }}><i
                                    class={hasLayout ? `fa fa-expand` : `fa fa-compress`} aria-hidden="true"/>
                                </button>
                            </Row>
                            {
                                hasLayout ?
                                    <div className="top-organizations d-flex justify-content-between">
                                        <h5 className="text-dark">Monitoring sahifasi</h5>
                                        <div className={'d-flex'}>
                                        </div>
                                    </div> : ''
                            }

                            <div className="crypto-buy-sell-nav">
                                <Row className={''} gutter={[2, 2]}>
                                    {
                                        studentSensorData?.map((element, index) => {
                                            return (
                                                <Col xl={12} className={`border p-2 shadow`}>
                                                    <Row className={'justify-content-between'}>
                                                        <Col xl={6}>
                                                            <b>{element?.student_fio}</b>

                                                        </Col>
                                                        <Col xl={6}>
                                                            <b>{element?.student_passport}</b>

                                                        </Col>
                                                        <Col xl={6}>
                                                            <b>{element?.merged_data?.examination_car?.name}</b>

                                                        </Col>
                                                        <Col xl={6}>
                                                            <b>{element?.merged_data?.examination_car?.number}</b>

                                                        </Col>
                                                    </Row>
                                                    <Row gutter={[5, 5]}>
                                                        {
                                                            element?.sensors?.map((elementSensor, indexSensor) => {
                                                                return (
                                                                    <Col xl={6} md={6}
                                                                         className={`d-flex border shadow p-3 ${hasResult(element?.id, elementSensor?.sensor_id) ? getResult(element?.id, elementSensor?.sensor_id) ? 'success-sensor' : 'danger-sensor' : 'warning-sensor'}`}
                                                                    >
                                                                        <Row
                                                                            className={'w-100 justify-content-between'}>
                                                                            <Col xl={24} md={24} className={'d-flex '}>
                                                                                <div style={{width: '16%'}}>

                                                                                    <img style={{width: '100%'}}
                                                                                         src={PATH_PREFIX_FILE + elementSensor?.image}
                                                                                         alt=""/>
                                                                                </div>
                                                                                <div style={{width: '100%'}}>
                                                                                    <div className={'d-flex '}>
                                                                                        <b>
                                                                                            <h6>{elementSensor?.name}</h6>
                                                                                        </b>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                            <Col xl={24} md={24} className={'d-flex'}>
                                                                                <div
                                                                                    className={'p-1 w-100 text-center '}>
                                                                                    <b>{hasResult(element?.id, elementSensor?.sensor_id) ? getResult(element?.id, elementSensor?.sensor_id) ? 'TOPSHIRDI' : 'TOPSHIRMADI' : 'KUTILMOQDA'}</b>
                                                                                </div>

                                                                            </Col>
                                                                            <Col xl={24} md={24} className={'d-flex'}>
                                                                                <div
                                                                                    className={'p-1 w-100 text-center '}>
                                                                                    <h6>{elementSensor?.penalty_ball} ball</h6>
                                                                                </div>
                                                                                <span
                                                                                    className={'w-100 '}>sensor: {elementSensor?.sensor_id}</span>
                                                                            </Col>

                                                                        </Row>


                                                                    </Col>
                                                                )
                                                            })
                                                        }
                                                    </Row>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    )
};

export default (InstructorMonitoringPage);