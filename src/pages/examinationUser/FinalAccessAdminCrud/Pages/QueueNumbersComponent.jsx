import React from "react";
import { Col, Row } from "antd";

const QueueNumbersComponent = props => {
  const { bgColor, data } = props;
  return (
    <Row gutter={[20]} className={""}>
      {data
        ? data?.map((element, index) => {
            return (
              <Col
                  key={index}
                xs={24}
                sm={24}
                md={12}
                lg={8}
                xl={6}
                className={"d-flex justify-content-start align-items-center"}
              >
                <p
                  className={`${bgColor}` + ""}
                  style={{ fontSize: "40px", paddingLeft: "auto" }}
                >
                  {element?.unikal_number}
                </p>
              </Col>
            );
          })
        : ""}
    </Row>
  );
};

export default QueueNumbersComponent;
