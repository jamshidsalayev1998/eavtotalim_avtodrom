import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
import axios from "axios";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { withTranslation, useTranslation } from "react-i18next";
import MainContext from "Context/MainContext";

import { DataLoader } from "pages/Loaders/Loaders";
import { Button, Switch, Select, Table, Tag, Space } from "antd";
import { PATH_PREFIX } from "Utils/AppVariables";

const ComeExaminationSendGroupStudents = props => {
  let match = useRouteMatch("/come-examination/come-groups/:id");
  const { Option } = Select;
  const history = useHistory();
  const dispatch = useDispatch();
  const { setAuth } = useContext(MainContext);
  const [students, setStudents] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [group_id, set_group_id] = useState(match?.params?.id);
  const [group, setGroup] = useState([]);
  const [final_access_group, setFinalAccessGroup] = useState([]);

  // sort with values by database
  useEffect(() => {
    // alert('sdsd')
    const token = localStorage.getItem("token");
    // setIsLoading(true);
    axios({
      url: PATH_PREFIX + "/come-examination/come-students-by-group",
      method: "GET",
      params: {
        token,
        group_id,
      },
    }).then(res => {
      if (res?.data?.status == "1") {
        setStudents(res?.data?.data);
        setGroup(res?.data?.group);
        setFinalAccessGroup(res?.data?.final_access_group);
        setIsLoading(false);
      }
    });
  }, []);

  const columns = [
    {
      title: "F.I.O",
      dataIndex: "fio",
      key: "fio",
    },
    {
      title: "Pasport",
      dataIndex: "passport",
      key: "passport",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const data = students;

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="top-organizations">
                <div className="top_links_page_title">
                  <span className="mr-3" onClick={() => history.goBack()}>
                    <i className="bx bx-arrow-back"> </i>
                  </span>
                  <span>
                    <b>{final_access_group?.name}</b> - guruh bilan jo'natilgan
                    o'quvchilar{" "}
                    <Badge
                      color={
                        final_access_group?.status == 1 ? "success" : "warning"
                      }
                      className="py-1 px-2 badge badge-pill"
                    >
                      {final_access_group?.status == "1" && "Tasdiqlangan"}
                      {final_access_group?.status == "0" && "Tasdiqlanmagan"}
                    </Badge>
                  </span>
                </div>
                <div></div>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                {isLoading && <DataLoader />}
                {!isLoading && (
                  <>
                    <Row style={{ justifyContent: "space-around" }}>
                      <h3>
                        {" "}
                        {final_access_group?.status == "1"
                          ? "Kelish vaqti: " +
                            final_access_group?.access_start_date +
                            " (" +
                            final_access_group?.access_start_time +
                            ")"
                          : ""}
                      </h3>
                    </Row>
                    <Table
                      id="table-to-xls"
                      columns={columns}
                      dataSource={data}
                    />
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

export default withTranslation()(ComeExaminationSendGroupStudents);
