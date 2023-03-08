import React, { useState, useRef } from "react";
import { withTranslation } from "react-i18next";
import { Table, Popconfirm, message, Tooltip, Tag, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { Badge, Button } from "reactstrap";
import PrintReportByStudent from "./print/PrintReportByStudent";
import "./print/print.css";
import ReactToPrint from "react-to-print";
import { sendStudentResultBySms } from "../../../services/api_services/send_student_result_by_sms_api";
const { TextArea } = Input;

const ExamResultIndexTable = ({ tableData, reload, setreload }) => {
  const [selectedStudentForReport, setSelectedStudentForReport] =
    useState(undefined);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [studentId, setStudentId] = useState({});

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  //   useEffect(() => {
  //     const getStudentId = async () => {
  //       try {
  //         const response = tableData;
  //         setStudentId(response.id);
  //       } catch (error) {
  //         message.error("Student id ma'lumoti topilmadi");
  //       }
  //     };
  //   }, [userId]);
  //   console.log("iddddddddddddd", tableData?.filter(v => v?.id).length);

  const sendTestResult = student => {
    (async () => {
      let data = new FormData();
      data.append("student_id", student?.id);
      const res = await sendStudentResultBySms(data);
      if (parseInt(res?.status) === 1) {
        message.success(res?.message);
      }
      if (parseInt(res?.status) === 0) {
        message.error(res?.message);
      }
      setreload(!reload);
    })();
  };
  let printReportRef = useRef();
  const columns = [
    {
      title: "F.I.O",
      dataIndex: "student_fio",
      key: "student_fio",
      render: (text, row) => (
        <Link
          to={{
            pathname: `/examination/result-groups/${row?.final_test_student_attempt?.id}`,
            state: {
              student_fio: row?.student_fio,
            },
          }}
        >
          {row?.student_fio}
        </Link>
      ),
    },
    {
      title: "Passport",
      dataIndex: "student_passpt",
      render: (text, row) => <>{row?.student_passport}</>,
    },
    {
      title: "Telefon",
      dataIndex: "student_phone",
      key: "student_phone",
      render: (text, row) => <>{row?.student_phone}</>,
    },
    {
      title: "To`g`ri javoblar",
      render: (text, row) => (
        <>{row?.final_test_student_attempt?.correct_answers}</>
      ),
    },
    {
      title: "Noto`g`ri javoblar",
      render: (text, row) => (
        <>{row?.final_test_student_attempt?.incorrect_answers}</>
      ),
    },
    {
      title: "Test yechilgan sana",
      render: (text, row) => (
        <>
          {moment(row?.final_test_student_attempt?.created_at).format(
            "YYYY-MM-DD HH:mm:ss"
          )}
        </>
      ),
    },
    {
      title: "Natija",
      children: [
        {
          title: "Nazariy",
          render: (index, element) => (
            <>
              {parseInt(element?.exam_result) === 1 ? (
                <Tag color={"green"}>O`tgan</Tag>
              ) : parseInt(element?.exam_result) === 0 ? (
                <>
                  <Tag color={"red"}>Yiqilgan</Tag>
                  <button
                    className="btn rounded border p-1 ml-2"
                    color={"success"}
                    onClick={showModal}
                  >
                    Qayta qo'yish <i class="fas fa-retweet text-success"></i>
                  </button>
                </>
              ) : (
                <Tag color={"gold"}>Topshirmagan</Tag>
              )}
            </>
          ),
        },
        {
          title: "Amaliy",
          render: (index, element) => (
            <>
              {parseInt(element?.practical_exam_result) === 1 ? (
                <Tag color={"green"}>O`tgan</Tag>
              ) : parseInt(element?.practical_exam_result) === 0 ? (
                <>
                  <Tag color={"red"}>Yiqilgan</Tag>
                  <button className="btn rounded border p-1" color={"success"}>
                    Qayta qo'yish <i class="fas fa-retweet text-success"></i>
                  </button>
                </>
              ) : (
                <Tag color={"gold"}>Topshirmagan</Tag>
              )}
            </>
          ),
        },
      ],
    },
    {
      title: "Sms bayonnoma",
      className: "text-center",
      render: (index, element) => (
        <>
          {!parseInt(element?.sms_sended) ? (
            <>
              {" "}
              <Popconfirm
                onConfirm={() => sendTestResult(element)}
                title={"Test natijasi haqidagi habar jo`natilsinmi"}
                placement={"topLeft"}
              >
                <span style={{ cursor: "pointer", color: "green" }}>
                  {" "}
                  <i className={"fa fa-envelope"} />{" "}
                </span>
              </Popconfirm>{" "}
            </>
          ) : (
            <Tooltip placement="left" title={"Jo`natilgan"}>
              <span>
                {" "}
                <i className={"fa fa-envelope"} />{" "}
              </span>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const data = tableData;
  const selectStudent = async student => {
    setSelectedStudentForReport(student);
  };
  return (
    <>
      <Table
        bordered={true}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <div className={"print-box"} ref={elem => (printReportRef = elem)}>
        <PrintReportByStudent selectedStudent={selectedStudentForReport} />
      </div>

      <Modal
        title="Qayta imtihonga qo'yish"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <Input placeholder="Basic usage" />
          <TextArea rows={4} />
        </div>
      </Modal>
    </>
  );
};

export default withTranslation()(ExamResultIndexTable);
