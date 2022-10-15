import React, {useState, useEffect, useContext} from "react";
import {Card, CardBody, Container,} from "reactstrap";
import {withTranslation} from "react-i18next";


import {Row, Col, Select, Input, Pagination, message} from "antd";
import axios from "axios";
import MainContext from "../../../../Context/MainContext";
import {PATH_PREFIX} from "../../../../Utils/AppVariables";
import {DataLoader} from "../../../Loaders/Loaders";
import QueuePageIndexTable from "./QueuePageIndexTable";
import {getQueueList} from "../../../../services/api_services/queue_api";
import QueueNumbersComponent from "./QueueNumbersComponent";
import ringer from "../../../../assets/music/sound_queue.mp3";

const QueueFinalExam = props => {
    const [data, setData] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const {hasLayout, setHasLayout} = useContext(MainContext);
    const [reload, setReload] = useState(false);
    const [waitingData, setWaitingData] = useState();
    const [accessedData, setAccessedData] = useState();
    const [freeComputers, setFreeComputers] = useState();


    useEffect(() => {
        (async () => {
            const audio = new Audio(ringer);
            audio.loop = true;
            const response = await getQueueList();
            setFreeComputers(response?.freeComputers);
            let waitArray = [];
            let accessArray = [];
            response?.data?.map((element, index) => {
                if (index + 1 > response?.freeComputers?.length) {
                    waitArray.push(element);
                } else {
                    accessArray.push(element);
                }
            });
            setWaitingData(waitArray);
            if (accessArray?.length > accessedData?.length) {
                audio.loop = false;
                audio.play();
                // alert('bitta oshdi')
            }
            setAccessedData(accessArray);
            setData(response?.data)
        })()
        setTimeout(() => {
            setReload(!reload)
        }, 5000)
    }, [reload]);


    return (
        <>
            <div className="page-content" style={!hasLayout ? {padding: '1px'} : {}}>
                <Container fluid style={!hasLayout ? {padding: '1px'} : {}}>
                    <Card>
                        <CardBody>
                            <Row className="d-flex justify-content-end">
                                <button className="btn btn-outline-light" onClick={() => setHasLayout(!hasLayout)}><i
                                    class={hasLayout ? `fa fa-expand` : `fa fa-compress`} aria-hidden="true"></i>
                                </button>
                            </Row>
                            <div className="crypto-buy-sell-nav ">
                                {
                                    !isloading ?
                                        <Row gutter={[20, 1]}>
                                            <Col xl={12} className={'border-right text-center'}>
                                                <h3><b>Kutishda</b></h3>
                                            </Col>
                                            <Col xl={12} className={'border-right text-center'}>
                                                <h3><b>Kirish mumkin</b></h3>
                                            </Col>
                                            <Col xl={12} className={'border-right'}>
                                                {/*<QueuePageIndexTable tableData={data}/>*/}
                                                <QueueNumbersComponent data={waitingData} bgColor={'bg-warning'}/>
                                            </Col>
                                            <Col xl={12} className={'border-left'}>
                                                {/*<QueuePageIndexTable tableData={data}/>*/}
                                                <QueueNumbersComponent data={accessedData} bgColor={'bg-success'}/>
                                            </Col>
                                        </Row>
                                        : <DataLoader/>
                                }
                                <Row className="d-flex justify-content-end mt-2">
                                    {/*<Pagination defaultCurrent={1} current={params.page} defaultPageSize={10}   total={total} onChange={e => select_page(e)} onShowSizeChange={(page , e) => show_count_change(e)} />*/}
                                </Row>

                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default withTranslation()(QueueFinalExam);










