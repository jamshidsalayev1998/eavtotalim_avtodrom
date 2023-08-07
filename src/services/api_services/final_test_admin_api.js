import API from "../../api";
import API_V2 from "api/index_v2";

export const allowSeparatelyStudent = async (student_id, params = {}) => {
  try {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    form_data.append("final_access_student_id", student_id);
    const response = await API({
      url: "/go-examination/allow-separately-student-to-final-exam",
      method: "POST",
      params: { token },
      data: form_data,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getExamProcessStudents = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: "/examination-user/exam-process",
      method: "GET",
      params,
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};
export const getExamProcessComputers = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: "/examination-user/exam-process-computers",
      method: "GET",
      params,
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};
export const computerTestEndApi = async (
  final_access_student_id,
  params = {}
) => {
  try {
    const data = new FormData();
    data.append("final_access_student_id", final_access_student_id);
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: "/examination-director/computer-test-end",
      method: "POST",
      data,
      params,
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const getRealTimeExamProcess = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API_V2({
      url: "/examination-director/exam-process-computers",
      method: "GET",
      params,
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};
