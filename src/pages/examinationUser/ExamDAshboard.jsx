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

const ExamDashboard = props => {
  const [modal, setmodal] = useState(false);
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [reload, setReload] = useState(false);
  const mainContext = useContext(MainContext);
  console.log("con", mainContext);

  useEffect(() => {
    axios({
      url: PATH_PREFIX + "/examination-director/dashboard",
      method: "GET",
      params: {
        token,
      },
    }).then(res => {
      if (parseInt(res?.data?.status) === 1) {
        setData(res?.data?.data);
      }
    });
  }, [reload]);
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
      title: "Test topshirganlar",
      iconClass: "bx-copy-alt",
      description: data?.count_statuses?.all_count,
    },
    {
      title: "O'tganlar",
      iconClass: "bx bx-comment-minus",
      description: data?.count_statuses?.succesed_count,
    },
    {
      title: "Qaytganlar",
      iconClass: "bx bx-rotate-left",
      description: data?.count_statuses?.returned_count,
    },
  ];
  const email = [
    { title: "Week", linkto: "#", isActive: false },
    { title: "Month", linkto: "#", isActive: false },
    { title: "Year", linkto: "#", isActive: true },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Row>
            <Col xl="4">
              <WelcomeComp data={data} />
              <MonthlyEarning data={data} />
            </Col>
            <Col xl="8">
              <Row>
                {/* Reports Render */}
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
            </Col>
          </Row>

          <Row>
            <Col lg="12">{data && <LatestTranaction data={data} />}</Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

ExamDashboard.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(ExamDashboard);
