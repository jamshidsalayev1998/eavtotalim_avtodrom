import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
//i18n
import { withTranslation } from "react-i18next";
import { withRouter, Link, useHistory } from "react-router-dom";
// users
import user1 from "../../../assets/images/userProfile2.jpg";
import MainContext from "../../../Context/MainContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { PATH_PREFIX } from "Utils/AppVariables";
import { useTranslation } from "react-i18next";
import { Form, Input, Modal } from "antd";

const ProfileMenu = props => {
  const { t } = useTranslation();

  const history = useHistory();
  const [menu, setMenu] = useState(false);
  const [username, setusername] = useState("Admin");
  const { auth, setAuth, role } = useContext(MainContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSimilar, setIsSimilar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [computerKey, setComputerKey] = useState(
    localStorage.getItem("computer_key")
  );

  useEffect(() => {
    if (localStorage.getItem("user_profile_name")) {
      setusername(localStorage.getItem("user_profile_name"));
    }
  }, [props.success]);

  const logout = () => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_PREFIX + "/logout",
      method: "POST",
      params: {
        token: token,
      },
    })
      .then(response => {
        if (response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: `${t("Successfully logged out")}`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user_profile_name");
            setAuth(false);
            if (computerKey) {
              history.push("/computer-test");
            } else {
              history.push("/login");
            }
          });
        }
      })
      .catch(error => {
        if (error?.response?.status === 401) {
          if (computerKey) {
            history.push("/computer-test");
          } else {
            history.push("/login");
          }
          setAuth(false);
          localStorage.removeItem("token");
        }
      });
  };

  const onFinish = values => {
    if (String(values.newpassword) === String(values.newpassword2)) {
      setIsSimilar(false);
      const token = localStorage.getItem("token");
      const formdata = new FormData();
      formdata.append("password", values.newpassword);
      formdata.append("old_password", values.password);
      axios({
        url: PATH_PREFIX + "/change-password",
        method: "POST",
        params: {
          token: token,
        },
        data: formdata,
      }).then(res => {
        if (res?.data?.status === 1) {
          setIsModalVisible(false);
          Swal.fire({
            icon: "success",
            title: `Parol o'zgartirildi`,
            showConfirmButton: false,
            timer: 1000,
          });
          localStorage.setItem("token", res?.data?.access_token);
        } else {
          setErrorMessage(res?.data?.message);
        }
      });
    } else {
      setIsSimilar(true);
    }
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ml-2 mr-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu right>
          <Link to={role == 1 ? "/organization-info" : "/"}>
            <DropdownItem>
              {" "}
              <i className="bx bx-user font-size-16 align-middle mr-1" />
              {props.t("Profile")}{" "}
            </DropdownItem>
          </Link>
          {role == 13 ? (
            <DropdownItem
              className=""
              style={{ cursor: "pointer" }}
              onClick={() => setIsModalVisible(true)}
            >
              <i className="bx bx-lock font-size-16 align-middle mr-1" />
              <span>{props.t("Parolni o'zgartirish")}</span>
            </DropdownItem>
          ) : (
            ""
          )}
          <div className="dropdown-divider" />
          <DropdownItem
            className=""
            style={{ cursor: "pointer" }}
            onClick={() => logout()}
          >
            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        zIndex={10000}
        title="Parolni o'zgartirish"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {isSimilar ? (
            <p className="text-danger text-center">
              {errorMessage ? errorMessage : "Moslik yo'q!"}
            </p>
          ) : (
            ""
          )}
          <label>
            Joriy parol<span className="text-danger">*</span>
          </label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Joriy parolni kiriting" }]}
          >
            <Input.Password
              maxLength={16}
              minLength={6}
              placeholder="Joriy parolni kiriting"
            />
          </Form.Item>

          <label>
            Yangi parol<span className="text-danger">*</span>
          </label>
          <Form.Item
            name="newpassword"
            rules={[
              { required: true, message: "Iltimos yangi parolni kiriting!" },
            ]}
          >
            <Input.Password
              maxLength={16}
              minLength={6}
              placeholder="Yangi parolni kiriting"
            />
          </Form.Item>

          <label>
            Yangi parolni takrorlang<span className="text-danger">*</span>
          </label>
          <Form.Item
            name="newpassword2"
            rules={[
              { required: true, message: "Iltimos yangi parolni takrorlang!" },
            ]}
          >
            <Input.Password
              maxLength={16}
              minLength={6}
              placeholder="Yangi parolni takrorlang"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8 }}>
            <div
              style={{ position: "absolute", bottom: "-30px", right: "0px" }}
            >
              <button
                onClick={onFinish}
                className="btn btn-success float-right"
                htmlType="submit"
              >
                Saqlash
              </button>
              <button
                className="btn btn-light mr-2 float-right"
                onClick={() => setIsModalVisible(false)}
              >
                Bekor qilish
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(ProfileMenu));
