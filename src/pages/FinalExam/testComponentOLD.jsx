import React, { useContext } from "react";
import "./style.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PATH_PREFIX,
  PATH_PREFIX_INTALIM_TEST_FILES,
} from "Utils/AppVariables";
import { Modal, Button } from "antd";
import MainContext from "Context/MainContext";
import i18n from "i18n";
import CountDownTimer from "../Students/StudentTests/CountDownTimer";

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
}) => {
  const [languages, setLanguages] = useState([
    { id: 1, value: "uz", language: "O'zbek", functionalKey: "F1" },
    { id: 3, value: "kr", language: "Ўзбек", functionalKey: "F2" },
    { id: 5, value: "qq", language: "Qaraqalpaqsha", functionalKey: "F3" },
    { id: 2, value: "ru", language: "Pусский", functionalKey: "F4" },
  ]);

  const { setI18 } = useContext(MainContext);
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
  const [pressedKey, setPressedKey] = useState();
  const functionalKeys = ["F1", "F2", "F3", "F4", "F5"];

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
        if (res?.data?.status == "1") {
          setuserFullName(
            res?.data?.final_test_attempt?.final_test_student_access
              ?.student_fio
          );
          if (res?.data?.lang_status == 0) {
            setIsModalVisible(true);
          } else if (res?.data?.lang_status == 1) {
            setIsModalVisible(false);
          }
          if (
            res?.data?.general_status == "1" ||
            res?.data?.access_status == "0"
          ) {
            setaccessModal(true);
          }
        }
      });
    }
  }, [lang_id]);

  const startTest = num => {
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
          settest_time(parseInt(res?.data?.test_time));
        }
        setSelectedAnswerId("");
        setchecked_test(res?.data?.data);
        setIsStarted(true);
        // settest_time(res?.data?.left_time);
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
        console.log("pp", checked_test);
        setPressedKey(undefined);
      }
    });
  };

  const select_answer = answerId => {
    setSelectedAnswerId(answerId);
  };

  const handleKeyBtn = event => {
    event.preventDefault();
    if (event.keyCode === 39) {
      startTest(question_order + 1);
    } else if (event.keyCode === 37) {
      startTest(question_order - 1);
    } else if (event.keyCode === 97) {
      startTest(1);
    } else if (event.keyCode === 98) {
      startTest(2);
    } else if (event.keyCode === 99) {
      startTest(3);
    } else if (event.keyCode === 100) {
      startTest(4);
    } else if (event.keyCode === 101) {
      startTest(5);
    } else if (event.keyCode === 102) {
      startTest(6);
    } else if (event.keyCode === 103) {
      startTest(7);
    } else if (event.keyCode === 104) {
      startTest(8);
    } else if (event.keyCode === 105) {
      startTest(9);
    } else if (event.keyCode === 96) {
      startTest(10);
    } else if (event?.keyCode) {
      const key = event?.keyCode - 112;
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
        }
        startTest(question_order + 1);
      }
    });
  };

  const changeLanguageAction = lang => {
    i18n.changeLanguage(lang);
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

  // console.log('op',checked_test)
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const formdata = new FormData()
  //   if(token){
  //     formdata.append("time", 5)
  //     axios({
  //       url: PATH_PREFIX + "/final-test-user/timer",
  //       method: "POST",
  //       params: {
  //         token
  //       },
  //       data:formdata
  //     }).then(res => {
  //       if(res?.data?.status===1){
  //         settest_time(res?.data?.data?.left_time)
  //       }
  //     });
  //   }
  // }, [checkTime]);

  return (
    <div className="final_test_div" onKeyDown={handleKeyBtn} tabIndex="1">
      <div>
        <h4 className="mt-3" style={{ color: "#434343" }}>
          {userFullName}
        </h4>
        <div
          className="buttons  align-items-center justify-content-center mt-3 bg-white "
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            zIndex: 1000,
          }}
        >
          <div
            className={
              "d-flex justify-content-between align-items-center mr-5 "
            }
          >
            <div className={"d-flex"} style={{}}>
              Ism familiya otchestva
            </div>
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
                  >
                    {item?.order}
                  </span>
                ))}
              </div>
              <div className="num_test d-flex align-items-center justify-content-between">
                <div>
                  <a
                    onClick={e => startTest(question_order - 1, e)}
                    style={{ marginRight: "40px" }}
                    src=""
                    className={`mr-2 ml-5 ${
                      question_order === 1 ? "isCheck_button" : ""
                    }`}
                  >
                    <i className="fas fa-angle-left" />
                    Oldingisi
                  </a>
                  <a
                    onClick={e => startTest(question_order + 1, e)}
                    style={{ marginLeft: "40px" }}
                    src=""
                    className={`${
                      question_order === 20 ? "isCheck_button" : ""
                    }`}
                  >
                    Keyingisi
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
                  setIsTestEndedModalVisible={setIsTestEndedModalVisible}
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
                ></i>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row  ">
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
          <div className="col-12 col-md-5  ">
            <div className="test_content ">
              <div className="d-flex justify-content-end ">
                <Button
                  className={""}
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
                      <span className={"functional_key_small"}>
                        {functionalKeys[pressedKey - 112]}
                      </span>
                    )
                  }
                >
                  Javobni tasdiqlash
                </Button>
              </div>
              <div
                className={`answers ${
                  checked_test?.status == 1 ? "isCheck" : ""
                }`}
              >
                {dataAnswers?.map((item, i) => (
                  <div className={"d-flex align-items-center"}>
                    <div className={"functional_key"}>{functionalKeys[i]}</div>
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
                    >
                      <span className="mr-2">
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
            </div>
          </div>
          <div
            className="col-12 col-md-7 d-flex justify-content-center "
            style={{ objectFit: "cover" }}
          >
            {Object.keys(dataBody).map((keyName, i) =>
              dataBody[keyName]?.type == "2" ? (
                <div>
                  <img
                    className="image"
                    src={
                      PATH_PREFIX_INTALIM_TEST_FILES + dataBody[keyName]?.value
                    }
                    alt=""
                  />
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
        <div className="buttons2 mt-5">
          <div className="num_test2">
            <a
              onClick={e => startTest(question_order - 1, e)}
              style={{ marginRight: "40px" }}
              src=""
              className={`mr-2 ml-5 ${
                question_order === 1 ? "isCheck_button" : ""
              }`}
            >
              <i className="fas fa-angle-left" />
              Oldingisi
            </a>
            <a
              onClick={e => startTest(question_order + 1, e)}
              style={{ marginLeft: "40px" }}
              src=""
              className={`${question_order === 20 ? "isCheck_button" : ""}`}
            >
              Keyingisi
              <i className="fas fa-angle-right" />
            </a>
          </div>
        </div>
        {/*{accessModal || !isModalVisible &&*/}
        {/*<div className="row">*/}
        {/*    <div className="co-12 col-md-6">*/}
        {/*        <div className="card">*/}
        {/*            <div className="card-body">*/}
        {/*                <h5>To'g'ri javoblar: {test_result?.correct_answers}</h5>*/}
        {/*                <h5>Noto'g'ri javoblar: {test_result?.incorrect_answers}</h5>*/}
        {/*                /!*<h5>Natija: {(test_result?.correct_answers/20)*100 !== NaN && (test_result?.correct_answers/20)*100}%</h5>*!/*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*}*/}
      </div>
      <Modal
        zIndex={10000}
        width={600}
        title="Tilni tanlang"
        visible={isModalVisible}
        footer={false}
        closable={false}
      >
        <div className="row">
          {languages?.map((item, index) => (
            <div key={index} className=" col-12">
              <div className={"functional_key"}>sds</div>
              <div
                className="select-test-lang"
                onClick={() => {
                  changeLanguageAction(item.value), setLang_id(item.id);
                }}
              >
                {item.language}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* access modal */}
      <Modal
        zIndex={10000}
        width={600}
        title="Test haqida"
        visible={accessModal}
        footer={false}
        closable={false}
      >
        <div className="">
          <p>
            <i className="fa fa-question-circle" aria-hidden="true"></i> Test{" "}
            <b>20 ta savoldan</b> iborat bo'ladi.
          </p>
          <p>
            <i className="fa fa-clock text-warning" aria-hidden="true"></i>{" "}
            Testni yechish uchun sizga <b>25 daqiqa</b> vaqt beriladi.
          </p>
          <p>
            <i className="fa fa-random" aria-hidden="true"></i> Test savollari
            ketma ketlik tartibini hohlagan tarzda yechish mumkin.
          </p>
          <p>
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i> Har
            bitta savol uchun maqul javobni belgilaganingizda darhol javobingiz
            natijasi ko`rsatiladi
          </p>
          <p>
            <i
              className="fa fa-check-circle text-success"
              aria-hidden="true"
            ></i>{" "}
            Testdan o'tish uchun kamida <b>18 ta savolga to'g'ri</b> javob
            belgilashingiz lozim.
          </p>
          <p>
            <i
              className="fa fa-exclamation-triangle text-danger"
              aria-hidden="true"
            ></i>{" "}
            Ikkitadan ko'p savolga noto'g'ri javob belgilasangiz urinishingiz
            yakunlanadi va testdan o'tmagan hisoblanasiz
          </p>
          <p>
            <i
              className="fa fa-exclamation-circle text-info"
              aria-hidden="true"
            ></i>{" "}
            Tayyor bo'lsangiz testni boshlash tugmasini bosing !
          </p>
          <div className="text-center">
            <button onClick={() => startTest(1)} className="btn btn-light">
              Testni Boshlash
            </button>
          </div>
        </div>
      </Modal>

      {/* time finished modal */}
      <Modal
        zIndex={10000}
        // width={2600}
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
            >
              Testni Boshlash
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default TestComponent;
