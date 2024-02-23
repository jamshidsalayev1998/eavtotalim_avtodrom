import React, { useContext } from "react";

import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import MainContext from "../../Context/MainContext";
import styles from "./index.module.sass";
import dayjs from "dayjs";
import { Fade } from "react-awesome-reveal";

import avatar1 from "../../assets/images/avtostartImage.png";
import profileImg from "../../assets/images/profile-img.png";

const WelcomeComp = ({ data }) => {
  const get_fio = data => {
    return (
      data?.profession?.last_name +
      " " +
      data?.profession?.first_name +
      " " +
      data?.profession?.middle_name
    );
  };
  return (
    <>
      <Fade delay={200} triggerOnce={true}>
        <div className={styles.dashboard}>
          <div className={styles.dashboard__imgCard}>
            <img
              src={avatar1}
              alt="userImg"
              className={styles.dashboard__userImg}
            />
          </div>
          <div className={styles.dashboard__userInfo}>
            <p className={`${styles.dashboard__title} big-title`}>
              {data?.examination_area?.name}
            </p>
            <div>
              <p style={{ margin: 0 }} className="medium-title ">
                {get_fio(data)}
              </p>
              <p className="small-title">{data?.profession?.phone}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span className="medium-title ">
                  {"Ro'yxatdan o'tilgan sana"}
                </span>
                <p className="small-title">
                  {dayjs(data?.profession?.created_at).format("DD.MM.YYYY")}
                </p>
              </div>
              <div>
                <span className="medium-title ">{"O'zgartirilgan sana"}</span>
                <p className="small-title">
                  {dayjs(data?.profession?.updated_at).format("DD.MM.YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fade>

      {/* <div className="bg-soft-primary">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">{data?.examination_area?.name}</h5>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="12">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">{get_fio(data)}</h5>
              <p className="text-muted mb-0 text-truncate">Direktor</p>
            </Col>
          </Row>
        </CardBody> */}
    </>
  );
};
export default WelcomeComp;
