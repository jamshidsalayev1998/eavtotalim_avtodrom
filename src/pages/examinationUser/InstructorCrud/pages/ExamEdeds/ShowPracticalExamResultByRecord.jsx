import React, { useState, useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { getExaminationAreaSensorsForInstructor } from "../../../../../services/api_services/examination_area_instructor";
import { PATH_PREFIX_FILE } from "../../../../../Utils/AppVariables";
import {
  getStudentPracticalExamResult,
  getStudentPracticalExamResultByRecord,
} from "../../../../../services/api_services/student_practical_exam_result";
import "./showPracticalExamResultStyle.css";
import {
  Card,
  CardBody,
  Container,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { Col, Row, List } from "antd";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { BsPrinter } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const ShowPracticalExamResultByRecord = props => {
  const match = useRouteMatch(
    "/examination-instructor/final-exam-results-by-record/:id"
  );
  const [data, setData] = useState([]);
  const [resultData, setResultData] = useState();
  const [reloader, setReloader] = useState(true);
  const [modal, setModal] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const toggle = () => setModal(!modal);
  useEffect(() => {
    (async () => {
      let filters = [
        {
          fieldKey: "edu_type_id",
          value: props?.location?.state?.car_edu_type_id,
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
    getPracticalResult();
  }, []);

  const getPracticalResult = () => {
    (async () => {
      const res2 = await getStudentPracticalExamResultByRecord(
        match?.params?.id
      );
      if (res2?.data?.status == 1) {
        setResultData(res2?.data?.data);
      }
    })();
  };

  const history = useHistory();
  const getResult = elementId => {
    let fdata = resultData?.practical_result?.filter(data => {
      return data?.sensor_id == elementId;
    });
    if (parseInt(fdata[0]?.result)) {
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
    <div className="page-content">
      <Container fluid>
        <Card>
          <CardBody>
            {/* Statement  making button */}
            <div className="top-organizations d-flex justify-content-between">
              <b className="text-dark text-bold">{resultData?.student_fio}</b>
              <div className={"d-flex"}>
                <Button color="success" onClick={toggle}>
                  <HiOutlineDocumentText className="mr-2 font-size-18" />
                  Bayonnoma shakillantirish
                </Button>
              </div>
            </div>

            <div className="crypto-buy-sell-nav mt-3">
              <Row className={"justify-content-between border p-3 "}>
                <Col xl={8} md={12} sm={24} className={"text-center"}>
                  Ta'lim turi: <b>{resultData?.edu_type?.short_name_uz}</b>
                </Col>
                <Col xl={8} md={12} sm={24} className={"text-center"}>
                  Passport: <b>{resultData?.student_passport}</b>
                </Col>
                <Col xl={8} md={12} sm={24} className={"text-center"}>
                  Jarima bali:{" "}
                  <b>
                    {resultData?.thisRecord?.penalty_ball
                      ? resultData?.thisRecord?.penalty_ball
                      : 0}
                  </b>
                </Col>
                <Col xl={8} md={12} sm={24} className={"text-center"}>
                  Avtomobil nomi:{" "}
                  <b>{resultData?.thisRecord?.examination_area_car?.name}</b>
                </Col>
                <Col xl={8} md={12} sm={24} className={"text-center"}>
                  Avtomobil raqami:{" "}
                  <b>{resultData?.thisRecord?.examination_area_car?.number}</b>
                </Col>
                <Col xl={8} md={12} sm={24} className={"text-center"}>
                  Avtomobil gps raqami:{" "}
                  <b>{resultData?.thisRecord?.examination_area_car?.gps_id}</b>
                </Col>
              </Row>
              <Row className={"p-3 border"}>
                {data?.map((element, index) => {
                  return (
                    <Col
                      xl={12}
                      md={24}
                      className={`d-flex border p-3 ${
                        hasResult(element?.sensor_id)
                          ? getResult(element?.sensor_id)
                            ? "success-sensor"
                            : "danger-sensor"
                          : "warning-sensor"
                      }`}
                    >
                      <Row className={"w-100 justify-content-between"}>
                        <Col xl={18} md={18} className={"d-flex "}>
                          <div style={{ width: "33%" }}>
                            <img
                              style={{ width: "100%" }}
                              src={PATH_PREFIX_FILE + element?.image}
                              alt=""
                            />
                          </div>
                          <div style={{ width: "66%" }}>
                            <div className={"d-flex"}>
                              <h4>{element?.name}</h4>
                            </div>
                            <div
                              style={{
                                overflow: "hidden",
                                overflowY: "scroll",
                                maxHeight: "100px",
                              }}
                              className={"w-100 "}
                            >
                              {getPenalties(element?.sensor_id)?.map(
                                (elPEnalty, indexPenalty) => {
                                  return (
                                    <div>
                                      {
                                        elPEnalty
                                          ?.examination_area_sensor_penalty
                                          ?.name
                                      }{" "}
                                      uchun -{" "}
                                      {
                                        elPEnalty
                                          ?.examination_area_sensor_penalty
                                          ?.penalty_ball
                                      }{" "}
                                      jarima bali
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col xl={6} md={6}>
                          <div className={"p-1 w-100 text-center border "}>
                            <h1>{index + 1}</h1>
                          </div>
                          <div className={"p-1 w-100 text-center border "}>
                            <b>
                              {hasResult(element?.sensor_id)
                                ? getResult(element?.sensor_id)
                                  ? "TOPSHIRDI"
                                  : "TOPSHIRMADI"
                                : "KUTILMOQDA"}
                            </b>
                          </div>
                          <span className={"w-100 "}>
                            sensor: {element?.sensor_id}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
              {resultData?.listOfPenalties?.length > 0 ? (
                <Row className={"p-3 border"}>
                  <Col xl={24} className={"text-center"}>
                    <b>Avtomobil bortidagi jarimalar</b>
                  </Col>
                  <Col xl={24}>
                    <List
                      itemLayout="horizontal"
                      dataSource={resultData?.listOfPenalties}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            title={<span>{item?.name}</span>}
                            description={item?.penalty_ball + " jarima bali"}
                          />
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </div>
          </CardBody>
        </Card>
      </Container>

      {/* Statement making table */}
      <Modal
        isOpen={modal}
        toggle={toggle}
        scrollable={true}
        centered={true}
        size="xl"
      >
        <ModalHeader toggle={toggle}>Bayonnoma</ModalHeader>
        <ModalBody>
          <div
            className="exam-statement p-3"
            style={{ backgroundColor: "#fff" }}
            ref={componentRef}
          >
            <div>
              <div className="text-center">
                <p>
                  <strong>Avtomobil boshqarish bo‘yicha imtihon</strong>
                </p>
                <p>
                  <strong>VARAQASI</strong>
                </p>
              </div>
              <div>
                <p className="p-0 m-0 px-2">{resultData?.student_fio}</p>
                <p className="text-center border-top">
                  (familiyasi, ismi, otasining ismi, tug‘ilgan yili)
                </p>
              </div>
            </div>

            <Table className="table table-rounded table-bordered">
              <Thead>
                <Tr className="text-center align-middle">
                  <Th className="">T/r</Th>
                  <Th>Xatoliklar</Th>

                  <Th>
                    <p className="m-0 my-1">
                      Imtihon o‘tkazilgan sana
                      <br />
                      <span className="text-secondary">
                        {moment(
                          resultData?.thisRecord?.updated_at
                            ? resultData?.thisRecord?.updated_at
                            : 0
                        ).format("YYYY-MM-DD")}
                      </span>
                    </p>
                    <hr className="m-0 p-0" />
                    <p className="m-0 my-1">Jarima ball</p>
                  </Th>
                </Tr>
              </Thead>
              <Tbody className="text-center">
                {resultData?.listOfPenalties.map((v, i) => {
                  return (
                    <>
                      <Tr key={i}>
                        <Td>
                          <span>{i + 1}</span>
                        </Td>
                        <Td className="text-left">
                          <span>{v?.name}</span>
                        </Td>
                        <Td className="text-left">
                          <span>{v?.penalty_ball}</span>
                        </Td>
                      </Tr>
                    </>
                  );
                })}

                <Tr>
                  <Td colSpan="3" className="text-left">
                    Jami natijalari:{" "}
                    {resultData?.listOfPenalties
                      .map((v, i) => v?.penalty_ball)
                      .reduce((a, b) => a + b)}
                  </Td>
                </Tr>
              </Tbody>
            </Table>

            <div>
              <div>
                <p className="my-2">
                  <b>Imtihon natijasi:</b> <span>Topshirmadi</span>
                </p>
              </div>

              <div>
                <p className="my-2">
                  <b>Tibbiy ma’lumotnoma raqami, berilgan joyi, sanasi: </b>
                  <span>124563, Toshkent sh. Yunusobod t, 12/12/2022</span>
                </p>
              </div>

              <div>
                <p className="my-2">
                  <b> Amaliy imtihonni qabul qilgan mas’ul xodim: </b>
                  <span>Umaraliyev Jamshid Hamidjonovich</span>
                </p>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            <IoClose /> Yopish
          </Button>

          <Button color="success" onClick={handlePrint}>
            <BsPrinter className="font-size-18" /> Chiqarish
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ShowPracticalExamResultByRecord;
