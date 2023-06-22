import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Table } from "antd";
import axios from "axios";
import { PATH_PREFIX } from "Utils/AppVariables";

const ExaminationAreaWithoutAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios({
      url: "http://abs.intalim.uz/api/application-examination-area/examination-areas",
      method: "GET",
    })
      .then(res => {
        if (res?.data?.status == 1) {
          setData(res?.data?.data);
        }
      })
      .finally(setIsLoading(false));
  }, []);

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 60,
      align: "center",
    },
    {
      title: "Tashkilot nomlari",
      render: e => (
        <NavLink className={"ml-1"} to={"/queue/" + e?.id}>
          {e?.name}
        </NavLink>
      ),
      align: "left",
    },
    {
      title: "Qisqacha nomi",
      render: (i, e) => <span>{e?.short_name}</span>,
    },
    {
      title: "Manzil",
      render: (i, e) => (
        <span>
          {e?.region?.name}, {e?.area?.name}
        </span>
      ),
      align: "left",
    },
  ];

  return (
    <div className="p-3">
      <div
        className="btn rounded border d-flex align-items-center bg-white"
        style={{ boxShadow: "0px 10px 20px rgba(28, 88, 110, 0.15)" }}
      >
        <NavLink to={"/login"}>
          <i className="bx bx-arrow-back font-size-24 font-weight-bold"></i>
        </NavLink>
        <div style={{ margin: "0 auto" }}>
          <span
            style={{ margin: "0 auto", color: "#595959" }}
            className="m-0 font-size-24 font-weight-bold"
          >
            Imtihon markazlari navbat oynasi
          </span>
        </div>
      </div>

      <Row gutter={[12, 12]} className="p-3">
        {data?.map((e, i) => (
          <Col
            className="rounded rounded-5 bg-white p-2 mx-2"
            style={{ boxShadow: "0px 10px 20px rgba(28, 88, 110, 0.15)" }}
            key={i}
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={4}
          >
            <NavLink to={"/queue/" + e?.id}>{e?.name}</NavLink>
          </Col>
        ))}
      </Row>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered={false}
        className="table-striped"
        style={{
          boxShadow: "0px 10px 20px rgba(28, 88, 110, 0.15)",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default ExaminationAreaWithoutAuth;
