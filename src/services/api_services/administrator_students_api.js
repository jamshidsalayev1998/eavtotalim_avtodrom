import API_V2 from "api/index_v2";
import API from "../../api";

export const getAllStudentsForAdministrator = async params => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: "/examination-administrator/all-students",
      method: "GET",
      params: params,
      headers: {
        Accept: "application/json",
      },
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {
    return error;
  }
};
export const getStudentCertificate = async finalStudentAccessId => {
  try {
    let params = {};
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: `/examination-administrator/certificate/${finalStudentAccessId}`,
      method: "GET",
      params: params,
      headers: {
        Accept: "application/json",
      },
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const addStudentToComes = async (params, data) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API_V2({
      url: `/examination-administrator/students`,
      method: "POST",
      params: params,
      headers: {
        Accept: "application/json",
      },
      data: data,
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const getOrganizations = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: `/examination-administrator/get-organizations`,
      method: "GET",
      params: params,
      headers: {
        Accept: "application/json",
      },
    });
    return response?.data;
  } catch (e) {
    return e;
  }
};

export const getVisitorTypes = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API_V2({
      url: `/examination-administrator/visitor-type`,
      method: "GET",
      params: params,
      headers: {
        Accept: "application/json",
      },
    });
    if (response?.data?.message === "Success") {
      return response?.data;
    }
  } catch (e) {
    return e;
  }
};

export const checkVisitorData = async (params, data) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API_V2({
      url: `/examination-administrator/students/check`,
      method: "POST",
      params: params,
      headers: {
        Accept: "application/json",
      },
      data: data,
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {
    return error;
  }
};
