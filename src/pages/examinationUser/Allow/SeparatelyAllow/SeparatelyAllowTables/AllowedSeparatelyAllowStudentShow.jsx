import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, Badge } from "reactstrap";
import {
  NavLink,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import MainContext from "Context/MainContext";
import { Select, Tabs, Row, Col } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import {
  printToCheckSeparatelyStudentAllow,
  showSeparatelyStudentAllow,
} from "../../../../../services/api_services/separately_student_allow_api";

const AllowedSeparatelyAllowStudentShow = props => {
  const { TabPane } = Tabs;
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch(
    "/come-examination/allow-students/separately/:id"
  );
  const location = useLocation();
  const [default_tab, set_default_tab] = useState(
    localStorage.getItem(window.location.pathname + "-default-tab")
  );
  const change_tab = key => {
    localStorage.setItem(window.location.pathname + "-default-tab", key);
  };
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      const res = await showSeparatelyStudentAllow(match?.params?.id);
      if (res?.data?.status == 1) {
        setData(res?.data?.data);
      }
    })();
  }, []);
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <div className="top_links_page_title">
                  <span className="mr-3" onClick={() => history.goBack()}>
                    <i className="bx bx-arrow-back" />
                  </span>
                  <h5 className="text-dark">
                    {data?.final_test_student?.student_fio}
                  </h5>
                </div>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                <Row className="d-flex ">
                  <Col xl={8} className="border p-5">
                    <h1 className={"w-100 text-center"}>
                      {data?.computer?.order}
                    </h1>
                    <p className={"w-100 text-center"}>kompyuter raqami</p>
                    <p>
                      <b>F.i.O:</b> {data?.final_test_student?.student_fio}
                    </p>

                    <p>
                      <b>Pasport:</b>{" "}
                      {data?.final_test_student?.student_passport}
                    </p>
                    <p>
                      <b>Telefon:</b> {data?.final_test_student?.student_phone}
                    </p>
                    {/*<p>*/}
                    {/*   <b>Login:</b> {data?.user?.username}*/}
                    {/*</p>*/}
                    {/* <p>*/}
                    {/*   <b>Parol:</b> {data?.user?.password}*/}
                    {/*</p>*/}
                    <button
                      className={"btn btn-light w-100"}
                      onClick={e => printToCheckSeparatelyStudentAllow(data)}
                    >
                      <i className={"fa fa-print"}></i>
                    </button>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(AllowedSeparatelyAllowStudentShow);
