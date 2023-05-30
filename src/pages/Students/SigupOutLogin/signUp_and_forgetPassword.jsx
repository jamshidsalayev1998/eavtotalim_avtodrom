import { Button, Col, Divider, Row } from "antd";
import React from "react";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { NavLink, useHistory } from "react-router-dom";
import { Card } from "reactstrap";
import "./style.scss";

const SignUpAndForgetPassword = () => {
  const history = useHistory();
  return (
    <div
      className="registration-page"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <Row>
        <Col>
          <Divider
            className={
              "d-flex justify-content-center align-items-center font-size-20 my-4"
            }
          >
            Online ro'yhatdan o'tish sahifasi
          </Divider>

          <Row gutter={16}>
            <Col
              xs={24}
              sm={24}
              md={12}
              className={"d-flex justify-content-center align-items-center"}
            >
              <NavLink to={"/online-registration"}>
                <Card
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "150px",
                    width: "200px",
                  }}
                  className="border"
                >
                  <i
                    className="far fa-user-circle"
                    style={{
                      color: "#005ed0",
                      fontSize: "34px",
                      marginBottom: "8px",
                    }}
                  ></i>
                  Ro'yhatdan o'tish
                </Card>
              </NavLink>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              className={"d-flex justify-content-center align-items-center"}
            >
              <NavLink to={"/reopen-password"}>
                <Card
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "150px",
                    width: "200px",
                  }}
                  className="border"
                >
                  <i
                    className="bx bx-lock-open"
                    style={{
                      color: "#005ed0",
                      fontSize: "34px",
                      marginBottom: "8px",
                    }}
                  ></i>
                  Login parolni tiklash
                </Card>
              </NavLink>
            </Col>
          </Row>

          <Button
            onClick={() => history.goBack()}
            className="btn border rounded-3 bg-white"
            type="link"
            style={{
              boxShadow: "0px 10px 20px rgba(29, 97, 122, 0.15)",
              borderRadius: "8px",
              color: "#005ed0",
            }}
          >
            <i className="bx bx-arrow-back font-size-20 font-weight-bold"></i>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpAndForgetPassword;
