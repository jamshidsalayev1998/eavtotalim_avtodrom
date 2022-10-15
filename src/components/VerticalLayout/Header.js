import PropTypes from "prop-types";
import React, { useContext, useState } from "react";

import { connect } from "react-redux";

import { Link, useHistory } from "react-router-dom";
// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logo from "../../assets/images/logo.png";
import logoMini from "../../assets/images/logo_mini.png";
//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";

// Theme Context
import ThemeContext from "../../Context/ThemeContext";

const Header = props => {
  const [search, setsearch] = useState(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const history = useHistory();

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    props.toggleLeftmenu(!props.leftMenu);
    if (props.leftSideBarType === "default") {
      props.changeSidebarType("condensed", isMobile);
    } else if (props.leftSideBarType === "condensed") {
      props.changeSidebarType("default", isMobile);
    }
  }

  // theme context
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header" style={{ background: "#fff" }}>
          <div className="d-flex">
            <div
              className="navbar-brand-box d-flex align-items-center"
              style={{ backgroundColor: "#005ED0" }}
            >
              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoMini} alt="" height="25" />
                </span>
                <span className="logo-lg">
                  <div className="d-flex align-items-center">
                    <img src={logo} alt="" height="36" />
                  </div>
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder={props.t("Search") + "..."}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ml-2">
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <LanguageDropdown />

            <div className="dropdown d-none d-lg-inline-block ml-1 ">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                onClick={() => {
                  history.push("/chats");
                }}
              >
                <i className="bx bx-mail-send "></i>
              </button>
            </div>

            {/* Dark light mode */}
            {/* <div className="dropdown d-none d-lg-inline-block ml-1">
              <button
                style={{ backgroundColor: `${theme}` }}
                type="button"
                className="btn header-item noti-icon waves-effect"
                onClick={toggleTheme}
              >
                <i className="bx bx-sun"></i>
              </button>
            </div> */}

            {/* Full screen */}
            <div className="dropdown d-none d-lg-inline-block ml-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen" />
              </button>
            </div>

            <NotificationDropdown />
            {/* use */}
            <ProfileMenu />

            {/* <div
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="bx bx-cog bx-spin" />
              </button>
            </div> */}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
