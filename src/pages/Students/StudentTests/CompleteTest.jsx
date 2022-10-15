import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import { PATH_PREFIX_TEST_FILE } from "Utils/AppVariables";
import clsx from "clsx";
import styles from "./style.module.scss";
import ResultTest from "./Result_tests";
import CountDownTimer from "./CountDownTimer";
import CompleteTestPart from "./CompleteTestPart";
import QuestionCounter from "./QuestionCounter";
import Swal from "sweetalert2/dist/sweetalert2.js";
import SavingBtn from "./SavingBtn";

const hoursMinSecs = { minutes: 25, seconds: 0 };
const templateTestTime = { minutes: 15, seconds: 0 };

const CompleteTest = ({ isType }) => {
  const location = useLocation();
  const history = useHistory();
  const [isfinished, setIsFinished] = useState(false);
  const [results, setResults] = useState([]);
  const [isFinishedTime, setIsFinishedTime] = useState(1);

  const childRef = useRef();

  useEffect(() => {
    if (isFinishedTime === 0) {
      childRef.current.submitTest();
    }
  }, [isFinishedTime]);

  const onSubmitToCheck = () => {
    Swal.fire({
      title: "Testni yakunlaysizmi?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ha",
      cancelButtonText: "Yo'q",
    }).then(result => {
      if (result.isConfirmed) {
        childRef.current.submitTest();
      }
    });
  };

  

  const displayingQuestion = element => {
    if (element.type === 1 || element.type === "1") {
      return <span className="font-size-17">{element.value}</span>;
    } else if (element.type === 2 || element.type === "2") {
      return (
        <div className="my-2">
          <img
            width="100%"
            height="100%"
            src={PATH_PREFIX_TEST_FILE + element.value}
            alt=""
          />
        </div>
      );
    }
  };
  const displayingVariants = element => {
    if (element.type === 1 || element.type === "1") {
      return <span className="font-size-16">{element.value}</span>;
    } else if (element.type === 2 || element.type === "2") {
      return (
        <div>
          <img
            width="100%"
            height="100%"
            src={PATH_PREFIX_TEST_FILE + element.value}
            alt=""
          />
        </div>
      );
    }
  };

  const get_abc = index => {
    switch (index) {
      case 0:
        return "A) ";
      case 1:
        return "B) ";
      case 2:
        return "C) ";
      case 3:
        return "E) ";
      case 4:
        return "D) ";
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="font-size-14 mb-3 top_links_page_box">
          <NavLink to="/dashboard">Bosh sahifa</NavLink>
          <span className="font-size-10 mx-1">/</span>
          <NavLink to="/test">Test</NavLink>
          <span className="font-size-10 mx-1">/</span>
          <span className="text-secondary">{location?.state?.name}</span>
        </div>
        <div className="top_links_page_title">
          <span className="mr-3" onClick={() => history.goBack()}>
            <i className="bx bx-arrow-back"> </i>
          </span>
          <span>{location?.state?.name}</span>
        </div>
        {!isfinished ? (
          <Card className={styles.complete_test_page}>
            <CardBody>
              <Container fluid>
                <Row>
                  <Col xl={12}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <QuestionCounter />
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          className="d-flex align-items-center font-size-18"
                          style={{ fontWeight: 500 }}
                        >
                          <i className="bx bx-time mr-2 d-block font-size-18"></i>
                          <CountDownTimer
                            hoursMinSecs={
                              location?.state?.isType === 1
                                ? hoursMinSecs
                                : templateTestTime
                            }
                            setIsFinishedTime={setIsFinishedTime}
                          />
                        </div>
                        <button
                          className={clsx("btn btn-primary ml-2")}
                          onClick={onSubmitToCheck}
                        >
                          Testni yakunlash
                        </button>
                        <SavingBtn />
                      </div>
                    </div>
                  </Col>
                  <CompleteTestPart
                    ref={childRef}
                    get_abc={get_abc}
                    displayingQuestion={displayingQuestion}
                    displayingVariants={displayingVariants}
                    setResults={setResults}
                    setIsFinished={setIsFinished}
                    isType={location?.state?.isType}
                  />
                </Row>
              </Container>
            </CardBody>
          </Card>
        ) : (
          <ResultTest
            data={results}
            displayingVariants={displayingVariants}
            displayingQuestion={displayingQuestion}
            get_abc={get_abc}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default React.memo(CompleteTest);