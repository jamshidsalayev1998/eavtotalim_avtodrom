import React, { useState, useEffect } from "react";
import { Badge, Card, CardBody, Container } from "reactstrap";
import { withTranslation } from "react-i18next";
import {
  Row,
  Col,
  Select,
  Input,
  Pagination,
  Table,
  Modal,
  Form,
  message,
  Popconfirm,
} from "antd";
import axios from "axios";
import QRCode from "qrcode";
import ReactToPrint from "react-to-print";
import { NavLink } from "react-router-dom";
import useDebounce from "../../../../../components/CustomHooks/useDebounce";
import { PATH_PREFIX } from "../../../../../Utils/AppVariables";
import { getAllStudentsForAdministrator } from "../../../../../services/api_services/administrator_students_api";
import { ExportToExcel } from "../../../../../components/ExcelExport/ExportToExcel";

const certificateStudentsIndex = props => {
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [reload, setreload] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [showCount, setShowCount] = useState(10);
  const [word, setWord] = useState("");
  const waitWord = useDebounce(word, 1000);
  const [selectedStudent, setSelectedStudent] = useState();
  const [src, setSrc] = useState("");

  useEffect(() => {
    let filters = [
      {
        fieldKey: "exam_result",
        value: "1",
      },
      {
        fieldKey: "practical_exam_result",
        value: "1",
      },
    ];
    let params = {
      page: page ? page : "1",
      show_count: showCount,
      word,
      filters: JSON.stringify(filters),
    };
    (async () => {
      setIsloading(true);
      const response = await getAllStudentsForAdministrator(params);
      if (response?.data?.status == 1) {
        setData(response?.data?.data?.data);
        setTotal(response?.data?.data?.total);
        setPage(response?.data?.data?.current_page);
        setIsloading(false);
      }
    })();
  }, [reload, waitWord]);

  const columns = [
    {
      title: "#",
      render: (index, element, counter) => (
        <>{showCount * (page - 1) + counter + 1}</>
      ),
    },

    {
      title: "F.I.O",
      render: (index, element) => (
        <>
          <NavLink to={`/examination-administrator/certificate/${element?.id}`}>
            {element?.student_fio}
          </NavLink>
        </>
      ),
    },
    {
      title: "Holati",
      render: (index, element) => (
        <>
          {element?.type == "resubmit" ? (
            <Badge color={"warning"}>Qayta topshirish</Badge>
          ) : (
            <Badge color={"primary"}>Birinchi marta</Badge>
          )}
        </>
      ),
    },
    {
      title: "To`lov holati(Nazariy/Amaliy)",
      render: (index, element) => (
        <>
          {element?.payment_status ? (
            <Badge color={"success"}>To'lov qilingan</Badge>
          ) : (
            <Badge color={"danger"}>To'lov qilinmagan</Badge>
          )}
          /
          {element?.practical_payment_status ? (
            <Badge color={"success"}>To'lov qilingan</Badge>
          ) : (
            <Badge color={"danger"}>To'lov qilinmagan</Badge>
          )}
        </>
      ),
    },
    {
      title: "Test topshirganlik holati(Nazariy/Amaliy)",
      render: (index, element) => (
        <>
          {element?.exam_result == 1 ? (
            <Badge color={"success"}>O`tgan</Badge>
          ) : element?.exam_result == 0 ? (
            <Badge color={"danger"}>Yiqilgan</Badge>
          ) : (
            <Badge color={"warning"}>Topshirmagan</Badge>
          )}
          /
          {element?.practical_exam_result == 1 ? (
            <Badge color={"success"}>O`tgan</Badge>
          ) : element?.practical_exam_result == 0 ? (
            <Badge color={"danger"}>Yiqilgan</Badge>
          ) : (
            <Badge color={"warning"}>Topshirmagan</Badge>
          )}
        </>
      ),
    },
  ];

  const onShowSizeChange = (current, pageSize) => {
    setShowCount(pageSize);
    setPage(0);
    setTimeout(() => {
      setreload(!reload);
    }, 1000);
  };

  function changePage(e) {
    setPage(e);
    setreload(!reload);
  }

  function changeWord(word) {
    setWord(word);
    setPage(1);
  }

  function select_student(selected) {
    setSelectedStudent(selected);
    QRCode.toDataURL(selected?.id + "").then(res => {
      setSrc(res);
    });
  }

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <div className="top-organizations">
              <h5>Sertifikat chiqarish </h5>
            </div>

            <Row gutter={[16, 16]}>
              <Col xl={24}>
                <Row className="justify-content-between">
                  <Col xl={6}>
                    <ExportToExcel apiData={data} fileName={"fileName"} />
                  </Col>
                  <Col xl={6}>
                    <Input
                      allowClear={true}
                      onChange={e => changeWord(e?.target?.value)}
                    ></Input>
                  </Col>
                </Row>
              </Col>

              <Col xl={24}>
                <Table
                  columns={columns}
                  dataSource={data}
                  loading={isloading}
                  pagination={false}
                  bordered={true}
                  scroll={{ x: true, y: 600 }}
                  size="small"
                  sticky
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {
                        select_student(record);
                      },
                    };
                  }}
                />
              </Col>
              <Col xl={24} className={"d-flex justify-content-end"}>
                <Pagination
                  onShowSizeChange={onShowSizeChange}
                  onChange={changePage}
                  defaultCurrent={page}
                  current={page}
                  total={total}
                  showSizeChanger
                />
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(certificateStudentsIndex);
