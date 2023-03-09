import { message } from "antd";
import API_V2 from "api/index_v2";

export const sendStudentTheorioticalReexam = async data => {
  try {
    const token = localStorage.getItem("token");
    const response = await API_V2({
      url: "/examination-director/make-reexamination",
      method: "POST",
      params: {
        token: token,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data,
    });
    if (response?.data) {
      return response?.data;
    }
  } catch (error) {}
};
