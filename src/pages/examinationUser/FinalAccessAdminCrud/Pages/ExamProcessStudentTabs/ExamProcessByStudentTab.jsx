import React, {useContext, useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import {Table, Row, Col} from "antd";
import {Card, CardBody, Container,} from "reactstrap";
import {getExamProcessStudents} from "../../../../../services/api_services/final_test_admin_api";

const ExamProcessByStudentTab = (props) => {
    const {reload} = props;
    const [data, setData] = useState();
    useEffect(() => {
        (async () => {
            const filters = [
                {
                    fieldKey: 'status',
                    fieldOperator: '=',
                    fieldValue: '1'
                }
            ];
            const relations = ['computerMerge.computer'];
            const params = {
                filters: JSON.stringify(filters),
                relations: JSON.stringify(relations)
            };
            const resp = await getExamProcessStudents(params);
            setData(resp?.data?.data);
        })()
    }, [reload]);
    const columns = [
        {
            title: '#',
            render: (index, element, counter) => <>{counter + 1}</>
        },
        {
            title: 'F.I.O',
            render: (index, element) => <>{element?.student_fio}</>
        },
        {
            title: 'Kompyuter',
            render: (index, element) => <>{element?.computer_merge?.computer?.order}</>
        }
    ];

    return (
        <Table dataSource={data} columns={columns} pagination={true}/>
    );
};
export default withTranslation()(ExamProcessByStudentTab);
