import { PATH_PREFIX } from "Utils/AppVariables";
import axios from "axios";

export const getApiBugs = async params => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await axios({
      url: PATH_PREFIX + "/api_bugs",
      method: "GET",
      params: params,
    });
    if (response?.data?.status === 1) {
      return response?.data;
    }
  } catch (error) {}
};
export const storeApiBugs = async (params, data) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await axios({
      url: PATH_PREFIX + "/api_bugs",
      method: "POST",
      params: params,
      data: data,
    });
    if (response?.data?.status === 1) {
      return response?.data;
    }
  } catch (error) {}
};
