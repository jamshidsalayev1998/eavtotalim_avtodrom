import React, { useContext } from "react";
import { withTranslation } from "react-i18next";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
// import Pusher from "pusher-js";
// import MainContext from "../../../Context/MainContext";

const DisplayPageIndexTable = ({ tableData }) => {
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
      title: <div className="text-center">F.I.O</div>,
      dataIndex: "student_fio",
      key: "student_fio",
      render: (text, row) => (
        <p className="small-title"> {row?.student_fio} </p>
      ),
    },
    {
      title: "To`g`ri javoblar",
      dataIndex: "correct_answers",
      key: "correct_answers",
      className: "text-center",
      render: (text, row) => (
        <p className="small-title" style={{ color: "green" }}>
          {row?.correct_answers}
        </p>
      ),
    },
    {
      title: "Noto`g`ri javoblar",
      dataIndex: "incorrect_answers",
      key: "incorrect_answers",
      className: "text-center",
      render: (text, row) => (
        <p className="small-title" style={{ color: "red" }}>
          {row?.incorrect_answers}
        </p>
      ),
    },
    {
      title: "Belgilanmagan javoblar",
      className: "text-center",
      render: (index, row) => (
        <p className="small-title" style={{ color: "#ffbe0b" }}>
          {20 - (row?.correct_answers + row?.incorrect_answers)}
        </p>
      ),
    },
    {
      title: "Nazariy",
      key: "incorrect_answers",
      className: "text-center",
      render: (text, row) => (
        <>
          <Badge
            color={
              row?.final_access_student?.exam_result == 0
                ? `danger`
                : row?.final_access_student?.exam_result == 1
                ? `success`
                : `warning`
            }
            style={{ fontSize: "small" }}
          >
            <i
              className={
                row?.final_access_student?.exam_result == 0
                  ? "fa fa-times"
                  : row?.exam_result == 1
                  ? "fa fa-check"
                  : "fa fa-clock"
              }
            ></i>
          </Badge>
        </>
      ),
    },
    {
      title: "Amaliy",
      key: "incorrect_answers",
      className: "text-center",
      render: (text, row) => (
        <>
          <Badge
            color={
              row?.practical_exam_result == 0
                ? `danger`
                : row?.practical_exam_result == 1
                ? `success`
                : `warning`
            }
            style={{ fontSize: "small" }}
          >
            <i
              className={
                row?.practical_exam_result == 0
                  ? "fa fa-times"
                  : row?.practical_exam_result == 1
                  ? "fa fa-check"
                  : "fa fa-clock"
              }
            ></i>
          </Badge>
        </>
      ),
    },
  ];

  const data = tableData;

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        style={{
          height: "calc(100vh - 190px)",
        }}
        pagination={{
          pageSize: 10,
        }}
        scroll={{
          x: 1200,
          y: "60vh",
        }}
      />
    </>
  );
};

export default withTranslation()(DisplayPageIndexTable);
