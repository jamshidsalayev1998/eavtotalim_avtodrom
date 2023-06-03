import React, {useEffect, useState} from "react";
import {get_queue_info} from "../../../services/api_services/queue/queu_without_auth";
import {Col, Row} from "antd";
import ListQueueComponent from "./ListQueueComponent";
import {useHistory, useRouteMatch} from "react-router";

const ExaminationAreaQueueWithoutAuth = () => {
    const [data,setData] = useState([]);
    const [remainingQueueData, setRemainingQueueData] = useState([]);
    const [limitedQueueData, setLimitedQueueData] = useState([]);
    const match = useRouteMatch('/queue/:id');
    useEffect(() => {
getInfo();
    }, []);
    const getInfo = () => {
        (async () => {
            const response = await get_queue_info(match?.params?.id)
            console.log(response);
            setData(response);
            setRemainingQueueData(response?.remainingQueueData);
            setLimitedQueueData(response?.limitedQueueData);
        })()
    };
    return (
        <Row>
            <Col xl={12} className={{backgroundColor:'red',padding:'10px'}}>
                <h5>Kutishda</h5>
                <ListQueueComponent data={remainingQueueData} />
            </Col>
            <Col xl={12} className={{backgroundColor:'red',padding:'10px'}}>
                <h5>Kirishi mumkin</h5>
                <ListQueueComponent data={limitedQueueData} />
            </Col>
        </Row>
    )
};

export default ExaminationAreaQueueWithoutAuth;
