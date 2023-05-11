import { Button, Col, Row, Select, Table } from "antd";
import React from "react";
import { Card, Container } from "reactstrap";
import data from "./data";
import "./style.scss";

const index = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 40,
      align: "center",
    },
    {
      title: "F.I.SH",
      width: 350,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Test markazi",
      width: 300,
      dataIndex: "testcenter",
      key: "address",
    },
    {
      title: "Topshiruvchi turi",
      width: 350,
      dataIndex: "usertype",
      key: "age",
    },
    {
      title: "Ta`lim turi",
      dataIndex: "edutype",
      key: "address",
    },
    {
      title: "To'lovlar ",
      align: "center",
      dataIndex: "payment",
      key: "address",
    },
    {
      title: "Amallar",
      align: "center",
      key: "address",
      width: 120,
    },
  ];
  return (
    <div className="page-content apply">
      <Card className="mb-3">
        <div className="apply-header">
          <div>Ariza topshirish</div>
          <Button type="primary">
            <i class="fas fa-plus-circle mr-1"></i>Ariza yarating
          </Button>
        </div>
      </Card>
      <Card>
        <Table
          className="table-responsive table-hover"
          dataSource={data}
          columns={columns}
          scroll={{ x: true, y: 600 }}
          pagination={{ position: ["bottomRight"] }}
          size="small"
          sticky
        />
      </Card>
    </div>
  );
};

export default index;
