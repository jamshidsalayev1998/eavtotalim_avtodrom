import { Col } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

const GoBackWithText = props => {
  const { t } = useTranslation();
  const history = useHistory();
  const { contentTitle } = props;
  return (
    <div className="d-flex align-items-center justify-content-left w-100">
      <button
        className="btn rounded-circle mr-3"
        style={{ boxShadow: "0px 10px 20px rgba(29, 97, 122, 0.15)" }}
        onClick={() => history.goBack()}
      >
        <i className="bx bx-arrow-back font-size-20 font-weight-bold "></i>
      </button>
      <div className="text-primary font-weight-bold font-size-18">
        {contentTitle}
      </div>
    </div>
  );
};

export default GoBackWithText;
