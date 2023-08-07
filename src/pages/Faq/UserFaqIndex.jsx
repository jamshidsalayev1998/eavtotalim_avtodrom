import React, { useState, useEffect } from "react";
import { Card, CardBody, Container } from "reactstrap";
import axios from "axios";
import { isEmpty } from "lodash";
import { withTranslation, useTranslation } from "react-i18next";
import { DataLoader } from "pages/Loaders/Loaders";
import { Collapse } from "antd";
import { PATH_PREFIX } from "Utils/AppVariables";

const { Panel } = Collapse;
const UserFaqIndex = props => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios({
      url: PATH_PREFIX + "/user/faq",
      method: "GET",
      params: {
        token,
      },
    }).then(response => {
      if (response?.data?.status == 1) {
        setData(response?.data?.data);
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
                <div className="d-flex">
                  <h5 className="text-dark">FAQ (Ko'p beriladigan savollar)</h5>
                </div>
              </div>
              <div className="crypto-buy-sell-nav">
                {isLoading && <DataLoader />}
                {!isLoading && (
                  <Collapse accordion bordered={false}>
                    {data?.map((element, index) => {
                      return (
                        <Panel header={element?.question_uz} key={index}>
                          <p>{element?.answer_uz}</p>
                        </Panel>
                      );
                    })}
                  </Collapse>
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(UserFaqIndex);
