import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MainContext from "Context/MainContext";
import { useSelector, useDispatch } from "react-redux";

const CashierLinks = props => {
  const { t } = useTranslation();

  const layout = useSelector(state => state.Layout);

  const { role, user_type } = useContext(MainContext);
  const dispatch = useDispatch();
  const sidebarState = useSelector(state => state.sidebar_content);

  const toggleMenuBox = action_type => {
    dispatch({ type: action_type });
  };

  if (layout.leftMenu) {
    return (
      <React.Fragment>
        <div
          id="sidebar-menu"
          style={
            layout?.leftMenu
              ? { position: "fixed", height: "90vh", overflow: "auto" }
              : null
          }
        >
          <ul className="metismenu list-unstyled" id="side-menu">
            <li style={{ backgroundColor: "#ff7a45" }}>
              <Link to="/" className="waves-effect">
                <i className="fas fa-home"></i>
                <span>{props.t("Home")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div
          id="sidebar-menu"
          style={
            layout?.leftMenu
              ? { position: "fixed", height: "90vh", overflow: "auto" }
              : null
          }
        >
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="" name="asosiy">
              <Link to="/" className="waves-effect">
                <i className="fas fa-home"></i>
                <span>Bosh sahifa</span>
              </Link>
            </li>
            {/* <li className="" name="asosiy" >*/}
            {/*    <Link to="/cashier/groups-payments" className="waves-effect">*/}
            {/*        <i className="fas fa-home"></i>*/}
            {/*        <span>Guruhlarga to`lovni tasdiqlash</span>*/}
            {/*    </Link>*/}
            {/*</li>*/}
            <li className="" name="asosiy">
              <Link to="/cashier/student-payments" className="waves-effect">
                <i className="fas fa-home"></i>
                <span>O`quvchilarga to`lovni tasdiqlash (Nazariy)</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/cashier/student-payments-practical"
                className="waves-effect"
              >
                <i className="fas fa-home"></i>
                <span>O`quvchilarga to`lovni tasdiqlash (Amaliy)</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link to="/cashier/qr-code-scanner-page" className="waves-effect">
                <i className="fas fa-home"></i>
                <span>Qr code orqali tasdiqlash</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/examination-administrator/all-students"
                className="waves-effect"
              >
                <i className="fas fa-poll-h"></i>
                <span>Barcha keluvchilar</span>
              </Link>
            </li>
            <li className="" name="asosiy">
              <Link
                to="/examination-administrator/all-online-applications"
                className="waves-effect"
              >
                <i className="fas fa-layer-group" />
                <span>Online arizalar</span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
};

export default CashierLinks;
