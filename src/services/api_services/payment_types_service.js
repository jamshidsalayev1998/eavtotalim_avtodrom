import axios from "axios";
import API from "../../api";

export const getPaymentType = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await API({
      url: "/payment-types",
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
