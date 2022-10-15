import React, {useContext} from "react";
import {withTranslation} from "react-i18next";
import {Table} from "antd";
import {Link} from "react-router-dom";
import {Badge} from "reactstrap";
import Pusher from "pusher-js";
import MainContext from "../../../Context/MainContext";

const DisplayPageIndexTable = ({tableData}) => {

    const columns = [
        {
            title: 'F.I.O',
            dataIndex: 'student_fio',
            key: 'student_fio',
            render: (text, row) => <> {row?.student_fio} </>,
        },
        {
            title: 'To`g`ri javoblar',
            dataIndex: 'correct_answers',
            key: 'correct_answers',
            className: 'text-center',
        },
        {
            title: 'Noto`g`ri javoblar',
            dataIndex: 'incorrect_answers',
            key: 'incorrect_answers',
            className: 'text-center',
        },
        {
            title: 'Belgilanmagan javoblar',
            className: 'text-center',
            render: (index,row) => <>{20-(row?.correct_answers+row?.incorrect_answers)}</>
        },
        {
            title: 'Nazariy',
            key: 'incorrect_answers',
            className: 'text-center',
            render: (text, row) => <>
                <Badge color={row?.final_access_student?.exam_result == 0 ? `danger` : row?.final_access_student?.exam_result == 1 ? `success` : `warning`}
                       style={{fontSize: '22px'}}><i className={row?.final_access_student?.exam_result == 0 ? 'fa fa-times':row?.exam_result == 1 ? 'fa fa-check' :'fa fa-clock'}></i></Badge>
            </>
        },
        {
            title: 'Amaliy',
            key: 'incorrect_answers',
            className: 'text-center',
            render: (text, row) => <>
                 <Badge color={row?.practical_exam_result == 0 ? `danger` : row?.practical_exam_result == 1 ? `success` : `warning`}
                       style={{fontSize: '22px'}}><i className={row?.practical_exam_result == 0 ? 'fa fa-times':row?.practical_exam_result == 1 ? 'fa fa-check' :'fa fa-clock'}></i></Badge>
            </>
        },

    ];

    const {additional} = useContext(MainContext);

    const data = tableData;
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false}/>

        </>
    );
};

export default withTranslation()(DisplayPageIndexTable);
