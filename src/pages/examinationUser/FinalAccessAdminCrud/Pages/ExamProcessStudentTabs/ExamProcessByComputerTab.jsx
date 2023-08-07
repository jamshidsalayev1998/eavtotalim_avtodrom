import React, {useContext, useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import {
    Table,
    Row,
    Col,
    Tooltip,
    message,
    Popconfirm,
    notification,
    Badge,
} from "antd";
import {
    computerTestEndApi,
    getExamProcessComputers,
    getRealTimeExamProcess,
} from "../../../../../services/api_services/final_test_admin_api";
import {
    changeComputerApi,
    clearComputerApi,
    pauseComputerApi,
} from "../../../../../services/api_services/computers_api";
import {socketParam} from "../../../../../App";
import MainContext from "../../../../../Context/MainContext";
import {RiComputerLine} from "react-icons/ri";
import {
    AiOutlinePauseCircle,
    AiOutlinePlayCircle,
    AiOutlineStop,
} from "react-icons/ai";
import {TfiExchangeVertical} from "react-icons/tfi";

const ExamProcessByComputerTab = props => {
    const {reload, setReload} = props;
    const [data, setData] = useState([]);
    const [realTimeData, setRealTimeData] = useState([]);
    const mainContext = useContext(MainContext);

    const eventName =
        "examination_area_event_" + mainContext?.profession?.examination_area_id;
    const real_time_exam_result =
        "real_time_exam_" + mainContext?.profession?.examination_area_id;

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
            setData(resp?.data);
        })();
    }, [reload]);

    useEffect(() => {
        if (parseInt(mainContext?.profession?.examination_area_id) && data.length) {
            socketParam.on(eventName, dataSocket => {
                openNotification(
                    dataSocket?.message,
                    dataSocket?.userName,
                    dataSocket?.test_result
                );
                const newState = data.map((obj, index) => {
                    if (parseInt(obj.id) === parseInt(dataSocket?.computer_id)) {
                        return {...obj, merge: null};
                    }
                    return obj;
                });
                setData(newState);
            });
            return () => {
                socketParam.off(eventName);
            };
        }
    }, [mainContext?.profession?.examination_area_id, data]);

    // real time exam 22
    useEffect(() => {
        (async () => {
            const response = await getRealTimeExamProcess();
            setRealTimeData(response?.data);
        })();
    }, [reload]);

    useEffect(() => {
        if (
            parseInt(mainContext?.profession?.examination_area_id) &&
            realTimeData.length
        ) {
            socketParam.on(real_time_exam_result, real_time_data => {
                setRealTimeData(
                    realTimeData.map((object, index) => {
                        if (parseInt(object?.id) === parseInt(real_time_data?.id)) {
                            return real_time_data;
                        }
                        return object;
                    })
                );
            });
            return () => {
                socketParam.off(real_time_exam_result);
            };
        }
    }, [mainContext?.profession?.examination_area_id, realTimeData]);

    const mergedData = data.map((item, index) => ({
        ...item,
        ...realTimeData[index],
    }));

    const clearComputer = computer => {
        (async () => {
            const res = await clearComputerApi(computer?.id);
            if (parseInt(res?.status) === 1) {
                message.success(res?.message);
                setReload(!reload);
            }
        })();
    };
    const changeRandomComputer = computer => {
        (async () => {
            const res = await changeComputerApi(computer?.id);
            if (parseInt(res?.status) === 1) {
                message.success(res?.message);
                setReload(!reload);
            }
        })();
    };
    const computerEndTest = final_access_student_id => {
        (async () => {
            const res = await computerTestEndApi(final_access_student_id);
            if (parseInt(res?.status) === 1) {
                message.success(res?.message);
                setReload(!reload);
            } else {
                message.error(res?.message);
            }
        })();
    };


    const columns = [
        {
            title: "Tartib raqam",
            className: "text-center",
            render: (index, row) => <b>{row?.order}</b>,
        },
        {
            title: "F.I.O",
            render: (index, row) => (
                <>{row?.merge?.final_access_student?.student_fio}</>
            ),
        },
        {
            title: "Passport",
            render: (index, row) => (
                <>{row?.merge?.final_access_student?.student_passport}</>
            ),
        },
        {
            title: "Amallar",
            children: [
                {
                    title: "Bo'shatish",
                    className: "text-center",
                    render: (index, element) => (
                        <Tooltip placement={"bottom"} title={"Bo`shatish"}>
                            {element?.merge ? (
                                <Popconfirm
                                    title={"Kompyuterni bo`shatasizmi ?"}
                                    okText={"Bo`shatish"}
                                    cancelText={"Bekor qilish"}
                                    onConfirm={() => clearComputer(element)}
                                >
                  <span
                      style={{
                          fontSize: "25px",
                          color: "#52c41a",
                          cursor: "pointer",
                      }}
                  >
                    <i className={"bx bxs-brush-alt"}/>
                  </span>
                                </Popconfirm>
                            ) : (
                                ""
                            )}
                        </Tooltip>
                    ),
                },
                {
                    title: "Tugatish",
                    className: "text-center",
                    render: (index, element) => (
                        <Tooltip placement={"bottom"} title={"Testni tugatish"}>
                            {element?.merge ? (
                                <Popconfirm
                                    title={"Testni tugatasizmi ?"}
                                    okText={"Tugatish"}
                                    cancelText={"Bekor qilish"}
                                    onConfirm={() =>
                                        computerEndTest(element?.merge?.final_access_student?.id)
                                    }
                                >
                  <span
                      style={{
                          fontSize: "25px",
                          color: "#f5222d",
                          cursor: "pointer",
                      }}
                  >
                    <AiOutlineStop/>
                  </span>
                                </Popconfirm>
                            ) : (
                                ""
                            )}
                        </Tooltip>
                    ),
                },
                {
                    title: "Almashtirish",
                    className: "text-center",
                    render: (index, element) => (
                        <Tooltip placement={"bottom"} title={"Kompyuterni almashtirish"}>
                            {element?.merge ? (
                                <Popconfirm
                                    title={"Kompyuterni almashtirasizmi ?"}
                                    okText={"Ozgartirish"}
                                    cancelText={"Bekor qilish"}
                                    onConfirm={() => changeRandomComputer(element)}
                                >
                                    <Badge
                                        offset={[0, 2]}
                                        size="large"
                                        style={{
                                            fontSize: "20px",
                                            color: "#52c41a",
                                            cursor: "pointer",
                                        }}
                                        count={<TfiExchangeVertical/>}
                                    >
                                        <RiComputerLine
                                            style={{
                                                fontSize: "25px",
                                                color: "#8c8c8c",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </Badge>
                                </Popconfirm>
                            ) : (
                                ""
                            )}
                        </Tooltip>
                    ),
                },
                {
                    title: (
                        <div>
                            <p className="m-0 p-0">Vaqtincha to`xtatish</p>
                            <span className="mr-2">
                <span>To'xtatilgan: </span>
                <AiOutlinePlayCircle
                    style={{
                        color: "#FAAD14",
                        fontSize: "20px",
                    }}
                />
              </span>

                            <span>
                <span>Ishlamoqda: </span>
                <AiOutlinePauseCircle
                    style={{
                        color: "#52c41a",
                        fontSize: "20px",
                    }}
                />
              </span>
                        </div>
                    ),
                    className: "text-center",
                    render: (index, element) => (
                        <div
                            //   style={
                            //     element?.merge?.paused !== 0
                            //       ? { backgroundColor: "#FAAD14" }
                            //       : { backgroundColor: "" }
                            //   }
                        >
                            {element?.merge ? (
                                <>
                                    {element?.merge?.paused !== 1 ? (
                                        <Tooltip
                                            placement={"bottom"}
                                            title={"Vaqtincha to`xtatish"}
                                        >
                                            <Popconfirm
                                                title={"Vaqtincha to`xtatilsinmi?"}
                                                okText={"To`xtatish"}
                                                cancelText={"Bekor qilish"}
                                                onConfirm={() => pauseComputer(element)}
                                            >
                        <span
                            style={{
                                fontSize: "25px",
                                color: "#52c41a",
                                cursor: "pointer",
                            }}
                        >
                          <AiOutlinePauseCircle/>
                        </span>
                                            </Popconfirm>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip
                                            placement={"bottom"}
                                            title={"Kompyuter to'xtatilgan!"}
                                            color={"#8c8c8c"}
                                        >
                      <span
                          style={{
                              fontSize: "25px",
                              color: "#FAAD14",
                              cursor: "not-allowed",
                          }}
                      >
                        <AiOutlinePlayCircle/>
                      </span>
                                        </Tooltip>
                                    )}
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    ),
                },
            ],
        },
        {
            title: (
                <>
                    <div className=" d-flex justify-content-center align-items-center">
                        <span>Real vaqtdagi javoblar</span>
                        <i className="bx bxs-circle bx-flashing text-danger ml-2"></i>
                    </div>
                    <div className="bg-white rounded border">
                        <span className="text-danger">Noto'g'ri(belgilanmagan)</span> /{" "}
                        <span className="text-success">to'gri</span>
                    </div>
                </>
            ),
            render: (index, row) => (
                <>
                    {row?.merge !== null ? (
                        <span className="bg-light p-1 rounded">
              <span className="text-danger font-weight-bold">
                {
                    row?.merge?.final_access_student?.final_test_student_attempt
                        ?.incorrect_answers
                }{" "}
                  /{" "}
              </span>
              <span className="text-success font-weight-bold">
                {
                    row?.merge?.final_access_student?.final_test_student_attempt
                        ?.correct_answers
                }
              </span>
            </span>
                    ) : (
                        ""
                    )}
                </>
            ),
            align: "center",
        },
    ];

    const pauseComputer = computer => {
        if (computer?.merge) {
            (async () => {
                const responsePause = await pauseComputerApi(computer?.id);
                if (responsePause) {
                    message.success("Vaqtincha to`xtatildi");
                    setReload(!reload);
                }
            })();
        }
    };
    return (
        <>
            <Row className={""} gutter={[12, 12]}>
                <Col xl={24}>
                    <Table
                        dataSource={mergedData}
                        columns={columns}
                        bordered={true}
                        pagination={false}
                        size="small"
                    />
                </Col>
            </Row>
        </>
    );
};
export default withTranslation()(ExamProcessByComputerTab);
