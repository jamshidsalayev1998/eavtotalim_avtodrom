import React from "react";
import {withTranslation} from "react-i18next";
import {Table} from "antd";
import {Link} from "react-router-dom";

const PracticalExamResultIndexTable = ({tableData}) => {

    const columns = [
        {
            title: 'F.I.O',
            dataIndex: 'student_fio',
            key: 'student_fio',
            render: (text, row) => <Link
                to={{
                    pathname:`/examination/practical-exam-results/${row?.id}`,
                    state:{
                        fio: row?.final_access_student?.student_fio
                    }
                }}
            >{row?.final_access_student?.student_fio}</Link>,
        },
        {
            title: 'Passport',
            dataIndex: 'student_passpt',
            render: (text, row) => <>{row?.final_test_student_access?.student_passport}</>,
        },
        {
            title: 'Telefon',
            dataIndex: 'student_phone',
            key: 'student_phone',
            render: (text, row) => <>{row?.final_test_student_access?.student_phone}</>,
        },
        {
            title: 'To`g`ri javoblar',
            dataIndex: 'correct_answers',
            key: 'correct_answers',
        },
        {
            title: 'Noto`g`ri javoblar',
            dataIndex: 'incorrect_answers',
            key: 'incorrect_answers',
        },
        {
            title: 'Test yechilgan sana',
            dataIndex: 'date',
            key: 'date',
        },


    ];

    const data = tableData;


    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false}/>

        </>
    );
};

export default withTranslation()(PracticalExamResultIndexTable);
