import React, { useState, useEffect, useRef } from "react";
import { Badge, Button, Card, CardBody, Container } from "reactstrap";
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
  Tooltip,
} from "antd";
import axios from "axios";
import { PATH_PREFIX } from "../../../../../Utils/AppVariables";
import useDebounce from "../../../../../components/CustomHooks/useDebounce";
import QRCode from "qrcode";
import QrCodeToPrint from "./QrCodeToPrint";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import "./key_styles.css";
import AddStudentModal from "./AddStudentModal";
import { getEduTypesForAll } from "../../../../../services/api_services/edu_types_api";
import {
  getOrganizations,
  getVisitorTypes,
} from "../../../../../services/api_services/administrator_students_api";

const AllStudentsIndex = props => {
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
  const [editStudent, setEditStudent] = useState();
  const urlStudentAdd = "/examination-administrator/all-students/add";
  const inputEl = useRef();
  const history = useHistory();
  const location = useLocation();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [eduTypes, setEduTypes] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [visitorTypes, setVisitorTypes] = useState([]);
  const inputTagRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsloading(true);
    axios({
      url: PATH_PREFIX + "/examination-administrator/all-students",
      method: "GET",
      params: {
        token,
        page: page ? page : "1",
        show_count: showCount,
        word,
      },
    }).then(response => {
      if (response?.data?.status == 1) {
        setData(response?.data?.data?.data);
        setTotal(response?.data?.data?.total);
        setPage(response?.data?.data?.current_page);
        setIsloading(false);
      }
    });
    window.addEventListener("keyup", event => {
      if (event?.code === "F2") {
        if (location?.pathname === "/examination-administrator/all-students") {
          history.push(urlStudentAdd);
        }
      }
      if (event?.code === "F4") {
        if (location?.pathname === "/examination-administrator/all-students") {
          openAddModal();
        }
      }
    });
  }, [reload, waitWord]);
  useEffect(() => {
    getEduTypes();
    getOrganizationsFunction();
    getVisitorTypesFunction();
  }, []);
  const getEduTypes = () => {
    (async () => {
      let params = {};
      const res = await getEduTypesForAll(params);
      setEduTypes(res?.data?.data);
    })();
  };

  const getVisitorTypesFunction = () => {
    (async () => {
      let params = {};
      const visResp = await getVisitorTypes(params);
      setVisitorTypes(visResp?.data);
    })();
  };
  //   console.log("visitorTypess", visitorTypes);

  const getOrganizationsFunction = () => {
    (async () => {
      const orgResp = await getOrganizations({ show_count: "all" });
      if (orgResp) {
        setOrganizations(orgResp?.data);
      }
    })();
  };
  const columns = [
    {
      title: "#",
      render: (index, element, counter) => (
        <>{showCount * (page - 1) + counter + 1}</>
      ),
    },

    {
      title: "F.I.O",
      render: (index, element) => <>{element?.student_fio}</>,
    },
    {
      title: "Ta`lim turi",
      render: (index, element) => <>{element?.edu_type?.short_name_en}</>,
    },
    {
      title: "Holati",
      render: (index, element) => (
        <>
          {element?.type === "resubmit" ? (
            <Badge color={"warning"}>Qayta</Badge>
          ) : (
            <Badge color={"primary"}>Birinchi</Badge>
          )}
        </>
      ),
    },
    {
      title: "To`lov",
      children: [
        {
          title: "Nazariy",
          render: (index, element) => (
            <>
              {parseInt(element?.payment_status) ? (
                <Badge color={"success"}>qilingan</Badge>
              ) : (
                <Badge color={"danger"}>qilinmagan</Badge>
              )}
            </>
          ),
        },
        {
          title: "Amaliy",
          render: (index, element) => (
            <>
              {parseInt(element?.practical_payment_status) ? (
                <Badge color={"success"}>qilingan</Badge>
              ) : (
                <Badge color={"danger"}>qilinmagan</Badge>
              )}
            </>
          ),
        },
      ],
    },
    {
      title: "Natija",
      children: [
        {
          title: "Nazariy",
          render: (index, element) => (
            <>
              {parseInt(element?.exam_result) === 1 ? (
                <Badge color={"success"}>O`tgan</Badge>
              ) : parseInt(element?.exam_result) === 0 ? (
                <Badge color={"danger"}>Yiqilgan</Badge>
              ) : (
                <Badge color={"warning"}>Topshirmagan</Badge>
              )}
            </>
          ),
        },
        {
          title: "Amaliy",
          render: (index, element) => (
            <>
              {parseInt(element?.practical_exam_result) === 1 ? (
                <Badge color={"success"}>O`tgan</Badge>
              ) : parseInt(element?.practical_exam_result) === 0 ? (
                <Badge color={"danger"}>Yiqilgan</Badge>
              ) : (
                <Badge color={"warning"}>Topshirmagan</Badge>
              )}
            </>
          ),
        },
      ],
    },
    {
      title: "Amallar",
      render: (index, element) => (
        <>
          <Tooltip title={"O'zgartirish"}>
            <NavLink
              to={"/examination-administrator/edit-students/" + element?.id}
            >
              <i className={"bx bx-edit"} />
            </NavLink>
          </Tooltip>
        </>
      ),
    },
  ];

  const selectStudentForEdit = element => {
    setEditStudent(element);
  };

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
    QRCode.toDataURL(selected?.student_passport).then(res => {
      setSrc(res);
    });
  }

  const openAddModal = e => {
    setAddModalVisible(true);
    console.log("ref -> ", inputTagRef);
    focusRefElement();
  };
  const focusRefElement = () => {
    if (inputTagRef.current) {
      inputTagRef.current.focus();
    }
  };

  return (
    <>
      <AddStudentModal
        addModalVisible={addModalVisible}
        setAddModalVisible={setAddModalVisible}
        eduTypes={eduTypes}
        organizations={organizations}
        visitorTypes={visitorTypes}
        reload={reload}
        setReload={setreload}
        inputTagRef={inputTagRef}
        focusRefElement={focusRefElement}
      />
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Barcha keluvchilar </h5>
                <div className={"d-flex"}>
                  <NavLink to={urlStudentAdd}>
                    <Button color="success" outline>
                      + Qo'shish sahifasi{" "}
                      <span className={"keyboard-style"}>F2</span>
                    </Button>
                  </NavLink>
                  <div className={"d-flex ml-2"}>
                    <Button
                      color="success"
                      outline
                      onClick={() => openAddModal()}
                    >
                      <span className="mr-2">+ Qo'shish oynasi</span>
                      <span className={"keyboard-style"}>F4</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                <Row>
                  <Col xl={18}>
                    <Col xl={24} className={"d-flex justify-content-end"}>
                      <Col xl={6}>
                        <Input
                          allowClear={true}
                          onChange={e => changeWord(e?.target?.value)}
                        />
                      </Col>
                    </Col>
                    <Col xl={24}>
                      <Table
                        bordered={true}
                        columns={columns}
                        dataSource={data}
                        loading={isloading}
                        pagination={false}
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
                  </Col>
                  <Col xl={6}>
                    {selectedStudent && (
                      <>
                        <QrCodeToPrint
                          src={src}
                          selectedStudent={selectedStudent}
                        />
                      </>
                    )}
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(AllStudentsIndex);
