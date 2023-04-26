import React, { useContext, useState } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { useDispatch } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import MainContext from "Context/MainContext";

import { Tabs } from "antd";
import AcceptedComeGroupsTable from "./AcceptedComeGroupsTable";
import NoAcceptedComeGroupsTable from "./NoAcceptedComeGroupsTable";

const ComeExaminationGroupIndex = props => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const { setAuth } = useContext(MainContext);
  const { t } = useTranslation();

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
              <h5>Guruh bo'yicha keluvchilar </h5>
            </div>

            <div>
              <Tabs
                defaultActiveKey={default_tab ? default_tab : "1"}
                onChange={change_tab}
              >
                <TabPane tab="Tasdiqlanmaganlar" key="1">
                  <NoAcceptedComeGroupsTable />
                </TabPane>
                <TabPane tab="Tasdiqlanganlar" key="2">
                  <AcceptedComeGroupsTable />
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(ComeExaminationGroupIndex);
