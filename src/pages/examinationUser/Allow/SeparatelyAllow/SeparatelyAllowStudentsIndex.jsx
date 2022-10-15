import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import MainContext from "Context/MainContext";
import {  Select, Tabs } from "antd";
import Swal from "sweetalert2";
import NotAllowedSeparatelyAllowStudentsTable from "./SeparatelyAllowTables/NotAllowedSeparatelyAllowStudentsTable";
import AllowedSeparatelyAllowStudentsTable from "./SeparatelyAllowTables/AllowedSeparatelyAllowStudentsTable";
const SeparatelyAllowStudentsIndex = props => {
  const { TabPane } = Tabs;
  const { t } = useTranslation();
  const [default_tab , set_default_tab] = useState(localStorage.getItem(window.location.pathname+'-default-tab'));
  const change_tab = (key) => {
    localStorage.setItem(window.location.pathname+'-default-tab' , key);
  }
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <h5 className="text-dark">O'quvchilarga testga ruxsat berish</h5>
                
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                <Tabs defaultActiveKey={default_tab?default_tab:'1'} onChange={change_tab}>
                  <TabPane tab="Ruhsat berilmaganlar" key="1">
                    <NotAllowedSeparatelyAllowStudentsTable />
                  </TabPane>
                  <TabPane tab="Ruhsat berilganlar" key="2">
                    <AllowedSeparatelyAllowStudentsTable />
                  </TabPane>
                </Tabs>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(SeparatelyAllowStudentsIndex);
