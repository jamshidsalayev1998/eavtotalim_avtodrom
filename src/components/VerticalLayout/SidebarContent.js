import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import "./style.scss";
// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import MainContext from "Context/MainContext";
import SuperadminLinks from "./RouteLinks/superadmin_links";
import ExaminationUserLinks from "./RouteLinks/examination_user_links";
import CashierLinks from "./RouteLinks/cashier_links";
import FinalAccessAdminLinks from "./RouteLinks/final_access_admin_links";
import AdministratorLinks from "./RouteLinks/administrator_links";
import InstructorLinks from "./RouteLinks/instructor_links";
import StudentOnlineApplicationLinks from "./RouteLinks/online_student_application";

const SidebarContent = props => {
  const { role } = useContext(MainContext);

  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName.includes(items[i].pathname)) {
          matchingMenuItem = items[i];
          // break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  }

  switch (role) {
    case "13":
      return <ExaminationUserLinks />;
    case "16":
      return <CashierLinks />;
    case "17":
      return <FinalAccessAdminLinks />;
    case "19":
      return <AdministratorLinks />;
    case "18":
      return <InstructorLinks />;
    case "23":
      return <StudentOnlineApplicationLinks />;
    default:
      return <SuperadminLinks {...props} />;
  }
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default React.memo(withRouter(withTranslation()(SidebarContent)));
