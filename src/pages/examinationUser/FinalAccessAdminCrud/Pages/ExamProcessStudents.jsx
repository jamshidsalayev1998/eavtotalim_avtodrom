import React, {useContext, useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import {Table, Row, Col, Tabs, message, notification} from "antd";
import {getExamProcessStudents} from "../../../../services/api_services/final_test_admin_api";
import {Card, CardBody, Container,} from "reactstrap";
import ExamProcessByComputerTab from "./ExamProcessStudentTabs/ExamProcessByComputerTab";
import ExamProcessByStudentTab from "./ExamProcessStudentTabs/ExamProcessByStudentTab";
import {socketParam} from "../../../../App";
import MainContext from "../../../../Context/MainContext";

const ExamProcessStudents = () => {
    const [data, setData] = useState();
    const [reload, setReload] = useState(false);
    const mainContext = useContext(MainContext);
    // console.log('uy' , context);
    const eventName = 'examination_area_event_' + mainContext?.profession?.examination_area_id;
    const refresh = () => {
        setReload(!reload);
    };
    const openNotification = (description, message) => {
        notification.success({
            message: message,
            description: description,
        });
    };
    useEffect(() => {
        if (parseInt(mainContext?.profession?.examination_area_id)) {
            console.log('eventName' , eventName)
            socketParam.on(eventName, (data) => {
                openNotification(data?.message, data?.userName)
                console.log('keldi', data?.userName)
            });
            return () => {
                socketParam.off('messageResponse');
            }
        }

    }, [mainContext?.profession?.examination_area_id]);
    return (
        <div className="page-content">
            <Container fluid>
                <Card>
                    <CardBody>
                        <div className="top-organizations">
                            <h5 className="text-dark">Test topshirish jarayonidagilar</h5>
                            <button className={'btn btn-light'} onClick={refresh}><i className="fa fa-retweet"
                                                                                     aria-hidden="true"/></button>
                        </div>
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="Kompyuter bo'yicha" key="1">
                                <ExamProcessByComputerTab reload={reload} setReload={setReload}/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="O'quvchilar bo'yicha" key="2">
                                <ExamProcessByStudentTab reload={reload}/>
                            </Tabs.TabPane>
                        </Tabs>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
};
export default withTranslation()(ExamProcessStudents);
