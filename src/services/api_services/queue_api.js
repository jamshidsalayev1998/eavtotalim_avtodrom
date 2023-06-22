import API from "../../api";

export const getQueueList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await API({
      url: "/examination-user/final-test-queue",
      method: "GET",
      params: {
        token: token,
      },
    });
    if (response?.data) {
      const data = response?.data;
      return data;
    }
  } catch (error) {}
};

export const reputStudentToQueueApi = async (data, params = {}) => {
  try {
    const token = localStorage.getItem("token");
    Object.assign(params, { token: token });
    const response = await API_V2({
      url: "/examination-administrator/queue/re-put",
      method: "POST",
      params: params,
      data: data,
    });
    if (response?.data) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};
