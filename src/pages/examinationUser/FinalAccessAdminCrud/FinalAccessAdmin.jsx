import React, { useState, useEffect } from "react";
import { Card, CardBody, Container } from "reactstrap";
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
  Button,
} from "antd";
import axios from "axios";
import { PATH_PREFIX } from "../../../Utils/AppVariables";
import styleAction from "./style.module.css";
import moment from "moment";
import FinalAccessAdminAddModal from "./FinalAccessAdminAddModal";
import FinalAccessAdminEditModal from "./FinalAccessAdminEditModal";

const FinalAccessAdmin = props => {
  const [add_form] = Form.useForm();
  const [edit_form] = Form.useForm();
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [reload, setreload] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isShowModalVisible, setIsShowModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [showedCashier, setShowedCashier] = useState();
  const [editCashier, setEditCashier] = useState();
  const [showLoginParol, setShowLoginParol] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsloading(true);
    axios({
      url: PATH_PREFIX + "/examination-director/final_access_admin",
      method: "GET",
      params: {
        token,
      },
    }).then(response => {
      if (response?.data?.status == 1) {
        setData(response?.data?.data);
        setIsloading(false);
      }
    });
  }, [reload]);
  const get_fio = data => {
    return data?.last_name + " " + data?.first_name + " " + data?.middle_name;
  };
  const columns = [
    {
      title: "F.I.O",
      render: (index, element) => <>{get_fio(element)}</>,
    },
    {
      title: "Amallar",
      render: (index, element) => (
        <div className="d-flex" style={{ fontSize: "20px" }}>
          <span
            className={styleAction?.action_buttons}
            style={{ color: "#fa8c16" }}
            onClick={() => show_cashier(element)}
          >
            <i className="bx bx-show-alt"></i>
          </span>
          <span
            className={styleAction?.action_buttons}
            style={{ color: "#1890ff" }}
            onClick={() => edit_cashier(element)}
          >
            <i className="bx bx-edit"></i>
          </span>
          <Popconfirm
            title={"Ma`lumotni o`chirasizmi"}
            placement="topLeft"
            onConfirm={() => delete_cashier(element?.id)}
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
      className: styleAction?.last_td,
    },
  ];

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleOkAddModal = () => {
    add_form.submit();
    // setIsAddModalVisible(false);
  };

  const handleCancelAddModal = () => {
    setIsAddModalVisible(false);
  };
  const onFinishAdd = values => {
    const form_data = new FormData();
    for (let key in values) {
      form_data.append(key, values[key]);
    }
    const token = localStorage.getItem("token");
    axios({
      url: PATH_PREFIX + "/examination-director/final_access_admin",
      method: "POST",
      params: {
        token,
      },
      data: form_data,
    }).then(res => {
      if (res?.data?.status == 1) {
        message.success(res?.data?.message);
        setreload(!reload);
        setIsAddModalVisible(false);
        add_form.resetFields();
      }
    });
  };

  const onFinishFailedAdd = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const delete_cashier = cashier_id => {
    const token = localStorage.getItem("token");
    axios({
      url:
        PATH_PREFIX + "/examination-director/final_access_admin/" + cashier_id,
      method: "DELETE",
      params: {
        token,
        cashier_id,
      },
    }).then(res => {
      if (res?.data?.status == 1) {
        message.success(res?.data?.message);
        setreload(!reload);
        setIsAddModalVisible(false);
      }
    });
  };
  const handleCancelShowModal = () => {
    setIsShowModalVisible(false);
    setShowedCashier([]);
    setShowLoginParol({ ...showLoginParol, username: "", password: "" });
  };

  const show_cashier = cashier => {
    setShowedCashier(cashier);
    setIsShowModalVisible(true);
  };
  const showCashierLoginParol = cashier_id => {
    const token = localStorage.getItem("token");
    axios({
      url:
        PATH_PREFIX + "/examination-director/final-access-admin-get-password",
      method: "GET",
      params: {
        token,
        cashier_id,
      },
    }).then(res => {
      if (res?.data?.status == 1) {
        setShowLoginParol(prevState => ({
          ...prevState,
          username: res?.data?.data?.username,
          password: res?.data?.data?.password,
        }));
      }
    });
  };
  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleOkEditModal = () => {
    edit_form.submit();
    setIsEditModalVisible(false);
  };

  const handleCancelEditModal = () => {
    setEditCashier([]);
    setIsEditModalVisible(false);
  };

  const edit_cashier = cashier => {
    setEditCashier(cashier);
    edit_form.setFieldsValue(cashier);
    setIsEditModalVisible(true);
  };
  const onFinishEdit = values => {
    const form_data = new FormData();
    for (let key in values) {
      form_data.append(key, values[key]);
    }
    const token = localStorage.getItem("token");
    axios({
      url:
        PATH_PREFIX +
        "/examination-director/final_access_admin/" +
        editCashier?.id,
      method: "PATCH",
      params: {
        token,
        last_name: values?.last_name,
        first_name: values?.first_name,
        middle_name: values?.middle_name,
        phone: values?.phone,
      },
      data: form_data,
    }).then(res => {
      if (res?.data?.status == 1) {
        message.success(res?.data?.message);
        setreload(!reload);
        setIsEditModalVisible(false);
        edit_form.resetFields();
      }
    });
  };

  const onFinishFailedEdit = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <FinalAccessAdminAddModal
        isAddModalVisible={isAddModalVisible}
        handleOkAddModal={handleOkAddModal}
        handleCancelAddModal={handleCancelAddModal}
        add_form={add_form}
        onFinishAdd={onFinishAdd}
        onFinishFailedAdd={onFinishFailedAdd}
      />
      <FinalAccessAdminEditModal
        isEditModalVisible={isEditModalVisible}
        handleOkEditModal={handleOkEditModal}
        handleCancelEditModal={handleCancelEditModal}
        edit_form={edit_form}
        onFinishEdit={onFinishEdit}
        onFinishFailedEdit={onFinishFailedEdit}
        editCashier={editCashier}
      />
      <Modal
        title="Ko`rish"
        visible={isShowModalVisible}
        onCancel={handleCancelShowModal}
        zIndex={1005}
      >
        <Row>
          <Col xl={12}>
            <label htmlFor="" className="w-100">
              F.I.O
            </label>
            <p>{get_fio(showedCashier)}</p>
          </Col>
          <Col xl={12}>
            <label htmlFor="" className="w-100">
              Yaratilgan vaqi
            </label>
            <p>
              {moment(showedCashier?.created_at).format("YYYY-MM-DD H:m:s")}
            </p>
          </Col>
          <Col xl={12}>
            <label htmlFor="" className="w-100">
              Parol loginni ko'rish
            </label>
            <button
              className="btn btn-light"
              onClick={() => showCashierLoginParol(showedCashier?.id)}
            >
              <i className="fa fa-eye"></i>
            </button>
          </Col>
          <Col xl={12}>
            <p>
              Login:{" "}
              <b>
                {showLoginParol?.username
                  ? showLoginParol?.username
                  : "________"}
              </b>
            </p>
            <p>
              Parol:{" "}
              <b>
                {showLoginParol?.password
                  ? showLoginParol?.password
                  : "________"}
              </b>
            </p>
          </Col>
        </Row>
      </Modal>
      <div className="page-content">
        <Container fluid>
          <Card>
            <div className="top-organizations">
              <h5>Testga ruxsat beruvchi admin </h5>
              <Button type="primary" ghost onClick={showAddModal}>
                {" "}
                + Qo'shish
              </Button>
            </div>
            <div className="crypto-buy-sell-nav mt-3">
              <Row>
                <Col xl={24}>
                  <Table
                    columns={columns}
                    dataSource={data}
                    loading={isloading}
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
    </>
  );
};

export default withTranslation()(FinalAccessAdmin);
