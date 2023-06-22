import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { withTranslation } from "react-i18next";
import "./queue.css";

import {
  Row,
  Col,
  Select,
  Input,
  Pagination,
  message,
  Tooltip,
  Modal,
  Button,
  Form,
} from "antd";
import axios from "axios";
import MainContext from "../../../../Context/MainContext";
import { PATH_PREFIX } from "../../../../Utils/AppVariables";
import { DataLoader } from "../../../Loaders/Loaders";
import QueuePageIndexTable from "./QueuePageIndexTable";
import {
  getQueueList,
  reputStudentToQueueApi,
} from "../../../../services/api_services/queue_api";
import QueueNumbersComponent from "./QueueNumbersComponent";
import ringer from "../../../../assets/music/sound_queue.mp3";
import { BsCheckCircle, BsClockHistory } from "react-icons/bs";
import ShowQueueNumber from "./ShowQueueNumber";
import { socketParam } from "../../../../App";
import InputMask from "react-input-mask";

const QueueFinalExam = props => {
  const [data, setData] = useState([]);
  const [addForm] = Form.useForm();
  const [isloading, setIsloading] = useState(false);
  const { hasLayout, setHasLayout } = useContext(MainContext);
  const [reload, setReload] = useState(false);
  const [waitingData, setWaitingData] = useState();
  const [accessedData, setAccessedData] = useState();
  const [freeComputers, setFreeComputers] = useState();
  const [showQueueNumber, setShowQueueNumber] = useState(true);
  const [reputQueueModal, setReputQueueModal] = useState(false);

  const mainContext = useContext(MainContext);
  const eventName =
    "examination_area_queue_event_" +
    mainContext?.profession?.examination_area_id;

  useEffect(() => {
    // console.log('eventName', eventName);
    if (parseInt(mainContext?.profession?.examination_area_id)) {
      // console.log(eventName+' ga ulandi');
      socketParam.on(eventName, data => {
        console.log("queue keldi", data);
      });
      return () => {
        socketParam.off(eventName);
      };
    }
  }, [mainContext?.profession?.examination_area_id]);

  useEffect(() => {
    (async () => {
      const audio = new Audio(ringer);
      audio.loop = true;
      const response = await getQueueList();
      setFreeComputers(response?.freeComputers);
      reBuiltData(response);
    })();
    setTimeout(() => {
      setReload(!reload);
    }, 5000);
  }, [reload]);

  const reBuiltData = response => {
    let waitArray = [];
    let accessArray = [];
    response?.data?.map((element, index) => {
      if (index + 1 > response?.freeComputers?.length) {
        waitArray.push(element);
      } else {
        accessArray.push(element);
      }
    });
    setWaitingData(waitArray);
    if (accessArray?.length > accessedData?.length) {
      audio.loop = false;
      audio.play();
    }
    setAccessedData(accessArray);
    if (
      freeComputers &&
      freeComputers.length > 0 &&
      accessArray.slice(-1)[0].id !== freeComputers[0].id
    ) {
      setShowQueueNumber(true);
    }
    setData(response?.data);
    setFreeComputers(accessArray.slice(-1));
  };

  useEffect(() => {
    setTimeout(() => {
      setShowQueueNumber(false);
    }, 10000);
  }, [reload]);

  const onFinishAdd = async values => {
    try {
      const { student_passport } = values;
      const data = { student_passport };
      const res = await reputStudentToQueueApi(data);
      message.success(res?.message);
      reputStudentModalHide();
      console.log("values", values);
    } catch (error) {
      message.error(error?.message);
    }
  };

  const submitForm = () => {
    addForm.submit();
  };

  const reputStudentModalShow = () => {
    setReputQueueModal(true);
  };

  const reputStudentModalHide = () => {
    setReputQueueModal(false);
  };

  const onPassportHandle = e => {
    addForm.setFieldsValue({
      student_passport: e?.target?.value?.toUpperCase(),
    });
  };
  const maskInput = {
    mask: "aa9999999",
    maskChar: "_",
    alwaysShowMask: false,
    formatChars: {
      9: "[0-9]",
      a: "[A-Za-z]",
    },

    permanents: [2, 5], // permanents is an array of indexes of the non-editable characters in the mask
  };
  return (
    <>
      <div
        className="page-content"
        style={!hasLayout ? { padding: "1px" } : {}}
      >
        <Container fluid style={!hasLayout ? { padding: "1px" } : {}}>
          {/* Queue body */}
          <div className="">
            {!isloading ? (
              <Row className="queue-wrap  position-relative">
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={14}
                  xl={14}
                  className={"wating-wrap"}
                >
                  <div>
                    <h1 className="d-flex justify-content-between align-items-center">
                      <div className="d-flex justify-content-start align-items-center">
                        <BsClockHistory />
                        <span className="pl-2 font-size-20">Kutishda...</span>
                      </div>

                      <div className="d-flex justify-content-start align-items-center">
                        <Tooltip title="Qayta navbatga qo'yish">
                          <span
                            onClick={reputStudentModalShow}
                            className="text-dark font-size-20"
                            style={{ cursor: "pointer" }}
                          >
                            <i class="fas fa-user-clock"></i>
                            <span className="pl-2">Navbatga qayta qo'yish</span>
                          </span>
                        </Tooltip>

                        <Modal
                          zIndex={10000}
                          width={500}
                          centered
                          title={
                            <>
                              <i class="fas fa-people-arrows mr-1"></i>
                              <span>Navbatga qayta qo'yish oynasi </span>
                            </>
                          }
                          visible={reputQueueModal}
                          onCancel={reputStudentModalHide}
                          footer={[
                            <button
                              className="btn btn-info"
                              onClick={submitForm}
                            >
                              <div className="d-flex align-items-center">
                                <i class="bx bxs-user-check font-size-20 mr-1"></i>
                                Qayta qo'yish
                              </div>
                            </button>,
                          ]}
                        >
                          <Form
                            form={addForm}
                            onFinish={onFinishAdd}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}
                          >
                            <Form.Item
                              name="student_passport"
                              label="Pasport seria va raqami"
                              rules={[
                                {
                                  required: true,
                                  message: "Pasport seria va raqamini kiriting",
                                },
                              ]}
                            >
                              <InputMask
                                {...maskInput}
                                className={"ant-input"}
                                onChange={e => onPassportHandle(e)}
                                placeholder="Pasport seria va raqami"
                              />
                            </Form.Item>
                          </Form>
                        </Modal>
                      </div>
                      {/* zoom queue */}
                      <div>
                        {/* Full or min size button */}
                        <Tooltip
                          title={
                            hasLayout ? `Kattalashtirish` : `Kichiklashtirish`
                          }
                        >
                          <button
                            className="btn text-white"
                            onClick={() => setHasLayout(!hasLayout)}
                          >
                            <i
                              className={
                                hasLayout ? `fa fa-expand` : `fa fa-compress`
                              }
                              aria-hidden="true"
                            ></i>
                          </button>
                        </Tooltip>
                      </div>
                    </h1>
                  </div>

                  <QueueNumbersComponent data={waitingData} />
                </Col>

                {/* Show queue numbers*/}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "42%",
                    transform: "translate(0, -50%)",
                    padding: "10px",
                    zIndex: "1000",
                  }}
                >
                  {showQueueNumber ? (
                    <ShowQueueNumber
                      data={freeComputers}
                      backgroundColor={"#7cb305"}
                    />
                  ) : (
                    <></>
                  )}
                </div>

                {/* Ready side */}
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={10}
                  xl={10}
                  className={"ready-wrap"}
                >
                  <div style={{ padding: "10px" }}>
                    <h1 className="d-flex justify-content-start align-items-center text-white">
                      <BsCheckCircle />
                      <span className="pl-2 font-size-20">Kirish mumkin</span>
                    </h1>
                  </div>

                  {/* theoritical and practical queues */}
                  <div className="two-types-queue-wrap">
                    <div className="theoritical">
                      <h3 className="text-white text-center">
                        Nazariy uchun navbat
                      </h3>
                      <QueueNumbersComponent
                        data={accessedData?.filter(
                          item => item?.type === "theoretical"
                        )}
                      />
                    </div>

                    <div className="practical">
                      <h3 className="text-white text-center">
                        Amaliy uchun navbat
                      </h3>
                      <QueueNumbersComponent
                        data={accessedData?.filter(
                          item => item?.type === "practical"
                        )}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            ) : (
              <DataLoader />
            )}
            <Row className="d-flex justify-content-end mt-2">
              {/*<Pagination defaultCurrent={1} current={params.page} defaultPageSize={10}   total={total} onChange={e => select_page(e)} onShowSizeChange={(page , e) => show_count_change(e)} />*/}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(QueueFinalExam);
