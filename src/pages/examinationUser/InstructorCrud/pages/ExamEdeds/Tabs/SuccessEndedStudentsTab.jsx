import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {Table, Popover, Row, Col, Input} from "antd"
import {getAllStudents} from "../../../../../../services/api_services/instructor_student_api";
import {Badge} from "reactstrap";
import useDebounce from "../../../../../../components/CustomHooks/useDebounce";


const SuccessEndedStudentsTab = () => {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [reload, setReload] = useState(false);
    const [word, setWord] = useState('');
    const waitWord = useDebounce(word, 1000)

    function changeWord(word) {
        setWord(word);
    }

    const columns = [
        {
            title: 'F.I.O',
            render: (index, element) => <> {element?.student_fio} </>
        },
        {
            title: 'Pasport',
            dataIndex: 'student_passport',
        },
        {
            title: 'Natijalar',
            render: (index, element) => <div>
                {
                    element?.final_practical_test_records ? element?.final_practical_test_records?.map((elementMap) => {
                        return (
                            <Popover content={
                                <div>
                                    <div>Avtomobil: <b>{elementMap?.examination_area_car?.name} - {elementMap?.examination_area_car?.number}</b>
                                    </div>
                                    <div>Jarima bali: <b>{elementMap?.penalty_ball ? elementMap?.penalty_ball : 0}</b>
                                    </div>
                                    <div>Natija: <b>{parseInt(elementMap?.result) === 1 ?
                                        <Badge color={'success'}>O`tgan</Badge> : parseInt(elementMap?.result) === 0 ?
                                            <Badge color={'danger'}>Yiqilgan</Badge> :
                                            <Badge color={'warning'}>Topshirmagan</Badge>}</b></div>
                                </div>
                            } title="">
                                <NavLink
                                    to={{
                                        pathname: `/examination-instructor/final-exam-results-by-record/${elementMap?.id}`,
                                        state: {
                                            edu_type_id: elementMap?.examination_area_car?.edu_type_id,
                                            student_fio: element?.student_fio
                                        }
                                    }}>
                                    <div style={{cursor: 'pointer'}}
                                         className={`hover-result-box border p-1 hover rounded ${parseInt(elementMap?.result) === 1 ? `bg-success-box` : parseInt(elementMap?.result) === 0 ? `bg-danger-box` : `bg-warning-box`}`}>{elementMap?.examination_area_car?.name} - {elementMap?.examination_area_car?.number}</div>

                                </NavLink>
                            </Popover>
                        )
                    }) : ''
                }
            </div>
        },
    ]
    useEffect(() => {
        setIsLoading(true);
        (async () => {
            let filters = [
                {
                    fieldKey: 'practical_exam_general_status',
                    fieldOperator: '>=',
                    value: '1'
                }
            ];
            if (word != '') {
                filters.push({
                    fieldKey: 'student_fio',
                    fieldOperator: 'LIKE',
                    value: '%' + word + '%'
                })
            }
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
    }, [reload, waitWord])
    const selectStudent = (element) => {
        setSelectedStudent(element);
        setIsModalVisible(true);
    }

    return (
        <>
            <Row className={'justify-content-end'}>
                <Col xl={6}>
                    <Input allowClear={true} onChange={e => changeWord(e?.target?.value)}/>
                </Col>
            </Row>
            <Row>
                <Col xl={24}>
                    <Table bordered={true} pagination={true} dataSource={data} columns={columns}/>
                </Col>
            </Row>
        </>
    )
};
export default SuccessEndedStudentsTab
