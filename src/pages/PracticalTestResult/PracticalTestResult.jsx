import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import axios from "axios";
import moment from "moment";
import { PATH_PREFIX, PATH_PREFIX_FILE } from "Utils/AppVariables";

const PracticalTestResultPage = () => {
  const [data, setData] = useState([]);
  const [resultData, setResultData] = useState();
  const [reloader, setReloader] = useState(true);
  useEffect(() => {
    (async () => {})();
    let intervalId = setInterval(() => {
      getPracticalResult();
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getPracticalResult = () => {
    axios({
      url: PATH_PREFIX + "/practical-exam-sensor-data-index-with-sensor",
      method: "GET",
    }).then(response => {
      setData(response?.data);
    });
  };

  const history = useHistory();

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
                        <div className="col-5">
                          <img
                            src={PATH_PREFIX_FILE + element?.sensor?.image}
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className="col-7 d">
                          <div>
                            <h5>{element?.sensor?.name} </h5>
                          </div>
                          <div
                            className={
                              element?.value?.data?.result === "1"
                                ? "bg-success"
                                : "bg-danger"
                            }
                          >
                            {element?.value?.data?.result === "1"
                              ? "o`tdi"
                              : "yiqildi"}
                          </div>
                          <div>
                            Avtomobil ID: <b>{element?.value?.data?.car_id}</b>
                          </div>
                          <div>
                            sensor ID: <b>{element?.value?.data?.sensor_id}</b>
                          </div>
                          <div>
                            Vaqti:{" "}
                            <b>
                              {moment(element?.created_at).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            </b>
                          </div>
                        </div>
                      </div>
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

export default PracticalTestResultPage;
