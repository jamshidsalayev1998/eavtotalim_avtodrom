import React, {useContext, useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import {Table, Row, Col, Card, Tooltip, Skeleton, message, Popconfirm, notification} from "antd";
import {CardBody, Container,} from "reactstrap";
import {computerTestEndApi, getExamProcessComputers} from "../../../../../services/api_services/final_test_admin_api";
import {
    changeComputerApi,
    clearComputerApi,
    pauseComputerApi
} from "../../../../../services/api_services/computers_api";
import {socketParam} from "../../../../../App";
import MainContext from "../../../../../Context/MainContext";

const ExamProcessByComputerTab = (props) => {
    const {reload, setReload} = props;
    const [data, setData] = useState([]);
    const mainContext = useContext(MainContext);
    // console.log('uy' , context);
    const eventName = 'examination_area_event_' + mainContext?.profession?.examination_area_id;
    const refresh = () => {
        setReload(!reload);
    };
    const openNotification = (description, message, result) => {
        if (parseInt(result)) {
            notification.success({
                message: message,
                description: description,
            });
        } else {
            notification.error({
                message: message,
                description: description,
            });
        }
    };
    useEffect(() => {
        (async () => {
            const resp = await getExamProcessComputers();
            setData(resp?.data)
            console.log('change dan oldin', resp?.data)
        })();

    }, [reload]);
    useEffect(() => {
        if (parseInt(mainContext?.profession?.examination_area_id) && data.length) {
            console.log('eventName', eventName);
            socketParam.on(eventName, (dataSocket) => {
                openNotification(dataSocket?.message, dataSocket?.userName, dataSocket?.test_result);
                console.log('bundan oldin', data);
                const newState = data.map((obj, index) => {
                    if (parseInt(obj.id) === parseInt(dataSocket?.computer_id)) {
                        return {...obj, merge: null};
                    }
                    return obj;
                });
                setData(newState);
                console.log('change dan keyin', newState);
                console.log('keldi', dataSocket)
            });
            return () => {
                socketParam.off(eventName);
            }
        }
    }, [mainContext?.profession?.examination_area_id, data]);
    const clearComputer = (computer) => {
        (async () => {
            const res = await clearComputerApi(computer?.id);
            if (parseInt(res?.status) === 1) {
                message.success(res?.message);
                setReload(!reload)
            }
        })()
    };
    const changeRandomComputer = (computer) => {
        (async () => {
            const res = await changeComputerApi(computer?.id);
            if (parseInt(res?.status) === 1) {
                message.success(res?.message);
                setReload(!reload)
            }
        })()
    };
    const computerEndTest = (final_access_student_id) => {
        (async () => {
            const res = await computerTestEndApi(final_access_student_id);
            if (parseInt(res?.status) === 1) {
                message.success(res?.message);
                setReload(!reload)
            } else {
                message.error(res?.message);

            }
        })()
    }
    const columns = [
        {
            title: 'Tartib raqam',
            render: (index, row) => <>{row?.order}</>
        },
        {
            title: 'F.I.O',
            render: (index, row) => <>{row?.merge?.final_access_student?.student_fio}</>
        },
        {
            title: 'Passport',
            render: (index, row) => <>{row?.merge?.final_access_student?.student_passport}</>
        },
        {
            title: 'Amallar',
            children: [
                {
                    title: "Bo'shatish",
                    className:'text-center',
                    render: (index, element) =>
                        <Tooltip placement={'bottom'} title={'Bo`shatish'}>
                            {
                                element?.merge ?
                                    <Popconfirm title={'Kompyuterni bo`shatasizmi ?'}
                                                okText={'Bo`shatish'} cancelText={'Bekor qilish'}
                                                onConfirm={() => clearComputer(element)}>
                                                  <span style={{fontSize: '25px', color: '#52c41a'}}><i
                                                      className={'bx bxs-brush-alt'}/></span></Popconfirm> :
                                    <span style={{fontSize: '25px', color: '#faad14'}}><i
                                        className={'bx bxs-brush-alt'}/></span>
                            }

                        </Tooltip>
                },
                {
                    title: "Tugatish",
                    className:'text-center',
                    render: (index, element) =>
                        <Tooltip placement={'bottom'} title={'Testni tugatish'}>
                            {
                                element?.merge ?
                                    <Popconfirm title={'Testni tugatasizmi ?'} okText={'Tugatish'}
                                                cancelText={'Bekor qilish'}
                                                onConfirm={() => computerEndTest(element?.merge?.final_access_student?.id)}>
                                              <span style={{fontSize: '25px', color: '#f5222d'}}><i
                                                  className='bx bx-x'/></span>
                                    </Popconfirm>
                                    :
                                    <span style={{fontSize: '25px', color: '#f5222d'}}><i
                                        className='bx bx-x'/></span>
                            }
                        </Tooltip>
                },
                {
                    title: "Almashtirish",
                    className:'text-center',
                    render: (index, element) =>
                        <Tooltip placement={'bottom'} title={'Kompyuterni almashtirish'}>
                            {
                                element?.merge ?
                                    <Popconfirm title={'Kompyuterni almashtirasizmi ?'}
                                                okText={'Ozgartirish'}
                                                cancelText={'Bekor qilish'}
                                                onConfirm={() => changeRandomComputer(element)}>
                                              <span style={{fontSize: '25px', color: '#f5222d'}}><i
                                                  className='bx bx-refresh'/></span>
                                    </Popconfirm>
                                    :
                                    <span style={{fontSize: '25px', color: '#f5222d'}}><i
                                        className='bx bx-refresh'/></span>
                            }
                        </Tooltip>
                },
                {
                    title: "Vaqtincha to`xtatish",
                    className:'text-center',
                    render: (index, element) =>
                        <Tooltip placement={'bottom'} title={'Vaqtincha to`xtatish'}>
                            {
                                element?.merge ?
                                    <Popconfirm title={'Vaqtincha to`xtatilsinmi?'}
                                                okText={'To`xtatish'}
                                                cancelText={'Bekor qilish'}
                                                onConfirm={() => pauseComputer(element)}>
                                                      <span style={{fontSize: '25px', color: '#f5222d'}}><i
                                                          className='bx bx-pause-circle'/></span>
                                    </Popconfirm>
                                    :
                                    <span style={{fontSize: '25px', color: '#f5222d'}}><i
                                        className='bx bx-pause-circle'/></span>
                            }
                        </Tooltip>
                }
            ]
        }
    ]
    const pauseComputer = (computer) => {
        if (computer?.merge){
            (async () => {
                const responsePause = await pauseComputerApi(computer?.id);
                if (responsePause){
                    message.success('Vaqtincha to`xtatildi');
                    setReload(!reload);
                }
            })()
        }
    }
    return (
        <>

            <Row className={''} gutter={[12, 12]}>
                <Col xl={24}>
                    <Table dataSource={data} columns={columns} bordered={true} pagination={false}/>
                </Col>

            </Row>
        </>

    );
};
export default withTranslation()(ExamProcessByComputerTab);
