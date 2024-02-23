import React from "react";
import { Card } from "reactstrap";
import { useQuery } from "react-query";
import axios from "axios";
import { PATH_PREFIX } from "Utils/AppVariables";
import { Table } from "antd";

export default function LastVisited() {
  const token = localStorage.getItem("token");

  const { isLoading, error, data } = useQuery("repoData", () =>
    axios.get(`${PATH_PREFIX}/examination-director/dashboard`, {
      method: "GET",
      params: {
        token,
      },
    })
  );

  const columns = [
    {
      title: "#",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "F.I.O",
      dataIndex: "student_fio",
      key: "student_fio",
    },
    {
      title: "Raqam",
      dataIndex: "student_phone",
      key: "student_phone",
    },
    {
      title: "Passport",
      dataIndex: "student_passport",
      key: "student_passport",
    },
    {
      title: "To'g'ri javoblar",
      dataIndex: "correct_answers",
      key: "correct_answers",
      render: (text, record) => {
        return <span style={{ color: "green" }}>{text}</span>;
      },
    },
    {
      title: "Noto'g'ri javoblar",
      dataIndex: "incorrect_answers",
      key: "incorrect_answers",
      render: (text, record) => {
        return <span style={{ color: "red" }}>{text}</span>;
      },
    },
  ];

  return (
    <div className="content-layout">
      <Card>
        {isLoading ? (
          <div>
            <h1>Loading</h1>
          </div>
        ) : (
          <Table
            dataSource={data?.data?.data?.last_comes}
            columns={columns}
            pagination={{
              pageSize: 10,
            }}
            scroll={{
              x: 130,
            }}
          />
        )}
      </Card>
    </div>
  );
}
