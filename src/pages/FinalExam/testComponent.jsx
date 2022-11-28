import React, { useContext, useRef } from "react";
import "./style.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PATH_PREFIX,
  PATH_PREFIX_FILE, PATH_PREFIX_FILE_WITHOUT_SLESH,
  PATH_PREFIX_INTALIM_TEST_FILES,
} from "Utils/AppVariables";
import { Modal, Button, Divider, Col, Badge, Spin } from "antd";
import MainContext from "Context/MainContext";
import i18n from "i18n";
import CountDownTimer from "../Students/StudentTests/CountDownTimer";
import logoBlue from "../../assets/images/logo-white-big.png";
import logoMini from "../../assets/images/logo_mini.png";
import uzFlag from "../../assets/images/flags/uz.png";
import qqFlag from "../../assets/images/flags/qq.jpg";
import ruFlag from "../../assets/images/flags/russia.jpg";
import { useTranslation } from "react-i18next";
import { AiOutlineEnter } from "react-icons/ai";
import { BsZoomIn, BsZoomOut, BsSearch } from "react-icons/bs";
import { GiMouse } from "react-icons/gi";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const TestComponent = ({
  settest_time,
  test_time,
  setIsStarted,
  isStarted,
  isTestEndedModalVisible,
  setIsTestEndedModalVisible,
  setTestResult,
  setIsFinishedTime,
  templateTestTime,
  testResult,
  logout,
  handleCancelTestEndedModal,
}) => {
  const [languages, setLanguages] = useState([
    {
      id: 1,
      value: "uz",
      language: "O'zbek",
      image: uzFlag,
      functionalKey: "F1",
    },
    {
      id: 3,
      value: "kr",
      language: "Ўзбек",
      image: uzFlag,
      functionalKey: "F2",
    },
    {
      id: 5,
      value: "qq",
      language: "Qaraqalpaqsha",
      image: qqFlag,
      functionalKey: "F3",
    },
    {
      id: 2,
      value: "ru",
      language: "Pусский",
      image: ruFlag,
      functionalKey: "F4",
    },
  ]);
  const userName = localStorage.getItem("user_profile_name");

  const { setI18 } = useContext(MainContext);
  const { t } = useTranslation();
  let autoFocusDivRef = useRef();
  const [dataBody, setDataBody] = useState([]);
  const [dataAnswers, setdataAnswers] = useState([]);
  const [historys, sethistorys] = useState([]);
  const [lang_id, setLang_id] = useState("");
  const [question_order, setquestion_order] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accessModal, setaccessModal] = useState(false);
  const [question_id, setquestion_id] = useState(null);
  const [checked_test, setchecked_test] = useState({});
  const [time_finished, settime_finished] = useState(false);
  const [checkTime, setcheckTime] = useState(false);
  const [incorrectTwo, setincorrectTwo] = useState(null);
  const [userFullName, setuserFullName] = useState("");
  const [test_result, settest_result] = useState({});
  const [first_request, set_first_request] = useState(true);
  const [selectedAnswerId, setSelectedAnswerId] = useState("");
  const [student, setStudent] = useState(undefined);
  const [pressedKey, setPressedKey] = useState();
  const functionalKeys = ["F1", "F2", "F3", "F4", "F5"];
  const [rightAnswerData, setRightAnswerData] = useState({
    answer_description: "",
    answer_video: "",
  });
  const [languageLoader, setLenguageLoader] = useState(false);
  const [startTestLoader, setStartTestLoader] = useState(false);

  useEffect(() => {
    if (autoFocusDivRef.current) {
      autoFocusDivRef.current.autofocus = true;
      console.log(autoFocusDivRef);
    }
  }, [accessModal]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios({
        url: PATH_PREFIX + "/final-test-user/index",
        method: "GET",
        params: {
          token,
          lang_id: lang_id,
        },
      }).then(res => {
        if (parseInt(res?.data?.status) === 1) {
          setuserFullName(
            res?.data?.final_test_attempt?.final_test_student_access
              ?.student_fio
          );
          if (parseInt(res?.data?.lang_status) === 0) {
            setIsModalVisible(true);
            setStudent(res?.data?.student);
          } else if (res?.data?.lang_status == 1) {
            setIsModalVisible(false);
          }
          if (
            parseInt(res?.data?.general_status) === 1 ||
            parseInt(res?.data?.access_status) === 0
          ) {
            setaccessModal(true);
          }
        }
      });
    }
  }, [lang_id]);

  const startTest = num => {
    setStartTestLoader(true);
    const token = localStorage.getItem("token");
    axios({
      url: PATH_PREFIX + "/final-test-user/next-question",
      method: "GET",
      params: {
        token,
        question_order: num,
        first_request,
      },
    }).then(res => {
      if (res?.data?.status == "1") {
        if (first_request == true) {
          set_first_request(false);
        }
        settest_time(parseInt(res?.data?.test_time));
        setSelectedAnswerId("");
        setchecked_test(res?.data?.data);
        setIsStarted(true);
        settest_result(res?.data?.attempt_result);
        setaccessModal(false);
        setDataBody(res?.data?.data?.question?.body);
        setdataAnswers(res?.data?.data?.answers);
        sethistorys(res?.data?.history);
        setquestion_order(res?.data?.data?.order);
        setquestion_id(res?.data?.data?.question?.id);
        set_first_request(false);
        if (res?.data?.left_time < 0) {
          settime_finished(true);
        }
        // console.log("pp", checked_test);
        setPressedKey(undefined);
        setRightAnswerData({
          answer_video: res?.data?.data?.answer_video ? res?.data?.data?.answer_video : res?.data?.data?.link ? res?.data?.data?.link:'',
          answer_description: res?.data?.data?.answer_description,
        });
      }
    });
  };
  // console.log("oooooooo", rightAnswerData);

  const select_answer = answerId => {
    setSelectedAnswerId(answerId);
  };

  const handleKeyBtn = event => {
    event.preventDefault();
    if (event.keyCode === 39 && isStarted) {
      startTest(question_order + 1);
    } else if (event.keyCode === 37 && isStarted) {
      startTest(question_order - 1);
    } else if (event.keyCode === 97 && isStarted) {
      startTest(1);
    } else if (event.keyCode === 98 && isStarted) {
      startTest(2);
    } else if (event.keyCode === 99 && isStarted) {
      startTest(3);
    } else if (event.keyCode === 100 && isStarted) {
      startTest(4);
    } else if (event.keyCode === 101 && isStarted) {
      startTest(5);
    } else if (event.keyCode === 102 && isStarted) {
      startTest(6);
    } else if (event.keyCode === 103 && isStarted) {
      startTest(7);
    } else if (event.keyCode === 104 && isStarted) {
      startTest(8);
    } else if (event.keyCode === 105 && isStarted) {
      startTest(9);
    } else if (event.keyCode === 96 && isStarted) {
      startTest(10);
    } else if (event.keyCode === 107 && isStarted) {
      if (dataBody["2"]) {
        setOpen(true);
      }
    } else if (event.keyCode === 109 && isStarted) {
      if (open) {
        setOpen(false);
      }
    } else if (event?.keyCode) {
      const key = event?.keyCode - 112;
      if (dataAnswers?.length) {
        if (dataAnswers[key]) {
          if (pressedKey) {
            if (event?.keyCode === pressedKey) {
              checkTest(selectedAnswerId);
              setPressedKey(undefined);
            } else {
              setPressedKey(event?.keyCode);
              select_answer(dataAnswers[key]?.id);
            }
          } else {
            select_answer(dataAnswers[key]?.id);
            setPressedKey(event?.keyCode);
          }
        }
      } else if (languages[key] && lang_id === "") {
        const selectedLang = languages[key];
        changeLanguageAction(selectedLang.value);
        setLang_id(selectedLang.id);
        setLenguageLoader(true);
      }
    }
    if (accessModal) {
      if (event.keyCode === 13) {
        startTest(1);
      }
    }
  };

  const checkTest = answer_id => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_PREFIX + "/final-test-user/check-answer2",
      method: "POST",
      params: {
        token,
        question_id: question_id,
        answer_id: answer_id,
      },
    }).then(res => {
      if (res?.data?.status == "1") {
        setchecked_test(res?.data);
        sethistorys(res?.data?.history);
        setincorrectTwo(res?.data?.test_ended_status);
        settest_result(res?.data?.attempt_result);
        if (res?.data?.test_ended_status) {
          setIsTestEndedModalVisible(true);
          setTestResult(res?.data?.attempt_result);
          localStorage.removeItem('face_recognition_key');
          setTimeout(() => handleCancelTestEndedModal(), 20000);
        }
        startTest(question_order + 1);
      }
    });
  };

  const changeLanguageAction = lang => {
    i18n.changeLanguage(lang).then(r => {});
    setI18(lang);
    localStorage.setItem("I18N_LANGUAGE", lang);
  };

  useEffect(() => {
    if (test_time > 0) {
      setTimeout(() => {
        setcheckTime(!checkTime);
      }, [5000]);
    }
  }, [checkTime]);
  const [isVisibleAnswerDescriptionModal, setIsVisibleAnswerDescriptionModal] =
    useState(false);

  const showAnswerDescription = () => {
    if (rightAnswerData?.answer_description) {
      setIsVisibleAnswerDescriptionModal(true);
    }
  };

  const handleCancelAnswerDescriptionModal = () => {
    setIsVisibleAnswerDescriptionModal(false);
  };
  return (
    <div
      className="final_test_div"
      onKeyDown={handleKeyBtn}
      tabIndex={0}
      style={{ zIndex: 1006 }}
      ref={autoFocusDivRef}
    >
      <div>
        <div
          className="buttons  align-items-center justify-content-center    "
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            zIndex: 1005,
          }}
        >
          <div
            className={
              "d-flex justify-content-between align-items-center mr-5 "
            }
          >
            <div className={"d-flex"} style={{}}></div>
            <div className={"d-flex"}>
              <div className={"d-flex"}>
                {historys?.map((item, index) => (
                  <span
                    onClick={() => startTest(item?.order)}
                    className={`span_test_number d-flex justify-content-center align-items-center ${
                      question_order == item?.order && item?.result === 0
                        ? "danger_active_test"
                        : question_order == item?.order && item?.result === 1
                        ? "success_active_test"
                        : item?.result === 1
                        ? "success_test"
                        : item?.result === 0
                        ? "danger_test"
                        : question_order == item?.order && item?.result === ""
                        ? "active_test"
                        : ""
                    }`}
                    autoFocus
                  >
                    {item?.order}
                  </span>
                ))}
              </div>
              <div className="num_test d-flex align-items-center justify-content-between">
                <div>
                  <a
                    onClick={e => startTest(question_order - 1, e)}
                    style={{ marginRight: "40px", color: "white" }}
                    src=""
                    className={`mr-2 ml-5 ${
                      question_order === 1 ? "isCheck_button" : ""
                    }`}
                    autoFocus
                  >
                    <i className="fas fa-angle-left" />
                    {t("Oldingisi")}
                  </a>
                  <a
                    onClick={e => startTest(question_order + 1, e)}
                    style={{ marginLeft: "40px", color: "white" }}
                    src=""
                    className={`${
                      question_order === 20 ? "isCheck_button" : ""
                    }`}
                    autoFocus
                  >
                    {t("Keyingisi")}
                    <i className="fas fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className={"d-flex align-items-center"}>
              <div>
                <CountDownTimer
                  hoursMinSecs={templateTestTime}
                  setIsFinishedTime={setIsFinishedTime}
                  setIsStarted={setIsStarted}
                  isStarted={isStarted}
                  // setIsTestEndedModalVisible={setIsTestEndedModalVisible}
                  isTestEndedModalVisible={isTestEndedModalVisible}
                  setTestResult={setTestResult}
                  testResult={testResult}
                />
              </div>
              <div>
                <i
                  className="fas fa-sign-out-alt ml-4"
                  onClick={logout}
                  style={{ fontSize: "32px", color: "#999", cursor: "pointer" }}
                  autoFocus
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "col-12 col-md-12 d-flex justify-content-between pt-2 pb-2"
          }
          style={{ backgroundColor: "#005ED0" }}
        >
          <div style={{ width: "150px" }}>
            <img src={logoBlue} alt="" style={{ width: "100%" }} />
          </div>
          <div style={{ fontSize: "23px", color: "white" }}>{userName}</div>
        </div>
        <div
          className="row  "
          style={{ marginLeft: "15px", marginRight: "15px" }}
        >
          <div className={"col-12 col-md-12 text-center"}>
            <div className="question  w-100  p-2 ">
              {Object.keys(dataBody)?.map((keyName, i) =>
                dataBody[keyName]?.type == "1" ? (
                  <p>{question_order + ". " + dataBody[keyName]?.value}</p>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
          <div className="col-12 col-md-5  answers_box">
            <div className="test_content ">
              <div className="d-flex justify-content-end ">
                <Button
                  className={"rounded"}
                  style={{ fontSize: "20px", height: "45px" }}
                  type="primary"
                  disabled={
                    checked_test?.result === "" && selectedAnswerId
                      ? false
                      : true
                  }
                  onClick={() => checkTest(selectedAnswerId)}
                  icon={
                    pressedKey && (
                      <span className={"functional_key_small"} autoFocus>
                        {functionalKeys[pressedKey - 112]}
                      </span>
                    )
                  }
                  autoFocus
                >
                  {t("Javobni tasdiqlash")}
                </Button>
              </div>
              <div
                className={`answers ${
                  checked_test?.status == 1 ? "isCheck" : ""
                }`}
                autoFocus
              >
                {dataAnswers?.map((item, i) => (
                  <div className={"d-flex align-items-center"} autoFocus>
                    <div className={"functional_key"} autoFocus>
                      {functionalKeys[i]}
                    </div>
                    <div
                      onClick={() => {
                        select_answer(item?.id);
                        setPressedKey(i + 112);
                      }}
                      className={`${
                        checked_test?.result == 0 &&
                        checked_test?.selected_answer_id == item?.id
                          ? "answer_incorrect"
                          : checked_test?.result === "" &&
                            selectedAnswerId == item?.id
                          ? "selectedAnswer"
                          : checked_test?.right_answer_id == item?.id
                          ? "answer_correct"
                          : "answer"
                      }`}
                      autoFocus
                    >
                      <span className="mr-2" autoFocus>
                        {checked_test?.result == 0 &&
                        checked_test?.selected_answer_id == item?.id ? (
                          <i className="fas fa-times-circle empty-icon"></i>
                        ) : checked_test?.right_answer_id == item?.id ? (
                          <i className="fas fa-check-circle empty-icon"></i>
                        ) : (
                          <i className="far fa-circle empty-icon"></i>
                        )}
                      </span>

                      {Object.keys(item?.body)?.map((keyName, i) =>
                        item?.body[keyName]?.type == "1" ? (
                          <span>{item?.body[keyName]?.value}</span>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={"d-flex justify-content-end"}>
                {rightAnswerData?.answer_description && (
                  <Button onClick={showAnswerDescription} autoFocus>
                    {t("To`g`ri javob tasnifi")}
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div
            className="col-12 col-md-7 d-flex justify-content-center image_box"
            style={{ objectFit: "cover" }}
          >
            {Object.keys(dataBody).map((keyName, i) => {
              console.log(dataBody);
              console.log(dataBody[question_order]);
              return dataBody[keyName]?.type == "2" ? (
                <div onClick={() => setOpen(true)} autoFocus>
                  <TransformWrapper
                    defaultScale={1}
                    defaultPositionX={100}
                    defaultPositionY={200}
                  >
                    <Badge.Ribbon
                      style={{ height: "35px" }}
                      className="d-flex justify-content-center align-items-center"
                      text={
                        <>
                          <BsZoomIn style={{ fontSize: "20px" }} />{" "}
                          <BsZoomOut style={{ fontSize: "20px" }} />{" "}
                        </>
                      }
                      color="black"
                    >
                      <TransformComponent>
                        <img
                          className="image"
                          src={
                            PATH_PREFIX_FILE_WITHOUT_SLESH +
                            dataBody[keyName]?.value
                          }
                          alt=""
                          onClick={() => setOpen(true)}
                        />
                      </TransformComponent>
                    </Badge.Ribbon>
                  </TransformWrapper>
                  <div></div>
                </div>
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </div>
      {/* press full screen image button */}
      <Modal
        zIndex={10000}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={"70%"}
        style={{ border: "0", padding: "0", margin: "0" }}
        className="fullsizeimg"
        footer={false}
      >
        {Object.keys(dataBody).map((keyName, i) =>
          dataBody[keyName]?.type == "2" ? (
            <div style={{ objectFit: "cover" }}>
              <TransformWrapper
                defaultScale={1}
                defaultPositionX={100}
                defaultPositionY={200}
              >
                <Badge.Ribbon
                  style={{ height: "35px" }}
                  className="d-flex justify-content-center align-items-center"
                  placement="start"
                  text={
                    <>
                      <GiMouse style={{ fontSize: "30px" }} />{" "}
                      <BsSearch style={{ fontSize: "20px" }} />
                    </>
                  }
                  color="black"
                >
                  <TransformComponent>
                    <img
                      className="image"
                      style={{ width: "100%" }}
                      src={
                        PATH_PREFIX_FILE_WITHOUT_SLESH +
                        dataBody[keyName]?.value
                      }
                      alt=""
                    />
                  </TransformComponent>
                </Badge.Ribbon>
              </TransformWrapper>
            </div>
          ) : (
            ""
          )
        )}
      </Modal>

      <Modal
        zIndex={10000}
        width={900}
        className={"rounded shadow boder-light"}
        visible={isModalVisible}
        footer={false}
        closable={false}
        centered
      >
        <Spin spinning={languageLoader} tip="Yuklanmoqda...">
          <div className="row">
            <Col span={24} className={"text-center"}>
              <h3>
                <b>{student ? student?.student_fio : ""}</b>
              </h3>
            </Col>
            <Col span={24}>
              <Divider orientation="center mb-4">
                <h3>
                  <b>Tilni tanlang / Выберите язык</b>
                </h3>
              </Divider>
            </Col>
            {languages?.map((item, index) => (
              <div key={index} className="col-12 px-5 d-flex">
                <div
                  className={
                    "select-test-lang d-flex justify-content-center align-items-center"
                  }
                  style={{ backgroundColor: "#595959", color: "white" }}
                  autoFocus
                >
                  {item?.functionalKey}
                </div>
                <div
                  className="select-test-lang d-flex justify-content-center align-items-center"
                  onClick={() => {
                    changeLanguageAction(item.value), setLang_id(item.id);
                  }}
                  style={{ width: "100%" }}
                  autoFocus
                >
                  <img
                    style={{ width: "25px" }}
                    className="mr-1"
                    src={item.image}
                    alt=""
                  />
                  <h4 className="m-0 p-0">{item.language}</h4>
                </div>
              </div>
            ))}
          </div>
        </Spin>
      </Modal>

      {/* access modal */}
      <Modal
        zIndex={10000}
        width={1000}
        centered
        visible={accessModal}
        // accessModal
        footer={false}
        closable={false}
      >
        <Spin spinning={startTestLoader}>
          <Divider orientation="center">
            <h3>
              <b>{t("Test haqida")}</b>
            </h3>
          </Divider>
          <p style={{ fontSize: "20px" }}>
            1. <i class="fa fa-question-circle" aria-hidden="true"></i>{" "}
            {t("Test 20 ta savoldan iborat bo'ladi.")}
          </p>
          <p style={{ fontSize: "20px" }}>
            2. <i class="fa fa-clock text-warning" aria-hidden="true"></i>{" "}
            {t("Testni yechish uchun sizga 25 daqiqa vaqt beriladi.")}
          </p>
          <p style={{ fontSize: "20px" }}>
            3. <i class="fa fa-random" aria-hidden="true"></i>{" "}
            {t(
              "Test savollari ketma ketlik tartibini hohlagan tarzda yechish mumkin."
            )}
          </p>
          <p style={{ fontSize: "20px" }}>
            4. <i class="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
            {t(
              "Har bitta savol uchun maqul javobni belgilaganingizda darhol javobingiz natijasi ko`rsatiladi"
            )}
          </p>
          <p style={{ fontSize: "20px" }}>
            5.{" "}
            <i class="fa fa-check-circle text-success" aria-hidden="true"></i>{" "}
            {t(
              "Testdan o'tish uchun kamida 18 ta savolga to'g'ri javob belgilashingiz lozim."
            )}
          </p>
          <p style={{ fontSize: "20px" }}>
            6.{" "}
            <i
              class="fa fa-exclamation-triangle text-danger"
              aria-hidden="true"
            ></i>{" "}
            {t(
              "Ikkitadan ko'p savolga noto'g'ri javob belgilasangiz urinishingiz yakunlanadi va testdan o'tmagan hisoblanasiz"
            )}
          </p>
          <p style={{ fontSize: "20px" }}>
            7.{" "}
            <i
              class="fa fa-exclamation-circle text-info"
              aria-hidden="true"
            ></i>{" "}
            {t("Tayyor bo'lsangiz testni boshlash tugmasini bosing !")}
          </p>
          <div className="text-center">
            <button
              onClick={() => startTest(1)}
              style={{ fontSize: "20px" }}
              className="btn start-button text-white w-100 d-flex justify-content-center align-items-center"
              autoFocus
            >
              <span>{t("Testni Boshlash")}</span>{" "}
              <span
                className={"functional_key ml-3 "}
                style={{ width: "auto" }}
              >
                Enter <AiOutlineEnter />
              </span>
            </button>
          </div>
        </Spin>
      </Modal>

      {/* time finished modal */}
      <Modal
        zIndex={10000}
        width={800}
        title="Test vaqti tugadi"
        visible={time_finished}
        footer={false}
        closable={false}
        // bodyStyle={{height:'80vh'}}
      >
        <div className="">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            placeat, rem sunt provident, iusto iste cupiditate non quibusdam
            voluptas illum sit nihil nemo alias atque.
          </p>
          <div className="text-center">
            <button
              onClick={() => settime_finished(false)}
              className="btn btn-light"
              autoFocus
            >
              {t("Testni Boshlash")}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        zIndex={10000}
        width={1000}
        title={t("To`g`ri javob tasnifi")}
        visible={isVisibleAnswerDescriptionModal}
        footer={false}
        onCancel={handleCancelAnswerDescriptionModal}
      >
        <p>{rightAnswerData?.answer_description}</p>
        {rightAnswerData?.answer_video ? (
          <video
            width="100%"
            height="auto"
            controls
            autoPlay={true}
            src={PATH_PREFIX_FILE + rightAnswerData?.answer_video}>
            {/*<source src={PATH_PREFIX_FILE + rightAnswerData?.answer_video} type="video/mp4"/>*/}
            Your browser does not support the video tag.
          </video>
        ):
            rightAnswerData?.link ?
                (
          <video
            width="100%"
            height="auto"
            controls
            autoPlay={true}
            src={PATH_PREFIX_FILE + rightAnswerData?.link}>
            {/*<source src={PATH_PREFIX_FILE + rightAnswerData?.answer_video} type="video/mp4"/>*/}
            Your browser does not support the video tag.
          </video>
        ):''
        }

        {/*<video src={PATH_PREFIX_FILE + rightAnswerData?.answer_video}></video>*/}
      </Modal>
    </div>
  );
};
export default TestComponent;
