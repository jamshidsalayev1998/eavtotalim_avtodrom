import { PATH_PREFIX } from "Utils/AppVariables";
import axios from "axios";

export const getOrganization = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios({
      url: PATH_PREFIX + "/organization",
      method: "GET",
      params: {
        token: token,
      },
    });

    if (response?.data?.status === 1) {
      const data = response?.data;
      return data;
    }
  } catch (error) {}
};

export const getOrganizationByArea = async area_id => {
  try {
    const response = await axios({
      url: PATH_PREFIX + "/get-organization-by-area",
      method: "GET",
      params: {
        area_id: area_id,
      },
    });

    if (response?.data?.status === 1) {
      const data = response?.data?.areas;
      return data;
    }
  } catch (error) {}
};

export const getTypeByOrganisation = async organization_id => {
  try {
    const response = await axios({
      url: PATH_PREFIX + "/get-data-for-online",
      method: "GET",
      params: {
        organization_id: organization_id,
      },
    });

    if (response?.data?.status === 1) {
      const data = response?.data?.data;
      return data;
    }
  } catch (error) {}
};

export const getNoDirectorOrganization = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios({
      url: PATH_PREFIX + "/organization-no-director",
      method: "GET",
      params: {
        token: token,
        show_count: "all",
      },
    });

    if (response?.data?.status === 1) {
      const data = response?.data;
      return data;
    }
  } catch (error) {}
};

export const getExaminationAreas = async () => {
  try {
    const response = await axios({
      url: PATH_PREFIX + "/application-examination-area/examination-areas",
      method: "GET",
    });

    if (response?.data?.status === 1) {
      const data = response?.data?.data;
      return data;
    }
  } catch (error) {}
};
