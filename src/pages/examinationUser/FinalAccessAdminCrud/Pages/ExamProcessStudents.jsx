import React, { useContext, useEffect, useRef, useState } from "react";
import { withTranslation } from "react-i18next";
import {
  Table,
  Row,
  Col,
  Tabs,
  message,
  notification,
  Input,
  Modal,
  Button,
} from "antd";
import {
  allowSeparatelyStudent,
  getExamProcessStudents,
} from "../../../../services/api_services/final_test_admin_api";
import { Badge, Card, CardBody, Container } from "reactstrap";
import ExamProcessByComputerTab from "./ExamProcessStudentTabs/ExamProcessByComputerTab";
import ExamProcessByStudentTab from "./ExamProcessStudentTabs/ExamProcessByStudentTab";
import { socketParam } from "../../../../App";
import MainContext from "../../../../Context/MainContext";
import { getFinalAccessStudentById } from "../../../../services/api_services/getFinalAccessStudentById";

const ExamProcessStudents = () => {
  const [data, setData] = useState();
  const [reload, setReload] = useState(false);
  const mainContext = useContext(MainContext);
  // console.log('uy' , context);
  const eventName =
    "examination_area_event_" + mainContext?.profession?.examination_area_id;
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
    // if (parseInt(mainContext?.profession?.examination_area_id)) {
    //     console.log('eventName', eventName)
    //     socketParam.on(eventName, (data) => {
    //         openNotification(data?.message, data?.userName, data?.test_result);
    //         console.log('keldi', data?.userName)
    //     });
    //     return () => {
    //         socketParam.off(eventName);
    //     }
    // }
  }, [mainContext?.profession?.examination_area_id]);
  const inputEl = useRef();
  const [inputValue, setInputValue] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const focusInput = () => {
    if (inputEl?.current) {
      inputEl.current.focus();
    }
  };
  const key_up = keyCode => {
    if (parseInt(keyCode?.keyCode) === 13) {
      if (inputValue) {
        getData(inputValue);
      } else {
        if (data != null) {
          if (parseInt(data?.status) === 1) {
            if (parseInt(data?.payment_status) === 1) {
              // allowFinalExam(data?.id)
            } else {
              message.error("To`lov tasdiqlanmagan");
            }
          }
        }
      }
    }
  };
  const getData = inputValueParam => {
    (async () => {
      const response = await getFinalAccessStudentById(inputValueParam);
      if (parseInt(response?.data?.status) === 1) {
        setData(response?.data?.data);
        showModalHandle();
        message.success("Ma`lumot topildi");
        // setTemporary(inputValue);
      }
      if (parseInt(response?.data?.status) === 0) {
        setData(null);
        onCancelModalHandle();
        message.error(response?.data?.message);
      }
      setInputValue(null);
    })();
  };
  const allowFinalExam = student_id => {
    (async () => {
      const response = await allowSeparatelyStudent(student_id);
      if (response?.data) {
        if (parseInt(response?.data?.status) === 0) {
          message.error(response?.data?.message[0]);
        } else {
          getData(data?.student_passport);
        }
        // history.push(`/come-examination/allow-students/separately/${response?.data?.final_access_student?.id}`);
      }
    })();
  };
  const onCancelModalHandle = () => {
    setIsModalVisible(false);
  };
  const showModalHandle = () => {
    setIsModalVisible(true);
  };
  return (
    <div className="page-content">
      <Modal
        visible={isModalVisible}
        zIndex={1005}
        onCancel={onCancelModalHandle}
        footer={<></>}
      >
        <Row>
          <Col xl={24} className={"text-center"}>
            <h3>{`${data?.student_fio}(${data?.student_passport})`}</h3>
          </Col>
        </Row>
        <Row style={{ fontSize: "16px" }}>
          <Col xl={12} className={"text-left"}>
            To`lov holati
          </Col>
          <Col xl={12} className={"text-right"}>
            <Badge
              color={
                parseInt(data?.payment_status) === 1
                  ? "success"
                  : parseInt(data?.payment_status) === 2
                  ? "dark"
                  : "danger"
              }
            >
              {parseInt(data?.payment_status) === 1
                ? "To`lov qilingan"
                : parseInt(data?.payment_status) === 2
                ? "To`lov qilinmaydi"
                : "To`lov qilinmagan"}
            </Badge>
          </Col>
          <Col xl={12} className={"text-left"}>
            Test topshirganlik holati
          </Col>
          <Col xl={12} className={"text-right"}>
            <Badge
              color={
                parseInt(data?.exam_result) === 1
                  ? "success"
                  : parseInt(data?.exam_result) === 2
                  ? "dark"
                  : data?.exam_result === null
                  ? "warning"
                  : "danger"
              }
            >
              {parseInt(data?.exam_result) === 1
                ? "Testdan o`tgan"
                : parseInt(data?.exam_result) === 2
                ? "Test topshirmaydi"
                : data?.exam_result === null
                ? "Test topshirmagan"
                : "Testdan yiqilgan"}
            </Badge>
          </Col>
          <Col xl={12} className={"text-left"}>
            Testga ruhsat berish holati
          </Col>
          <Col xl={12} className={"text-right"}>
            <Badge color={parseInt(data?.status) === 2 ? "success" : "warning"}>
              {parseInt(data?.status) === 2
                ? "Ruxsat berilgan"
                : "Ruxsat berilmagan"}
            </Badge>
          </Col>
          <Col xl={24} className={"text-center border p-3"}>
            <h1>
              <b>
                {data?.merged_computer
                  ? data?.merged_computer?.computer?.order
                  : " "}
              </b>
            </h1>
            <br />
            Kompyuter raqami
          </Col>
          <Col xl={24} className={"text-center mt-1"}>
            {parseInt(data?.status) === 1 &&
            parseInt(data?.payment_status) === 1 ? (
              <button
                className={"w-100 btn btn-success"}
                onClick={() => allowFinalExam(data?.id)}
              >
                Testga ruxsat berish
              </button>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Modal>
      <Container fluid style={{ overFlow: "auto" }}>
        <Card>
          <CardBody>
            <Input
              // style={{opacity: '0'}}
              ref={inputEl}
              onChange={e => setInputValue(e?.target?.value)}
              onBlur={focusInput}
            //   autoFocus={true}
              onKeyUp={key_up}
              style={{ opacity: "0" }}
              // type={"number"}
              value={inputValue}
            />
            <div className="top-organizations">
              <h5 className="text-dark">Test topshirish jarayonidagilar</h5>
              <button className={"btn btn-light"} onClick={refresh}>
                <i className="fa fa-retweet" aria-hidden="true" />
              </button>
            </div>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Kompyuter bo'yicha" key="1">
                <ExamProcessByComputerTab
                  reload={reload}
                  setReload={setReload}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="O'quvchilar bo'yicha" key="2">
                <ExamProcessByStudentTab reload={reload} />
              </Tabs.TabPane>
            </Tabs>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};
export default withTranslation()(ExamProcessStudents);
