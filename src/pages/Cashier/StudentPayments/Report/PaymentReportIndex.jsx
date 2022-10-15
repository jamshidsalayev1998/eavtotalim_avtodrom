import React, {useState, useEffect} from "react";
import {Card, CardBody, Container,} from "reactstrap";
import {withTranslation} from "react-i18next";
import {Row, Col, Select, Input, Pagination, DatePicker, Tabs} from "antd";
import moment from "moment";
import GeneralPaymentReportTab from "./Tabs/GeneralPaymentReportTab";
import TheoreticalPaymentReportTab from "./Tabs/TheoreticalPaymentReportTab";
import PracticalPaymentReportTab from "./Tabs/PracticalPaymentReportTab";

const PaymentReportIndex = () => {
    const {TabPane} = Tabs;
    return (
        <>

            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations">
                                <h5>To'lovlar hisoboti </h5>
                            </div>
                            <Tabs defaultActiveKey="1" >
                                <TabPane tab="Umumiy" key="1">
                                    <GeneralPaymentReportTab/>
                                </TabPane>
                                <TabPane tab="Nazariy" key="2">
                                    <TheoreticalPaymentReportTab/>
                                </TabPane>
                                <TabPane tab="Amaliy" key="3">
                                    <PracticalPaymentReportTab/>
                                </TabPane>
                            </Tabs>

                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default withTranslation()(PaymentReportIndex);
