import React, { useEffect, useState } from "react";
import axios from "axios";
import CountDownTimer from "../Students/StudentTests/CountDownTimer";
import { PATH_PREFIX } from "Utils/AppVariables";
import "./style.scss";
import TestComponent from "./testComponent";
import TimeBarCircle from "./timeBar";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useDispatch } from "react-redux";
import { GLOBAL_REFRESH } from "store/ActionTypes/actionTypes";
import { Button, Col, Divider, Modal, Row, Progress } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const FinalExamDashboard = () => {
  const { t } = useTranslation();
  const [isFinishedTime, setIsFinishedTime] = useState(1);
  const [test_time, settest_time] = useState(25 * 60);
  const [backend_time, set_backend_time] = useState("");
  const [templateTestTime, settemplateTestTime] = useState({
    minutes: Math.floor(test_time / 60),
    seconds: test_time % 60,
  });
  const [isStarted, setIsStarted] = useState(false);
  const [isTestEndedModalVisible, setIsTestEndedModalVisible] = useState(false);
  const [testResult, setTestResult] = useState();
  const [valueProgress, setValueProgress] = useState(0);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    settemplateTestTime({
      minutes: Math.floor(test_time / 60),
      seconds: test_time % 60,
    });
  }, [test_time]);
  const onFinishTest = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios({
        url: PATH_PREFIX + "/final-test-user/check-time",
        method: "POST",
        params: {
          token: token,
        },
      }).then(res => {
        if (res?.data?.time_status == 0) {
          setIsTestEndedModalVisible(true);
          setTestResult(res?.data?.attempt_result);
        }
      });
    }
  };

  useEffect(() => {
    onFinishTest();
  }, [isFinishedTime]);
  const history = useHistory();
  const logout = () => {
    window.location.reload(false);
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user_profile_name");
    localStorage.removeItem("face_recognition_key");
    axios({
      url: PATH_PREFIX + "/logout",
      method: "POST",
      params: {
        token: token,
      },
    }).then(response => {
      if (response?.status === 200) {
        Swal.fire({
          icon: "success",
          title: `Successfully logged out`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          history.push("/login");
          localStorage.removeItem("token");
          window.location.reload(false);
        });
      }
    });
  };

  const clickOutTest = () => {
    setOpen(false);
    setIsTestEndedModalVisible(false);
    setTimeout(() => {
      logout();
    }, 3 * 60 * 1000);
  };

  const showTestEndedModal = () => {
    setIsTestEndedModalVisible(true);
  };

  // const handleOkTestEndedModal = () => {
  //     setIsTestEndedModalVisible(false);
  // };
  const [setTimeOutState, setSetTimeOutState] = useState(undefined);

  const handleCancelTestEndedModal = () => {
    if (setTimeOutState) {
      clearTimeout(setTimeOutState);
      setSetTimeOutState(undefined);
      setIsTestEndedModalVisible(false);
      logout();
    }
  };

  useEffect(() => {
    if (isTestEndedModalVisible) {
      let timeout = setTimeout(() => {
        setValueProgress(valueProgress + 1);
      }, 200);
      setSetTimeOutState(timeout);
    } else {
      if (setTimeOutState) {
        clearTimeout(setTimeOutState);
        setSetTimeOutState(undefined);
      }
    }
    if (isTestEndedModalVisible && valueProgress == 100) {
      handleCancelTestEndedModal();
    }
  }, [valueProgress, isTestEndedModalVisible]);
  return (
    <div className={""}>
      <Modal
        width={850}
        centered
        visible={isTestEndedModalVisible}
        //    isTestEndedModalVisible
        onCancel={() => clickOutTest()}
        open={open}
        style={
          testResult?.correct_answers > 17
            ? { border: "2px solid #27AE60", borderRadius: "10px" }
            : { border: "2px solid #EB5757", borderRadius: "10px" }
        }
        footer={
          testResult?.correct_answers > 17 ? (
            <Button
              type="primary"
              key="cancel"
              onClick={handleCancelTestEndedModal}
              className={"w-100 "}
              style={{ borderRadius: "8px", fontSize: "17px" }}
            >
              {t("Logout")}
            </Button>
          ) : (
            <Button
              type="danger"
              key="cancel"
              onClick={handleCancelTestEndedModal}
              className={"w-100 "}
              style={{ borderRadius: "8px", fontSize: "17px" }}
            >
              {t("Logout")}
            </Button>
          )
        }
      >
        <Divider>
          {testResult?.correct_answers > 17 ? (
            <b className="text-success">{t("Test natijasi")}</b>
          ) : (
            <b className="text-danger">{t("Test natijasi")}</b>
          )}
        </Divider>
        <Row>
          <Col xl={8} className={"text-center"}>
            <div>
              <h3>{t("To'g'ri javoblar")}</h3>
            </div>
            <div>
              <h3>
                <b>{testResult?.correct_answers}</b>
              </h3>
            </div>
          </Col>
          <Col xl={8} className={"text-center"}>
            <div>
              <h3>{t("Noto'g'ri javoblar")}</h3>
            </div>
            <div>
              <h3>
                <b>{testResult?.incorrect_answers}</b>
              </h3>
            </div>
          </Col>
          <Col xl={8} className={"text-center"}>
            <div>
              <h3>{t("Belgilanmagan javoblar")}</h3>
            </div>
            <div>
              <h3>
                <b>{testResult?.no_checkeds}</b>
              </h3>
            </div>
          </Col>
        </Row>
        {/*<p>*/}
        {/*  To'g'ri javoblar : <b>{testResult?.correct_answers}</b>*/}
        {/*</p>*/}
        {/*<p>*/}
        {/*  Noto'g'ri javoblar : <b>{testResult?.incorrect_answers}</b>*/}
        {/*</p>*/}
        {/*<p>*/}
        {/*  Belgilanmagan javoblar : <b>{testResult?.no_checkeds}</b>*/}
        {/*</p>*/}
        {testResult?.correct_answers > 17 ? (
          <>
            <Row>
              <Col xl={24} className={"text-center"}>
                <span style={{ fontSize: "80px" }}>
                  <i class="fas fa-smile text-success"></i>
                </span>
                <p style={{ fontSize: "24px" }} className="text-danger">
                  {t("Tabriklaymiz siz testdan muvofaqiyatli o'tdingiz!")}
                </p>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col xl={24} className={"text-center"}>
                <span style={{ fontSize: "80px" }}>
                  <i class="fas fa-frown text-danger"></i>
                </span>
                <p style={{ fontSize: "24px" }} className="text-danger">
                  {t("Afsuski testdan o'ta olmadingiz!")}
                </p>
              </Col>
            </Row>
          </>
        )}
        <Row>
          <Col xl={24}>
            <Progress
              percent={valueProgress}
              strokeColor={"yellow"}
              showInfo={false}
            />
          </Col>
        </Row>
      </Modal>
      <TestComponent
        handleCancelTestEndedModal={handleCancelTestEndedModal}
        settest_time={settest_time}
        test_time={test_time}
        backend_time={backend_time}
        set_backend_time={set_backend_time}
        setIsStarted={setIsStarted}
        isStarted={isStarted}
        setIsTestEndedModalVisible={setIsTestEndedModalVisible}
        isTestEndedModalVisible={isTestEndedModalVisible}
        setTestResult={setTestResult}
        testResult={testResult}
        templateTestTime={templateTestTime}
        setIsFinishedTime={setIsFinishedTime}
        logout={logout}
      />
    </div>
  );
};
export default FinalExamDashboard;
