import React, {useEffect, useState} from "react";
import {get_queue_info} from "../../../services/api_services/queue/queu_without_auth";
import {Col, Row} from "antd";
import ListQueueComponent from "./ListQueueComponent";
import {useHistory, useRouteMatch} from "react-router";
import {socketParam} from "../../../App";
import "./style.css"

const ExaminationAreaQueueWithoutAuthOld = () => {
    const [remainingQueueData, setRemainingQueueData] = useState([]);
    const [limitedQueueData, setLimitedQueueData] = useState([]);
    const [freeComputersData, setFreeComputersData] = useState(undefined);
    const match = useRouteMatch('/queue/:id');
    useEffect(async () => {
        const response = await get_queue_info(match?.params?.id)
        setRemainingQueueData(response?.remainingQueueData);
        setLimitedQueueData(response?.limitedQueueData);
        await setFreeComputersData(response?.freeComputersData);
    }, []);
    useEffect(() => {
        const eventName = 'queue_event_' + match?.params?.id;
        socketParam.on(eventName, data => {
            if (data?.type === 'new_student') {
                const freeComputersCount = parseInt(freeComputersData) || 0;
                console.log('free computer count', freeComputersCount);
                console.log('lengthlimited', limitedQueueData.length);
                if (freeComputersCount > limitedQueueData.length) {
                    setLimitedQueueData(prevData => [...prevData, data?.queue]);
                } else {
                    setRemainingQueueData(prevData => [...prevData, data?.queue]);
                }
            } else if (data?.type === 'free_computer') {
                if (remainingQueueData.length > 0) {
                    const firstElement = remainingQueueData[0];
                    setRemainingQueueData(prevData => prevData.slice(1));
                    setLimitedQueueData(prevData => [...prevData, firstElement]);
                }
                setFreeComputersData(freeComputersData + 1);
            } else if (data?.type === 'student_merged') {
                console.log('data?.type', data?.type);
                console.log('data?.unikal_number', data?.unikal_number);
                console.log("limitedQueueData in merged", limitedQueueData)
                const updatedQueueData = limitedQueueData.filter(
                    element => element.unikal_number !== data?.unikal_number
                );
                const updatedRemainQueueData = remainingQueueData.filter(
                    element => element.unikal_number !== data?.unikal_number
                );
                setLimitedQueueData(updatedQueueData);
                setRemainingQueueData(updatedRemainQueueData);
                setFreeComputersData(freeComputersData - 1)
            }
        });
        return () => {
            socketParam.off(eventName);
        };
    }, [remainingQueueData, freeComputersData, limitedQueueData]);

    const reBuildQueue = (data) => {

    };
    return (
        <Row>
            {/*<div className="pageContainer">*/}
            <Col xl={12} className={'waitingListContainer'}>
                <h5>Kutishda {remainingQueueData?.length}</h5>
                <ListQueueComponent data={remainingQueueData}/>
            </Col>
            <Col xl={12} className={'accessListContainer'}>
                <h5>Kirishi mumkin {limitedQueueData?.length} komplar {freeComputersData}</h5>
                <ListQueueComponent data={limitedQueueData}/>
            </Col>
            {/*</div>*/}
        </Row>
    )
};

export default ExaminationAreaQueueWithoutAuthOld;
