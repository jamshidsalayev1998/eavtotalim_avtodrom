import React, {useState, useEffect, useContext} from "react";
import {Card, CardBody, Container, Row, Col, Badge} from "reactstrap";
import axios from "axios";
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {withTranslation, useTranslation} from "react-i18next";
import MainContext from "Context/MainContext";
import {PATH_PREFIX} from "Utils/AppVariables";
import {DataLoader} from "pages/Loaders/Loaders";
import {Table, Thead, Tbody, Tr, Th, Td} from "react-super-responsive-table";
import {Modal, Button, Select, Tabs} from "antd";
import Swal from "sweetalert2";
import StudentPracticalPaymentNotConfirmedsIndex
    from "./StudentPracticalPaymentTables/StudentPracticalPaymentNotConfirmedsIndex";
import StudentPracticalPaymentConfirmedsIndex
    from "./StudentPracticalPaymentTables/StudentPracticalPaymentConfirmedsIndex";


const StudentPractialPaymentsIndex = props => {
    const {TabPane} = Tabs;
    const {Option} = Select;
    const history = useHistory();
    const dispatch = useDispatch();
    const {setAuth} = useContext(MainContext);
    const [data, setData] = useState([]);
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [generalReload, setGeneralReload] = useState(false);
    const [default_tab, set_default_tab] = useState(localStorage.getItem(window.location.pathname + '-default-tab'));
    const change_tab = (key) => {
        if (key == '1'){
            setFirstTabLoading(!firstTabLoading);
        }
        if (key == '2'){
            setSecondTabLoading(!secondTabLoading);
        }
        localStorage.setItem(window.location.pathname + '-default-tab', key);
    }
    const [firstTabLoading, setFirstTabLoading] = useState(false);
    const [secondTabLoading, setSecondTabLoading] = useState(false);
    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <div className="top-organizations">
                                <h5 className="text-dark">{t("O`quvchilarni to`lovlarini tasdiqlash (Amaliy)")}</h5>
                            </div>
                            <div className="crypto-buy-sell-nav mt-3">
                                <Tabs defaultActiveKey={default_tab ? default_tab : '1'} onChange={change_tab}>
                                    <TabPane tab="Tasdiqlanmaganlar" key="1">
                                        <StudentPracticalPaymentNotConfirmedsIndex setFirstTabLoading={setFirstTabLoading}
                                                                          firstTabLoading={firstTabLoading}
                                                                          setGeneralReload={setGeneralReload}
                                                                          generalReload={generalReload}/>
                                    </TabPane>
                                    <TabPane tab="Tasdiqlanganlar" key="2">
                                        <StudentPracticalPaymentConfirmedsIndex secondTabLoading={secondTabLoading}
                                                                       setSecondTabLoading={setSecondTabLoading}
                                                                       setGeneralReload={setGeneralReload}
                                                                       generalReload={generalReload}/>
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

export default withTranslation()(StudentPractialPaymentsIndex);
