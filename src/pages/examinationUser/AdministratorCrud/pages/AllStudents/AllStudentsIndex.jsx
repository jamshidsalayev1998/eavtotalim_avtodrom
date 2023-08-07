import React, { useState, useEffect, useRef, useContext } from "react";
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
  Drawer,
} from "antd";
import axios from "axios";
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
import { element } from "prop-types";
import MainContext from "../../../../../Context/MainContext";
import { deleteStudentApplivation } from "services/api_services/final_access_student/final_accesss_student_api";
import { PATH_PREFIX_V2 } from "Utils/AppVariables";

const AllStudentsIndex = props => {
  const mainContext = useContext(MainContext);
  // console.log('uy' , context);
  const examinationAreaId = mainContext?.profession?.examination_area_id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
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
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [eduTypes, setEduTypes] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [visitorTypes, setVisitorTypes] = useState([]);
  const inputTagRef = useRef(null);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    axios({
      url: PATH_PREFIX_V2 + "/examination-administrator/students",
      method: "GET",
      params: {
        token,
        page: page ? page : "1",
        word,
      },
    }).then(response => {
      if (response?.data?.message === "Success") {
        setData(response?.data?.data);
        setTotal(response?.data?.data?.total);
        setPage(response?.data?.data?.current_page);
        setLoading(false);
      } else {
        setLoading(false);
        message.error("Xatolik!");
      }
    });
    window.addEventListener("keyup", event => {
      if (event?.code === "F2") {
        if (location?.pathname === "/examination-administrator/students") {
          history.push(urlStudentAdd);
        }
      }
      if (event?.code === "F4") {
        if (location?.pathname === "/examination-administrator/students") {
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

  const getOrganizationsFunction = () => {
    (async () => {
      const orgResp = await getOrganizations({ show_count: "all" });
      if (orgResp) {
        setOrganizations(orgResp?.data);
      }
    })();
  };

  function delete_student(element) {
    (async () => {
      const response = await deleteStudentApplivation(element);
      if (response?.data?.message === "Success") {
        setReload(!reload);
        message.success("O'quvchi tizimdan muvoffaqiyatli o'chirildi");
      }
    })();
  }

  const selectStudentForEdit = element => {
    setEditStudent(element);
  };

  const onShowSizeChange = (current, pageSize) => {
    setShowCount(pageSize);
    setPage(0);
    setTimeout(() => {
      setReload(!reload);
    }, 1000);
  };

  function changePage(e) {
    setPage(e);
    setReload(!reload);
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

  // Add student
  const openAddModal = e => {
    setAddModalVisible(true);
    console.log("ref -> ", inputTagRef);
    focusRefElement();
  };
  const openUpdateModal = e => {
    setUpdateModalVisible(true);
    console.log("ref -> ", inputTagRef);
    focusRefElement();
  };
  // Update student
  const focusRefElement = () => {
    if (inputTagRef.current) {
      inputTagRef.current.focus();
    }
  };

  const handleRowClick = (record, index) => {
    select_student(record);
    showDrawer();
  };

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
      title: <div className="text-center">F.I.O</div>,
      render: (index, element) => <>{element?.student_fio}</>,
      width: 200,
    },
    {
      title: <div className="text-center">Ta`lim turi</div>,
      render: (index, element) => <>{element?.edu_type?.short_name}</>,
    },
    {
      title: "Holati",
      align: "center",
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
      title: "To'lov",
      children: [
        {
          title: "Nazariy",
          align: "center",
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
          align: "center",
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
          align: "center",
          render: (index, element) => (
            <>
              {element?.type_of_exam === "practical" ? (
                "Topshirmaydi"
              ) : (
                <>
                  {parseInt(element?.exam_result) === 1 ? (
                    <Badge color={"success"}>O`tgan</Badge>
                  ) : parseInt(element?.exam_result) === 0 ? (
                    <Badge color={"danger"}>Yiqilgan</Badge>
                  ) : (
                    <Badge color={"warning"}>Topshirmagan</Badge>
                  )}
                </>
              )}
            </>
          ),
        },
        {
          title: "Amaliy",
          align: "center",
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
      title: "Umumiy holat",
      render: (index, element) => (
        <>
          {parseInt(examinationAreaId) === 23
            ? element?.general_status_data?.additional_name
            : element?.general_status_data?.name}
        </>
      ),
      width: "120",
    },
    {
      title: "Qr code",
      align: "center",
      width: 200,
      render: (record, index) => (
        <i
          onClick={() => handleRowClick(record, index)}
          style={{ cursor: "pointer", width: "80px" }}
          className="fas fa-qrcode text-info font-size-20"
        ></i>
      ),
    },
    {
      title: "Amallar",
      align: "center",
      render: (element, index) => (
        <div
          key={index}
          className="d-flex align-items-center justify-content-around font-size-20"
          style={{ width: "80px" }}
        >
          <Tooltip title={"O'zgartirish"}>
            <NavLink
              to={"/examination-administrator/edit-students/" + element?.id}
            >
              <i className={"bx bx-edit"} />
            </NavLink>
          </Tooltip>

          <Tooltip title={"O'chirish"}>
            <Popconfirm
              title={"Ma`lumotni o`chirasizmi"}
              placement="topLeft"
              onConfirm={() => delete_student(element?.id)}
              okText={"O`chirish"}
              cancelText={"Bekor qilish"}
            >
              <span style={{ color: "#f5222d", cursor: "pointer" }}>
                {" "}
                <i className="bx bxs-trash"></i>
              </span>
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <AddStudentModal
        addModalVisible={addModalVisible}
        setAddModalVisible={setAddModalVisible}
        eduTypes={eduTypes}
        organizations={organizations}
        visitorTypes={visitorTypes}
        reload={reload}
        setReload={setReload}
        inputTagRef={inputTagRef}
        focusRefElement={focusRefElement}
      />

      <div className="page-content">
        <Container fluid>
          <Card>
            <div className="d-flex justify-content-between align-items-center">
              <h5>Barcha keluvchilar </h5>
              <div className={"d-flex"}>
                {/* <NavLink to={urlStudentAdd}>
                    <Button color="success" outline>
                      + Qo'shish sahifasi{" "}
                      <span className={"keyboard-style"}>F2</span>
                    </Button>
                  </NavLink> */}
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

            <Row gutter={[0, 16]}>
              <Col xl={24}>
                <Col xl={6}>
                  <Input
                    allowClear={true}
                    onChange={e => changeWord(e?.target?.value)}
                  />
                </Col>
              </Col>

              <Row gutter={[0, 16]}>
                <Col xl={24}>
                  <Table
                    columns={
                      parseInt(examinationAreaId) === 23
                        ? columns.filter(columnFilter => {
                            return columnFilter?.title !== "To'lov";
                          })
                        : columns
                    }
                    dataSource={data}
                    loading={loading}
                    bordered={true}
                    scroll={{ x: true, y: 600 }}
                    pagination={true}
                    size="small"
                    sticky
                  />
                </Col>
                <Col xl={24} className="d-flex justify-content-end">
                  {/*<Pagination*/}
                  {/*  onShowSizeChange={onShowSizeChange}*/}
                  {/*  onChange={changePage}*/}
                  {/*  defaultCurrent={page}*/}
                  {/*  current={page}*/}
                  {/*  total={total}*/}
                  {/*  showSizeChanger*/}
                  {/*/>*/}
                </Col>
              </Row>
            </Row>
          </Card>

          <Drawer
            title="Basic Drawer"
            placement="right"
            onClose={onClose}
            open={open}
          >
            <QrCodeToPrint src={src} selectedStudent={selectedStudent} />
          </Drawer>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(AllStudentsIndex);
