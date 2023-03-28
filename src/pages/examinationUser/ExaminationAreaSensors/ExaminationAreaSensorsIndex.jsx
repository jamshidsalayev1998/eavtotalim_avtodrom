import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Container, Badge } from "reactstrap";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import { PATH_PREFIX, PATH_PREFIX_FILE } from "Utils/AppVariables";
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
  deleteExaminationAreaSensor,
  getExaminationAreaSensor,
} from "../../../services/api_services/examination_area_sensors";
import { getEduTypesForAll } from "../../../services/api_services/edu_types_api";

const ExaminationAreaSensorsIndex = props => {
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [editForm] = Form.useForm();

  const history = useHistory();
  const [data, setData] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedElement, setSelectedElement] = useState();
  const [fileEditList, setFileEditList] = useState([]);
  const [eduTypes, setEduTypes] = useState([]);
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
      const response = await getExaminationAreaSensor(params);
      setData(response?.data?.data);
      const responseEduType = await getEduTypesForAll({});
      setEduTypes(responseEduType?.data?.data);
    })();
  }, [reload]);
  console.log("eee", eduTypes);

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

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const columns = [
    {
      title: "Nomi",
      render: (index, element) => (
        <NavLink to={"/examination-area/sensors/" + element?.id}>
          {element?.name}
        </NavLink>
      ),
    },
    {
      title: "Jarima bali",
      dataIndex: "penalty_ball",
      key: "penalty_ball",
    },
    {
      title: "Sensor id",
      dataIndex: "sensor_id",
      key: "sensor_id",
    },
    {
      title: "Rasm",
      render: (index, element) => (
        <>
          <img
            style={{ maxWidth: "100px" }}
            src={PATH_PREFIX_FILE + element?.image}
            alt=""
          />
        </>
      ),
    },
    {
      title: "Ta`lim turi",
      render: (index, element) => <>{element?.edu_type?.short_name_uz}</>,
    },
    {
      title: "Amallar",
      render: (index, element) => (
        <div className="d-flex" style={{ fontSize: "20px" }}>
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
            <CardBody>
              <div className="top-organizations d-flex justify-content-between">
                <h5 className="text-dark">{t("Sensorlar")}</h5>
                <div className={"d-flex"}>
                  <button
                    className={"btn btn-outline-success"}
                    onClick={showAddModal}
                  >
                    <i className={"fa fa-plus"}></i> Qo`shish
                  </button>
                </div>
              </div>
              <div className="crypto-buy-sell-nav mt-3">
                <Row>
                  <Col xl={6}>
                    <Select
                      className={"w-100"}
                      showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
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
                </Row>
                <Row>
                  <Col xl={24}>
                    <Table dataSource={data} columns={columns} />
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

export default withTranslation()(ExaminationAreaSensorsIndex);
