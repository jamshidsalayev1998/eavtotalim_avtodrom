import React, {useContext, useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import {Table, Row, Col, Tabs, message} from "antd";
import {getExamProcessStudents} from "../../../../services/api_services/final_test_admin_api";
import {Card, CardBody, Container,} from "reactstrap";
import ExamProcessByComputerTab from "./ExamProcessStudentTabs/ExamProcessByComputerTab";
import ExamProcessByStudentTab from "./ExamProcessStudentTabs/ExamProcessByStudentTab";
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000', {
    rejectUnauthorized: false // WARN: please do not do this in production
});

const ExamProcessStudents = () => {
    const [data, setData] = useState();
    const [reload, setReload] = useState(false);
    const refresh = () => {
        setReload(!reload);
    };
    const handleSendMessage = () => {
        socket.emit('message', {
            text: 'qalay lan',
            name: 'hihi',
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
        });

    };
    useEffect(() => {
        handleSendMessage();
         socket.on('messageResponse', (data) => {
            message.info(data?.message+' | '+data?.userName)
        });
    }, [])
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
