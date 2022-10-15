import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';
import {message} from "antd";
import API from "../../api";

export const getAllSensorResponses = async (params = {}) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params,{token:token});
        const response = await API({
            url: "/practical-exam-sensor-data-index",
            method: "GET",
            params:params
        })
        if (response?.data) {
            const data = response;
            return data;
        }
    } catch (error) {

    }
}
