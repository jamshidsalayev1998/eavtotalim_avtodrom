import React, {useState, useEffect} from "react";
import {Card, CardBody, Container,} from "reactstrap";
import {withTranslation} from "react-i18next";
import {Row, Col, Select, Input, Pagination, DatePicker, Tabs} from "antd";
import ExamResultIndexTable from "./ExamResultIndexTable";
import {DataLoader} from "../../Loaders/Loaders";
import useDebounce from "../../../components/CustomHooks/useDebounce";
import {getExaminationUserResultByStudent} from "../../../services/api_services/examination_user_api";
import moment from "moment";
import SuccessExamStudentsTab from "./Tabs/SuccessExamStudentsTab";
import UnSuccessExamStudentsTab from "./Tabs/UnSuccessExamStudentsTab";
import GeneralExamStudentsTab from "./Tabs/GeneralExamStudentTab";
import ChartExamStudentsTab from "./Tabs/ChartExamStudentsTab";
import SuccessTheoreticalTestTab from "./Tabs/SuccessTheoreticalTestTab";

const ExamResultIndex = () => {
    const {TabPane} = Tabs;
    return (
        <>

            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations">
                                <h5>Imtihon natijalari </h5>
                            </div>
                            <Tabs defaultActiveKey="1" >
                                <TabPane tab="O`tganlar (Amaliy va nazariydan)" key="1">
                                    <SuccessExamStudentsTab />
                                </TabPane>
                                <TabPane tab="O`tganlar (Faqat nazariydan)" key="2">
                                    <SuccessTheoreticalTestTab/>
                                </TabPane>
                                <TabPane tab="Yiqilganlar" key="3">
                                    <UnSuccessExamStudentsTab />
                                </TabPane>
                                <TabPane tab="Umumiy" key="4">
                                    <GeneralExamStudentsTab />
                                </TabPane>
                                 <TabPane tab="Statistika" key="5">
                                    <ChartExamStudentsTab />
                                </TabPane>
                            </Tabs>

                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default withTranslation()(ExamResultIndex);
