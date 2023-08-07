import axios from "axios";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { message } from "antd";

import { FinalTestPasswordsPrint } from "./FinalTestPasswordsPrint";
import { PATH_PREFIX } from "Utils/AppVariables";

const FinalTestPrintComponent = ({ group }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [data, setData] = useState([]);
  const [access_group, setAccessGroup] = useState([]);

  const get_final_test_passwords = () => {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    form_data.append("access_group_id", group?.id);
    if (group?.id) {
      axios({
        url: PATH_PREFIX + "/come-examination/get-final-test-passwords",
        method: "POST",
        params: {
          token,
        },
        data: form_data,
      }).then(res => {
        if (res?.data?.status == "1") {
          setData(res?.data?.data);
          setAccessGroup(res?.data?.access_group);
          handlePrint();
        }
        if (res?.data?.status == "0") {
          message.error(res?.data?.message);
        }
      });
    }
  };

  return (
    <div>
      <div style={{ display: "none" }}>
        <FinalTestPasswordsPrint
          ref={componentRef}
          data={data}
          access_group={access_group}
        />
      </div>
      <button className="btn btn-success" onClick={get_final_test_passwords}>
        <i className="fa fa-print"></i> Parollarni chop qilish{" "}
      </button>
    </div>
  );
};
export default FinalTestPrintComponent;
