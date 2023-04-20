import React, { useContext, useState } from "react";
import {
  withRouter,
  Link,
  useHistory,
  Redirect,
  NavLink,
} from "react-router-dom";
import loginBlue from "../../assets/images/logo-blue.png";
import commalogo from "../../assets/fonts/comma-logo.svg";
import finish from "../../assets/fonts/finish.svg";
import sharp from "../../assets/fonts/sharp.svg";
import circle from "../../assets/fonts/circle.svg";
import logoIntalim from "../../assets/images/logo.png";
import smartCar from "../../assets/images/loginPage/SmartCar.png";
import LanguageDropDown from "./../../components/CommonForBoth/TopbarDropdown/LanguageDropdown";
import MainContext from "Context/MainContext";
import "./login.css";
import API from "../../api/";
import { useTranslation } from "react-i18next";
import { message, Spin } from "antd";
// import {fileServerReadKey} from "../../services/api_services/file_server/file_server_function";
import axios from "axios";
import { PATH_PREFIX } from "../../Utils/AppVariables";
import { LoopCircleLoading } from "react-loadingg";
import { RiComputerLine } from "react-icons/ri";

const languagesList = ["uz", "kiril", "qq", "ru", "en"];

const Login = () => {
  const { t } = useTranslation();
  const {
    setAuth,
    setRole,
    setRegion_id,
    setCategory_id,
    setUserType,
    setIsStudent,
    additional,
    setAdditional,
  } = useContext(MainContext);
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ptype, setPtype] = useState("password");
  const [customchkPrimary, setcustomchkPrimary] = useState(true);
  const [loading, setLoading] = useState(false);

  // new login user function
  const loginUser = async () => {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    const key = localStorage.getItem("computer_key");
    const params = key ? { computer_key: key } : {};

    setLoading(true);

    try {
      const response = await axios.post(PATH_PREFIX + "/login", formdata, {
        params,
      });

      if (response?.data?.access_token) {
        const {
          access_token,
          user: { name, role, profession },
          category_id,
        } = response.data;

        localStorage.setItem("token", access_token);
        localStorage.setItem("user_profile_name", name);
        sessionStorage.setItem("isnotif", true);

        setAuth(true);
        setCategory_id(category_id);
        setRole(String(role));
        setRegion_id(String(profession?.region_id));
        setUserType(String(response?.data?.user?.online));
        setAdditional(response?.data?.user?.additional);

        const tempRole = parseInt(role);
        if (![13, 15, 16, 17, 18, 19].includes(tempRole)) {
          localStorage.removeItem("token");
          message.warning(
            <>
              Siz Avto intalim tizimidan foydalanishingiz mumkin <br />
              <a href="http://avto.intalim.uz/login">
                Avto intalim tizimiga o'tish{" "}
                <i className="fas fa-external-link-alt ml-2"></i>
              </a>
            </>
          );
        } else {
          history.push("/");
        }
      } else if (parseInt(response?.data?.status) === 0) {
        message.error(response?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.error) {
        message.error(error?.response?.data?.error);
      } else {
        message.error("Server bilan aloqa yo'q");
      }
    } finally {
      setLoading(false);
    }
  };

  // old login user function
  // const loginUser = async () => {
  //   // fileServerReadKey();
  //   const formdata = new FormData();
  //   formdata.append("username", username);
  //   formdata.append("password", password);
  //   let params = {};
  //   let key = localStorage.getItem("computer_key");
  //   if (key) {
  //     Object.assign(params, { computer_key: key });
  //   }
  //   setLoading(true);
  //   return await axios({
  //     url: PATH_PREFIX + "/login",
  //     method: "POST",
  //     params,
  //     data: formdata,
  //   })
  //     .then(response => {
  //       if (response?.data?.access_token) {
  //         const token = response.data.access_token;
  //         localStorage.setItem("token", token);
  //         localStorage.setItem("user_profile_name", response?.data?.user?.name);
  //         sessionStorage.setItem("isnotif", true);
  //         setAuth(true);
  //         setCategory_id(response?.data?.category_id);
  //         setRole(String(response?.data?.user?.role));
  //         setRegion_id(String(response?.data?.user?.profession?.region_id));
  //         setUserType(String(response?.data?.user?.online));
  //         setAdditional(response?.data?.user?.additional);
  //         const tempRole = parseInt(response?.data?.user?.role);
  //         if (![13, 15, 16, 17, 18, 19].includes(tempRole)) {
  //           localStorage.removeItem("token");
  //           message.warning(
  //             <>
  //               Siz Avto intalim tizimidan foydalanishingiz mumkin <br />
  //               <a href="http://avto.intalim.uz/login">
  //                 Avto intalim tizimiga o'tish{" "}
  //                 <i className="fas fa-external-link-alt ml-2"></i>
  //               </a>
  //             </>
  //           );
  //         } else {
  //           setLoading(false);
  //           history.push("/");
  //         }
  //       } else if (parseInt(response?.data?.status) === 0) {
  //         message.error(response?.data?.message);
  //         setLoading(false);
  //       }
  //     })
  //     .catch(error => {
  //       setLoading(false);
  //       if (error?.response?.data?.error) {
  //         message.error(error?.response?.data?.error);
  //         setLoading(false);
  //       } else {
  //         setLoading(false);
  //         message.error("Server bilan aloqa yo'q");
  //       }
  //     });
  // };

  const checkFs = () => {
    fileServerReadKey();
  };

  return (
    <React.Fragment>
      <Spin
        style={{ height: "100vh", position: "absolute", top: "25%" }}
        spinning={loading}
        indicator={
          <div className="d-flex justify-content-center align-items-center">
            <LoopCircleLoading color="#FECA20" />
          </div>
        }
      >
        <div>
          <img className="logo-img" src={loginBlue} alt="" />

          <div className="language d-flex justify-content-center align-items-center">
            <LanguageDropDown />
            {localStorage.getItem("computer_key") !== null ? (
              <NavLink to={"/computer-test"} className={"btn btn-success"}>
                <span className="mr-2">TEST</span>
                <RiComputerLine className="font-size-18" />
              </NavLink>
            ) : (
              <NavLink to={"/computer-test"} className={"btn btn-warning"}>
                <span>TEST</span>
              </NavLink>
            )}
          </div>
          <div></div>

          <div className="container-login">
            <div className="container-login-1">
              <img className="login-circle" src={circle} alt="circle" />

              <div className="login-heading">
                <h2 className="login-heading-h2">
                  <img src={logoIntalim} alt="logo" />
                </h2>
                <img className="login-sharp" src={sharp} alt="sharp" />
              </div>
            </div>

            <img className="login-sharp-2" src={sharp} alt="sharp" />

            <div className="backgroundCar">
              {/* <img className="w-100" src={smartCar} alt="car" /> */}
            </div>

            <div className="container-login-2">
              <div className="form_login">
                {/* {
                auth?
                <h3 className="text-danger alert-message">Server bilan aloqa yo'q !</h3>:""
              } */}
                <div className="login_form">
                  <div className="text-center">
                    <label htmlFor="username" className="font-size-18">
                      {t("Log in")}
                    </label>
                  </div>
                  <form onSubmit={e => e.preventDefault()}>
                    <label htmlFor="username" className="font-size-14">
                      Login
                    </label>
                    <p className="login_username">
                      <input
                        className="form-control w-100"
                        type="text"
                        id="username"
                        required
                        placeholder="Login ni kiriting"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                    </p>
                    <label htmlFor="password" className="font-size-14 mt-2">
                      Parol
                    </label>
                    <p className="login_password w-100">
                      <input
                        className="form-control w-100"
                        type={ptype}
                        id="password"
                        value={password}
                        required
                        placeholder="Parol ni kiriting"
                        onChange={e => setPassword(e.target.value)}
                      />
                      {ptype === "password" ? (
                        <i
                          className="bx bx-show-alt font-size-20 mr-2 i-position"
                          onClick={() => setPtype("text")}
                        ></i>
                      ) : (
                        <i
                          className="bx bxs-chevron-right-square font-size-20 mr-2 i-position"
                          onClick={() => setPtype("password")}
                        ></i>
                      )}
                    </p>
                    <div className="custom-control custom-checkbox custom-checkbox-success mt-3 mb-0 w-100 d-flex justify-content-between">
                      <div>
                        <input
                          type="checkbox"
                          className=" custom-control-input w-100 "
                          id="customCheckcolor1"
                          checked={customchkPrimary}
                          onChange={() => {
                            setcustomchkPrimary(!customchkPrimary);
                          }}
                        />

                        <label
                          className="custom-control-label"
                          htmlFor="customCheckcolor1"
                        >
                          {t("Remember me")}
                        </label>
                      </div>

                      <div className=" ">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock mr-1" />
                          {t("Forgot password")}?
                        </Link>
                      </div>
                    </div>
                    <p className="login_button">
                      <button
                        type="submit"
                        tabindex="13"
                        className="login_submit"
                        onClick={loginUser}
                      >
                        {t("Login")}
                      </button>

                      {/* <button
                     type="submit"
                     tabindex="13"
                     className="login_submit"
                     onClick={checkFs}
                    >
                     {t("Login")}
                    </button> */}
                    </p>
                    <NavLink to={"/third-application"}>
                      Testga ro'yhatdan o'tish
                    </NavLink>
                  </form>
                </div>

                <div className="copyright pull-right d-flex  ">
                  <p className={"px-5"}>{t("LoginFooter")}</p>
                  <NavLink
                    to={"/computer-config-settings"}
                    style={{ cursor: "pointer" }}
                  >
                    <i className={"fa fa-cog"}> </i>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="login-heading-div d-none d-md-block">
              <img src={commalogo} alt="comma-logo" />
              <p>
                {t(
                  "Increase your knowledge through the Intalim.uz platform Implementation of the system of distance learning of software products is designed for remote using this program implementation of education, its management and e-learning It will be possible to form a system. All in the system data is stored centrally and based on user requests (or relevance) data is displayed."
                )}
              </p>
            </div>
          </div>
        </div>
      </Spin>
    </React.Fragment>
  );
};

export default withRouter(Login);
