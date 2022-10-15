import React, {useState, useEffect} from "react";
import {useHistory, useRouteMatch} from "react-router";
import {getExaminationAreaSensorsForInstructor} from "../../../../../services/api_services/examination_area_instructor";
import {PATH_PREFIX_FILE} from "../../../../../Utils/AppVariables";
import {
    getStudentPracticalExamResult,
    getStudentPracticalExamResultByRecord
} from "../../../../../services/api_services/student_practical_exam_result";
import "./showPracticalExamResultStyle.css"
import {Card, CardBody, Container, Badge} from "reactstrap";
import {Button, Col, Row} from "antd";

const ShowPracticalExamResultByRecord = (props) => {
    console.log('props', props);
    const match = useRouteMatch('/examination-instructor/final-exam-results-by-record/:id')
    const [data, setData] = useState([]);
    const [resultData, setResultData] = useState();
    const [reloader, setReloader] = useState(true);
    useEffect(() => {
        (async () => {
            let filters = [{
                fieldKey: 'edu_type_id',
                value: props?.location?.state?.edu_type_id
            }];
            let params = {
                filters: JSON.stringify(filters)
            }
            const res = await getExaminationAreaSensorsForInstructor(params);
            if (res?.data?.status == 1) {
                setData(res?.data?.data);
            }
            getPracticalResult();
        })()
            getPracticalResult()
    }, [])

    const getPracticalResult = () => {
        (async () => {
            const res2 = await getStudentPracticalExamResultByRecord(match?.params?.id);
            if (res2?.data?.status == 1) {
                setResultData(res2?.data?.data)
            }
        })()
    }

    console.log('resData', resultData?.practical_result[15]);
    const history = useHistory();
    const getResult = (elementId) => {
        let fdata = resultData?.practical_result?.filter((data) => {
            return data?.sensor_id == elementId
        })
        if (fdata[0]?.result) {
            return 1
        } else {
            return 0
        }
    }
    const getPenalties = (elementId) => {
        let fdata = resultData?.practical_result_penalties?.filter((data) => {
            return data?.sensor_id == elementId
        })
        return fdata;
    }
    const hasResult = (elementId) => {
        let fdata = resultData?.practical_result?.filter((data) => {
            return data?.sensor_id == elementId
        })
        if (fdata?.length > 0) {
            return 1;
        } else {
            return 0;
        }
    }
    return (
        <div className="page-content">
            <Container fluid>
                <Card>
                    <CardBody>
                        <div className="top-organizations d-flex justify-content-between">
                            <h5 className="text-dark">{resultData?.student_fio}</h5>
                            <div className={'d-flex'}>
                                {/*<button className={'btn btn-outline-success'} onClick={showAddModal}><i*/}
                                {/*    className={'fa fa-plus'}></i> Qo`shish*/}
                                {/*</button>*/}
                            </div>
                        </div>
                        <div className="crypto-buy-sell-nav mt-3">
                            <Row className={'justify-content-between border p-3 '}>
                                <Col xl={8} md={12} sm={24} className={'text-center'}>
                                    Ta'lim turi: <b>{resultData?.edu_type?.short_name_uz}</b>
                                </Col>
                                <Col xl={8} md={12} sm={24} className={'text-center'}>
                                    Passport: <b>{resultData?.student_passport}</b>
                                </Col>
                                <Col xl={8} md={12} sm={24} className={'text-center'}>
                                    Jarima bali: <b>{resultData?.thisRecord?.penalty_ball?resultData?.thisRecord?.penalty_ball:0}</b>
                                </Col>
                                <Col xl={8} md={12} sm={24} className={'text-center'}>
                                    Avtomobil nomi: <b>{resultData?.merged_data?.examination_car?.name}</b>
                                </Col>
                                <Col xl={8} md={12} sm={24} className={'text-center'}>
                                    Avtomobil raqami: <b>{resultData?.merged_data?.examination_car?.number}</b>
                                </Col>
                                <Col xl={8} md={12} sm={24} className={'text-center'}>
                                    Avtomobil gps raqami: <b>{resultData?.merged_data?.examination_car?.gps_id}</b>
                                </Col>
                            </Row>
                            <Row className={'p-3 border'}>
                                {
                                    data?.map((element, index) => {
                                        return (
                                            <Col xl={12} md={24}
                                                 className={`d-flex border p-3 ${hasResult(element?.sensor_id) ? getResult(element?.sensor_id) ? 'success-sensor' : 'danger-sensor' : 'warning-sensor'}`}

                                            >
                                                <Row className={'w-100 justify-content-between'}>
                                                    <Col xl={18} md={18} className={'d-flex '}>
                                                        <div style={{width:'33%'}}>
                                                            <img style={{width: '100%'}}
                                                                 src={PATH_PREFIX_FILE + element?.image}
                                                                 alt=""/>

                                                        </div>
                                                        <div style={{width:'66%'}}>
                                                            <div className={'d-flex'}>
                                                                <h4>{element?.name}</h4>
                                                            </div>
                                                            <div style={{
                                                                overflow: 'hidden',
                                                                overflowY: 'scroll',
                                                                maxHeight: '100px'
                                                            }} className={'w-100 '}>
                                                                {
                                                                    getPenalties(element?.sensor_id)?.map((elPEnalty, indexPenalty) => {
                                                                        return (
                                                                            <div>{elPEnalty?.examination_area_sensor_penalty?.name} uchun
                                                                                - {elPEnalty?.examination_area_sensor_penalty?.penalty_ball} jarima
                                                                                bali</div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>

                                                        </div>
                                                    </Col>
                                                    <Col xl={6} md={6}>

                                                        <div className={'p-1 w-100 text-center border '}>
                                                            <h1>{index+1}</h1>
                                                        </div>
                                                        <div className={'p-1 w-100 text-center border '}>
                                                            <b>{hasResult(element?.sensor_id) ? getResult(element?.sensor_id) ? 'TOPSHIRDI' : 'TOPSHIRMADI' : 'KUTILMOQDA'}</b>
                                                        </div>
                                                        <span className={'w-100 '}>sensor: {element?.sensor_id}</span>
                                                    </Col>

                                                </Row>


                                            </Col>

                                        )
                                    })}
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default (ShowPracticalExamResultByRecord)