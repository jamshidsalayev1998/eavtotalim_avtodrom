import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap";
import { Button, message, Popconfirm } from "antd";
import StackedColumnChart from "./StackedColumnChart";
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import LatestTranaction from "./LatestTranaction";
import { withTranslation } from "react-i18next";
import axios from "axios";
import { Tooltip } from "antd";
import { changeExaminationAreaStatus } from "../../services/api_services/examination_director/examination_area_status_api";
import PoweroffOutlined from "@ant-design/icons/lib/icons/PoweroffOutlined";
import MainContext from "../../Context/MainContext";
import { parse } from "echarts/extension-src/dataTool/gexf";
import { PATH_PREFIX } from "Utils/AppVariables";
import styles from "./index.module.sass";
import { Fade } from "react-awesome-reveal";
import { useQuery } from "react-query";
import { useMemo } from "react";

const ExamDashboard = props => {
  const [modal, setmodal] = useState(false);
  // const [data, setData] = useState();
  const [reload, setReload] = useState(false);
  const mainContext = useContext(MainContext);

  const token = localStorage.getItem("token");

  const {
    isLoading,
    error,
    data: data2,
  } = useQuery("data2Data", () =>
    axios.get(`${PATH_PREFIX}/examination-director/dashboard`, {
      method: "GET",
      params: {
        token,
      },
    })
  );

  // useEffect(() => {
    // axios({
    //   url: PATH_PREFIX + "/examination-director/dashboard",
    //   method: "GET",
    //   params: {
    //     token,
    //   },
    // }).then(res => {
    //   if (parseInt(res?.data?.status) === 1) {
    //   }
    // });
    // setData(data2?.data?.data);
  // }, [reload]);

  const changeStatusWork = () => {
    (async () => {
      const response = await changeExaminationAreaStatus();
      if (response) {
        message.success(response?.message);
        setReload(!reload);
      }
    })();
  };
  const reports = [
    {
      title: "Topshirganlar",
      iconClass: "bx-copy-alt",
      description: data2?.data?.data?.count_statuses?.all_count,
    },
    {
      title: "O'tganlar",
      iconClass: "bx bx-comment-minus",
      description: data2?.data?.data?.count_statuses?.succesed_count,
    },
    {
      title: "Qaytganlar",
      iconClass: "bx bx-rotate-left",
      description: data2?.data?.data?.count_statuses?.returned_count,
    },
  ];

  const email = [
    { title: "Week", linkto: "#", isActive: false },
    { title: "Month", linkto: "#", isActive: false },
    { title: "Year", linkto: "#", isActive: true },
  ];

  return (
    <>
      <div className="content-layout">
        <div className={styles.dash}>
          <div>
            <WelcomeComp data={data2?.data?.data} />
            <MonthlyEarning data={data2?.data?.data} />
          </div>
          <Fade
            delay={150}
            triggerOnce={true}
            direction={"right"}
            className={styles.dash__static}
          >
            <div>
              <p className="big-title">
                {data2?.data?.data?.this_year} - yildagi oylik kelganlar
              </p>
              {data2?.data?.data && (
                <StackedColumnChart data={data2?.data?.data} />
              )}
              <div>
                <div className={styles.dash__cards}>
                  {reports.map((report, key) => (
                    <div key={"_col_" + key} className={styles.dash__card}>
                      <p className="medium-title">{report.title}</p>
                      <p className="small-title">{report.description}</p>
                      <i
                        className={
                          "bx " + report.iconClass + " font-size-24 small-title"
                        }
                      />
                    </div>
                  ))}
                  {parseInt(mainContext?.role) === 13 ? (
                    <div>
                      <div>
                        <div
                          style={{
                            color: parseInt(
                              data2?.data?.data?.examination_area?.status_work
                            )
                              ? "black"
                              : "red",
                            textAlign: "center",
                          }}
                          className={`${styles.dash__active} medium-title`}
                        >
                          <p>
                            {parseInt(
                              data2?.data?.data?.examination_area?.status_work
                            )
                              ? "Tizim faol holatda"
                              : "Tizim faol holat emas"}
                          </p>

                          <Tooltip
                            placement={"top"}
                            title={
                              parseInt(
                                data2?.data?.data?.examination_area?.status_work
                              )
                                ? "Tizimni o'chirish"
                                : "Tizimni yoqish"
                            }
                          >
                            <Popconfirm
                              placement={"left"}
                              onConfirm={changeStatusWork}
                              okText={
                                parseInt(
                                  data2?.data?.data?.examination_area
                                    ?.status_work
                                )
                                  ? "O'chirish"
                                  : "Yoqish"
                              }
                              cancelText={"Bekor qilish"}
                              title={
                                parseInt(
                                  data2?.data?.data?.examination_area
                                    ?.status_work
                                )
                                  ? "Tizimni o'chirasizmi?"
                                  : "Tizimni yoqasizmi?"
                              }
                            >
                              <div
                                className="mini-stat-icon avatar-sm rounded-circle  align-self-center"
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "100%",
                                }}
                              >
                                <span
                                  style={{
                                    backgroundColor: "blue",
                                    width: 40,
                                    height: 40,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    borderRadius: "50%",
                                  }}
                                >
                                  <PoweroffOutlined />
                                </span>
                              </div>
                            </Popconfirm>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Fade>
        </div>
        {/* <Col xl="8">
              <Row>
                {reports.map((report, key) => (
                  <Col md="3" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Media>
                          <Media body>
                            <p classN ame="text-muted font-weight-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </Media>
                          <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                            <span className="avatar-title">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              />
                            </span>
                          </div>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
                {parseInt(mainContext?.role) === 13 ? (
                  <Col md="3">
                    <Card
                      className={`${
                        parseInt(data?.examination_area?.status_work)
                          ? "bg-success"
                          : "bg-danger"
                      } mini-stats-wid`}
                    >
                      <CardBody>
                        <Media>
                          <Media body>
                            <p className="text-muted font-weight-medium">
                              {parseInt(data?.examination_area?.status_work)
                                ? "Tizim faol holatda"
                                : "Tizim faol holat emas"}
                            </p>
                            <h4 className="mb-0" />
                          </Media>
                          <Tooltip
                            placement={"top"}
                            title={
                              parseInt(data?.examination_area?.status_work)
                                ? "Tizimni o'chirish"
                                : "Tizimni yoqish"
                            }
                          >
                            <Popconfirm
                              placement={"left"}
                              onConfirm={changeStatusWork}
                              okText={
                                parseInt(data?.examination_area?.status_work)
                                  ? "O'chirish"
                                  : "Yoqish"
                              }
                              cancelText={"Bekor qilish"}
                              title={
                                parseInt(data?.examination_area?.status_work)
                                  ? "Tizimni o'chirasizmi?"
                                  : "Tizimni yoqasizmi?"
                              }
                            >
                              <div
                                className="mini-stat-icon avatar-sm rounded-circle  align-self-center"
                                style={{ cursor: "pointer" }}
                              >
                                <span className="avatar-title">
                                  <PoweroffOutlined />
                                </span>
                              </div>
                            </Popconfirm>
                          </Tooltip>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                ) : (
                  ""
                )}
              </Row>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4 float-sm-left">
                    {data?.this_year} - yildagi oylik kelganlar
                  </CardTitle>
                  <div className="clearfix"></div>
                  {data && <StackedColumnChart data={data} />}
                </CardBody>
              </Card>
            </Col> */}

        <div>
          {data2?.data?.data && <LatestTranaction data={data2?.data?.data} />}
        </div>
      </div>
    </>
  );
};

ExamDashboard.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(ExamDashboard);
