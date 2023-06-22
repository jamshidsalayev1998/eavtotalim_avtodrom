import React, { useEffect, useState } from "react";
import { get_queue_info } from "../../../services/api_services/queue/queu_without_auth";
import { Col, Row } from "antd";
import ListQueueComponent from "./ListQueueComponent";
import { useRouteMatch } from "react-router";
import { socketParam } from "../../../App";
import "./style.css";
import LargeElement from "./LargeElement";

const ExaminationAreaQueueWithoutAuth = () => {
  const [remainingQueueData, setRemainingQueueData] = useState([]);
  const [limitedQueueData, setLimitedQueueData] = useState([]);
  const [freeComputersData, setFreeComputersData] = useState(undefined);
  const [transferSignal, setTransferSignal] = useState("");
  const match = useRouteMatch("/queue/:id");
  const [showLargeElement, setShowLargeElement] = useState(false);
  const [largeElementData, setLargeElementData] = useState("");

  useEffect(async () => {
    const response = await get_queue_info(match?.params?.id);
    setRemainingQueueData(response?.remainingQueueData);
    setLimitedQueueData(response?.limitedQueueData);
    await setFreeComputersData(response?.freeComputersData);
  }, []);

  useEffect(() => {
    const eventName = "queue_event_" + match?.params?.id;
    socketParam.on(eventName, data => {
      if (data?.type === "new_student") {
        const freeComputersCount = parseInt(freeComputersData) || 0; // Parsing with fallback value
        console.log("free computer count", freeComputersCount);
        console.log("lengthlimited", limitedQueueData.length);
        if (freeComputersCount > limitedQueueData.length) {
          setLimitedQueueData(prevData => [...prevData, data?.queue]);
        } else {
          setRemainingQueueData(prevData => [...prevData, data?.queue]);
          setTransferSignal(data?.queue.unikal_number); // Set transfer signal to the unikal_number of the transferred element
          setTimeout(() => {
            setTransferSignal(""); // Reset transfer signal after 3 seconds
          }, 3000);
        }
      } else if (data?.type === "free_computer") {
        if (remainingQueueData.length > 0) {
          const firstElement = remainingQueueData[0];
          setRemainingQueueData(prevData => prevData.slice(1));
          setLimitedQueueData(prevData => [...prevData, firstElement]);
          setShowLargeElement(true);
          setLargeElementData(firstElement?.unikal_number);
        }
        setFreeComputersData(freeComputersData + 1);
      } else if (data?.type === "student_merged") {
        console.log("data?.type", data?.type);
        console.log("data?.unikal_number", data?.unikal_number);
        console.log("limitedQueueData in merged", limitedQueueData);
        const updatedQueueData = limitedQueueData.filter(
          element => element.unikal_number !== data?.unikal_number
        );
        const updatedRemainQueueData = remainingQueueData.filter(
          element => element.unikal_number !== data?.unikal_number
        );
        setLimitedQueueData(updatedQueueData);
        setRemainingQueueData(updatedRemainQueueData);
        setFreeComputersData(freeComputersData - 1);
      }
    });
    return () => {
      socketParam.off(eventName);
    };
  }, [remainingQueueData, freeComputersData, limitedQueueData]);
  const onTransfer = () => {
    setShowLargeElement(false);
  };

  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col xs={24} xl={12} className="waitingListContainer">
        <h5>Kutishda {remainingQueueData?.length}</h5>
        <ListQueueComponent
          data={remainingQueueData}
          transferSignal={transferSignal}
        />
      </Col>
      <Col xs={24} xl={12} className="accessListContainer">
        <h5>
          Kirishi mumkin {limitedQueueData?.length} &nbsp; | &nbsp; komyuterlar{" "}
          {freeComputersData}
        </h5>
        <ListQueueComponent
          data={limitedQueueData}
          transferSignal={transferSignal}
        />
      </Col>
      {showLargeElement && (
        <LargeElement unikalNumber={largeElementData} onTransfer={onTransfer} />
      )}
    </Row>
  );
};

export default ExaminationAreaQueueWithoutAuth;
