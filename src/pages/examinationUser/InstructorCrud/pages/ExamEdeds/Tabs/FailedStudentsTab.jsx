import React,{useState,useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {Table} from "antd"
import {getAllStudents} from "../../../../../../services/api_services/instructor_student_api";


const FailedStudentsTab = () => {

     const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [reload, setReload] = useState(false);
    const columns = [
        {
            title: 'F.I.O',
            render: (index, element) => <> <NavLink
                to={{
                    pathname:`/examination-instructor/exam-ended-students/${element?.id}`,
                    state:{
                        edu_type_id:element?.edu_type_id,
                        student_fio:element?.student_fio
                    }
                }}>{element?.student_fio}</NavLink> </>
        },
        {
            title: 'Pasport',
            dataIndex: 'student_passport',
        }
    ]
    useEffect(() => {
        setIsLoading(true);
        (async () => {
            let filters = [
                {
                    fieldKey: 'practical_exam_result',
                    value: '0'
                }
            ];
            let params = {
                'merged_status': 'ended',
                filters: JSON.stringify(filters)
            };
            const response = await getAllStudents(params);
            if (response?.data?.status == 1) {
                setData(response?.data?.data?.data);
            }
            if (response?.data?.status == 0) {
                message.error(response?.data?.message);
            }
            setIsLoading(false);
        })()
    }, [reload])
    const selectStudent = (element) => {
        setSelectedStudent(element);
        setIsModalVisible(true);
    }

    return (
        <>
            <Table pagination={false} dataSource={data} columns={columns}/>
        </>
    )
}
export default  FailedStudentsTab