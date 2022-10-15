import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';
import {message} from "antd";
import API from "../../api";

export const getStudentsForCashier = async (params) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params, {token: token});
        const response = await API({
            url: "/cashier/student-payments",
            method: "GET",
            params: params,
            headers: {
                'Accept': 'application/json'
            }
        })
        if (response?.data) {
            const data = response;
            return data;
        }
    } catch (error) {

    }
}
