import React from "react";
import { Col, Row } from "antd";

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
                <div className="rounded rounded-5 border p-2">
                  <p
                    className={`${bgColor}` + ""}
                    style={{
                      fontSize: "35px",
                      paddingLeft: "auto",
                      marginBottom: 0,
                    }}
                  >
                    {element?.unikal_number}
                  </p>
                  {/* <span>{element?.student_fio}</span> */}
                  <span className="text-white fw-bold">
                    {element?.student_fio.length > 30
                      ? `${element?.student_fio.slice(0, 40)}...`
                      : element?.student_fio}
                  </span>
                </div>
              </Col>
            );
          })
        : ""}
    </Row>
  );
};

export default QueueNumbersComponent;
