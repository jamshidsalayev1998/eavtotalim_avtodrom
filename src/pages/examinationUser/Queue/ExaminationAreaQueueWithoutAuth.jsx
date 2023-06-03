import React, {useEffect, useState} from "react";
import {get_queue_info} from "../../../services/api_services/queue/queu_without_auth";
import {Col, Row} from "antd";
import ListQueueComponent from "./ListQueueComponent";
import {useHistory, useRouteMatch} from "react-router";
import {socketParam} from "../../../App";
import "./style.css"

const ExaminationAreaQueueWithoutAuth = () => {
    const [data, setData] = useState([]);
    const [remainingQueueData, setRemainingQueueData] = useState([]);
    const [limitedQueueData, setLimitedQueueData] = useState([]);
    const [freeComputersData, setFreeComputersData] = useState([]);
    const match = useRouteMatch('/queue/:id');
    useEffect(() => {
        getInfo();
        const eventName = 'queue_event_' + match?.params?.id;
        socketParam.on(eventName, data => {
            reBuildQueue(data)
            console.log('keyin remaining', remainingQueueData);
            console.log('keyin limit', limitedQueueData)
        });
        return () => {
            socketParam.off(eventName);
        };
    }, []);
    const getInfo = () => {
        (async () => {
            const response = await get_queue_info(match?.params?.id)
            console.log(response);
            setData(response);
            setRemainingQueueData(response?.remainingQueueData);
            setLimitedQueueData(response?.limitedQueueData);
            setFreeComputersData(response?.freeComputersData);
        })()
    };
    const transferElement = (data) => {
        console.log('socket', data?.type);
        if (remainingQueueData.length > 0) {
            const firstElement = remainingQueueData[0];
            setRemainingQueueData(prevData => prevData.slice(1));
            setLimitedQueueData(prevData => [...prevData, firstElement]);
        }
    };
    const reBuildQueue = (data) => {
        if (data?.type === 'new_student') {
            if (parseInt(freeComputersData) > limitedQueueData.length) {
                setLimitedQueueData(prevData => [...prevData, data?.queue]);
            } else {
                setRemainingQueueData(prevData => [...prevData, data?.queue]);
            }
        } else if (data?.type === 'free_computer') {
            transferElement(data);
        }
        else if (data?.type === 'student_merged'){
            removeElement(data?.unikal_number)
        }
    };
    const removeElement = (unikal_number) => {
        const updatedQueueData = limitedQueueData.filter(
            element => element.unikal_number !== unikal_number
        );
        setLimitedQueueData(updatedQueueData);
    };
    return (
        <Row>
            <Col xl={12} className={'.queueRemainingBoxClass'}>
                <h5>Kutishda</h5>
                <ListQueueComponent data={remainingQueueData}/>
            </Col>
            <Col xl={12} className={'.queueLimitBoxClass'}>
                <h5>Kirishi mumkin</h5>
                <ListQueueComponent data={limitedQueueData}/>
            </Col>
        </Row>
    )
};

export default ExaminationAreaQueueWithoutAuth;
