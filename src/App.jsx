import React, {useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    useHistory,
    Route,
    Redirect,
    useLocation,
} from "react-router-dom";
import axios from "axios";
import Login from "./pages/Authentication/Login";
import {LoopCircleLoading} from "react-loadingg";
import "./assets/scss/theme.scss";
import MainContext from "./Context/MainContext";
import "./globalStyles/app.css";
import "./globalStyles/style.scss";
import "./pages/Organizations/style.css";
import API from "./api/";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {useSelector} from "react-redux";
import SuperadminRoles from "roles/SuperadminRoles";
import DefaultLanguagePage from "pages/DefaultLanguage";
import ExaminationUserRoles from "./roles/ExaminationUserRoles";
import FinalyExamination from "./roles/FinalyExamination";
import CashierRoles from "./roles/CashierRoles";
import FinalAccessAdminRoles from "./roles/FinalAccessAdminRoles";
import AdministratorRoles from "./roles/AdministratorRoles";
import InstructorRoles from "./roles/InstructorRoles";
import {storeApiBugs} from "./services/api_services/api_bugs";
import PracticalResponsesRealTime from "./pages/examResults/PracticalResponsesRealTime";
import {message} from "antd";
import ThemeContext from "./Context/ThemeContext";
import ComputerSettingsPage from "./pages/examinationUser/Computers/Config/ComputerSettingsPage";
import UserComputerConfigPage from "./pages/examinationUser/Computers/Config/UserComputerConfigPage";
import thirdApplication from "pages/Students/SigupOutLogin/thirdApplication";
import socketIO from 'socket.io-client';
import {NODEJS_SOCKET_URL} from "./Utils/AppVariables";

export const socketParam = socketIO.connect(NODEJS_SOCKET_URL);

const languagesList = ["uz", "kiril", "qq", "ru", "en"];

const App = () => {
    const location = useLocation();
    const history = useHistory();
    const [auth, setAuth] = useState(false);
    const [isStudant, setIsStudent] = useState(false);
    const [role, setRole] = useState(null);
    const [region_id, setRegion_id] = useState(null);
    const [user_type, setUserType] = useState(0);
    const [category_id, setCategory_id] = useState("");
    const [verifyLoading, setVerifyLoading] = useState(false);
    const refresh = useSelector(state => state.content_state);
    const [i18, setI18] = useState(localStorage.getItem("I18N_LANGUAGE"));
    const [hasLayout, setHasLayout] = useState(true);
    const [additional, setAdditional] = useState([]);
    const [profession, setProfession] = useState(undefined);
    const [computerKey, setComputerKey] = useState(
        localStorage.getItem("computer_key")
    );

    console.log(location);

//   axios.interceptors.response.use(
//     response => {
//       return response;
//     },

//     error => {
//       if (error?.response?.status === 429) {
//         alert("to many request 429");

//         caches.clear();
//         window.location.reload();
//       } else if (error?.response?.status === 401) {
//         message.error(error?.response?.data?.error);

//         localStorage.removeItem("token");
//         setAuth(false);
//         if (localStorage.getItem("computer_key")) {
//           // history.push("/computer-test");
//         } else {
//           history.push("/login");
//         }
//       } else if (error?.response?.status === 404) {
//         alert("not found 404");
//         history.push("/notfound");
//       }
//       console.log("err mes", error?.response);
//       if (error?.response?.status != 401) {
//         (async () => {
//           const data = new FormData();
//           data.append("status_code", error?.response?.status);
//           delete error?.response?.data?.trace;
//           Object.assign(error?.response?.data, {
//             api_url: error?.response?.config?.url,
//           });
//           data.append("error", JSON.stringify(error?.response?.data));
//           let params = {};
//           // const res = storeApiBugs(params, data);
//         })();
//       }
//     }
//   );

    useEffect(() => {
        const token = localStorage.getItem("token");
        const checkUser = async () => {
            return await API.post("/me", "", {params: {token}})
                .then(res => {
                    setRole(String(res?.data?.role));
                    setCategory_id(res?.data?.category_id);
                    setUserType(res?.data?.online);
                    setVerifyLoading(true);
                    setAuth(true);
                    setProfession(res?.data?.profession);
                    // setName(res?.data?.name)
                    if (
                        languagesList.includes(res?.data?.app_lang) &&
                        String(res?.data?.role) === "5"
                    ) {
                        localStorage.setItem("I18N_LANGUAGE", res?.data?.app_lang);
                        setIsStudent(true);
                    }
                })
                .catch(err => {
                    // if (err?.response?.status === 401) {
                    localStorage.removeItem("token");
                    setVerifyLoading(true);
                    setAuth(false);
                    setRole(null);
                    setRegion_id(null);
                    // }
                });
        };
        if (token && !auth) {
            checkUser();
        } else if (!token) {
            setVerifyLoading(true);
            setRole(null);
            setRegion_id(null);
            if (localStorage.getItem("computer_key")) {
                // history.push("/computer-test");
            } else {
                history.push("/login");
            }
        }
    }, [auth, refresh.refresh]);

    const renderRoutes = () => {
        if (verifyLoading) {
            switch (role) {
                case "777":
                    return <SuperadminRoles/>;
                case "13":
                    return <ExaminationUserRoles/>;
                case "15":
                    return <FinalyExamination/>;
                case "16":
                    return <CashierRoles/>;
                case "17":
                    return <FinalAccessAdminRoles/>;
                case "18":
                    return <InstructorRoles/>;
                case "19":
                    return <AdministratorRoles/>;
                default:
                    return (
                        <>
                            {/*<Route component={PracticalResponsesRealTime} path="/real-time-practical-responses" />*/}
                            <Route component={Login} path="/login" exact/>
                            <Route
                                component={ComputerSettingsPage}
                                path="/computer-test"
                                exact
                            />
                            <Route
                                component={UserComputerConfigPage}
                                path="/computer-config-settings"
                                exact
                            />
                            <Route
                                component={thirdApplication}
                                path="/third-application"
                                exact
                            />
                            <Redirect
                                to={
                                    localStorage.getItem("computer_key")
                                        ? "computer-test"
                                        : "/login"
                                }
                            />
                        </>
                    );
            }
        } else {
            return (
                <div style={{height: "100vh"}}>
                    <LoopCircleLoading/>
                </div>
            );
        }
    };

    const [theme, setTheme] = useState("blue");

    const toggleTheme = () =>
        theme === "blue" ? setTheme("red") : setTheme("blue");
    return (
        <React.Fragment>
            <div>
                <ThemeContext.Provider value={{theme, toggleTheme}}>
                    <MainContext.Provider
                        value={{
                            auth,
                            setAuth,
                            role,
                            setRole,
                            setIsStudent,
                            category_id,
                            setCategory_id,
                            setVerifyLoading,
                            user_type,
                            setUserType,
                            i18,
                            setI18,
                            region_id,
                            setRegion_id,
                            hasLayout,
                            setHasLayout,
                            additional,
                            setAdditional,
                            profession
                        }}
                    >
                        <Router>
                            {renderRoutes()}
                            {!isStudant && (
                                <Route
                                    exact={true}
                                    path="/defaultlanguage"
                                    component={DefaultLanguagePage}
                                />
                            )}
                        </Router>
                    </MainContext.Provider>
                </ThemeContext.Provider>
            </div>
        </React.Fragment>
    );
};

export default App;
