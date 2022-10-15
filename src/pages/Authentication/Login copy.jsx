import React, { useContext, useState } from "react"
import { withRouter, Link, useHistory } from "react-router-dom"
import loginBlue from "../../assets/images/logo-blue.png";
import commalogo from "../../assets/fonts/comma-logo.svg";
import finish from "../../assets/fonts/finish.svg";
import sharp from "../../assets/fonts/sharp.svg";
import circle from "../../assets/fonts/circle.svg";
import LanguageDropDown from "./../../components/CommonForBoth/TopbarDropdown/LanguageDropdown";
import MainContext from "Context/MainContext"
import "./login.css"
import API from "../../api/";
import { Modal } from "reactstrap"
import { useTranslation } from "react-i18next"
import { message } from 'antd';

const languagesList = ["uz", "kiril", "qq", "ru", "en"];

const Login = () => {
  const { t } = useTranslation()
  const { setAuth, setRole, setCategory_id, setUserType, setIsStudent } = useContext(MainContext);
  const history = useHistory();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ptype, setPtype] = useState("password");
  const [customchkPrimary, setcustomchkPrimary] = useState(true);

  const loginUser = async () => {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    return await API.post("/login", formdata)

      .then(response => {

        if (response?.data?.access_token) {
          const token = response.data.access_token;
          localStorage.setItem("token", token);
          localStorage.setItem("user_profile_name", response?.data?.user?.name);
          setAuth(true);
          setCategory_id(response?.data?.category_id);
          setRole(String(response?.data?.user?.role));
          setUserType(String(response?.data?.user?.online));
          if ((response?.data?.user?.role === "5" || response?.data?.user?.role === 5) && languagesList.includes(response?.data?.user?.app_lang)) {
            setIsStudent(true)
          } else if ((response?.data?.user?.role === "5" || response?.data?.user?.role === 5) && !languagesList.includes(response?.data?.user?.app_lang)) {
            setIsStudent(false)
            history.push("/defaultlanguage")
          } else {
            history.push("/");
          }
        }
      })
      .catch(error => {
        message.error(error?.response?.data?.error);
      });

  };



  return (
    <React.Fragment>
      <div>
        <img className="logo-img" src={loginBlue} alt="" />
        <div className="language">
          <LanguageDropDown />
        </div>
        <div className="container-login">
          <div className="container-login-1">
            <img className="login-circle" src={circle} alt="circle" />
            <div className="login-heading">
              <h2 className="login-heading-h2">INTALIM</h2>
              <img className="login-sharp" src={sharp} alt="sharp" />
              <div className="login-heading-div">
                <img src={commalogo} alt="comma-logo" />
                <p>
                {t("Increase your knowledge through the Intalim.uz platform Implementation of the system of distance learning of software products is designed for remote using this program implementation of education, its management and e-learning It will be possible to form a system. All in the system data is stored centrally and based on user requests (or relevance) data is displayed.")}
                </p>
              </div>
              <img className="login-finish" src={finish} alt="finish" />
            </div>
          </div>
          <div className="container-login-2">
            <div className="form_login">
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
                    <button type="button" className="login_submit" onClick={loginUser}>
                      {t("Login")}
                    </button>
                  </p>
                </form>
              </div>
              <div className="copyright pull-right">
                <p>{t("LoginFooter")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

