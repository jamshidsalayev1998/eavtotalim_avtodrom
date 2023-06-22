import React from "react";
import { Col, Row } from "antd";
import { Card } from "reactstrap";

const QueueNumbersComponent = props => {
  const { bgColor, data } = props;
  return (
    <Row gutter={[12, 12]} className={""}>
      {data
        ? data?.map((element, index) => {
            return (
              <Col
                key={element?.id}
                xs={24}
                sm={24}
                md={12}
                // className={"d-flex justify-content-start align-items-center"}
              >
                <Card className="p-1 m-0 d-flex justify-content-center align-items-center">
                  <p
                    className={`${bgColor}` + ""}
                    style={{
                      fontSize: "35px",
                      paddingLeft: "auto",
                      marginBottom: 0,
                      fontWeight: "500",
                    }}
                  >
                    {element?.unikal_number}
                  </p>
                  {/* <span>{element?.student_fio}</span> */}
                  <span className="font-weight-bold text-secondary">
                    {element?.student_fio.length > 30
                      ? `${element?.student_fio.slice(0, 40)}...`
                      : element?.student_fio}
                  </span>
                </Card>
              </Col>
            );
          })
        : ""}
    </Row>
  );
};

export default QueueNumbersComponent;
