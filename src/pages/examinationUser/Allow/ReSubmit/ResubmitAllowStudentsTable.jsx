import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import MainContext from "Context/MainContext";
import { DataLoader } from "pages/Loaders/Loaders";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Modal, Button, Select, Tabs } from "antd";
import Swal from "sweetalert2";
import ResubmitNoAllowedStudentsTable from "./ResubmitNoAllowedStudentsTable";
import ResubmitAllowedStudentsTable from "./ResubmitAllowedStudentsTable";

const ResubmitAllowStudentsTable = props => {
  const { TabPane } = Tabs;
  const { Option } = Select;
  const history = useHistory();
  const dispatch = useDispatch();
  const { setAuth } = useContext(MainContext);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const [default_tab, set_default_tab] = useState(
    localStorage.getItem(window.location.pathname + "-default-tab")
  );
  const change_tab = key => {
    localStorage.setItem(window.location.pathname + "-default-tab", key);
  };
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <h5 className="text-dark">Qayta topshirish guruhlari</h5>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                <Tabs
                  defaultActiveKey={default_tab ? default_tab : "1"}
                  onChange={change_tab}
                >
                  <TabPane tab="Ruhsat berilmaganlar" key="1">
                    <ResubmitNoAllowedStudentsTable />
                  </TabPane>
                  <TabPane tab="Ruhsat berilganlar" key="2">
                    <ResubmitAllowedStudentsTable />
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

export default withTranslation()(ResubmitAllowStudentsTable);
