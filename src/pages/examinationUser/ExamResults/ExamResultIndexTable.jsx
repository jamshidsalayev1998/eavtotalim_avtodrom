import React, {useState, useRef} from "react";
import {withTranslation} from "react-i18next";
import {Table, Popconfirm, message, Tooltip} from "antd";
import {Link} from "react-router-dom";
import moment from "moment";
import {Badge} from "reactstrap";
import PrintReportByStudent from "./print/PrintReportByStudent";
import "./print/print.css"
import ReactToPrint from "react-to-print";
import {sendStudentResultBySms} from "../../../services/api_services/send_student_result_by_sms_api";

const ExamResultIndexTable = ({tableData, reload, setreload}) => {
    const [selectedStudentForReport, setSelectedStudentForReport] = useState(undefined)

    const sendTestResult = (student) => {
        (async () => {
            let data = new FormData();
            data.append('student_id', student?.id);
            const res = await sendStudentResultBySms(data);
            if (res?.status == 1) {
                message.success(res?.message);
            }
            if (res?.status == 0) {
                message.error(res?.message);
            }
            setreload(!reload)

        })()
    }
    let printReportRef = useRef();
    const columns = [
        {
            title: 'F.I.O',
            dataIndex: 'student_fio',
            key: 'student_fio',
            render: (text, row) => <Link to={{
                pathname: `/examination/result-groups/${row?.final_test_student_attempt?.id}`,
                state: {
                    student_fio: row?.student_fio
                }
            }}>{row?.student_fio}</Link>,
        },
        {
            title: 'Passport',
            dataIndex: 'student_passpt',
            render: (text, row) => <>{row?.student_passport}</>,
        },
        {
            title: 'Telefon',
            dataIndex: 'student_phone',
            key: 'student_phone',
            render: (text, row) => <>{row?.student_phone}</>,
        },
        {
            title: 'To`g`ri javoblar',
            render: (text, row) => <>{row?.final_test_student_attempt?.correct_answers}</>,
        },
        {
            title: 'Noto`g`ri javoblar',
            render: (text, row) => <>{row?.final_test_student_attempt?.incorrect_answers}</>,
        },
        {
            title: 'Test yechilgan sana',
            render: (text, row) => <>{moment(row?.final_test_student_attempt?.created_at).format('YYYY-MM-DD HH:mm:ss')}</>
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
            title: 'Sms bayonnoma',
            className: 'text-center',
            render: (index, element) => <>{!parseInt(element?.sms_sended) ? <> <Popconfirm
                    onConfirm={() => sendTestResult(element)}
                    title={'Test natijasi haqidagi habar jo`natilsinmi'} placement={'topLeft'}><span
                    style={{cursor: 'pointer', color: 'green'}}> <i
                    className={'fa fa-envelope'}></i> </span></Popconfirm> </> :
                <Tooltip placement="left" title={'Jo`natilgan'}><span> <i
                    className={'fa fa-envelope'}></i> </span></Tooltip>}</>
        }
        // {
        //     title: 'Bayonnoma',
        //     render: (index, element) => <>
        //
        //         <ReactToPrint
        //             onBeforePrint={async () => {
        //                 console.log('triger', element)
        //                      await selectStudent(element)
        //                 }
        //             }
        //
        //             trigger={() => {
        //                 // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
        //                 // to the root node of the returned component as it will be overwritten.
        //                 return <span><i className={'fa fa-print'}></i></span>;
        //             }}
        //             content={() => printReportRef}
        //         />
        //     </>
        // }


    ];


    const data = tableData;
    const selectStudent = async (student) => {
        setSelectedStudentForReport(student);
    }
    return (
        <>
            <Table bordered={true} columns={columns} dataSource={data} pagination={false}/>
            <div className={'print-box'} ref={(elem) => printReportRef = elem}>
                <PrintReportByStudent selectedStudent={selectedStudentForReport}/>
            </div>
        </>
    );
};

export default withTranslation()(ExamResultIndexTable);
