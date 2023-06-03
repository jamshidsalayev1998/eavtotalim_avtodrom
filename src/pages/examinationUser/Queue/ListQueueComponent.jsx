import React from "react";
import {Col, Row} from "antd";

const ListQueueComponent = ({data}) =>{
    return (
        <Row>
            {data?.length ? data?.map((element , index) => {
                return (
                    <Col xl={3} key={index}>{element?.unikal_number}</Col>
                )
            }):null}
        </Row>
    )
};

export default ListQueueComponent;
