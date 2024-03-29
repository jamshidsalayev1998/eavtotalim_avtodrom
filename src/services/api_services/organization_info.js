import API_V2 from "api/index_v2";
import API from "../../api";

export const getOrganizationInfo = async params => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: "/organization-info",
      method: "GET",
      params: params,
      headers: {
        Accept: "application/json",
      },
    });
    if (response?.data) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};

export const getTestCnterWithoutAuth = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: `/application-examination-area/examination-areas`,
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

export const getOrganizationsWithoutAuth = async (params = {}) => {
  try {
    const response = await API_V2({
      url: `/organization-application-user/organizations`,
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
