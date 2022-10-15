import PropTypes from "prop-types";
import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Simple bar
import SimpleBar from "simplebar-react";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";

const Sidebar = props => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? (
            <SimpleBar style={{ maxHeight: "100%" }}>
              <SidebarContent
                toggleLeftmenu={props.toggleLeftmenu}
                changeSidebarType={props.changeSidebarType}
              />
            </SimpleBar>
          ) : (
            <SidebarContent
              toggleLeftmenu={props.toggleLeftmenu}
              changeSidebarType={props.changeSidebarType}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(mapStatetoProps, {
  toggleLeftmenu,
  changeSidebarType,
})(withRouter(withTranslation()(Sidebar)));
