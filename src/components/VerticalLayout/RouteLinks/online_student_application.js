import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MainContext from "Context/MainContext";
import { useSelector, useDispatch } from "react-redux";
import apply from "../../../assets/icons/online-application/apply-docs.png";

const StudentOnlineApplicationLinks = props => {
  const { t } = useTranslation();
  const layout = useSelector(state => state.Layout);
  const dispatch = useDispatch();

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
            <li className="" name="asosiy">
              <Link to="/" className="waves-effect">
                <img src={apply} alt="Icon" />
                <span>{t("Bosh sahifa")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {/* ASOSIY SAHIFA */}
            <li className="" name="asosiy">
              <Link to="/" className="waves-effect">
                <img
                  style={{
                    marginRight: "10px",
                  }}
                  src={apply}
                  alt="Icon"
                />
                <span>{t("Ariza topshirish")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
};

export default StudentOnlineApplicationLinks;
