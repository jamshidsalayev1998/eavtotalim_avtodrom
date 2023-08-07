import axios from "axios";
import API from "../../api";

export const getExaminationAreaInstructor = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await API({
      url: "/examination-area/instructor",
      method: "GET",
      params: {
        token: token,
      },
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {}
};
export const storeExaminationAreaInstructor = async formData => {
  try {
    const token = localStorage.getItem("token");
    const response = await API({
      url: "/examination-area/instructor",
      method: "POST",
      params: {
        token: token,
      },
      data: formData,
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {}
};
export const updateExaminationAreaInstructor = async (
  formData,
  instructorId
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API({
      url: "/examination-area/instructor/" + instructorId,
      method: "PUT",
      params: {
        token: token,
      },
      data: formData,
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {}
};
export const deleteExaminationAreaInstructor = async instructorId => {
  try {
    const token = localStorage.getItem("token");
    const response = await API({
      url: "/examination-area/instructor/" + instructorId,
      method: "DELETE",
      params: {
        token: token,
      },
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {}
};
export const getPasswordExaminationAreaInstructor = async instructorId => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("instructor_id", instructorId);
    if (instructorId) {
      const response = await API({
        url: "/examination-area/instructor-get-password",
        method: "GET",
        params: {
          token: token,
          instructor_id: instructorId,
        },
      });
      if (response?.data) {
        const data = response;
        return data;
      }
    }
  } catch (error) {}
};
export const getExaminationAreaSensorsForInstructor = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API({
      url: "/examination-instructor/sensors",
      method: "GET",
      params: params,
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {}
};
