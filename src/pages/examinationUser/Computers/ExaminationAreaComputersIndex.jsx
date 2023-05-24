import React, { useEffect, useState } from "react";
import { Badge, Card, CardBody, Container } from "reactstrap";
import {
  Row,
  Col,
  Table,
  Popconfirm,
  Form,
  message,
  Tooltip,
  Button,
} from "antd";
import {
  clearComputerApi,
  deleteComputersApi,
  indexComputersApi,
  storeComputersApi,
  updateComputersApi,
} from "../../../services/api_services/computers_api";
import styleAction from "./style.module.css";
import CreateExaminationAreaComputer from "./modals/CreateExaminationAreaComputer";
import EditExaminationAreaComputer from "./modals/EditExaminationAreaComputer";
import {
  PATH_PREFIX,
  PATH_PREFIX_FILE,
  PATH_PREFIX_FILE_WITHOUT_SLESH,
} from "../../../Utils/AppVariables";

const ExaminationAreaComputersIndex = () => {
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [computers, setComputers] = useState([]);
  const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);
  const [isVisibleEditModal, setIsVisibleEditModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedEditElement, setSelectedEditElement] = useState(undefined);
  useEffect(() => {
    (async () => {
      const response = await indexComputersApi();
      if (response) {
        setComputers(response);
      }
    })();
  }, [reload]);

  const clearComputer = computer => {
    (async () => {
      const res = await clearComputerApi(computer?.id);
      if (parseInt(res?.status) === 1) {
        message.success(res?.message);
        setReload(!reload);
      }
    })();
  };

  const columns = [
    {
      title: "Tartib raqami",
      key: "order",
      dataIndex: "order",
    },
    // {
    //     title: 'Ip address',
    //     key: 'ip_address',
    //     dataIndex: 'ip_address'
    // },
    {
      title: "Holat",
      render: (index, element) => (
        <>
          {" "}
          {element?.merge ? (
            <Badge color={"warning"}>Band</Badge>
          ) : (
            <Badge color={"success"}>Bo'sh</Badge>
          )}{" "}
        </>
      ),
    },
    {
      title: "Amallar",
      width: 100,
      render: (index, element) => (
        <>
          <div className="d-flex" style={{ fontSize: "20px" }}>
            <Tooltip title={"Kalit faylni yuklash"}>
              <a
                download={element?.order + "_key.json"}
                href={
                  "data:text/json;charset=utf-8," +
                  '{"key":"' +
                  element?.key +
                  '"}'
                }
                className={styleAction?.action_buttons}
                style={{ color: "#1890ff" }}
              >
                <i className="bx bx-download" />
              </a>
            </Tooltip>
            <Tooltip title={"O'zgartirish"}>
              <span
                className={styleAction?.action_buttons}
                onClick={() => selectForEdit(element)}
                style={{ color: "#1890ff" }}
              >
                <i className="bx bx-edit" />
              </span>
            </Tooltip>
            <Popconfirm
              title={"Ma`lumotni o`chirasizmi"}
              placement="topLeft"
              okText={"O`chirish"}
              cancelText={"Bekor qilish"}
              onConfirm={() => deleteComputer(element)}
            >
              <Tooltip title={"O'chirish"}>
                <span
                  className={styleAction?.action_buttons}
                  style={{ color: "#f5222d" }}
                >
                  {" "}
                  <i className="bx bxs-trash" />
                </span>
              </Tooltip>
            </Popconfirm>
            {element?.merge ? (
              <Popconfirm
                title={"Kompyuterni bo'shatishni hohlaysizmi"}
                placement="topLeft"
                okText={"Bo'shatish"}
                cancelText={"Bekor qilish"}
                onConfirm={() => clearComputer(element)}
              >
                <Tooltip title={"Kompyuterni bo'shatish"}>
                  <span
                    className={styleAction?.action_buttons}
                    style={{ color: "#52c41a" }}
                  >
                    {" "}
                    <i className="bx bxs-brush-alt"></i>{" "}
                  </span>
                </Tooltip>
              </Popconfirm>
            ) : (
              ""
            )}
          </div>
        </>
      ),
    },
  ];
  const showAddModal = () => {
    setIsVisibleAddModal(true);
  };
  const cancelAddModal = () => {
    setIsVisibleAddModal(false);
    addForm.resetFields();
  };
  const okAddModal = () => {
    addForm.submit();
  };
  const onFinishAddForm = values => {
    (async () => {
      const data = new FormData();
      for (const key in values) {
        data.append(key, values[key]);
      }
      const response = await storeComputersApi(data);
      if (parseInt(response?.status) === 1) {
        message.success(response?.message);
        cancelAddModal();
        setReload(!reload);
      } else if (parseInt(response?.status) === 2) {
        Object.entries(response?.validator_errors)?.map(([key, value]) => {
          addForm.setFields([
            {
              name: [`${key}`],
              errors: [value],
              validating: false,
            },
          ]);
        });
      }
    })();
  };
  const showEditModal = () => {
    setIsVisibleEditModal(true);
  };
  const cancelEditModal = () => {
    setIsVisibleEditModal(false);
    editForm.resetFields();
  };
  const okEditModal = () => {
    editForm.submit();
  };
  const onFinishEditForm = values => {
    (async () => {
      if (selectedEditElement) {
        const data = new FormData();
        for (const key in values) {
          data.append(key, values[key]);
        }
        const response = await updateComputersApi(
          values,
          selectedEditElement?.id
        );
        if (parseInt(response?.status) === 1) {
          message.success(response?.message);
          cancelEditModal();
          setReload(!reload);
        } else if (parseInt(response?.status) === 2) {
          Object.entries(response?.validator_errors)?.map(([key, value]) => {
            editForm.setFields([
              {
                name: [`${key}`],
                errors: [value],
                validating: false,
              },
            ]);
          });
        }
      }
    })();
  };
  const selectForEdit = element => {
    showEditModal();
    console.log("ele", element);
    editForm.setFieldsValue(element);
    setSelectedEditElement(element);
  };

  const deleteComputer = element => {
    (async () => {
      const response = await deleteComputersApi(element?.id);
      if (parseInt(response?.status) === 1) {
        message.success("Ma`lumot o`chirildi");
        setReload(!reload);
      }
    })();
  };
  return (
    <div className="page-content">
      <CreateExaminationAreaComputer
        setIsVisibleAddModal={setIsVisibleAddModal}
        isVisibleAddModal={isVisibleAddModal}
        cancelAddModal={cancelAddModal}
        showAddModal={showAddModal}
        onFinishAddForm={onFinishAddForm}
        addForm={addForm}
        okAddModal={okAddModal}
      />
      <EditExaminationAreaComputer
        setIsVisibleEditModal={setIsVisibleEditModal}
        isVisibleEditModal={isVisibleEditModal}
        cancelEditModal={cancelEditModal}
        showEditModal={showEditModal}
        onFinishEditForm={onFinishEditForm}
        editForm={editForm}
        okEditModal={okEditModal}
      />
      <Container fluid>
        <Card>
          <div className="top-organizations">
            <h5>Kompyuterlar </h5>
            <Button type="primary" ghost onClick={showAddModal}>
              + Qo'shish
            </Button>
          </div>
          <div className="crypto-buy-sell-nav mt-3">
            <Row>
              <Col xl={24}>
                <Table
                  dataSource={computers}
                  columns={columns}
                  bordered={true}
                  scroll={{ x: true, y: 600 }}
                  pagination={false}
                  size="small"
                  sticky
                />
              </Col>
            </Row>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default ExaminationAreaComputersIndex;
