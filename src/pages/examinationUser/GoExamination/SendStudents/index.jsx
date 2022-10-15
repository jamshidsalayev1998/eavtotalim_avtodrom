import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
import axios from "axios";
import { withTranslation, useTranslation } from "react-i18next";
import {PATH_PREFIX} from "Utils/AppVariables";
import { DataLoader } from "pages/Loaders/Loaders";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const GoExaminationSendStudentsIndex = props => {
  const [students, setStudents] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // sort with values by database
  useEffect(() => {
    // alert('sdsd')
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios({
      url: PATH_PREFIX + "/go-examination/sended-students-separately",
      method: "GET",
      params: {
        token,
      },
    }).then(res => {
      if (res?.data?.status == "1") {
        setStudents(res?.data?.data?.data);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <h5>Alohida jo'natilgan o'quvchilar </h5>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                {isLoading && <DataLoader />}
                {!isLoading && (
                  <>
                    <Row>
                      <Col xl={4}></Col>
                    </Row>
                    <Row>
                      <Table
                        id="tech-companies-1"
                        className="table table-striped table-bordered mt-2"
                      >
                        <Thead>
                          <Tr>
                            <Th>#</Th>
                            <Th>F.I.O</Th>
                            <Th>Pasport</Th>
                            <Th>Telefon</Th>
                            <Th>Holati</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {students?.map((element, index) => {
                            return (
                              <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>
                                  {element?.student?.last_name +
                                    " " +
                                    element?.student?.first_name +
                                    " " +
                                    element?.student?.middle_name}
                                </Td>
                                <Td>
                                  {element?.student?.passport_seria +
                                    element?.student?.passport_number}
                                </Td>
                                <Td>{element?.student?.phone1}</Td>
                                <Td style={{ width: "1px" }}>
                                  <Badge
                                    color={
                                      element?.status == 1
                                        ? "success"
                                        : "warning"
                                    }
                                    className="py-1 px-2 badge badge-pill"
                                  >
                                    {element?.status == "1" && "Tasdiqlangan"}
                                    {element?.status == "0" && "Tasdiqlanmagan"}
                                  </Badge>
                                </Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </Row>
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(GoExaminationSendStudentsIndex);
