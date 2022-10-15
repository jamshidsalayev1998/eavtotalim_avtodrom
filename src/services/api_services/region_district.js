import axios from "axios";
import { PATH_PREFIX } from "Utils/AppVariables";

export const getRegions = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios({
      url: PATH_PREFIX + "/region",
      method: "GET",
      params: {
        token: token,
      },
    });

    if (response?.data?.status === 1) {
      const data = response?.data?.data;
      return data;
    }
  } catch (error) {}
};

export const getDistricts = async region_id => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios({
      url: PATH_PREFIX + "/area",
      method: "GET",
      params: {
        token,
        region_id,
      },
    });

    if (response?.data?.status === 1) {
      const data = response?.data?.data;
      return data;
    }
  } catch (error) {}
};

export const getRegionsOnline = async (organization_id = 0) => {
  try {
    const params = {};
    const response = await axios({
      url: PATH_PREFIX + "/get-all-region",
      method: "GET",
      params,
    });

    if (parseInt(response?.data?.status) === 1) {
      return response?.data?.data?.data;
    }
  } catch (error) {}
};

export const getDistrictsOnline = async region_id => {
  try {
    const response = await axios({
      url: PATH_PREFIX + "/get-areas-online",
      method: "GET",
      params: {
        region_id,
      },
    });

    if (response?.data?.status === 1) {
      const data = response?.data?.areas;
      return data;
    }
  } catch (error) {}
};


export const getDistrictsOnlineMain = async region_id => {
  try {
    const response = await axios({
      url: PATH_PREFIX + "/get-areas-online",
      method: "GET",
      params: {
        region_id,
      },
    });

    if (response?.data?.status === 1) {
      const data = response?.data?.areas;
      return data;
    }
  } catch (error) {}
};
