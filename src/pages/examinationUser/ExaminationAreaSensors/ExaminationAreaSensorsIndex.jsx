import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, Badge } from "reactstrap";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import {
  PATH_PREFIX,
  PATH_PREFIX_FILE,
  PATH_PREFIX_V2,
} from "Utils/AppVariables";
import {
  Modal,
  Button,
  Select,
  Tabs,
  Row,
  Col,
  Table,
  Popconfirm,
  message,
  Form,
} from "antd";

import styleAction from "../AdministratorCrud/style.module.css";
import AddExaminationAreaSensorModal from "./AddExaminationAreaSensorModal";
import EditExaminationAreaSensorModal from "./EditExaminationAreaSensorModal";
import {
  changeSensorPositionApi,
  deleteExaminationAreaSensor,
  getExaminationAreaSensor,
} from "../../../services/api_services/examination_area_sensors";
import { getEduTypesForAll } from "../../../services/api_services/edu_types_api";
import { RiArrowUpDownLine } from "react-icons/ri";
import { TbHandClick } from "react-icons/tb";
import { PlusCircleOutlined } from "@ant-design/icons";

const ExaminationAreaSensorsIndex = props => {
  const { Option } = Select;
  const [editForm] = Form.useForm();

  const [data, setData] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedElement, setSelectedElement] = useState();
  const [fileEditList, setFileEditList] = useState([]);
  const [eduTypes, setEduTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingButtonDown, setLoadingButtonDown] = useState(false);
  const [loadingButtonUp, setLoadingButtonUp] = useState(false);
  const pageConfig = {
    eduTypeId: window.location.pathname + "-edu-type-id",
  };
  const [eduTypeId, setEduTypeId] = useState(
    localStorage.getItem(pageConfig?.eduTypeId)
      ? localStorage.getItem(pageConfig?.eduTypeId)
      : "all"
  );
  const { t } = useTranslation();
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  useEffect(() => {
    (async () => {
      try {
        let filters = [];
        if (eduTypeId && eduTypeId != "all") {
          filters.push({
            fieldKey: "edu_type_id",
            fieldOperator: "=",
            fieldValue: eduTypeId,
          });
        }
        let params = {
          filters: JSON.stringify(filters),
        };
        setLoading(true);
        const response = await getExaminationAreaSensor(params);
        setData(response?.data?.data);
        const responseEduType = await getEduTypesForAll({});
        setEduTypes(responseEduType?.data?.data);
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);

  function edit_payment(element) {
    const updatedElement = {
      ...element,
      light: !!parseInt(element?.light),
      right: !!parseInt(element?.right),
      left: !!parseInt(element?.left),
      arg1: !!parseInt(element?.arg1),
      remen: !!parseInt(element?.remen),
      engine: !!parseInt(element?.engine),
      back: !!parseInt(element?.back),
    };

    editForm.setFieldsValue(updatedElement);
    setFileEditList([
      {
        uid: "-1",
        name: updatedElement?.image,
        status: "done",
        url: PATH_PREFIX_FILE + updatedElement?.image,
      },
    ]);
    setIsEditModalVisible(true);
  }

  function delete_payment(element) {
    (async () => {
      const response = await deleteExaminationAreaSensor(element);
      if (parseInt(response?.data?.status) === 1) {
        setReload(!reload);
        message.success(response?.data?.message);
      }
    })();
  }

  // move sensor
  const moveSensor = async (id, type) => {
    try {
      const data = {
        examination_area_sensor_id: id,
        type: type,
      };
      setLoadingButtonDown(type === "down", id === id);
      setLoadingButtonUp(type === "up");

      const response = await changeSensorPositionApi(data, id);
      if (response?.data.message === "Success") {
        setReload(!reload);
        message.success("Sensor joylashuvi o`zgartirildi");
        setLoadingButtonDown(false);
        setLoadingButtonUp(false);
      } else {
        message.error("Sensor joylashuvi o`zgartirilmadi");
        setLoadingButtonDown(false);
        setLoadingButtonUp(false);
      }
    } catch (error) {
      message.error(data?.message || "Sensor joylashuvi o`zgartirilmadi");
      setLoadingButtonDown(false);
      setLoadingButtonUp(false);
    }
  };
  console.log("llllllllllllllllllllllllll", moveSensor);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

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
      title: "Nomi",
      render: (index, element) => (
        <NavLink to={"/examination-area/sensors/" + element?.id}>
          {element?.name}
        </NavLink>
      ),
      width: 300,
    },
    {
      title: "Jarima ball",
      dataIndex: "penalty_ball",
      key: "penalty_ball",
      width: 100,
      align: "center",
    },
    {
      title: "Sensor id",
      dataIndex: "sensor_id",
      key: "sensor_id",
      width: 100,
      align: "center",
    },
    {
      title: "Rasm",
      render: (index, element) => (
        <div className="text-center">
          <img
            style={{ maxWidth: "80px" }}
            src={PATH_PREFIX_FILE + element?.image}
            alt=""
          />
        </div>
      ),
      width: 200,
    },
    {
      title: "Ta`lim turi",
      render: (index, element) => <>{element?.edu_type?.short_name_uz}</>,
      width: 200,
    },
    {
      title: "Amallar",
      render: (index, element) => (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ fontSize: "20px" }}
        >
          <span
            className={styleAction?.action_buttons}
            style={{ color: "#1890ff" }}
            onClick={() => edit_payment(element)}
          >
            <i className="bx bx-edit"></i>
          </span>
          <Popconfirm
            title={"Ma`lumotni o`chirasizmi"}
            placement="topLeft"
            onConfirm={() => delete_payment(element?.id)}
            okText={"O`chirish"}
            cancelText={"Bekor qilish"}
          >
            <span
              className={styleAction?.action_buttons}
              style={{ color: "#f5222d" }}
            >
              {" "}
              <i className="bx bxs-trash"></i>
            </span>
          </Popconfirm>
        </div>
      ),
      width: 100,
      align: "center",
    },
    {
      title: (
        <>
          <RiArrowUpDownLine className="font-size-20" />
          <TbHandClick className="font-size-20" />
        </>
      ),
      render: (index, element) => (
        <div className="d-flex justify-content-around align-items-center">
          <Button
            onClick={() => moveSensor(element?.id, "down")}
            className="p-1"
            loading={loadingButtonDown}
          >
            <i className="fas fa-arrow-down font-size-12"></i>
          </Button>
          <Button
            onClick={() => moveSensor(element?.id, "up")}
            className="p-1"
            loading={loadingButtonUp}
          >
            <i className="fas fa-arrow-up font-size-12"></i>
          </Button>
        </div>
      ),
      width: 60,
      align: "center",
    },
  ];
  const changeEduTypeID = value => {
    localStorage.setItem(
      pageConfig?.eduTypeId,
      value != "all" ? parseInt(value) : "all"
    );
    setEduTypeId(value != "all" ? parseInt(value) : "all");
    setReload(!reload);
  };
  return (
    <>
      <AddExaminationAreaSensorModal
        dummyRequest={dummyRequest}
        setIsAddModalVisible={setIsAddModalVisible}
        isAddModalVisible={isAddModalVisible}
        setReload={setReload}
        reload={reload}
      />
      <EditExaminationAreaSensorModal
        dummyRequest={dummyRequest}
        setFileEditList={setFileEditList}
        fileEditList={fileEditList}
        setIsEditModalVisible={setIsEditModalVisible}
        isEditModalVisible={isEditModalVisible}
        setReload={setReload}
        reload={reload}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        editForm={editForm}
      />
      <div className="page-content">
        <Container fluid>
          <Card>
            <div className="top-organizations d-flex justify-content-between">
              <h5 className="text-dark">{t("Sensorlar")}</h5>
              <div className={"d-flex"}>
                <Button type="primary" ghost onClick={showAddModal}>
                  + Qo`shish
                </Button>
              </div>
            </div>

            <Row gutter={[0, 16]}>
              <Col xl={6}>
                <Select
                  className={"w-100"}
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  value={eduTypeId !== "all" ? parseInt(eduTypeId) : "all"}
                  onChange={changeEduTypeID}
                >
                  <Option value="all">Barchasi</Option>
                  {eduTypes?.map((element, index) => {
                    return (
                      <Option value={element?.id} key={index}>
                        {element?.short_name_uz}
                      </Option>
                    );
                  })}
                </Select>
              </Col>

              <Col sm={24} md={24} xl={24}>
                <Table
                  className="table-responsive table-hover"
                  bordered
                  dataSource={data}
                  columns={columns}
                  loading={loading}
                  scroll={{ x: true, y: 600 }}
                  pagination={{ position: ["bottomRight"] }}
                  size="small"
                  sticky
                />
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withTranslation()(ExaminationAreaSensorsIndex);
