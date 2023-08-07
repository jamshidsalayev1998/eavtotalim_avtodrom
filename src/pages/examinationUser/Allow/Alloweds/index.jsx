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
import NoAllowedStudentsTable from "./NoAllowedStudentsTable";
import AllowedStudentsTable from "./AllowedStudentsTable";
const AllowStudentsTable = props => {
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
            <div>
              <h5 className="text-dark">Imtihonga jo'natilgan guruhlar</h5>
            </div>
            <div>
              <Tabs
                defaultActiveKey={default_tab ? default_tab : "1"}
                onChange={change_tab}
              >
                <TabPane tab="Ruhsat berilmaganlar" key="1">
                  <NoAllowedStudentsTable />
                </TabPane>
                <TabPane tab="Ruhsat berilganlar" key="2">
                  <AllowedStudentsTable />
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(AllowStudentsTable);
