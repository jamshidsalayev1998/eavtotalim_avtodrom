import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

//i18n
import { withTranslation } from "react-i18next";

const NotificationDropdownMK = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [isnot, setisnot] = useState(sessionStorage.getItem("isnotif")=="true");

  const refreshSayt = () => {
    window.location.reload();
    sessionStorage.setItem("isnotif", false);
  };

  useEffect(()=>{
    setisnot(sessionStorage.getItem("isnotif") == "true")
  }, [sessionStorage.getItem("isnotif")])

  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          {isnot ? (
            <>
              <i className="bx bx-bell bx-tada" />
              <span className="badge badge-danger badge-pill">1</span>
            </>
          ) : (
            <i className="bx bx-bell" />
          )}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0" right>
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <a href="#!" className="small">
                  {" "}
                  {props.t("View all")}
                </a>
              </div>
            </Row>
          </div>
          <SimpleBar
            onClick={refreshSayt}
            style={{ maxHeight: "230px", cursor: "pointer" }}
          >
            <span to="" className="text-reset notification-item">
              <div className="media">
                <div className="avatar-xs mr-3">
                  <span className="avatar-title bg-success rounded-circle font-size-16">
                    <i className="bx bx-badge-check" />
                  </span>
                </div>
                <div className="media-body">
                  <h6 className="mt-0 mb-1">Tizimda yangilanish mavjud</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      Tizim yangilanishlaridan foydalanish uchun shu yerga
                      bosing
                    </p>
                  </div>
                </div>
              </div>
            </span>
          </SimpleBar>
          <div className="p-2 border-top">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="#"
            >
              {" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default withTranslation()(NotificationDropdownMK);

NotificationDropdownMK.propTypes = {
  t: PropTypes.any,
};
