import React, { useState } from "react";
import { Card, Container } from "reactstrap";
import { withTranslation, useTranslation } from "react-i18next";
import { Tabs } from "antd";
import NotAllowedSeparatelyAllowStudentsTable from "./SeparatelyAllowTables/NotAllowedSeparatelyAllowStudentsTable";
import AllowedSeparatelyAllowStudentsTable from "./SeparatelyAllowTables/AllowedSeparatelyAllowStudentsTable";
const SeparatelyAllowStudentsIndex = props => {
  const { TabPane } = Tabs;
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
              <h5 className="text-dark">O'quvchilarga testga ruxsat berish</h5>
            </div>
            <div>
              <Tabs
                defaultActiveKey={default_tab ? default_tab : "1"}
                onChange={change_tab}
              >
                <TabPane tab="Ruhsat berilmaganlar" key="1">
                  <NotAllowedSeparatelyAllowStudentsTable />
                </TabPane>
                <TabPane tab="Ruhsat berilganlar" key="2">
                  <AllowedSeparatelyAllowStudentsTable />
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(SeparatelyAllowStudentsIndex);
