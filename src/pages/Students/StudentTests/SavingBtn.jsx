import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import clsx from "clsx";
import { PATH_PREFIX } from "Utils/AppVariables";
import SaveSvg from "../../../assets/images/saved.svg";
import UnSaveSvg from "../../../assets/images/un_saved_main_color.svg";
import { isEmpty } from "lodash";

const SavingBtn = () => {
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_PREFIX + "/saved-test",
      method: "GET",
      params: {
        token,
      },
    }).then(response => {
      if (response?.data?.status === 1) {
        if (Array.isArray(response?.data?.data)) {
          const isHas = response?.data?.data.filter(
            e => e.test_id === Number(location?.state?.lesson_id)
          );
          if (!isEmpty(isHas)) {
            setIsSaved(true);
            setId(isHas[0]?.id);
          } else {
            setIsSaved(false);
          }
        }
      }
    });
  }, [isSaved]);

  const saveTest = () => {
    const token = localStorage.getItem("token");
    const formdata = new FormData();
    formdata.append("type", location?.state?.template_id ? 1 : 0);
    formdata.append("test_id", location?.state?.lesson_id);
    axios({
      url: PATH_PREFIX + "/saved-test",
      method: "POST",
      params: {
        token,
      },
      data: formdata,
    }).then(response => {
      if (response?.data?.status === 1) {
        setIsSaved(true);
      }
    });
  };

  const unSaveTest = () => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_PREFIX + `/saved-test/${id}`,
      method: "DELETE",
      params: {
        token,
      },
    }).then(response => {
      if (response?.data?.status === 1) {
        setIsSaved(false);
      }
    });
  };

  return (
    <React.Fragment>
      <div>
        {isSaved ? (
          <button className={clsx("unLooked_btn")} onClick={unSaveTest}>
            <img src={SaveSvg} alt="" />
          </button>
        ) : (
          <button className={clsx("unLooked_btn")} onClick={saveTest}>
            <img src={UnSaveSvg} alt="" />
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default SavingBtn;
