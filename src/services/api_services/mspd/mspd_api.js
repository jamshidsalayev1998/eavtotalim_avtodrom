import API_V2 from "api/index_v2";

export const getPersonInfo = async (document , birthday , params = {}) => {
    try {
      const token = localStorage.getItem("token");
    //   Object.assign(params, { token: token });
      const response = await API_V2({
        url: `/examination-administrator/person-info`,
        method: "POST",
        params: params,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer "+token,
        },
        data: {
            document:document,
            birthday:birthday
        },
      });
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  };