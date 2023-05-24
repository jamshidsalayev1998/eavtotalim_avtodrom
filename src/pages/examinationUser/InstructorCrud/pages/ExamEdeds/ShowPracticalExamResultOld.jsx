import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { getExaminationAreaSensorsForInstructor } from "../../../../../services/api_services/examination_area_instructor";
import { PATH_PREFIX_FILE } from "../../../../../Utils/AppVariables";
import { getStudentPracticalExamResult } from "../../../../../services/api_services/student_practical_exam_result";
import "./showPracticalExamResultStyle.css";
import { Button, Col, Row } from "antd";

const ShowPracticalExamResults = props => {
  console.log("props", props);
  const match = useRouteMatch(
    "/examination-instructor/exam-ended-students/:id"
  );
  const [data, setData] = useState([]);
  const [resultData, setResultData] = useState();
  const [reloader, setReloader] = useState(true);
  useEffect(() => {
    (async () => {
      let filters = [
        {
          fieldKey: "edu_type_id",
          value: props?.location?.state?.edu_type_id,
        },
      ];
      let params = {
        filters: JSON.stringify(filters),
      };
      const res = await getExaminationAreaSensorsForInstructor(params);
      if (res?.data?.status == 1) {
        setData(res?.data?.data);
      }
      getPracticalResult();
    })();
    let intervalId = setInterval(() => {
      getPracticalResult();
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getPracticalResult = () => {
    (async () => {
      const res2 = await getStudentPracticalExamResult(match?.params?.id);
      if (res2?.data?.status == 1) {
        setResultData(res2?.data?.data);
      }
    })();
  };

  console.log("resData", resultData?.practical_result[15]);
  const history = useHistory();
  const getResult = elementId => {
    let fdata = resultData?.practical_result?.filter(data => {
      return data?.sensor_id == elementId;
    });
    if (fdata[0]?.result) {
      return 1;
    } else {
      return 0;
    }
  };
  const getPenalties = elementId => {
    let fdata = resultData?.practical_result_penalties?.filter(data => {
      return data?.sensor_id == elementId;
    });
    return fdata;
  };
  const hasResult = elementId => {
    let fdata = resultData?.practical_result?.filter(data => {
      return data?.sensor_id == elementId;
    });
    if (fdata?.length > 0) {
      return 1;
    } else {
      return 0;
    }
  };
  return (
    <>
      <div className="page-content">
        <div className="head-items-bar d-flex justify-content-between">
          <div className="d-flex">
            <span
              className="mr-3"
              style={{
                fontSize: "20px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => history.goBack()}
            >
              <i className="bx bx-arrow-back"> </i>
            </span>
            <h4>{resultData?.student_fio}</h4>
          </div>
        </div>
        <div className="mt-3">
          <div className="row">
            {data.map((element, index) => {
              return (
                <div className="col-xl-3 col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="row mb-1">
                        <div
                          className="col-5 "
                          style={{ height: "150px", overflow: "hidden" }}
                        >
                          <img
                            src={PATH_PREFIX_FILE + element?.image}
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className="col-7  p-2">
                          <div
                            className={"w-100 d-flex justify-content-between"}
                          >
                            <h4>{element?.name} </h4>
                            <span className={"number-box"}>{index + 1}</span>
                          </div>
                        </div>
                        {hasResult(element?.sensor_id) ? (
                          getResult(element?.sensor_id) ? (
                            <span
                              style={{ width: "100%" }}
                              className="btn btn-success"
                            >
                              To`g`ri bajarildi
                            </span>
                          ) : (
                            <span
                              style={{ width: "100%" }}
                              className="btn btn-danger"
                            >
                              Noto`g`ri bajarildi
                            </span>
                          )
                        ) : (
                          <span
                            style={{ width: "100%" }}
                            className="btn btn-warning"
                          >
                            Kutilmoqda
                          </span>
                        )}
                      </div>
                      <Row className={""}>
                        <Col xl={12} className={"text-center"}>
                          <Button
                            className={"w-100 bg-success text-white"}
                            icon={<i className={"fa fa-check "}></i>}
                          ></Button>
                        </Col>
                        <Col xl={12} className={"text-center"}>
                          <Button
                            className={"w-100 bg-danger text-white"}
                            icon={
                              <i className="fa fa-ban" aria-hidden="true"></i>
                            }
                          ></Button>
                        </Col>
                      </Row>
                      <div className={""}>
                        <span>sensor:{element?.sensor_id}</span>
                      </div>
                      <Row>
                        {getPenalties(element?.sensor_id)?.map(
                          (elPEnalty, indexPenalty) => {
                            return (
                              <div>
                                {
                                  elPEnalty?.examination_area_sensor_penalty
                                    ?.name
                                }{" "}
                                uchun -{" "}
                                {
                                  elPEnalty?.examination_area_sensor_penalty
                                    ?.penalty_ball
                                }{" "}
                                jarima bali
                              </div>
                            );
                          }
                        )}
                      </Row>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowPracticalExamResults;
