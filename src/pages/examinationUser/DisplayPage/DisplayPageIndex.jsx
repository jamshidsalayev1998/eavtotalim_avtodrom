import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { withTranslation } from "react-i18next";
import { useQuery } from "react-query";

import { Row, Col, Select, Input, Pagination, message } from "antd";
import axios from "axios";
import { DataLoader } from "../../Loaders/Loaders";
import useDebounce from "../../../components/CustomHooks/useDebounce";
import DisplayPageIndexTable from "./DisplayPageIndexTable";
import MainContext from "../../../Context/MainContext";
import { PATH_PREFIX } from "Utils/AppVariables";

const DisplayPageIndex = props => {
  const [data, setData] = useState([]);
  const { hasLayout, setHasLayout } = useContext(MainContext);
  const [reload, setReload] = useState(false);

  const token = localStorage.getItem("token");

  const {
    isLoading,
    error,
    data: announcement,
  } = useQuery("announcementData", () =>
    axios.get(
      `${PATH_PREFIX}/examination-user/results-by-student-for-display`,
      {
        method: "GET",
        params: {
          token,
        },
      }
    )
  );

  // useEffect(() => {
  //   setData(announcement?.data?.data);
  //   // setTimeout(() => {
  //   //   setReload(!reload);
  //   // }, 5000);
  // }, []);

  return (
    <>
      <div className="content-layout">
        <Card>
          {isLoading ? (
            <div>
              <h1>Loading</h1>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <p className="big-title" style={{ margin: 0 }}>
                  E'lon sahifasi
                </p>
                <button
                  className="btn btn-outline-light"
                  onClick={() => setHasLayout(!hasLayout)}
                >
                  <i
                    className={hasLayout ? `fa fa-expand` : `fa fa-compress`}
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                <DisplayPageIndexTable tableData={announcement?.data?.data} />
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default withTranslation()(DisplayPageIndex);
