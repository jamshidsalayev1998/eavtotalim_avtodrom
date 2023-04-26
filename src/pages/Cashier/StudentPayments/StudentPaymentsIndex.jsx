import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import MainContext from "Context/MainContext";
import { PATH_PREFIX } from "Utils/AppVariables";
import { DataLoader } from "pages/Loaders/Loaders";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Modal, Button, Select, Tabs } from "antd";
import Swal from "sweetalert2";
import StudentPaymentNotConfirmedsIndex from "./StudentPaymentTables/StudentPaymentNotConfirmedsIndex";
import StudentPaymentConfirmedsIndex from "./StudentPaymentTables/StudentPaymentConfirmedsIndex";

const StudentPaymentsIndex = props => {
  const { TabPane } = Tabs;
  const { Option } = Select;
  const history = useHistory();
  const dispatch = useDispatch();
  const { setAuth } = useContext(MainContext);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [generalReload, setGeneralReload] = useState(false);
  const [default_tab, set_default_tab] = useState(
    localStorage.getItem(window.location.pathname + "-default-tab")
  );
  const change_tab = key => {
    if (key == "1") {
      setFirstTabLoading(!firstTabLoading);
    }
    if (key == "2") {
      setSecondTabLoading(!secondTabLoading);
    }
    localStorage.setItem(window.location.pathname + "-default-tab", key);
  };
  const [firstTabLoading, setFirstTabLoading] = useState(false);
  const [secondTabLoading, setSecondTabLoading] = useState(false);
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <div>
              <h5 className="text-dark">
                {t("O`quvchilarni to`lovlarini tasdiqlash (Nazariy)")}
              </h5>
            </div>
            <div>
              <Tabs
                defaultActiveKey={default_tab ? default_tab : "1"}
                onChange={change_tab}
              >
                <TabPane tab="Tasdiqlanmaganlar" key="1">
                  <StudentPaymentNotConfirmedsIndex
                    setFirstTabLoading={setFirstTabLoading}
                    firstTabLoading={firstTabLoading}
                    setGeneralReload={setGeneralReload}
                    generalReload={generalReload}
                  />
                </TabPane>
                <TabPane tab="Tasdiqlanganlar" key="2">
                  <StudentPaymentConfirmedsIndex
                    secondTabLoading={secondTabLoading}
                    setSecondTabLoading={setSecondTabLoading}
                    setGeneralReload={setGeneralReload}
                    generalReload={generalReload}
                  />
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(StudentPaymentsIndex);
