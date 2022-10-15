import axios from "axios";
import {PATH_PREFIX} from 'Utils/AppVariables';
import {message} from "antd";

export const getEduTypesForAll = async (params) => {
    try {
        const token = localStorage.getItem("token");
        Object.assign(params,{token:token});
        const response = await axios({
            url: PATH_PREFIX + "/index-edu-type",
            method: "GET",
            params: params
        })
        if (response?.data?.status === 1) {
            return response?.data;
        }
    } catch (error) {
        console.log('error api' , error);
    }
}
