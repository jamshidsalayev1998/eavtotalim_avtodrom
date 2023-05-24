import React, {useContext, useEffect, useState} from "react";
import "./print.css"
import {getOrganization} from "../../../../services/api_services/organization";
import {Row, Col} from "antd"
import {
    getExaminationAreaComissions,
    getExaminationAreaConfig
} from "../../../../services/api_services/examination_area_config_api";
import {getReportByStudent} from "../../../../services/api_services/examination_user_api";
import moment from "moment";
import QRCode from "qrcode";
import MainContext from "../../../../Context/MainContext";

const PrintReportByDay = (props) => {
    const {statusPrint, fromDate, toDate, reload, intervalDate} = props
    const [examinationAreaInfo, setExaminationAreaInfo] = useState();
    const [qrCodeSrc, setQrCodeSrc] = useState();
    const [data, setData] = useState();
    const examinationAreaId = useContext(MainContext);
    const [comissions, setComissions] = useState([]);
    const sliceIntoChunks = (arr, chunkSize) => {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    };
    useEffect(() => {
        (async () => {
            const response = await getExaminationAreaConfig({});
            if (response) {
                setExaminationAreaInfo(response)
                QRCode.toDataURL(response?.name + ' | ' + moment().format('YYYY-MM-DD')).then(res => {
                    setQrCodeSrc(res)
                });
            }
        })()
    }, []);
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            let params = {
                status_filter: statusPrint,
                token,
                show_count: 'all',
                page: 1,
                from_date: toDate,
                to_date: toDate
            };
            const response = await getReportByStudent(params);
            let resSlice = sliceIntoChunks(response?.data?.data?.data, 40);
            setData(resSlice);
            getComissions();

        })()
    }, [toDate]);

    const getComissions = () => {
        (async () => {
            const response = await getExaminationAreaComissions({"date":toDate});
            setComissions(response);
        })();
    }


    return (

        <>
            {
                data ? data?.map((elementParent, indexParent) => {
                    return (
                        <div className={'pl-4 pr-4 pt-4'}>
                            {
                                indexParent ? <div className={'page-break p-5'}></div> : ''
                            }
                            <Row className={'justify-content-center mt-3'}>
                                <h4>Bayonnoma</h4>
                            </Row>
                            <Row className={'justify-content-between'}>
                                <h4>{examinationAreaInfo?.name}</h4>
                                <h4>
                                    {toDate}
                                </h4>
                            </Row>
                            <Row>

                                <div className={'w-100'}>
                                    <table className="blueTable">
                                        <thead>
                                        <tr>
                                            <th rowSpan={2}>№</th>
                                            <th rowSpan={2}>Imtihon topshiruvchining familiyasi, ismi, otasining ismi
                                            </th>
                                            <th rowSpan={2}>Qaysi toifaga</th>
                                            <th colSpan={2}>Nazariy</th>
                                            <th colSpan={2}>Amaliy</th>
                                            <th rowSpan={2}>Natija</th>
                                            <th rowSpan={2}>Sana</th>
                                        </tr>
                                        <tr>
                                            <th>Nechanchi marta</th>
                                            <th>Natija (to'g'ri * noto'g'ri)</th>
                                            <th>Nechanchi marta</th>
                                            <th>Natija (ball)</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            elementParent ? elementParent?.map((element, index) => {
                                                return (
                                                    <tr>
                                                        <td className={'text-center'}>{index + 1}</td>
                                                        <td>{element?.student_fio}</td>
                                                        <td>{element?.edu_type?.short_name_uz}</td>
                                                        <td className={'text-center'}>{element?.type_of_exam === 'practical' ? 'Topshirmaydi' : element?.attempts_count}</td>
                                                        <td className={'text-center'}>
                                                            {element?.type_of_exam === 'practical' ? 'Topshirmaydi' :
                                                                <>
                                                                    {element?.exam_result} ({element?.final_test_student_attempt?.correct_answers} * {element?.final_test_student_attempt?.incorrect_answers})
                                                                </>
                                                            }
                                                        </td>
                                                        <td className={'text-center'}>{parseInt(element?.exam_result) === 1 ? element?.practical_attempts_count : '---'}</td>
                                                        <td className={'text-center'}>
                                                            {
                                                                parseInt(element?.exam_result) === 1 ?
                                                                    <>
                                                                        {element?.practical_exam_result ? element?.practical_exam_result : 0} ({element?.final_practical_test_last_record?.penalty_ball})
                                                                    </> : '---'
                                                            }
                                                        </td>
                                                        <td className={'text-center'}>{
                                                            parseInt(element?.practical_exam_result) && parseInt(element?.exam_result) === 1 ? '1' : '0'
                                                        }</td>
                                                        <td className={'text-center'}>2022-07-20</td>
                                                    </tr>
                                                )
                                            }) : ''
                                        }

                                        </tbody>
                                    </table>
                                </div>

                            </Row>
                            <Row className={'mt-5'}>
                                <Col xl={20} style={{width: '80%'}}>
                                    <div className={'w-100 '}>
                                        <h4>Komissiya raisi: {comissions?.super?.fio} ____________</h4>
                                    </div>
                                    <div className={'w-100 mt-5'}>
                                        <h4>Komissiya a'zolari: </h4> <br/>
                                        {
                                            comissions?.simples?.map((element) => {
                                                return (
                                                    <>
                                                        <h4>{element?.fio} ___________</h4>
                                                        <br/>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </Col>
                                <Col xl={4} style={{width: '20%'}}
                                     className={'d-flex justify-content-end text-align-right'}>

                                    <img src={qrCodeSrc} alt=""/>
                                </Col>
                            </Row>
                            <Row>
                            </Row>
                        </div>
                    )
                }) : ''
            }

        </>
    )
}

export default PrintReportByDay