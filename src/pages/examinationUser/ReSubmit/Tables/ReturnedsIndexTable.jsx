import React, {useState, useEffect} from "react";
import {Badge, Card, CardBody, Container,} from "reactstrap";
import {withTranslation} from "react-i18next";
import {
    Row,
    Col,
    Select,
    Input,
    Pagination,
    Tabs,
    message,
    Table,
    Modal,
    Form,
    Button,
    DatePicker,
    TimePicker,
    Popconfirm
} from "antd";
import axios from "axios";
import useDebounce from "../../../../components/CustomHooks/useDebounce";
import {PATH_PREFIX} from "../../../../Utils/AppVariables";
import moment from "moment";
import {sendStudentToResubmitAllResponse} from "../../../../services/api_services/send_student_to_resubmit";
import {useHistory} from "react-router";

const ReturnedsIndexTable = props => {
    const [addGroupForm] = Form.useForm();
    const {TabPane} = Tabs;
    const {Option} = Select;
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState([]);
    const [filter_org_id, setfilter_org_id] = useState('all');
    const [isloading, setIsloading] = useState(false);
    const [word, setword] = useState('');
    const [page, setpage] = useState(1);
    const [total, settotal] = useState(0);
    const [show_count, setshow_count] = useState(10);
    const [reload, setreload] = useState(false);
    const [selecteds, setSelecteds] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [params, setParams] = useState({
        word: '',
        page: 1
    })
    const wait_word = useDebounce(params.word, 800);
    const history = useHistory();


    useEffect(() => {
        const token = localStorage.getItem('token');
        axios({
            url: PATH_PREFIX + '/examination-director/resubmit/returneds-index',
            method: 'GET',
            params: {
                token
            }
        }).then(res => {
            if (res?.data?.status == 0) {
                message.error(res?.data?.message);
            }
            if (res?.data?.status == 1) {
                setData(res?.data?.data)
            }
        })
    }, [filter_org_id, reload, wait_word]);

    const select_page = (value) => {
        setpage(value);
        setParams({...params, page: value})
        setreload(!reload)
    }

    const change_search = (value) => {
        setword(value);
        setParams({...params, word: value, page: 1});
    }
    const show_count_change = (value) => {
        setshow_count(value);
        setreload(!reload);
    }

    const columns = [
        {
            title: '#',
            key: 'counter',
            render: (index, row, counter) => <>{counter + 1}</>
        },
        {
            title: 'F.I.O',
            key: 'name',
            render: (index, row, counter) => <>{row?.student_fio}</>
        },
        {
            title: 'Phone',
            key: 'phone',
            render: (index, row, counter) => <>{row?.student_phone}</>
        },
        {
            title: 'Passport',
            key: 'passport',
            render: (index, row, counter) => <>{row?.student_passport}</>
        },
        {
            title: 'Natija',
            children: [
                {
                    title: 'Nazariy',
                    render: (index, row, counter) => <>{
                        row?.final_access_student?.exam_result == '0' ?
                            <Badge color={'danger'}>Yiqilgan</Badge> :
                            row?.final_access_student?.exam_result == '1' ?
                                <Badge color={'success'}>O`tgan</Badge> :
                                <Badge color={'warning'}>Topshirmagan</Badge>
                    }
                    </>
                },
                {
                    title: 'Amaliy',
                    render: (index, row, counter) => <>
                        {
                            row?.final_access_student?.practical_exam_result == '0' ?
                                <Badge color={'danger'}>Yiqilgan</Badge> :
                                row?.final_access_student?.practical_exam_result == '1' ?
                                    <Badge color={'success'}>O`tgan</Badge> :
                                    <Badge color={'warning'}>Topshirmagan</Badge>
                        }
                    </>
                }
            ]

        },
        {
            title: 'Qayta topshirishga rasmiylashtirish',
            render: (index, row, counter) => <><Popconfirm placement={'top'}
                                                           title={'Qayta topshirishga rasmiylashtirilsinmi ?'}
                                                           onConfirm={() => sendStudentToResubmitAllResponse(row?.final_access_student?.id).then(response => {
                                                               if (response) {
                                                                   history.push('/examination-administrator/all-students')
                                                               }
                                                           })}>
                <button className={'btn btn-outline-warning'}>Qayta topshirishga rasmiylashtirish</button>
            </Popconfirm></>
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelecteds(selectedRowKeys);
            console.log('dd', selectedRowKeys)
        },
    };
    const handleOk = () => {
        addGroupForm.submit();
    }
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const addToGroup = () => {
        setIsModalVisible(true)
    }
    const onFinish = (values) => {
        const token = localStorage.getItem('token');
        const form_data = new FormData();
        form_data.append('selecteds', selecteds);
        Object.entries(values).map(([k, v]) => {
            form_data.append(k, v);

        })
        axios({
            url: PATH_PREFIX + '/examination-director/resubmit/add-group-and-accept',
            method: 'POST',
            params: {
                token
            },
            data: form_data
        }).then(res => {
            if (res?.data?.status == 1) {
                message.success(res?.data?.message);
                addGroupForm.resetFields();
                handleCancel();
                setreload(!reload)
            }
            if (res?.data?.status == 0) {
                message.error(res?.data?.message);
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Modal title={`Qayta topshiruvchilarni guruhlash (${selecteds?.length} ta o'quvchi)`}

                   zIndex={1005}
                   visible={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   cancelText='Bekor qilish'
                   okText='Saqlash'
            >
                <Row>
                    <Col xl={24}>
                        <Form
                            form={addGroupForm}
                            name="basic"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Kelish sanasi"
                                name="access_start_date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Kelish sanasini kiriting!',
                                    },
                                ]}
                            >
                                <DatePicker className="w-100"/>
                            </Form.Item>
                            <Form.Item
                                label="Kelish vaqti (dan)"
                                name="access_start_time"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Kelish sanasini kiriting!',
                                    },
                                ]}
                            >
                                <TimePicker className="w-100" defaultOpenValue={moment('08:00:00', 'HH:mm:ss')}/>
                            </Form.Item>
                            <Form.Item
                                label="Kelish vaqti (gacha)"
                                name="access_end_time"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Kelish sanasini kiriting!',
                                    },
                                ]}
                            >
                                <TimePicker className="w-100" defaultOpenValue={moment('08:00:00', 'HH:mm:ss')}/>
                            </Form.Item>
                            <Form.Item
                                label="Guruh nomi"
                                name="group_name"
                            >
                                <Input allowClear={true}/>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
            <Row>
                <Col xl={24} className="d-flex justify-content-end">
                    {/*<button disabled={selecteds?.length > 0 ? false : true} onClick={addToGroup}*/}
                    {/*        className="btn btn-outline-success">Guruhlash*/}
                    {/*</button>*/}
                </Col>
                <Col xl={24}>
                    <Table
                        bordered={true}
                        // rowSelection={{
                        //     type: 'checkbox',
                        //     ...rowSelection,
                        // }}
                        columns={columns}
                        dataSource={data}
                        rowKey={'id'}
                    />
                </Col>
            </Row>

        </>
    )
        ;
};

export default withTranslation()(ReturnedsIndexTable);
