import React from "react";
import { Col, Row } from "antd";
import "./style.css";

const ListQueueComponent = ({ data }) => {
  return (
    <Row gutter={[12, 12]}>
      {data?.length
        ? data?.map((element, index) => {
            return (
              <>
                <Col xl={4} key={index}>
                  {" "}
                  <div className={"queueElementClass"}>
                    {element?.unikal_number}
                  </div>
                </Col>
              </>
            );
          })
        : null}
    </Row>
  );
};

export default ListQueueComponent;
