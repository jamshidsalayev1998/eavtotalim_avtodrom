import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Badge,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { PATH_PREFIX } from "Utils/AppVariables";
import classnames from "classnames";
import MainContext from "Context/MainContext";
import DirectorStaff from "./DirectorStaff";
import AdminStaff from "./AdminStaff";
import ModeratorStaff from "./ModeratorStaff";
import TeacherStaff from "./TeacherStaff";

const Staff = () => {
  let history = useHistory();
  const { setAuth } = useContext(MainContext);

  const [activeTab, setActiveTab] = useState("1");
  const [isLoad, setIsLoad] = useState(false);
  const [changeState, setChangeState] = useState(false);
  const [data, setData] = useState(null);

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const getApiPath = pathId => {
    switch (pathId) {
      case "1":
        return "/rahbar";
      case "2":
        return "/admin";
      case "3":
        return "/moderator";
      case "4":
        return "/teacher";
      default:
        return "/director";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoad(true);
    setData(null);
    axios({
      url: PATH_PREFIX + getApiPath(activeTab),
      method: "GET",
      params: {
        token: token,
      },
    }).then(response => {
      if (response.data.status === 1) {
        setData(response.data.data);
        setIsLoad(false);
      }
    });
  }, [activeTab, changeState]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Card>
          <CardBody>
            <div>
              <Nav tabs className="nav-tabs-custom" role="tablist">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "1",
                    })}
                    onClick={() => toggleTab("1")}
                  >
                    Rahbar
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "2",
                    })}
                    onClick={() => toggleTab("2")}
                  >
                    Adminlar
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "3",
                    })}
                    onClick={() => toggleTab("3")}
                  >
                    Moderatorlar
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "4",
                    })}
                    onClick={() => toggleTab("4")}
                  >
                    O’qituvchilar
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent
                activeTab={activeTab}
                className="crypto-buy-sell-nav-content p-4"
              >
                <TabPane tabId="1">
                  {!isLoad && activeTab === "2" ? (
                    <DirectorStaff
                      data={activeTab === "1" ? data : null}
                      isLoad={activeTab === "1" ? isLoad : null}
                    />
                  ) : (
                    <div className="tab_loader_box">
                      <i className="bx bx-loader bx-spin font-size-25 text-success" />
                    </div>
                  )}
                </TabPane>

                <TabPane tabId="2">
                  {!isLoad && activeTab === "2" ? (
                    <AdminStaff
                      data={activeTab === "2" ? data : null}
                      isLoad={activeTab === "2" ? isLoad : null}
                    />
                  ) : (
                    <div className="tab_loader_box">
                      <i className="bx bx-loader bx-spin font-size-25 text-success" />
                    </div>
                  )}
                </TabPane>
                <TabPane tabId="3">
                  {!isLoad && activeTab === "3" ? (
                    <ModeratorStaff
                      data={activeTab === "3" ? data : null}
                      isLoad={activeTab === "3" ? isLoad : null}
                    />
                  ) : (
                    <div className="tab_loader_box">
                      <i className="bx bx-loader bx-spin font-size-25 text-success" />
                    </div>
                  )}
                </TabPane>
                <TabPane tabId="4">
                  {!isLoad && activeTab === "4" ? (
                    <TeacherStaff
                      data={activeTab === "4" ? data : null}
                      isLoad={activeTab === "4" ? isLoad : null}
                    />
                  ) : (
                    <div className="tab_loader_box">
                      <i className="bx bx-loader bx-spin font-size-25 text-success" />
                    </div>
                  )}
                </TabPane>
              </TabContent>
            </div>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Staff;
