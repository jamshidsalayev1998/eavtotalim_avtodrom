import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Progress } from "antd";
import clsx from "clsx";
import styles from "./style.module.scss";
import TemplateTest from "./TemplateTest";
import SubjectTest from "./SubjectTest";
import SaveTest from "./SaveTest";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_TEST } from "store/student/actionTypes";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { PATH_PREFIX } from "Utils/AppVariables";
import TestSolveForStudent from "pages/Blits_Tests/TestSolveForStudant";

const StudentTests = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const indexItem = useSelector(state => state.test_reducer_type);
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_PREFIX + "/saved-test",
      method: "GET",
      params: {
        token,
      },
    }).then(response => {
      if (response?.data?.status === 1) {
        setData(response?.data?.data);
      }
    });
  }, []);
  const testTitleName = [
    {
      id: 1,
      name_uz: "Fanlar bo’yicha testlar",
      description: "Fanlar soni 9",
    },
    {
      id: 2,
      name_uz: "Shablon testlar",
      description: "Biletlar soni 70",
    },
    {
      id: 3,
      name_uz: "Saqlangan testlar",
      description: `Testlar soni ${data?.length}`,
    },
    {
        id: 4,
        name_uz: "Blits testlar",
        description: "Ushbu bo’lim yakuniy testga ruxsat berilganda ochiladi",
      },
    {
      id: 5,
      name_uz: "Yakuniy test",
      description: "Ushbu bo’lim yakuniy testga ruxsat berilganda ochiladi",
    },
  ];

  useEffect(() => {
    if (indexItem.titleName === "") {
      dispatch({
        type: CURRENT_TEST,
        currentIndex: 1,
        titleName: testTitleName[0],
      });
    }
  }, []);

  const clickedItem = element => {
    dispatch({
      type: CURRENT_TEST,
      currentIndex: element.id,
      titleName: element,
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="p-0">
          <Row>
            <Col xl={3} className={clsx("p-0", styles.kaka)}>
              <div className={styles.st_left_side_box}>
                <h4 className="mt-4 pl-3">{t("Test")}</h4>
                
                {testTitleName?.map((element, index) => {
                  return (
                    <div
                      className={clsx(
                        "d-flex px-3 py-3",
                        indexItem.id === element.id
                          ? styles.st_active_item
                          : null
                      )}
                      onClick={() => clickedItem(element)}
                      key={index}
                    >
                      {testTitleName.length - 1 !== index ? (
                        <div>
                          <Progress
                            type="circle"
                            percent={86}
                            strokeColor="#27AE60"
                            width={50}
                          />
                        </div>
                      ) : (
                        <div>
                          <span style={{ width: "50px", height: "50px" }}>
                            <i className="fas fa-car"></i>
                          </span>
                        </div>
                      )}
                      <div className="pl-3 pr-2">
                        <h5>{element.name_uz}</h5>
                        <span className="text-secondary">
                          {element.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
                
              </div>
            </Col>
            <Col xl={9}>
              <Card className={styles.st_right_side}>
                <CardBody>
                  <h4>{indexItem?.titleName?.name_uz}</h4>
                  {indexItem.id === 1 ? (
                    <SubjectTest isType={indexItem.id} />
                  ) : null}
                  {indexItem.id === 2 ? (
                    <TemplateTest isType={indexItem.id} />
                  ) : null}
                  {indexItem.id === 3 ? (
                    <SaveTest isType={indexItem.id} />
                  ) : null}
                  {indexItem.id === 4 ? (
                      <div style={{width:"50%"}}>
                          <TestSolveForStudent />
                      </div>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default StudentTests;
