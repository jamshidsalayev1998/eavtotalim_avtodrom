import React from "react";
import { Card, Container } from "reactstrap";
import { getAllStudents } from "../../../../../services/api_services/instructor_student_api";
import { Tabs } from "antd";

import SuccessEndedStudentsTab from "./Tabs/SuccessEndedStudentsTab";
import FailedStudentsTab from "./Tabs/FailedStudentsTab";

const ExamEndedStudentsIndex = ({}) => {
  const { TabPane } = Tabs;

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <div className="top-organizations d-flex justify-content-between">
              <h5 className="text-dark">Topshirib bo'lganlar</h5>
              <div className={"d-flex"}></div>
            </div>
            <div className="crypto-buy-sell-nav mt-3">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Barchasi" key="1">
                  <SuccessEndedStudentsTab />
                </TabPane>
                {/*<TabPane tab="Yiqilganlar" key="2">*/}
                {/*    <FailedStudentsTab />*/}
                {/*</TabPane>*/}
              </Tabs>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default ExamEndedStudentsIndex;
