import React from "react";
import {Col, Row} from "antd";
import "./style.css"

const ListQueueComponent = ({data}) =>{
    return (
        <Row>
            {data?.length ? data?.map((element , index) => {
                return (
                    <Col className={'queueElementClass'} xl={3} key={index}>{element?.unikal_number}</Col>
                )
            }):null}
        </Row>
    )
};

export default ListQueueComponent;
