import { Col, Row } from "antd";
import React from "react";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Card } from "reactstrap";
import "./style.scss";

const SignUpAndForgetPassword = () => {
  return (
    <div
      className="registration-page"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <Row gutter={[16, 16]}>
        <Col>
          <NavLink to={"/online-registration"}>
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "150px",
                width: "200px",
              }}
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
        <Col>
          <NavLink to={"/reopen-password"}>
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "150px",
                width: "200px",
              }}
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
    </div>
  );
};

export default SignUpAndForgetPassword;
