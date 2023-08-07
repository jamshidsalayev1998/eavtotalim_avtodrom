import React, { useState, useContext } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import MainContext from "Context/MainContext";
import { Select, Tabs } from "antd";
import GroupPaymentNotConfirmedsIndex from "./GroupPaymentTables/GroupPaymentNotConfirmedsIndex";
import GroupPaymentConfirmedsIndex from "./GroupPaymentTables/GroupPaymentConfirmedsIndex";

const GroupPaymentsIndex = props => {
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
                <h5 className="text-dark">
                  {t("Guruhlarni to`lovlarini tasdiqlash")}
                </h5>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                <Tabs
                  defaultActiveKey={default_tab ? default_tab : "1"}
                  onChange={change_tab}
                >
                  <TabPane tab="Tasdiqlanmaganlar" key="1">
                    <GroupPaymentNotConfirmedsIndex />
                  </TabPane>
                  <TabPane tab="Tasdiqlanganlar" key="2">
                    <GroupPaymentConfirmedsIndex />
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

export default withTranslation()(GroupPaymentsIndex);
