import React, { useState, useEffect, useContext, useRef } from "react";
import { Card, CardBody, Container, Badge } from "reactstrap";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import {
  Modal,
  Button,
  Select,
  Tabs,
  Row,
  Col,
  Input,
  message,
  Form,
} from "antd";
import { getFinalAccessStudentById } from "../../../../services/api_services/getFinalAccessStudentById";
import { allowSeparatelyStudent } from "../../../../services/api_services/final_test_admin_api";
import { parse } from "echarts/extension-src/dataTool/gexf";

const FinalAccessAdminQrCodeScanner = props => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [temporary, setTemporary] = useState("");
  const [confirm_form] = Form.useForm();
  // const inputEl =
  const inputEl = useRef();
  useEffect(() => {}, []);

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
              allowFinalExam(data?.id);
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
      if (response?.data?.status == 1) {
        setData(response?.data?.data);
        message.success("Ma`lumot topildi");
        setTemporary(inputValue);
      }
      if (response?.data?.status == 0) {
        setData(null);
        message.error(response?.data?.message);
      }
      setInputValue(null);
    })();
  };

  const getReload = itemId => {
    (async () => {
      const response = await getFinalAccessStudentById(itemId);
      if (response?.data?.status == 1) {
        setData(response?.data?.data);
        setTemporary(inputValue);
      }
      if (response?.data?.status == 0) {
        setData(null);
        message.error(response?.data?.message);
      }
      setInputValue(null);
    })();
  };

  const clearAllData = () => {
    setData(null);
    setInputValue("");
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
  // const handleKeyBtn = event => {
  //     event.preventDefault();
  //     if (event.keyCode === 13) {
  //         if (data != null) {
  //             if (parseInt(data?.status) === 1) {
  //                 allowFinalExam(data?.id)
  //             }
  //         }
  //     }
  // };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <h5 className="text-dark">
                  {t("O`quvchiga testga ruxsat berish(Nazariy)")}
                </h5>
                <Col xl={6} className={"d-flex justify-content-end"}>
                  <button
                    className={"btn btn-outline-danger"}
                    onClick={clearAllData}
                  >
                    <i className={"fa fa-times"}></i>
                  </button>
                </Col>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                <Row className="justify-content-between">
                  <Col xl={6}>
                    <Input
                      style={{ opacity: "0" }}
                      ref={inputEl}
                      onChange={e => setInputValue(e?.target?.value)}
                      onBlur={focusInput}
                      autoFocus={true}
                      onKeyUp={key_up}
                      // type={"number"}
                      value={inputValue}
                    />
                  </Col>
                </Row>
                {data != null && (
                  <Row className={"pt-5"} style={{ fontSize: "25px" }}>
                    <Col xl={12} className={"border p-3"}>
                      <p>
                        F.I.O:
                        <b>{data?.student_fio}</b>
                      </p>
                      <p>
                        Pasport:
                        <b>{data?.student_passport}</b>
                      </p>
                      <p>
                        Tel:
                        <b>{data?.student_phone}</b>
                      </p>
                      <p></p>
                    </Col>
                    <Col xl={6} className={" justify-content-end border p-3"}>
                      <div className={"w-100"}>
                        {data?.payment_status ? (
                          <Badge color={"success"}>
                            Nazariy imtihonga to`lov tasdiqlangan
                          </Badge>
                        ) : (
                          <Badge color={"danger"}>
                            Nazariy imtihonga to`lov tasdiqlanmagan
                          </Badge>
                        )}
                      </div>
                    </Col>
                    <Col
                      xl={6}
                      className={" justify-content-end  border p-3 text-center"}
                    >
                      <b>Kompyuter</b>
                      <div style={{ fontSize: "50px" }}>
                        <b>{data?.merged_computer?.computer?.order}</b>
                      </div>
                    </Col>
                    <Col xl={24} className={"text-center"}>
                      <Col xl={24} className={"ml-auto mr-auto"}>
                        {data?.status == 1 && (
                          <button
                            disabled={!data?.payment_status}
                            onClick={() => allowFinalExam(data?.id)}
                            className={"btn btn-outline-success p-3 w-100"}
                          >
                            Nazariy imtihonga <b>Ruxsat berish</b>
                          </button>
                        )}
                        {data?.status == 2 && (
                          <span className={"text-success p-3 w-100"}>
                            Nazariy imtihonga <b>Ruxsat berilgan</b>
                          </span>
                        )}
                      </Col>
                    </Col>
                  </Row>
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(FinalAccessAdminQrCodeScanner);
