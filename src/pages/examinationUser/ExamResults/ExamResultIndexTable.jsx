import React, { useState, useRef } from "react";
import { withTranslation } from "react-i18next";
import {
  Table,
  Popconfirm,
  message,
  Tooltip,
  Tag,
  Modal,
  Input,
  Form,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { Badge } from "reactstrap";
import PrintReportByStudent from "./print/PrintReportByStudent";
import "./print/print.css";
import ReactToPrint from "react-to-print";
import { sendStudentResultBySms } from "../../../services/api_services/send_student_result_by_sms_api";
import axios from "axios";
import { PATH_PREFIX_V2 } from "Utils/AppVariables";
import { sendStudentTheorioticalReexam } from "services/api_services/send_student_theoriotical_reexam";
import { sendStudentPracticalReexam } from "services/api_services/send_student_practical_reeam";
const { TextArea } = Input;

const ExamResultIndexTable = ({ tableData, reload, setreload }) => {
  const [selectedStudentForReport, setSelectedStudentForReport] =
    useState(undefined);
  const [open, setOpen] = useState({ opened: false, item: undefined });
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [openPractical, setOpenPractical] = useState({
    opened: false,
    item: undefined,
  });
  const [confirmLoadingPractical, setConfirmLoadingPractical] = useState(false);

  const showModal = id => {
    setOpen({ opened: true, item: id });
  };

  const handleOk = async values => {
    try {
      setConfirmLoading(true);
      const data = { final_access_student_id: open.item, ...values };
      const response = await sendStudentTheorioticalReexam(data);
      setConfirmLoading(false);
      setOpen({ opened: false, item: undefined });
      message.success(response?.message);
      setreload(!reload);
    } catch (error) {
      message.error("Xatolik yuz berdi");
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen({ opened: false, item: undefined });
  };

  const showModalPractical = id => {
    setOpenPractical({ opened: true, item: id });
  };
  const handleOkPractical = async values => {
    try {
      setConfirmLoadingPractical(true);
      const data = {
        final_practical_test_record_id: openPractical.item,
        ...values,
      };
      const response = await sendStudentPracticalReexam(data);
      setConfirmLoadingPractical(false);
      setOpenPractical({ opened: false, item: undefined });
      message.success(response?.message);
      setreload(!reload);
    } catch (error) {
      message.error("Xatolik yuz berdi");
      setConfirmLoadingPractical(false);
    }
  };
  const handleCancelPractical = () => {
    setOpenPractical({ opened: false, item: undefined });
  };

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
          render: (index, element) => {
            return (
              <>
                {parseInt(element?.exam_result) === 1 ? (
                  <Tag color={"green"}>O`tgan</Tag>
                ) : parseInt(element?.exam_result) === 0 ? (
                  <>
                    <Tag color={"red"}>Yiqilgan</Tag>
                    <button
                      className="btn rounded border p-1 ml-2"
                      color={"success"}
                      onClick={() => showModal(element?.id)}
                    >
                      Qayta qo'yish{" "}
                      <i className="fas fa-retweet text-success"></i>
                    </button>
                  </>
                ) : (
                  <Tag color={"gold"}>Topshirmagan</Tag>
                )}
              </>
            );
          },
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
                  <button
                    className="btn rounded border p-1 ml-2"
                    color={"success"}
                    onClick={() => showModalPractical(element?.id)}
                  >
                    Qayta qo'yish{" "}
                    <i className="fas fa-retweet text-success"></i>
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
        scroll={{ x: true, y: 600 }}
        size="small"
        sticky
      />
      <div className={"print-box"} ref={elem => (printReportRef = elem)}>
        <PrintReportByStudent selectedStudent={selectedStudentForReport} />
      </div>

      <Modal
        title="Qayta imtihonga qo'yish"
        open={open.opened}
        onCancel={handleCancel}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleOk}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Izohni kiriting!",
              },
            ]}
            name={"description"}
            label="Izoh"
          >
            <TextArea rows={4} />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button loading={confirmLoading} htmlType="submit" type="primary">
              Imtihonga qo'yish
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal
        title="Qayta imtihonga qo'yish"
        open={openPractical.opened}
        onCancel={handleCancelPractical}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleOkPractical}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Izohni kiriting!",
              },
            ]}
            name={"description"}
            label="Izoh"
          >
            <TextArea rows={4} />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button
              loading={confirmLoadingPractical}
              htmlType="submit"
              type="primary"
            >
              Imtihonga qo'yish
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default withTranslation()(ExamResultIndexTable);
