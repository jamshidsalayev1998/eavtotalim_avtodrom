import React, {useState, useEffect} from "react";
import {Card, CardBody, Container,} from "reactstrap";
import {withTranslation} from "react-i18next";


import {Row, Col, Tabs} from "antd";
import ReturnedsIndexTable from "./Tables/ReturnedsIndexTable";
import GroupedReturnedsIndexTable from "./Tables/GroupedReturnedsIndexTable";
import AccessedGroupedReturnedsIndexTable from "./Tables/AccessedGroupedReturnedsIndexTable";

const ReturnedsIndex = props => {
    const {TabPane} = Tabs;
    return (
        <>

            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations">
                                <h5>Imtihondan o'ta olmaganlar </h5>
                            </div>
                            <div className="crypto-buy-sell-nav mt-3">
                                <Row>
                                    <Col xl={24}>
                                        <Tabs defaultActiveKey="1">
                                            <TabPane tab="Qayta topshiruvchilar" key="1">
                                                <ReturnedsIndexTable />
                                            </TabPane>
                                            <TabPane tab="Guruhlanganlar" key="2">
                                                <GroupedReturnedsIndexTable/>
                                            </TabPane>
                                            <TabPane tab="Ruhsat berilgan guruhlar" key="3">
                                                <AccessedGroupedReturnedsIndexTable/>
                                            </TabPane>
                                        </Tabs>
                                    </Col>

                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default withTranslation()(ReturnedsIndex);
